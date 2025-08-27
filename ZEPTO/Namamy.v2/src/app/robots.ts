import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://namamy.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/*',
          '/api/*',
          '/auth/*',
          '/_next/*',
          '/static/*',
          '/*.json$',
          '/checkout/success*',
          '/checkout/cancel*',
          '/search?*',
          '/cart*',
          '/login*',
          '/register*',
          '/account/*',
          '/dashboard/*'
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/*',
          '/api/*',
          '/auth/*',
          '/_next/*',
          '/static/*',
          '/*.json$',
          '/checkout/success*',
          '/checkout/cancel*',
          '/cart*',
          '/login*',
          '/register*',
          '/account/*',
          '/dashboard/*'
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/admin/*',
          '/api/*',
          '/auth/*',
          '/_next/*',
          '/static/*',
          '/*.json$',
          '/checkout/*',
          '/cart*',
          '/login*',
          '/register*',
          '/account/*',
          '/dashboard/*'
        ],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}