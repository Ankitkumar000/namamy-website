import { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { CartContent } from '@/components/cart/CartContent';

interface CartPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: CartPageProps): Promise<Metadata> {
  const { locale } = params;
  
  return {
    title: 'Shopping Cart | Namamy',
    description: 'Review your selected premium makhana products and proceed to checkout.',
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `/${locale}/cart`,
      languages: {
        'en': '/en/cart',
        'hi': '/hi/cart',
        'ta': '/ta/cart',
        'bn': '/bn/cart',
      },
    },
  };
}

export default function CartPage({ params }: CartPageProps) {
  const { locale } = params;

  const breadcrumbItems = [
    { label: 'Shopping Cart' },
  ];

  return (
    <Layout 
      locale={locale} 
      showBreadcrumb={true} 
      breadcrumbItems={breadcrumbItems}
    >
      <CartContent locale={locale} />
    </Layout>
  );
}