'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Eye, 
  MoreHorizontal,
  BookOpen,
  Calendar,
  User,
  X,
  Save,
  Image as ImageIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AdminLayout } from '@/components/admin/AdminLayout';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  publishDate: string;
  updatedAt: string;
  tags: string[];
  imageUrl?: string;
  readTime: number;
  views: number;
}

// Mock blog posts data
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Complete Guide to Makhana: Benefits and Recipes',
    slug: 'complete-guide-makhana-benefits-recipes',
    excerpt: 'Discover everything you need to know about makhana, from health benefits to delicious recipes.',
    content: 'Full content here...',
    author: 'Nutritionist Team',
    status: 'published',
    publishDate: '2024-01-15',
    updatedAt: '2024-01-16',
    tags: ['health', 'nutrition', 'recipes'],
    imageUrl: '/images/products/makhana-2.jpg',
    readTime: 8,
    views: 1240
  },
  {
    id: '2',
    title: '5 Creative Ways to Include Makhana in Your Diet',
    slug: '5-creative-ways-makhana-diet',
    excerpt: 'Explore innovative ways to incorporate fox nuts into your daily meals and snacks.',
    content: 'Full content here...',
    author: 'Chef Priya',
    status: 'published',
    publishDate: '2024-01-10',
    updatedAt: '2024-01-10',
    tags: ['recipes', 'diet', 'healthy-eating'],
    imageUrl: '/images/products/makhana-3.jpg',
    readTime: 5,
    views: 892
  },
  {
    id: '3',
    title: 'Makhana vs Other Healthy Snacks: A Nutritional Comparison',
    slug: 'makhana-vs-healthy-snacks-comparison',
    excerpt: 'How does makhana stack up against other popular healthy snacking options?',
    content: 'Full content here...',
    author: 'Dr. Sharma',
    status: 'draft',
    publishDate: '2024-01-20',
    updatedAt: '2024-01-18',
    tags: ['nutrition', 'comparison', 'health'],
    readTime: 6,
    views: 0
  }
];

export default function AdminBlog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [newPost, setNewPost] = useState<{
    title: string;
    excerpt: string;
    content: string;
    author: string;
    status: 'draft' | 'published' | 'archived';
    tags: string;
    imageUrl: string;
  }>({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    status: 'draft',
    tags: '',
    imageUrl: ''
  });

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || post.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewPost = (post: BlogPost) => {
    alert(`Viewing blog post: ${post.title}\nStatus: ${post.status}\nViews: ${post.views}`);
  };

  const handleEditPost = (post: BlogPost) => {
    alert(`Edit functionality for "${post.title}" would open here. In a real application, this would open an edit form with the post content.`);
  };

  const handleDeletePost = (post: BlogPost) => {
    setSelectedPost(post);
    setShowDeleteModal(true);
  };

  const handlePublishPost = (post: BlogPost) => {
    setBlogPosts(posts => 
      posts.map(p => 
        p.id === post.id 
          ? { ...p, status: 'published' as const, publishDate: new Date().toISOString().split('T')[0] }
          : p
      )
    );
    alert(`"${post.title}" has been published!`);
  };

  const confirmDelete = () => {
    if (selectedPost) {
      setBlogPosts(posts => posts.filter(p => p.id !== selectedPost.id));
      alert(`Blog post "${selectedPost.title}" has been deleted.`);
      setShowDeleteModal(false);
      setSelectedPost(null);
    }
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    const post: BlogPost = {
      id: Date.now().toString(),
      title: newPost.title,
      slug: newPost.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      excerpt: newPost.excerpt,
      content: newPost.content,
      author: newPost.author,
      status: newPost.status,
      publishDate: newPost.status === 'published' ? new Date().toISOString().split('T')[0] : '',
      updatedAt: new Date().toISOString().split('T')[0],
      tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      imageUrl: newPost.imageUrl,
      readTime: Math.ceil(newPost.content.split(' ').length / 200),
      views: 0
    };

    setBlogPosts(posts => [post, ...posts]);
    setNewPost({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      status: 'draft',
      tags: '',
      imageUrl: ''
    });
    setShowAddModal(false);
    alert('Blog post added successfully!');
  };

  const postStats = {
    total: blogPosts.length,
    published: blogPosts.filter(p => p.status === 'published').length,
    draft: blogPosts.filter(p => p.status === 'draft').length,
    archived: blogPosts.filter(p => p.status === 'archived').length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
            <p className="text-gray-600">Create and manage blog posts</p>
          </div>
          <Button 
            className="mt-4 sm:mt-0"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Post
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Posts</p>
                  <p className="text-2xl font-bold">{postStats.total}</p>
                </div>
                <BookOpen className="w-8 h-8 text-makhana-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-green-600">{postStats.published}</p>
                </div>
                <Eye className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Drafts</p>
                  <p className="text-2xl font-bold text-yellow-600">{postStats.draft}</p>
                </div>
                <Edit2 className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {blogPosts.reduce((sum, post) => sum + post.views, 0)}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
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
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Blog Posts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Blog Posts ({filteredPosts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Post</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Author</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Views</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-16 h-12 bg-makhana-100 rounded-lg flex items-center justify-center overflow-hidden">
                            {post.imageUrl ? (
                              <img 
                                src={post.imageUrl} 
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <BookOpen className="w-6 h-6 text-makhana-600" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 line-clamp-1">{post.title}</p>
                            <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                            <div className="flex items-center mt-1">
                              <span className="text-xs text-gray-500">{post.readTime} min read</span>
                              {post.tags.length > 0 && (
                                <div className="ml-2 flex space-x-1">
                                  {post.tags.slice(0, 2).map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {post.tags.length > 2 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{post.tags.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{post.author}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(post.status)}>
                          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">
                          {post.status === 'published' ? post.publishDate : post.updatedAt}
                        </div>
                        <div className="text-xs text-gray-500">
                          {post.status === 'published' ? 'Published' : 'Updated'}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm font-medium">{post.views.toLocaleString()}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewPost(post)}
                            title="View Post"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditPost(post)}
                            title="Edit Post"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          {post.status === 'draft' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handlePublishPost(post)}
                              title="Publish Post"
                              className="text-green-600 hover:text-green-700"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeletePost(post)}
                            title="Delete Post"
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
          </CardContent>
        </Card>

        {/* Add Post Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Add New Blog Post</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleAddPost} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Post Title *
                      </label>
                      <input
                        type="text"
                        value={newPost.title}
                        onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                        placeholder="Enter post title"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Author *
                      </label>
                      <input
                        type="text"
                        value={newPost.author}
                        onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                        placeholder="Enter author name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Excerpt *
                    </label>
                    <textarea
                      rows={3}
                      value={newPost.excerpt}
                      onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      placeholder="Brief description of the post"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content *
                    </label>
                    <textarea
                      rows={8}
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      placeholder="Write your blog post content here..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={newPost.status}
                        onChange={(e) => setNewPost({...newPost, status: e.target.value as 'draft' | 'published'})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={newPost.tags}
                        onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                        placeholder="health, nutrition, recipes"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Featured Image URL
                    </label>
                    <input
                      type="url"
                      value={newPost.imageUrl}
                      onChange={(e) => setNewPost({...newPost, imageUrl: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Save className="w-4 h-4 mr-2" />
                      Add Post
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Delete Blog Post</h2>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="mb-6">
                  <p className="text-gray-600">
                    Are you sure you want to delete "{selectedPost.title}"? This action cannot be undone.
                  </p>
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                        <BookOpen className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-red-900">{selectedPost.title}</p>
                        <p className="text-sm text-red-700">Views: {selectedPost.views}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={confirmDelete}
                  >
                    Delete Post
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