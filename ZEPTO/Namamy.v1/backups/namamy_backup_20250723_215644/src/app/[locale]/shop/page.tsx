import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Layout } from '@/components/layout/Layout';
import { ShopContent } from '@/components/shop/ShopContent';

interface ShopPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    category?: string;
    sort?: string;
    price?: string;
    search?: string;
  };
}

export async function generateMetadata({ params }: ShopPageProps): Promise<Metadata> {
  const { locale } = params;
  
  return {
    title: 'Shop Premium Makhana - Healthy Fox Nuts Online | Namamy',
    description: 'Shop the finest collection of premium makhana (fox nuts) online. Roasted, flavored, and organic varieties available. Free shipping on orders above ₹500.',
    keywords: 'buy makhana online, fox nuts, healthy snacks, premium makhana, roasted makhana, flavored makhana',
    openGraph: {
      title: 'Shop Premium Makhana - Healthy Fox Nuts Online | Namamy',
      description: 'Shop the finest collection of premium makhana (fox nuts) online.',
      images: [
        {
          url: '/images/og-shop.jpg',
          width: 1200,
          height: 630,
          alt: 'Namamy Premium Makhana Collection',
        },
      ],
      locale: locale,
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}/shop`,
      languages: {
        'en': '/en/shop',
        'hi': '/hi/shop',
        'ta': '/ta/shop',
        'bn': '/bn/shop',
      },
    },
  };
}

export default async function ShopPage({ params, searchParams }: ShopPageProps) {
  const { locale } = params;
  const messages = await getMessages();

  const breadcrumbItems = [
    { label: 'Shop', href: '/shop' },
  ];

  // Structured data for shop page
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Shop Premium Makhana',
    description: 'Premium makhana and healthy snacks collection',
    url: `https://namamy.com/${locale}/shop`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: '20+',
      itemListElement: [
        {
          '@type': 'Product',
          name: 'Premium Roasted Makhana',
          url: `https://namamy.com/${locale}/product/premium-roasted-makhana`,
          image: 'https://namamy.com/images/products/roasted-makhana.jpg',
          offers: {
            '@type': 'Offer',
            price: '299',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
          },
        },
      ],
    },
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Layout 
        locale={locale} 
        showBreadcrumb={true} 
        breadcrumbItems={breadcrumbItems}
      >
        <ShopContent locale={locale} searchParams={searchParams} />
      </Layout>
    </NextIntlClientProvider>
  );
}