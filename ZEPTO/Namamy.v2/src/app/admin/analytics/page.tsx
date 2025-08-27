'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Package, 
  ShoppingCart, 
  IndianRupee,
  Calendar,
  Download,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AdminLayout } from '@/components/admin/AdminLayout';

// Mock analytics data
const monthlyRevenue = [
  { month: 'Jan', revenue: 45000, orders: 180 },
  { month: 'Feb', revenue: 52000, orders: 210 },
  { month: 'Mar', revenue: 48000, orders: 195 },
  { month: 'Apr', revenue: 61000, orders: 245 },
  { month: 'May', revenue: 55000, orders: 220 },
  { month: 'Jun', revenue: 67000, orders: 270 },
  { month: 'Jul', revenue: 71000, orders: 285 },
  { month: 'Aug', revenue: 69000, orders: 275 },
  { month: 'Sep', revenue: 78000, orders: 315 },
  { month: 'Oct', revenue: 85000, orders: 340 },
  { month: 'Nov', revenue: 92000, orders: 370 },
  { month: 'Dec', revenue: 124850, orders: 486 }
];

const salesByCategory = [
  { name: 'Raw Makhana', value: 85, color: '#22c55e' },
  { name: 'Roasted (Coming Soon)', value: 0, color: '#f59e0b' },
  { name: 'Flavored (Coming Soon)', value: 0, color: '#ef4444' },
  { name: 'Premium (Coming Soon)', value: 15, color: '#8b5cf6' }
];

const topCustomers = [
  { name: 'Rajesh Kumar', orders: 12, spent: 2988 },
  { name: 'Priya Sharma', orders: 8, spent: 1992 },
  { name: 'Amit Singh', orders: 15, spent: 3735 },
  { name: 'Neha Gupta', orders: 6, spent: 1494 },
  { name: 'Suresh Reddy', orders: 9, spent: 2241 }
];

const trafficSources = [
  { source: 'Direct', visitors: 3420, percentage: 35 },
  { source: 'Google Search', visitors: 2890, percentage: 29 },
  { source: 'Social Media', visitors: 1560, percentage: 16 },
  { source: 'Email Marketing', visitors: 980, percentage: 10 },
  { source: 'Referrals', visitors: 890, percentage: 9 },
  { source: 'Others', visitors: 260, percentage: 3 }
];

const keyMetrics = [
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: '+0.5%',
    changeType: 'positive',
    icon: TrendingUp
  },
  {
    title: 'Average Order Value',
    value: '₹386',
    change: '+₹12',
    changeType: 'positive',
    icon: IndianRupee
  },
  {
    title: 'Customer Retention',
    value: '68%',
    change: '+5%',
    changeType: 'positive',
    icon: Users
  },
  {
    title: 'Cart Abandonment',
    value: '23%',
    change: '-3%',
    changeType: 'positive',
    icon: ShoppingCart
  }
];

export default function AdminAnalytics() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('Last 30 Days');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handlePeriodChange = () => {
    const periods = ['Last 7 Days', 'Last 30 Days', 'Last 3 Months', 'Last 6 Months', 'Last Year'];
    const currentIndex = periods.indexOf(selectedPeriod);
    const nextIndex = (currentIndex + 1) % periods.length;
    setSelectedPeriod(periods[nextIndex]);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const handleExportReport = () => {
    // Create CSV content
    const csvContent = [
      ['Metric', 'Value', 'Change'],
      ['Conversion Rate', '3.2%', '+0.5%'],
      ['Average Order Value', '₹386', '+₹12'],
      ['Customer Retention', '68%', '+5%'],
      ['Cart Abandonment', '23%', '-3%'],
      [''],
      ['Monthly Revenue Data'],
      ['Month', 'Revenue', 'Orders'],
      ...monthlyRevenue.map(item => [item.month, `₹${item.revenue}`, item.orders])
    ].map(row => row.join(',')).join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `namamy-analytics-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
            <p className="text-gray-600">Track performance, generate reports and business insights</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button variant="outline" onClick={handlePeriodChange}>
              <Calendar className="w-4 h-4 mr-2" />
              {selectedPeriod}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button onClick={handleExportReport}>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-makhana-100 rounded-lg flex items-center justify-center">
                    <metric.icon className="w-6 h-6 text-makhana-600" />
                  </div>
                  <div className={`text-sm ${
                    metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                  <p className="text-sm text-gray-600">{metric.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue & Orders Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="revenue" fill="#22c55e" name="Revenue (₹)" />
                    <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#15803d" strokeWidth={3} name="Orders" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Sales by Category */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push('/admin/products')}>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={salesByCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {salesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {salesByCategory.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Customers */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Top Customers</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/admin/customers')}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCustomers.map((customer, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => router.push('/admin/customers')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-makhana-100 rounded-full flex items-center justify-center">
                        <span className="font-medium text-makhana-700">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{customer.name}</p>
                        <p className="text-sm text-gray-600">{customer.orders} orders</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{customer.spent}</p>
                      <p className="text-sm text-gray-600">lifetime value</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-makhana-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-makhana-600" />
                    </div>
                    <span className="font-medium text-gray-900">{source.source}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-makhana-500 h-2 rounded-full" 
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                    <div className="text-right min-w-[80px]">
                      <p className="font-semibold text-gray-900">{source.visitors.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{source.percentage}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}