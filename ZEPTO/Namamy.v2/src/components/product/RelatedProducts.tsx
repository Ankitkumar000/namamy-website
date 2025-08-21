'use client';

import { useTranslations } from 'next-intl';
import { ProductCard } from '@/components/ui/ProductCard';
import { Product } from '@/types';

interface RelatedProductsProps {
  products: Product[];
  locale: string;
}

export function RelatedProducts({ products, locale }: RelatedProductsProps) {
  const t = useTranslations('product');

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
          {t('relatedProducts')}
        </h2>
        <p className="text-gray-600">
          {t('relatedProductsDesc')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            locale={locale}
            variant="default"
          />
        ))}
      </div>
    </section>
  );
}