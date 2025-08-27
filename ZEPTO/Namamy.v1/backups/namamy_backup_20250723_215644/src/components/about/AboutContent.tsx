'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { 
  Award, 
  Users, 
  Leaf, 
  Heart, 
  Shield, 
  Truck,
  CheckCircle,
  Target,
  Eye,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface AboutContentProps {
  locale: string;
}

const stats = [
  {
    icon: Users,
    value: '50,000+',
    label: 'happyCustomers',
  },
  {
    icon: Award,
    value: '100%',
    label: 'qualityAssured',
  },
  {
    icon: Leaf,
    value: '500+',
    label: 'farmersSupported',
  },
  {
    icon: Heart,
    value: '1M+',
    label: 'healthySnacksDelivered',
  },
];

const values = [
  {
    icon: Shield,
    title: 'quality',
    description: 'qualityDesc',
  },
  {
    icon: Leaf,
    title: 'sustainability',
    description: 'sustainabilityDesc',
  },
  {
    icon: Heart,
    title: 'health',
    description: 'healthDesc',
  },
  {
    icon: Users,
    title: 'community',
    description: 'communityDesc',
  },
];

const timeline = [
  {
    year: '2020',
    title: 'founded',
    description: 'foundedDesc',
  },
  {
    year: '2021',
    title: 'firstProduct',
    description: 'firstProductDesc',
  },
  {
    year: '2022',
    title: 'expansion',
    description: 'expansionDesc',
  },
  {
    year: '2023',
    title: 'milestone',
    description: 'milestoneDesc',
  },
  {
    year: '2024',
    title: 'innovation',
    description: 'innovationDesc',
  },
];

const certifications = [
  {
    name: 'FSSAI',
    description: 'Food Safety Certified',
    badge: '/images/certifications/fssai.png',
  },
  {
    name: 'ISO 22000',
    description: 'Food Safety Management',
    badge: '/images/certifications/iso.png',
  },
  {
    name: 'Organic India',
    description: 'Organic Certification',
    badge: '/images/certifications/organic.png',
  },
  {
    name: 'Fair Trade',
    description: 'Fair Trade Certified',
    badge: '/images/certifications/fairtrade.png',
  },
];

export function AboutContent({ locale }: AboutContentProps) {
  const t = useTranslations('about');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('hero.subtitle')}
          </p>
          <div className="relative w-full max-w-4xl mx-auto h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/images/about-hero.jpg"
              alt="Namamy Story"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-makhana-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-makhana-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">
                {t(`stats.${stat.label}`)}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
              {t('story.title')}
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>{t('story.paragraph1')}</p>
              <p>{t('story.paragraph2')}</p>
              <p>{t('story.paragraph3')}</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-2xl overflow-hidden"
          >
            <Image
              src="/images/makhana-farm.jpg"
              alt="Makhana Farm"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-makhana-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                  {t('mission.title')}
                </h3>
                <p className="text-gray-600">
                  {t('mission.description')}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-makhana-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                  {t('vision.title')}
                </h3>
                <p className="text-gray-600">
                  {t('vision.description')}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
            {t('values.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('values.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-makhana-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-8 h-8 text-makhana-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t(`values.${value.title}`)}
              </h3>
              <p className="text-gray-600">
                {t(`values.${value.description}`)}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-makhana-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
            {t('timeline.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('timeline.subtitle')}
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-makhana-300 hidden lg:block"></div>
          
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex-col lg:flex-row`}
              >
                <div className="flex-1 lg:text-right lg:pr-8">
                  {index % 2 === 0 && (
                    <Card>
                      <CardContent className="p-6">
                        <Badge variant="secondary" className="mb-2">
                          {item.year}
                        </Badge>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {t(`timeline.${item.title}`)}
                        </h3>
                        <p className="text-gray-600">
                          {t(`timeline.${item.description}`)}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Timeline node */}
                <div className="w-4 h-4 bg-makhana-500 rounded-full border-4 border-white shadow-lg z-10 relative flex-shrink-0 my-4 lg:my-0"></div>

                <div className="flex-1 lg:text-left lg:pl-8">
                  {index % 2 === 1 && (
                    <Card>
                      <CardContent className="p-6">
                        <Badge variant="secondary" className="mb-2">
                          {item.year}
                        </Badge>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {t(`timeline.${item.title}`)}
                        </h3>
                        <p className="text-gray-600">
                          {t(`timeline.${item.description}`)}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
            {t('certifications.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('certifications.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {cert.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {cert.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
            {t('team.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('team.subtitle')}
          </p>
        </div>

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="inline-block">
              <CardContent className="p-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Star className="w-6 h-6 text-makhana-500" />
                  <span className="text-2xl font-display font-bold text-gray-900">
                    {t('team.dedication')}
                  </span>
                  <Star className="w-6 h-6 text-makhana-500" />
                </div>
                <p className="text-gray-600 max-w-md">
                  {t('team.description')}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}