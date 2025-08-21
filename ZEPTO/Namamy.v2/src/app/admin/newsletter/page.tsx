'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Mail,
  Send,
  Calendar,
  TrendingUp,
  Users,
  UserPlus,
  X,
  Save,
  Trash2,
  Eye,
  Edit,
  Copy,
  BarChart3,
  Target,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AdminLayout } from '@/components/admin/AdminLayout';

// Mock newsletter subscribers data
const mockSubscribers = [
  {
    id: 'SUB-001',
    email: 'rajesh@example.com',
    name: 'Rajesh Kumar',
    subscribeDate: '2024-01-15',
    status: 'active',
    source: 'website',
    interests: ['healthy-snacks', 'recipes'],
    totalEmailsReceived: 12,
    lastEmailOpened: '2024-01-30',
    clickThrough: 8
  },
  {
    id: 'SUB-002', 
    email: 'priya@example.com',
    name: 'Priya Sharma',
    subscribeDate: '2024-01-20',
    status: 'active',
    source: 'social-media',
    interests: ['offers', 'new-products'],
    totalEmailsReceived: 8,
    lastEmailOpened: '2024-01-29',
    clickThrough: 5
  },
  {
    id: 'SUB-003',
    email: 'amit@example.com', 
    name: 'Amit Singh',
    subscribeDate: '2024-01-10',
    status: 'unsubscribed',
    source: 'newsletter-signup',
    interests: ['health-tips'],
    totalEmailsReceived: 15,
    lastEmailOpened: '2024-01-25',
    clickThrough: 3
  },
  {
    id: 'SUB-004',
    email: 'neha@example.com',
    name: 'Neha Gupta', 
    subscribeDate: '2024-01-25',
    status: 'pending',
    source: 'website',
    interests: ['recipes', 'health-tips'],
    totalEmailsReceived: 2,
    lastEmailOpened: null,
    clickThrough: 0
  },
  {
    id: 'SUB-005',
    email: 'suresh@example.com',
    name: 'Suresh Reddy',
    subscribeDate: '2024-01-05',
    status: 'bounced',
    source: 'checkout',
    interests: ['offers'],
    totalEmailsReceived: 10,
    lastEmailOpened: '2024-01-20',
    clickThrough: 2
  }
];

// Mock email campaigns data
const mockCampaigns = [
  {
    id: 'CAMP-001',
    subject: 'New Year Health Resolution: Premium Makhana',
    sentDate: '2024-01-01',
    recipients: 1250,
    openRate: 42.5,
    clickRate: 8.3,
    status: 'sent'
  },
  {
    id: 'CAMP-002',
    subject: 'Recipe Special: Chocolate Makhana Delight',
    sentDate: '2024-01-15',
    recipients: 1180,
    openRate: 38.2,
    clickRate: 6.7,
    status: 'sent'
  },
  {
    id: 'CAMP-003',
    subject: 'Weekend Offer: 25% Off All Flavored Makhana',
    sentDate: '2024-01-22',
    recipients: 1320,
    openRate: 45.8,
    clickRate: 12.1,
    status: 'sent'
  },
  {
    id: 'CAMP-004',
    subject: 'Health Benefits of Fox Nuts - Complete Guide',
    sentDate: null,
    recipients: 0,
    openRate: 0,
    clickRate: 0,
    status: 'draft'
  }
];

export default function AdminNewsletter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState('subscribers'); // subscribers, campaigns, create
  const [selectedSubscriber, setSelectedSubscriber] = useState<any>(null);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showAddSubscriber, setShowAddSubscriber] = useState(false);
  
  const [newSubscriber, setNewSubscriber] = useState({
    email: '',
    name: '',
    interests: [] as string[]
  });

  const [newCampaign, setNewCampaign] = useState({
    subject: '',
    content: '',
    targetAudience: 'all',
    scheduledDate: ''
  });

  const filteredSubscribers = mockSubscribers.filter(subscriber => {
    const matchesSearch = 
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || subscriber.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || subscriber.source === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const subscriberStats = {
    total: mockSubscribers.length,
    active: mockSubscribers.filter(s => s.status === 'active').length,
    pending: mockSubscribers.filter(s => s.status === 'pending').length,
    unsubscribed: mockSubscribers.filter(s => s.status === 'unsubscribed').length,
    bounced: mockSubscribers.filter(s => s.status === 'bounced').length,
    avgOpenRate: 41.2,
    avgClickRate: 8.7
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'unsubscribed':
        return 'bg-gray-100 text-gray-800';
      case 'bounced':
        return 'bg-red-100 text-red-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleExportSubscribers = () => {
    const csvContent = [
      ['Email', 'Name', 'Subscribe Date', 'Status', 'Source', 'Interests', 'Total Emails', 'Last Opened', 'Click Through'],
      ...filteredSubscribers.map(sub => [
        sub.email,
        sub.name,
        formatDate(sub.subscribeDate),
        sub.status,
        sub.source,
        sub.interests.join('; '),
        sub.totalEmailsReceived,
        formatDate(sub.lastEmailOpened),
        sub.clickThrough
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `namamy-newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const interestOptions = [
    'healthy-snacks',
    'recipes', 
    'health-tips',
    'offers',
    'new-products',
    'nutrition'
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Newsletter Management</h1>
            <p className="text-gray-600">Manage email subscribers and campaigns</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button variant="outline" onClick={handleExportSubscribers}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => setShowCreateCampaign(true)}>
              <Send className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-makhana-600" />
              </div>
              <p className="text-2xl font-bold">{subscriberStats.total}</p>
              <p className="text-sm text-gray-600">Total Subscribers</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">{subscriberStats.active}</p>
              <p className="text-sm text-gray-600">Active</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-yellow-600">{subscriberStats.pending}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <X className="w-6 h-6 text-gray-600" />
              </div>
              <p className="text-2xl font-bold text-gray-600">{subscriberStats.unsubscribed}</p>
              <p className="text-sm text-gray-600">Unsubscribed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-600">{subscriberStats.bounced}</p>
              <p className="text-sm text-gray-600">Bounced</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">{subscriberStats.avgOpenRate}%</p>
              <p className="text-sm text-gray-600">Avg Open Rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-600">{subscriberStats.avgClickRate}%</p>
              <p className="text-sm text-gray-600">Avg Click Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setSelectedTab('subscribers')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'subscribers'
                  ? 'border-makhana-500 text-makhana-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Subscribers ({subscriberStats.total})
            </button>
            <button
              onClick={() => setSelectedTab('campaigns')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'campaigns'
                  ? 'border-makhana-500 text-makhana-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Send className="w-4 h-4 inline mr-2" />
              Campaigns ({mockCampaigns.length})
            </button>
            <button
              onClick={() => setSelectedTab('analytics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'analytics'
                  ? 'border-makhana-500 text-makhana-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Analytics
            </button>
          </nav>
        </div>

        {/* Subscribers Tab */}
        {selectedTab === 'subscribers' && (
          <>
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search subscribers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="unsubscribed">Unsubscribed</option>
                    <option value="bounced">Bounced</option>
                  </select>
                  <select
                    value={sourceFilter}
                    onChange={(e) => setSourceFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                  >
                    <option value="all">All Sources</option>
                    <option value="website">Website</option>
                    <option value="social-media">Social Media</option>
                    <option value="newsletter-signup">Newsletter Signup</option>
                    <option value="checkout">Checkout</option>
                  </select>
                  <Button onClick={() => setShowAddSubscriber(true)}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Subscriber
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Subscribers Table */}
            <Card>
              <CardHeader>
                <CardTitle>Newsletter Subscribers ({filteredSubscribers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Subscriber</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Subscribe Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Source</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Engagement</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSubscribers.map((subscriber) => (
                        <tr key={subscriber.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-makhana-100 rounded-full flex items-center justify-center">
                                <Mail className="w-5 h-5 text-makhana-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{subscriber.name}</p>
                                <p className="text-sm text-gray-600">{subscriber.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-sm text-gray-900">{formatDate(subscriber.subscribeDate)}</p>
                          </td>
                          <td className="py-4 px-4">
                            <Badge className={getStatusColor(subscriber.status)}>
                              {subscriber.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-sm text-gray-600 capitalize">{subscriber.source.replace('-', ' ')}</p>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm">
                              <p className="text-gray-900">{subscriber.totalEmailsReceived} emails received</p>
                              <p className="text-gray-600">{subscriber.clickThrough} clicks</p>
                              <p className="text-gray-500">Last opened: {formatDate(subscriber.lastEmailOpened)}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedSubscriber(subscriber)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Campaigns Tab */}
        {selectedTab === 'campaigns' && (
          <Card>
            <CardHeader>
              <CardTitle>Email Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCampaigns.map((campaign) => (
                  <div key={campaign.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-gray-900">{campaign.subject}</h3>
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                        </div>
                        {campaign.status === 'sent' && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Sent:</span> {formatDate(campaign.sentDate)}
                            </div>
                            <div>
                              <span className="font-medium">Recipients:</span> {campaign.recipients}
                            </div>
                            <div>
                              <span className="font-medium">Open Rate:</span> {campaign.openRate}%
                            </div>
                            <div>
                              <span className="font-medium">Click Rate:</span> {campaign.clickRate}%
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                        {campaign.status === 'draft' && (
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analytics Tab */}
        {selectedTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="w-16 h-16 mx-auto text-makhana-600 mb-4" />
                  <p className="text-gray-600">Growth analytics would be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Email Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Target className="w-16 h-16 mx-auto text-makhana-600 mb-4" />
                  <p className="text-gray-600">Performance metrics would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Subscriber Details Modal */}
        {selectedSubscriber && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Subscriber Details - {selectedSubscriber.name}
                  <Button variant="ghost" size="sm" onClick={() => setSelectedSubscriber(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Contact Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedSubscriber.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        Subscribed {formatDate(selectedSubscriber.subscribeDate)}
                      </div>
                      <div className="flex items-center text-sm">
                        <Target className="w-4 h-4 mr-2 text-gray-400" />
                        Source: {selectedSubscriber.source.replace('-', ' ')}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Engagement Statistics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Emails:</span>
                        <span className="font-medium">{selectedSubscriber.totalEmailsReceived}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Click Through:</span>
                        <span className="font-medium">{selectedSubscriber.clickThrough}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Last Opened:</span>
                        <span className="font-medium">{formatDate(selectedSubscriber.lastEmailOpened)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Status:</span>
                        <Badge className={getStatusColor(selectedSubscriber.status)}>
                          {selectedSubscriber.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubscriber.interests.map((interest: string) => (
                      <Badge key={interest} variant="outline" className="bg-makhana-50 text-makhana-700">
                        {interest.replace('-', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      window.open(`mailto:${selectedSubscriber.email}?subject=Hello from Namamy!&body=Dear ${selectedSubscriber.name},%0A%0AThank you for subscribing to our newsletter!`);
                    }}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      alert(`Updating subscriber status for ${selectedSubscriber.name}. This is a demo.`);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Update Status
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add Subscriber Modal */}
        {showAddSubscriber && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Add New Subscriber</h2>
                  <button
                    onClick={() => setShowAddSubscriber(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={newSubscriber.email}
                      onChange={(e) => setNewSubscriber({...newSubscriber, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      placeholder="subscriber@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={newSubscriber.name}
                      onChange={(e) => setNewSubscriber({...newSubscriber, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      placeholder="Enter subscriber name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interests
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {interestOptions.map((interest) => (
                        <label key={interest} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={newSubscriber.interests.includes(interest)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewSubscriber({
                                  ...newSubscriber,
                                  interests: [...newSubscriber.interests, interest]
                                });
                              } else {
                                setNewSubscriber({
                                  ...newSubscriber,
                                  interests: newSubscriber.interests.filter(i => i !== interest)
                                });
                              }
                            }}
                            className="mr-2"
                          />
                          <span className="text-sm capitalize">{interest.replace('-', ' ')}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </form>

                <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddSubscriber(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      console.log('New subscriber:', newSubscriber);
                      alert('Subscriber added successfully! (This is a demo - data is not actually saved)');
                      setShowAddSubscriber(false);
                      setNewSubscriber({email: '', name: '', interests: []});
                    }}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Add Subscriber
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Campaign Modal */}
        {showCreateCampaign && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Create Email Campaign</h2>
                  <button
                    onClick={() => setShowCreateCampaign(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Campaign Subject *
                    </label>
                    <input
                      type="text"
                      value={newCampaign.subject}
                      onChange={(e) => setNewCampaign({...newCampaign, subject: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      placeholder="Enter email subject"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Audience
                    </label>
                    <select
                      value={newCampaign.targetAudience}
                      onChange={(e) => setNewCampaign({...newCampaign, targetAudience: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                    >
                      <option value="all">All Active Subscribers</option>
                      <option value="new">New Subscribers</option>
                      <option value="engaged">Highly Engaged</option>
                      <option value="offers">Interested in Offers</option>
                      <option value="recipes">Interested in Recipes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Schedule Date (Optional)
                    </label>
                    <input
                      type="datetime-local"
                      value={newCampaign.scheduledDate}
                      onChange={(e) => setNewCampaign({...newCampaign, scheduledDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Content *
                    </label>
                    <textarea
                      rows={8}
                      value={newCampaign.content}
                      onChange={(e) => setNewCampaign({...newCampaign, content: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      placeholder="Enter your email content here..."
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      You can use basic HTML for formatting
                    </p>
                  </div>
                </form>

                <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateCampaign(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      console.log('Saving draft:', newCampaign);
                      alert('Campaign saved as draft! (This is a demo)');
                    }}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button
                    onClick={() => {
                      console.log('Sending campaign:', newCampaign);
                      alert('Campaign scheduled for sending! (This is a demo)');
                      setShowCreateCampaign(false);
                      setNewCampaign({subject: '', content: '', targetAudience: 'all', scheduledDate: ''});
                    }}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Campaign
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}