'use client';

import { useState } from 'react';
import { Star, Filter, ThumbsUp, MessageCircle, User, Calendar, ShoppingBag, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface ReviewsContentProps {
  locale: string;
}

interface Review {
  id: string;
  userName: string;
  userLocation: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  productName: string;
  verified: boolean;
  helpful: number;
  images?: string[];
  flavor?: string;
}

const mockReviews: Review[] = [
  {
    id: '1',
    userName: 'Priya Sharma',
    userLocation: 'Mumbai, Maharashtra',
    rating: 5,
    title: 'Exceptional Quality and Taste!',
    content: 'I\'ve been ordering from Namamy for over 6 months now, and the quality is consistently excellent. The roasted makhana is perfectly crunchy, and the flavors are amazing. My kids especially love the chocolate variety. The packaging is also very good, keeping the products fresh for a long time.',
    date: '2024-01-15',
    productName: 'Premium Roasted Makhana',
    verified: true,
    helpful: 23,
    flavor: 'Classic Roasted',
  },
  {
    id: '2',
    userName: 'Rajesh Kumar',
    userLocation: 'Delhi, NCR',
    rating: 5,
    title: 'Best Healthy Snack for the Family',
    content: 'As a fitness enthusiast, I was looking for healthy snacking options. Namamy\'s makhana is perfect - high protein, low calories, and delicious. The masala flavor is my favorite. Great for post-workout snacking or just munching while working.',
    date: '2024-01-12',
    productName: 'Masala Makhana Mix',
    verified: true,
    helpful: 18,
    flavor: 'Masala Mix',
  },
  {
    id: '3',
    userName: 'Sneha Patel',
    userLocation: 'Ahmedabad, Gujarat',
    rating: 4,
    title: 'Good Product, Fast Delivery',
    content: 'The makhana quality is really good and the delivery was super fast. I ordered on Sunday and received it by Tuesday. The peri peri flavor has just the right amount of spice. Would have given 5 stars but the quantity felt a bit less for the price.',
    date: '2024-01-10',
    productName: 'Peri Peri Makhana',
    verified: true,
    helpful: 15,
    flavor: 'Peri Peri',
  },
  {
    id: '4',
    userName: 'Amit Singh',
    userLocation: 'Bangalore, Karnataka',
    rating: 5,
    title: 'Premium Quality Makhana',
    content: 'Ordered for Diwali gifting and everyone loved it! The presentation is beautiful and the taste is authentic. You can really tell the difference in quality compared to other brands. The chocolate makhana was a hit with kids and adults alike.',
    date: '2024-01-08',
    productName: 'Chocolate Makhana Premium',
    verified: true,
    helpful: 31,
    flavor: 'Chocolate',
  },
  {
    id: '5',
    userName: 'Kavya Reddy',
    userLocation: 'Hyderabad, Telangana',
    rating: 5,
    title: 'Perfect for Diabetic-Friendly Snacking',
    content: 'My mother is diabetic and finding healthy snacks is always a challenge. Namamy\'s makhana is perfect - low GI, high nutrition, and tastes great. The customer service is also excellent. They called to confirm the delivery address and time.',
    date: '2024-01-05',
    productName: 'Himalayan Pink Salt Makhana',
    verified: true,
    helpful: 27,
    flavor: 'Himalayan Pink Salt',
  },
  {
    id: '6',
    userName: 'Rohit Mehta',
    userLocation: 'Pune, Maharashtra',
    rating: 4,
    title: 'Great for Office Snacking',
    content: 'Keep these at my office desk for healthy snacking during long work hours. Much better than chips or biscuits. The cheese & herbs flavor is unique and tasty. Packaging is convenient for carrying around.',
    date: '2024-01-03',
    productName: 'Cheese & Herbs Makhana',
    verified: true,
    helpful: 12,
    flavor: 'Cheese & Herbs',
  },
  {
    id: '7',
    userName: 'Deepika Joshi',
    userLocation: 'Kolkata, West Bengal',
    rating: 5,
    title: 'Authentic Traditional Taste',
    content: 'Being from Bihar originally, I know good makhana when I taste it. Namamy\'s products remind me of the traditional roasted makhana from back home. The quality is exceptional and the roasting is perfect. Highly recommended for anyone who appreciates authentic flavors.',
    date: '2024-01-01',
    productName: 'Traditional Roasted Makhana',
    verified: true,
    helpful: 35,
    flavor: 'Traditional',
  },
  {
    id: '8',
    userName: 'Arjun Nair',
    userLocation: 'Kochi, Kerala',
    rating: 4,
    title: 'Good Variety Pack',
    content: 'Ordered the variety pack to try different flavors. Most were excellent, especially the classic roasted and masala. The spicy variants were really good too. Only complaint is that some packets had slightly smaller pieces, but overall very satisfied.',
    date: '2023-12-28',
    productName: 'Variety Pack (6 Flavors)',
    verified: true,
    helpful: 19,
    flavor: 'Mixed Variety',
  },
];

const ratingDistribution = [
  { stars: 5, count: 1842, percentage: 73 },
  { stars: 4, count: 532, percentage: 21 },
  { stars: 3, count: 89, percentage: 4 },
  { stars: 2, count: 31, percentage: 1 },
  { stars: 1, count: 25, percentage: 1 },
];

const filterOptions = [
  { label: 'All Reviews', value: 'all' },
  { label: '5 Stars', value: '5' },
  { label: '4 Stars', value: '4' },
  { label: '3 Stars', value: '3' },
  { label: 'Verified Purchases', value: 'verified' },
  { label: 'With Photos', value: 'photos' },
];

export function ReviewsContent({ locale }: ReviewsContentProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const totalReviews = ratingDistribution.reduce((sum, item) => sum + item.count, 0);
  const averageRating = (
    ratingDistribution.reduce((sum, item) => sum + (item.stars * item.count), 0) / totalReviews
  ).toFixed(1);

  const filteredReviews = mockReviews.filter(review => {
    switch (selectedFilter) {
      case '5':
        return review.rating === 5;
      case '4':
        return review.rating === 4;
      case '3':
        return review.rating === 3;
      case 'verified':
        return review.verified;
      case 'photos':
        return review.images && review.images.length > 0;
      default:
        return true;
    }
  });

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    };

    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${sizeClasses[size]} ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Customer Reviews
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            See what our customers say about our premium makhana products
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              {renderStars(5, 'lg')}
              <span className="text-2xl font-bold text-gray-900">{averageRating}</span>
            </div>
            <div className="text-gray-600">
              Based on {totalReviews.toLocaleString()} reviews
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Ratings Overview & Filters */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Rating Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Rating Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ratingDistribution.reverse().map((item) => (
                    <div key={item.stars} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 min-w-0">
                        <span className="text-sm font-medium">{item.stars}</span>
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 min-w-0">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filter Reviews</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedFilter(option.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedFilter === option.value
                          ? 'bg-makhana-100 text-makhana-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sort Options */}
            <Card>
              <CardHeader>
                <CardTitle>Sort By</CardTitle>
              </CardHeader>
              <CardContent>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                  <option value="helpful">Most Helpful</option>
                </select>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content - Reviews */}
        <div className="lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredReviews.length} Reviews
            </h2>
          </div>

          <div className="space-y-6">
            {filteredReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-makhana-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-makhana-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{review.userName}</h3>
                            {review.verified && (
                              <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                                <ShoppingBag className="w-3 h-3 mr-1" />
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{review.userLocation}</p>
                          <div className="flex items-center space-x-3 mt-1">
                            {renderStars(review.rating, 'sm')}
                            <span className="text-xs text-gray-500 flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="mb-4">
                      <Badge variant="outline" className="text-xs">
                        {review.productName} - {review.flavor}
                      </Badge>
                    </div>

                    {/* Review Content */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                      <p className="text-gray-700 leading-relaxed">{review.content}</p>
                    </div>

                    {/* Review Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-makhana-600 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">Helpful ({review.helpful})</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-makhana-600 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">Reply</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Reviews
            </Button>
          </div>
        </div>
      </div>

      {/* Write Review CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16"
      >
        <Card className="bg-gradient-to-r from-makhana-500 to-makhana-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Share Your Experience</h2>
            <p className="text-makhana-100 mb-6">
              Have you tried our makhana? We'd love to hear about your experience!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                className="bg-white text-makhana-600 border-white hover:bg-makhana-50"
                onClick={() => window.open(`/${locale}/shop`, '_blank')}
              >
                <Star className="w-4 h-4 mr-2" />
                Write a Review
              </Button>
              <Button
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-makhana-600"
                onClick={() => window.open(`/${locale}/shop`, '_blank')}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Shop Products
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}