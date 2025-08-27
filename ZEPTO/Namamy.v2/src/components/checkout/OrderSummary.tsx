'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCartStore } from '@/store/cart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface OrderSummaryProps {
  locale: string;
}

export function OrderSummary({ locale }: OrderSummaryProps) {
  const {
    items,
    subtotal,
    tax,
    shipping,
    discount,
    total,
    couponCode,
    couponDiscount,
  } = useCartStore();
  
  const t = useTranslations('checkout');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('orderSummary.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center relative">
                <Image
                  src={item.product.images[0]?.url || '/images/placeholder-product.jpg'}
                  alt={item.product.name}
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-makhana-600 text-white text-xs rounded-full flex items-center justify-center">
                  {item.quantity}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                  {item.product.name}
                </h4>
                <p className="text-sm text-gray-600">
                  ₹{item.product.price} × {item.quantity}
                </p>
              </div>
              <div className="text-sm font-medium text-gray-900">
                ₹{item.product.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        <hr className="border-gray-200" />

        {/* Order Totals */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{t('orderSummary.subtotal')}</span>
            <span className="font-medium">₹{subtotal}</span>
          </div>

          {(couponDiscount || 0) > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>
                {t('orderSummary.discount')} ({couponCode})
              </span>
              <span className="font-medium">-₹{couponDiscount || 0}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{t('orderSummary.shipping')}</span>
            <span className="font-medium">
              {shipping === 0 ? t('orderSummary.free') : `₹${shipping}`}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{t('orderSummary.tax')}</span>
            <span className="font-medium">₹{tax}</span>
          </div>

          <hr className="border-gray-200" />

          <div className="flex justify-between text-lg font-bold">
            <span>{t('orderSummary.total')}</span>
            <span className="text-makhana-600">₹{total}</span>
          </div>
        </div>

        {/* Savings */}
        {discount > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-800">
              🎉 {t('orderSummary.savings', { amount: discount })}
            </p>
          </div>
        )}

        {/* Free Shipping Notice */}
        {shipping === 0 && subtotal >= 500 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              🚚 {t('orderSummary.freeShipping')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}