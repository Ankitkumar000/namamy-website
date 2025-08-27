import type { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ReviewsContent } from '@/components/reviews/ReviewsContent';

interface ReviewsPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: ReviewsPageProps): Promise<Metadata> {
  return {
    title: 'Customer Reviews - Namamy Premium Makhana',
    description: 'Read authentic customer reviews and testimonials about Namamy premium makhana products.',
    keywords: 'customer reviews, testimonials, makhana reviews, fox nuts feedback, namamy reviews',
    robots: 'index, follow',
    openGraph: {
      title: 'Customer Reviews - Namamy Premium Makhana',
      description: 'See what our customers say about our premium makhana products. Rated 4.8/5 by thousands of satisfied customers.',
      type: 'website',
    },
  };
}

export default function ReviewsPage({ params: { locale } }: ReviewsPageProps) {
  const breadcrumbItems = [
    { name: 'Home', href: `/${locale}` },
    { name: 'Reviews', href: `/${locale}/reviews` },
  ];

  return (
    <Layout locale={locale}>
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />
          <ReviewsContent locale={locale} />
        </div>
      </div>
    </Layout>
  );
}