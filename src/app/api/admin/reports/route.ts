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

// Generate various business reports
export async function GET(request: NextRequest) {
  try {
    verifyAdmin(request);

    const { searchParams } = new URL(request.url);
    const reportType = searchParams.get('type') || 'sales';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const format = searchParams.get('format') || 'json'; // json, csv, pdf

    let dateFilter: any = {};
    if (startDate && endDate) {
      dateFilter = {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      };
    }

    let reportData;

    switch (reportType) {
      case 'sales':
        reportData = await generateSalesReport(dateFilter);
        break;
      case 'products':
        reportData = await generateProductReport(dateFilter);
        break;
      case 'customers':
        reportData = await generateCustomerReport(dateFilter);
        break;
      case 'inventory':
        reportData = await generateInventoryReport();
        break;
      case 'financial':
        reportData = await generateFinancialReport(dateFilter);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid report type' },
          { status: 400 }
        );
    }

    if (format === 'csv') {
      return generateCSVResponse(reportData, reportType);
    }

    return NextResponse.json({
      reportType,
      dateRange: { startDate, endDate },
      generatedAt: new Date().toISOString(),
      data: reportData
    });

  } catch (error) {
    console.error('Report generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate report' },
      { status: error instanceof Error && error.message.includes('Admin') ? 403 : 500 }
    );
  }
}

async function generateSalesReport(dateFilter: any) {
  const [orders, revenue, topProducts, salesByStatus] = await Promise.all([
    // Detailed order data
    prisma.order.findMany({
      where: dateFilter,
      include: {
        user: {
          select: { name: true, email: true }
        },
        orderItems: {
          include: {
            product: {
              select: { name: true, price: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    }),

    // Revenue summary
    prisma.order.aggregate({
      where: {
        ...dateFilter,
        paymentStatus: 'PAID'
      },
      _sum: { totalAmount: true },
      _count: true,
      _avg: { totalAmount: true }
    }),

    // Top selling products
    prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true, price: true },
      _count: { productId: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 10
    }),

    // Sales by order status
    prisma.order.groupBy({
      by: ['status'],
      where: dateFilter,
      _count: { status: true },
      _sum: { totalAmount: true }
    })
  ]);

  // Get product details for top products
  const topProductsWithDetails = await Promise.all(
    topProducts.map(async (item) => {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        select: { name: true, price: true }
      });
      return {
        product,
        unitsSold: item._sum.quantity,
        revenue: item._sum.price,
        orderCount: item._count.productId
      };
    })
  );

  return {
    summary: {
      totalOrders: revenue._count,
      totalRevenue: revenue._sum.totalAmount || 0,
      averageOrderValue: revenue._avg.totalAmount || 0
    },
    orders,
    topProducts: topProductsWithDetails,
    salesByStatus
  };
}

async function generateProductReport(dateFilter: any) {
  const [products, productPerformance, lowStockProducts] = await Promise.all([
    // All products with sales data
    prisma.product.findMany({
      include: {
        orderItems: {
          where: {
            order: dateFilter
          }
        },
        reviews: {
          select: {
            rating: true
          }
        }
      }
    }),

    // Product performance metrics
    prisma.orderItem.groupBy({
      by: ['productId'],
      where: {
        order: dateFilter
      },
      _sum: { quantity: true, price: true },
      _count: { productId: true }
    }),

    // Low stock alert
    prisma.product.findMany({
      where: {
        stockCount: {
          lte: 10
        }
      },
      select: {
        id: true,
        name: true,
        stockCount: true,
        price: true
      }
    })
  ]);

  const productsWithMetrics = products.map(product => {
    const performance = productPerformance.find(p => p.productId === product.id);
    const avgRating = product.reviews.length > 0 
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length 
      : 0;

    return {
      ...product,
      tags: product.tags ? JSON.parse(product.tags) : [],
      images: product.images ? JSON.parse(product.images) : [],
      ingredients: product.ingredients ? JSON.parse(product.ingredients) : [],
      nutrition: product.nutrition ? JSON.parse(product.nutrition) : null,
      performance: {
        unitsSold: performance?._sum.quantity || 0,
        revenue: performance?._sum.price || 0,
        orderCount: performance?._count.productId || 0
      },
      averageRating: Math.round(avgRating * 10) / 10,
      reviewCount: product.reviews.length
    };
  });

  return {
    products: productsWithMetrics,
    lowStockAlerts: lowStockProducts,
    summary: {
      totalProducts: products.length,
      lowStockCount: lowStockProducts.length,
      totalValue: products.reduce((sum, p) => sum + (p.price * p.stockCount), 0)
    }
  };
}

async function generateCustomerReport(dateFilter: any) {
  const [customers, customerStats, topCustomers] = await Promise.all([
    // All customers with order data
    prisma.user.findMany({
      where: {
        role: 'USER',
        createdAt: dateFilter.createdAt
      },
      include: {
        orders: {
          select: {
            id: true,
            totalAmount: true,
            status: true,
            createdAt: true
          }
        },
        reviews: {
          select: {
            rating: true,
            createdAt: true
          }
        }
      }
    }),

    // Customer acquisition stats
    prisma.user.groupBy({
      by: ['createdAt'],
      where: {
        role: 'USER',
        ...dateFilter
      },
      _count: { id: true }
    }),

    // Top customers by spend
    prisma.order.groupBy({
      by: ['userId'],
      where: {
        ...dateFilter,
        paymentStatus: 'PAID'
      },
      _sum: { totalAmount: true },
      _count: { userId: true },
      orderBy: { _sum: { totalAmount: 'desc' } },
      take: 10
    })
  ]);

  // Get user details for top customers
  const topCustomersWithDetails = await Promise.all(
    topCustomers.map(async (customer) => {
      const user = await prisma.user.findUnique({
        where: { id: customer.userId },
        select: { name: true, email: true, createdAt: true }
      });
      return {
        user,
        totalSpent: customer._sum.totalAmount,
        orderCount: customer._count.userId
      };
    })
  );

  const customersWithMetrics = customers.map(customer => ({
    ...customer,
    metrics: {
      totalOrders: customer.orders.length,
      totalSpent: customer.orders.reduce((sum, order) => sum + order.totalAmount, 0),
      averageOrderValue: customer.orders.length > 0 
        ? customer.orders.reduce((sum, order) => sum + order.totalAmount, 0) / customer.orders.length 
        : 0,
      lastOrderDate: customer.orders.length > 0 
        ? Math.max(...customer.orders.map(o => new Date(o.createdAt).getTime()))
        : null,
      reviewCount: customer.reviews.length
    }
  }));

  return {
    customers: customersWithMetrics,
    topCustomers: topCustomersWithDetails,
    summary: {
      totalCustomers: customers.length,
      newCustomers: customers.filter(c => 
        dateFilter.createdAt ? 
        new Date(c.createdAt) >= new Date(dateFilter.createdAt.gte) : true
      ).length,
      averageOrdersPerCustomer: customers.length > 0 
        ? customers.reduce((sum, c) => sum + c.orders.length, 0) / customers.length 
        : 0
    }
  };
}

async function generateInventoryReport() {
  const [products, stockMovements, stockAlerts] = await Promise.all([
    // Current inventory status
    prisma.product.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        stockCount: true,
        price: true,
        category: true,
        inStock: true,
        createdAt: true
      }
    }),

    // Recent stock movements (orders)
    prisma.orderItem.findMany({
      take: 100,
      orderBy: { createdAt: 'desc' },
      include: {
        product: {
          select: { name: true, slug: true }
        },
        order: {
          select: { status: true, createdAt: true }
        }
      }
    }),

    // Stock alerts
    prisma.product.findMany({
      where: {
        OR: [
          { stockCount: { lte: 10 } }, // Low stock
          { stockCount: { equals: 0 } }  // Out of stock
        ]
      },
      select: {
        id: true,
        name: true,
        slug: true,
        stockCount: true,
        price: true
      }
    })
  ]);

  const totalInventoryValue = products.reduce((sum, p) => sum + (p.price * p.stockCount), 0);
  const outOfStockProducts = products.filter(p => p.stockCount === 0);
  const lowStockProducts = products.filter(p => p.stockCount > 0 && p.stockCount <= 10);

  return {
    products,
    stockMovements,
    alerts: {
      outOfStock: outOfStockProducts,
      lowStock: lowStockProducts,
      total: stockAlerts
    },
    summary: {
      totalProducts: products.length,
      totalInventoryValue,
      outOfStockCount: outOfStockProducts.length,
      lowStockCount: lowStockProducts.length,
      averageStockLevel: products.length > 0 
        ? products.reduce((sum, p) => sum + p.stockCount, 0) / products.length 
        : 0
    }
  };
}

async function generateFinancialReport(dateFilter: any) {
  const [revenue, expenses, refunds, taxes] = await Promise.all([
    // Revenue breakdown
    prisma.order.aggregate({
      where: {
        ...dateFilter,
        paymentStatus: 'PAID'
      },
      _sum: { totalAmount: true },
      _count: true
    }),

    // Mock expenses (would come from expense tracking system)
    Promise.resolve({
      shipping: 5000,
      packaging: 2000,
      marketing: 10000,
      operational: 15000
    }),

    // Refunds
    prisma.order.aggregate({
      where: {
        ...dateFilter,
        status: 'CANCELLED',
        paymentStatus: 'PAID'
      },
      _sum: { totalAmount: true },
      _count: true
    }),

    // Tax calculations (mock)
    Promise.resolve({
      gst: 0,  // Would be calculated based on orders
      incomeTax: 0
    })
  ]);

  const grossRevenue = revenue._sum.totalAmount || 0;
  const totalExpenses = Object.values(expenses).reduce((sum, exp) => sum + exp, 0);
  const totalRefunds = refunds._sum.totalAmount || 0;
  const netRevenue = grossRevenue - totalRefunds;
  const netProfit = netRevenue - totalExpenses;

  return {
    revenue: {
      gross: grossRevenue,
      net: netRevenue,
      orderCount: revenue._count
    },
    expenses: {
      ...expenses,
      total: totalExpenses
    },
    refunds: {
      amount: totalRefunds,
      count: refunds._count
    },
    taxes,
    summary: {
      grossRevenue,
      netRevenue,
      totalExpenses,
      netProfit,
      profitMargin: netRevenue > 0 ? (netProfit / netRevenue) * 100 : 0
    }
  };
}

function generateCSVResponse(data: any, reportType: string) {
  let csvContent = '';
  
  switch (reportType) {
    case 'sales':
      csvContent = generateSalesCSV(data);
      break;
    case 'products':
      csvContent = generateProductsCSV(data);
      break;
    case 'customers':
      csvContent = generateCustomersCSV(data);
      break;
    default:
      csvContent = 'Report type not supported for CSV export';
  }

  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${reportType}-report-${new Date().toISOString().split('T')[0]}.csv"`
    }
  });
}

function generateSalesCSV(data: any) {
  const headers = 'Order ID,Customer Name,Customer Email,Status,Total Amount,Payment Status,Created At\n';
  const rows = data.orders.map((order: any) => 
    `"${order.id}","${order.user.name}","${order.user.email}","${order.status}","${order.totalAmount}","${order.paymentStatus}","${order.createdAt}"`
  ).join('\n');
  
  return headers + rows;
}

function generateProductsCSV(data: any) {
  const headers = 'Product ID,Name,Slug,Price,Stock,Category,In Stock,Units Sold,Revenue\n';
  const rows = data.products.map((product: any) => 
    `"${product.id}","${product.name}","${product.slug}","${product.price}","${product.stockCount}","${product.category}","${product.inStock}","${product.performance.unitsSold}","${product.performance.revenue}"`
  ).join('\n');
  
  return headers + rows;
}

function generateCustomersCSV(data: any) {
  const headers = 'Customer ID,Name,Email,Phone,Total Orders,Total Spent,Average Order Value,Created At\n';
  const rows = data.customers.map((customer: any) => 
    `"${customer.id}","${customer.name}","${customer.email}","${customer.phone || ''}","${customer.metrics.totalOrders}","${customer.metrics.totalSpent}","${customer.metrics.averageOrderValue}","${customer.createdAt}"`
  ).join('\n');
  
  return headers + rows;
}