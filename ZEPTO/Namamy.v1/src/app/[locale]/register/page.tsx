import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

interface RegisterPageProps {
  params: {
    locale: string;
  };
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  // Redirect to auth/signup
  redirect(`/${params.locale}/auth/signup`);
}

export async function generateMetadata({ params }: RegisterPageProps) {
  return {
    title: 'Register | Namamy',
    description: 'Create your Namamy account to start shopping premium makhana products',
  };
}