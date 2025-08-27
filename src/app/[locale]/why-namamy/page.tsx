import type { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Shield, 
  Heart, 
  Leaf, 
  Award, 
  Users, 
  Truck, 
  Star, 
  CheckCircle,
  Target,
  Sparkles,
  Clock,
  Globe
} from 'lucide-react';
import Link from 'next/link';

interface WhyNamamyPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: WhyNamamyPageProps): Promise<Metadata> {
  return {
    title: 'Why Choose Namamy - Premium Makhana Benefits',
    description: 'Discover why Namamy is India\'s trusted choice for premium makhana. Quality assurance, health benefits, and customer satisfaction guaranteed.',
    robots: 'index, follow',
  };
}

export default function WhyNamamyPage({ params: { locale } }: WhyNamamyPageProps) {
  const breadcrumbItems = [
    { label: 'Why Choose Namamy' },
  ];

  const whyChooseReasons = [
    {
      icon: Shield,
      title: 'Premium Quality Assurance',
      description: 'Every batch is rigorously tested for quality, freshness, and purity. FSSAI certified processing ensures the highest food safety standards.',
      stats: '100% Quality Tested',
      color: 'from-organic-500 to-makhana-500',
      bgColor: 'bg-organic-50',
    },
    {
      icon: Heart,
      title: 'Health-First Approach',
      description: 'Our makhana is naturally rich in protein, low in fat, and packed with essential minerals. Perfect for a healthy lifestyle.',
      stats: '9.7g Protein per 100g',
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50',
    },
    {
      icon: Leaf,
      title: '100% Natural & Pure',
      description: 'No artificial colors, preservatives, or chemicals. Just pure, natural makhana processed using traditional methods.',
      stats: 'Zero Additives',
      color: 'from-organic-600 to-earth-500',
      bgColor: 'bg-organic-50',
    },
    {
      icon: Award,
      title: 'Award-Winning Taste',
      description: 'Our unique roasting process creates the perfect crunch and flavor that customers love. Taste the difference quality makes.',
      stats: '4.8/5 Customer Rating',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: Users,
      title: 'Supporting Farmers',
      description: 'We work directly with lotus farmers in Bihar, ensuring fair prices and sustainable farming practices. Your purchase supports rural communities.',
      stats: '500+ Partner Farmers',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Truck,
      title: 'Fast & Fresh Delivery',
      description: 'Temperature-controlled storage and quick delivery ensure your makhana reaches you fresh and crunchy.',
      stats: '24-48 Hour Delivery',
      color: 'from-makhana-500 to-organic-600',
      bgColor: 'bg-makhana-50',
    },
  ];

  const achievements = [
    { icon: Users, number: '50,000+', label: 'Happy Customers' },
    { icon: Star, number: '4.8/5', label: 'Average Rating' },
    { icon: Award, number: '100%', label: 'Quality Guarantee' },
    { icon: Globe, number: '25+', label: 'Cities Served' },
  ];

  const testimonialHighlights = [
    {
      quote: "The quality is exceptional. I've tried many brands but Namamy is clearly the best.",
      author: "Priya Sharma, Mumbai",
      rating: 5,
    },
    {
      quote: "My kids love these healthy snacks. Finally found something nutritious they actually enjoy!",
      author: "Rajesh Kumar, Delhi",
      rating: 5,
    },
    {
      quote: "Perfect for my fitness goals. High protein, low fat, and absolutely delicious.",
      author: "Dr. Anita Desai, Bangalore",
      rating: 5,
    },
  ];

  const comparisons = [
    {
      feature: 'Quality Testing',
      namamy: 'Every batch tested',
      others: 'Random sampling',
      advantage: true,
    },
    {
      feature: 'Freshness Guarantee',
      namamy: '100% fresh or refund',
      others: 'No guarantee',
      advantage: true,
    },
    {
      feature: 'Farmer Support',
      namamy: 'Direct partnerships',
      others: 'Third-party sourcing',
      advantage: true,
    },
    {
      feature: 'Processing Method',
      namamy: 'Traditional + modern',
      others: 'Mass production',
      advantage: true,
    },
    {
      feature: 'Customer Service',
      namamy: '24/7 support',
      others: 'Limited hours',
      advantage: true,
    },
  ];

  return (
    <Layout locale={locale}>
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} locale={locale} />
          
          <div className="mt-8">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-6">
                Why Choose Namamy?
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Discover what makes Namamy India's most trusted premium makhana brand. From farm to your table, every step is crafted with care.
              </p>
              
              <div className="bg-gradient-to-r from-organic-500 to-makhana-600 text-white rounded-2xl p-8 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">The Namamy Difference</h2>
                <p className="text-lg text-organic-100">
                  We don't just sell makhana - we deliver a promise of quality, health, and happiness with every bite.
                </p>
              </div>
            </div>

            {/* Main Reasons */}
            <div className="mb-20">
              <h2 className="text-3xl font-display font-bold text-gray-900 text-center mb-12">
                6 Reasons to Choose Namamy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {whyChooseReasons.map((reason, index) => (
                  <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${reason.color}`}></div>
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 ${reason.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <reason.icon className={`w-8 h-8 text-gray-700`} />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {reason.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {reason.description}
                      </p>
                      
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${reason.color} text-white`}>
                        <Sparkles className="w-4 h-4 mr-1" />
                        {reason.stats}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-20">
              <h2 className="text-3xl font-display font-bold text-gray-900 text-center mb-12">
                Our Achievements
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-organic-500 to-makhana-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <achievement.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {achievement.number}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {achievement.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Testimonials */}
            <div className="mb-20">
              <h2 className="text-3xl font-display font-bold text-gray-900 text-center mb-12">
                What Our Customers Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonialHighlights.map((testimonial, index) => (
                  <Card key={index} className="bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <blockquote className="text-gray-700 mb-4 italic">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="text-sm font-semibold text-organic-600">
                        - {testimonial.author}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Comparison Table */}
            <div className="mb-20">
              <h2 className="text-3xl font-display font-bold text-gray-900 text-center mb-12">
                Namamy vs Others
              </h2>
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gradient-to-r from-organic-500 to-makhana-600 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Feature</th>
                        <th className="px-6 py-4 text-left font-semibold">Namamy</th>
                        <th className="px-6 py-4 text-left font-semibold">Others</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisons.map((comparison, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-6 py-4 font-semibold text-gray-900">
                            {comparison.feature}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-organic-500" />
                              <span className="text-organic-700 font-medium">
                                {comparison.namamy}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {comparison.others}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Health Benefits Highlight */}
            <Card className="mb-20 bg-gradient-to-r from-organic-50 to-makhana-50 border-organic-200">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                    Health Benefits You Can Trust
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Our makhana isn't just delicious - it's a nutritional powerhouse that supports your healthy lifestyle.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl p-6 text-center">
                    <div className="text-2xl font-bold text-organic-600 mb-2">9.7g</div>
                    <div className="text-gray-700 font-medium">Protein per 100g</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center">
                    <div className="text-2xl font-bold text-organic-600 mb-2">0.1g</div>
                    <div className="text-gray-700 font-medium">Fat per 100g</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center">
                    <div className="text-2xl font-bold text-organic-600 mb-2">14.5g</div>
                    <div className="text-gray-700 font-medium">Fiber per 100g</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center">
                    <div className="text-2xl font-bold text-organic-600 mb-2">347</div>
                    <div className="text-gray-700 font-medium">Calories per 100g</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-makhana-500 to-organic-600 text-white">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h2>
                <p className="text-xl text-makhana-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of satisfied customers who've made Namamy their trusted choice for premium makhana.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={`/${locale}/shop`}>
                    <Button 
                      variant="secondary" 
                      size="lg"
                      className="bg-white text-organic-600 hover:bg-organic-50"
                    >
                      Shop Now
                    </Button>
                  </Link>
                  <Link href={`/${locale}/contact`}>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-white text-white hover:bg-white hover:text-organic-600"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
                
                <div className="mt-8 flex items-center justify-center gap-8 text-sm text-makhana-100">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Quality Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    <span>Free Shipping Above ₹999</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>24/7 Support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}