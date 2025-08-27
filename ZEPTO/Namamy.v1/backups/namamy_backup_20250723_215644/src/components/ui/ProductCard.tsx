'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Heart, ShoppingCart, Star, Eye, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Badge } from './Badge';
import { Card, CardContent } from './Card';
import { useCartStore } from '@/store/cart';
import { Product } from '@/types';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  locale: string;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
  showQuickAdd?: boolean;
  showWishlist?: boolean;
}

export function ProductCard({
  product,
  locale,
  variant = 'default',
  className,
  showQuickAdd = true,
  showWishlist = true,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addItem } = useCartStore();
  const t = useTranslations('product');

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    
    try {
      addItem(product, 1);
      // Add toast notification here
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    // Add wishlist logic here
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'w-4 h-4',
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        )}
      />
    ));
  };

  if (variant === 'compact') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className={cn('group', className)}
      >
        <Link href={`/${locale}/product/${product.slug}`}>
          <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-square">
              <Image
                src={product.images[0]?.url || '/images/placeholder-product.jpg'}
                alt={product.images[0]?.alt || product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <Badge variant="secondary" className="bg-white text-gray-900">
                    {t('outOfStock')}
                  </Badge>
                </div>
              )}
            </div>
            <CardContent className="p-3">
              <h3 className="font-medium text-sm line-clamp-2 mb-1">
                {product.name}
              </h3>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-makhana-600">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={cn('group', className)}
    >
      <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
        <div className="relative">
          <Link href={`/${locale}/product/${product.slug}`}>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.images[0]?.url || '/images/placeholder-product.jpg'}
                alt={product.images[0]?.alt || product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay with quick actions */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                  <Button size="sm" variant="secondary" className="rounded-full">
                    <Eye className="w-4 h-4" />
                  </Button>
                  {showWishlist && (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full"
                      onClick={handleWishlistToggle}
                    >
                      <Heart
                        className={cn(
                          'w-4 h-4',
                          isWishlisted ? 'fill-current text-red-500' : ''
                        )}
                      />
                    </Button>
                  )}
                </div>
              </div>

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col space-y-2">
                {product.isNew && (
                  <Badge variant="default" className="bg-green-500">
                    {t('new')}
                  </Badge>
                )}
                {product.isBestSeller && (
                  <Badge variant="default" className="bg-orange-500">
                    <Zap className="w-3 h-3 mr-1" />
                    {t('bestSeller')}
                  </Badge>
                )}
                {discountPercentage > 0 && (
                  <Badge variant="destructive">
                    -{discountPercentage}%
                  </Badge>
                )}
              </div>

              {!product.inStock && (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                  <Badge variant="secondary" className="bg-white text-gray-900 px-4 py-2">
                    {t('outOfStock')}
                  </Badge>
                </div>
              )}
            </div>
          </Link>
        </div>

        <CardContent className="p-4">
          <Link href={`/${locale}/product/${product.slug}`}>
            <div className="mb-2">
              <Badge variant="outline" className="text-xs mb-2">
                {product.category}
              </Badge>
              <h3 className="font-semibold text-lg line-clamp-2 hover:text-makhana-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                {product.shortDescription}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-600">
                ({product.totalReviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-xl text-makhana-600">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {t('per')} {product.weight}
                </span>
              </div>
            </div>
          </Link>

          {/* Add to Cart Button */}
          {showQuickAdd && product.inStock && (
            <Button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="w-full"
              size="sm"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <ShoppingCart className="w-4 h-4 mr-2" />
              )}
              {t('addToCart')}
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}