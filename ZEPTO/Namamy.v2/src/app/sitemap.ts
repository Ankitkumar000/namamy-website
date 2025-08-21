import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://namamy.com'
  const currentDate = new Date()
  
  // Get all products for dynamic routes
  let products: any[] = []
  try {
    products = await prisma.product.findMany({
      where: { inStock: true },
      select: { slug: true, updatedAt: true }
    })
  } catch (error) {
    console.error('Error fetching products for sitemap:', error)
    products = []
  }

  const locales = ['en', 'hi', 'ta', 'bn']
  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/shop', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/reviews', priority: 0.6, changeFrequency: 'weekly' as const },
    { path: '/faq', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/why-choose-us', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/privacy-policy', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/terms-of-service', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/refund-policy', priority: 0.4, changeFrequency: 'yearly' as const },
  ]
  
  // Static pages for each locale
  const staticPages = locales.flatMap(locale => 
    routes.map(route => ({
      url: `${baseUrl}/${locale}${route.path}`,
      lastModified: currentDate,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }))
  )

  // Product pages for each locale
  const productPages = locales.flatMap(locale =>
    products.map(product => ({
      url: `${baseUrl}/${locale}/product/${product.slug}`,
      lastModified: product.updatedAt || currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  )

  // Category pages for each locale
  const categories = ['roasted', 'flavored', 'premium', 'raw']
  const categoryPages = locales.flatMap(locale =>
    categories.map(category => ({
      url: `${baseUrl}/${locale}/shop?category=${category}`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }))
  )

  // Additional SEO pages
  const seoPages = [
    {
      url: `${baseUrl}/feed.xml`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.5,
    }
  ]

  return [
    // Main domain redirect
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    ...staticPages,
    ...productPages,
    ...categoryPages,
    ...seoPages,
  ]
}