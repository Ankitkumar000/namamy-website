'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  Star,
  MessageSquare,
  User,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  X,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AdminLayout } from '@/components/admin/AdminLayout';

interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  title: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  verified: boolean;
  helpful: number;
  notHelpful: number;
  images?: string[];
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Premium Roasted Makhana - Classic',
    customerName: 'Priya Sharma',
    customerEmail: 'priya@example.com',
    rating: 5,
    title: 'Exceptional Quality and Taste!',
    content: 'I\'ve been ordering from Namamy for over 6 months now, and the quality is consistently excellent. The roasted makhana is perfectly crunchy, and the flavors are amazing. My kids especially love the chocolate variety.',
    status: 'approved',
    date: '2024-01-15',
    verified: true,
    helpful: 23,
    notHelpful: 1,
    images: ['/images/products/makhana-3.jpg']
  },
  {
    id: '2',
    productId: '2',
    productName: 'Masala Makhana Mix',
    customerName: 'Rajesh Kumar',
    customerEmail: 'rajesh@example.com',
    rating: 4,
    title: 'Great taste, could be more spicy',
    content: 'Good quality makhana with nice packaging. The masala flavor is good but I would prefer it to be a bit more spicy. Overall satisfied with the purchase.',
    status: 'approved',
    date: '2024-01-12',
    verified: true,
    helpful: 15,
    notHelpful: 3
  },
  {
    id: '3',
    productId: '3',
    productName: 'Peri Peri Makhana',
    customerName: 'Anonymous User',
    customerEmail: 'user@example.com',
    rating: 2,
    title: 'Not worth the price',
    content: 'The makhana was stale and didn\'t taste fresh. Very disappointed with this purchase. Would not recommend.',
    status: 'pending',
    date: '2024-01-10',
    verified: false,
    helpful: 2,
    notHelpful: 8
  },
  {
    id: '4',
    productId: '1',
    productName: 'Premium Roasted Makhana - Classic',
    customerName: 'Sneha Patel',
    customerEmail: 'sneha@example.com',
    rating: 5,
    title: 'Perfect healthy snack!',
    content: 'Love this product! Perfect for office snacking and much healthier than chips. The quality is consistent and delivery is always on time.',
    status: 'approved',
    date: '2024-01-08',
    verified: true,
    helpful: 31,
    notHelpful: 0
  },
  {
    id: '5',
    productId: '4',
    productName: 'Chocolate Makhana Premium',
    customerName: 'Amit Singh',
    customerEmail: 'amit@example.com',
    rating: 1,
    title: 'Terrible quality',
    content: 'This is clearly a fake review attempt. The product was amazing and I loved every bite of it. Just testing the moderation system.',
    status: 'rejected',
    date: '2024-01-05',
    verified: false,
    helpful: 0,
    notHelpful: 12
  }
];

export default function AdminReviews() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviews from API
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/reviews');
      const data = await response.json();
      
      if (response.ok && data.success) {
        setReviews(data.reviews);
      } else {
        console.error('Failed to fetch reviews:', data.error);
        // Fallback to mock data if API fails
        setReviews(mockReviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Fallback to mock data if API fails
      setReviews(mockReviews);
    } finally {
      setLoading(false);
    }
  };

  // Load reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || review.status === selectedStatus;
    const matchesRating = selectedRating === 'all' || review.rating.toString() === selectedRating;
    return matchesSearch && matchesStatus && matchesRating;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleApproveReview = async (review: Review) => {
    try {
      const response = await fetch('/api/reviews', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: review.id,
          status: 'approved'
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setReviews(prevReviews =>
          prevReviews.map(r =>
            r.id === review.id ? { ...r, status: 'approved' as const } : r
          )
        );
        alert(`Review by ${review.customerName} has been approved!`);
      } else {
        throw new Error(result.error || 'Failed to approve review');
      }
    } catch (error) {
      console.error('Error approving review:', error);
      alert('Failed to approve review. Please try again.');
    }
  };

  const handleRejectReview = async (review: Review) => {
    try {
      const response = await fetch('/api/reviews', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: review.id,
          status: 'rejected'
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setReviews(prevReviews =>
          prevReviews.map(r =>
            r.id === review.id ? { ...r, status: 'rejected' as const } : r
          )
        );
        alert(`Review by ${review.customerName} has been rejected!`);
      } else {
        throw new Error(result.error || 'Failed to reject review');
      }
    } catch (error) {
      console.error('Error rejecting review:', error);
      alert('Failed to reject review. Please try again.');
    }
  };

  const handleViewReview = (review: Review) => {
    alert(`Viewing full review by ${review.customerName}\n\nProduct: ${review.productName}\nRating: ${review.rating}/5\nTitle: ${review.title}\n\nContent: ${review.content}\n\nHelpful: ${review.helpful} | Not Helpful: ${review.notHelpful}`);
  };

  const handleDeleteReview = (review: Review) => {
    setSelectedReview(review);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedReview) return;

    try {
      const response = await fetch(`/api/reviews?id=${selectedReview.id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setReviews(prevReviews => prevReviews.filter(r => r.id !== selectedReview.id));
        alert(`Review by ${selectedReview.customerName} has been deleted.`);
      } else {
        throw new Error(result.error || 'Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review. Please try again.');
    } finally {
      setShowDeleteModal(false);
      setSelectedReview(null);
    }
  };

  const reviewStats = {
    total: reviews.length,
    approved: reviews.filter(r => r.status === 'approved').length,
    pending: reviews.filter(r => r.status === 'pending').length,
    rejected: reviews.filter(r => r.status === 'rejected').length,
    averageRating: reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '0'
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reviews Management</h1>
            <p className="text-gray-600">Moderate and manage customer reviews</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button variant="outline" onClick={fetchReviews} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button onClick={() => window.open('/reviews', '_blank')}>
              <ExternalLink className="w-4 h-4 mr-2" />
              View Reviews Page
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Reviews</p>
                  <p className="text-2xl font-bold">{reviewStats.total}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-makhana-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">{reviewStats.approved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{reviewStats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{reviewStats.rejected}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-blue-600">{reviewStats.averageRating}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-400 fill-current" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search reviews, customers, or products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Reviews Table */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Reviews ({filteredReviews.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            {renderStars(review.rating)}
                            <span className="text-sm font-medium text-gray-900">
                              {review.rating}.0
                            </span>
                          </div>
                          <Badge className={getStatusColor(review.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(review.status)}
                              <span>{review.status.charAt(0).toUpperCase() + review.status.slice(1)}</span>
                            </div>
                          </Badge>
                          {review.verified && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>

                      {/* Customer & Product Info */}
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{review.customerName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Package className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{review.productName}</span>
                        </div>
                      </div>

                      {/* Review Content */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{review.content}</p>
                        {review.images && review.images.length > 0 && (
                          <div className="flex space-x-2 mt-3">
                            {review.images.map((image, index) => (
                              <div key={index} className="w-16 h-16 rounded-lg overflow-hidden">
                                <img 
                                  src={image} 
                                  alt={`Review image ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Helpfulness */}
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-1 text-green-600">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">{review.helpful}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-red-600">
                          <ThumbsDown className="w-4 h-4" />
                          <span className="text-sm">{review.notHelpful}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2 ml-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewReview(review)}
                        title="View Full Review"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      {review.status === 'pending' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleApproveReview(review)}
                            title="Approve Review"
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRejectReview(review)}
                            title="Reject Review"
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      
                      {review.status === 'approved' && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRejectReview(review)}
                          title="Reject Review"
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      )}
                      
                      {review.status === 'rejected' && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleApproveReview(review)}
                          title="Approve Review"
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteReview(review)}
                        title="Delete Review"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedReview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Delete Review</h2>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="mb-6">
                  <p className="text-gray-600">
                    Are you sure you want to delete this review by {selectedReview.customerName}? This action cannot be undone.
                  </p>
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-1 mb-1">
                          {renderStars(selectedReview.rating)}
                        </div>
                        <p className="font-medium text-red-900 text-sm">{selectedReview.title}</p>
                        <p className="text-sm text-red-700">by {selectedReview.customerName}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={confirmDelete}
                  >
                    Delete Review
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}