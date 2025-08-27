import type { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface SitemapPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: SitemapPageProps): Promise<Metadata> {
  return {
    title: 'Sitemap - Namamy',
    description: 'Browse all pages and content available on the Namamy website.',
    robots: 'index, follow',
  };
}

export default function SitemapPage({ params: { locale } }: SitemapPageProps) {
  const breadcrumbItems = [
    { label: 'Sitemap' },
  ];

  const siteLinks = [
    {
      category: 'Main Pages',
      links: [
        { name: 'Home', url: `/${locale}`, description: 'Homepage with featured products and company information' },
        { name: 'Shop', url: `/${locale}/shop`, description: 'Browse our complete collection of premium makhana products' },
        { name: 'About Us', url: `/${locale}/about`, description: 'Learn about our company story and mission' },
        { name: 'Contact', url: `/${locale}/contact`, description: 'Get in touch with our customer support team' },
        { name: 'Blog', url: `/${locale}/blog`, description: 'Health and wellness articles about makhana' },
      ],
    },
    {
      category: 'Product Pages',
      links: [
        { name: 'Premium Roasted Makhana', url: `/${locale}/product/premium-roasted-makhana`, description: 'Classic roasted fox nuts' },
        { name: 'Masala Makhana Mix', url: `/${locale}/product/masala-makhana-mix`, description: 'Spicy masala flavored makhana' },
        { name: 'Chocolate Makhana', url: `/${locale}/product/chocolate-makhana`, description: 'Sweet chocolate coated makhana' },
        { name: 'Peri Peri Makhana', url: `/${locale}/product/peri-peri-makhana`, description: 'Tangy peri peri flavored snacks' },
      ],
    },
    {
      category: 'Customer Account',
      links: [
        { name: 'Login', url: `/${locale}/auth/login`, description: 'Sign in to your account' },
        { name: 'Sign Up', url: `/${locale}/auth/signup`, description: 'Create a new account' },
        { name: 'My Account', url: `/${locale}/account`, description: 'Manage your account and orders' },
        { name: 'Cart', url: `/${locale}/cart`, description: 'View and manage your shopping cart' },
        { name: 'Checkout', url: `/${locale}/checkout`, description: 'Complete your purchase' },
      ],
    },
    {
      category: 'Support & Information',
      links: [
        { name: 'FAQ', url: `/${locale}/faq`, description: 'Frequently asked questions' },
        { name: 'Track Order', url: `/${locale}/track-order`, description: 'Track your order status' },
        { name: 'Customer Reviews', url: `/${locale}/reviews`, description: 'Read customer testimonials' },
        { name: 'Why Choose Us', url: `/${locale}/why-choose-us`, description: 'Learn about our benefits and quality' },
      ],
    },
    {
      category: 'Legal Pages',
      links: [
        { name: 'Privacy Policy', url: `/${locale}/privacy-policy`, description: 'How we protect your privacy' },
        { name: 'Terms of Service', url: `/${locale}/terms-of-service`, description: 'Terms and conditions of use' },
        { name: 'Refund Policy', url: `/${locale}/refund-policy`, description: 'Return and refund procedures' },
      ],
    },
  ];

  return (
    <Layout locale={locale}>
      <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} locale={locale} />
          
          <div className="mt-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                Sitemap
              </h1>
              <p className="text-xl text-gray-600">
                Browse all pages and content available on our website
              </p>
            </div>

            <div className="space-y-8">
              {siteLinks.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl text-makhana-600">
                      {section.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.links.map((link, linkIndex) => (
                        <div key={linkIndex} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                          <a
                            href={link.url}
                            className="text-lg font-semibold text-gray-900 hover:text-makhana-600 transition-colors block mb-1"
                          >
                            {link.name}
                          </a>
                          <p className="text-sm text-gray-600">
                            {link.description}
                          </p>
                          <p className="text-xs text-makhana-500 mt-1">
                            {link.url}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Information */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Website Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-makhana-600">25+</div>
                    <div className="text-sm text-gray-600">Total Pages</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-makhana-600">12</div>
                    <div className="text-sm text-gray-600">Product Pages</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-makhana-600">6</div>
                    <div className="text-sm text-gray-600">Blog Articles</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-makhana-600">4</div>
                    <div className="text-sm text-gray-600">Languages</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="mt-8 bg-gradient-to-r from-makhana-500 to-makhana-600 text-white">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-2">Need Help Finding Something?</h2>
                <p className="text-makhana-100 mb-6">
                  Can't find what you're looking for? Our customer support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={`/${locale}/contact`}
                    className="bg-white text-makhana-600 px-6 py-2 rounded-lg font-semibold hover:bg-makhana-50 transition-colors"
                  >
                    Contact Support
                  </a>
                  <a
                    href={`/${locale}/faq`}
                    className="bg-transparent text-white border border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-makhana-600 transition-colors"
                  >
                    View FAQ
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}