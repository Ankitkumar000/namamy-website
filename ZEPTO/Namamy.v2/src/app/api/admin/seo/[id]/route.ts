import { NextRequest, NextResponse } from 'next/server';

// This would be imported from the main route file or database
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
  }
];

// GET - Get specific SEO page
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const seoPage = seoPages.find(p => p.id === id);
    
    if (!seoPage) {
      return NextResponse.json(
        { success: false, error: 'SEO page not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      page: seoPage
    });
  } catch (error) {
    console.error('Error fetching SEO page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch SEO page' },
      { status: 500 }
    );
  }
}

// PUT - Update SEO page
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const pageIndex = seoPages.findIndex(p => p.id === id);
    
    if (pageIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'SEO page not found' },
        { status: 404 }
      );
    }

    // Update the page
    const updatedPage = {
      ...seoPages[pageIndex],
      ...body,
      lastModified: new Date().toISOString()
    };

    // Recalculate SEO score and issues
    const titleLength = updatedPage.title.length;
    const descLength = updatedPage.description.length;
    const hasKeywords = updatedPage.keywords && updatedPage.keywords.length > 0;
    const hasFocusKeyphrase = updatedPage.focusKeyphrase && updatedPage.focusKeyphrase.length > 0;
    
    let score = 60;
    let issues = [];
    
    if (titleLength > 60) issues.push('Title too long');
    if (titleLength < 30) issues.push('Title too short');
    if (descLength > 160) issues.push('Description too long');
    if (descLength < 120) issues.push('Description too short');
    if (!hasKeywords) issues.push('Missing keywords');
    if (!hasFocusKeyphrase) issues.push('No focus keyphrase set');
    if (!updatedPage.ogTitle) issues.push('Missing OG title');
    if (!updatedPage.ogDescription) issues.push('Missing OG description');
    if (!updatedPage.ogImage) issues.push('Missing OG image');
    
    // Calculate score
    if (titleLength >= 30 && titleLength <= 60) score += 10;
    if (descLength >= 120 && descLength <= 160) score += 10;
    if (hasKeywords) score += 10;
    if (hasFocusKeyphrase) score += 15;
    if (updatedPage.ogTitle) score += 5;
    if (updatedPage.ogDescription) score += 5;
    if (updatedPage.ogImage) score += 5;
    
    // Determine status
    let status: 'optimized' | 'needs_attention' | 'poor' = 'poor';
    if (score >= 85) status = 'optimized';
    else if (score >= 70) status = 'needs_attention';
    
    updatedPage.score = score;
    updatedPage.issues = issues;
    updatedPage.status = status;

    seoPages[pageIndex] = updatedPage;

    console.log(`SEO page updated: ${updatedPage.page} (Score: ${score})`);

    return NextResponse.json({
      success: true,
      page: updatedPage,
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

// DELETE - Delete SEO page
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const pageIndex = seoPages.findIndex(p => p.id === id);
    
    if (pageIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'SEO page not found' },
        { status: 404 }
      );
    }

    const deletedPage = seoPages[pageIndex];
    seoPages.splice(pageIndex, 1);

    console.log(`SEO page deleted: ${deletedPage.page}`);

    return NextResponse.json({
      success: true,
      message: 'SEO page deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting SEO page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete SEO page' },
      { status: 500 }
    );
  }
}

// PATCH - Perform specific SEO operations
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { action, data } = body;
    
    const pageIndex = seoPages.findIndex(p => p.id === id);
    
    if (pageIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'SEO page not found' },
        { status: 404 }
      );
    }

    let page = seoPages[pageIndex];
    let message = '';

    switch (action) {
      case 'analyze':
        // Perform SEO analysis
        const titleLength = page.title.length;
        const descLength = page.description.length;
        const hasKeywords = page.keywords && page.keywords.length > 0;
        const hasFocusKeyphrase = page.focusKeyphrase && page.focusKeyphrase.length > 0;
        
        let score = 60;
        let issues: string[] = [];
        
        if (titleLength > 60) issues.push('Title too long (max 60 chars)');
        if (titleLength < 30) issues.push('Title too short (min 30 chars)');
        if (descLength > 160) issues.push('Description too long (max 160 chars)');
        if (descLength < 120) issues.push('Description too short (min 120 chars)');
        if (!hasKeywords) issues.push('Missing meta keywords');
        if (!hasFocusKeyphrase) issues.push('No focus keyphrase set');
        if (!page.ogTitle) issues.push('Missing Open Graph title');
        if (!page.ogDescription) issues.push('Missing Open Graph description');
        if (!page.ogImage) issues.push('Missing Open Graph image');
        if (!page.canonicalUrl) issues.push('Missing canonical URL');
        
        // Advanced checks
        if (page.title && page.focusKeyphrase && !page.title.toLowerCase().includes(page.focusKeyphrase.toLowerCase())) {
          issues.push('Focus keyphrase not in title');
        }
        if (page.description && page.focusKeyphrase && !page.description.toLowerCase().includes(page.focusKeyphrase.toLowerCase())) {
          issues.push('Focus keyphrase not in description');
        }
        
        // Calculate score
        if (titleLength >= 30 && titleLength <= 60) score += 10;
        if (descLength >= 120 && descLength <= 160) score += 10;
        if (hasKeywords) score += 10;
        if (hasFocusKeyphrase) score += 15;
        if (page.ogTitle) score += 5;
        if (page.ogDescription) score += 5;
        if (page.ogImage) score += 5;
        if (page.canonicalUrl) score += 5;
        
        // Bonus points for keyphrase optimization
        if (page.focusKeyphrase) {
          if (page.title?.toLowerCase().includes(page.focusKeyphrase.toLowerCase())) score += 5;
          if (page.description?.toLowerCase().includes(page.focusKeyphrase.toLowerCase())) score += 5;
        }
        
        // Determine status
        let status: 'optimized' | 'needs_attention' | 'poor' = 'poor';
        if (score >= 85) status = 'optimized';
        else if (score >= 70) status = 'needs_attention';
        
        page.score = score;
        (page as any).issues = issues;
        page.status = status;
        page.lastModified = new Date().toISOString();
        
        message = `SEO analysis completed. Score: ${score}/100`;
        break;

      case 'optimize':
        const { suggestions } = data;
        
        if (suggestions?.title) page.title = suggestions.title;
        if (suggestions?.description) page.description = suggestions.description;
        if (suggestions?.keywords) page.keywords = suggestions.keywords;
        if (suggestions?.focusKeyphrase) page.focusKeyphrase = suggestions.focusKeyphrase;
        
        // Auto-optimize Open Graph tags
        if (!page.ogTitle || page.ogTitle === page.title) {
          page.ogTitle = page.title;
        }
        if (!page.ogDescription || page.ogDescription === page.description) {
          page.ogDescription = page.description;
        }
        
        page.lastModified = new Date().toISOString();
        message = 'SEO optimization applied successfully';
        break;

      case 'reset_score':
        page.score = 60;
        (page as any).issues = ['Needs review'];
        page.status = 'needs_attention';
        page.lastModified = new Date().toISOString();
        message = 'SEO score reset successfully';
        break;

      case 'duplicate':
        const duplicatedPage = {
          ...page,
          id: Date.now().toString(),
          page: `${page.page}-copy`,
          title: `${page.title} (Copy)`,
          canonicalUrl: `${page.canonicalUrl}-copy`,
          lastModified: new Date().toISOString(),
          status: 'needs_attention' as const,
          issues: ['Duplicate page - needs review'],
          score: 50
        };
        
        seoPages.push(duplicatedPage as any);
        message = 'SEO page duplicated successfully';
        
        return NextResponse.json({
          success: true,
          page: duplicatedPage,
          message
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

    seoPages[pageIndex] = page;

    console.log(`SEO page ${action}: ${page.page}`);

    return NextResponse.json({
      success: true,
      page,
      message
    });
  } catch (error) {
    console.error('Error performing SEO operation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to perform SEO operation' },
      { status: 500 }
    );
  }
}