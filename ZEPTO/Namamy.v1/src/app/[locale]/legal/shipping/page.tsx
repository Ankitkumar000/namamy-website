import type { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

interface ShippingPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: ShippingPageProps): Promise<Metadata> {
  return {
    title: 'Shipping Policy - Namamy',
    description: 'Learn about our shipping rates, delivery times, and shipping policies for Namamy products.',
    robots: 'index, follow',
  };
}

export default function ShippingPage({ params: { locale } }: ShippingPageProps) {
  const breadcrumbItems = [
    { label: 'Legal' },
    { label: 'Shipping Policy' },
  ];

  return (
    <Layout locale={locale}>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} locale={locale} />
          
          <div className="mt-8 bg-white rounded-lg shadow-sm p-8">
            <div className="prose prose-lg max-w-none">
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-8">
                Shipping Policy
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                Last updated: January 2024
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Shipping Areas</h2>
                  <div className="text-gray-700 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800">Pan-India Delivery</h3>
                    <p>We currently deliver across India to the following areas:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Metro Cities:</strong> Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune, Ahmedabad</li>
                      <li><strong>Tier 1 Cities:</strong> All major state capitals and commercial hubs</li>
                      <li><strong>Tier 2 Cities:</strong> Most district headquarters and commercial centers</li>
                      <li><strong>Rural Areas:</strong> Subject to courier serviceability (additional charges may apply)</li>
                    </ul>
                    
                    <div className="bg-organic-50 border border-organic-200 rounded-lg p-4 mt-4">
                      <p className="text-organic-800"><strong>Note:</strong> Some remote areas may have limited delivery options. Please contact us to confirm delivery availability to your location.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Delivery Timeframes</h2>
                  <div className="text-gray-700 space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-makhana-50 border border-makhana-200 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-makhana-800 mb-3">Metro Cities</h3>
                        <ul className="space-y-2 text-makhana-700">
                          <li><strong>Same Day:</strong> Orders placed before 12 PM</li>
                          <li><strong>Next Day:</strong> Orders placed before 6 PM</li>
                          <li><strong>Standard:</strong> 1-2 business days</li>
                        </ul>
                      </div>
                      
                      <div className="bg-earth-50 border border-earth-200 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-earth-800 mb-3">Other Cities</h3>
                        <ul className="space-y-2 text-earth-700">
                          <li><strong>Express:</strong> 2-3 business days</li>
                          <li><strong>Standard:</strong> 3-5 business days</li>
                          <li><strong>Remote Areas:</strong> 5-7 business days</li>
                        </ul>
                      </div>
                    </div>
                    
                    <p><strong>Business Days:</strong> Monday to Saturday (excluding public holidays and Sundays)</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Shipping Charges</h2>
                  <div className="text-gray-700 space-y-4">
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-300">
                        <thead className="bg-organic-100">
                          <tr>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Order Value</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Metro Cities</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Other Cities</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Remote Areas</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 px-4 py-3">Above ₹999</td>
                            <td className="border border-gray-300 px-4 py-3 text-organic-600 font-semibold">FREE</td>
                            <td className="border border-gray-300 px-4 py-3 text-organic-600 font-semibold">FREE</td>
                            <td className="border border-gray-300 px-4 py-3">₹50</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-4 py-3">₹500 - ₹999</td>
                            <td className="border border-gray-300 px-4 py-3">₹40</td>
                            <td className="border border-gray-300 px-4 py-3">₹60</td>
                            <td className="border border-gray-300 px-4 py-3">₹100</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-3">Below ₹500</td>
                            <td className="border border-gray-300 px-4 py-3">₹60</td>
                            <td className="border border-gray-300 px-4 py-3">₹80</td>
                            <td className="border border-gray-300 px-4 py-3">₹120</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mt-6">Express Delivery Charges</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Same Day Delivery:</strong> ₹150 additional (Metro cities only)</li>
                      <li><strong>Next Day Delivery:</strong> ₹100 additional (Metro cities only)</li>
                      <li><strong>Weekend Delivery:</strong> ₹80 additional (Subject to availability)</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Order Processing</h2>
                  <div className="text-gray-700 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800">Processing Time</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>In-Stock Items:</strong> Orders processed within 24 hours</li>
                      <li><strong>Custom/Special Orders:</strong> 2-3 business days processing time</li>
                      <li><strong>Bulk Orders:</strong> 3-5 business days processing time</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mt-6">Order Cutoff Times</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Same Day Delivery:</strong> 12:00 PM</li>
                      <li><strong>Next Day Delivery:</strong> 6:00 PM</li>
                      <li><strong>Standard Delivery:</strong> 11:59 PM</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Packaging Standards</h2>
                  <div className="text-gray-700 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800">Food Safety Packaging</h3>
                    <p>We ensure the highest standards of food safety in our packaging:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Food-grade, airtight packaging to maintain freshness</li>
                      <li>Temperature-controlled storage until dispatch</li>
                      <li>Protective outer packaging to prevent damage</li>
                      <li>Tamper-proof sealing for food safety</li>
                      <li>Eco-friendly packaging materials where possible</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mt-6">Special Handling</h3>
                    <p>Certain products receive special handling:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Premium Products:</strong> Gift-ready packaging included</li>
                      <li><strong>Bulk Orders:</strong> Industrial-grade packaging for B2B clients</li>
                      <li><strong>Gift Orders:</strong> Decorative packaging and personalized notes</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Delivery Process</h2>
                  <div className="text-gray-700 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800">Tracking Information</h3>
                    <p>Once your order is shipped, you will receive:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>SMS notification with tracking number</li>
                      <li>Email with detailed tracking information</li>
                      <li>Real-time tracking updates</li>
                      <li>Delivery confirmation notification</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mt-6">Delivery Attempts</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>3 delivery attempts will be made</li>
                      <li>Customer will be contacted before each attempt</li>
                      <li>Failed deliveries will be returned to our facility</li>
                      <li>Re-delivery charges may apply for failed attempts due to customer unavailability</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Special Delivery Services</h2>
                  <div className="text-gray-700 space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="border border-organic-200 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-organic-800 mb-3">Premium Delivery</h3>
                        <ul className="space-y-2 text-gray-700">
                          <li>White-glove delivery service</li>
                          <li>Scheduled time slots</li>
                          <li>Premium packaging</li>
                          <li>Personal delivery executive</li>
                        </ul>
                        <p className="text-sm text-organic-600 mt-3">Available for orders above ₹2,000</p>
                      </div>
                      
                      <div className="border border-makhana-200 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-makhana-800 mb-3">Corporate Delivery</h3>
                        <ul className="space-y-2 text-gray-700">
                          <li>Bulk order delivery</li>
                          <li>Office/corporate address delivery</li>
                          <li>Invoice and documentation</li>
                          <li>Dedicated account manager</li>
                        </ul>
                        <p className="text-sm text-makhana-600 mt-3">Minimum order ₹5,000</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Delivery Issues</h2>
                  <div className="text-gray-700 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800">Delayed Deliveries</h3>
                    <p>In case of delays due to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Weather Conditions:</strong> Natural calamities, heavy rain, etc.</li>
                      <li><strong>Transport Strikes:</strong> Local or national transport disruptions</li>
                      <li><strong>Festival Seasons:</strong> High volume during festivals</li>
                      <li><strong>Force Majeure:</strong> Unforeseeable circumstances</li>
                    </ul>
                    <p>We will keep you informed and work to minimize delays.</p>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mt-6">Damaged Packages</h3>
                    <p>If you receive a damaged package:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Do not accept the delivery if outer packaging is severely damaged</li>
                      <li>Take photos of the damaged package</li>
                      <li>Contact us immediately at +91 7261071570, 70912 60484</li>
                      <li>We will arrange replacement or refund within 24 hours</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Shipping</h2>
                  <div className="text-gray-700 space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-yellow-800 mb-3">Coming Soon</h3>
                      <p className="text-yellow-700">We are working on expanding our services to international markets. Currently, we only ship within India. Please stay tuned for updates on international shipping.</p>
                      <p className="text-yellow-700 mt-2">For international orders, please contact us at international@namamy.com for special arrangements.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Shipping Partners</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>We work with trusted logistics partners to ensure safe and timely delivery:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Express Delivery:</strong> Blue Dart, FedEx</li>
                      <li><strong>Standard Delivery:</strong> Delhivery, Ekart</li>
                      <li><strong>Local Delivery:</strong> Our own delivery fleet in select cities</li>
                      <li><strong>Last Mile:</strong> Local courier partners</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Address Guidelines</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>To ensure smooth delivery, please provide:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Complete address with landmark</li>
                      <li>Correct PIN code</li>
                      <li>Active mobile number</li>
                      <li>Alternative contact number if possible</li>
                      <li>Specific delivery instructions if needed</li>
                    </ul>
                    
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                      <p className="text-red-700"><strong>Important:</strong> Incomplete or incorrect addresses may result in delivery delays or additional charges.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact for Shipping Queries</h2>
                  <div className="text-gray-700 space-y-4">
                    <p>For all shipping related queries, please contact us:</p>
                    <div className="bg-organic-50 border border-organic-200 rounded-lg p-6">
                      <div className="space-y-2">
                        <p><strong>Shipping Support:</strong> shipping@namamy.com</p>
                        <p><strong>Customer Care:</strong> +91 7261071570, 70912 60484</p>
                        <p><strong>WhatsApp Support:</strong> +91 7261071570, 70912 60484</p>
                        <p><strong>Track Order:</strong> <a href={`/${locale}/track-order`} className="text-organic-600 hover:underline">Track Your Order</a></p>
                        <p><strong>Business Hours:</strong> Monday - Saturday, 9:00 AM - 7:00 PM</p>
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