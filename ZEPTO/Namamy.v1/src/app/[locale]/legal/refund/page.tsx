import type { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

interface RefundPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: RefundPageProps): Promise<Metadata> {
  return {
    title: 'Refund Policy - Namamy',
    description: 'Learn about our refund and return policy for Namamy products.',
    robots: 'index, follow',
  };
}

export default function RefundPage({ params: { locale } }: RefundPageProps) {
  const breadcrumbItems = [
    { label: 'Legal' },
    { label: 'Refund Policy' },
  ];

  return (
    <Layout locale={locale}>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} locale={locale} />
          
          <div className="mt-8 bg-white rounded-lg shadow-sm p-8">
            <div className="prose prose-lg max-w-none">
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-8">
                Refund & Return Policy
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                Last updated: January 2024
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Our Commitment</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>At Namamy, we are committed to providing you with the highest quality makhana products. If you're not completely satisfied with your purchase, we're here to help with our straightforward return and refund policy.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Return Eligibility</h2>
                  <div className="text-gray-700 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800">Eligible Returns</h3>
                    <p>You may return products under the following conditions:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Product received is damaged or defective</li>
                      <li>Wrong product was delivered</li>
                      <li>Product is significantly different from description</li>
                      <li>Quality issues with the product</li>
                      <li>Expiry date concerns (products close to expiry)</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mt-6">Time Limit</h3>
                    <p>Returns must be initiated within <strong>7 days</strong> of delivery for quality issues and within <strong>24 hours</strong> for wrong or damaged products.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Non-Returnable Items</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>Due to food safety regulations, the following items cannot be returned:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Products that have been opened or consumed</li>
                      <li>Products returned after the specified time limit</li>
                      <li>Products damaged due to misuse or negligence</li>
                      <li>Custom or personalized products</li>
                      <li>Products purchased on special offers or clearance sales (unless defective)</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Return Process</h2>
                  <div className="text-gray-700 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800">Step 1: Contact Us</h3>
                    <p>Before returning any product, please contact our customer service team:</p>
                    <div className="bg-organic-50 border border-organic-200 rounded-lg p-4">
                      <ul className="space-y-2">
                        <li><strong>Email:</strong> returns@namamy.com</li>
                        <li><strong>Phone:</strong> +91 7261071570, 70912 60484</li>
                        <li><strong>WhatsApp:</strong> +91 7261071570, 70912 60484</li>
                      </ul>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mt-6">Step 2: Return Authorization</h3>
                    <p>Our team will review your request and provide a Return Authorization Number (RAN) if eligible. Please provide:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Order number</li>
                      <li>Product details</li>
                      <li>Reason for return</li>
                      <li>Photos of the product (if damaged or defective)</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mt-6">Step 3: Package and Ship</h3>
                    <p>Once you receive the RAN:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Pack the item securely in original packaging if possible</li>
                      <li>Include the RAN number and original invoice</li>
                      <li>We will arrange pickup or provide shipping instructions</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Refund Processing</h2>
                  <div className="text-gray-700 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800">Refund Timeline</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Processing:</strong> 2-3 business days after we receive the returned item</li>
                      <li><strong>Bank Transfer:</strong> 5-7 business days</li>
                      <li><strong>Credit Card:</strong> 7-14 business days</li>
                      <li><strong>Digital Wallets:</strong> 3-5 business days</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mt-6">Refund Method</h3>
                    <p>Refunds will be processed using the same payment method used for the original purchase. In some cases, we may offer:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Store credits for faster processing</li>
                      <li>Exchange for similar products</li>
                      <li>Alternative payment methods with your consent</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Shipping Costs</h2>
                  <div className="text-gray-700 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800">Return Shipping</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Defective/Wrong Products:</strong> We cover return shipping costs</li>
                      <li><strong>Change of Mind:</strong> Customer responsible for return shipping</li>
                      <li><strong>Quality Issues:</strong> We cover return shipping costs</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mt-6">Original Shipping</h3>
                    <p>Original shipping charges are non-refundable unless the return is due to our error.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Exchanges</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>We offer exchanges for:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Different flavors of the same product</li>
                      <li>Different pack sizes</li>
                      <li>Defective products with identical replacements</li>
                    </ul>
                    <p>Exchange requests follow the same process as returns. Price differences may apply and will be communicated before processing.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Quality Guarantee</h2>
                  <div className="text-gray-700 space-y-4">
                    <div className="bg-makhana-50 border border-makhana-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-makhana-800 mb-4">100% Freshness Guarantee</h3>
                      <p className="text-makhana-700">We guarantee the freshness and quality of our products. If you receive any product that doesn't meet our quality standards, we will provide a full refund or replacement at no additional cost.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Bulk Orders</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>Special conditions apply to bulk orders (orders above ₹5,000):</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Returns must be initiated within 48 hours of delivery</li>
                      <li>Minimum 80% of products must be unused and in original packaging</li>
                      <li>Custom handling fees may apply</li>
                      <li>Prior approval required from our sales team</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Damaged in Transit</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>If your order arrives damaged:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Take photos of the damaged packaging and product</li>
                      <li>Contact us within 24 hours of delivery</li>
                      <li>Do not consume or use the damaged product</li>
                      <li>We will arrange immediate replacement or full refund</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact for Returns</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>For all return and refund related queries, please contact us:</p>
                    <div className="bg-organic-50 border border-organic-200 rounded-lg p-6">
                      <div className="space-y-2">
                        <p><strong>Returns Team:</strong> returns@namamy.com</p>
                        <p><strong>Customer Care:</strong> +91 7261071570, 70912 60484</p>
                        <p><strong>WhatsApp Support:</strong> +91 7261071570, 70912 60484</p>
                        <p><strong>Business Hours:</strong> Monday - Saturday, 9:00 AM - 7:00 PM</p>
                        <p><strong>Address:</strong> House no-263, Police Station Road, Sabour, Bhagalpur, 813210, Bihar, India</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Policy Updates</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>This return and refund policy may be updated from time to time. Any changes will be posted on this page with an updated revision date. Continued use of our services after such changes constitutes acceptance of the new policy.</p>
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