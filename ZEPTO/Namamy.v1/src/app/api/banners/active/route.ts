import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'POPUP';

    const now = new Date();

    const banners = await prisma.banner.findMany({
      where: {
        status: 'ACTIVE',
        type: type,
        OR: [
          { startDate: null },
          { startDate: { lte: now } }
        ],
        AND: [
          {
            OR: [
              { endDate: null },
              { endDate: { gte: now } }
            ]
          }
        ]
      },
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' }
      ]
    });

    // Parse settings JSON for each banner
    const bannersWithSettings = banners.map(banner => ({
      ...banner,
      settings: banner.settings ? JSON.parse(banner.settings) : null
    }));

    return NextResponse.json({
      success: true,
      data: bannersWithSettings
    });

  } catch (error) {
    console.error('Get active banners error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch active banners' },
      { status: 500 }
    );
  }
}