import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

// Force dynamic rendering for API routes that access request headers
export const dynamic = 'force-dynamic';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

function verifyAdmin(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    throw new Error('Authorization token required');
  }

  const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
  
  if (decoded.role !== 'ADMIN') {
    throw new Error('Admin access required');
  }

  return decoded;
}

export async function GET(request: NextRequest) {
  try {
    verifyAdmin(request);

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30'; // days

    const periodDays = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - periodDays);

    // Get basic counts
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders,
      topProducts,
      ordersByStatus,
      dailyStats
    ] = await Promise.all([
      // Total users
      prisma.user.count({
        where: { role: 'USER' }
      }),

      // Total products
      prisma.product.count(),

      // Total orders
      prisma.order.count(),

      // Total revenue
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { paymentStatus: 'PAID' }
      }),

      // Recent orders
      prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { name: true, email: true }
          },
          orderItems: {
            include: {
              product: {
                select: { name: true }
              }
            }
          }
        }
      }),

      // Top selling products
      prisma.orderItem.groupBy({
        by: ['productId'],
        _sum: { quantity: true },
        _count: { productId: true },
        orderBy: { _sum: { quantity: 'desc' } },
        take: 5
      }),

      // Orders by status
      prisma.order.groupBy({
        by: ['status'],
        _count: { status: true }
      }),

      // Daily statistics for the period
      prisma.order.findMany({
        where: {
          createdAt: {
            gte: startDate
          }
        },
        select: {
          createdAt: true,
          totalAmount: true,
          status: true
        }
      })
    ]);

    // Get product details for top products
    const topProductsWithDetails = await Promise.all(
      topProducts.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
          select: { name: true, price: true, images: true }
        });
        return {
          ...item,
          product
        };
      })
    );

    // Process daily stats
    const dailyStatsMap = new Map();
    for (let i = periodDays - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      dailyStatsMap.set(dateKey, {
        date: dateKey,
        orders: 0,
        revenue: 0,
        newUsers: 0
      });
    }

    dailyStats.forEach(order => {
      const dateKey = order.createdAt.toISOString().split('T')[0];
      if (dailyStatsMap.has(dateKey)) {
        const stats = dailyStatsMap.get(dateKey);
        stats.orders += 1;
        stats.revenue += order.totalAmount;
      }
    });

    // Get new users for each day
    const newUsers = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: startDate
        },
        role: 'USER'
      },
      select: { createdAt: true }
    });

    newUsers.forEach(user => {
      const dateKey = user.createdAt.toISOString().split('T')[0];
      if (dailyStatsMap.has(dateKey)) {
        const stats = dailyStatsMap.get(dateKey);
        stats.newUsers += 1;
      }
    });

    // Calculate growth rates
    const previousPeriodStart = new Date(startDate);
    previousPeriodStart.setDate(previousPeriodStart.getDate() - periodDays);

    const [previousRevenue, previousOrders, previousUsers] = await Promise.all([
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: {
          createdAt: {
            gte: previousPeriodStart,
            lt: startDate
          },
          paymentStatus: 'PAID'
        }
      }),
      prisma.order.count({
        where: {
          createdAt: {
            gte: previousPeriodStart,
            lt: startDate
          }
        }
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: previousPeriodStart,
            lt: startDate
          },
          role: 'USER'
        }
      })
    ]);

    const currentRevenue = dailyStats.reduce((sum, order) => sum + order.totalAmount, 0);
    const currentOrders = dailyStats.length;
    const currentUsers = newUsers.length;

    const revenueGrowth = previousRevenue._sum.totalAmount 
      ? ((currentRevenue - (previousRevenue._sum.totalAmount || 0)) / (previousRevenue._sum.totalAmount || 1)) * 100
      : 100;

    const ordersGrowth = previousOrders 
      ? ((currentOrders - previousOrders) / previousOrders) * 100
      : 100;

    const usersGrowth = previousUsers 
      ? ((currentUsers - previousUsers) / previousUsers) * 100
      : 100;

    return NextResponse.json({
      overview: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: totalRevenue._sum.totalAmount || 0,
        currentPeriodRevenue: currentRevenue,
        currentPeriodOrders: currentOrders,
        currentPeriodUsers: currentUsers,
        growth: {
          revenue: Math.round(revenueGrowth * 100) / 100,
          orders: Math.round(ordersGrowth * 100) / 100,
          users: Math.round(usersGrowth * 100) / 100
        }
      },
      recentOrders: recentOrders.map(order => ({
        ...order,
        shippingAddress: order.shippingAddress ? JSON.parse(order.shippingAddress) : null,
        billingAddress: order.billingAddress ? JSON.parse(order.billingAddress) : null
      })),
      topProducts: topProductsWithDetails,
      ordersByStatus,
      dailyStats: Array.from(dailyStatsMap.values())
    });

  } catch (error) {
    console.error('Admin dashboard error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch dashboard data' },
      { status: error instanceof Error && error.message.includes('Admin') ? 403 : 500 }
    );
  }
}