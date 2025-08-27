'use client';

import { motion } from 'framer-motion';
import { NamamyLogoBanner } from '@/components/ui/NamamyLogo';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface LogoBannerProps {
  locale: string;
}

export function LogoBanner({ locale }: LogoBannerProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-makhana-50 via-white to-organic-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-makhana-200 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-organic-200 rounded-full blur-lg"></div>
        <div className="absolute bottom-40 left-1/3 w-28 h-28 bg-makhana-300 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-organic-300 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Logo Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center"
          >
            <NamamyLogoBanner className="max-w-md w-full hover:scale-105 transition-transform duration-500" />
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-makhana-600">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Premium Quality
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-display font-bold text-gray-900 leading-tight">
                Welcome to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-makhana-600 to-organic-600">
                  Namamy
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Discover our premium collection of fresh, raw makhana (fox nuts) - 
                nature's perfect healthy snack straight from Bihar's finest lotus farms.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>100% Natural</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Premium Grade</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Fresh & Healthy</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href={`/${locale}/shop`}>
                  <Button size="lg" className="group">
                    Shop Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Link href={`/${locale}/about`}>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-lg text-gray-600 mb-4">
            Currently available: Premium Raw Makhana
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
            <span className="bg-gray-100 px-3 py-1 rounded-full">200g Pack</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">₹249 Only</span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">22% Off</span>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-8 text-6xl opacity-20"
      >
        🥜
      </motion.div>
      
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-32 right-8 text-5xl opacity-20"
      >
        🪷
      </motion.div>
    </section>
  );
}