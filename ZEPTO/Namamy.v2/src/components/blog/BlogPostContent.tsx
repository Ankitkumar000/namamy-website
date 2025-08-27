'use client';

import { useState } from 'react';
import { Calendar, User, Clock, Tag, Heart, Eye, Share2, ArrowLeft, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface BlogPostContentProps {
  locale: string;
  slug: string;
}

// Mock blog post data - in a real app, this would be fetched based on the slug
const getBlogPost = (slug: string) => {
  const posts = {
    '1': {
      id: '1',
      title: 'The Amazing Health Benefits of Makhana: Nature\'s Superfood',
      excerpt: 'Discover why makhana (fox nuts) are considered a superfood and how they can transform your health with their incredible nutritional profile.',
      content: `
        <p>Makhana, also known as fox nuts or lotus seeds, have been consumed in India for centuries and are now gaining recognition worldwide as a superfood. These crunchy, nutritious snacks are not just delicious but packed with incredible health benefits that make them an ideal addition to any healthy diet.</p>

        <h2>What Makes Makhana Special?</h2>
        <p>Makhana is harvested from the lotus flower (Nelumbo nucifera) and has been used in traditional Indian medicine for its healing properties. Unlike many modern snacks that are processed and loaded with artificial ingredients, makhana is completely natural and minimally processed.</p>

        <h2>Nutritional Profile</h2>
        <p>One of the most impressive aspects of makhana is its exceptional nutritional profile:</p>
        <ul>
          <li><strong>High Protein Content:</strong> Contains about 9.7g of protein per 100g, making it an excellent plant-based protein source</li>
          <li><strong>Low in Calories:</strong> Only 347 calories per 100g, perfect for weight management</li>
          <li><strong>Rich in Fiber:</strong> Helps with digestion and keeps you feeling full longer</li>
          <li><strong>Mineral Rich:</strong> Contains calcium, magnesium, iron, and phosphorus</li>
          <li><strong>Antioxidants:</strong> Packed with flavonoids and other antioxidants that fight free radicals</li>
        </ul>

        <h2>Top Health Benefits</h2>
        
        <h3>1. Weight Management</h3>
        <p>Makhana is low in calories and high in protein and fiber, making it an ideal snack for those looking to maintain or lose weight. The high fiber content helps you feel full, reducing overall calorie intake.</p>

        <h3>2. Heart Health</h3>
        <p>The magnesium content in makhana helps regulate blood pressure and supports cardiovascular health. The antioxidants also help reduce inflammation and protect against heart disease.</p>

        <h3>3. Digestive Health</h3>
        <p>The high fiber content promotes healthy digestion and can help prevent constipation. Traditional medicine also uses makhana to treat digestive disorders.</p>

        <h3>4. Blood Sugar Control</h3>
        <p>Makhana has a low glycemic index, making it suitable for people with diabetes. It helps regulate blood sugar levels and prevents sudden spikes.</p>

        <h3>5. Anti-Aging Properties</h3>
        <p>Rich in antioxidants, makhana helps fight free radicals that cause premature aging. Regular consumption can help maintain healthy, youthful skin.</p>

        <h2>How to Incorporate Makhana into Your Diet</h2>
        <p>There are numerous ways to enjoy makhana:</p>
        <ul>
          <li>As a healthy snack between meals</li>
          <li>Added to trail mixes with nuts and dried fruits</li>
          <li>In curries and traditional Indian dishes</li>
          <li>As a crunchy topping for yogurt or salads</li>
          <li>In smoothie bowls for added texture</li>
        </ul>

        <h2>Choosing Quality Makhana</h2>
        <p>When selecting makhana, look for:</p>
        <ul>
          <li>Fresh, white color without yellow spots</li>
          <li>Crispy texture when fresh</li>
          <li>No artificial additives or preservatives</li>
          <li>Proper packaging that maintains freshness</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Makhana truly deserves its status as a superfood. With its impressive nutritional profile, numerous health benefits, and versatility in cooking, it's an excellent addition to any healthy lifestyle. Whether you're looking to manage your weight, support heart health, or simply enjoy a nutritious snack, makhana is nature's perfect solution.</p>

        <p>At Namamy, we're committed to bringing you the highest quality makhana, carefully sourced and processed to retain all its natural goodness. Try our premium makhana varieties and experience the benefits of this ancient superfood for yourself.</p>
      `,
      author: 'Dr. Priya Sharma',
      publishDate: '2024-01-20',
      readTime: '5 min read',
      category: 'Health & Nutrition',
      tags: ['nutrition', 'health benefits', 'superfood'],
      views: 2450,
      likes: 89,
    },
    // Add more posts as needed
  };

  return posts[slug as keyof typeof posts] || posts['1'];
};

const relatedPosts = [
  {
    id: '2',
    title: '10 Delicious Makhana Recipes for Healthy Snacking',
    excerpt: 'Transform your snacking game with these creative and nutritious makhana recipes.',
    readTime: '8 min read',
  },
  {
    id: '3',
    title: 'Makhana vs Other Snacks: A Nutritional Comparison',
    excerpt: 'See how makhana stacks up against popular snacks in terms of nutrition.',
    readTime: '6 min read',
  },
  {
    id: '4',
    title: 'The Journey of Makhana: From Lotus Farm to Your Table',
    excerpt: 'Follow the fascinating journey of how makhana is cultivated and processed.',
    readTime: '7 min read',
  },
];

export function BlogPostContent({ locale, slug }: BlogPostContentProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const post = getBlogPost(slug);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="mt-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          className="flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardContent className="p-8">
                {/* Article Header */}
                <div className="mb-8">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(post.publishDate)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {post.views.toLocaleString()} views
                    </span>
                  </div>

                  <h1 className="text-4xl font-display font-bold text-gray-900 mb-4 leading-tight">
                    {post.title}
                  </h1>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-makhana-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-makhana-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{post.author}</p>
                        <p className="text-sm text-gray-600">Health & Nutrition Expert</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLike}
                        className={liked ? 'text-red-600 border-red-600' : ''}
                      >
                        <Heart className={`w-4 h-4 mr-1 ${liked ? 'fill-current' : ''}`} />
                        {post.likes + likes}
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleShare}>
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>

                  {/* Featured Image */}
                  <div className="aspect-video bg-gradient-to-br from-makhana-100 to-makhana-200 rounded-lg overflow-hidden mb-8">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-makhana-200 to-makhana-300">
                      <span className="text-8xl">🥜</span>
                    </div>
                  </div>

                  <p className="text-xl text-gray-700 leading-relaxed italic border-l-4 border-makhana-500 pl-6 mb-8">
                    {post.excerpt}
                  </p>
                </div>

                {/* Article Content */}
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-sm">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Social Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        onClick={handleLike}
                        className={liked ? 'text-red-600 border-red-600' : ''}
                      >
                        <Heart className={`w-4 h-4 mr-2 ${liked ? 'fill-current' : ''}`} />
                        {liked ? 'Liked' : 'Like'} ({post.likes + likes})
                      </Button>
                      <Button variant="outline" onClick={handleShare}>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Article
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Author Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8"
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-makhana-100 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-makhana-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{post.author}</h3>
                      <p className="text-gray-600 mb-3">
                        Dr. Priya Sharma is a certified nutritionist and wellness expert with over 10 years of experience in helping people achieve their health goals through proper nutrition and lifestyle changes.
                      </p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button variant="outline" size="sm">
                          More Articles
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.article>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Related Posts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Related Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <div key={relatedPost.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                        <h4 className="font-semibold text-gray-900 hover:text-makhana-600 transition-colors cursor-pointer mb-2 line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {relatedPost.readTime}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-makhana-500 to-makhana-600 text-white">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
                  <p className="text-makhana-100 text-sm mb-4">
                    Get the latest health tips and articles delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full px-3 py-2 text-sm rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    />
                    <Button
                      variant="outline"
                      className="w-full bg-white text-makhana-600 border-white hover:bg-makhana-50"
                      size="sm"
                    >
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Shop CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-makhana-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🛒</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Try Our Premium Makhana</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Experience the health benefits mentioned in this article with our premium quality makhana.
                  </p>
                  <Button
                    onClick={() => window.open(`/${locale}/shop`, '_blank')}
                    className="w-full"
                    size="sm"
                  >
                    Shop Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}