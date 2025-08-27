'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { X, Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Category } from '@/types';

interface ShopFiltersProps {
  filters: {
    category: string;
    priceRange: number[];
    rating: number;
    inStock: boolean;
  };
  onChange: (filters: any) => void;
  categories: Category[];
  onClose?: () => void;
}

const priceRanges = [
  { label: 'under200', min: 0, max: 200 },
  { label: '200to400', min: 200, max: 400 },
  { label: '400to600', min: 400, max: 600 },
  { label: 'above600', min: 600, max: 1000 },
];

const ratings = [4, 3, 2, 1];

export function ShopFilters({ filters, onChange, categories, onClose }: ShopFiltersProps) {
  const t = useTranslations('shop.filters');
  
  const handleCategoryChange = (categorySlug: string) => {
    onChange({ category: categorySlug });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    onChange({ priceRange: [min, max] });
  };

  const handleRatingChange = (rating: number) => {
    onChange({ rating: filters.rating === rating ? 0 : rating });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{t('title')}</CardTitle>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-semibold text-sm text-gray-900 mb-3">
            {t('categories')}
          </h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="all"
                checked={filters.category === 'all'}
                onChange={() => handleCategoryChange('all')}
                className="sr-only"
              />
              <div className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-colors ${
                filters.category === 'all' 
                  ? 'bg-makhana-50 text-makhana-700' 
                  : 'hover:bg-gray-50'
              }`}>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  filters.category === 'all' 
                    ? 'border-makhana-500 bg-makhana-500' 
                    : 'border-gray-300'
                }`}>
                  {filters.category === 'all' && (
                    <Check className="w-2 h-2 text-white" />
                  )}
                </div>
                <span className="text-sm">{t('allCategories')}</span>
              </div>
            </label>

            {categories.map((category) => (
              <label key={category.id} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category.slug}
                  checked={filters.category === category.slug}
                  onChange={() => handleCategoryChange(category.slug)}
                  className="sr-only"
                />
                <div className={`flex items-center justify-between w-full p-2 rounded-md cursor-pointer transition-colors ${
                  filters.category === category.slug 
                    ? 'bg-makhana-50 text-makhana-700' 
                    : 'hover:bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      filters.category === category.slug 
                        ? 'border-makhana-500 bg-makhana-500' 
                        : 'border-gray-300'
                    }`}>
                      {filters.category === category.slug && (
                        <Check className="w-2 h-2 text-white" />
                      )}
                    </div>
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {category.productsCount}
                  </Badge>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-semibold text-sm text-gray-900 mb-3">
            {t('priceRange')}
          </h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.label} className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  checked={
                    filters.priceRange[0] === range.min && 
                    filters.priceRange[1] === range.max
                  }
                  onChange={() => handlePriceRangeChange(range.min, range.max)}
                  className="sr-only"
                />
                <div className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-colors w-full ${
                  filters.priceRange[0] === range.min && filters.priceRange[1] === range.max
                    ? 'bg-makhana-50 text-makhana-700' 
                    : 'hover:bg-gray-50'
                }`}>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    filters.priceRange[0] === range.min && filters.priceRange[1] === range.max
                      ? 'border-makhana-500 bg-makhana-500' 
                      : 'border-gray-300'
                  }`}>
                    {filters.priceRange[0] === range.min && filters.priceRange[1] === range.max && (
                      <Check className="w-2 h-2 text-white" />
                    )}
                  </div>
                  <span className="text-sm">{t(range.label)}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h3 className="font-semibold text-sm text-gray-900 mb-3">
            {t('customerRating')}
          </h3>
          <div className="space-y-2">
            {ratings.map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.rating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="sr-only"
                />
                <div className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-colors w-full ${
                  filters.rating === rating
                    ? 'bg-makhana-50 text-makhana-700' 
                    : 'hover:bg-gray-50'
                }`}>
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                    filters.rating === rating
                      ? 'border-makhana-500 bg-makhana-500' 
                      : 'border-gray-300'
                  }`}>
                    {filters.rating === rating && (
                      <Check className="w-2 h-2 text-white" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {renderStars(rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {t('andUp')}
                    </span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Stock Status */}
        <div>
          <h3 className="font-semibold text-sm text-gray-900 mb-3">
            {t('availability')}
          </h3>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => onChange({ inStock: e.target.checked })}
              className="sr-only"
            />
            <div className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-colors w-full ${
              filters.inStock
                ? 'bg-makhana-50 text-makhana-700' 
                : 'hover:bg-gray-50'
            }`}>
              <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                filters.inStock
                  ? 'border-makhana-500 bg-makhana-500' 
                  : 'border-gray-300'
              }`}>
                {filters.inStock && (
                  <Check className="w-2 h-2 text-white" />
                )}
              </div>
              <span className="text-sm">{t('inStockOnly')}</span>
            </div>
          </label>
        </div>
      </CardContent>
    </Card>
  );
}