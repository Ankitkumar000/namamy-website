import type { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { BlogPostContent } from '@/components/blog/BlogPostContent';

interface BlogPostPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  // In a real app, you'd fetch the blog post data here
  const blogPost = {
    title: 'The Amazing Health Benefits of Makhana',
    description: 'Discover the incredible nutritional benefits of makhana (fox nuts) and why they should be part of your healthy diet.',
  };

  return {
    title: `${blogPost.title} - Namamy Blog`,
    description: blogPost.description,
    keywords: 'makhana benefits, fox nuts nutrition, healthy snacks, protein rich foods',
    robots: 'index, follow',
    openGraph: {
      title: `${blogPost.title} - Namamy Blog`,
      description: blogPost.description,
      type: 'article',
    },
  };
}

export default function BlogPostPage({ params: { locale, slug } }: BlogPostPageProps) {
  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: 'Article' },
  ];

  return (
    <Layout locale={locale}>
      <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} locale={locale} />
          <BlogPostContent locale={locale} slug={slug} />
        </div>
      </div>
    </Layout>
  );
}