import { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { AboutContent } from '@/components/about/AboutContent';

interface AboutPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = params;
  
  return {
    title: 'About Namamy - Premium Makhana Brand | Our Story',
    description: 'Learn about Namamy\'s journey in bringing premium quality makhana (fox nuts) from the lotus farms of Bihar to your table. Discover our commitment to health, quality, and sustainability.',
    keywords: 'about namamy, makhana brand, fox nuts company, healthy snacks, premium quality, bihar lotus farms',
    openGraph: {
      title: 'About Namamy - Premium Makhana Brand',
      description: 'Learn about our journey in bringing premium quality makhana to your table.',
      images: [
        {
          url: '/images/about-hero.jpg',
          width: 1200,
          height: 630,
          alt: 'About Namamy - Premium Makhana Brand',
        },
      ],
      locale: locale,
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        'en': '/en/about',
        'hi': '/hi/about',
        'ta': '/ta/about',
        'bn': '/bn/about',
      },
    },
  };
}

export default function AboutPage({ params }: AboutPageProps) {
  const { locale } = params;

  const breadcrumbItems = [
    { label: 'About Us' },
  ];

  // Structured data for About page
  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Namamy',
    description: 'Learn about Namamy\'s journey in bringing premium quality makhana from Bihar to your table.',
    url: `https://namamy.com/${locale}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: 'Namamy',
      description: 'Premium makhana and healthy snacks brand',
      foundingDate: '2020',
      founder: {
        '@type': 'Person',
        name: 'Namamy Founders',
      },
      location: {
        '@type': 'Place',
        name: 'Bihar, India',
      },
      mission: 'To provide premium quality, healthy and delicious makhana snacks while supporting local farmers.',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      
      <Layout 
        locale={locale} 
        showBreadcrumb={true} 
        breadcrumbItems={breadcrumbItems}
      >
        <AboutContent locale={locale} />
      </Layout>
    </>
  );
}