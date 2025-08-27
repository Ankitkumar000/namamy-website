import { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { SignupContent } from '@/components/auth/SignupContent';

interface SignupPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: SignupPageProps): Promise<Metadata> {
  const { locale } = params;
  
  return {
    title: 'Create Your Account | Namamy',
    description: 'Join the Namamy family and enjoy premium makhana with exclusive offers, faster checkout, and personalized recommendations.',
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `/${locale}/auth/signup`,
    },
  };
}

export default function SignupPage({ params }: SignupPageProps) {
  const { locale } = params;

  return (
    <Layout locale={locale}>
      <SignupContent locale={locale} />
    </Layout>
  );
}