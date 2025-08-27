'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Award, Leaf, Truck, Users, Shield, Heart, Star, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface FeaturesSectionProps {
  locale: string;
}

const features = [
  {
    key: 'highQuality',
    icon: Star,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    key: 'healthy',
    icon: Leaf,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    key: 'fresh',
    icon: Sparkles,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    key: 'sustainable',
    icon: Heart,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
];

export function FeaturesSection({ locale }: FeaturesSectionProps) {
  const t = useTranslations('homepage.features');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
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
    <section className="section-padding bg-gradient-to-b from-white to-gray-50">
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

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={feature.key}
                variants={itemVariants}
                className="group relative"
              >
                <div className={`relative ${feature.bgColor} rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-white/50 overflow-hidden group-hover:scale-105`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] bg-repeat"></div>
                  </div>

                  {/* Hover Effect Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {/* Large Icon */}
                    <div className={`inline-flex w-20 h-20 rounded-full bg-gradient-to-r ${feature.color} items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-900 group-hover:to-gray-700 transition-all duration-300">
                      {t(`${feature.key}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {t(`${feature.key}.description`)}
                    </p>
                  </div>

                  {/* Decorative Elements */}
                  <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${feature.color} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                  <div className={`absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr ${feature.color} rounded-full blur-2xl opacity-15 group-hover:opacity-30 transition-opacity duration-500`}></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Trust Elements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
            {/* Trust Badge 1 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-organic-100 flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-organic-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Food Safety Certified</h4>
              <p className="text-sm text-gray-600">FSSAI approved processing facilities</p>
            </div>

            {/* Trust Badge 2 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Health First Approach</h4>
              <p className="text-sm text-gray-600">Nutritionist recommended & tested</p>
            </div>

            {/* Trust Badge 3 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-makhana-100 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-makhana-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Customer Satisfaction</h4>
              <p className="text-sm text-gray-600">99% positive feedback rating</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}