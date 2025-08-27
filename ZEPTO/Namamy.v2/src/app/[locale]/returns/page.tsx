'use client';

import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Package, RefreshCw, Shield, Clock, Phone, Mail } from 'lucide-react';

interface ReturnsPageProps {
  params: {
    locale: string;
  };
}

export default function ReturnsPage({ params: { locale } }: ReturnsPageProps) {
  const breadcrumbItems = [
    { label: 'Returns & Exchanges' },
  ];

  const returnReasons = [
    { icon: Package, title: 'Wrong Product', description: 'Received a different product than ordered' },
    { icon: Shield, title: 'Damaged Item', description: 'Product arrived damaged or defective' },
    { icon: RefreshCw, title: 'Quality Issue', description: 'Product quality doesn\'t meet expectations' },
    { icon: Clock, title: 'Not Fresh', description: 'Product freshness or expiry concerns' },
  ];

  const returnSteps = [
    {
      step: 1,
      title: 'Contact Us',
      description: 'Reach out within 7 days of delivery',
      icon: Phone,
    },
    {
      step: 2,
      title: 'Get Authorization',
      description: 'Receive return authorization number',
      icon: Shield,
    },
    {
      step: 3,
      title: 'Pack & Send',
      description: 'Pack the item securely for return',
      icon: Package,
    },
    {
      step: 4,
      title: 'Get Refund',
      description: 'Receive refund within 5-7 business days',
      icon: RefreshCw,
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
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                Returns & Exchanges
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Not satisfied with your purchase? We're here to help with our easy return and exchange process.
              </p>
              
              <div className="bg-gradient-to-r from-organic-500 to-makhana-600 text-white rounded-2xl p-8 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">100% Satisfaction Guarantee</h2>
                <p className="text-lg text-organic-100">
                  We stand behind the quality of our products. If you're not completely satisfied, we'll make it right with a hassle-free return or exchange.
                </p>
              </div>
            </div>

            {/* Valid Return Reasons */}
            <div className="mb-16">
              <h2 className="text-3xl font-display font-bold text-gray-900 text-center mb-12">
                Valid Return Reasons
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {returnReasons.map((reason, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-organic-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <reason.icon className="w-8 h-8 text-organic-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {reason.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {reason.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Return Process */}
            <div className="mb-16">
              <h2 className="text-3xl font-display font-bold text-gray-900 text-center mb-12">
                How to Return
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {returnSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-organic-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <step.icon className="w-8 h-8" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-makhana-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Return Policy Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-organic-600">
                    <Clock className="w-6 h-6" />
                    Return Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-organic-50 rounded-lg">
                      <span className="font-medium">Quality Issues</span>
                      <span className="text-organic-600 font-semibold">7 Days</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-organic-50 rounded-lg">
                      <span className="font-medium">Wrong/Damaged Products</span>
                      <span className="text-organic-600 font-semibold">24 Hours</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-organic-50 rounded-lg">
                      <span className="font-medium">Freshness Concerns</span>
                      <span className="text-organic-600 font-semibold">48 Hours</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    * Timeline starts from the date of delivery
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-makhana-600">
                    <RefreshCw className="w-6 h-6" />
                    Refund Process
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-makhana-50 rounded-lg">
                      <span className="font-medium">Processing Time</span>
                      <span className="text-makhana-600 font-semibold">2-3 Days</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-makhana-50 rounded-lg">
                      <span className="font-medium">Bank Transfer</span>
                      <span className="text-makhana-600 font-semibold">5-7 Days</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-makhana-50 rounded-lg">
                      <span className="font-medium">Digital Wallet</span>
                      <span className="text-makhana-600 font-semibold">3-5 Days</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    * Refund processed to original payment method
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Exchange Policy */}
            <Card className="mb-16">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Exchange Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-earth-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <RefreshCw className="w-8 h-8 text-earth-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Different Flavors</h3>
                    <p className="text-gray-600 text-sm">Exchange for different flavors of the same product</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-earth-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-8 h-8 text-earth-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Different Sizes</h3>
                    <p className="text-gray-600 text-sm">Exchange for different pack sizes (price difference may apply)</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-earth-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-earth-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Defective Products</h3>
                    <p className="text-gray-600 text-sm">Immediate exchange for identical replacement products</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card className="mb-16 bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800">Important Return Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-yellow-700">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Products must be unused and in original packaging for returns</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Return authorization number is required for all returns</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Original invoice must be included with returned items</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Bulk orders have special return conditions (contact us for details)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Sale items and promotional products may have different return policies</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact for Returns */}
            <Card className="bg-gradient-to-r from-organic-500 to-makhana-600 text-white">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Need to Return Something?</h2>
                <p className="text-xl text-organic-100 mb-8 max-w-2xl mx-auto">
                  Our customer service team is ready to help you with your return or exchange.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <Mail className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-semibold">Email Support</p>
                    <p className="text-organic-100">contact@namamy.com</p>
                  </div>
                  
                  <div className="text-center">
                    <Phone className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-semibold">Phone Support</p>
                    <p className="text-organic-100">+91 7261071570, 70912 60484</p>
                  </div>
                  
                  <div className="text-center">
                    <Clock className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-semibold">Business Hours</p>
                    <p className="text-organic-100">Mon-Sat: 9AM-7PM</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    onClick={() => window.open('mailto:contact@namamy.com?subject=Return Request&body=Dear Returns Team,%0D%0A%0D%0AOrder Number:%0D%0AProduct:%0D%0AReason for Return:%0D%0A%0D%0APlease help me process my return.%0D%0A%0D%0AThank you', '_blank')}
                  >
                    Start Return Process
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-organic-600"
                    onClick={() => window.location.href = `/${locale}/track-order`}
                  >
                    Track Your Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}