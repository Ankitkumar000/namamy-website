'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  category: string;
  subcategory?: string;
  tags: string[];
  weight: string;
  images: string[];
  inStock: boolean;
  stockCount: number;
  nutrition: any;
  ingredients: string[];
  featured: boolean;
}

interface BestSellersSectionProps {
  locale: string;
}

export function BestSellersSection({ locale }: BestSellersSectionProps) {
  const t = useTranslations('homepage.products');
  const tCommon = useTranslations('common');
  const addItem = useCartStore((state) => state.addItem);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        // Get featured products or first 6 products
        const bestSellingProducts = data.products
          .filter((product: Product) => product.featured || product.inStock)
          .slice(0, 6);
        setProducts(bestSellingProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-makhana-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  const bestSellingProducts = products;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const handleQuickAdd = (product: any) => {
    addItem(product, 1);
  };

  const handleBuyNow = (product: any) => {
    addItem(product, 1);
    window.location.href = `/${locale}/checkout`;
  };

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            {tCommon('bestSeller')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {bestSellingProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group relative"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-transparent">
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.images[0] || '/images/products/placeholder.jpg'}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.featured && (
                      <Badge className="bg-gradient-to-r from-organic-500 to-makhana-500 text-white">
                        Best Seller
                      </Badge>
                    )}
                    {false && (
                      <Badge variant="secondary">
                        {tCommon('new')}
                      </Badge>
                    )}
                    {product.comparePrice && product.comparePrice > product.price && (
                      <Badge className="bg-organic-500 text-white">
                        {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
                      </Badge>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                      <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
                    </button>
                    <Link href={`/${locale}/product/${product.slug}`}>
                      <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                        <Eye className="w-5 h-5 text-gray-600 hover:text-blue-500 transition-colors" />
                      </button>
                    </Link>
                  </div>

                  {/* Stock Status */}
                  <div className="absolute bottom-4 left-4">
                    <Badge 
                      variant={product.inStock ? "secondary" : "outline"}
                      className={product.inStock ? "bg-organic-100 text-organic-700" : "bg-red-100 text-red-700"}
                    >
                      {product.inStock ? tCommon('inStock') : tCommon('outOfStock')}
                    </Badge>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(4.5)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {4.5} ({25} reviews)
                    </span>
                  </div>

                  {/* Product Name */}
                  <Link href={`/${locale}/product/${product.slug}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-makhana-600 group-hover:to-makhana-800">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.comparePrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.comparePrice)}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {product.weight}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  {product.inStock ? (
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleQuickAdd(product)}
                          className="flex-1 group"
                          variant="outline"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                          {tCommon('addToCart')}
                        </Button>
                        <Button
                          onClick={() => handleBuyNow(product)}
                          className="flex-1 group"
                        >
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      disabled
                      className="w-full"
                      variant="outline"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {tCommon('outOfStock')}
                    </Button>
                  )}
                </div>

                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-organic-500/5 to-makhana-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-organic-50 to-makhana-50 rounded-3xl p-8 max-w-2xl mx-auto border border-organic-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Discover More Healthy Options
            </h3>
            <p className="text-gray-600 mb-6">
              Explore our complete collection of premium makhana varieties, each crafted with care for your wellness journey.
            </p>
            <Link href={`/${locale}/shop`}>
              <Button size="lg" className="group shadow-glow">
                <span>View All Products</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}