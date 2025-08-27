'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Eye, 
  Copy,
  Mail,
  Send,
  FileText,
  User,
  ShoppingCart,
  Heart,
  Calendar,
  CheckCircle,
  AlertCircle,
  Settings,
  Code,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AdminLayout } from '@/components/admin/AdminLayout';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  description: string;
  category: 'order' | 'marketing' | 'notification' | 'welcome' | 'system';
  status: 'active' | 'draft' | 'archived';
  htmlContent: string;
  textContent: string;
  variables: string[];
  lastUsed?: string;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

const mockTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Order Confirmation',
    subject: 'Your Namamy Order #{orderNumber} is Confirmed!',
    description: 'Sent when customer places an order',
    category: 'order',
    status: 'active',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #059669;">Thank you for your order!</h1>
        <p>Hi {customerName},</p>
        <p>Your order #{orderNumber} has been confirmed and is being processed.</p>
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
          <h3>Order Details:</h3>
          <p>Order Total: ₹{orderTotal}</p>
          <p>Delivery Address: {deliveryAddress}</p>
        </div>
        <p>We'll send you another email when your order ships.</p>
        <p>Thanks for choosing Namamy!</p>
      </div>
    `,
    textContent: 'Hi {customerName}, Your order #{orderNumber} has been confirmed...',
    variables: ['customerName', 'orderNumber', 'orderTotal', 'deliveryAddress'],
    lastUsed: '2024-01-30T10:30:00Z',
    usageCount: 245,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'Welcome Email',
    subject: 'Welcome to Namamy - Your Healthy Snacking Journey Begins!',
    description: 'Welcome email for new customers',
    category: 'welcome',
    status: 'active',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #059669;">Welcome to Namamy!</h1>
        <p>Hi {customerName},</p>
        <p>Welcome to the Namamy family! We're excited to have you on board.</p>
        <p>Get ready to enjoy premium quality makhana (fox nuts) that are:</p>
        <ul>
          <li>100% Natural & Organic</li>
          <li>High in Protein & Low in Calories</li>
          <li>Perfect for Healthy Snacking</li>
        </ul>
        <p>Use code <strong>WELCOME10</strong> for 10% off your first order!</p>
        <a href="{shopUrl}" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Start Shopping</a>
      </div>
    `,
    textContent: 'Welcome to Namamy! Use code WELCOME10 for 10% off...',
    variables: ['customerName', 'shopUrl'],
    lastUsed: '2024-01-29T15:20:00Z',
    usageCount: 89,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  {
    id: '3',
    name: 'Order Shipped',
    subject: 'Your Namamy Order is On Its Way! 📦',
    description: 'Sent when order is shipped',
    category: 'order',
    status: 'active',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #059669;">Your order is on its way!</h1>
        <p>Hi {customerName},</p>
        <p>Great news! Your order #{orderNumber} has been shipped and is on its way to you.</p>
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
          <h3>Tracking Information:</h3>
          <p>Tracking Number: {trackingNumber}</p>
          <p>Estimated Delivery: {estimatedDelivery}</p>
          <p>Courier: {courierName}</p>
        </div>
        <a href="{trackingUrl}" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Track Your Order</a>
      </div>
    `,
    textContent: 'Your order #{orderNumber} has been shipped. Track with {trackingNumber}...',
    variables: ['customerName', 'orderNumber', 'trackingNumber', 'estimatedDelivery', 'courierName', 'trackingUrl'],
    lastUsed: '2024-01-30T08:45:00Z',
    usageCount: 198,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  },
  {
    id: '4',
    name: 'Password Reset',
    subject: 'Reset Your Namamy Password',
    description: 'Password reset email',
    category: 'system',
    status: 'active',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #059669;">Reset Your Password</h1>
        <p>Hi {customerName},</p>
        <p>We received a request to reset your password for your Namamy account.</p>
        <p>Click the button below to reset your password:</p>
        <a href="{resetUrl}" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Reset Password</a>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
    textContent: 'Reset your password: {resetUrl}',
    variables: ['customerName', 'resetUrl'],
    lastUsed: '2024-01-28T12:15:00Z',
    usageCount: 23,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  },
  {
    id: '5',
    name: 'Newsletter - Weekly Specials',
    subject: 'This Week\'s Special Offers Just for You! 🎉',
    description: 'Weekly newsletter with special offers',
    category: 'marketing',
    status: 'draft',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #059669;">This Week's Special Offers!</h1>
        <p>Hi {customerName},</p>
        <p>Don't miss out on these amazing deals this week:</p>
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>🔥 Hot Deals:</h3>
          <ul>
            <li>Premium Raw Makhana - 20% OFF</li>
            <li>Roasted Varieties - Buy 2 Get 1 Free</li>
            <li>Free Shipping on orders above ₹500</li>
          </ul>
        </div>
        <a href="{shopUrl}" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Shop Now</a>
      </div>
    `,
    textContent: 'Weekly specials: Premium Raw Makhana 20% OFF...',
    variables: ['customerName', 'shopUrl'],
    usageCount: 0,
    createdAt: '2024-01-25T00:00:00Z',
    updatedAt: '2024-01-25T00:00:00Z'
  }
];

export default function AdminEmailTemplates() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(mockTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showPreview, setShowPreview] = useState<EmailTemplate | null>(null);
  const [showEditor, setShowEditor] = useState<EmailTemplate | null>(null);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || template.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || template.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'archived':
        return <Badge variant="outline">Archived</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'order':
        return <ShoppingCart className="w-4 h-4" />;
      case 'marketing':
        return <Heart className="w-4 h-4" />;
      case 'notification':
        return <AlertCircle className="w-4 h-4" />;
      case 'welcome':
        return <User className="w-4 h-4" />;
      case 'system':
        return <Settings className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const duplicateTemplate = (template: EmailTemplate) => {
    const newTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      status: 'draft' as const,
      usageCount: 0,
      lastUsed: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTemplates([...templates, newTemplate]);
  };

  const deleteTemplate = (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      setTemplates(templates.filter(t => t.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Email Templates</h1>
            <p className="text-gray-600 mt-1">Manage email templates for automated communications</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Templates</p>
                  <p className="text-2xl font-bold text-gray-900">{templates.length}</p>
                </div>
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-green-600">
                    {templates.filter(t => t.status === 'active').length}
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
                  <p className="text-sm font-medium text-gray-600">Total Sent</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {templates.reduce((sum, t) => sum + t.usageCount, 0)}
                  </p>
                </div>
                <Send className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {new Set(templates.map(t => t.category)).size}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-orange-600" />
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
                    placeholder="Search templates..."
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
                  <option value="order">Order</option>
                  <option value="marketing">Marketing</option>
                  <option value="notification">Notification</option>
                  <option value="welcome">Welcome</option>
                  <option value="system">System</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(template.category)}
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <p className="text-sm text-gray-500">{getCategoryLabel(template.category)}</p>
                    </div>
                  </div>
                  {getStatusBadge(template.status)}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Subject:</p>
                  <p className="text-sm text-gray-600 truncate">{template.subject}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Used {template.usageCount} times</span>
                  {template.lastUsed && (
                    <span>Last: {new Date(template.lastUsed).toLocaleDateString()}</span>
                  )}
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowPreview(template)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowEditor(template)}
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => duplicateTemplate(template)}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => deleteTemplate(template.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No email templates found</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-bold">Preview: {showPreview.name}</h2>
                <Button variant="ghost" onClick={() => setShowPreview(null)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600">Subject:</p>
                  <p className="text-lg">{showPreview.subject}</p>
                </div>
                <div className="border rounded-lg p-4">
                  <div dangerouslySetInnerHTML={{ __html: showPreview.htmlContent }} />
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">Variables used:</p>
                  <div className="flex flex-wrap gap-2">
                    {showPreview.variables.map(variable => (
                      <Badge key={variable} variant="outline" className="text-xs">
                        {'{' + variable + '}'}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}