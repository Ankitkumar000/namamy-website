import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
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
        }
      }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
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

    return NextResponse.json({ product: formattedProduct });

  } catch (error) {
    console.error('Product fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
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
      where: { slug: params.slug },
      data: updateData
    });

    return NextResponse.json({
      product,
      message: 'Product updated successfully'
    });

  } catch (error) {
    console.error('Product update error:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await prisma.product.delete({
      where: { slug: params.slug }
    });

    return NextResponse.json({
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Product delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}