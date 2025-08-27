'use client';

import { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Package, 
  TrendingDown, 
  TrendingUp, 
  RefreshCw,
  Bell,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Filter,
  Search,
  Settings,
  Download,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AdminLayout } from '@/components/admin/AdminLayout';

interface InventoryAlert {
  id: string;
  productId: string;
  productName: string;
  category: string;
  currentStock: number;
  minimumStock: number;
  maxStock: number;
  alertType: 'low_stock' | 'out_of_stock' | 'overstock' | 'reorder_point';
  severity: 'critical' | 'warning' | 'info';
  lastUpdated: string;
  price: number;
  value: number;
  supplier?: string;
  leadTime?: number; // days
  avgSalesPerDay?: number;
  daysUntilStockOut?: number;
}

interface InventoryStats {
  totalProducts: number;
  lowStockAlerts: number;
  outOfStockAlerts: number;
  overstockAlerts: number;
  totalInventoryValue: number;
  criticalAlerts: number;
}

const mockAlerts: InventoryAlert[] = [
  {
    id: '1',
    productId: 'prod-001',
    productName: 'Premium Raw Makhana (250g)',
    category: 'Raw',
    currentStock: 5,
    minimumStock: 20,
    maxStock: 100,
    alertType: 'low_stock',
    severity: 'critical',
    lastUpdated: '2024-01-30T10:30:00Z',
    price: 249,
    value: 1245,
    supplier: 'Bihar Farms Co.',
    leadTime: 7,
    avgSalesPerDay: 3,
    daysUntilStockOut: 2
  },
  {
    id: '2',
    productId: 'prod-002',
    productName: 'Roasted Makhana Classic (200g)',
    category: 'Roasted',
    currentStock: 0,
    minimumStock: 15,
    maxStock: 80,
    alertType: 'out_of_stock',
    severity: 'critical',
    lastUpdated: '2024-01-30T08:15:00Z',
    price: 199,
    value: 0,
    supplier: 'Healthy Snacks Ltd.',
    leadTime: 5,
    avgSalesPerDay: 2,
    daysUntilStockOut: 0
  },
  {
    id: '3',
    productId: 'prod-003',
    productName: 'Flavored Makhana Mix (300g)',
    category: 'Flavored',
    currentStock: 12,
    minimumStock: 25,
    maxStock: 75,
    alertType: 'low_stock',
    severity: 'warning',
    lastUpdated: '2024-01-30T06:45:00Z',
    price: 299,
    value: 3588,
    supplier: 'Spice Masters',
    leadTime: 10,
    avgSalesPerDay: 1.5,
    daysUntilStockOut: 8
  },
  {
    id: '4',
    productId: 'prod-004',
    productName: 'Organic Makhana Premium (500g)',
    category: 'Organic',
    currentStock: 85,
    minimumStock: 30,
    maxStock: 60,
    alertType: 'overstock',
    severity: 'info',
    lastUpdated: '2024-01-29T16:20:00Z',
    price: 399,
    value: 33915,
    supplier: 'Organic Foods Direct',
    leadTime: 14,
    avgSalesPerDay: 0.8,
    daysUntilStockOut: 106
  },
  {
    id: '5',
    productId: 'prod-005',
    productName: 'Honey Roasted Makhana (150g)',
    category: 'Flavored',
    currentStock: 18,
    minimumStock: 20,
    maxStock: 100,
    alertType: 'reorder_point',
    severity: 'warning',
    lastUpdated: '2024-01-30T12:00:00Z',
    price: 179,
    value: 3222,
    supplier: 'Sweet Treats Co.',
    leadTime: 6,
    avgSalesPerDay: 2.2,
    daysUntilStockOut: 8
  }
];

const mockStats: InventoryStats = {
  totalProducts: 25,
  lowStockAlerts: 3,
  outOfStockAlerts: 1,
  overstockAlerts: 1,
  totalInventoryValue: 125000,
  criticalAlerts: 2
};

export default function AdminInventory() {
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
  const [stats, setStats] = useState<InventoryStats>({
    totalProducts: 0,
    lowStockAlerts: 0,
    outOfStockAlerts: 0,
    overstockAlerts: 0,
    totalInventoryValue: 0,
    criticalAlerts: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'severity' | 'stock' | 'value' | 'days'>('severity');

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    const matchesType = filterType === 'all' || alert.alertType === filterType;
    
    return matchesSearch && matchesSeverity && matchesType;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'severity':
        const severityOrder = { critical: 3, warning: 2, info: 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      case 'stock':
        return a.currentStock - b.currentStock;
      case 'value':
        return b.value - a.value;
      case 'days':
        return (a.daysUntilStockOut || 999) - (b.daysUntilStockOut || 999);
      default:
        return 0;
    }
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'warning':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'info':
        return <Badge variant="outline" className="text-blue-600">Info</Badge>;
      default:
        return <Badge variant="secondary">{severity}</Badge>;
    }
  };

  const getAlertIcon = (alertType: string, severity: string) => {
    const iconClass = severity === 'critical' ? 'text-red-600' : 
                     severity === 'warning' ? 'text-yellow-600' : 'text-blue-600';
    
    switch (alertType) {
      case 'out_of_stock':
        return <XCircle className={`w-5 h-5 ${iconClass}`} />;
      case 'low_stock':
        return <AlertTriangle className={`w-5 h-5 ${iconClass}`} />;
      case 'overstock':
        return <TrendingUp className={`w-5 h-5 ${iconClass}`} />;
      case 'reorder_point':
        return <Clock className={`w-5 h-5 ${iconClass}`} />;
      default:
        return <AlertTriangle className={`w-5 h-5 ${iconClass}`} />;
    }
  };

  const getAlertLabel = (alertType: string) => {
    switch (alertType) {
      case 'out_of_stock':
        return 'Out of Stock';
      case 'low_stock':
        return 'Low Stock';
      case 'overstock':
        return 'Overstock';
      case 'reorder_point':
        return 'Reorder Point';
      default:
        return alertType;
    }
  };

  const getStockBarColor = (alert: InventoryAlert) => {
    const percentage = (alert.currentStock / alert.maxStock) * 100;
    if (percentage <= 20) return 'bg-red-500';
    if (percentage <= 40) return 'bg-yellow-500';
    if (percentage <= 80) return 'bg-green-500';
    return 'bg-blue-500';
  };

  const fetchInventoryAlerts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/inventory');
      if (response.ok) {
        const data = await response.json();
        setAlerts(data.alerts || []);
        setStats(data.stats || {
          totalProducts: 0,
          lowStockAlerts: 0,
          outOfStockAlerts: 0,
          overstockAlerts: 0,
          totalInventoryValue: 0,
          criticalAlerts: 0
        });
      }
    } catch (error) {
      console.error('Error fetching inventory alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryAlerts();
  }, []);

  const refreshAlerts = () => {
    fetchInventoryAlerts();
  };

  const handleReorder = async (productId: string, productName: string) => {
    try {
      const quantity = prompt(`How many units of "${productName}" would you like to reorder?`);
      if (!quantity || isNaN(Number(quantity))) return;

      const response = await fetch('/api/admin/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reorder',
          productId,
          quantity: Number(quantity),
          supplier: 'Default Supplier',
          notes: `Reorder requested from admin panel`
        })
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Reorder request created successfully! Request ID: ${data.reorderRequest.id}`);
        refreshAlerts();
      } else {
        alert('Failed to create reorder request');
      }
    } catch (error) {
      console.error('Error creating reorder:', error);
      alert('Error creating reorder request');
    }
  };

  const handleUpdateThresholds = async (productId: string) => {
    try {
      const inventoryAlert = alerts.find(a => a.productId === productId);
      if (!inventoryAlert) return;

      const minStock = prompt(`Enter new minimum stock for "${inventoryAlert.productName}":`, inventoryAlert.minimumStock.toString());
      const maxStock = prompt(`Enter new maximum stock for "${inventoryAlert.productName}":`, inventoryAlert.maxStock.toString());
      
      if (!minStock || !maxStock || isNaN(Number(minStock)) || isNaN(Number(maxStock))) return;

      const response = await fetch('/api/admin/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_thresholds',
          productId,
          minimumStock: Number(minStock),
          maxStock: Number(maxStock)
        })
      });

      if (response.ok) {
        alert('Stock thresholds updated successfully!');
        refreshAlerts();
      } else {
        alert('Failed to update thresholds');
      }
    } catch (error) {
      console.error('Error updating thresholds:', error);
      alert('Error updating thresholds');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventory Alerts</h1>
            <p className="text-gray-600 mt-1">Monitor stock levels and manage inventory alerts</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={refreshAlerts}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Alert Settings
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                </div>
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
                  <p className="text-2xl font-bold text-red-600">{stats.criticalAlerts}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                  <p className="text-2xl font-bold text-red-600">{stats.outOfStockAlerts}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Low Stock</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.lowStockAlerts}</p>
                </div>
                <TrendingDown className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overstock</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.overstockAlerts}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Inventory Value</p>
                  <p className="text-2xl font-bold text-green-600">₹{stats.totalInventoryValue.toLocaleString()}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex gap-4 items-center w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Severity</option>
                  <option value="critical">Critical</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                </select>

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="out_of_stock">Out of Stock</option>
                  <option value="low_stock">Low Stock</option>
                  <option value="overstock">Overstock</option>
                  <option value="reorder_point">Reorder Point</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="severity">Sort by Severity</option>
                  <option value="stock">Sort by Stock</option>
                  <option value="value">Sort by Value</option>
                  <option value="days">Sort by Days Left</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Alerts ({filteredAlerts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : filteredAlerts.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <p className="text-gray-500">No inventory alerts found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <div key={alert.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="flex-shrink-0">
                          {getAlertIcon(alert.alertType, alert.severity)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-medium text-gray-900">{alert.productName}</h3>
                            {getSeverityBadge(alert.severity)}
                            <Badge variant="outline">{alert.category}</Badge>
                            <Badge variant="secondary">{getAlertLabel(alert.alertType)}</Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="block font-medium">Current Stock</span>
                              <span className="text-lg font-bold text-gray-900">{alert.currentStock}</span>
                            </div>
                            <div>
                              <span className="block font-medium">Min Stock</span>
                              <span>{alert.minimumStock}</span>
                            </div>
                            <div>
                              <span className="block font-medium">Value</span>
                              <span>₹{alert.value.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="block font-medium">Days Until Stockout</span>
                              <span className={`font-medium ${
                                (alert.daysUntilStockOut || 0) <= 3 ? 'text-red-600' : 
                                (alert.daysUntilStockOut || 0) <= 7 ? 'text-yellow-600' : 'text-green-600'
                              }`}>
                                {alert.daysUntilStockOut || 'N/A'} days
                              </span>
                            </div>
                          </div>
                          
                          {/* Stock Level Bar */}
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>Stock Level</span>
                              <span>{alert.currentStock} / {alert.maxStock}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${getStockBarColor(alert)}`}
                                style={{ width: `${Math.min((alert.currentStock / alert.maxStock) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          {alert.supplier && (
                            <div className="mt-2 text-xs text-gray-500">
                              Supplier: {alert.supplier} • Lead Time: {alert.leadTime} days
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleReorder(alert.productId, alert.productName)}
                        >
                          Reorder
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleUpdateThresholds(alert.productId)}
                        >
                          Set Thresholds
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}