'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  User,
  Calendar,
  Clock,
  Search,
  Filter,
  Eye,
  Reply,
  Archive,
  Star,
  Trash2,
  Download,
  Send,
  CheckCircle,
  AlertCircle,
  X,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AdminLayout } from '@/components/admin/AdminLayout';

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'replied' | 'resolved' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  source: 'contact-form' | 'email' | 'phone' | 'whatsapp';
  date: string;
  lastReply?: string;
  assignedTo?: string;
  category: 'general' | 'product' | 'order' | 'complaint' | 'suggestion';
}

// Mock contact inquiries data
const mockInquiries: ContactInquiry[] = [
  {
    id: 'INQ-001',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+91 9876543210',
    subject: 'Product Quality Question',
    message: 'I want to know about the freshness guarantee of your makhana products. How long do they stay fresh after opening?',
    status: 'new',
    priority: 'medium',
    source: 'contact-form',
    date: '2024-01-30',
    category: 'product'
  },
  {
    id: 'INQ-002',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    subject: 'Order Delivery Issue',
    message: 'My order ORD-12345 was supposed to be delivered yesterday but I haven\'t received it yet. Can you please check the status?',
    status: 'replied',
    priority: 'high',
    source: 'email',
    date: '2024-01-29',
    lastReply: '2024-01-29',
    assignedTo: 'Support Team',
    category: 'order'
  },
  {
    id: 'INQ-003',
    name: 'Amit Singh',
    email: 'amit@example.com',
    phone: '+91 9876543212',
    subject: 'Bulk Order Inquiry',
    message: 'I am interested in placing a bulk order for my restaurant. Can you provide wholesale pricing for 50kg of mixed makhana?',
    status: 'new',
    priority: 'high',
    source: 'whatsapp',
    date: '2024-01-30',
    category: 'general'
  },
  {
    id: 'INQ-004',
    name: 'Neha Gupta',
    email: 'neha@example.com',
    subject: 'Nutritional Information',
    message: 'Can you provide detailed nutritional information for your chocolate makhana? My dietitian needs this for my meal plan.',
    status: 'resolved',
    priority: 'low',
    source: 'contact-form',
    date: '2024-01-28',
    lastReply: '2024-01-28',
    assignedTo: 'Nutrition Team',
    category: 'product'
  },
  {
    id: 'INQ-005',
    name: 'Suresh Reddy',
    email: 'suresh@example.com',
    subject: 'Website Feedback',
    message: 'The checkout process on your website is a bit confusing. It would be great if you could simplify the payment options.',
    status: 'new',
    priority: 'medium',
    source: 'contact-form',
    date: '2024-01-30',
    category: 'suggestion'
  },
  {
    id: 'INQ-006',
    name: 'Kavya Nair',
    email: 'kavya@example.com',
    phone: '+91 9876543215',
    subject: 'Damaged Product Complaint',
    message: 'I received a damaged package yesterday. The makhana was crushed and the packaging was torn. Please help with replacement.',
    status: 'new',
    priority: 'urgent',
    source: 'phone',
    date: '2024-01-30',
    category: 'complaint'
  }
];

export default function AdminContact() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch contact messages from API
  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/contact');
      const data = await response.json();
      
      if (response.ok && data.contacts) {
        // Transform API data to match component interface
        const transformedInquiries = data.contacts.map((contact: any) => ({
          id: contact.id,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          subject: contact.subject,
          message: contact.message,
          status: contact.status.toLowerCase() as 'new' | 'replied' | 'resolved' | 'archived',
          priority: contact.priority.toLowerCase() as 'low' | 'medium' | 'high' | 'urgent',
          source: 'contact-form' as const,
          date: new Date(contact.createdAt).toISOString().split('T')[0],
          category: contact.category.toLowerCase() as 'general' | 'product' | 'order' | 'complaint' | 'suggestion',
          lastReply: contact.updatedAt !== contact.createdAt ? new Date(contact.updatedAt).toISOString().split('T')[0] : undefined,
          assignedTo: undefined
        }));
        setInquiries(transformedInquiries);
      } else {
        console.error('Failed to fetch inquiries:', data.error);
        // Fallback to mock data if API fails
        setInquiries(mockInquiries);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      // Fallback to mock data if API fails
      setInquiries(mockInquiries);
    } finally {
      setLoading(false);
    }
  };

  // Load inquiries on component mount
  useEffect(() => {
    fetchInquiries();
  }, []);

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = 
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || inquiry.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || inquiry.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const inquiryStats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === 'new').length,
    replied: inquiries.filter(i => i.status === 'replied').length,
    resolved: inquiries.filter(i => i.status === 'resolved').length,
    urgent: inquiries.filter(i => i.priority === 'urgent').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'replied':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'contact-form':
        return <MessageSquare className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'phone':
        return <Phone className="w-4 h-4" />;
      case 'whatsapp':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleExportInquiries = () => {
    const csvContent = [
      ['ID', 'Name', 'Email', 'Phone', 'Subject', 'Status', 'Priority', 'Category', 'Date', 'Source'],
      ...filteredInquiries.map(inquiry => [
        inquiry.id,
        inquiry.name,
        inquiry.email,
        inquiry.phone || '',
        inquiry.subject,
        inquiry.status,
        inquiry.priority,
        inquiry.category,
        formatDate(inquiry.date),
        inquiry.source
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `namamy-contact-inquiries-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleStatusUpdate = (inquiryId: string, newStatus: string) => {
    alert(`Updating inquiry ${inquiryId} status to ${newStatus}. This is a demo.`);
  };

  const handleReply = (inquiry: ContactInquiry) => {
    setSelectedInquiry(inquiry);
    setShowReplyModal(true);
  };

  const handleSendReply = () => {
    alert(`Reply sent to ${selectedInquiry?.email}. This is a demo.`);
    setShowReplyModal(false);
    setSelectedInquiry(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contact Management</h1>
            <p className="text-gray-600">Manage customer inquiries and contact requests</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button variant="outline" onClick={fetchInquiries} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" onClick={handleExportInquiries}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => window.open('/contact', '_blank')}>
              <ExternalLink className="w-4 h-4 mr-2" />
              View Contact Page
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <MessageSquare className="w-6 h-6 text-makhana-600" />
              </div>
              <p className="text-2xl font-bold">{inquiryStats.total}</p>
              <p className="text-sm text-gray-600">Total Inquiries</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">{inquiryStats.new}</p>
              <p className="text-sm text-gray-600">New</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Reply className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-yellow-600">{inquiryStats.replied}</p>
              <p className="text-sm text-gray-600">Replied</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">{inquiryStats.resolved}</p>
              <p className="text-sm text-gray-600">Resolved</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-600">{inquiryStats.urgent}</p>
              <p className="text-sm text-gray-600">Urgent</p>
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
                  placeholder="Search inquiries..."
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
                <option value="new">New</option>
                <option value="replied">Replied</option>
                <option value="resolved">Resolved</option>
                <option value="archived">Archived</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
              >
                <option value="all">All Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="general">General</option>
                <option value="product">Product</option>
                <option value="order">Order</option>
                <option value="complaint">Complaint</option>
                <option value="suggestion">Suggestion</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Inquiries Table */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Inquiries ({filteredInquiries.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Subject</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Priority</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Source</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-makhana-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-makhana-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{inquiry.name}</p>
                            <p className="text-sm text-gray-600">{inquiry.email}</p>
                            {inquiry.phone && (
                              <p className="text-xs text-gray-500">{inquiry.phone}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{inquiry.subject}</p>
                          <p className="text-sm text-gray-600 truncate max-w-xs">
                            {inquiry.message}
                          </p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {inquiry.category}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(inquiry.status)}>
                          {inquiry.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getPriorityColor(inquiry.priority)}>
                          {inquiry.priority}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {getSourceIcon(inquiry.source)}
                          <span className="text-sm text-gray-600 capitalize">
                            {inquiry.source.replace('-', ' ')}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-gray-900">{formatDate(inquiry.date)}</p>
                        {inquiry.lastReply && (
                          <p className="text-xs text-gray-500">
                            Replied: {formatDate(inquiry.lastReply)}
                          </p>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedInquiry(inquiry)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleReply(inquiry)}
                          >
                            <Reply className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Inquiry Details Modal */}
        {selectedInquiry && !showReplyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Inquiry Details - {selectedInquiry.id}
                  <Button variant="ghost" size="sm" onClick={() => setSelectedInquiry(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Customer Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedInquiry.name}
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedInquiry.email}
                      </div>
                      {selectedInquiry.phone && (
                        <div className="flex items-center text-sm">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          {selectedInquiry.phone}
                        </div>
                      )}
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {formatDate(selectedInquiry.date)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Inquiry Details</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Status:</span>
                        <Badge className={getStatusColor(selectedInquiry.status)}>
                          {selectedInquiry.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Priority:</span>
                        <Badge className={getPriorityColor(selectedInquiry.priority)}>
                          {selectedInquiry.priority}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Category:</span>
                        <span className="font-medium">{selectedInquiry.category}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Source:</span>
                        <div className="flex items-center space-x-1">
                          {getSourceIcon(selectedInquiry.source)}
                          <span className="font-medium capitalize">
                            {selectedInquiry.source.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Subject</h4>
                  <p className="text-gray-900">{selectedInquiry.subject}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Message</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">{selectedInquiry.message}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button 
                    className="flex-1"
                    onClick={() => handleReply(selectedInquiry)}
                  >
                    <Reply className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleStatusUpdate(selectedInquiry.id, 'resolved')}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark Resolved
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Reply Modal */}
        {showReplyModal && selectedInquiry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Reply to {selectedInquiry.name}
                  <Button variant="ghost" size="sm" onClick={() => setShowReplyModal(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To: {selectedInquiry.email}
                  </label>
                  <input
                    type="text"
                    value={`Re: ${selectedInquiry.subject}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500"
                    placeholder="Type your reply here..."
                  />
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowReplyModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSendReply}>
                    <Send className="w-4 h-4 mr-2" />
                    Send Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}