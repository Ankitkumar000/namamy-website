import type { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface TermsOfServicePageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: TermsOfServicePageProps): Promise<Metadata> {
  return {
    title: 'Terms of Service - Namamy',
    description: 'Read our terms and conditions for using Namamy products and services.',
    robots: 'index, follow',
  };
}

export default function TermsOfServicePage({ params: { locale } }: TermsOfServicePageProps) {
  const breadcrumbItems = [
    { label: 'Home' },
    { label: 'Terms of Service' },
  ];

  return (
    <Layout locale={locale}>
      <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} locale={locale} />
          
          <div className="mt-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                Terms of Service
              </h1>
              <p className="text-xl text-gray-600">
                Terms and conditions for using our services
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Last updated: January 15, 2024
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>1. Acceptance of Terms</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>By accessing and using the Namamy website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                  <p>These terms apply to all visitors, users, and others who access or use the service.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Description of Service</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>Namamy provides an e-commerce platform for purchasing premium makhana (fox nuts) and related healthy snack products. Our services include:</p>
                  <ul>
                    <li>Online product catalog and ordering system</li>
                    <li>Payment processing and order fulfillment</li>
                    <li>Customer support and service</li>
                    <li>User account management</li>
                    <li>Newsletter and promotional communications</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. User Accounts</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <h4>Account Creation</h4>
                  <p>To access certain features of our service, you must create an account. You agree to:</p>
                  <ul>
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain and update your account information</li>
                    <li>Keep your password secure and confidential</li>
                    <li>Notify us immediately of any unauthorized access</li>
                  </ul>
                  
                  <h4>Account Responsibility</h4>
                  <p>You are responsible for all activities that occur under your account. We are not liable for any loss or damage from your failure to comply with these security obligations.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. Orders and Payment</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <h4>Order Acceptance</h4>
                  <p>All orders are subject to acceptance by Namamy. We reserve the right to refuse or cancel any order for any reason, including but not limited to:</p>
                  <ul>
                    <li>Product unavailability</li>
                    <li>Pricing errors</li>
                    <li>Suspected fraudulent activity</li>
                    <li>Technical issues</li>
                  </ul>
                  
                  <h4>Payment</h4>
                  <p>Payment must be received before order processing. We accept various payment methods including credit cards, debit cards, UPI, and cash on delivery (where available).</p>
                  
                  <h4>Pricing</h4>
                  <p>All prices are listed in Indian Rupees (INR) and include applicable taxes unless otherwise stated. Prices are subject to change without notice.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Shipping and Delivery</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <ul>
                    <li>We ship to locations across India</li>
                    <li>Delivery times are estimates and may vary based on location and circumstances</li>
                    <li>Risk of loss passes to you upon delivery to the carrier</li>
                    <li>You are responsible for providing accurate delivery information</li>
                    <li>Additional charges may apply for remote or difficult-to-access locations</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. Returns and Refunds</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>Please refer to our <a href={`/${locale}/refund-policy`} className="text-makhana-600 hover:text-makhana-700">Refund Policy</a> for detailed information about returns, exchanges, and refunds.</p>
                  
                  <h4>General Return Conditions</h4>
                  <ul>
                    <li>Items must be returned within 7 days of delivery</li>
                    <li>Products must be unopened and in original packaging</li>
                    <li>Perishable items may have different return policies</li>
                    <li>Return shipping costs may apply</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Prohibited Uses</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>You may not use our service:</p>
                  <ul>
                    <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                    <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                    <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                    <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                    <li>To submit false or misleading information</li>
                    <li>To upload or transmit viruses or any other type of malicious code</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>8. Intellectual Property</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>The service and its original content, features, and functionality are and will remain the exclusive property of Namamy and its licensors. The service is protected by copyright, trademark, and other laws.</p>
                  
                  <h4>Trademarks</h4>
                  <p>Namamy and related graphics, logos, service marks, and trade names are trademarks of Namamy. You may not use these without our prior written consent.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>9. Disclaimer of Warranties</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, this Company:</p>
                  <ul>
                    <li>Excludes all representations and warranties relating to this website and its contents</li>
                    <li>Does not warrant that the website will be constantly available or available at all</li>
                    <li>Makes no representations or warranties regarding the accuracy or completeness of information</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>10. Limitation of Liability</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>In no event shall Namamy, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>11. Governing Law</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>These terms shall be interpreted and governed by the laws of India. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>12. Changes to Terms</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>We reserve the right, at our sole discretion, to modify or replace these terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>13. Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>If you have any questions about these Terms of Service, please contact us:</p>
                  <ul>
                    <li>Email: legal@namamy.com</li>
                    <li>Phone: +91 98765 43210</li>
                    <li>Address: 123 Business Park, Mumbai, India 400001</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}