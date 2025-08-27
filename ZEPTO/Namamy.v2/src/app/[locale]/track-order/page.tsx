import type { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { OrderTrackingContent } from '@/components/tracking/OrderTrackingContent';

interface TrackOrderPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: TrackOrderPageProps): Promise<Metadata> {
  return {
    title: 'Track Your Order - Namamy',
    description: 'Track your Namamy order status and delivery information in real-time.',
    robots: 'index, follow',
  };
}

export default function TrackOrderPage({ params: { locale } }: TrackOrderPageProps) {
  const breadcrumbItems = [
    { label: 'Home' },
    { label: 'Track Order' },
  ];

  return (
    <Layout locale={locale}>
      <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} locale={locale} />
          <OrderTrackingContent locale={locale} />
        </div>
      </div>
    </Layout>
  );
}