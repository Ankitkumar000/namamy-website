'use client';

import { useState } from 'react';
import { 
  Award, 
  Leaf, 
  Heart, 
  Users, 
  Shield, 
  Truck, 
  Star,
  CheckCircle,
  Zap,
  Globe,
  Target,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface WhyChooseUsContentProps {
  locale: string;
}

const mainReasons = [
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Hand-picked fox nuts roasted to perfection using traditional methods for the finest taste and texture.',
    details: [
      'Sourced directly from lotus farms in Bihar',
      'Traditional roasting techniques passed down generations',
      'Multiple quality checks at every stage',
      'Premium grade makhana selection',
    ],
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Leaf,
    title: 'Natural & Organic',
    description: '100% natural makhana with no artificial preservatives, colors, or harmful chemicals.',
    details: [
      'Organically grown lotus seeds',
      'No artificial additives or preservatives',
      'Non-GMO and pesticide-free',
      'Eco-friendly packaging materials',
    ],
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: Heart,
    title: 'Health Benefits',
    description: 'Packed with protein, fiber, and essential nutrients for your wellness journey.',
    details: [
      'High protein content (9.7g per 100g)',
      'Low calorie healthy snacking option',
      'Rich in antioxidants and minerals',
      'Supports heart and digestive health',
    ],
    color: 'from-red-400 to-pink-500',
  },
  {
    icon: Users,
    title: 'Supporting Communities',
    description: 'Empowering local farmers through fair trade practices and direct partnerships.',
    details: [
      'Direct partnerships with farmers',
      'Fair pricing and timely payments',
      'Supporting rural livelihoods',
      'Community development initiatives',
    ],
    color: 'from-blue-400 to-indigo-500',
  },
];

const additionalBenefits = [
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: '100% satisfaction guarantee with easy returns and exchanges.',
  },
  {
    icon: Truck,
    title: 'Secure Packaging',
    description: 'Carefully packaged to maintain freshness and quality during transit.',
  },
  {
    icon: Star,
    title: 'Customer Rated',
    description: 'Rated 4.8/5 by over 50,000+ satisfied customers.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Continuously innovating with new flavors and varieties.',
  },
  {
    icon: Globe,
    title: 'Sustainability',
    description: 'Committed to sustainable practices and eco-friendly packaging.',
  },
  {
    icon: Target,
    title: 'Focused Mission',
    description: 'Dedicated solely to perfecting the art of makhana.',
  },
];

const achievements = [
  { number: '50,000+', label: 'Happy Customers', icon: Users },
  { number: '500+', label: 'Farmers Supported', icon: Leaf },
  { number: '4.8/5', label: 'Customer Rating', icon: Star },
  { number: '100%', label: 'Natural Products', icon: CheckCircle },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    text: 'The quality is exceptional! I\'ve tried many brands, but Namamy\'s makhana is the crunchiest and most flavorful.',
    rating: 5,
  },
  {
    name: 'Rajesh Kumar',
    location: 'Delhi',
    text: 'Perfect healthy snack for my family. Kids love the chocolate flavor, and I love the nutrition it provides.',
    rating: 5,
  },
  {
    name: 'Sneha Patel',
    location: 'Ahmedabad',
    text: 'Fast delivery, excellent packaging, and amazing taste. The masala variety is my absolute favorite!',
    rating: 5,
  },
];

export function WhyChooseUsContent({ locale }: WhyChooseUsContentProps) {
  const [selectedReason, setSelectedReason] = useState(0);

  return (
    <div className="mt-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Why Choose <span className="text-makhana-600">Namamy</span>?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We're not just another snack brand. We're passionate about delivering the finest quality makhana 
            while supporting farmers and promoting healthy living.
          </p>
          <div className="flex justify-center">
            <Badge variant="default" className="bg-makhana-500 text-white px-6 py-2 text-sm">
              Trusted by 50,000+ Customers
            </Badge>
          </div>
        </motion.div>
      </div>

      {/* Main Reasons */}
      <div className="mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl font-display font-bold text-center text-gray-900 mb-12"
        >
          What Makes Us Different
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reason Cards */}
          <div className="space-y-4">
            {mainReasons.map((reason, index) => {
              const ReasonIcon = reason.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all ${
                      selectedReason === index 
                        ? 'ring-2 ring-makhana-500 shadow-lg' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedReason(index)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${reason.color} flex items-center justify-center`}>
                          <ReasonIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {reason.title}
                          </h3>
                          <p className="text-gray-600">
                            {reason.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Details Panel */}
          <motion.div
            key={selectedReason}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:sticky lg:top-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${mainReasons[selectedReason].color} flex items-center justify-center`}>
                    {(() => {
                      const SelectedIcon = mainReasons[selectedReason].icon;
                      return <SelectedIcon className="w-5 h-5 text-white" />;
                    })()}
                  </div>
                  <span>{mainReasons[selectedReason].title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  {mainReasons[selectedReason].description}
                </p>
                <ul className="space-y-3">
                  {mainReasons[selectedReason].details.map((detail, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-16"
      >
        <div className="bg-gradient-to-r from-makhana-500 to-makhana-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-display font-bold text-center mb-8">
            Our Achievements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const AchievementIcon = achievement.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <AchievementIcon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{achievement.number}</div>
                  <div className="text-makhana-100 text-sm">{achievement.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Additional Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-12">
          Additional Benefits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalBenefits.map((benefit, index) => {
            const BenefitIcon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-makhana-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BenefitIcon className="w-8 h-8 text-makhana-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Customer Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="text-center"
      >
        <Card className="bg-gradient-to-r from-makhana-500 to-makhana-600 text-white">
          <CardContent className="p-12">
            <h2 className="text-3xl font-display font-bold mb-4">
              Ready to Experience the Namamy Difference?
            </h2>
            <p className="text-xl text-makhana-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have made the healthy choice. 
              Try our premium makhana today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-makhana-600 border-white hover:bg-makhana-50"
                onClick={() => window.open(`/${locale}/shop`, '_blank')}
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Shop Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-makhana-600"
                onClick={() => window.open(`/${locale}/about`, '_blank')}
              >
                <Users className="w-5 h-5 mr-2" />
                Learn More About Us
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}