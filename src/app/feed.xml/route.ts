import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://namamy.com'
  
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Namamy - Premium Makhana & Fox Nuts Blog</title>
    <description>Latest updates about premium makhana, fox nuts, healthy snacking, and nutrition from Namamy</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <item>
      <title>Health Benefits of Makhana - Complete Nutrition Guide</title>
      <description>Discover the amazing health benefits of makhana (fox nuts), including protein content, weight loss benefits, and why it's the perfect healthy snack.</description>
      <link>${baseUrl}/blog/health-benefits-of-makhana</link>
      <guid>${baseUrl}/blog/health-benefits-of-makhana</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
    <item>
      <title>Best Makhana Recipes for Healthy Snacking</title>
      <description>Try these delicious and healthy makhana recipes that are perfect for weight loss, diabetic-friendly diets, and nutritious snacking.</description>
      <link>${baseUrl}/blog/best-makhana-recipes</link>
      <guid>${baseUrl}/blog/best-makhana-recipes</guid>
      <pubDate>${new Date(Date.now() - 24 * 60 * 60 * 1000).toUTCString()}</pubDate>
    </item>
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  })
}