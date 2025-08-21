import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    verifyAdmin(request);

    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            createdAt: true
          }
        },
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Parse JSON strings for client
    const formattedOrder = {
      ...order,
      shippingAddress: order.shippingAddress ? JSON.parse(order.shippingAddress) : null,
      billingAddress: order.billingAddress ? JSON.parse(order.billingAddress) : null,
      orderItems: order.orderItems.map(item => ({
        ...item,
        product: {
          ...item.product,
          tags: item.product.tags ? JSON.parse(item.product.tags) : [],
          images: item.product.images ? JSON.parse(item.product.images) : [],
          ingredients: item.product.ingredients ? JSON.parse(item.product.ingredients) : [],
          nutrition: item.product.nutrition ? JSON.parse(item.product.nutrition) : null
        }
      }))
    };

    return NextResponse.json({ order: formattedOrder });

  } catch (error) {
    console.error('Admin order fetch error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch order' },
      { status: error instanceof Error && error.message.includes('Admin') ? 403 : 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    verifyAdmin(request);

    const { status, paymentStatus, paymentId, notes } = await request.json();

    // Get the current order
    const currentOrder = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        user: true,
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    if (!currentOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Update order
    const updatedOrder = await prisma.order.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(paymentStatus && { paymentStatus }),
        ...(paymentId && { paymentId }),
        ...(notes !== undefined && { notes }),
        updatedAt: new Date()
      },
      include: {
        user: true,
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    // Send status update email to customer
    if (status && status !== currentOrder.status) {
      try {
        const { sendEmail } = await import('@/lib/email');
        
        let emailSubject = '';
        let emailContent = '';

        switch (status) {
          case 'CONFIRMED':
            emailSubject = `Order Confirmed - ${params.id}`;
            emailContent = `
              <h2>Your Order Has Been Confirmed!</h2>
              <p>Dear ${currentOrder.user.name},</p>
              <p>Great news! Your order <strong>${params.id}</strong> has been confirmed and is being prepared for shipment.</p>
              <p><strong>Order Total:</strong> ₹${currentOrder.totalAmount}</p>
              <p>You'll receive another email with tracking information once your order ships.</p>
              <p>Thank you for choosing Namamy!</p>
            `;
            break;
          case 'PROCESSING':
            emailSubject = `Order Processing - ${params.id}`;
            emailContent = `
              <h2>Your Order is Being Processed</h2>
              <p>Dear ${currentOrder.user.name},</p>
              <p>Your order <strong>${params.id}</strong> is currently being processed and will be shipped soon.</p>
              <p>Expected shipping time: 1-2 business days</p>
            `;
            break;
          case 'SHIPPED':
            emailSubject = `Order Shipped - ${params.id}`;
            emailContent = `
              <h2>Your Order Has Been Shipped! 📦</h2>
              <p>Dear ${currentOrder.user.name},</p>
              <p>Exciting news! Your order <strong>${params.id}</strong> has been shipped and is on its way to you.</p>
              <p><strong>Expected Delivery:</strong> 3-5 business days</p>
              <p>You can track your package using the tracking information we'll send separately.</p>
            `;
            break;
          case 'DELIVERED':
            emailSubject = `Order Delivered - ${params.id}`;
            emailContent = `
              <h2>Your Order Has Been Delivered! 🎉</h2>
              <p>Dear ${currentOrder.user.name},</p>
              <p>Your order <strong>${params.id}</strong> has been successfully delivered.</p>
              <p>We hope you enjoy your premium makhana products!</p>
              <p>Please consider leaving a review to help other customers.</p>
            `;
            break;
          case 'CANCELLED':
            emailSubject = `Order Cancelled - ${params.id}`;
            emailContent = `
              <h2>Order Cancelled</h2>
              <p>Dear ${currentOrder.user.name},</p>
              <p>Your order <strong>${params.id}</strong> has been cancelled as requested.</p>
              <p>If you paid for this order, a refund will be processed within 5-7 business days.</p>
              <p>We apologize for any inconvenience.</p>
            `;
            break;
        }

        if (emailContent) {
          await sendEmail({
            to: currentOrder.user.email,
            subject: emailSubject,
            html: emailContent
          });
        }

      } catch (emailError) {
        console.error('Failed to send order status email:', emailError);
        // Don't fail the order update if email fails
      }
    }

    return NextResponse.json({
      order: updatedOrder,
      message: 'Order updated successfully'
    });

  } catch (error) {
    console.error('Admin order update error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update order' },
      { status: error instanceof Error && error.message.includes('Admin') ? 403 : 500 }
    );
  }
}