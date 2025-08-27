import type { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface PrivacyPolicyPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: PrivacyPolicyPageProps): Promise<Metadata> {
  return {
    title: 'Privacy Policy - Namamy',
    description: 'Learn about how Namamy collects, uses, and protects your personal information.',
    robots: 'index, follow',
  };
}

export default function PrivacyPolicyPage({ params: { locale } }: PrivacyPolicyPageProps) {
  const breadcrumbItems = [
    { label: 'Home' },
    { label: 'Privacy Policy' },
  ];

  return (
    <Layout locale={locale}>
      <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} locale={locale} />
          
          <div className="mt-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                Privacy Policy
              </h1>
              <p className="text-xl text-gray-600">
                How we collect, use, and protect your information
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Last updated: January 15, 2024
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>1. Information We Collect</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <h4>Personal Information</h4>
                  <p>We collect information you provide directly to us, such as when you:</p>
                  <ul>
                    <li>Create an account or make a purchase</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Contact us for support</li>
                    <li>Participate in surveys or promotions</li>
                  </ul>
                  
                  <h4>Automatically Collected Information</h4>
                  <p>We automatically collect certain information when you visit our website:</p>
                  <ul>
                    <li>Device information (IP address, browser type, operating system)</li>
                    <li>Usage data (pages visited, time spent, clicks)</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. How We Use Your Information</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>We use the information we collect to:</p>
                  <ul>
                    <li>Process and fulfill your orders</li>
                    <li>Provide customer service and support</li>
                    <li>Send you promotional emails and newsletters (with your consent)</li>
                    <li>Improve our products and services</li>
                    <li>Comply with legal obligations</li>
                    <li>Protect against fraud and abuse</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. Information Sharing</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
                  <ul>
                    <li><strong>Service Providers:</strong> We work with trusted third-party companies to help us operate our business (payment processors, shipping companies, etc.)</li>
                    <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights</li>
                    <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. Data Security</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
                  <ul>
                    <li>SSL encryption for data transmission</li>
                    <li>Secure servers and databases</li>
                    <li>Regular security audits and updates</li>
                    <li>Limited access to personal information on a need-to-know basis</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Cookies and Tracking</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>We use cookies and similar technologies to:</p>
                  <ul>
                    <li>Remember your preferences and settings</li>
                    <li>Analyze website traffic and usage patterns</li>
                    <li>Provide personalized content and advertisements</li>
                    <li>Enable social media features</li>
                  </ul>
                  <p>You can control cookies through your browser settings, but disabling cookies may affect website functionality.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. Your Rights</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>You have the following rights regarding your personal information:</p>
                  <ul>
                    <li><strong>Access:</strong> Request access to your personal information</li>
                    <li><strong>Rectification:</strong> Request correction of inaccurate information</li>
                    <li><strong>Erasure:</strong> Request deletion of your personal information</li>
                    <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                    <li><strong>Objection:</strong> Object to processing of your personal information</li>
                    <li><strong>Withdrawal:</strong> Withdraw consent for data processing</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Children's Privacy</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>8. International Transfers</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>Your information may be transferred to and processed in countries other than your own. We ensure that such transfers are made in accordance with applicable data protection laws and with appropriate safeguards in place.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>9. Updates to This Policy</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>10. Contact Us</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
                  <ul>
                    <li>Email: contact@namamy.com</li>
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