'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { 
  Heart, 
  Share2, 
  Star, 
  ShoppingCart, 
  Truck, 
  Shield, 
  RotateCcw,
  Plus,
  Minus,
  Check,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useCartStore } from '@/store/cart';
import { Product } from '@/types';
import { cn } from '@/lib/utils';

interface ProductDetailsProps {
  product: Product;
  locale: string;
}

const features = [
  {
    icon: Truck,
    title: 'freeDelivery',
    description: 'freeDeliveryDesc',
  },
  {
    icon: Shield,
    title: 'qualityAssured',
    description: 'qualityAssuredDesc',
  },
  {
    icon: RotateCcw,
    title: 'easyReturns',
    description: 'easyReturnsDesc',
  },
];

export function ProductDetails({ product, locale }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  
  const { addItem } = useCartStore();
  const t = useTranslations('product');

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      addItem(product, quantity);
      // Show success notification
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    // Add to cart first
    addItem(product, quantity);
    // Then redirect to checkout
    window.location.href = `/${locale}/checkout`;
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    // Add wishlist logic here
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'w-5 h-5',
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        )}
      />
    ));
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.images && product.images.length > 0 ? product.images[selectedImage]?.url || product.images[0]?.url : '/images/placeholder-product.jpg'}
              alt={product.images && product.images.length > 0 ? product.images[selectedImage]?.alt || product.images[0]?.alt || product.name : product.name}
              fill
              className="object-cover"
              priority
              onError={(e) => {
                console.log('Image failed to load:', e.currentTarget.src);
                e.currentTarget.src = '/images/placeholder-product.jpg';
              }}
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col space-y-2">
              {product.isNew && (
                <Badge variant="default" className="bg-green-500">
                  {t('new')}
                </Badge>
              )}
              {product.isBestSeller && (
                <Badge variant="default" className="bg-orange-500">
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
                <Badge variant="secondary" className="bg-white text-gray-900 px-6 py-3 text-lg">
                  {t('outOfStock')}
                </Badge>
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors',
                    selectedImage === index
                      ? 'border-makhana-500'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      console.log('Thumbnail failed to load:', e.currentTarget.src);
                      e.currentTarget.src = '/images/placeholder-product.jpg';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <Badge variant="outline" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-lg text-gray-600">
              {product.shortDescription}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {renderStars(product.rating)}
              <span className="ml-2 text-sm font-medium text-gray-900">
                {product.rating}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              ({product.totalReviews} {t('reviews')})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-makhana-600">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.originalPrice}
                </span>
                <Badge variant="destructive">
                  Save ₹{product.originalPrice - product.price}
                </Badge>
              </>
            )}
          </div>

          <div className="text-sm text-gray-600">
            {t('price')} {product.weight} • {t('inclusive')}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            {product.inStock ? (
              <>
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-green-600 font-medium">
                  {t('inStock')} ({product.stockQuantity} {t('available')})
                </span>
              </>
            ) : (
              <>
                <X className="w-5 h-5 text-red-500" />
                <span className="text-red-600 font-medium">
                  {t('outOfStock')}
                </span>
              </>
            )}
          </div>

          {/* Quantity & Add to Cart */}
          {product.inStock && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium">{t('quantity')}:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.stockQuantity}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex space-x-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="flex-1"
                    size="lg"
                    variant="outline"
                  >
                    {isAddingToCart ? (
                      <div className="w-5 h-5 border-2 border-makhana-600 border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <ShoppingCart className="w-5 h-5 mr-2" />
                    )}
                    {t('addToCart')}
                  </Button>
                  
                  <Button
                    onClick={handleBuyNow}
                    className="flex-1"
                    size="lg"
                  >
                    Buy Now
                  </Button>
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleWishlistToggle}
                    className={cn(
                      'flex-1',
                      isWishlisted && 'text-red-500 border-red-500'
                    )}
                  >
                    <Heart className={cn(
                      'w-5 h-5 mr-2',
                      isWishlisted && 'fill-current'
                    )} />
                    Wishlist
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleShare}
                    className="flex-1"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-makhana-100 rounded-full flex items-center justify-center">
                  <feature.icon className="w-4 h-4 text-makhana-600" />
                </div>
                <div>
                  <span className="font-medium text-sm">
                    {t(`features.${feature.title}`)}
                  </span>
                  <p className="text-sm text-gray-600">
                    {t(`features.${feature.description}`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {['description', 'nutrition', 'ingredients', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                  activeTab === tab
                    ? 'border-makhana-500 text-makhana-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                {t(`tabs.${tab}`)}
              </button>
            ))}
          </nav>
        </div>

        <div className="py-8">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.description}
              </p>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {t('details.weight')}
                  </h3>
                  <p className="text-gray-600">{product.weight}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {t('details.sku')}
                  </h3>
                  <p className="text-gray-600">{product.sku}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {t('details.shelfLife')}
                  </h3>
                  <p className="text-gray-600">{product.shelfLife}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {t('details.storage')}
                  </h3>
                  <p className="text-gray-600">{product.storageInstructions}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('nutrition.basic')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t('nutrition.calories')}</span>
                    <span className="font-medium">{product.nutritionInfo.calories}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('nutrition.protein')}</span>
                    <span className="font-medium">{product.nutritionInfo.protein}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('nutrition.totalFat')}</span>
                    <span className="font-medium">{product.nutritionInfo.totalFat}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('nutrition.carbs')}</span>
                    <span className="font-medium">{product.nutritionInfo.totalCarbohydrates}g</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('nutrition.minerals')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t('nutrition.calcium')}</span>
                    <span className="font-medium">{product.nutritionInfo.calcium}mg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('nutrition.iron')}</span>
                    <span className="font-medium">{product.nutritionInfo.iron}mg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('nutrition.potassium')}</span>
                    <span className="font-medium">{product.nutritionInfo.potassium}mg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('nutrition.sodium')}</span>
                    <span className="font-medium">{product.nutritionInfo.sodium}mg</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('nutrition.other')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t('nutrition.fiber')}</span>
                    <span className="font-medium">{product.nutritionInfo.dietaryFiber}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('nutrition.sugars')}</span>
                    <span className="font-medium">{product.nutritionInfo.totalSugars}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('nutrition.cholesterol')}</span>
                    <span className="font-medium">{product.nutritionInfo.cholesterol}mg</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-4">
                {t('ingredientsList')}
              </h3>
              <ul className="space-y-2">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
              
              {product.allergens.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {t('allergens')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.allergens.map((allergen, index) => (
                      <Badge key={index} variant="outline" className="text-red-600 border-red-200">
                        {allergen}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Customer Reviews
                </h3>
                <p className="text-gray-600 mb-6">
                  Share your experience with this product
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="bg-makhana-600 hover:bg-makhana-700 text-white"
                    onClick={() => window.location.href = `/${locale}/reviews`}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Write a Review
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = `/${locale}/reviews`}
                  >
                    View All Reviews
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}