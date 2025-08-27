'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Eye, 
  MoreHorizontal,
  Package,
  TrendingUp,
  TrendingDown,
  DollarSign,
  X,
  Upload,
  Save,
  AlertTriangle,
  Loader2,
  RefreshCw,
  Download,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AdminLayout } from '@/components/admin/AdminLayout';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  category: string;
  subcategory?: string;
  weight: string;
  images: string[];
  inStock: boolean;
  stockCount: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProductStats {
  total: number;
  inStock: number;
  lowStock: number;
  outOfStock: number;
  featured: number;
  totalValue: number;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<ProductStats>({
    total: 0,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
    featured: 0,
    totalValue: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: 'roasted',
    subcategory: '',
    price: '',
    comparePrice: '',
    weight: '',
    stockCount: '',
    featured: false,
    inStock: true,
    images: [] as string[]
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  // Handle image upload from device/camera
  const handleImageUpload = async (file: File, isEdit: boolean = false) => {
    try {
      setUploadingImage(true);
      
      // Validate file
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (JPG, PNG, GIF, etc.)');
        setUploadingImage(false);
        return null;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        setUploadingImage(false);
        return null;
      }
      
      let imageUrl = '';
      let uploadSuccess = false;
      
      try {
        // Try to upload to server first
        const formData = new FormData();
        formData.append('file', file);
        
        console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        const data = await response.json();
        console.log('Upload response:', data);
        
        if (response.ok && data.success && data.url) {
          imageUrl = data.url;
          uploadSuccess = true;
          console.log('Server upload successful:', imageUrl);
        } else {
          console.warn('Server upload failed:', data.error || 'Unknown error');
        }
      } catch (uploadError) {
        console.warn('Server upload failed, using base64 fallback:', uploadError);
      }
      
      // Fallback to base64 if server upload fails
      if (!uploadSuccess) {
        console.log('Using base64 fallback...');
        try {
          await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              imageUrl = reader.result as string;
              console.log('Base64 encoding successful');
              resolve(imageUrl);
            };
            reader.onerror = (error) => {
              console.error('FileReader error:', error);
              reject(error);
            };
            reader.readAsDataURL(file);
          });
        } catch (readerError) {
          console.error('Base64 fallback failed:', readerError);
          throw readerError;
        }
      }
      
      // Add image to state
      if (imageUrl) {
        if (isEdit && selectedProduct) {
          const updatedImages = [...(selectedProduct.images || []), imageUrl];
          setSelectedProduct({
            ...selectedProduct,
            images: updatedImages
          });
          console.log('Image added to edit product, total images:', updatedImages.length);
        } else {
          const updatedImages = [...newProduct.images, imageUrl];
          setNewProduct({
            ...newProduct,
            images: updatedImages
          });
          console.log('Image added to new product, total images:', updatedImages.length);
        }
        
        alert(`Image uploaded successfully! ${uploadSuccess ? '(Server)' : '(Local)'}`);
        setUploadingImage(false);
        return imageUrl;
      } else {
        throw new Error('Failed to generate image URL');
      }
      
    } catch (error) {
      setUploadingImage(false);
      console.error('Error uploading image:', error);
      alert(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return null;
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.products);
        calculateStats(data.products);
      } else {
        console.error('Failed to fetch products:', data.error);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (productList: Product[]) => {
    const stats = {
      total: productList.length,
      inStock: productList.filter(p => p.inStock && p.stockCount > 10).length,
      lowStock: productList.filter(p => p.inStock && p.stockCount <= 10 && p.stockCount > 0).length,
      outOfStock: productList.filter(p => !p.inStock || p.stockCount === 0).length,
      featured: productList.filter(p => p.featured).length,
      totalValue: productList.reduce((sum, p) => sum + (p.price * p.stockCount), 0)
    };
    setStats(stats);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory;
    
    let matchesStock = true;
    if (stockFilter === 'in-stock') {
      matchesStock = product.inStock && product.stockCount > 10;
    } else if (stockFilter === 'low-stock') {
      matchesStock = product.inStock && product.stockCount <= 10 && product.stockCount > 0;
    } else if (stockFilter === 'out-of-stock') {
      matchesStock = !product.inStock || product.stockCount === 0;
    }
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  const getStockStatus = (product: Product) => {
    if (!product.inStock || product.stockCount === 0) return 'out-of-stock';
    if (product.stockCount <= 10) return 'low-stock';
    return 'in-stock';
  };

  const getStockBadge = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-800';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockText = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'In Stock';
      case 'low-stock':
        return 'Low Stock';
      case 'out-of-stock':
        return 'Out of Stock';
      default:
        return 'Unknown';
    }
  };

  const handleAddProduct = async () => {
    try {
      setSaving(true);
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price),
          comparePrice: newProduct.comparePrice ? parseFloat(newProduct.comparePrice) : null,
          stockCount: parseInt(newProduct.stockCount),
          slug: `${newProduct.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/--+/g, '-').replace(/^-+|-+$/g, '')}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          images: newProduct.images.length > 0 ? newProduct.images : ['/images/placeholder-product.svg'],
          tags: [newProduct.category],
          ingredients: ['Premium Fox Nuts'],
          nutrition: {}
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setShowAddModal(false);
        setNewProduct({
          name: '',
          description: '',
          category: 'roasted',
          subcategory: '',
          price: '',
          comparePrice: '',
          weight: '',
          stockCount: '',
          featured: false,
          inStock: true,
          images: [] as string[]
        });
        fetchProducts();
      } else {
        alert('Failed to add product: ' + data.error);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateStock = async (productId: string, newStock: number) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stockCount: newStock,
          inStock: newStock > 0
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        fetchProducts();
      } else {
        alert('Failed to update stock: ' + data.error);
      }
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Failed to update stock');
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;
    
    try {
      setSaving(true);
      const response = await fetch(`/api/admin/products/${selectedProduct.id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setShowDeleteModal(false);
        setSelectedProduct(null);
        fetchProducts();
      } else {
        alert('Failed to delete product: ' + data.error);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    } finally {
      setSaving(false);
    }
  };

  const handleEditProduct = async () => {
    if (!selectedProduct) return;
    
    try {
      setSaving(true);
      const response = await fetch(`/api/admin/products/${selectedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: selectedProduct.name,
          description: selectedProduct.description,
          price: parseFloat(selectedProduct.price.toString()),
          comparePrice: selectedProduct.comparePrice ? parseFloat(selectedProduct.comparePrice.toString()) : null,
          stockCount: parseInt(selectedProduct.stockCount.toString()),
          category: selectedProduct.category,
          weight: selectedProduct.weight,
          featured: selectedProduct.featured,
          inStock: selectedProduct.inStock,
          images: selectedProduct.images || []
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setShowEditModal(false);
        setSelectedProduct(null);
        fetchProducts();
      } else {
        alert('Failed to update product: ' + data.error);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-makhana-600" />
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-gray-600">Manage your product inventory and stock levels</p>
          </div>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <Button 
              variant="outline"
              onClick={() => fetchProducts()}
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button 
              variant="outline"
              onClick={() => alert('Export functionality would be implemented here')}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button 
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Package className="w-8 h-8 text-makhana-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">In Stock</p>
                  <p className="text-2xl font-bold text-green-600">{stats.inStock}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Low Stock</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.lowStock}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Out of Stock</p>
                  <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
                </div>
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Featured</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.featured}</p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold text-purple-600">{formatPrice(stats.totalValue)}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-600" />
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
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="roasted">Roasted Makhana</option>
                <option value="flavored">Flavored Makhana</option>
                <option value="premium">Premium Collection</option>
                <option value="raw">Raw Makhana</option>
              </select>
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
              >
                <option value="all">All Stock Levels</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Products ({filteredProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Stock</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Value</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => {
                    const stockStatus = getStockStatus(product);
                    const totalValue = product.price * product.stockCount;
                    return (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-makhana-100 rounded-lg flex items-center justify-center">
                              <Package className="w-6 h-6 text-makhana-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-600">{product.weight}</p>
                              {product.featured && (
                                <Badge className="bg-blue-100 text-blue-800 text-xs">Featured</Badge>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline">{product.category}</Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium">{formatPrice(product.price)}</p>
                            {product.comparePrice && (
                              <p className="text-sm text-gray-500 line-through">{formatPrice(product.comparePrice)}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              value={product.stockCount}
                              onChange={(e) => {
                                const newStock = parseInt(e.target.value) || 0;
                                if (newStock !== product.stockCount) {
                                  handleUpdateStock(product.id, newStock);
                                }
                              }}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-center text-sm focus:outline-none focus:ring-1 focus:ring-makhana-500"
                              min="0"
                            />
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getStockBadge(stockStatus)}>
                            {getStockText(stockStatus)}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-medium">{formatPrice(totalValue)}</p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => alert(`Viewing product: ${product.name}\nStock: ${product.stockCount}\nValue: ${formatPrice(totalValue)}`)}
                              title="View Product"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setSelectedProduct(product);
                                setShowEditModal(true);
                              }}
                              title="Edit Product"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => {
                                setSelectedProduct(product);
                                setShowDeleteModal(true);
                              }}
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Add Product Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form className="space-y-6" onSubmit={(e) => {
                  e.preventDefault();
                  handleAddProduct();
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                        placeholder="Enter product name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                        required
                      >
                        <option value="roasted">Roasted Makhana</option>
                        <option value="flavored">Flavored Makhana</option>
                        <option value="premium">Premium Collection</option>
                        <option value="raw">Raw Makhana</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (₹) *
                      </label>
                      <input
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                        placeholder="0"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight *
                      </label>
                      <input
                        type="text"
                        value={newProduct.weight}
                        onChange={(e) => setNewProduct({...newProduct, weight: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                        placeholder="e.g., 100g, 250g"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock Quantity *
                      </label>
                      <input
                        type="number"
                        value={newProduct.stockCount}
                        onChange={(e) => setNewProduct({...newProduct, stockCount: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                        placeholder="0"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      rows={3}
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      placeholder="Product description"
                      required
                    />
                  </div>

                  {/* Image Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Images
                    </label>
                    
                    {/* Upload Buttons */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      <label className="inline-flex items-center px-4 py-2 bg-makhana-600 text-white rounded-lg hover:bg-makhana-700 cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload from Device
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const result = await handleImageUpload(file, false);
                              // Clear the input so the same file can be selected again
                              e.target.value = '';
                            }
                          }}
                        />
                      </label>
                      
                      <label className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        Take Photo
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const result = await handleImageUpload(file, false);
                              // Clear the input so the same file can be selected again
                              e.target.value = '';
                            }
                          }}
                        />
                      </label>
                      
                      {uploadingImage && (
                        <div className="flex items-center px-4 py-2 bg-blue-100 rounded-lg">
                          <Loader2 className="w-4 h-4 mr-2 animate-spin text-blue-600" />
                          <span className="text-blue-700">Uploading image...</span>
                        </div>
                      )}
                    </div>

                    {/* Image Preview */}
                    <div className="space-y-3">
                      {newProduct.images.map((image, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-3">
                          {/* Image Preview */}
                          {image && (
                            <div className="flex items-center justify-between">
                              <img 
                                src={image} 
                                alt={`Product ${index + 1}`}
                                className="w-20 h-20 object-cover rounded border"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const updatedImages = newProduct.images.filter((_, i) => i !== index);
                                  setNewProduct({...newProduct, images: updatedImages});
                                }}
                                className="text-red-600 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      <p className="text-xs text-gray-500">
                        Upload images from your device or camera.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newProduct.featured}
                        onChange={(e) => setNewProduct({...newProduct, featured: e.target.checked})}
                        className="w-4 h-4 text-makhana-600 rounded focus:ring-makhana-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Featured Product</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newProduct.inStock}
                        onChange={(e) => setNewProduct({...newProduct, inStock: e.target.checked})}
                        className="w-4 h-4 text-makhana-600 rounded focus:ring-makhana-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">In Stock</span>
                    </label>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddModal(false)}
                      disabled={saving}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Add Product
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Delete Product</h2>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="mb-6">
                  <p className="text-gray-600">
                    Are you sure you want to delete "{selectedProduct.name}"? This action cannot be undone.
                  </p>
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                        <Package className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-red-900">{selectedProduct.name}</p>
                        <p className="text-sm text-red-700">Stock: {selectedProduct.stockCount}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteModal(false)}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={handleDeleteProduct}
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      'Delete Product'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Product Modal */}
        {showEditModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form className="space-y-6" onSubmit={(e) => {
                  e.preventDefault();
                  handleEditProduct();
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        value={selectedProduct.name}
                        onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={selectedProduct.category}
                        onChange={(e) => setSelectedProduct({...selectedProduct, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                        required
                      >
                        <option value="roasted">Roasted Makhana</option>
                        <option value="flavored">Flavored Makhana</option>
                        <option value="premium">Premium Collection</option>
                        <option value="raw">Raw Makhana</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (₹) *
                      </label>
                      <input
                        type="number"
                        value={selectedProduct.price}
                        onChange={(e) => setSelectedProduct({...selectedProduct, price: parseFloat(e.target.value) || 0})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight *
                      </label>
                      <input
                        type="text"
                        value={selectedProduct.weight}
                        onChange={(e) => setSelectedProduct({...selectedProduct, weight: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                        placeholder="e.g., 100g, 250g"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock Quantity *
                      </label>
                      <input
                        type="number"
                        value={selectedProduct.stockCount}
                        onChange={(e) => setSelectedProduct({...selectedProduct, stockCount: parseInt(e.target.value) || 0})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      rows={3}
                      value={selectedProduct.description}
                      onChange={(e) => setSelectedProduct({...selectedProduct, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Image Upload Section for Edit */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Images
                    </label>
                    
                    {/* Upload Buttons */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      <label className="inline-flex items-center px-4 py-2 bg-makhana-600 text-white rounded-lg hover:bg-makhana-700 cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload from Device
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const result = await handleImageUpload(file, true);
                              // Clear the input so the same file can be selected again
                              e.target.value = '';
                            }
                          }}
                        />
                      </label>
                      
                      <label className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        Take Photo
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const result = await handleImageUpload(file, true);
                              // Clear the input so the same file can be selected again
                              e.target.value = '';
                            }
                          }}
                        />
                      </label>
                      
                      {uploadingImage && (
                        <div className="flex items-center px-4 py-2 bg-blue-100 rounded-lg">
                          <Loader2 className="w-4 h-4 mr-2 animate-spin text-blue-600" />
                          <span className="text-blue-700">Uploading image...</span>
                        </div>
                      )}
                    </div>

                    {/* Image Preview */}
                    <div className="space-y-3">
                      {(selectedProduct.images || []).map((image: any, index: number) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-3">
                          {/* Image Preview */}
                          {image && (
                            <div className="flex items-center justify-between">
                              <img 
                                src={typeof image === 'string' ? image : image.url || ''} 
                                alt={`Product ${index + 1}`}
                                className="w-20 h-20 object-cover rounded border"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const updatedImages = (selectedProduct.images || []).filter((_: any, i: number) => i !== index);
                                  setSelectedProduct({...selectedProduct, images: updatedImages});
                                }}
                                className="text-red-600 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      <p className="text-xs text-gray-500">
                        Upload images from your device or camera.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedProduct.featured || false}
                        onChange={(e) => setSelectedProduct({...selectedProduct, featured: e.target.checked})}
                        className="w-4 h-4 text-makhana-600 rounded focus:ring-makhana-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Featured Product</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedProduct.inStock || false}
                        onChange={(e) => setSelectedProduct({...selectedProduct, inStock: e.target.checked})}
                        className="w-4 h-4 text-makhana-600 rounded focus:ring-makhana-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">In Stock</span>
                    </label>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowEditModal(false)}
                      disabled={saving}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Update Product
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}