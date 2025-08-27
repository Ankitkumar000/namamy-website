'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Plus, Edit2, Trash2, Home, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface AddressManagerProps {
  locale: string;
}

interface Address {
  id: string;
  type: 'home' | 'office' | 'other';
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault: boolean;
}

// Mock addresses data
const mockAddresses: Address[] = [
  {
    id: '1',
    type: 'home',
    name: 'Namamy User',
    phone: '+91 98765 43210',
    addressLine1: '123 Green Valley Apartments',
    addressLine2: 'Near City Mall',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    landmark: 'Opposite Metro Station',
    isDefault: true,
  },
  {
    id: '2',
    type: 'office',
    name: 'Namamy User',
    phone: '+91 98765 43210',
    addressLine1: '456 Business Park',
    addressLine2: 'Tower B, 5th Floor',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400070',
    isDefault: false,
  },
];

export function AddressManager({ locale }: AddressManagerProps) {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<Partial<Address>>({
    type: 'home',
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    isDefault: false,
  });

  const t = useTranslations('dashboard');
  const tForms = useTranslations('forms');

  const handleAddAddress = () => {
    setShowAddForm(true);
    setEditingAddress(null);
    setFormData({
      type: 'home',
      name: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      landmark: '',
      isDefault: false,
    });
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setFormData(address);
    setShowAddForm(true);
  };

  const handleDeleteAddress = (addressId: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(prev => prev.filter(addr => addr.id !== addressId));
    }
  };

  const handleSetDefault = (addressId: string) => {
    setAddresses(prev => 
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }))
    );
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAddress) {
      // Update existing address
      setAddresses(prev => 
        prev.map(addr => 
          addr.id === editingAddress.id 
            ? { ...formData as Address, id: editingAddress.id }
            : addr
        )
      );
    } else {
      // Add new address
      const newAddress: Address = {
        ...formData as Address,
        id: Date.now().toString(),
      };
      
      // If this is the first address or marked as default, make it default
      if (addresses.length === 0 || formData.isDefault) {
        setAddresses(prev => [
          ...prev.map(addr => ({ ...addr, isDefault: false })),
          { ...newAddress, isDefault: true }
        ]);
      } else {
        setAddresses(prev => [...prev, newAddress]);
      }
    }
    
    setShowAddForm(false);
    setEditingAddress(null);
  };

  const handleInputChange = (field: keyof Address, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getAddressTypeIcon = (type: string) => {
    switch (type) {
      case 'home':
        return Home;
      case 'office':
        return Building2;
      default:
        return MapPin;
    }
  };

  const getAddressTypeLabel = (type: string) => {
    switch (type) {
      case 'home':
        return 'Home';
      case 'office':
        return 'Office';
      default:
        return 'Other';
    }
  };

  if (showAddForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold text-gray-900">
            {editingAddress ? 'Edit Address' : 'Add New Address'}
          </h2>
          <Button 
            variant="outline" 
            onClick={() => setShowAddForm(false)}
          >
            Cancel
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmitForm} className="space-y-6">
              {/* Address Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Type
                </label>
                <div className="flex space-x-4">
                  {['home', 'office', 'other'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={formData.type === type}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="w-4 h-4 text-makhana-600 border-gray-300 focus:ring-makhana-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {tForms('fullName')} *
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {tForms('phone')} *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Address Line 1 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {tForms('addressLine1')} *
                </label>
                <input
                  type="text"
                  value={formData.addressLine1 || ''}
                  onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Address Line 2 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {tForms('addressLine2')}
                </label>
                <input
                  type="text"
                  value={formData.addressLine2 || ''}
                  onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {tForms('city')} *
                  </label>
                  <input
                    type="text"
                    value={formData.city || ''}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {tForms('state')} *
                  </label>
                  <input
                    type="text"
                    value={formData.state || ''}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* PIN Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {tForms('zipCode')} *
                  </label>
                  <input
                    type="text"
                    value={formData.pincode || ''}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    required
                  />
                </div>
              </div>

              {/* Landmark */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {tForms('landmark')}
                </label>
                <input
                  type="text"
                  value={formData.landmark || ''}
                  onChange={(e) => handleInputChange('landmark', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                />
              </div>

              {/* Default Address */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={formData.isDefault || false}
                  onChange={(e) => handleInputChange('isDefault', e.target.checked)}
                  className="w-4 h-4 text-makhana-600 border-gray-300 rounded focus:ring-makhana-500"
                />
                <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
                  Set as default address
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex space-x-4">
                <Button type="submit" className="flex-1">
                  {editingAddress ? 'Update Address' : 'Add Address'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-gray-900">
          Saved Addresses
        </h2>
        <Button onClick={handleAddAddress}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No addresses saved
            </h3>
            <p className="text-gray-600 mb-6">
              Add your first address to make checkout faster
            </p>
            <Button onClick={handleAddAddress}>
              <Plus className="w-4 h-4 mr-2" />
              Add Address
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address, index) => {
            const TypeIcon = getAddressTypeIcon(address.type);
            
            return (
              <motion.div
                key={address.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="relative">
                  {address.isDefault && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="default" className="bg-green-500">
                        Default
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <TypeIcon className="w-5 h-5 text-makhana-600" />
                      <span>{getAddressTypeLabel(address.type)}</span>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-4">
                      <p className="font-semibold text-gray-900">{address.name}</p>
                      <p className="text-sm text-gray-600">{address.phone}</p>
                      <div className="text-sm text-gray-700">
                        <p>{address.addressLine1}</p>
                        {address.addressLine2 && <p>{address.addressLine2}</p>}
                        <p>{address.city}, {address.state} {address.pincode}</p>
                        {address.landmark && (
                          <p className="text-gray-600">Near: {address.landmark}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditAddress(address)}
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      
                      {!address.isDefault && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSetDefault(address.id)}
                          >
                            Set Default
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteAddress(address.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
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