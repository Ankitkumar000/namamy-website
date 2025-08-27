'use client';

import { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface OrderTrackingContentProps {
  locale: string;
}

interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  location: string;
  timestamp: string;
  isCompleted: boolean;
}

interface OrderDetails {
  orderId: string;
  orderDate: string;
  estimatedDelivery: string;
  currentStatus: string;
  trackingNumber: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  trackingEvents: TrackingEvent[];
}

// Mock order data
const mockOrderData: OrderDetails = {
  orderId: 'ORD-2024001',
  orderDate: '2024-01-15',
  estimatedDelivery: '2024-01-20',
  currentStatus: 'Out for Delivery',
  trackingNumber: 'NM123456789IN',
  items: [
    { name: 'Premium Roasted Makhana', quantity: 2, price: 299 },
    { name: 'Masala Makhana Mix', quantity: 1, price: 329 },
  ],
  shippingAddress: {
    name: 'John Doe',
    address: '123 Green Valley Apartments, Near City Mall',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    phone: '+91 98765 43210',
  },
  trackingEvents: [
    {
      id: '1',
      status: 'Order Placed',
      description: 'Your order has been successfully placed and payment confirmed.',
      location: 'Mumbai, MH',
      timestamp: '2024-01-15T10:30:00Z',
      isCompleted: true,
    },
    {
      id: '2',
      status: 'Order Confirmed',
      description: 'Order confirmed and is being prepared for shipment.',
      location: 'Namamy Fulfillment Center, Mumbai',
      timestamp: '2024-01-15T14:15:00Z',
      isCompleted: true,
    },
    {
      id: '3',
      status: 'Packed',
      description: 'Your order has been packed and ready for pickup.',
      location: 'Namamy Fulfillment Center, Mumbai',
      timestamp: '2024-01-16T09:45:00Z',
      isCompleted: true,
    },
    {
      id: '4',
      status: 'Shipped',
      description: 'Your order has been shipped and is on its way to the delivery hub.',
      location: 'Mumbai Sorting Facility',
      timestamp: '2024-01-16T18:20:00Z',
      isCompleted: true,
    },
    {
      id: '5',
      status: 'In Transit',
      description: 'Package is in transit to your city.',
      location: 'Delhi Hub',
      timestamp: '2024-01-17T22:10:00Z',
      isCompleted: true,
    },
    {
      id: '6',
      status: 'Out for Delivery',
      description: 'Your package is out for delivery and will be delivered today.',
      location: 'Local Delivery Hub, Mumbai',
      timestamp: '2024-01-18T08:30:00Z',
      isCompleted: true,
    },
    {
      id: '7',
      status: 'Delivered',
      description: 'Package delivered successfully.',
      location: 'Mumbai, MH',
      timestamp: '',
      isCompleted: false,
    },
  ],
};

const statusIcons = {
  'Order Placed': Package,
  'Order Confirmed': CheckCircle,
  'Packed': Package,
  'Shipped': Truck,
  'In Transit': Truck,
  'Out for Delivery': Truck,
  'Delivered': CheckCircle,
};

export function OrderTrackingContent({ locale }: OrderTrackingContentProps) {
  const [trackingId, setTrackingId] = useState('');
  const [orderData, setOrderData] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      setError('Please enter a valid order ID or tracking number');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (trackingId === 'ORD-2024001' || trackingId === 'NM123456789IN') {
        setOrderData(mockOrderData);
      } else {
        setError('Order not found. Please check your order ID or tracking number.');
        setOrderData(null);
      }
      setIsLoading(false);
    }, 1500);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="mt-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
          Track Your Order
        </h1>
        <p className="text-xl text-gray-600">
          Enter your order ID or tracking number to get real-time updates
        </p>
      </div>

      {/* Search Form */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <form onSubmit={handleTrackOrder} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order ID or Tracking Number
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter your order ID (e.g., ORD-2024001) or tracking number"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                />
              </div>
              {error && (
                <p className="text-red-600 text-sm mt-2">{error}</p>
              )}
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Tracking...
                </div>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Track Order
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Demo Information */}
      {!orderData && !isLoading && (
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Demo Order Available</h3>
                <p className="text-blue-800 text-sm">
                  Try tracking with demo order ID: <code className="bg-blue-100 px-2 py-1 rounded">ORD-2024001</code> or tracking number: <code className="bg-blue-100 px-2 py-1 rounded">NM123456789IN</code>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Order Details */}
      {orderData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Order Status Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Order Status</span>
                <Badge 
                  variant="default" 
                  className={`${
                    orderData.currentStatus === 'Delivered' 
                      ? 'bg-green-500' 
                      : 'bg-blue-500'
                  }`}
                >
                  {orderData.currentStatus}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-700">Order ID</p>
                  <p className="text-lg font-semibold text-gray-900">{orderData.orderId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Order Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(orderData.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Estimated Delivery</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(orderData.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Tracking Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {orderData.trackingEvents.map((event, index) => {
                  const StatusIcon = statusIcons[event.status as keyof typeof statusIcons] || Package;
                  const isLast = index === orderData.trackingEvents.length - 1;
                  
                  return (
                    <div key={event.id} className="flex items-start space-x-4">
                      <div className="relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          event.isCompleted 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          <StatusIcon className="w-5 h-5" />
                        </div>
                        {!isLast && (
                          <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-8 ${
                            event.isCompleted ? 'bg-green-300' : 'bg-gray-300'
                          }`} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-semibold ${
                            event.isCompleted ? 'text-gray-900' : 'text-gray-400'
                          }`}>
                            {event.status}
                          </h4>
                          {event.timestamp && (
                            <span className="text-xs text-gray-500">
                              {formatDate(event.timestamp)}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm mt-1 ${
                          event.isCompleted ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {event.description}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-makhana-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🥜</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                      <p className="text-sm text-gray-600">₹{item.price} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Delivery Address */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-semibold text-gray-900">{orderData.shippingAddress.name}</p>
                <p className="text-gray-700">{orderData.shippingAddress.address}</p>
                <p className="text-gray-700">
                  {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.pincode}
                </p>
                <div className="flex items-center text-gray-600 text-sm mt-2">
                  <Phone className="w-4 h-4 mr-2" />
                  {orderData.shippingAddress.phone}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="bg-gradient-to-r from-makhana-500 to-makhana-600 text-white">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Need Help?</h3>
              <p className="text-makhana-100 mb-4">
                Our customer support team is here to assist you with any questions about your order.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="outline"
                  className="bg-white text-makhana-600 border-white hover:bg-makhana-50"
                  onClick={() => window.open(`/${locale}/contact`, '_blank')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white hover:text-makhana-600"
                  onClick={() => window.open('mailto:support@namamy.com', '_blank')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}