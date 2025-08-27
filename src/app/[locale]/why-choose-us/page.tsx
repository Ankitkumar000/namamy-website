import type { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { WhyChooseUsContent } from '@/components/why-choose/WhyChooseUsContent';

interface WhyChooseUsPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: WhyChooseUsPageProps): Promise<Metadata> {
  return {
    title: 'Why Choose Namamy - Premium Makhana Benefits',
    description: 'Discover why Namamy is the trusted choice for premium makhana. Learn about our quality, sustainability, and health benefits.',
    keywords: 'why choose namamy, premium makhana, quality fox nuts, healthy snacks, sustainable farming',
    robots: 'index, follow',
    openGraph: {
      title: 'Why Choose Namamy - Premium Quality Makhana',
      description: 'Discover the Namamy difference - premium quality, sustainable practices, and unmatched taste.',
      type: 'website',
    },
  };
}

export default function WhyChooseUsPage({ params: { locale } }: WhyChooseUsPageProps) {
  const breadcrumbItems = [
    { label: 'Home' },
    { label: 'Why Choose Us' },
  ];

  return (
    <Layout locale={locale}>
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} locale={locale} />
          <WhyChooseUsContent locale={locale} />
        </div>
      </div>
    </Layout>
  );
}