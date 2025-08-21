import { Inter, Playfair_Display, Poppins } from 'next/font/google';
import './globals.css';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { FacebookPixel } from '@/components/analytics/FacebookPixel';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://namamy.com'),
  title: {
    default: 'Namamy - Premium Makhana & Fox Nuts Online | Healthy Snacks India',
    template: '%s | Namamy'
  },
  description: 'Buy premium quality makhana (fox nuts) online in India. Roasted, flavored & raw varieties available. Rich in protein, low in calories. Free delivery across India. Order now!',
  keywords: [
    'makhana online',
    'fox nuts buy online',
    'healthy snacks India',
    'roasted makhana',
    'premium makhana',
    'makhana price',
    'lotus seeds online',
    'protein snacks',
    'diet snacks',
    'namamy makhana',
    'organic snacks India',
    'weight loss snacks',
    'diabetic friendly snacks',
    'makhana home delivery'
  ],
  authors: [{ name: 'Namamy', url: 'https://namamy.com' }],
  creator: 'Namamy',
  publisher: 'Namamy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://namamy.com',
    siteName: 'Namamy',
    title: 'Namamy - Premium Makhana & Fox Nuts Online India',
    description: 'Buy premium quality makhana (fox nuts) online in India. Roasted, flavored & raw varieties. Rich in protein, low in calories. Free delivery across India.',
    images: [
      {
        url: '/images/namamy-logo-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Namamy Premium Makhana Collection - Healthy Indian Snacks',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@namamy',
    creator: '@namamy',
    title: 'Namamy - Premium Makhana & Fox Nuts Online India',
    description: 'Buy premium quality makhana (fox nuts) online in India. Roasted, flavored & raw varieties. Rich in protein, low in calories.',
    images: [{
      url: '/images/namamy-logo-banner.jpg',
      alt: 'Namamy Premium Makhana Collection',
    }],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
    other: {
      'msvalidate.01': process.env.BING_SITE_VERIFICATION || '',
    },
  },
  alternates: {
    canonical: 'https://namamy.com',
    languages: {
      'en-IN': 'https://namamy.com/en',
      'hi-IN': 'https://namamy.com/hi',
      'ta-IN': 'https://namamy.com/ta',
      'bn-IN': 'https://namamy.com/bn',
      'x-default': 'https://namamy.com/en',
    },
    types: {
      'application/rss+xml': 'https://namamy.com/feed.xml',
    },
  },
  category: 'food',
  classification: 'e-commerce',
  other: {
    'theme-color': '#D97706',
    'color-scheme': 'light',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Namamy',
    'application-name': 'Namamy',
    'msapplication-TileColor': '#D97706',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Namamy",
    "url": "https://namamy.com",
    "logo": "https://namamy.com/images/namamy-logo-banner.jpg",
    "description": "Premium makhana (fox nuts) manufacturer and online retailer in India",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@namamy.com"
    },
    "sameAs": [
      "https://www.instagram.com/namamy",
      "https://www.facebook.com/namamy",
      "https://twitter.com/namamy"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Namamy",
    "url": "https://namamy.com",
    "description": "Premium makhana (fox nuts) online store in India",
    "publisher": {
      "@type": "Organization",
      "name": "Namamy"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://namamy.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${poppins.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#D97706" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Namamy" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#D97706" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for Core Web Vitals */
            html { font-display: swap; }
            body { margin: 0; padding: 0; min-height: 100vh; }
            .font-display { font-display: swap; }
            .font-sans { font-display: swap; }
            img { max-width: 100%; height: auto; }
            
            /* Prevent layout shift */
            .hero-section { min-height: 60vh; }
            .product-grid { min-height: 400px; }
            
            /* Loading placeholders */
            .loading-placeholder {
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
              background-size: 200% 100%;
              animation: loading 1.5s infinite;
            }
            
            @keyframes loading {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `
        }} />
      </head>
      <body className="font-sans antialiased">
        <div id="__next">
          {children}
        </div>
        <GoogleAnalytics trackingId={process.env.NEXT_PUBLIC_GA_TRACKING_ID || ''} />
        <FacebookPixel pixelId={process.env.NEXT_PUBLIC_FB_PIXEL_ID || ''} />
        
        <noscript>
          <div style={{padding: '20px', textAlign: 'center', background: '#f8f9fa'}}>
            <p>This website requires JavaScript to function properly. Please enable JavaScript in your browser settings.</p>
          </div>
        </noscript>
      </body>
    </html>
  );
}