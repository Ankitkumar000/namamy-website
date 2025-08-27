'use client';

import { useState } from 'react';
import { Calendar, User, Clock, Search, Tag, TrendingUp, Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface BlogContentProps {
  locale: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  imageUrl: string;
  views: number;
  likes: number;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Amazing Health Benefits of Makhana: Nature\'s Superfood',
    excerpt: 'Discover why makhana (fox nuts) are considered a superfood and how they can transform your health with their incredible nutritional profile.',
    content: 'Full blog content would go here...',
    author: 'Dr. Priya Sharma',
    publishDate: '2024-01-20',
    readTime: '5 min read',
    category: 'Health & Nutrition',
    tags: ['nutrition', 'health benefits', 'superfood'],
    featured: true,
    imageUrl: '/images/blog/makhana-benefits.jpg',
    views: 2450,
    likes: 89,
  },
  {
    id: '2',
    title: '10 Delicious Makhana Recipes for Healthy Snacking',
    excerpt: 'Transform your snacking game with these creative and nutritious makhana recipes that are perfect for any time of the day.',
    content: 'Full blog content would go here...',
    author: 'Chef Rajesh Kumar',
    publishDate: '2024-01-18',
    readTime: '8 min read',
    category: 'Recipes',
    tags: ['recipes', 'cooking', 'healthy snacks'],
    featured: false,
    imageUrl: '/images/blog/makhana-recipes.jpg',
    views: 1890,
    likes: 67,
  },
  {
    id: '3',
    title: 'Makhana vs Other Snacks: A Nutritional Comparison',
    excerpt: 'See how makhana stacks up against popular snacks like chips, nuts, and crackers in terms of nutrition and health benefits.',
    content: 'Full blog content would go here...',
    author: 'Nutritionist Sneha Patel',
    publishDate: '2024-01-15',
    readTime: '6 min read',
    category: 'Nutrition Comparison',
    tags: ['comparison', 'nutrition', 'healthy eating'],
    featured: true,
    imageUrl: '/images/blog/nutrition-comparison.jpg',
    views: 3120,
    likes: 145,
  },
  {
    id: '4',
    title: 'The Journey of Makhana: From Lotus Farm to Your Table',
    excerpt: 'Follow the fascinating journey of how makhana is cultivated, harvested, and processed to bring you the finest quality fox nuts.',
    content: 'Full blog content would go here...',
    author: 'Farmer Amit Singh',
    publishDate: '2024-01-12',
    readTime: '7 min read',
    category: 'Behind the Scenes',
    tags: ['farming', 'process', 'sustainability'],
    featured: false,
    imageUrl: '/images/blog/makhana-farming.jpg',
    views: 1560,
    likes: 78,
  },
  {
    id: '5',
    title: 'Makhana for Weight Loss: Your Ultimate Guide',
    excerpt: 'Learn how incorporating makhana into your diet can support your weight loss goals while providing essential nutrients.',
    content: 'Full blog content would go here...',
    author: 'Fitness Expert Maya Gupta',
    publishDate: '2024-01-10',
    readTime: '5 min read',
    category: 'Weight Loss',
    tags: ['weight loss', 'fitness', 'diet'],
    featured: false,
    imageUrl: '/images/blog/weight-loss.jpg',
    views: 2780,
    likes: 156,
  },
  {
    id: '6',
    title: 'Ancient Wisdom: Makhana in Traditional Ayurveda',
    excerpt: 'Explore the traditional uses of makhana in Ayurvedic medicine and how ancient wisdom aligns with modern nutritional science.',
    content: 'Full blog content would go here...',
    author: 'Dr. Ayurveda Specialist',
    publishDate: '2024-01-08',
    readTime: '6 min read',
    category: 'Ayurveda',
    tags: ['ayurveda', 'traditional medicine', 'ancient wisdom'],
    featured: false,
    imageUrl: '/images/blog/ayurveda.jpg',
    views: 1340,
    likes: 92,
  },
];

const categories = ['All', 'Health & Nutrition', 'Recipes', 'Weight Loss', 'Ayurveda', 'Behind the Scenes'];

export function BlogContent({ locale }: BlogContentProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
            Health & Wellness Blog
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Expert insights on makhana nutrition, healthy living, and wellness tips
          </p>

          {/* Search Bar */}
          <div className="max-w-lg mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <TrendingUp className="w-6 h-6 text-makhana-600 mr-2" />
            <h2 className="text-2xl font-display font-bold text-gray-900">Featured Articles</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow group">
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-makhana-100 to-makhana-200 rounded-t-lg overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-makhana-200 to-makhana-300">
                        <span className="text-6xl">📰</span>
                      </div>
                    </div>
                    <Badge className="absolute top-4 left-4 bg-red-500">
                      Featured
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <Badge variant="outline">{post.category}</Badge>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(post.publishDate)}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-makhana-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.author}
                        </span>
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {post.views.toLocaleString()}
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {post.likes}
                        </span>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`/${locale}/blog/${post.id}`, '_blank')}
                      >
                        Read More
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* All Posts */}
      <div className="mb-16">
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-8">
          {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
        </h2>
        
        {regularPosts.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search terms or browse different categories.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow group">
                  <div className="aspect-video bg-gradient-to-br from-makhana-100 to-makhana-200 rounded-t-lg overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-makhana-200 to-makhana-300">
                      <span className="text-4xl">📖</span>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <Badge variant="outline">{post.category}</Badge>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-makhana-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </span>
                      <span>{formatDate(post.publishDate)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {post.views.toLocaleString()}
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {post.likes}
                        </span>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`/${locale}/blog/${post.id}`, '_blank')}
                      >
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card className="bg-gradient-to-r from-makhana-500 to-makhana-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Stay Updated with Our Blog</h2>
            <p className="text-makhana-100 mb-6">
              Get the latest health tips, recipes, and wellness insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
              <Button
                variant="outline"
                className="bg-white text-makhana-600 border-white hover:bg-makhana-50"
              >
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}