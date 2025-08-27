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

export async function GET(request: NextRequest) {
  try {
    // For development, allow access without strict auth
    // In production, you would uncomment this:
    // verifyAdmin(request);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const inStock = searchParams.get('inStock');

    let where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (category) {
      where.category = category;
    }

    if (inStock !== null && inStock !== undefined) {
      where.inStock = inStock === 'true';
    }

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: {
              orderItems: true,
              reviews: true
            }
          }
        }
      }),
      prisma.product.count({ where })
    ]);

    // Parse JSON strings for client
    const formattedProducts = products.map(product => ({
      ...product,
      tags: product.tags ? JSON.parse(product.tags) : [],
      images: product.images ? JSON.parse(product.images) : [],
      ingredients: product.ingredients ? JSON.parse(product.ingredients) : [],
      nutrition: product.nutrition ? JSON.parse(product.nutrition) : null
    }));

    return NextResponse.json({
      success: true,
      products: formattedProducts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
        itemsPerPage: limit
      }
    });

  } catch (error) {
    console.error('Admin products fetch error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch products' },
      { status: error instanceof Error && error.message.includes('Admin') ? 403 : 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // For development, allow access without strict auth
    // In production, you would uncomment this:
    // verifyAdmin(request);

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
        { error: 'Name, slug, description, price, category, and weight are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug }
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: 'Product with this slug already exists' },
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

    return NextResponse.json({
      success: true,
      product,
      message: 'Product created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Admin product creation error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to create product' },
      { status: error instanceof Error && error.message.includes('Admin') ? 403 : 500 }
    );
  }
}