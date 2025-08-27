'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

interface AddressFormProps {
  locale: string;
  onComplete: (address: any) => void;
}

interface Address {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

// Mock saved addresses
const savedAddresses: Address[] = [
  {
    id: '1',
    name: 'John Doe',
    addressLine1: 'House no-263, Police Station Road',
    addressLine2: 'Sabour',
    city: 'Bhagalpur',
    state: 'Bihar',
    pincode: '813210',
    phone: '+91 7261071570, 70912 60484',
    isDefault: true,
  },
];

export function AddressForm({ locale, onComplete }: AddressFormProps) {
  const [selectedAddress, setSelectedAddress] = useState<string>(savedAddresses[0]?.id || '');
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const t = useTranslations('checkout');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!newAddress.name.trim()) newErrors.name = t('validation.required');
    if (!newAddress.addressLine1.trim()) newErrors.addressLine1 = t('validation.required');
    if (!newAddress.city.trim()) newErrors.city = t('validation.required');
    if (!newAddress.state.trim()) newErrors.state = t('validation.required');
    if (!newAddress.pincode.trim()) newErrors.pincode = t('validation.required');
    if (!/^\d{6}$/.test(newAddress.pincode)) newErrors.pincode = t('validation.invalidPincode');
    if (!newAddress.phone.trim()) newErrors.phone = t('validation.required');
    if (!/^[+]?[\d\s\-()]{10,}$/.test(newAddress.phone)) newErrors.phone = t('validation.invalidPhone');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (selectedAddress) {
      const address = savedAddresses.find(addr => addr.id === selectedAddress);
      if (address) {
        onComplete(address);
        return;
      }
    }

    if (showNewAddressForm) {
      if (validateForm()) {
        onComplete(newAddress);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewAddress(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Saved Addresses */}
      {savedAddresses.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">
            {t('shipping.selectAddress')}
          </h3>
          <div className="space-y-3">
            {savedAddresses.map((address) => (
              <Card 
                key={address.id}
                className={`cursor-pointer transition-colors ${
                  selectedAddress === address.id 
                    ? 'ring-2 ring-makhana-500 bg-makhana-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => {
                  setSelectedAddress(address.id);
                  setShowNewAddressForm(false);
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <input
                      type="radio"
                      name="address"
                      value={address.id}
                      checked={selectedAddress === address.id}
                      onChange={() => {}}
                      className="mt-1 h-4 w-4 text-makhana-600 focus:ring-makhana-500 border-gray-300"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">{address.name}</h4>
                        {address.isDefault && (
                          <span className="px-2 py-1 text-xs bg-makhana-100 text-makhana-700 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {address.addressLine1}
                        {address.addressLine2 && `, ${address.addressLine2}`}
                        <br />
                        {address.city}, {address.state} - {address.pincode}
                        <br />
                        Phone: {address.phone}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Add New Address Button */}
      <Button
        variant="outline"
        onClick={() => {
          setShowNewAddressForm(!showNewAddressForm);
          setSelectedAddress('');
        }}
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        {t('shipping.newAddress')}
      </Button>

      {/* New Address Form */}
      {showNewAddressForm && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              {t('shipping.addNewAddress')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('forms.fullName')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newAddress.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('forms.addressLine1')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newAddress.addressLine1}
                  onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent ${
                    errors.addressLine1 ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="House/Flat no., Building name, Street"
                />
                {errors.addressLine1 && <p className="mt-1 text-sm text-red-600">{errors.addressLine1}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('forms.addressLine2')}
                </label>
                <input
                  type="text"
                  value={newAddress.addressLine2}
                  onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                  placeholder="Area, Colony, Landmark (Optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('forms.city')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newAddress.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="City"
                />
                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('forms.state')} <span className="text-red-500">*</span>
                </label>
                <select
                  value={newAddress.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent ${
                    errors.state ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select State</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                </select>
                {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('forms.zipCode')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newAddress.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent ${
                    errors.pincode ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="6-digit PIN code"
                  maxLength={6}
                />
                {errors.pincode && <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('forms.phone')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={newAddress.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+91 7261071570, 70912 60484"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Continue Button */}
      <Button
        onClick={handleContinue}
        disabled={!selectedAddress && !showNewAddressForm}
        className="w-full"
        size="lg"
      >
        {t('shipping.continueToPayment')}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}