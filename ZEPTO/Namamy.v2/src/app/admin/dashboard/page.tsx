'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Package, 
  ShoppingCart, 
  IndianRupee,
  Eye,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  Loader2,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AdminLayout } from '@/components/admin/AdminLayout';

interface AdminStats {
  stats: {
    revenue: { current: number; change: string; changeType: string };
    orders: { current: number; change: string; changeType: string };
    customers: { current: number; change: string; changeType: string };
    productsSold: { current: number; change: string; changeType: string };
  };
  recentOrders: Array<{
    id: string;
    customer: string;
    amount: number;
    status: string;
    date: string;
    products: string;
  }>;
  topProducts: Array<{
    name: string;
    sales: number;
    revenue: number;
    orders: number;
  }>;
  lowStockProducts: Array<{
    id: string;
    name: string;
    stock: number;
    price: number;
  }>;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'processing':
    case 'confirmed':
      return 'bg-yellow-100 text-yellow-800';
    case 'shipped':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function AdminDashboard() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        const data = await response.json();
        
        if (data.success) {
          setDashboardData(data);
        } else {
          setError(data.error || 'Failed to fetch dashboard data');
        }
      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleRefreshData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      
      if (data.success) {
        setDashboardData(data);
      } else {
        setError(data.error || 'Failed to fetch dashboard data');
      }
    } catch (err) {
      setError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = () => {
    if (!dashboardData) return;
    
    const csvContent = `Dashboard Statistics Export\n\n` +
      `Revenue,${dashboardData.stats.revenue.current}\n` +
      `Orders,${dashboardData.stats.orders.current}\n` +
      `Customers,${dashboardData.stats.customers.current}\n` +
      `Products Sold,${dashboardData.stats.productsSold.current}\n\n` +
      `Low Stock Products:\n` +
      dashboardData.lowStockProducts.map(p => `${p.name},${p.stock}`).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Export completed successfully
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-makhana-600" />
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-red-600" />
            <p className="text-red-600">{error}</p>
            <Button onClick={handleRefreshData} className="mt-4">
              🔄 Refresh Dashboard
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const stats = [
    {
      title: 'Total Revenue',
      value: formatPrice(dashboardData?.stats.revenue.current || 0),
      change: `${dashboardData?.stats.revenue.change}%`,
      changeType: dashboardData?.stats.revenue.changeType || 'positive',
      icon: IndianRupee,
      description: 'vs last month'
    },
    {
      title: 'Total Orders',
      value: dashboardData?.stats.orders.current.toString() || '0',
      change: `${dashboardData?.stats.orders.change}%`,
      changeType: dashboardData?.stats.orders.changeType || 'positive',
      icon: ShoppingCart,
      description: 'vs last month'
    },
    {
      title: 'Total Customers',
      value: dashboardData?.stats.customers.current.toString() || '0',
      change: `${dashboardData?.stats.customers.change}%`,
      changeType: dashboardData?.stats.customers.changeType || 'positive',
      icon: Users,
      description: 'vs last month'
    },
    {
      title: 'Products Sold',
      value: dashboardData?.stats.productsSold.current.toString() || '0',
      change: `${dashboardData?.stats.productsSold.change}%`,
      changeType: dashboardData?.stats.productsSold.changeType || 'positive',
      icon: Package,
      description: 'vs last month'
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-makhana-500 to-makhana-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome back, Admin! 👋</h1>
              <p className="text-makhana-100">
                Here's what's happening with Namamy today.
              </p>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={handleExportData} 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                disabled={loading || !dashboardData}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button 
                onClick={handleRefreshData} 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                )}
                {loading ? 'Refreshing...' : 'Refresh Data'}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-makhana-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-makhana-600" />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.changeType === 'positive' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/admin/orders')}
              >
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData?.recentOrders?.length ? (
                  dashboardData.recentOrders.map((order) => (
                    <div 
                      key={order.id} 
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => router.push('/admin/orders')}
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-gray-900">{order.id}</p>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                        <p className="text-xs text-gray-500">{order.products}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatPrice(order.amount)}</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No recent orders</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Top Products</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/admin/products')}
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData?.topProducts?.length ? (
                  dashboardData.topProducts.map((product, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => router.push('/admin/products')}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-makhana-100 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-makhana-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.sales} sales</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatPrice(product.revenue)}</p>
                        <p className="text-xs text-green-600">{product.orders} orders</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No product sales data</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alert */}
        {dashboardData?.lowStockProducts?.length ? (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-800">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Low Stock Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dashboardData.lowStockProducts.map((product) => (
                  <div 
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-orange-600">Only {product.stock} left</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatPrice(product.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : null}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button 
                className="h-20 flex-col space-y-2"
                onClick={() => router.push('/admin/products')}
              >
                <Package className="w-6 h-6" />
                <span>Add Product</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => router.push('/admin/orders')}
              >
                <ShoppingCart className="w-6 h-6" />
                <span>View Orders</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => router.push('/admin/customers')}
              >
                <Users className="w-6 h-6" />
                <span>Manage Customers</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => router.push('/admin/analytics')}
              >
                <TrendingUp className="w-6 h-6" />
                <span>View Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}