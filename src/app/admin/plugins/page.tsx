'use client';

import { useState } from 'react';
import { 
  Puzzle, 
  Search, 
  Download, 
  Settings,
  CheckCircle,
  XCircle,
  RefreshCw,
  Star,
  Users,
  Calendar,
  Shield,
  Zap,
  Globe,
  BarChart3,
  Mail,
  CreditCard,
  Camera,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AdminLayout } from '@/components/admin/AdminLayout';

interface Plugin {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  category: string;
  isActive: boolean;
  isInstalled: boolean;
  rating: number;
  downloads: number;
  lastUpdated: string;
  price: number;
  icon: any;
  features: string[];
}

const mockPlugins: Plugin[] = [
  {
    id: '1',
    name: 'SEO Optimizer Pro',
    description: 'Advanced SEO optimization for better search engine rankings and organic traffic growth.',
    version: '2.1.0',
    author: 'SEO Tools Inc.',
    category: 'SEO',
    isActive: true,
    isInstalled: true,
    rating: 4.8,
    downloads: 15420,
    lastUpdated: '2024-01-10',
    price: 0,
    icon: BarChart3,
    features: ['Meta Tags', 'XML Sitemap', 'Schema Markup', 'Analytics Integration']
  },
  {
    id: '2',
    name: 'Email Marketing Suite',
    description: 'Complete email marketing solution with automation, templates, and analytics.',
    version: '1.5.2',
    author: 'Marketing Pro',
    category: 'Marketing',
    isActive: true,
    isInstalled: true,
    rating: 4.6,
    downloads: 8930,
    lastUpdated: '2024-01-08',
    price: 49,
    icon: Mail,
    features: ['Email Templates', 'Automation', 'A/B Testing', 'Analytics']
  },
  {
    id: '3',
    name: 'Security Shield',
    description: 'Advanced security plugin to protect your website from malware and attacks.',
    version: '3.0.1',
    author: 'SecureWeb Ltd.',
    category: 'Security',
    isActive: false,
    isInstalled: true,
    rating: 4.9,
    downloads: 25680,
    lastUpdated: '2024-01-12',
    price: 79,
    icon: Shield,
    features: ['Malware Scan', 'Firewall', 'Login Protection', 'Security Monitoring']
  },
  {
    id: '4',
    name: 'Performance Booster',
    description: 'Speed up your website with caching, optimization, and performance improvements.',
    version: '2.3.0',
    author: 'Speed Solutions',
    category: 'Performance',
    isActive: true,
    isInstalled: true,
    rating: 4.7,
    downloads: 18750,
    lastUpdated: '2024-01-09',
    price: 0,
    icon: Zap,
    features: ['Page Caching', 'Image Optimization', 'Minification', 'CDN Integration']
  },
  {
    id: '5',
    name: 'Social Media Connector',
    description: 'Integrate and manage all your social media accounts from one dashboard.',
    version: '1.8.0',
    author: 'Social Tools Co.',
    category: 'Social',
    isActive: false,
    isInstalled: false,
    rating: 4.4,
    downloads: 12340,
    lastUpdated: '2024-01-07',
    price: 29,
    icon: Globe,
    features: ['Auto Posting', 'Social Login', 'Share Buttons', 'Analytics']
  },
  {
    id: '6',
    name: 'Advanced Payment Gateway',
    description: 'Multiple payment options with secure processing and fraud protection.',
    version: '2.0.0',
    author: 'Payment Solutions',
    category: 'Payment',
    isActive: true,
    isInstalled: true,
    rating: 4.5,
    downloads: 9870,
    lastUpdated: '2024-01-11',
    price: 99,
    icon: CreditCard,
    features: ['Multiple Gateways', 'Fraud Protection', 'Recurring Payments', 'Mobile Payments']
  },
  {
    id: '7',
    name: 'Image Gallery Pro',
    description: 'Beautiful responsive image galleries with lightbox and customization options.',
    version: '1.4.0',
    author: 'Gallery Makers',
    category: 'Media',
    isActive: false,
    isInstalled: false,
    rating: 4.3,
    downloads: 7650,
    lastUpdated: '2024-01-06',
    price: 39,
    icon: Camera,
    features: ['Responsive Design', 'Lightbox', 'Image Filters', 'Touch Gestures']
  },
  {
    id: '8',
    name: 'Customer Reviews & Ratings',
    description: 'Collect and display customer reviews with rating system and moderation.',
    version: '2.2.0',
    author: 'Review Systems',
    category: 'Reviews',
    isActive: true,
    isInstalled: true,
    rating: 4.6,
    downloads: 11230,
    lastUpdated: '2024-01-05',
    price: 0,
    icon: MessageSquare,
    features: ['Star Ratings', 'Review Moderation', 'Email Notifications', 'Schema Markup']
  }
];

export default function AdminPlugins() {
  const [plugins, setPlugins] = useState<Plugin[]>(mockPlugins);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'installed' | 'available'>('all');

  const categories = Array.from(new Set(plugins.map(p => p.category)));

  const filteredPlugins = plugins.filter(plugin => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plugin.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || plugin.category === filterCategory;
    
    let matchesStatus = true;
    if (filterStatus === 'active') matchesStatus = plugin.isActive;
    else if (filterStatus === 'inactive') matchesStatus = plugin.isInstalled && !plugin.isActive;
    else if (filterStatus === 'installed') matchesStatus = plugin.isInstalled;
    else if (filterStatus === 'available') matchesStatus = !plugin.isInstalled;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const togglePlugin = (id: string) => {
    setPlugins(plugins.map(plugin => 
      plugin.id === id ? { ...plugin, isActive: !plugin.isActive } : plugin
    ));
  };

  const installPlugin = (id: string) => {
    setPlugins(plugins.map(plugin => 
      plugin.id === id ? { ...plugin, isInstalled: true } : plugin
    ));
  };

  const uninstallPlugin = (id: string) => {
    setPlugins(plugins.map(plugin => 
      plugin.id === id ? { ...plugin, isInstalled: false, isActive: false } : plugin
    ));
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Plugins</h1>
            <p className="text-gray-600 mt-1">Extend your website functionality with plugins</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Check Updates
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Browse More
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Plugins</p>
                  <p className="text-2xl font-bold text-gray-900">{plugins.length}</p>
                </div>
                <Puzzle className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-green-600">
                    {plugins.filter(p => p.isActive).length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Installed</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {plugins.filter(p => p.isInstalled).length}
                  </p>
                </div>
                <Download className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Updates Available</p>
                  <p className="text-2xl font-bold text-orange-600">3</p>
                </div>
                <RefreshCw className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex gap-4 items-center w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search plugins..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="installed">Installed</option>
                  <option value="available">Available</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plugins Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlugins.map((plugin) => {
            const IconComponent = plugin.icon;
            return (
              <Card key={plugin.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{plugin.name}</CardTitle>
                        <p className="text-sm text-gray-500">by {plugin.author}</p>
                      </div>
                    </div>
                    {plugin.isInstalled && (
                      <div className="flex items-center space-x-1">
                        {plugin.isActive ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {plugin.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <Badge variant="outline">{plugin.category}</Badge>
                    <span className="text-gray-500">v{plugin.version}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    {renderStars(plugin.rating)}
                    <div className="text-sm text-gray-500">
                      {plugin.downloads.toLocaleString()} downloads
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {plugin.features.slice(0, 3).map(feature => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {plugin.features.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{plugin.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-lg font-bold text-gray-900">
                      {plugin.price === 0 ? 'Free' : `₹${plugin.price}`}
                    </div>
                    
                    <div className="flex space-x-2">
                      {!plugin.isInstalled ? (
                        <Button
                          size="sm"
                          onClick={() => installPlugin(plugin.id)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Install
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => togglePlugin(plugin.id)}
                          >
                            {plugin.isActive ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                          >
                            <Settings className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredPlugins.length === 0 && (
          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <Puzzle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No plugins found matching your criteria</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}