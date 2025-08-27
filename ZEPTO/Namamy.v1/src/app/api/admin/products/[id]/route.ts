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
    // For development, allow access without strict auth
    // In production, you would uncomment this:
    // verifyAdmin(request);

    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            }
          }
        },
        orderItems: {
          include: {
            order: {
              select: {
                id: true,
                createdAt: true,
                status: true
              }
            }
          }
        }
      }
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Parse JSON strings for client
    const formattedProduct = {
      ...product,
      tags: product.tags ? JSON.parse(product.tags) : [],
      images: product.images ? JSON.parse(product.images) : [],
      ingredients: product.ingredients ? JSON.parse(product.ingredients) : [],
      nutrition: product.nutrition ? JSON.parse(product.nutrition) : null
    };

    return NextResponse.json({ success: true, product: formattedProduct });

  } catch (error) {
    console.error('Admin product fetch error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch product' },
      { status: error instanceof Error && error.message.includes('Admin') ? 403 : 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // For development, allow access without strict auth
    // In production, you would uncomment this:
    // verifyAdmin(request);

    const data = await request.json();

    // Convert arrays to JSON strings for storage
    const updateData: any = { ...data };
    if (data.tags) updateData.tags = JSON.stringify(data.tags);
    if (data.images) updateData.images = JSON.stringify(data.images);
    if (data.ingredients) updateData.ingredients = JSON.stringify(data.ingredients);
    if (data.nutrition) updateData.nutrition = JSON.stringify(data.nutrition);
    if (data.price) updateData.price = parseFloat(data.price);
    if (data.comparePrice) updateData.comparePrice = parseFloat(data.comparePrice);
    if (data.stockCount !== undefined) {
      updateData.stockCount = parseInt(data.stockCount);
      updateData.inStock = parseInt(data.stockCount) > 0;
    }

    const product = await prisma.product.update({
      where: { id: params.id },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      product,
      message: 'Product updated successfully'
    });

  } catch (error) {
    console.error('Admin product update error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to update product' },
      { status: error instanceof Error && error.message.includes('Admin') ? 403 : 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // For development, allow access without strict auth
    // In production, you would uncomment this:
    // verifyAdmin(request);

    // Check if product has any orders
    const productWithOrders = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        orderItems: true
      }
    });

    if (!productWithOrders) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    if (productWithOrders.orderItems.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete product with existing orders. Consider marking it as out of stock instead.' },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Admin product delete error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to delete product' },
      { status: error instanceof Error && error.message.includes('Admin') ? 403 : 500 }
    );
  }
}