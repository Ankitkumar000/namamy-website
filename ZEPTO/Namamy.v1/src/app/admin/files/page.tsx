'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  FileText, 
  Video, 
  Music, 
  File,
  Trash2, 
  Download, 
  Search, 
  Filter,
  Grid3X3,
  List,
  Eye,
  Copy,
  Share2,
  FolderPlus,
  X,
  Check,
  AlertCircle,
  HardDrive,
  Camera,
  Monitor,
  Smartphone
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AdminLayout } from '@/components/admin/AdminLayout';

interface UploadedFile {
  id: string;
  name: string;
  originalName: string;
  size: number;
  type: string;
  category: 'image' | 'document' | 'video' | 'audio' | 'other';
  url: string;
  thumbnailUrl?: string;
  uploadedAt: string;
  uploadedBy: string;
  folder: string;
  dimensions?: {
    width: number;
    height: number;
  };
  tags: string[];
  description?: string;
}

interface FileStats {
  totalFiles: number;
  totalSize: number;
  images: number;
  documents: number;
  videos: number;
  others: number;
}

const mockFiles: UploadedFile[] = [
  {
    id: '1',
    name: 'premium-makhana-hero.jpg',
    originalName: 'Premium Makhana Hero Image.jpg',
    size: 2548576,
    type: 'image/jpeg',
    category: 'image',
    url: '/images/products/premium-makhana-hero.jpg',
    thumbnailUrl: '/images/products/thumbs/premium-makhana-hero.jpg',
    uploadedAt: '2024-01-30T10:30:00Z',
    uploadedBy: 'Admin User',
    folder: 'products',
    dimensions: { width: 1920, height: 1080 },
    tags: ['product', 'hero', 'makhana'],
    description: 'Hero image for premium makhana product page'
  },
  {
    id: '2',
    name: 'roasted-variety-pack.png',
    originalName: 'Roasted Variety Pack.png',
    size: 1823440,
    type: 'image/png',
    category: 'image',
    url: '/images/products/roasted-variety-pack.png',
    thumbnailUrl: '/images/products/thumbs/roasted-variety-pack.png',
    uploadedAt: '2024-01-29T15:20:00Z',
    uploadedBy: 'Admin User',
    folder: 'products',
    dimensions: { width: 800, height: 600 },
    tags: ['product', 'roasted', 'variety'],
    description: 'Roasted makhana variety pack image'
  },
  {
    id: '3',
    name: 'brand-logo-vector.svg',
    originalName: 'Namamy Brand Logo Vector.svg',
    size: 45120,
    type: 'image/svg+xml',
    category: 'image',
    url: '/images/brand/brand-logo-vector.svg',
    uploadedAt: '2024-01-28T09:15:00Z',
    uploadedBy: 'Design Team',
    folder: 'brand',
    tags: ['logo', 'brand', 'vector'],
    description: 'Official Namamy brand logo in vector format'
  },
  {
    id: '4',
    name: 'product-catalog-2024.pdf',
    originalName: 'Product Catalog 2024.pdf',
    size: 5242880,
    type: 'application/pdf',
    category: 'document',
    url: '/documents/product-catalog-2024.pdf',
    uploadedAt: '2024-01-25T14:30:00Z',
    uploadedBy: 'Marketing Team',
    folder: 'marketing',
    tags: ['catalog', 'products', '2024'],
    description: 'Complete product catalog for 2024'
  },
  {
    id: '5',
    name: 'makhana-process-video.mp4',
    originalName: 'Makhana Processing Video.mp4',
    size: 156742144,
    type: 'video/mp4',
    category: 'video',
    url: '/videos/makhana-process-video.mp4',
    thumbnailUrl: '/videos/thumbs/makhana-process-video.jpg',
    uploadedAt: '2024-01-20T11:45:00Z',
    uploadedBy: 'Content Team',
    folder: 'content',
    tags: ['video', 'process', 'makhana'],
    description: 'Video showing the makhana processing workflow'
  }
];

const mockStats: FileStats = {
  totalFiles: 156,
  totalSize: 2147483648, // 2GB
  images: 89,
  documents: 34,
  videos: 12,
  others: 21
};

export default function AdminFiles() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [stats, setStats] = useState<FileStats>({
    totalFiles: 0,
    totalSize: 0,
    images: 0,
    documents: 0,
    videos: 0,
    others: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterFolder, setFilterFolder] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPreview, setShowPreview] = useState<UploadedFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filterCategory === 'all' || file.category === filterCategory;
    const matchesFolder = filterFolder === 'all' || file.folder === filterFolder;
    
    return matchesSearch && matchesCategory && matchesFolder;
  });

  const folders = Array.from(new Set(files.map(file => file.folder)));
  
  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/files');
      if (response.ok) {
        const data = await response.json();
        setFiles(data.files || []);
        setStats(data.stats || {
          totalFiles: 0,
          totalSize: 0,
          images: 0,
          documents: 0,
          videos: 0,
          others: 0
        });
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: UploadedFile) => {
    switch (file.category) {
      case 'image':
        return <ImageIcon className="w-5 h-5 text-blue-600" />;
      case 'document':
        return <FileText className="w-5 h-5 text-red-600" />;
      case 'video':
        return <Video className="w-5 h-5 text-purple-600" />;
      case 'audio':
        return <Music className="w-5 h-5 text-green-600" />;
      default:
        return <File className="w-5 h-5 text-gray-600" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      image: 'bg-blue-100 text-blue-800',
      document: 'bg-red-100 text-red-800',
      video: 'bg-purple-100 text-purple-800',
      audio: 'bg-green-100 text-green-800',
      other: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <Badge variant="secondary" className={colors[category as keyof typeof colors] || colors.other}>
        {category}
      </Badge>
    );
  };

  const handleFileUpload = async (uploadedFiles: FileList) => {
    if (!uploadedFiles.length) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      Array.from(uploadedFiles).forEach(file => {
        formData.append('files', file);
      });
      formData.append('folder', 'uploads');
      formData.append('tags', 'admin-upload');
      formData.append('description', 'Uploaded from admin panel');

      const response = await fetch('/api/admin/files', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        alert(`${data.files.length} file(s) uploaded successfully!`);
        fetchFiles();
        setShowUploadModal(false);
      } else {
        alert('Failed to upload files');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDeleteFiles = async (fileIds: string[]) => {
    if (!confirm(`Are you sure you want to delete ${fileIds.length} file(s)?`)) return;

    try {
      const response = await fetch('/api/admin/files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          fileIds
        })
      });

      if (response.ok) {
        alert('Files deleted successfully!');
        fetchFiles();
        setSelectedFiles(new Set());
      } else {
        alert('Failed to delete files');
      }
    } catch (error) {
      console.error('Error deleting files:', error);
      alert('Error deleting files');
    }
  };

  const handleBulkMove = async (fileIds: string[], folder: string) => {
    try {
      const response = await fetch('/api/admin/files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'move',
          fileIds,
          data: { folder }
        })
      });

      if (response.ok) {
        alert(`Files moved to ${folder} successfully!`);
        fetchFiles();
        setSelectedFiles(new Set());
      } else {
        alert('Failed to move files');
      }
    } catch (error) {
      console.error('Error moving files:', error);
      alert('Error moving files');
    }
  };

  // Simulate upload progress for UI feedback
  const startUploadProgress = () => {
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    // Complete upload after progress bar finishes
    setTimeout(() => {
      clearInterval(progressInterval);
      setUploadProgress(100);
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 500);
    }, 2000);
  };

  const deleteFile = (id: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      const fileToDelete = files.find(f => f.id === id);
      if (fileToDelete) {
        setFiles(files.filter(f => f.id !== id));
        setStats(prev => ({
          ...prev,
          totalFiles: prev.totalFiles - 1,
          totalSize: prev.totalSize - fileToDelete.size,
          [fileToDelete.category === 'image' ? 'images' : 
           fileToDelete.category === 'document' ? 'documents' :
           fileToDelete.category === 'video' ? 'videos' : 'others']: 
           prev[fileToDelete.category === 'image' ? 'images' : 
                fileToDelete.category === 'document' ? 'documents' :
                fileToDelete.category === 'video' ? 'videos' : 'others'] - 1
        }));
      }
    }
  };

  const copyFileUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    // You could show a toast notification here
  };

  const toggleFileSelection = (id: string) => {
    const newSelection = new Set(selectedFiles);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedFiles(newSelection);
  };

  const deleteSelectedFiles = () => {
    if (selectedFiles.size === 0) return;
    
    if (confirm(`Are you sure you want to delete ${selectedFiles.size} file(s)?`)) {
      const filesToDelete = files.filter(f => selectedFiles.has(f.id));
      const totalSize = filesToDelete.reduce((sum, f) => sum + f.size, 0);
      
      setFiles(files.filter(f => !selectedFiles.has(f.id)));
      setStats(prev => ({
        ...prev,
        totalFiles: prev.totalFiles - selectedFiles.size,
        totalSize: prev.totalSize - totalSize
      }));
      setSelectedFiles(new Set());
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">File Manager</h1>
            <p className="text-gray-600 mt-1">Upload and manage your media files</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="w-4 h-4 mr-2" />
              Quick Upload
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setShowUploadModal(true)}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Files</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalFiles}</p>
                </div>
                <HardDrive className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Images</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.images}</p>
                </div>
                <ImageIcon className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Documents</p>
                  <p className="text-2xl font-bold text-red-600">{stats.documents}</p>
                </div>
                <FileText className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Videos</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.videos}</p>
                </div>
                <Video className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Storage Used</p>
                  <p className="text-2xl font-bold text-green-600">{formatFileSize(stats.totalSize)}</p>
                </div>
                <Monitor className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex gap-4 items-center w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search files..."
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
                  <option value="all">All Types</option>
                  <option value="image">Images</option>
                  <option value="document">Documents</option>
                  <option value="video">Videos</option>
                  <option value="audio">Audio</option>
                  <option value="other">Other</option>
                </select>

                <select
                  value={filterFolder}
                  onChange={(e) => setFilterFolder(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Folders</option>
                  {folders.map(folder => (
                    <option key={folder} value={folder}>{folder}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                {selectedFiles.size > 0 && (
                  <Button 
                    variant="outline" 
                    onClick={deleteSelectedFiles}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete ({selectedFiles.size})
                  </Button>
                )}
                
                <div className="flex border border-gray-300 rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Files Display */}
        <Card>
          <CardHeader>
            <CardTitle>Files ({filteredFiles.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredFiles.length === 0 ? (
              <div className="text-center py-8">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No files found</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredFiles.map((file) => (
                  <div 
                    key={file.id} 
                    className={`border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
                      selectedFiles.has(file.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => toggleFileSelection(file.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getFileIcon(file)}
                        <div className={`w-4 h-4 border-2 rounded ${
                          selectedFiles.has(file.id) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                        }`}>
                          {selectedFiles.has(file.id) && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                      {getCategoryBadge(file.category)}
                    </div>
                    
                    {file.category === 'image' && file.thumbnailUrl ? (
                      <div className="aspect-square bg-gray-200 rounded-lg mb-2 overflow-hidden">
                        <img 
                          src={file.thumbnailUrl} 
                          alt={file.originalName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                        {getFileIcon(file)}
                      </div>
                    )}
                    
                    <div className="space-y-1">
                      <p className="font-medium text-sm truncate" title={file.originalName}>
                        {file.originalName}
                      </p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      <p className="text-xs text-gray-500">{file.folder}</p>
                    </div>
                    
                    <div className="flex justify-between mt-3 pt-2 border-t">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowPreview(file);
                        }}
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyFileUrl(file.url);
                        }}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteFile(file.id);
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredFiles.map((file) => (
                  <div 
                    key={file.id}
                    className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer ${
                      selectedFiles.has(file.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => toggleFileSelection(file.id)}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className={`w-4 h-4 border-2 rounded ${
                        selectedFiles.has(file.id) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                      }`}>
                        {selectedFiles.has(file.id) && <Check className="w-3 h-3 text-white" />}
                      </div>
                      
                      {getFileIcon(file)}
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{file.originalName}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{formatFileSize(file.size)}</span>
                          <span>{file.folder}</span>
                          <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      {getCategoryBadge(file.category)}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowPreview(file);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyFileUrl(file.url);
                        }}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteFile(file.id);
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hidden file input for quick upload */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        />

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-bold">Upload Files</h2>
                <Button variant="ghost" onClick={() => setShowUploadModal(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="p-6">
                {!uploading ? (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
                    onDrop={(e) => {
                      e.preventDefault();
                      handleFileUpload(e.dataTransfer.files);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Drop files here or click to upload</p>
                    <p className="text-gray-500 mb-4">Support for images, documents, videos, and more</p>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      id="file-upload"
                      onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                    />
                    <label htmlFor="file-upload">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Choose Files
                      </Button>
                    </label>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg font-medium mb-2">Uploading files...</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500">{uploadProgress}% complete</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-bold">File Preview</h2>
                <Button variant="ghost" onClick={() => setShowPreview(null)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    {showPreview.category === 'image' ? (
                      <img 
                        src={showPreview.url} 
                        alt={showPreview.originalName}
                        className="w-full rounded-lg"
                      />
                    ) : (
                      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                        {getFileIcon(showPreview)}
                        <div className="ml-2">
                          <p className="font-medium">{showPreview.originalName}</p>
                          <p className="text-sm text-gray-500">{formatFileSize(showPreview.size)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">File Name</label>
                      <p className="text-sm">{showPreview.originalName}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">File Size</label>
                      <p className="text-sm">{formatFileSize(showPreview.size)}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <p className="text-sm">{showPreview.type}</p>
                    </div>
                    
                    {showPreview.dimensions && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
                        <p className="text-sm">{showPreview.dimensions.width} × {showPreview.dimensions.height}</p>
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Folder</label>
                      <p className="text-sm">{showPreview.folder}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Uploaded</label>
                      <p className="text-sm">{new Date(showPreview.uploadedAt).toLocaleString()}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                      <div className="flex items-center space-x-2">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded flex-1 truncate">
                          {showPreview.url}
                        </code>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyFileUrl(showPreview.url)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 pt-4">
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => window.open(showPreview.url, '_blank')}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => copyFileUrl(showPreview.url)}
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
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