'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Cookie, Candy, Gift } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

interface CategoriesSectionProps {
  locale: string;
}

const categories = [
  {
    id: 'roasted',
    name: 'Roasted Makhana',
    description: 'Crispy and crunchy fox nuts roasted to perfection',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=500&auto=format&fit=crop',
    icon: Flame,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    count: '12 Products',
    popular: true,
  },
  {
    id: 'flavored',
    name: 'Flavored Varieties',
    description: 'Exciting flavors that make healthy snacking fun',
    image: 'https://images.unsplash.com/photo-1609501676725-7186f5e384a2?q=80&w=500&auto=format&fit=crop',
    icon: Cookie,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    count: '8 Products',
    popular: false,
  },
  {
    id: 'premium',
    name: 'Premium Collection',
    description: 'Luxury makhana varieties for special occasions',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e531?q=80&w=500&auto=format&fit=crop',
    icon: Candy,
    color: 'from-amber-500 to-yellow-500',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-600',
    count: '6 Products',
    popular: false,
  },
  {
    id: 'gift-packs',
    name: 'Gift Packs',
    description: 'Beautiful gift sets for your loved ones',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=500&auto=format&fit=crop',
    icon: Gift,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    count: '4 Products',
    popular: false,
  },
];

export function CategoriesSection({ locale }: CategoriesSectionProps) {
  const t = useTranslations('homepage.categories');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
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

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto container-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            
            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="group relative"
              >
                <Link href={`/${locale}/shop?category=${category.id}`}>
                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-transparent">
                    {/* Popular Badge */}
                    {category.popular && (
                      <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Popular
                      </div>
                    )}

                    {/* Category Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                      
                      {/* Icon Overlay */}
                      <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <Icon className={`w-6 h-6 ${category.textColor}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 relative">
                      {/* Background Pattern */}
                      <div className={`absolute inset-0 ${category.bgColor} opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
                      
                      <div className="relative z-10">
                        {/* Category Info */}
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-sm font-medium ${category.textColor}`}>
                            {category.count}
                          </span>
                          <ArrowRight className={`w-4 h-4 ${category.textColor} opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300`} />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
                          {category.name}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {category.description}
                        </p>
                      </div>

                      {/* Decorative Element */}
                      <div className={`absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br ${category.color} rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't decide? Explore all products
            </h3>
            <p className="text-gray-600 mb-6">
              Browse our complete collection of premium makhana varieties and find your perfect healthy snack.
            </p>
            <Link href={`/${locale}/shop`}>
              <Button size="lg" className="group">
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