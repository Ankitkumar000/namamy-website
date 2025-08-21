'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Cookie, Candy, Gift, Star, Sparkles, Crown, Heart } from 'lucide-react';
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
    icon: Sparkles,
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
    icon: Crown,
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
    icon: Gift,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
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
                      <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-organic-500 to-makhana-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Popular
                      </div>
                    )}

                    {/* Category Icon Section */}
                    <div className={`relative h-48 ${category.bgColor} flex items-center justify-center overflow-hidden`}>
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] bg-repeat"></div>
                      </div>

                      {/* Hover Effect Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

                      {/* Large Category Icon */}
                      <div className={`relative z-10 w-24 h-24 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl`}>
                        <Icon className="w-12 h-12 text-white" />
                      </div>

                      {/* Decorative Elements */}
                      <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${category.color} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                      <div className={`absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-tr ${category.color} rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                    </div>

                    {/* Content */}
                    <div className="p-6 relative">
                      {/* Background Pattern */}
                      <div className={`absolute inset-0 ${category.bgColor} opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
                      
                      <div className="relative z-10">
                        {/* Category Info */}
                        <div className="flex items-center justify-end mb-2">
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