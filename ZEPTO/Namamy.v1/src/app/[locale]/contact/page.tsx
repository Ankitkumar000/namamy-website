import { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { ContactContent } from '@/components/contact/ContactContent';

interface ContactPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = params;
  
  return {
    title: 'Contact Us - Get in Touch | Namamy',
    description: 'Have questions about our premium makhana products? Contact Namamy customer support team. We\'re here to help with orders, product information, and more.',
    keywords: 'contact namamy, customer support, makhana questions, product help, order support',
    openGraph: {
      title: 'Contact Us - Get in Touch | Namamy',
      description: 'Have questions about our premium makhana products? We\'re here to help!',
      images: [
        {
          url: '/images/contact-hero.jpg',
          width: 1200,
          height: 630,
          alt: 'Contact Namamy Customer Support',
        },
      ],
      locale: locale,
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        'en': '/en/contact',
        'hi': '/hi/contact',
        'ta': '/ta/contact',
        'bn': '/bn/contact',
      },
    },
  };
}

export default function ContactPage({ params }: ContactPageProps) {
  const { locale } = params;

  const breadcrumbItems = [
    { label: 'Contact Us' },
  ];

  // Structured data for Contact page
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Namamy',
    description: 'Get in touch with Namamy customer support for questions about premium makhana products.',
    url: `https://namamy.com/${locale}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: 'Namamy',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+91-98765-43210',
          contactType: 'customer service',
          email: 'hello@namamy.com',
          availableLanguage: ['English', 'Hindi'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:00',
            closes: '18:00',
            validFrom: '2024-01-01',
            validThrough: '2024-12-31',
          },
        },
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Business Park',
        addressLocality: 'Mumbai',
        addressRegion: 'Maharashtra',
        postalCode: '400001',
        addressCountry: 'IN',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      
      <Layout 
        locale={locale} 
        showBreadcrumb={true} 
        breadcrumbItems={breadcrumbItems}
      >
        <ContactContent locale={locale} />
      </Layout>
    </>
  );
}