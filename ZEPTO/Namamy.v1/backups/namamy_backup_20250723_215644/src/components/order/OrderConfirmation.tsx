'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { 
  CheckCircle, 
  Package, 
  Truck, 
  Download,
  MessageCircle,
  ArrowLeft,
  Calendar,
  MapPin,
  CreditCard
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/store/cart';

interface OrderConfirmationProps {
  locale: string;
  orderId: string;
}

// Mock order data
const mockOrder = {
  id: 'ORD-1234567890',
  status: 'confirmed',
  total: 899,
  items: [
    {
      id: '1',
      name: 'Premium Roasted Makhana',
      quantity: 2,
      price: 299,
      image: '/images/products/roasted-makhana.jpg',
    },
    {
      id: '2',
      name: 'Masala Makhana Mix',
      quantity: 1,
      price: 329,
      image: '/images/products/masala-makhana.jpg',
    },
  ],
  shippingAddress: {
    name: 'John Doe',
    addressLine1: '123 Green Park',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    phone: '+91 98765 43210',
  },
  paymentMethod: 'Credit Card ending in 1234',
  estimatedDelivery: '2024-02-15',
  orderDate: '2024-02-10',
};

export function OrderConfirmation({ locale, orderId }: OrderConfirmationProps) {
  const { clearCart } = useCartStore();
  const t = useTranslations('orderConfirmation');

  // Clear cart on successful order
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const deliverySteps = [
    { label: t('delivery.orderPlaced'), icon: CheckCircle, completed: true },
    { label: t('delivery.processing'), icon: Package, completed: false },
    { label: t('delivery.shipped'), icon: Truck, completed: false },
    { label: t('delivery.delivered'), icon: CheckCircle, completed: false },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Success Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          {t('subtitle')}
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Badge variant="outline" className="text-lg px-4 py-2">
            {t('orderNumber')}: {orderId}
          </Badge>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5" />
                <span>{t('orderDetails.title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3">
                {mockOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🥜</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        {t('orderDetails.quantity')}: {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                    <div className="text-lg font-bold text-makhana-600">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <hr />

              {/* Order Total */}
              <div className="flex justify-between text-lg font-bold">
                <span>{t('orderDetails.total')}</span>
                <span className="text-makhana-600">₹{mockOrder.total}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Delivery Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          {/* Delivery Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="w-5 h-5" />
                <span>{t('delivery.title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliverySteps.map((step, index) => {
                  const StepIcon = step.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${step.completed 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400'
                        }
                      `}>
                        <StepIcon className="w-4 h-4" />
                      </div>
                      <span className={`
                        ${step.completed ? 'text-gray-900 font-medium' : 'text-gray-500'}
                      `}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-800">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">
                    {t('delivery.estimatedDelivery')}: {mockOrder.estimatedDelivery}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{t('shippingAddress.title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-700">
                <p className="font-medium">{mockOrder.shippingAddress.name}</p>
                <p>{mockOrder.shippingAddress.addressLine1}</p>
                <p>
                  {mockOrder.shippingAddress.city}, {mockOrder.shippingAddress.state} - {mockOrder.shippingAddress.pincode}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {t('shippingAddress.phone')}: {mockOrder.shippingAddress.phone}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>{t('paymentInfo.title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{mockOrder.paymentMethod}</p>
              <p className="text-sm text-gray-600 mt-1">
                {t('paymentInfo.paidOn')}: {mockOrder.orderDate}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link href={`/${locale}/track-order?id=${orderId}`}>
          <Button size="lg" className="w-full sm:w-auto">
            <Truck className="w-4 h-4 mr-2" />
            {t('actions.trackOrder')}
          </Button>
        </Link>
        
        <Button variant="outline" size="lg" className="w-full sm:w-auto">
          <Download className="w-4 h-4 mr-2" />
          {t('actions.downloadInvoice')}
        </Button>
        
        <Button variant="outline" size="lg" className="w-full sm:w-auto">
          <MessageCircle className="w-4 h-4 mr-2" />
          {t('actions.contactSupport')}
        </Button>
        
        <Link href={`/${locale}/shop`}>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('actions.continueShopping')}
          </Button>
        </Link>
      </motion.div>

      {/* What's Next */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-12"
      >
        <Card className="bg-makhana-50 border-makhana-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-makhana-900 mb-2">
              {t('whatsNext.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <Package className="w-8 h-8 text-makhana-600 mx-auto mb-2" />
                <p className="text-sm text-makhana-800">
                  {t('whatsNext.processing')}
                </p>
              </div>
              <div>
                <Truck className="w-8 h-8 text-makhana-600 mx-auto mb-2" />
                <p className="text-sm text-makhana-800">
                  {t('whatsNext.shipping')}
                </p>
              </div>
              <div>
                <CheckCircle className="w-8 h-8 text-makhana-600 mx-auto mb-2" />
                <p className="text-sm text-makhana-800">
                  {t('whatsNext.delivery')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}