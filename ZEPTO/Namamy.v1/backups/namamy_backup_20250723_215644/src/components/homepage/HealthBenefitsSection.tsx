'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Activity, Target, Shield, Zap } from 'lucide-react';
import Image from 'next/image';

interface HealthBenefitsSectionProps {
  locale: string;
}

const benefitIcons = [Activity, Target, Shield, Zap];

export function HealthBenefitsSection({ locale }: HealthBenefitsSectionProps) {
  const t = useTranslations('homepage.healthBenefits');

  const benefits = t.raw('benefits') as Array<{
    title: string;
    description: string;
  }>;

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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="section-padding bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto container-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900">
                {t('title')}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                {t('subtitle')}
              </p>
            </motion.div>

            {/* Benefits List */}
            <motion.div variants={containerVariants} className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefitIcons[index];
                const colors = [
                  'from-red-500 to-orange-500',
                  'from-blue-500 to-cyan-500',
                  'from-green-500 to-emerald-500',
                  'from-purple-500 to-pink-500',
                ];

                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-transparent"
                  >
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-r ${colors[index]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>

                    {/* Decorative Element */}
                    <div className={`absolute top-2 right-2 w-8 h-8 bg-gradient-to-br ${colors[index]} rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Nutrition Stats */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h4 className="font-bold text-gray-900 mb-4 text-center">Nutrition Facts (per 100g)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">347</div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">9.7g</div>
                  <div className="text-sm text-gray-600">Protein</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">14.5g</div>
                  <div className="text-sm text-gray-600">Fiber</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">0.1g</div>
                  <div className="text-sm text-gray-600">Fat</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=600&auto=format&fit=crop"
                  alt="Healthy Makhana Benefits"
                  width={600}
                  height={700}
                  className="w-full h-auto"
                />
              </motion.div>

              {/* Floating Health Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-lg animate-float"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Activity className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Heart Healthy</p>
                    <p className="text-xs text-gray-500">Low in sodium</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-lg animate-float"
                style={{ animationDelay: '2s' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Antioxidant Rich</p>
                    <p className="text-xs text-gray-500">Natural defense</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-white rounded-2xl p-4 shadow-lg animate-float"
                style={{ animationDelay: '4s' }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-6 h-6 text-orange-600" />
                  </div>
                  <p className="font-semibold text-sm">Energy Boost</p>
                  <p className="text-xs text-gray-500">Natural carbs</p>
                </div>
              </motion.div>

              {/* Background Decorative Elements */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full blur-2xl opacity-50"></div>
                <div className="absolute bottom-8 left-8 w-40 h-40 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-full blur-2xl opacity-40"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-orange-200 to-red-300 rounded-full blur-2xl opacity-30"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}