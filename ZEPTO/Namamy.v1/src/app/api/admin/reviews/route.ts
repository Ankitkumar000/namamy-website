import { NextRequest, NextResponse } from 'next/server';

// Mock reviews data
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
  },
  {
    id: '2',
    productId: 'prod-002',
    productName: 'Roasted Makhana Classic (200g)',
    customerId: 'cust-002',
    customerName: 'Rahul Kumar',
    customerEmail: 'rahul.kumar@email.com',
    rating: 4,
    title: 'Good taste but packaging could be better',
    comment: 'The makhana tastes really good and is perfectly roasted. However, the packaging was a bit damaged when it arrived. The product itself was fine though.',
    status: 'pending',
    isVerifiedPurchase: true,
    helpfulVotes: 3,
    reportCount: 0,
    createdAt: '2024-01-30T08:15:00Z',
    updatedAt: '2024-01-30T08:15:00Z'
  },
  {
    id: '3',
    productId: 'prod-003',
    productName: 'Flavored Makhana Mix (300g)',
    customerId: 'cust-003',
    customerName: 'Anonymous User',
    customerEmail: 'anonymous@spam.com',
    rating: 1,
    title: 'Worst product ever',
    comment: 'This is terrible. Do not buy. Waste of money. Check out this link for better products: suspicious-link.com',
    status: 'spam',
    isVerifiedPurchase: false,
    helpfulVotes: 0,
    reportCount: 5,
    createdAt: '2024-01-28T14:20:00Z',
    updatedAt: '2024-01-28T16:30:00Z'
  },
  {
    id: '4',
    productId: 'prod-001',
    productName: 'Premium Raw Makhana (250g)',
    customerId: 'cust-004',
    customerName: 'Anjali Patel',
    customerEmail: 'anjali.patel@email.com',
    rating: 3,
    title: 'Average quality',
    comment: 'The makhana is okay but nothing special. I expected better quality based on the price. Some pieces were broken and the taste was just average.',
    status: 'rejected',
    isVerifiedPurchase: true,
    helpfulVotes: 1,
    reportCount: 2,
    createdAt: '2024-01-27T11:45:00Z',
    updatedAt: '2024-01-27T14:20:00Z'
  },
  {
    id: '5',
    productId: 'prod-002',
    productName: 'Roasted Makhana Classic (200g)',
    customerId: 'cust-005',
    customerName: 'Vikash Singh',
    customerEmail: 'vikash.singh@email.com',
    rating: 5,
    title: 'Perfect for evening snacks',
    comment: 'Love this roasted makhana! Perfect crunch and taste. My family enjoys it during evening tea time. Will definitely order again.',
    status: 'approved',
    isVerifiedPurchase: true,
    helpfulVotes: 8,
    reportCount: 0,
    createdAt: '2024-01-26T16:30:00Z',
    updatedAt: '2024-01-26T17:15:00Z',
    images: ['/reviews/review-5-img1.jpg', '/reviews/review-5-img2.jpg']
  },
  {
    id: '6',
    productId: 'prod-004',
    productName: 'Organic Makhana Premium (500g)',
    customerId: 'cust-006',
    customerName: 'Meera Gupta',
    customerEmail: 'meera.gupta@email.com',
    rating: 4,
    title: 'Good organic quality',
    comment: 'The organic makhana is of good quality. I can taste the difference compared to regular ones. Delivery was quick too.',
    status: 'pending',
    isVerifiedPurchase: true,
    helpfulVotes: 2,
    reportCount: 0,
    createdAt: '2024-01-30T12:00:00Z',
    updatedAt: '2024-01-30T12:00:00Z'
  }
];

// GET - Get all reviews with admin filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const rating = searchParams.get('rating');
    const verified = searchParams.get('verified');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    let filteredReviews = [...reviews];

    // Apply search filter
    if (search) {
      filteredReviews = filteredReviews.filter(review =>
        review.customerName.toLowerCase().includes(search.toLowerCase()) ||
        review.productName.toLowerCase().includes(search.toLowerCase()) ||
        review.title.toLowerCase().includes(search.toLowerCase()) ||
        review.comment.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply status filter
    if (status && status !== 'all') {
      filteredReviews = filteredReviews.filter(review => review.status === status);
    }

    // Apply rating filter
    if (rating && rating !== 'all') {
      if (rating === '5') {
        filteredReviews = filteredReviews.filter(review => review.rating === 5);
      } else if (rating === '4') {
        filteredReviews = filteredReviews.filter(review => review.rating === 4);
      } else if (rating === '3') {
        filteredReviews = filteredReviews.filter(review => review.rating === 3);
      } else if (rating === '1-2') {
        filteredReviews = filteredReviews.filter(review => review.rating <= 2);
      }
    }

    // Apply verified filter
    if (verified && verified !== 'all') {
      if (verified === 'verified') {
        filteredReviews = filteredReviews.filter(review => review.isVerifiedPurchase);
      } else if (verified === 'unverified') {
        filteredReviews = filteredReviews.filter(review => !review.isVerifiedPurchase);
      }
    }

    // Apply sorting
    filteredReviews.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'helpfulVotes':
          aValue = a.helpfulVotes;
          bValue = b.helpfulVotes;
          break;
        case 'reportCount':
          aValue = a.reportCount;
          bValue = b.reportCount;
          break;
        case 'createdAt':
        default:
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
      }

      if (sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    // Calculate stats
    const stats = {
      total: reviews.length,
      pending: reviews.filter(r => r.status === 'pending').length,
      approved: reviews.filter(r => r.status === 'approved').length,
      rejected: reviews.filter(r => r.status === 'rejected').length,
      spam: reviews.filter(r => r.status === 'spam').length,
      averageRating: reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '0',
      verifiedPurchases: reviews.filter(r => r.isVerifiedPurchase).length
    };

    return NextResponse.json({
      success: true,
      reviews: filteredReviews,
      stats,
      total: filteredReviews.length
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// POST - Bulk actions on reviews
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, reviewIds, data } = body;

    if (!action || !reviewIds || !Array.isArray(reviewIds)) {
      return NextResponse.json(
        { success: false, error: 'Action and review IDs are required' },
        { status: 400 }
      );
    }

    let updatedCount = 0;
    const now = new Date().toISOString();

    switch (action) {
      case 'approve':
        reviews = reviews.map(review => {
          if (reviewIds.includes(review.id)) {
            updatedCount++;
            return { ...review, status: 'approved', updatedAt: now };
          }
          return review;
        });
        break;

      case 'reject':
        reviews = reviews.map(review => {
          if (reviewIds.includes(review.id)) {
            updatedCount++;
            return { ...review, status: 'rejected', updatedAt: now };
          }
          return review;
        });
        break;

      case 'spam':
        reviews = reviews.map(review => {
          if (reviewIds.includes(review.id)) {
            updatedCount++;
            return { ...review, status: 'spam', updatedAt: now };
          }
          return review;
        });
        break;

      case 'delete':
        const beforeLength = reviews.length;
        reviews = reviews.filter(review => !reviewIds.includes(review.id));
        updatedCount = beforeLength - reviews.length;
        break;

      case 'respond':
        const { message } = data;
        if (!message) {
          return NextResponse.json(
            { success: false, error: 'Response message is required' },
            { status: 400 }
          );
        }

        reviews = reviews.map(review => {
          if (reviewIds.includes(review.id)) {
            updatedCount++;
            return {
              ...review,
              adminResponse: {
                message,
                respondedBy: 'Admin User',
                respondedAt: now
              },
              updatedAt: now
            } as typeof review;
          }
          return review;
        });
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

    console.log(`Bulk ${action} performed on ${updatedCount} reviews`);

    return NextResponse.json({
      success: true,
      message: `${updatedCount} reviews ${action}d successfully`,
      updatedCount
    });
  } catch (error) {
    console.error('Error performing bulk review action:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to perform bulk action' },
      { status: 500 }
    );
  }
}