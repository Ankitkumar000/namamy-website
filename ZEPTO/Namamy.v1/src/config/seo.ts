export const seoConfig = {
  // Basic site information
  siteName: 'Namamy',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://namamy.com',
  siteDescription: 'Premium makhana (fox nuts) online store in India. Buy roasted, flavored & raw varieties. Rich in protein, low calories. Free delivery. 100% natural healthy snacks.',
  
  // Default metadata
  defaultTitle: 'Namamy - Premium Makhana & Fox Nuts Online India | Buy Healthy Snacks',
  titleTemplate: '%s | Namamy',
  
  // Business information
  business: {
    name: 'Namamy',
    description: 'Premium makhana (fox nuts) manufacturer and online retailer in India',
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@namamy.com',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91-98765-43210',
    address: {
      streetAddress: '123 Business Park',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400001',
      addressCountry: 'IN'
    },
    logo: '/images/namamy-logo-banner.jpg',
    founded: '2020',
    priceRange: '₹₹'
  },
  
  // Social media
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://facebook.com/namamy',
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/namamy',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/namamy',
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://youtube.com/namamy',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/company/namamy'
  },
  
  // Keywords by category
  keywords: {
    primary: [
      'makhana online',
      'fox nuts buy online',
      'healthy snacks India',
      'premium makhana',
      'roasted makhana',
      'makhana price',
      'lotus seeds online',
      'protein snacks',
      'diet snacks',
      'namamy makhana'
    ],
    secondary: [
      'makhana benefits',
      'fox nuts nutrition',
      'healthy indian snacks',
      'low calorie snacks',
      'protein rich snacks',
      'makhana recipes',
      'organic snacks India',
      'guilt free snacks',
      'diabetic friendly snacks',
      'weight loss snacks'
    ],
    local: [
      'makhana online India',
      'fox nuts home delivery',
      'indian healthy snacks online',
      'makhana Mumbai',
      'makhana Delhi',
      'makhana Bangalore',
      'makhana Chennai',
      'makhana Hyderabad'
    ],
    categories: {
      roasted: [
        'roasted makhana online',
        'crispy fox nuts',
        'roasted lotus seeds',
        'crunchy makhana',
        'roasted makhana price'
      ],
      flavored: [
        'flavored makhana online',
        'masala makhana',
        'spiced fox nuts',
        'chatpata makhana',
        'flavored lotus seeds'
      ],
      premium: [
        'premium makhana online',
        'luxury fox nuts',
        'grade A makhana',
        'best quality makhana',
        'premium lotus seeds'
      ],
      raw: [
        'raw makhana online',
        'natural fox nuts',
        'unprocessed makhana',
        'raw lotus seeds',
        'plain makhana'
      ]
    }
  },
  
  // Locales
  locales: ['en', 'hi', 'ta', 'bn'],
  defaultLocale: 'en',
  
  // OpenGraph default image
  ogImage: {
    url: '/images/namamy-og-image.jpg',
    width: 1200,
    height: 630,
    alt: 'Namamy Premium Makhana Collection'
  },
  
  // Twitter
  twitter: {
    handle: '@namamy',
    site: '@namamy',
    cardType: 'summary_large_image'
  },
  
  // Verification codes
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    bing: process.env.BING_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION
  }
}

// SEO utility functions
export function generateTitle(title: string, locale?: string): string {
  const localePrefix = locale && locale !== 'en' ? `[${locale.toUpperCase()}] ` : ''
  return `${localePrefix}${title} | Namamy`
}

export function generateCanonicalUrl(path: string, locale: string = 'en'): string {
  return `${seoConfig.siteUrl}/${locale}${path}`
}

export function generateHreflangUrls(path: string): { [key: string]: string } {
  const hreflangs: { [key: string]: string } = {}
  
  seoConfig.locales.forEach(locale => {
    hreflangs[`${locale}-IN`] = `${seoConfig.siteUrl}/${locale}${path}`
  })
  
  return hreflangs
}

export function generateKeywords(category?: string, additional: string[] = []): string[] {
  let keywords = [...seoConfig.keywords.primary]
  
  if (category && seoConfig.keywords.categories[category as keyof typeof seoConfig.keywords.categories]) {
    keywords = [...keywords, ...seoConfig.keywords.categories[category as keyof typeof seoConfig.keywords.categories]]
  }
  
  keywords = [...keywords, ...seoConfig.keywords.secondary, ...additional]
  
  return Array.from(new Set(keywords)) // Remove duplicates
}