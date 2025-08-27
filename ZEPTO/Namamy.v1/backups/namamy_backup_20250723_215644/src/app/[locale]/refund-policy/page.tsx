import type { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface RefundPolicyPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: RefundPolicyPageProps): Promise<Metadata> {
  return {
    title: 'Refund Policy - Namamy',
    description: 'Learn about our refund and return policy for Namamy products.',
    robots: 'index, follow',
  };
}

export default function RefundPolicyPage({ params: { locale } }: RefundPolicyPageProps) {
  const breadcrumbItems = [
    { name: 'Home', href: `/${locale}` },
    { name: 'Refund Policy', href: `/${locale}/refund-policy` },
  ];

  return (
    <Layout locale={locale}>
      <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="mt-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                Refund Policy
              </h1>
              <p className="text-xl text-gray-600">
                Your satisfaction is our priority
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Last updated: January 15, 2024
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>1. Return Window</span>
                    <Badge variant="default" className="bg-green-500">7 Days</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>We offer a <strong>7-day return policy</strong> from the date of delivery. This means you have 7 days after receiving your item to request a return.</p>
                  
                  <h4>Timeline Breakdown:</h4>
                  <ul>
                    <li><strong>Day 1-7:</strong> Return window is open</li>
                    <li><strong>Day 8+:</strong> Returns are generally not accepted unless there are exceptional circumstances</li>
                  </ul>
                  
                  <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg">
                    <strong>Note:</strong> The return period starts from the delivery date, not the order date.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Eligible Items</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>To be eligible for a return, your item must meet the following conditions:</p>
                  
                  <h4>✅ Returnable Items:</h4>
                  <ul>
                    <li>Unopened packages in original condition</li>
                    <li>Items with intact seals and packaging</li>
                    <li>Products that show clear manufacturing defects</li>
                    <li>Wrong items delivered due to our error</li>
                    <li>Damaged items received during shipping</li>
                  </ul>
                  
                  <h4>❌ Non-Returnable Items:</h4>
                  <ul>
                    <li>Opened food packages (due to hygiene and safety regulations)</li>
                    <li>Items damaged due to misuse or normal wear</li>
                    <li>Products past the 7-day return window</li>
                    <li>Gift cards and promotional items</li>
                    <li>Custom or personalized orders</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. How to Request a Return</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <h4>Step 1: Contact Us</h4>
                  <p>Reach out to our customer service team within 7 days of delivery:</p>
                  <ul>
                    <li>Email: returns@namamy.com</li>
                    <li>Phone: +91 98765 43210</li>
                    <li>WhatsApp: +91 98765 43210</li>
                    <li>Through your account dashboard</li>
                  </ul>
                  
                  <h4>Step 2: Provide Information</h4>
                  <p>Include the following details in your return request:</p>
                  <ul>
                    <li>Order number</li>
                    <li>Item(s) you wish to return</li>
                    <li>Reason for return</li>
                    <li>Photos (if applicable for damaged items)</li>
                  </ul>
                  
                  <h4>Step 3: Receive Return Instructions</h4>
                  <p>Our team will review your request and provide return instructions within 24 hours.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. Return Shipping</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <h4>Who Pays for Return Shipping?</h4>
                  <ul>
                    <li><strong>Our fault (wrong/damaged item):</strong> We provide a prepaid return label</li>
                    <li><strong>Customer preference:</strong> Customer pays return shipping costs</li>
                    <li><strong>Quality issues:</strong> We cover return shipping after verification</li>
                  </ul>
                  
                  <h4>Return Shipping Process:</h4>
                  <ol>
                    <li>Package the item in original packaging</li>
                    <li>Include all accessories and documentation</li>
                    <li>Use the provided return label or ship to our returns address</li>
                    <li>Get a tracking number and keep the receipt</li>
                  </ol>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-blue-800 mb-2">Returns Address:</h4>
                    <p className="text-blue-700 mb-0">
                      Namamy Returns Department<br/>
                      123 Business Park<br/>
                      Returns Processing Center<br/>
                      Mumbai, Maharashtra 400001<br/>
                      India
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Refund Processing</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <h4>Processing Timeline:</h4>
                  <ul>
                    <li><strong>1-2 business days:</strong> Item inspection after we receive it</li>
                    <li><strong>3-5 business days:</strong> Refund processing time</li>
                    <li><strong>5-10 business days:</strong> Refund appears in your account (varies by payment method)</li>
                  </ul>
                  
                  <h4>Refund Methods:</h4>
                  <ul>
                    <li><strong>Credit/Debit Cards:</strong> Refunded to original payment method</li>
                    <li><strong>UPI/Digital Wallets:</strong> Refunded to original account</li>
                    <li><strong>Cash on Delivery:</strong> Bank transfer (provide bank details)</li>
                    <li><strong>Store Credit:</strong> Available as an option for faster processing</li>
                  </ul>
                  
                  <h4>Partial Refunds:</h4>
                  <p>Partial refunds may be issued for:</p>
                  <ul>
                    <li>Items returned without original packaging</li>
                    <li>Items with obvious signs of use</li>
                    <li>Items returned after extended delay</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. Exchanges</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>We offer exchanges for:</p>
                  <ul>
                    <li>Defective or damaged products</li>
                    <li>Wrong items sent by mistake</li>
                    <li>Size/variant issues (where applicable)</li>
                  </ul>
                  
                  <h4>Exchange Process:</h4>
                  <ol>
                    <li>Contact us with your exchange request</li>
                    <li>Return the original item following our return process</li>
                    <li>We'll send the replacement item once we receive the original</li>
                    <li>No additional shipping charges for exchanges due to our error</li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Quality Guarantee</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <h4 className="text-green-800 mb-2">100% Satisfaction Guarantee</h4>
                    <p className="text-green-700 mb-0">
                      If you're not completely satisfied with the quality of our makhana, we'll make it right.
                    </p>
                  </div>
                  
                  <h4>Quality Issues We Cover:</h4>
                  <ul>
                    <li>Stale or expired products</li>
                    <li>Foreign objects in packaging</li>
                    <li>Incorrect flavoring or seasoning</li>
                    <li>Damaged or broken pieces (excessive amounts)</li>
                    <li>Packaging defects affecting product quality</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>8. Special Circumstances</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <h4>Bulk Orders (10+ items):</h4>
                  <ul>
                    <li>Extended 14-day return window</li>
                    <li>Special return arrangements available</li>
                    <li>Dedicated customer service support</li>
                  </ul>
                  
                  <h4>Gift Orders:</h4>
                  <ul>
                    <li>Original purchaser must initiate return</li>
                    <li>Gift recipients can contact us for assistance</li>
                    <li>Refunds issued to original payment method</li>
                  </ul>
                  
                  <h4>Subscription Orders:</h4>
                  <ul>
                    <li>Cancel anytime before next shipment</li>
                    <li>Individual shipments follow standard return policy</li>
                    <li>Prorated refunds for cancelled subscriptions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>9. Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>For any questions about returns or refunds, please contact our customer service team:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Email Support</h4>
                      <p className="text-gray-600">returns@namamy.com</p>
                      <p className="text-sm text-gray-500">Response within 24 hours</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Phone Support</h4>
                      <p className="text-gray-600">+91 98765 43210</p>
                      <p className="text-sm text-gray-500">Mon-Sat: 9AM-6PM IST</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">WhatsApp</h4>
                      <p className="text-gray-600">+91 98765 43210</p>
                      <p className="text-sm text-gray-500">Quick responses</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Live Chat</h4>
                      <p className="text-gray-600">Available on website</p>
                      <p className="text-sm text-gray-500">Mon-Sat: 9AM-6PM IST</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>10. Policy Updates</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>We may update this refund policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically to stay informed about our return and refund procedures.</p>
                  
                  <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                    <strong>Questions?</strong> If you have any questions about this refund policy, please don't hesitate to contact us. We're here to help ensure your complete satisfaction with our products and service.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}