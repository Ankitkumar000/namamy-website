'use client';

import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <Layout locale="en">
      <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card>
            <CardContent className="p-12">
              {/* 404 Number */}
              <div className="mb-8">
                <h1 className="text-9xl font-bold text-makhana-200 select-none">
                  404
                </h1>
              </div>

              {/* Main Message */}
              <div className="mb-8">
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                  Oops! Page Not Found
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  The page you're looking for seems to have gone missing. 
                  Don't worry, even our makhana sometimes hides in the pantry!
                </p>
              </div>

              {/* Illustration */}
              <div className="mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-makhana-100 to-makhana-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-6xl">🥜</span>
                </div>
                <p className="text-sm text-gray-500 italic">
                  "Even the best makhana can't be found everywhere!"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => window.location.href = '/'}
                  className="flex items-center"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Go Home
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = '/shop'}
                  className="flex items-center"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Browse Products
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="flex items-center"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Go Back
                </Button>
              </div>

              {/* Helpful Links */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Popular Pages
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <a 
                    href="/shop" 
                    className="text-makhana-600 hover:text-makhana-700 transition-colors"
                  >
                    Shop All Products
                  </a>
                  <a 
                    href="/about" 
                    className="text-makhana-600 hover:text-makhana-700 transition-colors"
                  >
                    About Us
                  </a>
                  <a 
                    href="/contact" 
                    className="text-makhana-600 hover:text-makhana-700 transition-colors"
                  >
                    Contact Support
                  </a>
                  <a 
                    href="/faq" 
                    className="text-makhana-600 hover:text-makhana-700 transition-colors"
                  >
                    FAQ
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}