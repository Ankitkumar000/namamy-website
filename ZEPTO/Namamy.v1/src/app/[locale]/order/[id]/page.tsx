import { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { OrderConfirmation } from '@/components/order/OrderConfirmation';

interface OrderPageProps {
  params: {
    locale: string;
    id: string;
  };
}

export async function generateMetadata({ params }: OrderPageProps): Promise<Metadata> {
  const { locale, id } = params;
  
  return {
    title: `Order Confirmation - ${id} | Namamy`,
    description: 'Your order has been placed successfully. Thank you for shopping with Namamy!',
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function OrderPage({ params }: OrderPageProps) {
  const { locale, id } = params;

  const breadcrumbItems = [
    { label: 'Order Confirmation' },
  ];

  return (
    <Layout 
      locale={locale} 
      showBreadcrumb={true} 
      breadcrumbItems={breadcrumbItems}
    >
      <OrderConfirmation locale={locale} orderId={id} />
    </Layout>
  );
}