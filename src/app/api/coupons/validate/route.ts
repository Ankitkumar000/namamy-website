import { NextRequest, NextResponse } from 'next/server';

// Mock data for coupons (should match admin API data)
// In a real app, this would be fetched from a database
const coupons = [
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

export async function POST(request: NextRequest) {
  try {
    const { code, orderValue } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Coupon code is required' },
        { status: 400 }
      );
    }

    if (!orderValue || orderValue <= 0) {
      return NextResponse.json(
        { error: 'Order value is required and must be greater than 0' },
        { status: 400 }
      );
    }

    // Find coupon by code (case insensitive)
    const coupon = coupons.find(c => 
      c.code.toLowerCase() === code.toLowerCase()
    );

    if (!coupon) {
      return NextResponse.json(
        { error: 'Invalid coupon code' },
        { status: 404 }
      );
    }

    // Check if coupon is active
    if (!coupon.isActive) {
      return NextResponse.json(
        { error: 'This coupon is not active' },
        { status: 400 }
      );
    }

    // Check if coupon has expired
    const now = new Date();
    const startDate = new Date(coupon.startDate);
    const endDate = coupon.endDate ? new Date(coupon.endDate) : null;

    if (now < startDate) {
      return NextResponse.json(
        { error: 'This coupon is not yet active' },
        { status: 400 }
      );
    }

    if (endDate && now > endDate) {
      return NextResponse.json(
        { error: 'This coupon has expired' },
        { status: 400 }
      );
    }

    // Check minimum order value
    if (coupon.minOrderValue && orderValue < coupon.minOrderValue) {
      return NextResponse.json(
        { 
          error: `Minimum order value of ₹${coupon.minOrderValue} required for this coupon` 
        },
        { status: 400 }
      );
    }

    // Check usage limit
    if (coupon.maxUsage && coupon.usedCount >= coupon.maxUsage) {
      return NextResponse.json(
        { error: 'This coupon has reached its usage limit' },
        { status: 400 }
      );
    }

    // Calculate discount
    let discountAmount = 0;
    let freeShipping = false;

    switch (coupon.type) {
      case 'percentage':
        discountAmount = (orderValue * coupon.value) / 100;
        if (coupon.maxDiscount) {
          discountAmount = Math.min(discountAmount, coupon.maxDiscount);
        }
        break;
      case 'fixed':
        discountAmount = coupon.value;
        break;
      case 'free_shipping':
        freeShipping = true;
        discountAmount = 0; // Shipping cost would be handled separately
        break;
    }

    // Ensure discount doesn't exceed order value
    discountAmount = Math.min(discountAmount, orderValue);

    return NextResponse.json({
      valid: true,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        name: coupon.name,
        description: coupon.description,
        type: coupon.type
      },
      discountAmount: Math.round(discountAmount * 100) / 100, // Round to 2 decimal places
      freeShipping,
      message: `Coupon applied successfully! You saved ₹${Math.round(discountAmount * 100) / 100}`
    });

  } catch (error) {
    console.error('Error validating coupon:', error);
    return NextResponse.json(
      { error: 'Failed to validate coupon' },
      { status: 500 }
    );
  }
}