import type { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

interface TermsPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  return {
    title: 'Terms of Service - Namamy',
    description: 'Read our terms of service and conditions for using Namamy products and services.',
    robots: 'index, follow',
  };
}

export default function TermsPage({ params: { locale } }: TermsPageProps) {
  const breadcrumbItems = [
    { label: 'Legal' },
    { label: 'Terms of Service' },
  ];

  return (
    <Layout locale={locale}>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} locale={locale} />
          
          <div className="mt-8 bg-white rounded-lg shadow-sm p-8">
            <div className="prose prose-lg max-w-none">
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-8">
                Terms of Service
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                Last updated: January 2024
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>By accessing and using Namamy's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>Namamy provides an online platform for purchasing premium makhana (fox nuts) and related healthy snack products. Our services include:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Online product catalog and ordering system</li>
                      <li>Customer account management</li>
                      <li>Order processing and delivery services</li>
                      <li>Customer support and communication</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
                  <div className="text-gray-700 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800">Account Creation</h3>
                    <p>To access certain features, you may need to create an account. You agree to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Provide accurate, current, and complete information</li>
                      <li>Maintain and update your account information</li>
                      <li>Keep your password secure and confidential</li>
                      <li>Accept responsibility for all activities under your account</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mt-6">Account Termination</h3>
                    <p>We reserve the right to terminate or suspend accounts that violate these terms.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Product Information and Availability</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>We strive to provide accurate product information, but we cannot guarantee that all product descriptions, prices, and availability are completely accurate, current, or error-free.</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Product images are for illustration purposes only</li>
                      <li>We reserve the right to correct errors in pricing</li>
                      <li>Product availability is subject to change without notice</li>
                      <li>We may limit quantities on certain products</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Ordering and Payment</h2>
                  <div className="text-gray-700 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800">Order Acceptance</h3>
                    <p>Your order is an offer to buy products from us. We reserve the right to accept or reject any order for any reason.</p>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mt-6">Payment Terms</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Payment must be made at the time of order</li>
                      <li>We accept major credit cards, debit cards, and digital payments</li>
                      <li>All prices are in Indian Rupees (INR) unless otherwise stated</li>
                      <li>You are responsible for any applicable taxes</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Shipping and Delivery</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>We will make reasonable efforts to deliver products according to our shipping policies:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Delivery times are estimates and not guaranteed</li>
                      <li>Risk of loss passes to you upon delivery</li>
                      <li>We are not responsible for delays caused by shipping carriers</li>
                      <li>Additional charges may apply for expedited shipping</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Returns and Refunds</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>Please refer to our separate Return and Refund Policy for detailed information about returns, exchanges, and refunds.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Prohibited Uses</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>You may not use our service:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>For any unlawful purpose or to solicit others to unlawful acts</li>
                      <li>To violate any international, federal, provincial, or state regulations or laws</li>
                      <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                      <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                      <li>To submit false or misleading information</li>
                      <li>To upload or transmit viruses or any other type of malicious code</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Intellectual Property Rights</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>The service and its original content, features, and functionality are and will remain the exclusive property of Namamy and its licensors. The service is protected by copyright, trademark, and other laws.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Disclaimers</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, this Company:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Excludes all representations and warranties relating to this website and its contents</li>
                      <li>Does not warrant that the functions contained in this website will be uninterrupted or error-free</li>
                      <li>Does not warrant that defects will be corrected or that this website or the server is free of viruses or bugs</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Limitation of Liability</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>In no event shall Namamy, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>These Terms shall be interpreted and governed by the laws of India. Any disputes arising from these terms shall be subject to the jurisdiction of the courts in Bhagalpur, Bihar.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to Terms</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>If you have any questions about these Terms of Service, please contact us:</p>
                    <div className="bg-organic-50 border border-organic-200 rounded-lg p-6">
                      <div className="space-y-2">
                        <p><strong>Email:</strong> legal@namamy.com</p>
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