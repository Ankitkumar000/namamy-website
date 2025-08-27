import type { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

interface PrivacyPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  return {
    title: 'Privacy Policy - Namamy',
    description: 'Learn about how Namamy protects your privacy and handles your personal information.',
    robots: 'index, follow',
  };
}

export default function PrivacyPage({ params: { locale } }: PrivacyPageProps) {
  const breadcrumbItems = [
    { label: 'Legal' },
    { label: 'Privacy Policy' },
  ];

  return (
    <Layout locale={locale}>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} locale={locale} />
          
          <div className="mt-8 bg-white rounded-lg shadow-sm p-8">
            <div className="prose prose-lg max-w-none">
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-8">
                Privacy Policy
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                Last updated: January 2024
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                  <div className="space-y-4 text-gray-700">
                    <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
                    <p>We collect information you provide directly to us, such as when you:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Create an account or make a purchase</li>
                      <li>Subscribe to our newsletter</li>
                      <li>Contact our customer support</li>
                      <li>Participate in surveys or promotions</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mt-6">Information Collected Automatically</h3>
                    <p>When you visit our website, we may automatically collect:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Device and browser information</li>
                      <li>IP address and location data</li>
                      <li>Website usage patterns</li>
                      <li>Cookies and similar technologies</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Process and fulfill your orders</li>
                      <li>Provide customer support and respond to inquiries</li>
                      <li>Send you promotional emails and updates (with your consent)</li>
                      <li>Improve our products and services</li>
                      <li>Prevent fraud and ensure security</li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>We may share your information in the following circumstances:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Service Providers:</strong> Third-party companies that help us operate our business</li>
                      <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                      <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
                      <li><strong>Consent:</strong> When you have given us explicit permission</li>
                    </ul>
                    <p className="font-semibold">We do not sell your personal information to third parties.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>We implement appropriate security measures to protect your information, including:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>SSL encryption for data transmission</li>
                      <li>Secure servers and databases</li>
                      <li>Regular security audits and updates</li>
                      <li>Access controls and employee training</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights and Choices</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>You have the right to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Access and update your personal information</li>
                      <li>Delete your account and personal data</li>
                      <li>Opt out of marketing communications</li>
                      <li>Request a copy of your data</li>
                      <li>Object to certain data processing activities</li>
                    </ul>
                    <p>To exercise these rights, contact us at privacy@namamy.com</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Tracking</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>We use cookies and similar technologies to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Remember your preferences and login status</li>
                      <li>Analyze website traffic and usage patterns</li>
                      <li>Provide personalized content and advertisements</li>
                      <li>Improve website functionality</li>
                    </ul>
                    <p>You can manage cookie preferences through your browser settings.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Children's Privacy</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Data Transfers</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data during international transfers.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Privacy Policy</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>If you have any questions about this Privacy Policy, please contact us:</p>
                    <div className="bg-organic-50 border border-organic-200 rounded-lg p-6">
                      <div className="space-y-2">
                        <p><strong>Email:</strong> privacy@namamy.com</p>
                        <p><strong>Phone:</strong> +91 7261071570, 70912 60484</p>
                        <p><strong>Address:</strong> House no-263, Police Station Road, Sabour, Bhagalpur, 813210, Bihar, India</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}