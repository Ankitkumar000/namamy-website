import { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/homepage/HeroSection';
import { FeaturesSection } from '@/components/homepage/FeaturesSection';
import { CategoriesSection } from '@/components/homepage/CategoriesSection';
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
  
  const titles = {
    en: 'Buy Premium Makhana Online India | Roasted Fox Nuts | Namamy',
    hi: 'प्रीमियम मखाना ऑनलाइन खरीदें | भुने हुए फॉक्स नट्स | नामामी',
    ta: 'முதல்தர மகானா ஆன்லைன் வாங்கவும் | வறுக்கப்பட்ட ஃபாக்ஸ் நட்ஸ் | நாமாமி',
    bn: 'প্রিমিয়াম মাখানা অনলাইন কিনুন | ভাজা ফক্স নাট | নামামি'
  };

  const descriptions = {
    en: 'Buy premium quality makhana (fox nuts) online in India. Free delivery, best prices, roasted & flavored varieties. Rich in protein, perfect for healthy snacking. Order now!',
    hi: 'भारत में प्रीमियम गुणवत्ता वाले मखाना (फॉक्स नट्स) ऑनलाइन खरीदें। मुफ्त डिलीवरी, सबसे अच्छी कीमतें, भुने हुए और स्वादिष्ट किस्में।',
    ta: 'இந்தியாவில் முதல்தர மகானா (ஃபாக்ஸ் நட்ஸ்) ஆன்லைன் வாங்கவும். இலவச டெலிவரி, சிறந்த விலைகள், வறுக்கப்பட்ட வகைகள்।',
    bn: 'ভারতে প্রিমিয়াম মানের মাখানা (ফক্স নাট) অনলাইন কিনুন। বিনামূল্যে ডেলিভারি, সেরা দাম, ভাজা ও স্বাদযুক্ত জাত।'
  };
  
  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: [
      'makhana online buy',
      'fox nuts India',
      'healthy snacks online',
      'roasted makhana price',
      'premium makhana brand',
      'protein snacks India',
      'diet food online',
      'lotus seeds buy',
      'namamy makhana',
      'makhana home delivery',
      'organic snacks India',
      'low calorie snacks'
    ],
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      type: 'website',
      locale: locale === 'en' ? 'en_IN' : `${locale}_IN`,
      url: `https://namamy.com/${locale}`,
      siteName: 'Namamy',
      images: [
        {
          url: '/images/namamy-logo-banner.jpg',
          width: 1200,
          height: 630,
          alt: 'Namamy Premium Makhana Collection',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      images: ['/images/namamy-logo-banner.jpg'],
      creator: '@namamy',
    },
    alternates: {
      canonical: `https://namamy.com/${locale}`,
      languages: {
        'en-IN': 'https://namamy.com/en',
        'hi-IN': 'https://namamy.com/hi',
        'ta-IN': 'https://namamy.com/ta',
        'bn-IN': 'https://namamy.com/bn',
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
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://namamy.com/#organization',
    name: 'Namamy',
    description: 'Premium makhana (fox nuts) manufacturer and online retailer specializing in healthy, protein-rich snacks',
    url: `https://namamy.com/${locale}`,
    logo: {
      '@type': 'ImageObject',
      url: 'https://namamy.com/images/namamy-logo-banner.jpg',
      width: 1200,
      height: 630
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-98765-43210',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Tamil', 'Bengali'],
      email: 'support@namamy.com'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Business Park',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400001',
      addressCountry: 'IN',
    },
    foundingDate: '2020',
    sameAs: [
      'https://facebook.com/namamy',
      'https://twitter.com/namamy',
      'https://instagram.com/namamy',
      'https://youtube.com/namamy',
    ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      <Layout locale={locale}>
        <HeroSection locale={locale} />
        <FeaturesSection locale={locale} />
        <CategoriesSection locale={locale} />
        <HealthBenefitsSection locale={locale} />
        <TestimonialsSection locale={locale} />
        <NewsletterSection locale={locale} />
      </Layout>
    </>
  );
}