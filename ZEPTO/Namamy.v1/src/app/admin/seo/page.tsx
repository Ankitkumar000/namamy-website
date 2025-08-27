'use client';

import { useState } from 'react';
import { 
  Search, 
  Globe, 
  Link,
  FileText,
  BarChart3,
  Edit2,
  Eye,
  Check,
  X,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Target,
  ExternalLink,
  Plus,
  RefreshCw,
  Download,
  Upload,
  Settings,
  Tag,
  Hash,
  Clock,
  Users,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AdminLayout } from '@/components/admin/AdminLayout';

interface SEOPage {
  id: string;
  url: string;
  title: string;
  metaDescription: string;
  metaKeywords: string[];
  h1Tag: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schemaMarkup?: string;
  status: 'optimized' | 'needs_attention' | 'critical';
  seoScore: number;
  lastUpdated: string;
  pageType: 'product' | 'category' | 'blog' | 'static' | 'other';
  issues: string[];
  opportunities: string[];
}

interface SEOAnalytics {
  organicTraffic: number;
  organicTrafficChange: number;
  averagePosition: number;
  averagePositionChange: number;
  clickThroughRate: number;
  ctrChange: number;
  indexedPages: number;
  totalKeywords: number;
  topKeywords: string[];
}

interface Keyword {
  id: string;
  keyword: string;
  position: number;
  positionChange: number;
  searchVolume: number;
  difficulty: 'easy' | 'medium' | 'hard';
  clicks: number;
  impressions: number;
  ctr: number;
  url: string;
  lastUpdated: string;
}

const mockPages: SEOPage[] = [
  {
    id: '1',
    url: '/',
    title: 'Premium Makhana Online | Healthy Fox Nuts | Namamy',
    metaDescription: 'Buy premium quality makhana (fox nuts) online at Namamy. Healthy, crunchy, and delicious snacks with free delivery across India.',
    metaKeywords: ['makhana', 'fox nuts', 'healthy snacks', 'premium makhana', 'buy makhana online'],
    h1Tag: 'Premium Makhana - Healthy Snacking Redefined',
    canonicalUrl: 'https://namamy.com/',
    ogTitle: 'Premium Makhana Online | Healthy Fox Nuts | Namamy',
    ogDescription: 'Discover premium quality makhana at Namamy. Healthy, crunchy, and delicious.',
    ogImage: 'https://namamy.com/og-home.jpg',
    status: 'optimized',
    seoScore: 95,
    lastUpdated: '2024-01-30T10:00:00Z',
    pageType: 'static',
    issues: [],
    opportunities: ['Add FAQ schema markup', 'Optimize images for Core Web Vitals']
  },
  {
    id: '2',
    url: '/products/premium-raw-makhana-250g',
    title: 'Premium Raw Makhana (250g) - Fresh Fox Nuts | Namamy',
    metaDescription: 'Premium raw makhana (250g) - fresh, crunchy fox nuts. Perfect for healthy snacking. Order now with free delivery.',
    metaKeywords: ['raw makhana', 'premium makhana 250g', 'fox nuts', 'healthy snacks'],
    h1Tag: 'Premium Raw Makhana (250g)',
    canonicalUrl: 'https://namamy.com/products/premium-raw-makhana-250g',
    status: 'needs_attention',
    seoScore: 78,
    lastUpdated: '2024-01-29T15:30:00Z',
    pageType: 'product',
    issues: ['Missing schema markup', 'Meta description too long'],
    opportunities: ['Add product schema', 'Optimize title length', 'Add customer reviews schema']
  },
  {
    id: '3',
    url: '/blog/benefits-of-makhana',
    title: 'Top 10 Health Benefits of Makhana (Fox Nuts)',
    metaDescription: 'Discover amazing health benefits of makhana. Low calorie, high protein, perfect for weight loss and overall health.',
    metaKeywords: ['makhana benefits', 'fox nuts health benefits', 'makhana nutrition', 'healthy snacks'],
    h1Tag: 'Top 10 Health Benefits of Makhana (Fox Nuts)',
    canonicalUrl: 'https://namamy.com/blog/benefits-of-makhana',
    status: 'critical',
    seoScore: 45,
    lastUpdated: '2024-01-25T12:00:00Z',
    pageType: 'blog',
    issues: ['No meta description', 'Missing H2 tags', 'Low word count', 'No internal links'],
    opportunities: ['Add comprehensive content', 'Include related posts', 'Add FAQ section']
  },
  {
    id: '4',
    url: '/categories/roasted-makhana',
    title: 'Roasted Makhana Collection - Premium Fox Nuts | Namamy',
    metaDescription: 'Explore our roasted makhana collection. Crispy, flavorful, and healthy snacks. Free shipping on orders above ₹499.',
    metaKeywords: ['roasted makhana', 'flavored makhana', 'crispy fox nuts', 'healthy snacks'],
    h1Tag: 'Roasted Makhana Collection',
    canonicalUrl: 'https://namamy.com/categories/roasted-makhana',
    status: 'optimized',
    seoScore: 88,
    lastUpdated: '2024-01-28T09:45:00Z',
    pageType: 'category',
    issues: ['Missing breadcrumb schema'],
    opportunities: ['Add category schema markup', 'Optimize product grid loading']
  },
  {
    id: '5',
    url: '/about',
    title: 'About Namamy - Premium Makhana Brand | Our Story',
    metaDescription: 'Learn about Namamy\'s journey in bringing premium quality makhana to Indian households. Our commitment to quality and health.',
    metaKeywords: ['about namamy', 'makhana brand', 'premium fox nuts', 'healthy snacks brand'],
    h1Tag: 'About Namamy - Our Story',
    canonicalUrl: 'https://namamy.com/about',
    status: 'needs_attention',
    seoScore: 72,
    lastUpdated: '2024-01-26T14:20:00Z',
    pageType: 'static',
    issues: ['Low text-to-HTML ratio', 'Missing social media links'],
    opportunities: ['Add team section', 'Include company achievements', 'Add testimonials']
  }
];

const mockKeywords: Keyword[] = [
  {
    id: '1',
    keyword: 'makhana online',
    position: 3,
    positionChange: 2,
    searchVolume: 8100,
    difficulty: 'medium',
    clicks: 1250,
    impressions: 15400,
    ctr: 8.1,
    url: '/',
    lastUpdated: '2024-01-30T00:00:00Z'
  },
  {
    id: '2',
    keyword: 'buy fox nuts',
    position: 1,
    positionChange: 0,
    searchVolume: 2900,
    difficulty: 'easy',
    clicks: 890,
    impressions: 3200,
    ctr: 27.8,
    url: '/',
    lastUpdated: '2024-01-30T00:00:00Z'
  },
  {
    id: '3',
    keyword: 'premium makhana',
    position: 7,
    positionChange: -2,
    searchVolume: 1800,
    difficulty: 'hard',
    clicks: 45,
    impressions: 980,
    ctr: 4.6,
    url: '/products/premium-raw-makhana-250g',
    lastUpdated: '2024-01-30T00:00:00Z'
  },
  {
    id: '4',
    keyword: 'makhana benefits',
    position: 12,
    positionChange: 5,
    searchVolume: 14800,
    difficulty: 'medium',
    clicks: 320,
    impressions: 8900,
    ctr: 3.6,
    url: '/blog/benefits-of-makhana',
    lastUpdated: '2024-01-30T00:00:00Z'
  },
  {
    id: '5',
    keyword: 'healthy snacks online',
    position: 15,
    positionChange: -3,
    searchVolume: 22100,
    difficulty: 'hard',
    clicks: 180,
    impressions: 12500,
    ctr: 1.4,
    url: '/categories/roasted-makhana',
    lastUpdated: '2024-01-30T00:00:00Z'
  }
];

const mockAnalytics: SEOAnalytics = {
  organicTraffic: 45600,
  organicTrafficChange: 12.5,
  averagePosition: 8.3,
  averagePositionChange: -1.2,
  clickThroughRate: 5.8,
  ctrChange: 0.7,
  indexedPages: 156,
  totalKeywords: 1247,
  topKeywords: ['makhana', 'fox nuts', 'healthy snacks', 'premium makhana', 'roasted makhana']
};

export default function AdminSEO() {
  const [pages, setPages] = useState<SEOPage[]>(mockPages);
  const [keywords, setKeywords] = useState<Keyword[]>(mockKeywords);
  const [analytics] = useState<SEOAnalytics>(mockAnalytics);
  const [activeTab, setActiveTab] = useState<'overview' | 'pages' | 'keywords' | 'tools'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [pageTypeFilter, setPageTypeFilter] = useState<string>('all');
  const [selectedPage, setSelectedPage] = useState<SEOPage | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPage, setEditingPage] = useState<Partial<SEOPage>>({});

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.metaDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || page.status === statusFilter;
    const matchesPageType = pageTypeFilter === 'all' || page.pageType === pageTypeFilter;
    
    return matchesSearch && matchesStatus && matchesPageType;
  });

  const getStatusBadge = (status: string, score?: number) => {
    switch (status) {
      case 'optimized':
        return <Badge variant="default" className="bg-green-100 text-green-800">Optimized</Badge>;
      case 'needs_attention':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">Needs Attention</Badge>;
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return <Badge variant="default" className="bg-green-100 text-green-800">Easy</Badge>;
      case 'medium':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'hard':
        return <Badge variant="destructive">Hard</Badge>;
      default:
        return <Badge variant="secondary">{difficulty}</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-3 h-3" />;
    if (change < 0) return <TrendingDown className="w-3 h-3" />;
    return null;
  };

  const openEditModal = (page: SEOPage) => {
    setSelectedPage(page);
    setEditingPage(page);
    setShowEditModal(true);
  };

  const savePage = () => {
    if (selectedPage && editingPage) {
      setPages(pages.map(page =>
        page.id === selectedPage.id ? { ...page, ...editingPage, lastUpdated: new Date().toISOString() } : page
      ));
      setShowEditModal(false);
      setSelectedPage(null);
      setEditingPage({});
    }
  };

  const analyzePage = (pageId: string) => {
    // Simulate page analysis
    setPages(pages.map(page =>
      page.id === pageId 
        ? { ...page, lastUpdated: new Date().toISOString(), seoScore: Math.min(page.seoScore + 5, 100) }
        : page
    ));
  };

  const stats = {
    totalPages: pages.length,
    optimizedPages: pages.filter(p => p.status === 'optimized').length,
    criticalPages: pages.filter(p => p.status === 'critical').length,
    averageScore: Math.round(pages.reduce((sum, p) => sum + p.seoScore, 0) / pages.length)
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">SEO Management</h1>
            <p className="text-gray-600 mt-1">Monitor and optimize your website's search engine performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'pages', name: 'Pages', icon: FileText },
              { id: 'keywords', name: 'Keywords', icon: Tag },
              { id: 'tools', name: 'Tools', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Organic Traffic</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.organicTraffic.toLocaleString()}</p>
                      <div className={`flex items-center text-sm ${getChangeColor(analytics.organicTrafficChange)}`}>
                        {getChangeIcon(analytics.organicTrafficChange)}
                        <span className="ml-1">
                          {analytics.organicTrafficChange > 0 ? '+' : ''}{analytics.organicTrafficChange}%
                        </span>
                      </div>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg. Position</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.averagePosition}</p>
                      <div className={`flex items-center text-sm ${getChangeColor(analytics.averagePositionChange)}`}>
                        {getChangeIcon(analytics.averagePositionChange)}
                        <span className="ml-1">
                          {analytics.averagePositionChange > 0 ? '+' : ''}{analytics.averagePositionChange}
                        </span>
                      </div>
                    </div>
                    <Target className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Click Rate</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.clickThroughRate}%</p>
                      <div className={`flex items-center text-sm ${getChangeColor(analytics.ctrChange)}`}>
                        {getChangeIcon(analytics.ctrChange)}
                        <span className="ml-1">
                          {analytics.ctrChange > 0 ? '+' : ''}{analytics.ctrChange}%
                        </span>
                      </div>
                    </div>
                    <Activity className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Indexed Pages</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.indexedPages}</p>
                      <p className="text-sm text-gray-500">{analytics.totalKeywords} keywords</p>
                    </div>
                    <Globe className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Pages</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalPages}</p>
                    </div>
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Optimized</p>
                      <p className="text-2xl font-bold text-green-600">{stats.optimizedPages}</p>
                    </div>
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Critical Issues</p>
                      <p className="text-2xl font-bold text-red-600">{stats.criticalPages}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg. Score</p>
                      <p className={`text-2xl font-bold ${getScoreColor(stats.averageScore)}`}>{stats.averageScore}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Keywords */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {keywords.slice(0, 5).map((keyword) => (
                    <div key={keyword.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Hash className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{keyword.keyword}</span>
                        </div>
                        {getDifficultyBadge(keyword.difficulty)}
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <p className="text-gray-500">Position</p>
                          <div className={`flex items-center justify-center space-x-1 ${getChangeColor(keyword.positionChange)}`}>
                            <span className="font-medium">#{keyword.position}</span>
                            {keyword.positionChange !== 0 && (
                              <>
                                {getChangeIcon(-keyword.positionChange)}
                                <span>{Math.abs(keyword.positionChange)}</span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-gray-500">Clicks</p>
                          <p className="font-medium">{keyword.clicks.toLocaleString()}</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-gray-500">CTR</p>
                          <p className="font-medium">{keyword.ctr}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Pages Tab */}
        {activeTab === 'pages' && (
          <div className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex gap-4 items-center w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search pages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="optimized">Optimized</option>
                      <option value="needs_attention">Needs Attention</option>
                      <option value="critical">Critical</option>
                    </select>

                    <select
                      value={pageTypeFilter}
                      onChange={(e) => setPageTypeFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Types</option>
                      <option value="product">Product</option>
                      <option value="category">Category</option>
                      <option value="blog">Blog</option>
                      <option value="static">Static</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pages List */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Pages ({filteredPages.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredPages.map((page) => (
                    <div key={page.id} className="border rounded-lg p-6 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="font-medium text-gray-900 truncate">{page.title}</h3>
                            {getStatusBadge(page.status, page.seoScore)}
                            <Badge variant="outline" className="capitalize">{page.pageType}</Badge>
                            <div className={`flex items-center space-x-1 text-sm font-medium ${getScoreColor(page.seoScore)}`}>
                              <BarChart3 className="w-4 h-4" />
                              <span>{page.seoScore}/100</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Link className="w-4 h-4" />
                              <span className="truncate">{page.url}</span>
                              <Button variant="ghost" size="sm" className="p-0 h-auto">
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            </div>
                            
                            <p className="text-sm text-gray-700 line-clamp-2">{page.metaDescription}</p>
                            
                            {page.metaKeywords.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {page.metaKeywords.slice(0, 3).map((keyword, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {keyword}
                                  </Badge>
                                ))}
                                {page.metaKeywords.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{page.metaKeywords.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                          
                          {(page.issues.length > 0 || page.opportunities.length > 0) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {page.issues.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-medium text-red-600 mb-2 flex items-center">
                                    <AlertTriangle className="w-4 h-4 mr-1" />
                                    Issues ({page.issues.length})
                                  </h4>
                                  <ul className="text-xs text-red-700 space-y-1">
                                    {page.issues.slice(0, 2).map((issue, index) => (
                                      <li key={index}>• {issue}</li>
                                    ))}
                                    {page.issues.length > 2 && (
                                      <li>• +{page.issues.length - 2} more issues</li>
                                    )}
                                  </ul>
                                </div>
                              )}
                              
                              {page.opportunities.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-medium text-blue-600 mb-2 flex items-center">
                                    <TrendingUp className="w-4 h-4 mr-1" />
                                    Opportunities ({page.opportunities.length})
                                  </h4>
                                  <ul className="text-xs text-blue-700 space-y-1">
                                    {page.opportunities.slice(0, 2).map((opportunity, index) => (
                                      <li key={index}>• {opportunity}</li>
                                    ))}
                                    {page.opportunities.length > 2 && (
                                      <li>• +{page.opportunities.length - 2} more opportunities</li>
                                    )}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-4">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>Updated {new Date(page.lastUpdated).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => analyzePage(page.id)}
                          >
                            <Activity className="w-4 h-4 mr-1" />
                            Analyze
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditModal(page)}
                          >
                            <Edit2 className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Keywords Tab */}
        {activeTab === 'keywords' && (
          <Card>
            <CardHeader>
              <CardTitle>Keyword Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {keywords.map((keyword) => (
                  <div key={keyword.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium">{keyword.keyword}</h3>
                            {getDifficultyBadge(keyword.difficulty)}
                          </div>
                          <p className="text-sm text-gray-500 truncate">{keyword.url}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-8 text-sm">
                        <div className="text-center">
                          <p className="text-gray-500 mb-1">Position</p>
                          <div className={`flex items-center space-x-1 ${getChangeColor(keyword.positionChange)}`}>
                            <span className="font-medium text-lg">#{keyword.position}</span>
                            {keyword.positionChange !== 0 && (
                              <>
                                {getChangeIcon(-keyword.positionChange)}
                                <span>{Math.abs(keyword.positionChange)}</span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-gray-500 mb-1">Volume</p>
                          <p className="font-medium">{keyword.searchVolume.toLocaleString()}</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-gray-500 mb-1">Clicks</p>
                          <p className="font-medium">{keyword.clicks.toLocaleString()}</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-gray-500 mb-1">Impressions</p>
                          <p className="font-medium">{keyword.impressions.toLocaleString()}</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-gray-500 mb-1">CTR</p>
                          <p className="font-medium">{keyword.ctr}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tools Tab */}
        {activeTab === 'tools' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Analysis Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start">
                  <Activity className="w-4 h-4 mr-2" />
                  Site Audit
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Link className="w-4 h-4 mr-2" />
                  Broken Links Check
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Globe className="w-4 h-4 mr-2" />
                  Sitemap Generator
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Robots.txt Editor
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Schema Markup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start">
                  <Tag className="w-4 h-4 mr-2" />
                  Product Schema
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Article Schema
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Organization Schema
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Schema Validator
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Edit Page Modal */}
        {showEditModal && selectedPage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-bold">Edit SEO - {selectedPage.title}</h2>
                <Button variant="ghost" onClick={() => setShowEditModal(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Title
                  </label>
                  <input
                    type="text"
                    value={editingPage.title || ''}
                    onChange={(e) => setEditingPage({...editingPage, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {(editingPage.title || '').length}/60 characters
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={editingPage.metaDescription || ''}
                    onChange={(e) => setEditingPage({...editingPage, metaDescription: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {(editingPage.metaDescription || '').length}/160 characters
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    H1 Tag
                  </label>
                  <input
                    type="text"
                    value={editingPage.h1Tag || ''}
                    onChange={(e) => setEditingPage({...editingPage, h1Tag: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Keywords (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editingPage.metaKeywords?.join(', ') || ''}
                    onChange={(e) => setEditingPage({
                      ...editingPage, 
                      metaKeywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Canonical URL
                    </label>
                    <input
                      type="url"
                      value={editingPage.canonicalUrl || ''}
                      onChange={(e) => setEditingPage({...editingPage, canonicalUrl: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      OG Image URL
                    </label>
                    <input
                      type="url"
                      value={editingPage.ogImage || ''}
                      onChange={(e) => setEditingPage({...editingPage, ogImage: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Open Graph Title
                  </label>
                  <input
                    type="text"
                    value={editingPage.ogTitle || ''}
                    onChange={(e) => setEditingPage({...editingPage, ogTitle: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Open Graph Description
                  </label>
                  <textarea
                    value={editingPage.ogDescription || ''}
                    onChange={(e) => setEditingPage({...editingPage, ogDescription: e.target.value})}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 p-6 border-t">
                <Button variant="outline" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button onClick={savePage} className="bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}