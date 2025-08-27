import { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { CheckoutContent } from '@/components/checkout/CheckoutContent';

interface CheckoutPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: CheckoutPageProps): Promise<Metadata> {
  const { locale } = params;
  
  return {
    title: 'Checkout - Complete Your Order | Namamy',
    description: 'Complete your Namamy order with secure payment options. Free shipping on orders above ₹500.',
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `/${locale}/checkout`,
    },
  };
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const { locale } = params;

  const breadcrumbItems = [
    { label: 'Shopping Cart', href: '/cart' },
    { label: 'Checkout' },
  ];

  return (
    <Layout 
      locale={locale} 
      showBreadcrumb={true} 
      breadcrumbItems={breadcrumbItems}
    >
      <CheckoutContent locale={locale} />
    </Layout>
  );
}