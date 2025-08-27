import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

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

// Mock data for coupons (in a real app, this would be in a database)
// This should be the same data as in the main route.ts file
// In a real application, this would be fetched from a database
let coupons = [
  {
    id: '1',
    code: 'WELCOME10',
    name: 'Welcome Discount',
    description: 'Get 10% off on your first order',
    type: 'percentage',
    value: 10,
    minOrderValue: 500,
    maxDiscount: 100,
    maxUsage: 100,
    usedCount: 15,
    isActive: true,
    startDate: '2024-01-01T00:00:00.000Z',
    endDate: '2024-12-31T23:59:59.000Z',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    code: 'SAVE20',
    name: 'Save 20 Rupees',
    description: 'Flat ₹20 off on orders above ₹200',
    type: 'fixed',
    value: 20,
    minOrderValue: 200,
    maxUsage: 50,
    usedCount: 8,
    isActive: true,
    startDate: '2024-01-01T00:00:00.000Z',
    endDate: '2024-06-30T23:59:59.000Z',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '3',
    code: 'FIRST50',
    name: 'First Order Special',
    description: 'Get ₹50 off on your first order',
    type: 'fixed',
    value: 50,
    minOrderValue: 300,
    maxUsage: 200,
    usedCount: 45,
    isActive: true,
    startDate: '2024-01-01T00:00:00.000Z',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '4',
    code: 'HEALTHY100',
    name: 'Healthy Choice',
    description: 'Get ₹100 off on orders above ₹1000',
    type: 'fixed',
    value: 100,
    minOrderValue: 1000,
    maxUsage: 75,
    usedCount: 22,
    isActive: true,
    startDate: '2024-01-01T00:00:00.000Z',
    endDate: '2024-12-31T23:59:59.000Z',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '5',
    code: 'FREESHIP',
    name: 'Free Shipping',
    description: 'Free shipping on all orders',
    type: 'free_shipping',
    value: 0,
    minOrderValue: 0,
    maxUsage: 1000,
    usedCount: 156,
    isActive: false,
    startDate: '2024-01-01T00:00:00.000Z',
    endDate: '2024-03-31T23:59:59.000Z',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // For development, allow access without strict auth
    // In production, you would uncomment this:
    // verifyAdmin(request);

    const coupon = coupons.find(c => c.id === params.id);
    
    if (!coupon) {
      return NextResponse.json(
        { error: 'Coupon not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(coupon);
  } catch (error) {
    console.error('Error fetching coupon:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coupon' },
      { status: 500 }
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

    const body = await request.json();
    const couponIndex = coupons.findIndex(c => c.id === params.id);
    
    if (couponIndex === -1) {
      return NextResponse.json(
        { error: 'Coupon not found' },
        { status: 404 }
      );
    }

    // Validate required fields
    if (!body.code || !body.name || !body.type || !body.startDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if coupon code already exists (exclude current coupon)
    const existingCoupon = coupons.find(c => 
      c.code.toUpperCase() === body.code.toUpperCase() && c.id !== params.id
    );
    if (existingCoupon) {
      return NextResponse.json(
        { error: 'Coupon code already exists' },
        { status: 409 }
      );
    }

    // Validate discount value
    if (body.type !== 'free_shipping' && (!body.value || body.value <= 0)) {
      return NextResponse.json(
        { error: 'Discount value must be greater than 0' },
        { status: 400 }
      );
    }

    if (body.type === 'percentage' && body.value > 100) {
      return NextResponse.json(
        { error: 'Percentage discount cannot exceed 100%' },
        { status: 400 }
      );
    }

    // Update coupon
    const updatedCoupon = {
      ...coupons[couponIndex],
      code: body.code.toUpperCase(),
      name: body.name,
      description: body.description || '',
      type: body.type,
      value: body.type === 'free_shipping' ? 0 : body.value,
      minOrderValue: body.minOrderValue || undefined,
      maxDiscount: body.maxDiscount || undefined,
      maxUsage: body.maxUsage || undefined,
      isActive: body.isActive !== false,
      startDate: new Date(body.startDate).toISOString(),
      endDate: body.endDate ? new Date(body.endDate).toISOString() : undefined,
      updatedAt: new Date().toISOString()
    };

    coupons[couponIndex] = updatedCoupon;

    return NextResponse.json(updatedCoupon);
  } catch (error) {
    console.error('Error updating coupon:', error);
    return NextResponse.json(
      { error: 'Failed to update coupon' },
      { status: 500 }
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

    const couponIndex = coupons.findIndex(c => c.id === params.id);
    
    if (couponIndex === -1) {
      return NextResponse.json(
        { error: 'Coupon not found' },
        { status: 404 }
      );
    }

    // Remove coupon from array
    const deletedCoupon = coupons.splice(couponIndex, 1)[0];

    return NextResponse.json({ 
      message: 'Coupon deleted successfully',
      coupon: deletedCoupon 
    });
  } catch (error) {
    console.error('Error deleting coupon:', error);
    return NextResponse.json(
      { error: 'Failed to delete coupon' },
      { status: 500 }
    );
  }
}