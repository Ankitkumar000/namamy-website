import type { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FAQContent } from '@/components/faq/FAQContent';

interface FAQPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: FAQPageProps): Promise<Metadata> {
  return {
    title: 'Frequently Asked Questions - Namamy',
    description: 'Find answers to common questions about Namamy products, shipping, returns, and more.',
    keywords: 'FAQ, frequently asked questions, makhana, fox nuts, shipping, returns, customer support',
    robots: 'index, follow',
    openGraph: {
      title: 'FAQ - Namamy Premium Makhana',
      description: 'Get answers to your questions about our premium makhana products and services.',
      type: 'website',
    },
  };
}

export default function FAQPage({ params: { locale } }: FAQPageProps) {
  const breadcrumbItems = [
    { label: 'FAQ' },
  ];

  return (
    <Layout locale={locale}>
      <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} locale={locale} />
          <FAQContent locale={locale} />
        </div>
      </div>
    </Layout>
  );
}