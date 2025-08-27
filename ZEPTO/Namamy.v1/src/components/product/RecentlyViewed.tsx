'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ProductCard } from '@/components/ui/ProductCard';
import { getProductById } from '@/data/products';
import { Product } from '@/types';

interface RecentlyViewedProps {
  locale: string;
}

export function RecentlyViewed({ locale }: RecentlyViewedProps) {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const t = useTranslations('product');

  useEffect(() => {
    // Check if we're in the browser before accessing localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const recentlyViewed = localStorage.getItem('recentlyViewed');
        if (recentlyViewed) {
          const productIds = JSON.parse(recentlyViewed);
          if (Array.isArray(productIds)) {
            const products = productIds
              .map((id: string) => getProductById(id))
              .filter((product: Product | undefined): product is Product => product !== undefined)
              .slice(0, 4); // Show only 4 recent products
            
            setRecentProducts(products);
          }
        }
      } catch (error) {
        console.error('Error loading recently viewed products:', error);
        // Clear corrupted localStorage data
        try {
          localStorage.removeItem('recentlyViewed');
        } catch (clearError) {
          console.error('Failed to clear corrupted localStorage:', clearError);
        }
      }
    }
  }, []);

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
          {t('recentlyViewed')}
        </h2>
        <p className="text-gray-600">
          {t('recentlyViewedDesc')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            locale={locale}
            variant="compact"
          />
        ))}
      </div>
    </section>
  );
}