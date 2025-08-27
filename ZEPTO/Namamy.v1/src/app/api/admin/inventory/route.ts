import { NextRequest, NextResponse } from 'next/server';

// Mock inventory alerts data
let inventoryAlerts = [
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

// GET - Get inventory alerts with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const severity = searchParams.get('severity');
    const alertType = searchParams.get('alertType');
    const category = searchParams.get('category');
    const sortBy = searchParams.get('sortBy') || 'severity';

    let filteredAlerts = [...inventoryAlerts];

    // Apply search filter
    if (search) {
      filteredAlerts = filteredAlerts.filter(alert =>
        alert.productName.toLowerCase().includes(search.toLowerCase()) ||
        alert.category.toLowerCase().includes(search.toLowerCase()) ||
        alert.supplier?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply severity filter
    if (severity && severity !== 'all') {
      filteredAlerts = filteredAlerts.filter(alert => alert.severity === severity);
    }

    // Apply alert type filter
    if (alertType && alertType !== 'all') {
      filteredAlerts = filteredAlerts.filter(alert => alert.alertType === alertType);
    }

    // Apply category filter
    if (category && category !== 'all') {
      filteredAlerts = filteredAlerts.filter(alert => alert.category === category);
    }

    // Apply sorting
    filteredAlerts.sort((a, b) => {
      switch (sortBy) {
        case 'severity':
          const severityOrder = { critical: 3, warning: 2, info: 1 };
          return severityOrder[b.severity as keyof typeof severityOrder] - severityOrder[a.severity as keyof typeof severityOrder];
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

    // Calculate stats
    const stats = {
      totalProducts: inventoryAlerts.length,
      lowStockAlerts: inventoryAlerts.filter(a => a.alertType === 'low_stock').length,
      outOfStockAlerts: inventoryAlerts.filter(a => a.alertType === 'out_of_stock').length,
      overstockAlerts: inventoryAlerts.filter(a => a.alertType === 'overstock').length,
      totalInventoryValue: inventoryAlerts.reduce((sum, a) => sum + a.value, 0),
      criticalAlerts: inventoryAlerts.filter(a => a.severity === 'critical').length
    };

    return NextResponse.json({
      success: true,
      alerts: filteredAlerts,
      stats,
      total: filteredAlerts.length
    });
  } catch (error) {
    console.error('Error fetching inventory alerts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inventory alerts' },
      { status: 500 }
    );
  }
}

// POST - Create new inventory alert or reorder
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    switch (action) {
      case 'reorder':
        const { productId, quantity, supplier, notes } = data;
        
        // Simulate creating a reorder request
        const reorderRequest = {
          id: Date.now().toString(),
          productId,
          quantity,
          supplier,
          notes: notes || '',
          status: 'pending',
          requestedBy: 'Admin User',
          requestedAt: new Date().toISOString(),
          expectedDelivery: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toISOString() // 7 days from now
        };

        console.log(`Reorder request created for product ${productId}:`, reorderRequest);

        return NextResponse.json({
          success: true,
          reorderRequest,
          message: 'Reorder request created successfully'
        });

      case 'update_thresholds':
        const { productId: prodId, minimumStock, maxStock } = data;
        
        // Update alert thresholds
        const alertIndex = inventoryAlerts.findIndex(alert => alert.productId === prodId);
        if (alertIndex !== -1) {
          inventoryAlerts[alertIndex] = {
            ...inventoryAlerts[alertIndex],
            minimumStock,
            maxStock,
            lastUpdated: new Date().toISOString()
          };

          // Recalculate alert type based on new thresholds
          const alert = inventoryAlerts[alertIndex];
          if (alert.currentStock === 0) {
            alert.alertType = 'out_of_stock';
            alert.severity = 'critical';
          } else if (alert.currentStock < minimumStock) {
            alert.alertType = 'low_stock';
            alert.severity = 'critical';
          } else if (alert.currentStock <= minimumStock + 5) {
            alert.alertType = 'reorder_point';
            alert.severity = 'warning';
          } else if (alert.currentStock > maxStock) {
            alert.alertType = 'overstock';
            alert.severity = 'info';
          }
        }

        return NextResponse.json({
          success: true,
          message: 'Stock thresholds updated successfully'
        });

      case 'bulk_update':
        const { productIds, updates } = data;
        
        let updatedCount = 0;
        productIds.forEach((productId: string) => {
          const alertIndex = inventoryAlerts.findIndex(alert => alert.productId === productId);
          if (alertIndex !== -1) {
            inventoryAlerts[alertIndex] = {
              ...inventoryAlerts[alertIndex],
              ...updates,
              lastUpdated: new Date().toISOString()
            };
            updatedCount++;
          }
        });

        return NextResponse.json({
          success: true,
          message: `${updatedCount} inventory alerts updated successfully`
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error processing inventory request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process inventory request' },
      { status: 500 }
    );
  }
}

// PUT - Update inventory levels (usually called from stock management)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, newStock, reason } = body;

    if (!productId || newStock === undefined) {
      return NextResponse.json(
        { success: false, error: 'Product ID and new stock level are required' },
        { status: 400 }
      );
    }

    // Find and update the inventory alert
    const alertIndex = inventoryAlerts.findIndex(alert => alert.productId === productId);
    
    if (alertIndex !== -1) {
      const alert = inventoryAlerts[alertIndex];
      const oldStock = alert.currentStock;
      
      // Update stock level
      alert.currentStock = parseInt(newStock);
      alert.value = alert.currentStock * alert.price;
      alert.lastUpdated = new Date().toISOString();
      
      // Recalculate days until stockout
      if (alert.avgSalesPerDay && alert.avgSalesPerDay > 0) {
        alert.daysUntilStockOut = Math.floor(alert.currentStock / alert.avgSalesPerDay);
      }

      // Update alert type and severity based on new stock level
      if (alert.currentStock === 0) {
        alert.alertType = 'out_of_stock';
        alert.severity = 'critical';
      } else if (alert.currentStock < alert.minimumStock) {
        alert.alertType = 'low_stock';
        alert.severity = 'critical';
      } else if (alert.currentStock <= alert.minimumStock + 5) {
        alert.alertType = 'reorder_point';
        alert.severity = 'warning';
      } else if (alert.currentStock > alert.maxStock) {
        alert.alertType = 'overstock';
        alert.severity = 'info';
      } else {
        // Stock is in normal range, remove from alerts if it was there
        // In a real system, you might want to keep this for tracking but mark as resolved
        alert.alertType = 'normal';
        alert.severity = 'info';
      }

      console.log(`Stock updated for ${alert.productName}: ${oldStock} → ${newStock} (${reason || 'Manual update'})`);

      return NextResponse.json({
        success: true,
        alert,
        message: 'Inventory level updated successfully'
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Product not found in inventory alerts' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error updating inventory:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update inventory' },
      { status: 500 }
    );
  }
}