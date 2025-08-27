'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingCart,
  TrendingUp,
  Users,
  UserPlus,
  Star,
  X,
  Save
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AdminLayout } from '@/components/admin/AdminLayout';

// Mock customers data
const mockCustomers = [
  {
    id: 'CUST-001',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+91 9876543210',
    address: 'House no-123, Delhi, 110001',
    joinDate: '2024-01-15',
    totalOrders: 5,
    totalSpent: 1245,
    status: 'active',
    lastOrder: '2024-01-30'
  },
  {
    id: 'CUST-002',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 9876543211',
    address: 'Flat 456, Mumbai, 400001',
    joinDate: '2024-01-20',
    totalOrders: 3,
    totalSpent: 897,
    status: 'active',
    lastOrder: '2024-01-29'
  },
  {
    id: 'CUST-003',
    name: 'Amit Singh',
    email: 'amit@example.com',
    phone: '+91 9876543212',
    address: 'Plot 789, Bangalore, 560001',
    joinDate: '2024-01-10',
    totalOrders: 8,
    totalSpent: 2340,
    status: 'vip',
    lastOrder: '2024-01-28'
  },
  {
    id: 'CUST-004',
    name: 'Neha Gupta',
    email: 'neha@example.com',
    phone: '+91 9876543213',
    address: 'Sector 12, Noida, 201301',
    joinDate: '2024-01-25',
    totalOrders: 1,
    totalSpent: 249,
    status: 'new',
    lastOrder: '2024-01-25'
  },
  {
    id: 'CUST-005',
    name: 'Suresh Reddy',
    email: 'suresh@example.com',
    phone: '+91 9876543214',
    address: 'Road 45, Hyderabad, 500001',
    joinDate: '2024-01-05',
    totalOrders: 2,
    totalSpent: 498,
    status: 'inactive',
    lastOrder: '2024-01-20'
  }
];

export default function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'new'
  });

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const customerStats = {
    total: mockCustomers.length,
    active: mockCustomers.filter(c => c.status === 'active').length,
    new: mockCustomers.filter(c => c.status === 'new').length,
    vip: mockCustomers.filter(c => c.status === 'vip').length,
    inactive: mockCustomers.filter(c => c.status === 'inactive').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'vip':
        return 'bg-purple-100 text-purple-800';
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleExportCustomers = () => {
    // Create CSV content
    const csvContent = [
      ['Customer ID', 'Name', 'Email', 'Phone', 'Address', 'Join Date', 'Total Orders', 'Total Spent', 'Status', 'Last Order'],
      ...filteredCustomers.map(customer => [
        customer.id,
        customer.name,
        customer.email,
        customer.phone,
        customer.address,
        formatDate(customer.joinDate),
        customer.totalOrders,
        `₹${customer.totalSpent}`,
        customer.status,
        formatDate(customer.lastOrder)
      ])
    ].map(row => row.join(',')).join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `namamy-customers-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleSendEmail = () => {
    const customer = selectedCustomer;
    const subject = `Hello ${customer.name}!`;
    const body = `Dear ${customer.name},\n\nThank you for being a valued customer of Namamy!\n\nWe appreciate your business and hope you're enjoying our premium makhana products.\n\nBest regards,\nNamamy Team`;
    
    // Open email client
    window.open(`mailto:${customer.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleViewOrders = () => {
    // In a real application, this would navigate to orders page with customer filter
    alert(`This would navigate to the orders page filtered for ${selectedCustomer?.name}. In a real application, this would show all orders for this customer.`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
            <p className="text-gray-600">Manage your customer relationships</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button variant="outline" onClick={handleExportCustomers}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => setShowAddModal(true)}>
              <UserPlus className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-makhana-600" />
              </div>
              <p className="text-2xl font-bold">{customerStats.total}</p>
              <p className="text-sm text-gray-600">Total Customers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">{customerStats.active}</p>
              <p className="text-sm text-gray-600">Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-600">{customerStats.vip}</p>
              <p className="text-sm text-gray-600">VIP</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <UserPlus className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">{customerStats.new}</p>
              <p className="text-sm text-gray-600">New</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-gray-600" />
              </div>
              <p className="text-2xl font-bold text-gray-600">{customerStats.inactive}</p>
              <p className="text-sm text-gray-600">Inactive</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search customers..."
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
                <option value="vip">VIP</option>
                <option value="new">New</option>
                <option value="inactive">Inactive</option>
              </select>
              <Button variant="outline" onClick={() => setShowFiltersModal(true)}>
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Orders</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Total Spent</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Last Order</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-makhana-100 rounded-full flex items-center justify-center">
                            <span className="font-medium text-makhana-700">
                              {customer.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{customer.name}</p>
                            <p className="text-sm text-gray-600">{customer.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="w-4 h-4 mr-2" />
                            {customer.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-4 h-4 mr-2" />
                            {customer.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-gray-900">{customer.totalOrders}</p>
                          <p className="text-xs text-gray-600">orders</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium text-gray-900">₹{customer.totalSpent}</p>
                        <p className="text-sm text-gray-600">lifetime value</p>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(customer.status)}>
                          {customer.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-gray-900">{formatDate(customer.lastOrder)}</p>
                        <p className="text-xs text-gray-600">last order</p>
                      </td>
                      <td className="py-4 px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedCustomer(customer)}
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

        {/* Customer Details Modal */}
        {selectedCustomer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Customer Details - {selectedCustomer.name}
                  <Button variant="ghost" size="sm" onClick={() => setSelectedCustomer(null)}>
                    ×
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
                        {selectedCustomer.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedCustomer.phone}
                      </div>
                      <div className="flex items-start text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                        {selectedCustomer.address}
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        Joined {formatDate(selectedCustomer.joinDate)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Order Statistics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Orders:</span>
                        <span className="font-medium">{selectedCustomer.totalOrders}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Spent:</span>
                        <span className="font-medium">₹{selectedCustomer.totalSpent}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Average Order:</span>
                        <span className="font-medium">₹{Math.round(selectedCustomer.totalSpent / selectedCustomer.totalOrders)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Last Order:</span>
                        <span className="font-medium">{formatDate(selectedCustomer.lastOrder)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Status:</span>
                        <Badge className={getStatusColor(selectedCustomer.status)}>
                          {selectedCustomer.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" onClick={handleSendEmail}>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={handleViewOrders}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    View Orders
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add Customer Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Add New Customer</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      placeholder="Enter customer name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={newCustomer.email}
                      onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      placeholder="customer@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      placeholder="+91 XXXXXXXXXX"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      rows={3}
                      value={newCustomer.address}
                      onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      placeholder="Enter customer address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={newCustomer.status}
                      onChange={(e) => setNewCustomer({...newCustomer, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                    >
                      <option value="new">New</option>
                      <option value="active">Active</option>
                      <option value="vip">VIP</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </form>

                <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      console.log('New customer:', newCustomer);
                      alert('Customer added successfully! (This is a demo - customer data is not actually saved)');
                      setShowAddModal(false);
                      setNewCustomer({
                        name: '',
                        email: '',
                        phone: '',
                        address: '',
                        status: 'new'
                      });
                    }}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Add Customer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* More Filters Modal */}
        {showFiltersModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Advanced Filters</h2>
                  <button
                    onClick={() => setShowFiltersModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Join Date Range
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500"
                      />
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Spent Range (₹)
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Count Range
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="Min orders"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500"
                      />
                      <input
                        type="number"
                        placeholder="Max orders"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Filter by city or state"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setShowFiltersModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      alert('Advanced filters would be applied here. This is a demo.');
                      setShowFiltersModal(false);
                    }}
                  >
                    Apply Filters
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