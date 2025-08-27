import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

interface OrdersPageProps {
  params: {
    locale: string;
  };
}

export default async function OrdersPage({ params }: OrdersPageProps) {
  // Redirect to account/orders  
  redirect(`/${params.locale}/account/orders`);
}

export async function generateMetadata({ params }: OrdersPageProps) {
  return {
    title: 'My Orders | Namamy',
    description: 'View and manage your Namamy orders, track shipping and order history',
  };
}