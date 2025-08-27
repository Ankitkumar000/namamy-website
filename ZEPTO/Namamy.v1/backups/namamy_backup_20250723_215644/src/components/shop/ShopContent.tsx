'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Filter, Grid, List, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/ui/ProductCard';
import { ShopFilters } from './ShopFilters';
import { ProductSort } from './ProductSort';
import { SearchBar } from './SearchBar';
import { products, categories, searchProducts } from '@/data/products';
import { Product } from '@/types';

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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('shop');

  // Filter state
  const [filters, setFilters] = useState({
    category: searchParams.category || 'all',
    priceRange: searchParams.price ? searchParams.price.split('-').map(Number) : [0, 1000],
    sortBy: searchParams.sort || 'relevance',
    search: searchParams.search || '',
    inStock: true,
    rating: 0,
  });

  // Apply filters whenever filter state changes
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      const results = searchProducts(filters.search, {
        category: filters.category,
        priceRange: filters.priceRange,
        sortBy: filters.sortBy,
        sortOrder: 'asc',
        inStock: filters.inStock,
        rating: filters.rating,
      });
      
      setFilteredProducts(results);
      setIsLoading(false);
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
            <span>{t('filters')}</span>
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
          <ProductSort
            value={filters.sortBy}
            onChange={(sortBy) => handleFilterChange({ sortBy })}
          />

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
    </div>
  );
}