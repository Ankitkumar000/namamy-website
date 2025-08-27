'use client';

import { useState } from 'react';
import { 
  Megaphone, 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Eye, 
  Play,
  Pause,
  TrendingUp,
  Users,
  Mail,
  MessageSquare,
  Target,
  Calendar,
  BarChart3,
  DollarSign,
  Globe,
  Smartphone,
  Tag,
  Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AdminLayout } from '@/components/admin/AdminLayout';

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'social' | 'sms' | 'display' | 'search';
  status: 'active' | 'paused' | 'completed' | 'draft';
  startDate: string;
  endDate?: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  roas: number;
  audience: string;
  createdAt: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Healthy Snacks Email Campaign',
    type: 'email',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    budget: 5000,
    spent: 2800,
    impressions: 45000,
    clicks: 1250,
    conversions: 89,
    ctr: 2.78,
    cpc: 2.24,
    roas: 4.2,
    audience: 'Health Conscious Customers',
    createdAt: '2023-12-28T10:00:00Z'
  },
  {
    id: '2',
    name: 'New Year Special Offers',
    type: 'social',
    status: 'completed',
    startDate: '2023-12-25',
    endDate: '2024-01-07',
    budget: 8000,
    spent: 7850,
    impressions: 120000,
    clicks: 3200,
    conversions: 156,
    ctr: 2.67,
    cpc: 2.45,
    roas: 3.8,
    audience: 'All Customers',
    createdAt: '2023-12-20T14:30:00Z'
  },
  {
    id: '3',
    name: 'Premium Makhana Launch',
    type: 'display',
    status: 'active',
    startDate: '2024-01-10',
    endDate: '2024-02-10',
    budget: 12000,
    spent: 4200,
    impressions: 89000,
    clicks: 1890,
    conversions: 67,
    ctr: 2.12,
    cpc: 2.22,
    roas: 3.5,
    audience: 'Premium Segment',
    createdAt: '2024-01-05T09:15:00Z'
  },
  {
    id: '4',
    name: 'Valentine\'s Day SMS Campaign',
    type: 'sms',
    status: 'draft',
    startDate: '2024-02-10',
    endDate: '2024-02-14',
    budget: 3000,
    spent: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    ctr: 0,
    cpc: 0,
    roas: 0,
    audience: 'Couples Segment',
    createdAt: '2024-01-15T16:45:00Z'
  },
  {
    id: '5',
    name: 'Google Ads - Makhana Keywords',
    type: 'search',
    status: 'active',
    startDate: '2024-01-01',
    budget: 15000,
    spent: 8900,
    impressions: 156000,
    clicks: 4200,
    conversions: 189,
    ctr: 2.69,
    cpc: 2.12,
    roas: 4.6,
    audience: 'Search Users',
    createdAt: '2023-12-30T11:20:00Z'
  }
];

export default function AdminMarketing() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.audience.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || campaign.type === filterType;
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case 'paused':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">Paused</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Completed</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'social':
        return <MessageSquare className="w-4 h-4" />;
      case 'sms':
        return <Smartphone className="w-4 h-4" />;
      case 'display':
        return <Globe className="w-4 h-4" />;
      case 'search':
        return <Target className="w-4 h-4" />;
      default:
        return <Megaphone className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'email':
        return 'Email Marketing';
      case 'social':
        return 'Social Media';
      case 'sms':
        return 'SMS Marketing';
      case 'display':
        return 'Display Ads';
      case 'search':
        return 'Search Ads';
      default:
        return type;
    }
  };

  const toggleCampaign = (id: string) => {
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id === id) {
        return {
          ...campaign,
          status: campaign.status === 'active' ? 'paused' : 'active'
        };
      }
      return campaign;
    }));
  };

  const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
  const totalSpent = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
  const totalConversions = campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0);
  const avgROAS = campaigns.length > 0 ? campaigns.reduce((sum, campaign) => sum + campaign.roas, 0) / campaigns.length : 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Marketing</h1>
            <p className="text-gray-600 mt-1">Manage your marketing campaigns and promotions</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Budget</p>
                  <p className="text-2xl font-bold text-gray-900">₹{totalBudget.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-blue-600">₹{totalSpent.toLocaleString()}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversions</p>
                  <p className="text-2xl font-bold text-purple-600">{totalConversions}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg ROAS</p>
                  <p className="text-2xl font-bold text-orange-600">{avgROAS.toFixed(1)}x</p>
                </div>
                <Target className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Marketing Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Tag className="w-5 h-5 mr-2 text-blue-600" />
                Coupons & Discounts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Create and manage discount coupons for your campaigns</p>
              <Button variant="outline" size="sm" className="w-full">
                Manage Coupons
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-green-600" />
                Email Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Design beautiful email templates for your campaigns</p>
              <Button variant="outline" size="sm" className="w-full">
                View Templates
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-600" />
                Audience Segments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Create targeted audience segments for better campaigns</p>
              <Button variant="outline" size="sm" className="w-full">
                Manage Segments
              </Button>
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
                    placeholder="Search campaigns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="email">Email</option>
                  <option value="social">Social</option>
                  <option value="sms">SMS</option>
                  <option value="display">Display</option>
                  <option value="search">Search</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="completed">Completed</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaigns Table */}
        <Card>
          <CardHeader>
            <CardTitle>Campaigns ({filteredCampaigns.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredCampaigns.length === 0 ? (
              <div className="text-center py-8">
                <Megaphone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No campaigns found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Campaign</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Budget</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Performance</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">ROAS</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCampaigns.map((campaign) => (
                      <tr key={campaign.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{campaign.name}</div>
                            <div className="text-sm text-gray-500">{campaign.audience}</div>
                            <div className="text-xs text-gray-400 mt-1">
                              {campaign.startDate} - {campaign.endDate || 'Ongoing'}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(campaign.type)}
                            <span className="text-sm">{getTypeLabel(campaign.type)}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(campaign.status)}
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium">₹{campaign.budget.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">
                              Spent: ₹{campaign.spent.toLocaleString()}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            <div>Clicks: {campaign.clicks.toLocaleString()}</div>
                            <div>Conversions: {campaign.conversions}</div>
                            <div>CTR: {campaign.ctr}%</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-1">
                            <span className="font-medium text-lg">{campaign.roas.toFixed(1)}x</span>
                            {campaign.roas >= 3 ? (
                              <TrendingUp className="w-4 h-4 text-green-500" />
                            ) : (
                              <TrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleCampaign(campaign.id)}
                            >
                              {campaign.status === 'active' ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}