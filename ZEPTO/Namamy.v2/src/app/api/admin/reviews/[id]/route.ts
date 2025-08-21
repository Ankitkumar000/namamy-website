import { NextRequest, NextResponse } from 'next/server';

// This would be imported from the main route file or database
let reviews = [
  {
    id: '1',
    productId: 'prod-001',
    productName: 'Premium Raw Makhana (250g)',
    customerId: 'cust-001',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@email.com',
    rating: 5,
    title: 'Excellent quality makhana!',
    comment: 'I have been buying makhana from various brands but this one is absolutely the best. The quality is premium, fresh, and perfectly sized. Great for healthy snacking. Highly recommend!',
    status: 'approved',
    isVerifiedPurchase: true,
    helpfulVotes: 12,
    reportCount: 0,
    createdAt: '2024-01-29T10:30:00Z',
    updatedAt: '2024-01-29T15:45:00Z',
    adminResponse: {
      message: 'Thank you for your wonderful feedback, Priya! We\'re delighted that you love our premium makhana.',
      respondedBy: 'Admin Team',
      respondedAt: '2024-01-29T16:00:00Z'
    }
  }
];

// GET - Get specific review
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const review = reviews.find(r => r.id === id);
    
    if (!review) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      review
    });
  } catch (error) {
    console.error('Error fetching review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch review' },
      { status: 500 }
    );
  }
}

// PATCH - Update review status or add admin response
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { action, status, message } = body;
    
    const reviewIndex = reviews.findIndex(r => r.id === id);
    
    if (reviewIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }

    let review = reviews[reviewIndex];
    const now = new Date().toISOString();

    switch (action) {
      case 'approve':
        review.status = 'approved';
        review.updatedAt = now;
        break;

      case 'reject':
        review.status = 'rejected';
        review.updatedAt = now;
        break;

      case 'spam':
        review.status = 'spam';
        review.updatedAt = now;
        break;

      case 'respond':
        if (!message) {
          return NextResponse.json(
            { success: false, error: 'Response message is required' },
            { status: 400 }
          );
        }
        
        review.adminResponse = {
          message,
          respondedBy: 'Admin User',
          respondedAt: now
        };
        review.updatedAt = now;
        break;

      case 'update_status':
        if (!status) {
          return NextResponse.json(
            { success: false, error: 'Status is required' },
            { status: 400 }
          );
        }
        
        review.status = status;
        review.updatedAt = now;
        break;

      case 'report':
        review.reportCount = (review.reportCount || 0) + 1;
        review.updatedAt = now;
        break;

      case 'helpful':
        review.helpfulVotes = (review.helpfulVotes || 0) + 1;
        review.updatedAt = now;
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

    reviews[reviewIndex] = review;

    console.log(`Review ${id} ${action}: ${review.title}`);

    return NextResponse.json({
      success: true,
      review,
      message: `Review ${action}d successfully`
    });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update review' },
      { status: 500 }
    );
  }
}

// DELETE - Delete review
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const reviewIndex = reviews.findIndex(r => r.id === id);
    
    if (reviewIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }

    const deletedReview = reviews[reviewIndex];
    reviews.splice(reviewIndex, 1);

    console.log(`Review deleted: ${deletedReview.title} by ${deletedReview.customerName}`);

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