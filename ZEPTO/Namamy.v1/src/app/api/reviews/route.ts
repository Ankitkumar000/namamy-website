import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch all reviews for admin or public display
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const productId = searchParams.get('productId');
    const rating = searchParams.get('rating');
    const limit = searchParams.get('limit');

    let where: any = {};

    if (status) {
      where.status = status.toUpperCase();
    }

    if (productId) {
      where.productId = productId;
    }

    if (rating) {
      where.rating = parseInt(rating);
    }

    const reviews = await prisma.review.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        product: {
          select: {
            name: true,
            slug: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit ? parseInt(limit) : undefined
    });

    return NextResponse.json({
      success: true,
      reviews: reviews.map(review => ({
        id: review.id,
        userId: review.userId,
        productId: review.productId,
        productName: review.product?.name || 'Unknown Product',
        customerName: review.user?.name || 'Anonymous',
        customerEmail: review.user?.email || '',
        rating: review.rating,
        title: review.comment ? review.comment.split('\n')[0] : 'Review',
        content: review.comment || '',
        status: review.status ? review.status.toLowerCase() : 'approved',
        date: review.createdAt.toISOString().split('T')[0],
        verified: true, // All reviews from registered users are verified
        helpful: 0, // We'll implement this later
        notHelpful: 0,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt
      }))
    });

  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// POST - Create new review (from user review form)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      product, 
      rating, 
      title, 
      review: content,
      recommend,
      userId = null 
    } = body;

    // Validate required fields
    if (!name || !email || !product || !rating || !title || !content) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Create a new user for the reviewer
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: '', // Reviews don't require login
          role: 'USER'
        }
      });
    }

    // Find product by name (since the form sends product name, not ID)
    const productRecord = await prisma.product.findFirst({
      where: {
        name: {
          contains: product
        }
      }
    });

    if (!productRecord) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 400 }
      );
    }

    // Create the review
    const newReview = await prisma.review.create({
      data: {
        userId: user.id,
        productId: productRecord.id,
        rating: parseInt(rating),
        comment: `${title}\n\n${content}`,
        status: 'PENDING' // Reviews start as pending for moderation
      }
    });

    console.log('New review created:', newReview.id);

    // Send success response
    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully! It will be published after moderation.',
      review: {
        id: newReview.id,
        productName: productRecord.name,
        customerName: name,
        rating: rating,
        title: title,
        status: 'pending'
      }
    });

  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit review' },
      { status: 500 }
    );
  }
}

// PATCH - Update review status (for admin moderation)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Review ID is required' },
        { status: 400 }
      );
    }

    const validStatuses = ['PENDING', 'APPROVED', 'REJECTED'];
    if (status && !validStatuses.includes(status.toUpperCase())) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      );
    }

    const updatedReview = await prisma.review.update({
      where: { id },
      data: {
        status: status.toUpperCase(),
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Review status updated successfully',
      review: updatedReview
    });

  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update review' },
      { status: 500 }
    );
  }
}

// DELETE - Delete review (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Review ID is required' },
        { status: 400 }
      );
    }

    await prisma.review.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}