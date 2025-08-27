import { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { AccountDashboard } from '@/components/account/AccountDashboard';

interface AccountPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: AccountPageProps): Promise<Metadata> {
  const { locale } = params;
  
  return {
    title: 'My Account - Dashboard | Namamy',
    description: 'Manage your Namamy account, view orders, update profile, and access your wishlist.',
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `/${locale}/account`,
    },
  };
}

export default function AccountPage({ params }: AccountPageProps) {
  const { locale } = params;

  const breadcrumbItems = [
    { label: 'My Account' },
  ];

  return (
    <Layout 
      locale={locale} 
      showBreadcrumb={true} 
      breadcrumbItems={breadcrumbItems}
    >
      <AccountDashboard locale={locale} />
    </Layout>
  );
}