import type { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download, ExternalLink, Calendar, User } from 'lucide-react';

interface PressPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: PressPageProps): Promise<Metadata> {
  return {
    title: 'Press & Media - Namamy',
    description: 'Press releases, media coverage, and resources for journalists and media professionals covering Namamy.',
    keywords: 'press release, media coverage, news, journalism, namamy news',
    robots: 'index, follow',
  };
}

export default function PressPage({ params: { locale } }: PressPageProps) {
  const breadcrumbItems = [
    { label: 'Press & Media' },
  ];

  const pressReleases = [
    {
      id: '1',
      title: 'Namamy Launches Premium Makhana Collection with Focus on Health and Sustainability',
      date: '2024-01-15',
      excerpt: 'New Delhi-based startup introduces premium fox nuts collection, emphasizing traditional processing methods and farmer partnerships.',
      category: 'Product Launch',
    },
    {
      id: '2',
      title: 'Namamy Raises Funding to Expand Premium Healthy Snack Operations',
      date: '2024-01-08',
      excerpt: 'Company secures investment to scale operations and introduce new product varieties in the growing healthy snacking market.',
      category: 'Funding',
    },
    {
      id: '3',
      title: 'Namamy Partners with 500+ Farmers for Sustainable Makhana Production',
      date: '2024-01-02',
      excerpt: 'Initiative aims to improve farmer livelihoods while ensuring consistent supply of high-quality lotus seeds.',
      category: 'Partnership',
    },
  ];

  const mediaAssets = [
    {
      name: 'Company Logo Package',
      description: 'High-resolution logos, brand guidelines, and usage instructions',
      type: 'ZIP',
      size: '2.1 MB',
    },
    {
      name: 'Product Photography',
      description: 'High-quality product images for editorial use',
      type: 'ZIP',
      size: '15.3 MB',
    },
    {
      name: 'Founder Photos',
      description: 'Professional headshots and biography',
      type: 'ZIP',
      size: '5.7 MB',
    },
    {
      name: 'Company Fact Sheet',
      description: 'Key statistics, milestones, and company information',
      type: 'PDF',
      size: '1.2 MB',
    },
  ];

  const mediaoverage = [
    {
      publication: 'Economic Times',
      title: 'How Premium Makhana Brands Are Disrupting The Healthy Snacking Market',
      date: '2024-01-12',
      url: '#',
    },
    {
      publication: 'Business Standard',
      title: 'Startup Spotlight: Namamy Brings Traditional Fox Nuts to Modern Consumers',
      date: '2024-01-05',
      url: '#',
    },
    {
      publication: 'Food & Beverage News',
      title: 'The Rise of Makhana: Ancient Superfood Finds New Market',
      date: '2023-12-28',
      url: '#',
    },
  ];

  return (
    <Layout locale={locale}>
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} locale={locale} />
          
          <div className="mt-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                Press & Media
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Latest news, press releases, and media resources
              </p>
              
              <div className="bg-makhana-50 border border-makhana-200 rounded-lg p-6 max-w-2xl mx-auto">
                <h2 className="text-lg font-semibold text-makhana-800 mb-2">Media Inquiries</h2>
                <p className="text-makhana-700 mb-4">
                  For interviews, press releases, or media partnerships, contact our media team.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" className="border-makhana-300 text-makhana-700">
                    <User className="w-4 h-4 mr-2" />
                    media@namamy.com
                  </Button>
                  <Button variant="outline" className="border-makhana-300 text-makhana-700">
                    📞 +91 7261071570, 70912 60484
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Latest Press Releases */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Latest Press Releases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {pressReleases.map((release) => (
                        <div key={release.id} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <span className="inline-block bg-makhana-100 text-makhana-800 text-xs px-2 py-1 rounded-full mb-2">
                                {release.category}
                              </span>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-makhana-600 transition-colors cursor-pointer">
                                {release.title}
                              </h3>
                              <p className="text-gray-600 mb-3">
                                {release.excerpt}
                              </p>
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(release.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Read Full Release
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download PDF
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Media Coverage */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Media Coverage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mediaoverage.map((coverage, index) => (
                        <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {coverage.title}
                            </h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span className="font-medium">{coverage.publication}</span>
                              <span className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(coverage.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Read
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Media Assets */}
                <Card>
                  <CardHeader>
                    <CardTitle>Media Assets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mediaAssets.map((asset, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {asset.name}
                          </h4>
                          <p className="text-sm text-gray-600 mb-3">
                            {asset.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {asset.type} • {asset.size}
                            </span>
                            <Button variant="outline" size="sm">
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Facts */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Facts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">Founded</h4>
                        <p className="text-gray-600">2023</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Headquarters</h4>
                        <p className="text-gray-600">House no-263, Police Station Road, Sabour, Bhagalpur, 813210, Bihar, India</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Industry</h4>
                        <p className="text-gray-600">Healthy Snacks & Food</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Products</h4>
                        <p className="text-gray-600">Premium Makhana (Fox Nuts)</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Mission</h4>
                        <p className="text-gray-600">Making healthy snacking accessible and delicious</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="bg-gradient-to-br from-makhana-500 to-makhana-600 text-white">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Media Contact</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-semibold">Press Inquiries</p>
                        <p className="text-makhana-100">media@namamy.com</p>
                      </div>
                      <div>
                        <p className="font-semibold">Partnership Inquiries</p>
                        <p className="text-makhana-100">partnerships@namamy.com</p>
                      </div>
                      <div>
                        <p className="font-semibold">Phone</p>
                        <p className="text-makhana-100">+91 7261071570, 70912 60484</p>
                      </div>
                      <div>
                        <p className="font-semibold">Address</p>
                        <p className="text-makhana-100">House no-263, Police Station Road<br />Sabour, Bhagalpur, 813210, Bihar, India</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}