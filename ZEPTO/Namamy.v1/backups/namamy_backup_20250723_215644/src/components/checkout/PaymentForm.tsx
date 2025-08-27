'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  Wallet,
  Banknote,
  ArrowLeft,
  ArrowRight,
  Shield,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

interface PaymentFormProps {
  locale: string;
  onComplete: (paymentData: any) => void;
  onBack: () => void;
}

type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet' | 'cod';

const paymentMethods = [
  {
    id: 'card' as PaymentMethod,
    name: 'Credit/Debit Card',
    icon: CreditCard,
    description: 'Visa, Mastercard, Rupay',
  },
  {
    id: 'upi' as PaymentMethod,
    name: 'UPI Payment',
    icon: Smartphone,
    description: 'GPay, PhonePe, Paytm, BHIM',
  },
  {
    id: 'netbanking' as PaymentMethod,
    name: 'Net Banking',
    icon: Building,
    description: 'All major banks supported',
  },
  {
    id: 'wallet' as PaymentMethod,
    name: 'Digital Wallet',
    icon: Wallet,
    description: 'Paytm, Amazon Pay, MobiKwik',
  },
  {
    id: 'cod' as PaymentMethod,
    name: 'Cash on Delivery',
    icon: Banknote,
    description: 'Pay when you receive',
  },
];

export function PaymentForm({ locale, onComplete, onBack }: PaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const t = useTranslations('checkout');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let paymentData = { type: selectedMethod };
      
      if (selectedMethod === 'card') {
        paymentData = { ...paymentData, ...cardData };
      } else if (selectedMethod === 'upi') {
        paymentData = { ...paymentData, upiId };
      }
      
      onComplete(paymentData);
    } catch (error) {
      console.error('Payment processing failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Methods */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">
          {t('payment.selectMethod')}
        </h3>
        <div className="space-y-3">
          {paymentMethods.map((method) => {
            const MethodIcon = method.icon;
            return (
              <Card
                key={method.id}
                className={`cursor-pointer transition-colors ${
                  selectedMethod === method.id
                    ? 'ring-2 ring-makhana-500 bg-makhana-50'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={() => {}}
                      className="h-4 w-4 text-makhana-600 focus:ring-makhana-500 border-gray-300"
                    />
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <MethodIcon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{method.name}</h4>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                    {selectedMethod === method.id && (
                      <Check className="w-5 h-5 text-makhana-600" />
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Payment Method Details */}
      {selectedMethod === 'card' && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              {t('payment.cardDetails')}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('payment.cardNumber')}
                </label>
                <input
                  type="text"
                  value={cardData.number}
                  onChange={(e) => setCardData(prev => ({ 
                    ...prev, 
                    number: formatCardNumber(e.target.value) 
                  }))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('payment.expiryDate')}
                  </label>
                  <input
                    type="text"
                    value={cardData.expiry}
                    onChange={(e) => setCardData(prev => ({ 
                      ...prev, 
                      expiry: formatExpiry(e.target.value) 
                    }))}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('payment.cvv')}
                  </label>
                  <input
                    type="text"
                    value={cardData.cvv}
                    onChange={(e) => setCardData(prev => ({ 
                      ...prev, 
                      cvv: e.target.value.replace(/\D/g, '').substring(0, 4) 
                    }))}
                    placeholder="123"
                    maxLength={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('payment.nameOnCard')}
                </label>
                <input
                  type="text"
                  value={cardData.name}
                  onChange={(e) => setCardData(prev => ({ 
                    ...prev, 
                    name: e.target.value.toUpperCase() 
                  }))}
                  placeholder="JOHN DOE"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedMethod === 'upi' && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              {t('payment.upiDetails')}
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('payment.upiId')}
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="example@paytm"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                required
              />
            </div>
          </CardContent>
        </Card>
      )}

      {selectedMethod === 'cod' && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <Banknote className="w-16 h-16 text-makhana-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">
                {t('payment.codSelected')}
              </h3>
              <p className="text-gray-600">
                {t('payment.codDescription')}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {(selectedMethod === 'netbanking' || selectedMethod === 'wallet') && (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-gray-600">
              <p>{t('payment.redirectMessage')}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <div>
              <h4 className="font-medium text-blue-900">
                {t('payment.securePayment')}
              </h4>
              <p className="text-sm text-blue-700">
                {t('payment.secureDescription')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('common.back')}
        </Button>
        <Button
          type="submit"
          disabled={isProcessing}
          className="flex-1"
          size="lg"
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <ArrowRight className="w-4 h-4 mr-2" />
          )}
          {isProcessing ? t('payment.processing') : t('payment.continue')}
        </Button>
      </div>
    </form>
  );
}