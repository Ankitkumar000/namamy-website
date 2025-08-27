'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  X,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AdminLayout } from '@/components/admin/AdminLayout';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-001',
    customer: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+91 9876543210',
    total: 249,
    status: 'delivered',
    paymentStatus: 'paid',
    items: [{ name: 'Premium Raw Makhana', quantity: 1, price: 249 }],
    date: '2024-01-30T10:30:00Z',
    address: 'House no-123, Delhi, 110001'
  },
  {
    id: 'ORD-002',
    customer: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 9876543211',
    total: 498,
    status: 'processing',
    paymentStatus: 'paid',
    items: [{ name: 'Premium Raw Makhana', quantity: 2, price: 249 }],
    date: '2024-01-30T14:20:00Z',
    address: 'Flat 456, Mumbai, 400001'
  },
  {
    id: 'ORD-003',
    customer: 'Amit Singh',
    email: 'amit@example.com',
    phone: '+91 9876543212',
    total: 249,
    status: 'shipped',
    paymentStatus: 'paid',
    items: [{ name: 'Premium Raw Makhana', quantity: 1, price: 249 }],
    date: '2024-01-29T16:15:00Z',
    address: 'Plot 789, Bangalore, 560001'
  },
  {
    id: 'ORD-004',
    customer: 'Neha Gupta',
    email: 'neha@example.com',
    phone: '+91 9876543213',
    total: 747,
    status: 'pending',
    paymentStatus: 'pending',
    items: [{ name: 'Premium Raw Makhana', quantity: 3, price: 249 }],
    date: '2024-01-29T18:45:00Z',
    address: 'Sector 12, Noida, 201301'
  },
  {
    id: 'ORD-005',
    customer: 'Suresh Reddy',
    email: 'suresh@example.com',
    phone: '+91 9876543214',
    total: 249,
    status: 'cancelled',
    paymentStatus: 'refunded',
    items: [{ name: 'Premium Raw Makhana', quantity: 1, price: 249 }],
    date: '2024-01-28T12:00:00Z',
    address: 'Road 45, Hyderabad, 500001'
  }
];

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const orderStats = {
    total: mockOrders.length,
    pending: mockOrders.filter(o => o.status === 'pending').length,
    processing: mockOrders.filter(o => o.status === 'processing').length,
    shipped: mockOrders.filter(o => o.status === 'shipped').length,
    delivered: mockOrders.filter(o => o.status === 'delivered').length,
    cancelled: mockOrders.filter(o => o.status === 'cancelled').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return CheckCircle;
      case 'shipped':
        return Truck;
      case 'processing':
        return RefreshCw;
      case 'pending':
        return Clock;
      case 'cancelled':
        return AlertCircle;
      default:
        return Package;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleExportOrders = () => {
    // Create CSV content
    const csvContent = [
      ['Order ID', 'Customer', 'Email', 'Phone', 'Total', 'Status', 'Payment Status', 'Date', 'Address'],
      ...filteredOrders.map(order => [
        order.id,
        order.customer,
        order.email,
        order.phone,
        `₹${order.total}`,
        order.status,
        order.paymentStatus,
        formatDate(order.date),
        order.address
      ])
    ].map(row => row.join(',')).join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `namamy-orders-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleUpdateStatus = (newStatus: string) => {
    alert(`Order ${selectedOrder?.id} status would be updated to "${newStatus}". This is a demo, so no actual update occurs.`);
    setShowStatusModal(false);
  };

  const handlePrintInvoice = () => {
    // Generate invoice content
    const invoiceContent = `
      NAMAMY - INVOICE
      ================
      
      Order ID: ${selectedOrder?.id}
      Date: ${formatDate(selectedOrder?.date)}
      
      Customer Details:
      ${selectedOrder?.customer}
      ${selectedOrder?.email}
      ${selectedOrder?.phone}
      
      Shipping Address:
      ${selectedOrder?.address}
      
      Items:
      ${selectedOrder?.items.map((item: any) => `${item.quantity}x ${item.name} - ₹${item.price * item.quantity}`).join('\n')}
      
      Total: ₹${selectedOrder?.total}
      Payment Status: ${selectedOrder?.paymentStatus}
      Order Status: ${selectedOrder?.status}
      
      Thank you for your business!
    `;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Invoice - ${selectedOrder?.id}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              pre { white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <pre>${invoiceContent}</pre>
            <script>window.print(); window.close();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-600">Manage customer orders and fulfillment</p>
          </div>
          <Button variant="outline" onClick={handleExportOrders}>
            <Download className="w-4 h-4 mr-2" />
            Export Orders
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{orderStats.total}</p>
              <p className="text-sm text-gray-600">Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-orange-600">{orderStats.pending}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">{orderStats.processing}</p>
              <p className="text-sm text-gray-600">Processing</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{orderStats.shipped}</p>
              <p className="text-sm text-gray-600">Shipped</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{orderStats.delivered}</p>
              <p className="text-sm text-gray-600">Delivered</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{orderStats.cancelled}</p>
              <p className="text-sm text-gray-600">Cancelled</p>
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
                  placeholder="Search orders, customers..."
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
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <Button variant="outline" onClick={() => setShowFiltersModal(true)}>
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Orders ({filteredOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Order ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Products</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Total</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => {
                    const StatusIcon = getStatusIcon(order.status);
                    return (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <p className="font-medium text-blue-600">{order.id}</p>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{order.customer}</p>
                            <p className="text-sm text-gray-600">{order.email}</p>
                            <p className="text-sm text-gray-600">{order.phone}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            {order.items.map((item, index) => (
                              <p key={index} className="text-sm text-gray-900">
                                {item.quantity}x {item.name}
                              </p>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-medium">₹{order.total}</p>
                          <Badge className={order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {order.paymentStatus}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <StatusIcon className="w-4 h-4" />
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm text-gray-900">{formatDate(order.date)}</p>
                        </td>
                        <td className="py-4 px-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Order Details Modal (Simple version) */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Order Details - {selectedOrder.id}
                  <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(null)}>
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Customer Info</h4>
                    <p>{selectedOrder.customer}</p>
                    <p className="text-sm text-gray-600">{selectedOrder.email}</p>
                    <p className="text-sm text-gray-600">{selectedOrder.phone}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Order Info</h4>
                    <p>Total: ₹{selectedOrder.total}</p>
                    <p className="text-sm text-gray-600">Date: {formatDate(selectedOrder.date)}</p>
                    <Badge className={getStatusColor(selectedOrder.status)}>
                      {selectedOrder.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Shipping Address</h4>
                  <p className="text-sm text-gray-600">{selectedOrder.address}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Items</h4>
                  {selectedOrder.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b">
                      <span>{item.name}</span>
                      <span>{item.quantity}x ₹{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" onClick={() => setShowStatusModal(true)}>
                    Update Status
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={handlePrintInvoice}>
                    Print Invoice
                  </Button>
                </div>
              </CardContent>
            </Card>
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
                      Date Range
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
                      Payment Status
                    </label>
                    <div className="space-y-2">
                      {['All', 'Paid', 'Pending', 'Refunded', 'Failed'].map((status) => (
                        <label key={status} className="flex items-center">
                          <input
                            type="checkbox"
                            defaultChecked={status === 'All'}
                            className="w-4 h-4 text-makhana-600 rounded focus:ring-makhana-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{status}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Amount Range (₹)
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

        {/* Update Status Modal */}
        {showStatusModal && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Update Order Status</h2>
                  <button
                    onClick={() => setShowStatusModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 mb-4">
                    Update status for order <strong>{selectedOrder.id}</strong>
                  </p>
                  <p className="text-sm text-gray-500">
                    Current status: <Badge className={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</Badge>
                  </p>
                </div>

                <div className="space-y-3">
                  {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(status)}
                      className={`w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors ${
                        selectedOrder.status === status 
                          ? 'border-makhana-500 bg-makhana-50' 
                          : 'border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {(() => {
                          const StatusIcon = getStatusIcon(status);
                          return <StatusIcon className="w-5 h-5" />;
                        })()}
                        <span className="font-medium capitalize">{status}</span>
                      </div>
                      {selectedOrder.status === status && (
                        <Badge className="bg-makhana-100 text-makhana-800">Current</Badge>
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setShowStatusModal(false)}
                  >
                    Cancel
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