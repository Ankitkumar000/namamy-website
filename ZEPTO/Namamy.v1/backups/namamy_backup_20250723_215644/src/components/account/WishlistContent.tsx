'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Heart, ShoppingCart, X, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/store/cart';
import { getProducts } from '@/data/products';

interface WishlistContentProps {
  locale: string;
}

// Mock wishlist items (in real app, this would be fetched from user data)
const mockWishlistItems = [
  { id: '1', productId: '1', dateAdded: '2024-01-10' },
  { id: '2', productId: '3', dateAdded: '2024-01-15' },
  { id: '3', productId: '6', dateAdded: '2024-01-20' },
];

export function WishlistContent({ locale }: WishlistContentProps) {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);
  const { addItem } = useCartStore();
  const t = useTranslations('dashboard.wishlist');

  const products = getProducts();
  const wishlistProducts = wishlistItems.map(item => 
    products.find(p => p.id === item.productId)
  ).filter(Boolean);

  const handleRemoveFromWishlist = (itemId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleAddToCart = (product: any) => {
    addItem(product, 1);
    // Show success notification
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-gray-900">
          {t('title')}
        </h2>
        <Card>
          <CardContent className="p-12 text-center">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('empty')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('emptyDesc')}
            </p>
            <Button onClick={() => window.open(`/${locale}/shop`, '_blank')}>
              {t('browsProducts')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-gray-900">
          {t('title')}
        </h2>
        <p className="text-gray-600">
          {wishlistProducts.length} {t('items')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistProducts.map((product, index) => {
          if (!product) return null;
          
          const wishlistItem = wishlistItems.find(item => item.productId === product.id);
          const discountPercentage = product.originalPrice 
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            : 0;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-makhana-100 to-makhana-200 flex items-center justify-center">
                      <span className="text-6xl">🥜</span>
                    </div>
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveFromWishlist(wishlistItem!.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-50 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-600 hover:text-red-600" />
                  </button>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    {product.isNew && (
                      <Badge variant="default" className="bg-green-500">
                        {t('new')}
                      </Badge>
                    )}
                    {discountPercentage > 0 && (
                      <Badge variant="destructive">
                        -{discountPercentage}%
                      </Badge>
                    )}
                  </div>

                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-t-lg">
                      <Badge variant="secondary" className="bg-white text-gray-900">
                        {t('outOfStock')}
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
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
                        per {product.weight}
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  {product.inStock && (
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full"
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {t('addToCart')}
                    </Button>
                  )}

                  {/* Date Added */}
                  <p className="text-xs text-gray-500 text-center mt-2">
                    {t('addedOn')} {new Date(wishlistItem!.dateAdded).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}