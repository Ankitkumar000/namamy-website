import { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/homepage/HeroSection';
import { FeaturesSection } from '@/components/homepage/FeaturesSection';
import { CategoriesSection } from '@/components/homepage/CategoriesSection';
import { BestSellersSection } from '@/components/homepage/BestSellersSection';
import { HealthBenefitsSection } from '@/components/homepage/HealthBenefitsSection';
import { TestimonialsSection } from '@/components/homepage/TestimonialsSection';
import { NewsletterSection } from '@/components/homepage/NewsletterSection';

interface HomePageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = params;
  
  return {
    title: 'Namamy - Premium Makhana for Healthy Living',
    description: 'Discover the finest quality fox nuts, roasted to perfection and packed with nutrition for your wellness journey. Shop premium makhana online.',
    keywords: 'makhana, fox nuts, healthy snacks, premium snacks, nutrition, wellness, roasted makhana, flavored makhana',
    openGraph: {
      title: 'Namamy - Premium Makhana for Healthy Living',
      description: 'Discover the finest quality fox nuts, roasted to perfection and packed with nutrition for your wellness journey.',
      images: [
        {
          url: '/images/og-homepage.jpg',
          width: 1200,
          height: 630,
          alt: 'Namamy Premium Makhana Collection',
        },
      ],
      locale: locale,
      type: 'website',
      siteName: 'Namamy',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Namamy - Premium Makhana for Healthy Living',
      description: 'Discover the finest quality fox nuts, roasted to perfection and packed with nutrition.',
      images: ['/images/twitter-card.jpg'],
      creator: '@namamy',
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'hi': '/hi',
        'ta': '/ta',
        'bn': '/bn',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = params;

  // Structured data for homepage
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Namamy',
    description: 'Premium makhana and healthy snacks for wellness',
    url: `https://namamy.com/${locale}`,
    logo: 'https://namamy.com/images/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-98765-43210',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Tamil', 'Bengali'],
    },
    sameAs: [
      'https://facebook.com/namamy',
      'https://twitter.com/namamy',
      'https://instagram.com/namamy',
      'https://youtube.com/namamy',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Business Park',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400001',
      addressCountry: 'IN',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1247',
    },
    priceRange: '₹₹',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://namamy.com/${locale}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      <Layout locale={locale}>
        <HeroSection locale={locale} />
        <FeaturesSection locale={locale} />
        <CategoriesSection locale={locale} />
        <BestSellersSection locale={locale} />
        <HealthBenefitsSection locale={locale} />
        <TestimonialsSection locale={locale} />
        <NewsletterSection locale={locale} />
      </Layout>
    </>
  );
}