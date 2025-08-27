'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Filter, Grid, List, SlidersHorizontal, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/ui/ProductCard';
import { ShopFilters } from './ShopFilters';
import { ProductSort } from './ProductSort';
import { SearchBar } from './SearchBar';
import { ShopUserSettingsPanel } from './ShopUserSettingsPanel';
import { useShopUserSettings } from '@/components/ShopUserSettingsWrapper';
import { Product, Category } from '@/types';

interface ShopContentProps {
  locale: string;
  searchParams: {
    category?: string;
    sort?: string;
    price?: string;
    search?: string;
  };
}

export function ShopContent({ locale, searchParams }: ShopContentProps) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [showUserSettings, setShowUserSettings] = useState(false);
  const { settings: userSettings, isShopPage } = useShopUserSettings();
  const t = useTranslations('shop');

  // Initialize filters based on user settings or search params
  const [filters, setFilters] = useState(() => {
    const defaultSortBy = userSettings?.customization.defaultSortBy || 'newest';
    const defaultPriceRange = userSettings?.filters.priceRange || { min: 0, max: 1000 };
    
    return {
      category: searchParams.category || 'all',
      priceRange: searchParams.price ? 
        searchParams.price.split('-').map(Number) : 
        [defaultPriceRange.min, defaultPriceRange.max],
      sortBy: searchParams.sort || defaultSortBy,
      search: searchParams.search || '',
      inStock: true,
      rating: 0,
    };
  });

  // Update view mode and filters based on user settings
  useEffect(() => {
    if (userSettings?.layout.viewMode) {
      setViewMode(userSettings.layout.viewMode);
    }
    if (userSettings?.layout.showFilters !== undefined) {
      setShowFilters(userSettings.layout.showFilters);
    }
  }, [userSettings]);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      
      if (filters.category && filters.category !== 'all') {
        params.append('category', filters.category);
      }
      if (filters.search) {
        params.append('search', filters.search);
      }
      if (filters.inStock) {
        params.append('inStock', 'true');
      }
      
      const response = await fetch(`/api/products?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Expected JSON response but got:', contentType);
        throw new Error('Invalid response format');
      }
      
      const data = await response.json();
      
      if (data.products && Array.isArray(data.products)) {
        let products = data.products.filter((p: Product) => p && typeof p.price === 'number');
        
        // Apply client-side filters
        if (filters.priceRange) {
          const [min, max] = filters.priceRange;
          products = products.filter((p: Product) => p.price >= min && p.price <= max);
        }
        
        if (filters.rating > 0) {
          products = products.filter((p: Product) => p.rating >= filters.rating);
        }
        
        // Apply sorting
        if (filters.sortBy) {
          products.sort((a: Product, b: Product) => {
            switch (filters.sortBy) {
              case 'price':
                return a.price - b.price;
              case 'rating':
                return b.rating - a.rating;
              case 'name':
                return a.name.localeCompare(b.name);
              case 'newest':
                return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
              default:
                return 0;
            }
          });
        }
        
        setAllProducts(data.products);
        setFilteredProducts(products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch categories from products
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/products');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Expected JSON response but got:', contentType);
        throw new Error('Invalid response format');
      }
      
      const data = await response.json();
      
      if (data.products && Array.isArray(data.products)) {
        const validProducts = data.products.filter((p: Product) => p && p.category);
        const uniqueCategories = (Array.from(
          new Set(validProducts.map((p: Product) => p.category))
        ) as string[]).filter(cat => cat && cat.trim()).map((cat: string, index: number) => ({
          id: (index + 1).toString(),
          name: cat,
          slug: cat.toLowerCase(),
          productsCount: validProducts.filter((p: Product) => p.category === cat).length,
          isActive: true,
          sortOrder: index + 1
        }));
        
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Load data on mount and when filters change
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300); // Debounce search

    return () => clearTimeout(timer);
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      priceRange: [0, 1000],
      sortBy: 'relevance',
      search: '',
      inStock: true,
      rating: 0,
    });
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.category !== 'all') count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++;
    if (filters.rating > 0) count++;
    return count;
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Promo Banner - Only shown based on user settings */}
      {userSettings?.customization.showPromoBanner && (
        <div className="mb-6 bg-gradient-to-r from-makhana-100 to-organic-100 border border-makhana-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-makhana-800">Limited Time Offer!</h3>
              <p className="text-xs text-makhana-700">Free shipping on orders above ₹500. Use code: FREESHIP</p>
            </div>
            <div className="text-xs font-medium text-makhana-600 bg-white px-2 py-1 rounded">
              Save ₹50
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          {t('description')}
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          value={filters.search}
          onChange={(search) => handleFilterChange({ search })}
          placeholder={t('searchPlaceholder')}
        />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center space-x-4">
          {/* Filter Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{t('filtersButton')}</span>
            {activeFiltersCount > 0 && (
              <span className="bg-makhana-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <Button variant="ghost" onClick={clearFilters} size="sm">
              <X className="w-4 h-4 mr-1" />
              {t('clearFilters')}
            </Button>
          )}

          {/* Results Count */}
          <span className="text-sm text-gray-600">
            {t('resultsCount', { count: filteredProducts.length })}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {/* Sort */}
          {(!userSettings?.layout.showSortOptions || userSettings.layout.showSortOptions) && (
            <ProductSort
              value={filters.sortBy}
              onChange={(sortBy) => handleFilterChange({ sortBy })}
            />
          )}

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          {/* User Settings */}
          {isShopPage && (
            <Button
              variant="outline"
              onClick={() => setShowUserSettings(true)}
              className="flex items-center space-x-2"
              title="Shop Page Settings"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          )}
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside
          className={`${
            showFilters ? 'block' : 'hidden'
          } lg:block w-full lg:w-64 flex-shrink-0`}
        >
          <div className="sticky top-24">
            <ShopFilters
              filters={filters}
              onChange={handleFilterChange}
              categories={categories}
              onClose={() => setShowFilters(false)}
            />
          </div>
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-8 h-8 border-4 border-makhana-200 border-t-makhana-600 rounded-full animate-spin"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Filter className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('noProductsFound')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('noProductsDescription')}
              </p>
              <Button onClick={clearFilters}>
                {t('clearFilters')}
              </Button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-6'
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  locale={locale}
                  variant={viewMode === 'list' ? 'compact' : 'default'}
                />
              ))}
            </div>
          )}

          {/* Load More Button */}
          {filteredProducts.length > 0 && filteredProducts.length >= 12 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                {t('loadMore')}
              </Button>
            </div>
          )}
        </main>
      </div>

      {/* User Settings Panel */}
      <ShopUserSettingsPanel
        isOpen={showUserSettings}
        onClose={() => setShowUserSettings(false)}
      />
    </div>
  );
}