import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // For development, allow access without strict auth
    // In production, you would add authentication here
    // Get current date for period calculations
    const now = new Date();
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    // Total Revenue (current month)
    const currentMonthOrders = await prisma.order.aggregate({
      where: {
        createdAt: {
          gte: currentMonth,
        },
        status: {
          in: ['CONFIRMED', 'SHIPPED', 'DELIVERED']
        }
      },
      _sum: {
        totalAmount: true,
      },
    });

    // Last month revenue for comparison
    const lastMonthOrders = await prisma.order.aggregate({
      where: {
        createdAt: {
          gte: lastMonth,
          lte: lastMonthEnd,
        },
        status: {
          in: ['CONFIRMED', 'SHIPPED', 'DELIVERED']
        }
      },
      _sum: {
        totalAmount: true,
      },
    });

    const currentRevenue = currentMonthOrders._sum.totalAmount || 0;
    const lastRevenue = lastMonthOrders._sum.totalAmount || 1;
    const revenueChange = ((currentRevenue - lastRevenue) / lastRevenue * 100).toFixed(1);

    // Total Orders (current month)
    const currentMonthOrderCount = await prisma.order.count({
      where: {
        createdAt: {
          gte: currentMonth,
        },
      },
    });

    const lastMonthOrderCount = await prisma.order.count({
      where: {
        createdAt: {
          gte: lastMonth,
          lte: lastMonthEnd,
        },
      },
    });

    const orderChange = lastMonthOrderCount > 0 
      ? ((currentMonthOrderCount - lastMonthOrderCount) / lastMonthOrderCount * 100).toFixed(1)
      : '0';

    // Total Customers
    const totalCustomers = await prisma.user.count({
      where: {
        role: 'USER'
      }
    });

    const lastMonthCustomers = await prisma.user.count({
      where: {
        role: 'USER',
        createdAt: {
          lte: lastMonthEnd,
        },
      },
    });

    const customerChange = lastMonthCustomers > 0 
      ? ((totalCustomers - lastMonthCustomers) / lastMonthCustomers * 100).toFixed(1)
      : '0';

    // Products Sold (current month)
    const productsSold = await prisma.orderItem.aggregate({
      where: {
        order: {
          createdAt: {
            gte: currentMonth,
          },
        },
      },
      _sum: {
        quantity: true,
      },
    });

    const lastMonthProductsSold = await prisma.orderItem.aggregate({
      where: {
        order: {
          createdAt: {
            gte: lastMonth,
            lte: lastMonthEnd,
          },
        },
      },
      _sum: {
        quantity: true,
      },
    });

    const currentProductsSold = productsSold._sum.quantity || 0;
    const lastProductsSold = lastMonthProductsSold._sum.quantity || 1;
    const productsChange = ((currentProductsSold - lastProductsSold) / lastProductsSold * 100).toFixed(1);

    // Recent Orders
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    // Top Products
    const topProducts = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
      },
      _count: {
        productId: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 5,
    });

    const topProductsWithDetails = await Promise.all(
      topProducts.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });

        const revenue = await prisma.orderItem.aggregate({
          where: {
            productId: item.productId,
          },
          _sum: {
            price: true,
          },
        });

        return {
          name: product?.name || 'Unknown Product',
          sales: item._sum.quantity || 0,
          revenue: revenue._sum.price || 0,
          orders: item._count.productId,
        };
      })
    );

    // Low Stock Products
    const lowStockProducts = await prisma.product.findMany({
      where: {
        stockCount: {
          lte: 10,
        },
        inStock: true,
      },
      take: 5,
      orderBy: {
        stockCount: 'asc',
      },
    });

    const stats = {
      revenue: {
        current: currentRevenue,
        change: revenueChange,
        changeType: parseFloat(revenueChange) >= 0 ? 'positive' : 'negative',
      },
      orders: {
        current: currentMonthOrderCount,
        change: orderChange,
        changeType: parseFloat(orderChange) >= 0 ? 'positive' : 'negative',
      },
      customers: {
        current: totalCustomers,
        change: customerChange,
        changeType: parseFloat(customerChange) >= 0 ? 'positive' : 'negative',
      },
      productsSold: {
        current: currentProductsSold,
        change: productsChange,
        changeType: parseFloat(productsChange) >= 0 ? 'positive' : 'negative',
      },
    };

    return NextResponse.json({
      success: true,
      stats,
      recentOrders: recentOrders.map(order => ({
        id: order.id,
        customer: order.user.name,
        amount: order.totalAmount,
        status: order.status.toLowerCase(),
        date: order.createdAt.toISOString().split('T')[0],
        products: order.orderItems.map(item => item.product.name).join(', '),
      })),
      topProducts: topProductsWithDetails,
      lowStockProducts: lowStockProducts.map(product => ({
        id: product.id,
        name: product.name,
        stock: product.stockCount,
        price: product.price,
      })),
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
}