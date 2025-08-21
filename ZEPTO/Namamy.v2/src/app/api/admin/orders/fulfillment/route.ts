import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';

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

// Bulk order fulfillment workflow
export async function POST(request: NextRequest) {
  try {
    verifyAdmin(request);

    const { orderIds, action, data } = await request.json();

    if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
      return NextResponse.json(
        { error: 'Order IDs array is required' },
        { status: 400 }
      );
    }

    let results = [];

    switch (action) {
      case 'BULK_CONFIRM':
        results = await bulkConfirmOrders(orderIds);
        break;
      case 'BULK_SHIP':
        results = await bulkShipOrders(orderIds, data.trackingNumbers || []);
        break;
      case 'BULK_CANCEL':
        results = await bulkCancelOrders(orderIds, data.reason || 'Cancelled by admin');
        break;
      case 'PRINT_LABELS':
        results = await generateShippingLabels(orderIds);
        break;
      case 'UPDATE_INVENTORY':
        results = await updateInventoryAfterShipment(orderIds);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      message: `${action} completed successfully`,
      results,
      processed: results.length
    });

  } catch (error) {
    console.error('Order fulfillment error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process fulfillment' },
      { status: error instanceof Error && error.message.includes('Admin') ? 403 : 500 }
    );
  }
}

async function bulkConfirmOrders(orderIds: string[]) {
  const results = [];

  for (const orderId of orderIds) {
    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          user: true,
          orderItems: {
            include: { product: true }
          }
        }
      });

      if (!order) {
        results.push({ orderId, status: 'error', message: 'Order not found' });
        continue;
      }

      if (order.status !== 'PENDING') {
        results.push({ orderId, status: 'skipped', message: 'Order not in pending status' });
        continue;
      }

      // Update order status
      await prisma.order.update({
        where: { id: orderId },
        data: { 
          status: 'CONFIRMED',
          updatedAt: new Date()
        }
      });

      // Send confirmation email
      await sendEmail({
        to: order.user.email,
        subject: `Order Confirmed - ${orderId}`,
        html: `
          <h2>Your Order Has Been Confirmed!</h2>
          <p>Dear ${order.user.name},</p>
          <p>Great news! Your order <strong>${orderId}</strong> has been confirmed and is being prepared for shipment.</p>
          <p><strong>Order Total:</strong> ₹${order.totalAmount}</p>
          <p>You'll receive tracking information once your order ships.</p>
          <p>Thank you for choosing Namamy!</p>
        `
      });

      results.push({ orderId, status: 'success', message: 'Order confirmed' });

    } catch (error) {
      results.push({ orderId, status: 'error', message: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  return results;
}

async function bulkShipOrders(orderIds: string[], trackingNumbers: string[]) {
  const results = [];

  for (let i = 0; i < orderIds.length; i++) {
    const orderId = orderIds[i];
    const trackingNumber = trackingNumbers[i] || null;

    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          user: true,
          orderItems: {
            include: { product: true }
          }
        }
      });

      if (!order) {
        results.push({ orderId, status: 'error', message: 'Order not found' });
        continue;
      }

      if (!['CONFIRMED', 'PROCESSING'].includes(order.status)) {
        results.push({ orderId, status: 'skipped', message: 'Order not ready for shipping' });
        continue;
      }

      // Update order status and tracking
      await prisma.order.update({
        where: { id: orderId },
        data: { 
          status: 'SHIPPED',
          ...(trackingNumber && { paymentId: trackingNumber }), // Using paymentId field for tracking
          updatedAt: new Date()
        }
      });

      // Update product stock
      for (const item of order.orderItems) {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stockCount: {
              decrement: item.quantity
            }
          }
        });
      }

      // Send shipping email
      await sendEmail({
        to: order.user.email,
        subject: `Order Shipped - ${orderId}`,
        html: `
          <h2>Your Order Has Been Shipped! 📦</h2>
          <p>Dear ${order.user.name},</p>
          <p>Exciting news! Your order <strong>${orderId}</strong> has been shipped and is on its way to you.</p>
          ${trackingNumber ? `<p><strong>Tracking Number:</strong> ${trackingNumber}</p>` : ''}
          <p><strong>Expected Delivery:</strong> 3-5 business days</p>
          <p>Thank you for choosing Namamy!</p>
        `
      });

      results.push({ 
        orderId, 
        status: 'success', 
        message: 'Order shipped',
        ...(trackingNumber && { trackingNumber })
      });

    } catch (error) {
      results.push({ orderId, status: 'error', message: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  return results;
}

async function bulkCancelOrders(orderIds: string[], reason: string) {
  const results = [];

  for (const orderId of orderIds) {
    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          user: true,
          orderItems: {
            include: { product: true }
          }
        }
      });

      if (!order) {
        results.push({ orderId, status: 'error', message: 'Order not found' });
        continue;
      }

      if (['DELIVERED', 'CANCELLED'].includes(order.status)) {
        results.push({ orderId, status: 'skipped', message: 'Order cannot be cancelled' });
        continue;
      }

      // Update order status
      await prisma.order.update({
        where: { id: orderId },
        data: { 
          status: 'CANCELLED',
          notes: reason,
          updatedAt: new Date()
        }
      });

      // Restore product stock if order was shipped
      if (order.status === 'SHIPPED') {
        for (const item of order.orderItems) {
          await prisma.product.update({
            where: { id: item.productId },
            data: {
              stockCount: {
                increment: item.quantity
              }
            }
          });
        }
      }

      // Send cancellation email
      await sendEmail({
        to: order.user.email,
        subject: `Order Cancelled - ${orderId}`,
        html: `
          <h2>Order Cancelled</h2>
          <p>Dear ${order.user.name},</p>
          <p>Your order <strong>${orderId}</strong> has been cancelled.</p>
          <p><strong>Reason:</strong> ${reason}</p>
          <p>If you paid for this order, a refund will be processed within 5-7 business days.</p>
          <p>We apologize for any inconvenience.</p>
        `
      });

      results.push({ orderId, status: 'success', message: 'Order cancelled' });

    } catch (error) {
      results.push({ orderId, status: 'error', message: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  return results;
}

async function generateShippingLabels(orderIds: string[]) {
  const results = [];

  for (const orderId of orderIds) {
    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          user: true,
          orderItems: {
            include: { product: true }
          }
        }
      });

      if (!order) {
        results.push({ orderId, status: 'error', message: 'Order not found' });
        continue;
      }

      const shippingAddress = order.shippingAddress ? JSON.parse(order.shippingAddress) : null;
      
      if (!shippingAddress) {
        results.push({ orderId, status: 'error', message: 'No shipping address found' });
        continue;
      }

      // Generate shipping label data
      const labelData = {
        orderId,
        customerName: order.user.name,
        customerEmail: order.user.email,
        shippingAddress,
        items: order.orderItems.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          weight: parseFloat(item.product.weight) || 0.5 // Default weight in kg
        })),
        totalWeight: order.orderItems.reduce((sum, item) => sum + (parseFloat(item.product.weight) || 0.5) * item.quantity, 0),
        totalValue: order.totalAmount,
        createdAt: order.createdAt
      };

      results.push({ 
        orderId, 
        status: 'success', 
        message: 'Label generated',
        labelData
      });

    } catch (error) {
      results.push({ orderId, status: 'error', message: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  return results;
}

async function updateInventoryAfterShipment(orderIds: string[]) {
  const results = [];

  for (const orderId of orderIds) {
    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          orderItems: {
            include: { product: true }
          }
        }
      });

      if (!order) {
        results.push({ orderId, status: 'error', message: 'Order not found' });
        continue;
      }

      if (order.status !== 'SHIPPED') {
        results.push({ orderId, status: 'skipped', message: 'Order not shipped yet' });
        continue;
      }

      // Check and update low stock alerts
      const lowStockProducts = [];
      
      for (const item of order.orderItems) {
        const product = await prisma.product.findUnique({
          where: { id: item.productId }
        });

        if (product && product.stockCount <= 10) { // Low stock threshold
          lowStockProducts.push({
            id: product.id,
            name: product.name,
            currentStock: product.stockCount
          });
        }
      }

      results.push({ 
        orderId, 
        status: 'success', 
        message: 'Inventory updated',
        lowStockProducts
      });

    } catch (error) {
      results.push({ orderId, status: 'error', message: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  return results;
}