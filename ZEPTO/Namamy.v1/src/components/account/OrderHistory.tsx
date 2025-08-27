'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Package, Truck, CheckCircle, Eye, Download, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface OrderHistoryProps {
  locale: string;
}

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-2024001',
    date: '2024-01-15',
    status: 'delivered',
    total: 899,
    items: 3,
    products: [
      { name: 'Premium Roasted Makhana', quantity: 2, price: 299 },
      { name: 'Masala Makhana Mix', quantity: 1, price: 329 },
    ],
    estimatedDelivery: '2024-01-20',
    actualDelivery: '2024-01-19',
  },
  {
    id: 'ORD-2024002',
    date: '2024-01-28',
    status: 'shipped',
    total: 649,
    items: 2,
    products: [
      { name: 'Chocolate Makhana', quantity: 1, price: 449 },
      { name: 'Peri Peri Makhana', quantity: 1, price: 359 },
    ],
    estimatedDelivery: '2024-02-02',
    trackingNumber: 'TRK123456789',
  },
  {
    id: 'ORD-2024003',
    date: '2024-02-05',
    status: 'processing',
    total: 599,
    items: 2,
    products: [
      { name: 'Himalayan Pink Salt Makhana', quantity: 2, price: 349 },
    ],
    estimatedDelivery: '2024-02-10',
  },
];

const statusConfig = {
  processing: { label: 'Processing', color: 'bg-yellow-100 text-yellow-800', icon: Package },
  shipped: { label: 'Shipped', color: 'bg-blue-100 text-blue-800', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: RotateCcw },
};

export function OrderHistory({ locale }: OrderHistoryProps) {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const t = useTranslations('dashboard.orders');

  const getStatusConfig = (status: string) => {
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.processing;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-gray-900">
          {t('title')}
        </h2>
        <div className="flex space-x-2">
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-makhana-500">
            <option value="all">{t('filterByStatus')}</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {mockOrders.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('noOrders')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('noOrdersDesc')}
            </p>
            <Button onClick={() => window.open(`/${locale}/shop`, '_blank')}>
              {t('startShopping')}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {mockOrders.map((order, index) => {
            const statusConf = getStatusConfig(order.status);
            const StatusIcon = statusConf.icon;
            
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-makhana-100 rounded-lg flex items-center justify-center">
                          <StatusIcon className="w-6 h-6 text-makhana-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {t('orderNumber')}: {order.id}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {t('date')}: {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={statusConf.color}>
                          {statusConf.label}
                        </Badge>
                        <p className="text-lg font-bold text-makhana-600 mt-1">
                          ₹{order.total}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {t('items')}
                        </p>
                        <p className="text-sm text-gray-600">{order.items} items</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {t('total')}
                        </p>
                        <p className="text-sm text-gray-600">₹{order.total}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {order.status === 'delivered' ? t('deliveredOn') : t('estimatedDelivery')}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.actualDelivery 
                            ? new Date(order.actualDelivery).toLocaleDateString()
                            : new Date(order.estimatedDelivery).toLocaleDateString()
                          }
                        </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="border-t pt-4 mb-4">
                      <div className="space-y-2">
                        {order.products.map((product, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-gray-700">
                              {product.name} × {product.quantity}
                            </span>
                            <span className="font-medium">
                              ₹{product.price * product.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`/${locale}/order/${order.id}`, '_blank')}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {t('viewDetails')}
                      </Button>
                      
                      {order.status === 'shipped' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`/${locale}/track-order?id=${order.id}`, '_blank')}
                        >
                          <Truck className="w-4 h-4 mr-2" />
                          {t('trackOrder')}
                        </Button>
                      )}
                      
                      {order.status === 'delivered' && (
                        <>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            {t('downloadInvoice')}
                          </Button>
                          <Button variant="outline" size="sm">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            {t('reorder')}
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}