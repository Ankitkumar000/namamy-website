import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

interface LoginPageProps {
  params: {
    locale: string;
  };
}

export default async function LoginPage({ params }: LoginPageProps) {
  // Redirect to auth/login
  redirect(`/${params.locale}/auth/login`);
}

export async function generateMetadata({ params }: LoginPageProps) {
  return {
    title: 'Login | Namamy',
    description: 'Login to your Namamy account to access orders and manage your profile',
  };
}