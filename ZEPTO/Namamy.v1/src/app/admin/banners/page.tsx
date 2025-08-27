'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Calendar, Target } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  type: string;
  status: string;
  priority: number;
  startDate?: string;
  endDate?: string;
  targetUrl?: string;
  settings?: any;
  createdAt: string;
  updatedAt: string;
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [previewBanner, setPreviewBanner] = useState<Banner | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    buttonText: 'Can\'t Wait!',
    type: 'POPUP',
    status: 'ACTIVE',
    priority: 1,
    startDate: '',
    endDate: '',
    targetUrl: '',
    settings: {
      autoClose: false,
      autoCloseDelay: 5000,
      showCloseButton: true
    }
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/banners');
      const result = await response.json();
      
      if (result.success) {
        setBanners(result.data.banners);
      }
    } catch (error) {
      console.error('Failed to fetch banners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingBanner 
        ? `/api/admin/banners/${editingBanner.id}`
        : '/api/admin/banners';
      
      const method = editingBanner ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        await fetchBanners();
        closeModal();
        alert(result.message);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Failed to save banner:', error);
      alert('Failed to save banner');
    }
  };

  const toggleStatus = async (bannerId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    
    try {
      const response = await fetch(`/api/admin/banners/${bannerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      const result = await response.json();
      
      if (result.success) {
        await fetchBanners();
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Failed to toggle status:', error);
      alert('Failed to toggle status');
    }
  };

  const deleteBanner = async (bannerId: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;
    
    try {
      const response = await fetch(`/api/admin/banners/${bannerId}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (result.success) {
        await fetchBanners();
        alert('Banner deleted successfully');
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Failed to delete banner:', error);
      alert('Failed to delete banner');
    }
  };

  const openCreateModal = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      buttonText: 'Can\'t Wait!',
      type: 'POPUP',
      status: 'ACTIVE',
      priority: 1,
      startDate: '',
      endDate: '',
      targetUrl: '',
      settings: {
        autoClose: false,
        autoCloseDelay: 5000,
        showCloseButton: true
      }
    });
    setEditingBanner(null);
    setShowCreateModal(true);
  };

  const openEditModal = (banner: Banner) => {
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle || '',
      description: banner.description || '',
      buttonText: banner.buttonText || 'Can\'t Wait!',
      type: banner.type,
      status: banner.status,
      priority: banner.priority,
      startDate: banner.startDate ? banner.startDate.split('T')[0] : '',
      endDate: banner.endDate ? banner.endDate.split('T')[0] : '',
      targetUrl: banner.targetUrl || '',
      settings: banner.settings || {
        autoClose: false,
        autoCloseDelay: 5000,
        showCloseButton: true
      }
    });
    setEditingBanner(banner);
    setShowCreateModal(true);
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setEditingBanner(null);
    setPreviewBanner(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'INACTIVE': return 'bg-gray-100 text-gray-800';
      case 'SCHEDULED': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'POPUP': return 'bg-purple-100 text-purple-800';
      case 'TOP_BAR': return 'bg-blue-100 text-blue-800';
      case 'HERO': return 'bg-orange-100 text-orange-800';
      case 'MODAL': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Banner Management</h1>
          <p className="text-gray-600 mt-2">Create and manage website banners, popups, and announcements</p>
        </div>
        <Button onClick={openCreateModal} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Banner
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-makhana-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading banners...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Banner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {banners.map((banner) => (
                  <tr key={banner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {banner.title}
                        </div>
                        {banner.subtitle && (
                          <div className="text-sm text-gray-500">
                            {banner.subtitle}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={getTypeColor(banner.type)}>
                        {banner.type}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={getStatusColor(banner.status)}>
                        {banner.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {banner.priority}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {banner.startDate && (
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="w-3 h-3" />
                          Start: {new Date(banner.startDate).toLocaleDateString()}
                        </div>
                      )}
                      {banner.endDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          End: {new Date(banner.endDate).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setPreviewBanner(banner)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost" 
                          size="sm"
                          onClick={() => openEditModal(banner)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleStatus(banner.id, banner.status)}
                        >
                          {banner.status === 'ACTIVE' ? 
                            <EyeOff className="w-4 h-4" /> : 
                            <Eye className="w-4 h-4" />
                          }
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteBanner(banner.id)}
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
          
          {banners.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No banners found</div>
              <p className="text-gray-500 mb-6">Create your first banner to get started</p>
              <Button onClick={openCreateModal} className="flex items-center gap-2 mx-auto">
                <Plus className="w-4 h-4" />
                Create First Banner
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={closeModal}></div>
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingBanner ? 'Edit Banner' : 'Create New Banner'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      placeholder="Premium Makhana Coming Soon!"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      placeholder="Something Amazing is Roasting..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                    placeholder="We're perfecting our premium fox nuts collection to bring you the finest quality makhana..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={formData.buttonText}
                      onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      placeholder="Can't Wait!"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                    >
                      <option value="POPUP">Popup</option>
                      <option value="TOP_BAR">Top Bar</option>
                      <option value="HERO">Hero Banner</option>
                      <option value="MODAL">Modal</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                      <option value="SCHEDULED">Scheduled</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target URL
                    </label>
                    <input
                      type="url"
                      value={formData.targetUrl}
                      onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t">
                  <Button type="button" variant="ghost" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-to-r from-makhana-600 to-organic-600">
                    {editingBanner ? 'Update Banner' : 'Create Banner'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={closeModal}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="p-8 text-center">
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">
                <span className="bg-gradient-to-r from-makhana-700 via-organic-600 to-makhana-800 bg-clip-text text-transparent">
                  {previewBanner.title}
                </span>
              </h2>
              
              {previewBanner.subtitle && (
                <p className="text-lg text-gray-600 mb-8 font-medium">
                  {previewBanner.subtitle}
                </p>
              )}
              
              {previewBanner.description && (
                <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
                  {previewBanner.description}
                </p>
              )}
              
              <Button
                onClick={closeModal}
                className="bg-gradient-to-r from-makhana-600 to-organic-600 text-white px-8 py-3 rounded-xl"
              >
                {previewBanner.buttonText || 'Close Preview'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}