'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ShoppingBag, Play, Star, Users, Award, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

interface HeroSectionProps {
  locale: string;
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations('homepage.hero');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const trustStats = [
    { icon: Users, value: '50,000+', label: 'Happy Customers' },
    { icon: Award, value: '4.8/5', label: 'Customer Rating' },
    { icon: Leaf, value: '100%', label: 'Natural & Pure' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-organic-50 via-white to-makhana-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/patterns/makhana-pattern.svg')] bg-repeat opacity-20"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-organic-200 rounded-full blur-xl animate-float opacity-60"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-makhana-200 rounded-full blur-xl animate-float opacity-40" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-earth-200 rounded-full blur-xl animate-float opacity-50" style={{ animationDelay: '4s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-makhana-100 text-makhana-800 px-4 py-2 rounded-full text-sm font-medium"
            >
              <Star className="w-4 h-4 fill-current" />
              <span>Premium Quality Guaranteed</span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight"
              >
                <span className="text-gradient">{t('title')}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl"
              >
                {t('subtitle')}
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start"
            >
              <Link href={`/${locale}/shop`}>
                <Button size="lg" className="group w-full sm:w-auto shadow-glow hover:shadow-glow-lg transition-all duration-300">
                  <ShoppingBag className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  {t('cta')}
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                disabled
                className="w-full sm:w-auto opacity-50 cursor-not-allowed border-2"
              >
                <Play className="w-5 h-5 mr-2" />
                {t('watchVideo')}
              </Button>

            </motion.div>

            {/* Trust Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200"
            >
              {trustStats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                    <stat.icon className="w-4 h-4 text-makhana-600" />
                    <span className="text-xl font-bold text-gray-900">{stat.value}</span>
                  </div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Trust Badge */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-sm text-gray-500 flex items-center justify-center lg:justify-start gap-2"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-makhana-200 border-2 border-white"></div>
                ))}
              </div>
              {t('trustBadge')}
            </motion.p>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative max-w-md mx-auto">
              {/* Main Product Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative z-10"
              >
                <Image
                  src="/images/products/makhana-1.jpg"
                  alt="Premium Namamy Makhana Collection"
                  width={400}
                  height={600}
                  className="w-full h-auto rounded-3xl shadow-2xl"
                  priority
                />
                
                {/* Floating Product Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-lg glass-effect animate-float"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-makhana-100 rounded-full flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-makhana-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">100% Natural</p>
                      <p className="text-xs text-gray-500">No Preservatives</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-lg glass-effect animate-float"
                  style={{ animationDelay: '2s' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">4.8/5 Rating</p>
                      <p className="text-xs text-gray-500">1,247 Reviews</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Background Decorative Elements */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-makhana-200 to-makhana-300 rounded-full blur-2xl opacity-50"></div>
                <div className="absolute bottom-8 left-8 w-40 h-40 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full blur-2xl opacity-40"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsVideoPlaying(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-2xl p-2 max-w-4xl w-full aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Namamy Story Video"
              className="w-full h-full rounded-xl"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}