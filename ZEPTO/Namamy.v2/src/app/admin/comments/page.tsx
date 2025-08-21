'use client';

import { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Check, 
  X, 
  Trash2, 
  User,
  Clock,
  Star,
  AlertTriangle,
  Eye,
  Reply
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AdminLayout } from '@/components/admin/AdminLayout';

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  postTitle: string;
  postId: string;
  status: 'approved' | 'pending' | 'spam' | 'trash';
  rating?: number;
  createdAt: string;
  avatar?: string;
  website?: string;
}

const mockComments: Comment[] = [
  {
    id: '1',
    author: 'Priya Sharma',
    email: 'priya@example.com',
    content: 'This makhana recipe is absolutely delicious! My family loved it. Thank you for sharing such healthy and tasty recipes.',
    postTitle: '10 Delicious Makhana Recipes for Every Occasion',
    postId: '2',
    status: 'approved',
    rating: 5,
    createdAt: '2024-01-15T14:30:00Z'
  },
  {
    id: '2',
    author: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    content: 'Great information about makhana benefits. I had no idea it was so nutritious. Will definitely include it in my diet.',
    postTitle: 'Health Benefits of Makhana: A Complete Guide',
    postId: '1',
    status: 'pending',
    createdAt: '2024-01-16T10:15:00Z'
  },
  {
    id: '3',
    author: 'Anonymous',
    email: 'spam@fake.com',
    content: 'Check out my website for amazing deals! Click here now!!!',
    postTitle: 'Health Benefits of Makhana: A Complete Guide',
    postId: '1',
    status: 'spam',
    createdAt: '2024-01-16T08:45:00Z'
  },
  {
    id: '4',
    author: 'Sneha Patel',
    email: 'sneha@example.com',
    content: 'Could you please share more information about where to source quality makhana? Some brands are not good.',
    postTitle: 'The Journey of Makhana: From Farm to Your Table',
    postId: '3',
    status: 'approved',
    createdAt: '2024-01-14T16:20:00Z'
  },
  {
    id: '5',
    author: 'Amit Singh',
    email: 'amit@example.com',
    content: 'This article was very helpful. I learned a lot about makhana cultivation. Keep up the good work!',
    postTitle: 'The Journey of Makhana: From Farm to Your Table',
    postId: '3',
    status: 'approved',
    rating: 4,
    createdAt: '2024-01-13T12:10:00Z'
  }
];

export default function AdminComments() {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending' | 'spam' | 'trash'>('all');

  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.postTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && comment.status === filterStatus;
  });

  const handleApproveComment = (id: string) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, status: 'approved' as const } : comment
    ));
  };

  const handleRejectComment = (id: string) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, status: 'spam' as const } : comment
    ));
  };

  const handleDeleteComment = (id: string) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-100 text-green-800">Approved</Badge>;
      case 'pending':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'spam':
        return <Badge variant="destructive">Spam</Badge>;
      case 'trash':
        return <Badge variant="outline" className="text-gray-600">Trash</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Comments</h1>
            <p className="text-gray-600 mt-1">Manage and moderate user comments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              View Site
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Comments</p>
                  <p className="text-2xl font-bold text-gray-900">{comments.length}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {comments.filter(c => c.status === 'approved').length}
                  </p>
                </div>
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {comments.filter(c => c.status === 'pending').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Spam</p>
                  <p className="text-2xl font-bold text-red-600">
                    {comments.filter(c => c.status === 'spam').length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
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
                    placeholder="Search comments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="spam">Spam</option>
                  <option value="trash">Trash</option>
                </select>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments List */}
        <div className="space-y-4">
          {filteredComments.length === 0 ? (
            <Card>
              <CardContent className="p-8">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No comments found</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredComments.map((comment) => (
              <Card key={comment.id} className={`${
                comment.status === 'pending' ? 'border-yellow-200 bg-yellow-50' : 
                comment.status === 'spam' ? 'border-red-200 bg-red-50' : ''
              }`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900">{comment.author}</h3>
                          {getStatusBadge(comment.status)}
                        </div>
                        <p className="text-sm text-gray-600">{comment.email}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                          <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>on "{comment.postTitle}"</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {comment.rating && renderStars(comment.rating)}
                      <div className="flex space-x-1">
                        {comment.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleApproveComment(comment.id)}
                              className="text-green-600 hover:text-green-800"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRejectComment(comment.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Reply className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-13">
                    <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}