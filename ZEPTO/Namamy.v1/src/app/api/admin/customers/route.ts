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
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search');
    const role = searchParams.get('role');

    let where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (role) {
      where.role = role;
    }

    const [customers, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              orders: true,
              reviews: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where })
    ]);

    // Get order statistics for each customer
    const customersWithStats = await Promise.all(
      customers.map(async (customer) => {
        const orderStats = await prisma.order.aggregate({
          where: { userId: customer.id },
          _sum: { totalAmount: true },
          _count: true
        });

        const lastOrder = await prisma.order.findFirst({
          where: { userId: customer.id },
          orderBy: { createdAt: 'desc' },
          select: { createdAt: true, totalAmount: true }
        });

        return {
          ...customer,
          orderStats: {
            totalOrders: orderStats._count,
            totalSpent: orderStats._sum.totalAmount || 0,
            lastOrderDate: lastOrder?.createdAt || null,
            lastOrderAmount: lastOrder?.totalAmount || 0
          }
        };
      })
    );

    return NextResponse.json({
      customers: customersWithStats,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
        itemsPerPage: limit
      }
    });

  } catch (error) {
    console.error('Admin customers fetch error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch customers' },
      { status: error instanceof Error && error.message.includes('Admin') ? 403 : 500 }
    );
  }
}