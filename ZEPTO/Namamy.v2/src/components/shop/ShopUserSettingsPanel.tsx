'use client';

import { useState } from 'react';
import { Settings, Palette, Layout, Filter, X, Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useShopUserSettings } from '@/components/ShopUserSettingsWrapper';

interface ShopUserSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShopUserSettingsPanel({ isOpen, onClose }: ShopUserSettingsPanelProps) {
  const { settings, updateSettings, loading, isShopPage } = useShopUserSettings();
  const [activeTab, setActiveTab] = useState('appearance');

  if (!isOpen || !isShopPage || loading || !settings) {
    return null;
  }

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'filters', label: 'Filters', icon: Filter }
  ];

  const handleThemeChange = (theme: 'light' | 'dark' | 'auto') => {
    updateSettings({
      customization: {
        ...settings.customization,
        theme
      }
    });
  };

  const handleLayoutChange = (field: string, value: any) => {
    updateSettings({
      layout: {
        ...settings.layout,
        [field]: value
      }
    });
  };

  const handleCustomizationChange = (field: string, value: any) => {
    updateSettings({
      customization: {
        ...settings.customization,
        [field]: value
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-makhana-600" />
              <h2 className="text-lg font-semibold text-gray-900">Shop Settings</h2>
            </div>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Info Banner */}
          <div className="p-4 bg-makhana-50 border-b">
            <p className="text-sm text-makhana-700">
              <span className="font-medium">Shop Page Only:</span> Changes here only affect your shop page experience
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-makhana-500 text-makhana-600 bg-makhana-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                {/* Theme Selection */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Theme</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'light', label: 'Light', icon: Sun },
                      { value: 'dark', label: 'Dark', icon: Moon },
                      { value: 'auto', label: 'Auto', icon: Monitor }
                    ].map((theme) => {
                      const Icon = theme.icon;
                      return (
                        <button
                          key={theme.value}
                          onClick={() => handleThemeChange(theme.value as 'light' | 'dark' | 'auto')}
                          className={`p-3 border-2 rounded-lg transition-colors ${
                            settings.customization.theme === theme.value
                              ? 'border-makhana-500 bg-makhana-50'
                              : 'border-gray-200 hover:border-makhana-300'
                          }`}
                        >
                          <Icon className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                          <p className="text-xs font-medium">{theme.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Promo Banner */}
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Promo Banner</h3>
                      <p className="text-xs text-gray-600">Show promotional banner on shop page</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.customization.showPromoBanner}
                      onChange={(e) => handleCustomizationChange('showPromoBanner', e.target.checked)}
                      className="w-4 h-4 text-makhana-600 rounded focus:ring-makhana-500"
                    />
                  </div>
                </div>

                {/* Products Per Page */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Products Per Page</h3>
                  <select
                    value={settings.customization.productsPerPage}
                    onChange={(e) => handleCustomizationChange('productsPerPage', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500"
                  >
                    <option value={6}>6 products</option>
                    <option value={12}>12 products</option>
                    <option value={24}>24 products</option>
                    <option value={48}>48 products</option>
                  </select>
                </div>

                {/* Default Sort */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Default Sort</h3>
                  <select
                    value={settings.customization.defaultSortBy}
                    onChange={(e) => handleCustomizationChange('defaultSortBy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name A-Z</option>
                  </select>
                </div>
              </div>
            )}

            {/* Layout Tab */}
            {activeTab === 'layout' && (
              <div className="space-y-6">
                {/* View Mode */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">View Mode</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'grid', label: 'Grid View' },
                      { value: 'list', label: 'List View' }
                    ].map((mode) => (
                      <button
                        key={mode.value}
                        onClick={() => handleLayoutChange('viewMode', mode.value)}
                        className={`p-3 border-2 rounded-lg transition-colors ${
                          settings.layout.viewMode === mode.value
                            ? 'border-makhana-500 bg-makhana-50'
                            : 'border-gray-200 hover:border-makhana-300'
                        }`}
                      >
                        <p className="text-sm font-medium">{mode.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Show Filters */}
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Show Filters</h3>
                      <p className="text-xs text-gray-600">Display filter sidebar</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.layout.showFilters}
                      onChange={(e) => handleLayoutChange('showFilters', e.target.checked)}
                      className="w-4 h-4 text-makhana-600 rounded focus:ring-makhana-500"
                    />
                  </div>
                </div>

                {/* Show Sort Options */}
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Show Sort Options</h3>
                      <p className="text-xs text-gray-600">Display sorting dropdown</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.layout.showSortOptions}
                      onChange={(e) => handleLayoutChange('showSortOptions', e.target.checked)}
                      className="w-4 h-4 text-makhana-600 rounded focus:ring-makhana-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Filters Tab */}
            {activeTab === 'filters' && (
              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Default Price Range</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Min Price</label>
                      <input
                        type="number"
                        value={settings.filters.priceRange.min}
                        onChange={(e) => updateSettings({
                          filters: {
                            ...settings.filters,
                            priceRange: {
                              ...settings.filters.priceRange,
                              min: parseInt(e.target.value) || 0
                            }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Max Price</label>
                      <input
                        type="number"
                        value={settings.filters.priceRange.max}
                        onChange={(e) => updateSettings({
                          filters: {
                            ...settings.filters,
                            priceRange: {
                              ...settings.filters.priceRange,
                              max: parseInt(e.target.value) || 1000
                            }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500"
                        placeholder="1000"
                      />
                    </div>
                  </div>
                </div>

                {/* Availability Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Default Availability</h3>
                  <select
                    value={settings.filters.availability}
                    onChange={(e) => updateSettings({
                      filters: {
                        ...settings.filters,
                        availability: e.target.value as 'all' | 'in-stock' | 'on-sale'
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500"
                  >
                    <option value="all">All Products</option>
                    <option value="in-stock">In Stock Only</option>
                    <option value="on-sale">On Sale Only</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              These settings only affect your shop page experience and won't impact other parts of the website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}