'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Lock,
  Truck,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/store/cart';
import { AddressForm } from './AddressForm';
import { PaymentForm } from './PaymentForm';
import { OrderSummary } from './OrderSummary';

interface CheckoutContentProps {
  locale: string;
}

type CheckoutStep = 'shipping' | 'payment' | 'review';

export function CheckoutContent({ locale }: CheckoutContentProps) {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [shippingAddress, setShippingAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const router = useRouter();
  const { isEmpty, items, total } = useCartStore();
  const t = useTranslations('checkout');

  // Redirect if cart is empty
  useEffect(() => {
    if (isEmpty) {
      router.push(`/${locale}/cart`);
    }
  }, [isEmpty, locale, router]);

  const steps = [
    { id: 'shipping', label: t('steps.shipping'), icon: MapPin },
    { id: 'payment', label: t('steps.payment'), icon: CreditCard },
    { id: 'review', label: t('steps.review'), icon: CheckCircle },
  ];

  const handleStepComplete = (step: CheckoutStep, data: any) => {
    if (step === 'shipping') {
      setShippingAddress(data);
      setCurrentStep('payment');
    } else if (step === 'payment') {
      setPaymentMethod(data);
      setCurrentStep('review');
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would create the order via API
      const orderId = `ORD-${Date.now()}`;
      
      // Clear cart and redirect to success
      router.push(`/${locale}/order/${orderId}`);
    } catch (error) {
      console.error('Order processing failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isEmpty) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-400" />
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">
            {t('emptyCart')}
          </h1>
          <p className="text-gray-600 mb-8">
            {t('emptyCartDesc')}
          </p>
          <Button onClick={() => router.push(`/${locale}/shop`)}>
            {t('continueShopping')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          {t('title')}
        </h1>
        <p className="text-gray-600">
          {t('subtitle')}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-makhana-600 -translate-y-1/2 transition-all duration-500"
            style={{ 
              width: currentStep === 'shipping' ? '0%' : 
                     currentStep === 'payment' ? '50%' : '100%' 
            }}
          />
          
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = 
              step.id === 'shipping' && (currentStep === 'payment' || currentStep === 'review') ||
              step.id === 'payment' && currentStep === 'review';
            
            return (
              <div key={step.id} className="relative flex flex-col items-center">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center border-2 bg-white transition-colors
                  ${isActive ? 'border-makhana-600 text-makhana-600' : 
                    isCompleted ? 'border-makhana-600 bg-makhana-600 text-white' : 
                    'border-gray-300 text-gray-400'}
                `}>
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <StepIcon className="w-6 h-6" />
                  )}
                </div>
                <span className={`
                  mt-2 text-sm font-medium
                  ${isActive || isCompleted ? 'text-makhana-600' : 'text-gray-500'}
                `}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 'shipping' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>{t('shipping.title')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AddressForm
                    locale={locale}
                    onComplete={(data) => handleStepComplete('shipping', data)}
                  />
                </CardContent>
              </Card>
            )}

            {currentStep === 'payment' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>{t('payment.title')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PaymentForm
                    locale={locale}
                    onComplete={(data) => handleStepComplete('payment', data)}
                    onBack={() => setCurrentStep('shipping')}
                  />
                </CardContent>
              </Card>
            )}

            {currentStep === 'review' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>{t('review.title')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">
                      {t('review.orderItems')}
                    </h3>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                            <span className="text-2xl">🥜</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                            <p className="text-sm text-gray-600">
                              {t('review.quantity')}: {item.quantity} × ₹{item.product.price}
                            </p>
                          </div>
                          <div className="text-lg font-bold text-makhana-600">
                            ₹{item.product.price * item.quantity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  {shippingAddress && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {t('review.shippingAddress')}
                      </h3>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-700">
                          {shippingAddress.name}<br />
                          {shippingAddress.addressLine1}<br />
                          {shippingAddress.addressLine2 && `${shippingAddress.addressLine2}\n`}
                          {shippingAddress.city}, {shippingAddress.state} {shippingAddress.pincode}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          {t('forms.phone')}: {shippingAddress.phone}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Payment Method */}
                  {paymentMethod && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {t('review.paymentMethod')}
                      </h3>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <Badge variant="outline">
                          {paymentMethod.type === 'cod' ? t('payment.cod') : 
                           paymentMethod.type === 'upi' ? t('payment.upi') :
                           paymentMethod.type === 'card' ? t('payment.card') : 
                           paymentMethod.type}
                        </Badge>
                      </div>
                    </div>
                  )}

                  {/* Terms & Conditions */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 h-4 w-4 text-makhana-600 focus:ring-makhana-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      {t('review.termsAgree')}
                    </label>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep('payment')}
                      className="flex-1"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      {t('common.back')}
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="flex-1"
                      size="lg"
                    >
                      {isProcessing ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      ) : (
                        <Lock className="w-4 h-4 mr-2" />
                      )}
                      {isProcessing ? t('review.processing') : t('review.placeOrder')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <div className="sticky top-24">
            <OrderSummary locale={locale} />
            
            {/* Security Features */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">
                      {t('security.sslEncryption')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-700">
                      {t('security.freeShipping')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <span className="text-sm text-gray-700">
                      {t('security.fastDelivery')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}