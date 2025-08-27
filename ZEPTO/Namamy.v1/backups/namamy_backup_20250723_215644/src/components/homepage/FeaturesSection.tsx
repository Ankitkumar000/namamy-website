'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Award, Leaf, Truck, Users, Shield, Heart } from 'lucide-react';
import Image from 'next/image';

interface FeaturesSectionProps {
  locale: string;
}

const features = [
  {
    key: 'highQuality',
    icon: Award,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=400&auto=format&fit=crop',
    color: 'from-amber-500 to-orange-500',
  },
  {
    key: 'healthy',
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1609501676725-7186f5e384a2?q=80&w=400&auto=format&fit=crop',
    color: 'from-green-500 to-emerald-500',
  },
  {
    key: 'fresh',
    icon: Truck,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e531?q=80&w=400&auto=format&fit=crop',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    key: 'sustainable',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=400&auto=format&fit=crop',
    color: 'from-purple-500 to-pink-500',
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
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] bg-repeat"></div>
                  </div>

                  {/* Hover Effect Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                  {/* Feature Image */}
                  <div className="relative mb-6 overflow-hidden rounded-2xl">
                    <Image
                      src={feature.image}
                      alt={t(`${feature.key}.title`)}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Icon Overlay */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {/* Icon */}
                    <div className={`inline-flex w-12 h-12 rounded-full bg-gradient-to-r ${feature.color} items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-900 group-hover:to-gray-700 transition-all duration-300">
                      {t(`${feature.key}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">
                      {t(`${feature.key}.description`)}
                    </p>
                  </div>

                  {/* Decorative Elements */}
                  <div className={`absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  <div className={`absolute -bottom-2 -left-2 w-20 h-20 bg-gradient-to-tr ${feature.color} rounded-full blur-xl opacity-15 group-hover:opacity-25 transition-opacity duration-300`}></div>
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
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-green-600" />
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
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-blue-600" />
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