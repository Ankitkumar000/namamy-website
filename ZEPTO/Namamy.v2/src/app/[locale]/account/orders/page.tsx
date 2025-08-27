import type { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { OrderHistory } from '@/components/account/OrderHistory';

interface AccountOrdersPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: AccountOrdersPageProps): Promise<Metadata> {
  return {
    title: 'My Orders - Namamy Account',
    description: 'View your order history and track current orders.',
    robots: 'noindex, follow',
  };
}

export default function AccountOrdersPage({ params: { locale } }: AccountOrdersPageProps) {
  return (
    <Layout locale={locale}>
      <OrderHistory locale={locale} />
    </Layout>
  );
}