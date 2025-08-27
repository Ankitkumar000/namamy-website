import { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { LoginContent } from '@/components/auth/LoginContent';

interface LoginPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: LoginPageProps): Promise<Metadata> {
  const { locale } = params;
  
  return {
    title: 'Sign In to Your Account | Namamy',
    description: 'Sign in to your Namamy account to access your orders, wishlist, and personalized recommendations.',
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `/${locale}/auth/login`,
    },
  };
}

export default function LoginPage({ params }: LoginPageProps) {
  const { locale } = params;

  return (
    <Layout locale={locale}>
      <LoginContent locale={locale} />
    </Layout>
  );
}