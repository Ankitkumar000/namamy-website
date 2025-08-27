import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const inStock = searchParams.get('inStock');

    let where: any = {};

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (inStock === 'true') {
      where.inStock = true;
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Parse JSON strings for client
    const formattedProducts = products.map(product => ({
      ...product,
      tags: product.tags ? JSON.parse(product.tags) : [],
      images: product.images ? JSON.parse(product.images) : [],
      ingredients: product.ingredients ? JSON.parse(product.ingredients) : [],
      nutrition: product.nutrition ? JSON.parse(product.nutrition) : null
    }));

    return NextResponse.json({ products: formattedProducts });

  } catch (error) {
    console.error('Products fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      slug,
      description,
      price,
      comparePrice,
      category,
      subcategory,
      tags,
      weight,
      images,
      stockCount,
      nutrition,
      ingredients,
      featured
    } = await request.json();

    // Validation
    if (!name || !slug || !description || !price || !category || !weight) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        comparePrice: comparePrice ? parseFloat(comparePrice) : null,
        category,
        subcategory,
        tags: JSON.stringify(tags || []),
        weight,
        images: JSON.stringify(images || []),
        stockCount: parseInt(stockCount) || 0,
        inStock: (parseInt(stockCount) || 0) > 0,
        nutrition: nutrition ? JSON.stringify(nutrition) : null,
        ingredients: JSON.stringify(ingredients || []),
        featured: Boolean(featured)
      }
    });

    return NextResponse.json(
      { product, message: 'Product created successfully' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}