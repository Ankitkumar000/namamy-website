'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Wrench, Clock, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface SiteSettings {
  isComingSoon: boolean;
  shopOnlyComingSoon: boolean;
  comingSoonMessage: string;
  comingSoonTitle: string;
  allowedPaths: string[];
}

interface ComingSoonWrapperProps {
  children: React.ReactNode;
}

export function ComingSoonWrapper({ children }: ComingSoonWrapperProps) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/admin/site-settings');
        const data = await response.json();
        if (data.success) {
          setSettings(data.settings);
        }
      } catch (error) {
        console.error('Failed to fetch site settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubscribed(true);
        setEmail('');
      }
    } catch (error) {
      console.error('Failed to subscribe:', error);
    }
  };

  // Show loading state while fetching settings
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-makhana-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if coming soon mode is enabled
  const isShopPage = pathname.includes('/shop');
  const isComingSoonMode = settings && (
    // Shop-only coming soon mode: only affect shop page
    (settings.shopOnlyComingSoon && isShopPage) ||
    // Global coming soon mode: affect all pages except allowed paths
    (settings.isComingSoon && !settings.shopOnlyComingSoon && 
     !settings.allowedPaths.some(path => pathname.startsWith(path)))
  );

  if (!isComingSoonMode) {
    return <>{children}</>;
  }

  // Coming Soon Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-makhana-50 via-white to-organic-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 relative">
              <div className="w-full h-full bg-gradient-to-br from-makhana-400 via-makhana-500 to-makhana-700 rounded-xl flex items-center justify-center shadow-lg border-2 border-white/20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
                  <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full"></div>
                  <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <svg viewBox="0 0 48 48" className="w-4/5 h-4/5 text-white relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8C10.3431 8 9 9.34315 9 11V37C9 38.6569 10.3431 40 12 40C13.6569 40 15 38.6569 15 37V26.5L30 37.2C31.2 38.2 33 37.3 33 35.7V11C33 9.34315 31.6569 8 30 8C28.3431 8 27 9.34315 27 11V21.5L12 10.8C11.4 10.3 11 10.5 11 11.2V37" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="38" cy="12" r="2.5" fill="currentColor" opacity="0.7"/>
                  <circle cx="40" cy="20" r="1.5" fill="currentColor" opacity="0.5"/>
                  <circle cx="36" cy="28" r="2" fill="currentColor" opacity="0.6"/>
                  <circle cx="38" cy="36" r="1.8" fill="currentColor" opacity="0.8"/>
                </svg>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent opacity-50 rounded-xl"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-4xl font-bold bg-gradient-to-r from-makhana-600 via-makhana-700 to-makhana-800 bg-clip-text text-transparent leading-tight">Namamy</span>
              <span className="text-sm font-medium text-makhana-600 opacity-80 -mt-1">Premium Fox Nuts</span>
            </div>
          </div>
        </div>

        {/* Coming Soon Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-makhana-100 rounded-full flex items-center justify-center">
            <Wrench className="w-12 h-12 text-makhana-600" />
          </div>
        </div>

        {/* Coming Soon Content */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            {settings?.comingSoonTitle || 'Coming Soon'}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            {settings?.comingSoonMessage || 'We\'re working hard to bring you something amazing. Stay tuned!'}
          </p>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-organic-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-organic-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">Hand-picked fox nuts from Bihar farms</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-makhana-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-makhana-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Under Construction</h3>
              <p className="text-gray-600 text-sm">Building the best shopping experience</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-organic-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-organic-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Stay Updated</h3>
              <p className="text-gray-600 text-sm">Get notified when we launch</p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Be the first to know when we launch!
            </h3>
            {subscribed ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-green-600 font-medium">Thank you for subscribing!</p>
                <p className="text-gray-600 text-sm mt-2">We'll notify you when we're ready to launch.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                  required
                />
                <Button type="submit" className="w-full group">
                  Notify Me When Ready
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}