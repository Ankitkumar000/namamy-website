import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

function generateOrderId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const {
      items,
      shippingAddress,
      billingAddress,
      paymentMethod,
      notes
    } = await request.json();

    // Validation
    if (!items || !items.length || !shippingAddress) {
      return NextResponse.json(
        { error: 'Items and shipping address are required' },
        { status: 400 }
      );
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId }
      });

      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 400 }
        );
      }

      if (!product.inStock || product.stockCount < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}` },
          { status: 400 }
        );
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
        total: itemTotal
      });
    }

    // Calculate shipping and tax
    const shippingAmount = subtotal > 500 ? 0 : 50; // Free shipping above ₹500
    const taxAmount = subtotal * 0.18; // 18% GST
    const totalAmount = subtotal + shippingAmount + taxAmount;

    // Create order
    const orderId = generateOrderId();

    const order = await prisma.order.create({
      data: {
        id: orderId,
        userId: decoded.userId,
        status: 'PENDING',
        totalAmount,
        shippingAmount,
        taxAmount,
        shippingAddress: JSON.stringify(shippingAddress),
        billingAddress: billingAddress ? JSON.stringify(billingAddress) : null,
        paymentMethod,
        notes,
        orderItems: {
          create: orderItems
        }
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        },
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    // Update product stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stockCount: {
            decrement: item.quantity
          }
        }
      });

      // Update inStock status if stock is 0
      const updatedProduct = await prisma.product.findUnique({
        where: { id: item.productId }
      });

      if (updatedProduct && updatedProduct.stockCount <= 0) {
        await prisma.product.update({
          where: { id: item.productId },
          data: { inStock: false }
        });
      }
    }

    // Send order confirmation email
    try {
      const { sendEmail, generateOrderConfirmationEmail } = await import('@/lib/email');
      const emailContent = generateOrderConfirmationEmail(order);
      
      await sendEmail({
        to: order.user.email,
        subject: `Order Confirmation - ${order.id} - Namamy`,
        html: emailContent
      });

      // Send admin notification
      await sendEmail({
        to: process.env.ADMIN_EMAIL || 'admin@namamy.com',
        subject: `New Order Received - ${order.id}`,
        html: `
          <h2>New Order Notification</h2>
          <p><strong>Order ID:</strong> ${order.id}</p>
          <p><strong>Customer:</strong> ${order.user.name} (${order.user.email})</p>
          <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
          <p><strong>Items:</strong> ${order.orderItems.length} items</p>
          <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
          <br>
          <p>Please review and process this order in the admin panel.</p>
        `
      });

      console.log('Order confirmation emails sent successfully');
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
      // Don't fail the order creation if email fails
    }

    return NextResponse.json({
      order,
      message: 'Order created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!token) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };

    let where: any = {};

    // If not admin, only show user's own orders
    if (decoded.role !== 'ADMIN') {
      where.userId = decoded.userId;
    } else if (userId) {
      where.userId = userId;
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        orderItems: {
          include: {
            product: true
          }
        },
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Parse JSON strings for client
    const formattedOrders = orders.map(order => ({
      ...order,
      shippingAddress: order.shippingAddress ? JSON.parse(order.shippingAddress) : null,
      billingAddress: order.billingAddress ? JSON.parse(order.billingAddress) : null
    }));

    return NextResponse.json({ orders: formattedOrders });

  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}