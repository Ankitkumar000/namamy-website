import type { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { WishlistContent } from '@/components/account/WishlistContent';

interface WishlistPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: WishlistPageProps): Promise<Metadata> {
  return {
    title: 'My Wishlist - Namamy',
    description: 'View and manage your favorite Namamy makhana products in your wishlist.',
    robots: 'noindex, follow',
  };
}

export default function WishlistPage({ params: { locale } }: WishlistPageProps) {
  return (
    <Layout locale={locale}>
      <WishlistContent locale={locale} />
    </Layout>
  );
}