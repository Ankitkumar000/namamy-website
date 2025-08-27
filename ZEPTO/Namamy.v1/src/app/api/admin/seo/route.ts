import { NextRequest, NextResponse } from 'next/server';

// Mock SEO data
let seoPages = [
  {
    id: '1',
    page: '/',
    title: 'Premium Makhana & Healthy Snacks Online | Namamy',
    description: 'Shop premium quality makhana (fox nuts) and healthy snacks online. Fresh, organic, and naturally processed. Free delivery across India. Order now!',
    keywords: 'makhana online, fox nuts, healthy snacks, organic makhana, premium makhana, buy makhana online',
    ogTitle: 'Premium Makhana & Healthy Snacks Online | Namamy',
    ogDescription: 'Shop premium quality makhana and healthy snacks online. Fresh, organic, naturally processed with free delivery.',
    ogImage: '/images/og/homepage-og.jpg',
    canonicalUrl: 'https://namamy.com/',
    metaRobots: 'index, follow',
    lastModified: '2024-01-30T10:30:00Z',
    status: 'optimized',
    issues: [],
    score: 95,
    focusKeyphrase: 'premium makhana online'
  },
  {
    id: '2',
    page: '/products',
    title: 'All Products - Premium Makhana Collection | Namamy',
    description: 'Browse our complete collection of premium makhana varieties. Raw, roasted, flavored, and organic options available. Quality guaranteed.',
    keywords: 'makhana products, makhana varieties, buy makhana, organic makhana, roasted makhana, flavored makhana',
    ogTitle: 'All Products - Premium Makhana Collection | Namamy',
    ogDescription: 'Browse our complete collection of premium makhana varieties. Raw, roasted, flavored, and organic options.',
    ogImage: '/images/og/products-og.jpg',
    canonicalUrl: 'https://namamy.com/products',
    metaRobots: 'index, follow',
    lastModified: '2024-01-29T15:20:00Z',
    status: 'needs_attention',
    issues: ['Title too long', 'Missing schema markup'],
    score: 78,
    focusKeyphrase: 'makhana products'
  },
  {
    id: '3',
    page: '/products/premium-raw-makhana-250g',
    title: 'Premium Raw Makhana 250g - Fresh Fox Nuts Online',
    description: 'Buy premium raw makhana (fox nuts) 250g pack online. Fresh, naturally processed, perfect for roasting. Rich in protein and nutrients.',
    keywords: 'premium raw makhana, raw fox nuts, fresh makhana, natural makhana, buy raw makhana online',
    ogTitle: 'Premium Raw Makhana 250g - Fresh Fox Nuts Online',
    ogDescription: 'Buy premium raw makhana (fox nuts) 250g pack online. Fresh, naturally processed, perfect for roasting.',
    ogImage: '/images/products/premium-makhana-hero.jpg',
    canonicalUrl: 'https://namamy.com/products/premium-raw-makhana-250g',
    metaRobots: 'index, follow',
    lastModified: '2024-01-28T12:45:00Z',
    status: 'optimized',
    issues: [],
    score: 92,
    focusKeyphrase: 'premium raw makhana'
  },
  {
    id: '4',
    page: '/about',
    title: 'About Us - Namamy Premium Makhana Brand',
    description: 'Learn about Namamy, your trusted source for premium quality makhana. Our story, mission, and commitment to bringing you the best fox nuts.',
    keywords: 'about namamy, makhana brand, fox nuts company, premium snacks brand, healthy snacks company',
    ogTitle: 'About Us - Namamy Premium Makhana Brand',
    ogDescription: 'Learn about Namamy, your trusted source for premium quality makhana and healthy snacks.',
    ogImage: '/images/og/about-og.jpg',
    canonicalUrl: 'https://namamy.com/about',
    metaRobots: 'index, follow',
    lastModified: '2024-01-25T09:30:00Z',
    status: 'poor',
    issues: ['Low content score', 'Missing internal links', 'No schema markup'],
    score: 45,
    focusKeyphrase: 'about namamy'
  },
  {
    id: '5',
    page: '/blog/health-benefits-of-makhana',
    title: 'Top 10 Health Benefits of Makhana (Fox Nuts) - Namamy Blog',
    description: 'Discover the amazing health benefits of makhana (fox nuts). From weight loss to heart health, learn why makhana is the perfect healthy snack.',
    keywords: 'makhana health benefits, fox nuts benefits, makhana nutrition, healthy snacks, weight loss snacks',
    ogTitle: 'Top 10 Health Benefits of Makhana (Fox Nuts)',
    ogDescription: 'Discover the amazing health benefits of makhana. From weight loss to heart health, perfect healthy snack.',
    ogImage: '/images/blog/makhana-benefits-og.jpg',
    canonicalUrl: 'https://namamy.com/blog/health-benefits-of-makhana',
    metaRobots: 'index, follow',
    lastModified: '2024-01-30T14:15:00Z',
    status: 'optimized',
    issues: [],
    score: 88,
    focusKeyphrase: 'makhana health benefits'
  }
];

// GET - Get all SEO pages with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const sortBy = searchParams.get('sortBy') || 'score';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    let filteredPages = [...seoPages];

    // Apply search filter
    if (search) {
      filteredPages = filteredPages.filter(page =>
        page.page.toLowerCase().includes(search.toLowerCase()) ||
        page.title.toLowerCase().includes(search.toLowerCase()) ||
        page.description.toLowerCase().includes(search.toLowerCase()) ||
        page.focusKeyphrase?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply status filter
    if (status && status !== 'all') {
      filteredPages = filteredPages.filter(page => page.status === status);
    }

    // Apply sorting
    filteredPages.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'score':
          aValue = a.score;
          bValue = b.score;
          break;
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'page':
          aValue = a.page.toLowerCase();
          bValue = b.page.toLowerCase();
          break;
        case 'lastModified':
        default:
          aValue = new Date(a.lastModified).getTime();
          bValue = new Date(b.lastModified).getTime();
          break;
      }

      if (typeof aValue === 'string') {
        if (sortOrder === 'asc') {
          return aValue.localeCompare(bValue as string);
        } else {
          return (bValue as string).localeCompare(aValue);
        }
      } else {
        if (sortOrder === 'asc') {
          return (aValue as number) - (bValue as number);
        } else {
          return (bValue as number) - (aValue as number);
        }
      }
    });

    // Calculate stats
    const stats = {
      totalPages: seoPages.length,
      optimized: seoPages.filter(p => p.status === 'optimized').length,
      needsAttention: seoPages.filter(p => p.status === 'needs_attention').length,
      poor: seoPages.filter(p => p.status === 'poor').length,
      averageScore: seoPages.length > 0 ? Math.round(seoPages.reduce((sum, p) => sum + p.score, 0) / seoPages.length) : 0,
      totalIssues: seoPages.reduce((sum, p) => sum + p.issues.length, 0)
    };

    return NextResponse.json({
      success: true,
      pages: filteredPages,
      stats,
      total: filteredPages.length
    });
  } catch (error) {
    console.error('Error fetching SEO pages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch SEO pages' },
      { status: 500 }
    );
  }
}

// POST - Create new SEO page or bulk operations
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    switch (action) {
      case 'create':
        const { page, title, description, keywords, focusKeyphrase } = data;
        
        if (!page || !title || !description) {
          return NextResponse.json(
            { success: false, error: 'Page URL, title, and description are required' },
            { status: 400 }
          );
        }

        // Check if page already exists
        if (seoPages.some(p => p.page === page)) {
          return NextResponse.json(
            { success: false, error: 'SEO page already exists' },
            { status: 400 }
          );
        }

        const newSeoPage = {
          id: Date.now().toString(),
          page,
          title,
          description,
          keywords: keywords || '',
          ogTitle: title,
          ogDescription: description,
          ogImage: '/images/og/default-og.jpg',
          canonicalUrl: `https://namamy.com${page}`,
          metaRobots: 'index, follow',
          lastModified: new Date().toISOString(),
          status: 'needs_attention' as const,
          issues: ['Needs review', 'No focus keyphrase set'],
          score: 60,
          focusKeyphrase: focusKeyphrase || ''
        };

        seoPages.push(newSeoPage);

        return NextResponse.json({
          success: true,
          page: newSeoPage,
          message: 'SEO page created successfully'
        });

      case 'bulk_analyze':
        const { pageIds } = data;
        
        if (!pageIds || !Array.isArray(pageIds)) {
          return NextResponse.json(
            { success: false, error: 'Page IDs are required' },
            { status: 400 }
          );
        }

        // Simulate SEO analysis for selected pages
        let analyzedCount = 0;
        seoPages = seoPages.map(page => {
          if (pageIds.includes(page.id)) {
            analyzedCount++;
            
            // Mock analysis logic
            const titleLength = page.title.length;
            const descLength = page.description.length;
            const hasKeywords = page.keywords && page.keywords.length > 0;
            const hasFocusKeyphrase = page.focusKeyphrase && page.focusKeyphrase.length > 0;
            
            let score = 60;
            let issues = [];
            
            if (titleLength > 60) issues.push('Title too long');
            if (titleLength < 30) issues.push('Title too short');
            if (descLength > 160) issues.push('Description too long');
            if (descLength < 120) issues.push('Description too short');
            if (!hasKeywords) issues.push('Missing keywords');
            if (!hasFocusKeyphrase) issues.push('No focus keyphrase set');
            
            // Calculate score
            if (titleLength >= 30 && titleLength <= 60) score += 10;
            if (descLength >= 120 && descLength <= 160) score += 10;
            if (hasKeywords) score += 10;
            if (hasFocusKeyphrase) score += 15;
            
            // Determine status
            let status: 'optimized' | 'needs_attention' | 'poor' = 'poor';
            if (score >= 85) status = 'optimized';
            else if (score >= 70) status = 'needs_attention';
            
            return {
              ...page,
              score,
              issues,
              status,
              lastModified: new Date().toISOString()
            };
          }
          return page;
        });

        return NextResponse.json({
          success: true,
          message: `${analyzedCount} pages analyzed successfully`,
          analyzedCount
        });

      case 'generate_sitemap':
        // Simulate sitemap generation
        const sitemap = seoPages.map(page => ({
          url: `https://namamy.com${page.page}`,
          lastmod: page.lastModified,
          changefreq: page.page === '/' ? 'daily' : 'weekly',
          priority: page.page === '/' ? '1.0' : '0.8'
        }));

        console.log('Sitemap generated with', sitemap.length, 'pages');

        return NextResponse.json({
          success: true,
          sitemap,
          message: 'Sitemap generated successfully'
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error processing SEO request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process SEO request' },
      { status: 500 }
    );
  }
}

// PUT - Update SEO page
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Page ID is required' },
        { status: 400 }
      );
    }

    const pageIndex = seoPages.findIndex(p => p.id === id);
    
    if (pageIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'SEO page not found' },
        { status: 404 }
      );
    }

    // Update the page
    seoPages[pageIndex] = {
      ...seoPages[pageIndex],
      ...updates,
      lastModified: new Date().toISOString()
    };

    console.log(`SEO page updated: ${seoPages[pageIndex].page}`);

    return NextResponse.json({
      success: true,
      page: seoPages[pageIndex],
      message: 'SEO page updated successfully'
    });
  } catch (error) {
    console.error('Error updating SEO page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update SEO page' },
      { status: 500 }
    );
  }
}