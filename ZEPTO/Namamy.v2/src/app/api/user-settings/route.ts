import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const USER_SETTINGS_FILE = path.join(process.cwd(), 'user-settings.json');

interface UserSettings {
  shopPageOnly: {
    customization: {
      theme: 'light' | 'dark' | 'auto';
      showPromoBanner: boolean;
      featuredCategories: string[];
      productsPerPage: number;
      defaultSortBy: 'price-low' | 'price-high' | 'name' | 'newest';
    };
    filters: {
      priceRange: { min: number; max: number };
      categories: string[];
      availability: 'all' | 'in-stock' | 'on-sale';
    };
    layout: {
      viewMode: 'grid' | 'list';
      showFilters: boolean;
      showSortOptions: boolean;
    };
  };
  updatedAt: string;
}

const defaultUserSettings: UserSettings = {
  shopPageOnly: {
    customization: {
      theme: 'light',
      showPromoBanner: true,
      featuredCategories: ['roasted', 'flavored', 'premium'],
      productsPerPage: 12,
      defaultSortBy: 'newest'
    },
    filters: {
      priceRange: { min: 0, max: 1000 },
      categories: [],
      availability: 'all'
    },
    layout: {
      viewMode: 'grid',
      showFilters: true,
      showSortOptions: true
    }
  },
  updatedAt: new Date().toISOString()
};

async function readUserSettings(): Promise<UserSettings> {
  try {
    const data = await fs.readFile(USER_SETTINGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return defaultUserSettings;
  }
}

async function writeUserSettings(settings: UserSettings) {
  try {
    await fs.writeFile(USER_SETTINGS_FILE, JSON.stringify(settings, null, 2));
  } catch (error) {
    console.error('Error writing user settings file:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const settings = await readUserSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to read user settings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { shopPageOnly } = body;
    
    console.log('Received user settings update:', body);
    
    const currentSettings = await readUserSettings();
    const newSettings: UserSettings = {
      ...currentSettings,
      shopPageOnly: {
        ...currentSettings.shopPageOnly,
        ...shopPageOnly
      },
      updatedAt: new Date().toISOString()
    };
    
    console.log('New user settings to save:', newSettings);
    
    await writeUserSettings(newSettings);
    
    return NextResponse.json({ 
      success: true, 
      settings: newSettings,
      message: 'Shop page settings updated successfully'
    });
  } catch (error) {
    console.error('Error in POST /api/user-settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update user settings', details: (error as Error).message },
      { status: 500 }
    );
  }
}