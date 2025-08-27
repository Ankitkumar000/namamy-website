import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Layout } from '@/components/layout/Layout';
import { ShopContent } from '@/components/shop/ShopContent';
import { ShopUserSettingsWrapper } from '@/components/ShopUserSettingsWrapper';

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

export async function generateMetadata({ params, searchParams }: ShopPageProps): Promise<Metadata> {
  const { locale } = params;
  const { category, search } = searchParams;
  
  const baseTitle = 'Shop Premium Makhana Online India | Buy Fox Nuts | Namamy';
  const categoryTitles = {
    roasted: 'Buy Roasted Makhana Online India | Crunchy Fox Nuts | Namamy',
    flavored: 'Buy Flavored Makhana Online | Masala Fox Nuts India | Namamy',
    premium: 'Premium Makhana Collection | Luxury Fox Nuts | Namamy',
    raw: 'Buy Raw Makhana Online | Natural Fox Nuts India | Namamy'
  };
  
  const title = category && categoryTitles[category as keyof typeof categoryTitles] 
    ? categoryTitles[category as keyof typeof categoryTitles]
    : search 
    ? `Search Results for "${search}" | Makhana Online | Namamy`
    : baseTitle;

  const baseDescription = 'Buy premium makhana (fox nuts) online in India. Wide range of roasted, flavored & raw varieties. Best prices, free delivery above ₹500. 100% natural & healthy snacks.';
  const categoryDescriptions = {
    roasted: 'Buy crispy roasted makhana online. Premium quality fox nuts roasted to perfection. Healthy protein snacks with free delivery across India.',
    flavored: 'Shop flavored makhana varieties online. Masala, spicy & sweet fox nuts. Premium quality with authentic Indian flavors. Order now!',
    premium: 'Explore our premium makhana collection. Finest quality fox nuts, carefully sourced and processed. Luxury healthy snacking experience.',
    raw: 'Buy natural raw makhana online. Unprocessed fox nuts perfect for home cooking. Premium quality lotus seeds with free delivery.'
  };
  
  const description = category && categoryDescriptions[category as keyof typeof categoryDescriptions]
    ? categoryDescriptions[category as keyof typeof categoryDescriptions]
    : baseDescription;
  
  return {
    title,
    description,
    keywords: [
      'makhana online shopping',
      'fox nuts buy India',
      'healthy snacks online',
      'roasted makhana price',
      'flavored makhana online',
      'premium fox nuts',
      'lotus seeds online',
      'protein snacks India',
      'diet snacks buy',
      'namamy makhana shop',
      'organic snacks online',
      'makhana home delivery'
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'en' ? 'en_IN' : `${locale}_IN`,
      url: `https://namamy.com/${locale}/shop${category ? `?category=${category}` : ''}`,
      siteName: 'Namamy',
      images: [
        {
          url: '/images/namamy-logo-banner.jpg',
          width: 1200,
          height: 630,
          alt: `Namamy ${category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Premium'} Makhana Collection`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/namamy-logo-banner.jpg'],
      creator: '@namamy',
    },
    alternates: {
      canonical: `https://namamy.com/${locale}/shop${category ? `?category=${category}` : ''}`,
      languages: {
        'en-IN': `https://namamy.com/en/shop${category ? `?category=${category}` : ''}`,
        'hi-IN': `https://namamy.com/hi/shop${category ? `?category=${category}` : ''}`,
        'ta-IN': `https://namamy.com/ta/shop${category ? `?category=${category}` : ''}`,
        'bn-IN': `https://namamy.com/bn/shop${category ? `?category=${category}` : ''}`,
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
      
      <ShopUserSettingsWrapper>
        <Layout 
          locale={locale} 
          showBreadcrumb={true} 
          breadcrumbItems={breadcrumbItems}
        >
          <ShopContent locale={locale} searchParams={searchParams} />
        </Layout>
      </ShopUserSettingsWrapper>
    </NextIntlClientProvider>
  );
}