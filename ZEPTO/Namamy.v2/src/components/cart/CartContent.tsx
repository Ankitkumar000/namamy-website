'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft, 
  ArrowRight,
  Tag,
  X,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useCartStore } from '@/store/cart';
import { cn } from '@/lib/utils';

interface CartContentProps {
  locale: string;
}

export function CartContent({ locale }: CartContentProps) {
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponError, setCouponError] = useState('');
  
  const {
    items,
    totalItems,
    subtotal,
    tax,
    shipping,
    discount,
    total,
    couponCode: appliedCoupon,
    couponDiscount,
    isEmpty,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  const t = useTranslations('cart');

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError(t('enterCouponCode'));
      return;
    }

    setIsApplyingCoupon(true);
    setCouponError('');

    try {
      const result = await applyCoupon(couponCode.trim());
      if (result.success) {
        setCouponCode('');
        setCouponError('');
      } else {
        setCouponError(result.message || t('invalidCouponCode'));
      }
    } catch (error) {
      setCouponError(t('couponError'));
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponCode('');
    setCouponError('');
  };

  if (isEmpty) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">
            {t('emptyCart')}
          </h1>
          <p className="text-gray-600 mb-8">
            {t('emptyCartDesc')}
          </p>
          <Link href={`/${locale}/shop`}>
            <Button size="lg">
              {t('continueShopping')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          {t('title')}
        </h1>
        <p className="text-gray-600">
          {t('itemsInCart', { count: totalItems })}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      'p-6',
                      index < items.length - 1 && 'border-b border-gray-200'
                    )}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                          <Image
                            src={item.product.images[0]?.url || '/images/placeholder-product.jpg'}
                            alt={item.product.name}
                            width={80}
                            height={80}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/${locale}/product/${item.product.slug}`}
                          className="text-lg font-semibold text-gray-900 hover:text-makhana-600 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.product.shortDescription}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {item.product.category}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {item.product.weight}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="px-3 py-1 font-medium min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stockQuantity}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Price & Remove */}
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          ₹{item.product.price * item.quantity}
                        </div>
                        {item.product.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            ₹{item.product.originalPrice * item.quantity}
                          </div>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="mt-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          {t('remove')}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Continue Shopping */}
          <div className="mt-6">
            <Link href={`/${locale}/shop`}>
              <Button variant="outline" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>{t('continueShopping')}</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          {/* Coupon Code */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Tag className="w-5 h-5" />
                <span>{t('couponCode')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      {appliedCoupon}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveCoupon}
                    className="text-green-700 hover:text-green-800"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder={t('enterCouponCode')}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon || !couponCode.trim()}
                      size="sm"
                    >
                      {isApplyingCoupon ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        t('apply')
                      )}
                    </Button>
                  </div>
                  {couponError && (
                    <p className="text-sm text-red-600">{couponError}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>{t('orderSummary')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>{t('subtotal')}</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>

              {(couponDiscount || 0) > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>{t('discount')}</span>
                  <span className="font-medium">-₹{couponDiscount || 0}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{t('shipping')}</span>
                <span className="font-medium">
                  {shipping === 0 ? t('free') : `₹${shipping}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>{t('tax')}</span>
                <span className="font-medium">₹{tax}</span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>{t('total')}</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Link href={`/${locale}/checkout`}>
                  <Button className="w-full" size="lg">
                    {t('proceedToCheckout')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                
                <p className="text-xs text-gray-500 text-center">
                  {t('secureCheckout')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Info */}
          <Card className="mt-6">
            <CardContent className="p-4">
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">{t('shippingInfo')}</p>
                <ul className="space-y-1">
                  <li>• {t('freeShippingAbove500')}</li>
                  <li>• {t('deliveryTime')}</li>
                  <li>• {t('cashOnDelivery')}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}