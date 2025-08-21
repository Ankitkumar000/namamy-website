import type { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { BlogContent } from '@/components/blog/BlogContent';

interface BlogPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  return {
    title: 'Health & Wellness Blog - Namamy',
    description: 'Discover the health benefits of makhana, nutrition tips, healthy recipes, and wellness insights from Namamy experts.',
    keywords: 'makhana health benefits, fox nuts nutrition, healthy snacks, wellness blog, nutrition tips',
    robots: 'index, follow',
    openGraph: {
      title: 'Health & Wellness Blog - Namamy Premium Makhana',
      description: 'Expert insights on makhana nutrition, health benefits, and wellness tips.',
      type: 'website',
    },
  };
}

export default function BlogPage({ params: { locale } }: BlogPageProps) {
  const breadcrumbItems = [
    { label: 'Blog' },
  ];

  return (
    <Layout locale={locale}>
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} locale={locale} />
          <BlogContent locale={locale} />
        </div>
      </div>
    </Layout>
  );
}