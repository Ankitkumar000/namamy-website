import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const SETTINGS_FILE = path.join(process.cwd(), 'site-settings.json');

interface SiteSettings {
  isComingSoon: boolean;
  shopOnlyComingSoon: boolean;
  comingSoonMessage: string;
  comingSoonTitle: string;
  allowedPaths: string[];
  updatedAt: string;
}

const defaultSettings: SiteSettings = {
  isComingSoon: false,
  shopOnlyComingSoon: false,
  comingSoonMessage: "Your site is hidden from visitors behind a \"Coming soon\" landing page until it's ready for viewing.",
  comingSoonTitle: "Coming Soon",
  allowedPaths: ['/admin'],
  updatedAt: new Date().toISOString()
};

async function readSettings(): Promise<SiteSettings> {
  try {
    const data = await fs.readFile(SETTINGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return defaultSettings;
  }
}

async function writeSettings(settings: SiteSettings) {
  try {
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2));
  } catch (error) {
    console.error('Error writing settings file:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const settings = await readSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to read settings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { isComingSoon, shopOnlyComingSoon, comingSoonMessage, comingSoonTitle } = body;
    
    console.log('Received settings update:', body);
    
    const currentSettings = await readSettings();
    const newSettings: SiteSettings = {
      ...currentSettings,
      isComingSoon: Boolean(isComingSoon),
      shopOnlyComingSoon: Boolean(shopOnlyComingSoon),
      comingSoonMessage: comingSoonMessage || currentSettings.comingSoonMessage,
      comingSoonTitle: comingSoonTitle || currentSettings.comingSoonTitle,
      updatedAt: new Date().toISOString()
    };
    
    console.log('New settings to save:', newSettings);
    
    await writeSettings(newSettings);
    
    const message = shopOnlyComingSoon 
      ? 'Shop page is now in coming soon mode'
      : isComingSoon 
      ? 'Entire site is now in coming soon mode'
      : 'Site is now live';
    
    return NextResponse.json({ 
      success: true, 
      settings: newSettings,
      message
    });
  } catch (error) {
    console.error('Error in POST /api/admin/site-settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update settings', details: (error as Error).message },
      { status: 500 }
    );
  }
}