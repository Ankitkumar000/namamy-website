import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await prisma.newsletter.findUnique({
      where: { email }
    });

    if (existingSubscriber) {
      if (existingSubscriber.status === 'UNSUBSCRIBED') {
        // Reactivate subscription
        await prisma.newsletter.update({
          where: { email },
          data: { status: 'ACTIVE' }
        });
        return NextResponse.json({
          message: 'Your subscription has been reactivated!'
        });
      } else {
        return NextResponse.json(
          { error: 'Email is already subscribed' },
          { status: 400 }
        );
      }
    }

    // Create new subscriber
    const subscriber = await prisma.newsletter.create({
      data: {
        email,
        name: name || null,
        status: 'ACTIVE'
      }
    });

    // Send welcome email
    try {
      await sendEmail({
        to: email,
        subject: 'Welcome to Namamy Newsletter!',
        html: `
          <h2>Thank you for subscribing!</h2>
          <p>Welcome to the Namamy newsletter! You'll receive updates about:</p>
          <ul>
            <li>New product launches</li>
            <li>Exclusive offers and discounts</li>
            <li>Health tips and recipes</li>
            <li>Behind-the-scenes content</li>
          </ul>
          <p>Stay tuned for exciting updates!</p>
          <br>
          <p>Best regards,<br>The Namamy Team</p>
        `
      });
    } catch (emailError) {
      console.error('Newsletter welcome email error:', emailError);
      // Don't fail the subscription if email fails
    }

    return NextResponse.json({
      message: 'Successfully subscribed to newsletter!'
    }, { status: 201 });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let where: any = {};
    if (status) {
      where.status = status;
    }

    const subscribers = await prisma.newsletter.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ subscribers });

  } catch (error) {
    console.error('Newsletter fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}