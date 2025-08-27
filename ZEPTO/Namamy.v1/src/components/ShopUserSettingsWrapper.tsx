'use client';

import { useEffect, useState, createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';

interface ShopUserSettings {
  customization: {
    theme: 'light' | 'dark' | 'auto';
    showPromoBanner: boolean;
    featuredCategories: string[];
    productsPerPage: number;
    defaultSortBy: 'price-low' | 'price-high' | 'name' | 'newest';
  };
  filters: {
    priceRange: { min: number; max: number };
    categories: string[];
    availability: 'all' | 'in-stock' | 'on-sale';
  };
  layout: {
    viewMode: 'grid' | 'list';
    showFilters: boolean;
    showSortOptions: boolean;
  };
}

interface ShopUserSettingsContextType {
  settings: ShopUserSettings | null;
  updateSettings: (newSettings: Partial<ShopUserSettings>) => Promise<void>;
  loading: boolean;
  isShopPage: boolean;
}

const ShopUserSettingsContext = createContext<ShopUserSettingsContextType>({
  settings: null,
  updateSettings: async () => {},
  loading: true,
  isShopPage: false
});

export const useShopUserSettings = () => {
  const context = useContext(ShopUserSettingsContext);
  if (!context) {
    throw new Error('useShopUserSettings must be used within ShopUserSettingsWrapper');
  }
  return context;
};

interface ShopUserSettingsWrapperProps {
  children: React.ReactNode;
}

export function ShopUserSettingsWrapper({ children }: ShopUserSettingsWrapperProps) {
  const [settings, setSettings] = useState<ShopUserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  
  // Check if current page is shop page
  const isShopPage = pathname.includes('/shop');

  useEffect(() => {
    // Only load user settings if we're on the shop page
    if (!isShopPage) {
      setLoading(false);
      return;
    }

    const fetchUserSettings = async () => {
      try {
        const response = await fetch('/api/user-settings');
        const data = await response.json();
        if (data.success) {
          setSettings(data.settings.shopPageOnly);
        }
      } catch (error) {
        console.error('Failed to fetch user settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSettings();
  }, [isShopPage]);

  const updateSettings = async (newSettings: Partial<ShopUserSettings>) => {
    if (!isShopPage) {
      console.warn('User settings can only be updated on shop page');
      return;
    }

    try {
      const updatedSettings = {
        ...settings,
        ...newSettings
      };

      const response = await fetch('/api/user-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shopPageOnly: updatedSettings
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSettings(data.settings.shopPageOnly);
        console.log('Shop page settings updated successfully');
      } else {
        console.error('Failed to update shop settings:', data.error);
      }
    } catch (error) {
      console.error('Error updating shop settings:', error);
    }
  };

  const contextValue: ShopUserSettingsContextType = {
    settings,
    updateSettings,
    loading,
    isShopPage
  };

  return (
    <ShopUserSettingsContext.Provider value={contextValue}>
      {isShopPage && settings && (
        <div 
          className={`shop-user-settings ${settings.customization.theme === 'dark' ? 'dark' : ''}`}
          data-shop-theme={settings.customization.theme}
          data-view-mode={settings.layout.viewMode}
        >
          {children}
        </div>
      )}
      {(!isShopPage || !settings) && children}
    </ShopUserSettingsContext.Provider>
  );
}