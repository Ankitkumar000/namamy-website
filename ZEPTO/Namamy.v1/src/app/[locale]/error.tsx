'use client';

import { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RefreshCw, Home, MessageCircle, AlertTriangle } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Page Error:', error);
  }, [error]);

  return (
    <Layout locale="en">
      <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card>
            <CardContent className="p-12">
              {/* Error Icon */}
              <div className="mb-8">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-12 h-12 text-red-600" />
                </div>
              </div>

              {/* Main Message */}
              <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
                  Something went wrong!
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  We encountered an unexpected error. Don't worry, our team has been notified 
                  and we're working to fix it. Please try again in a moment.
                </p>
              </div>

              {/* Error Details (Development Mode) */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                  <h3 className="text-sm font-semibold text-red-800 mb-2">
                    Error Details (Development Mode):
                  </h3>
                  <p className="text-xs text-red-700 font-mono break-all">
                    {error.message}
                  </p>
                  {error.digest && (
                    <p className="text-xs text-red-600 mt-2">
                      Error ID: {error.digest}
                    </p>
                  )}
                </div>
              )}

              {/* Illustration */}
              <div className="mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-6xl">😕</span>
                </div>
                <p className="text-sm text-gray-500 italic">
                  "Even the crunchiest makhana sometimes gets a bit soft!"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={reset}
                  className="flex items-center"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Try Again
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = '/'}
                  className="flex items-center"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Go Home
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = '/contact'}
                  className="flex items-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contact Support
                </Button>
              </div>

              {/* Additional Help */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Need Immediate Help?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Email Support</h4>
                    <p className="text-gray-600">contact@namamy.com</p>
                    <p className="text-xs text-gray-500 mt-1">Response within 24 hours</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Phone Support</h4>
                    <p className="text-gray-600">+91 98765 43210</p>
                    <p className="text-xs text-gray-500 mt-1">Mon-Sat: 9AM-6PM IST</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">WhatsApp</h4>
                    <p className="text-gray-600">+91 98765 43210</p>
                    <p className="text-xs text-gray-500 mt-1">Quick responses</p>
                  </div>
                </div>
              </div>

              {/* Error ID for Support */}
              {error.digest && (
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Error Reference:</strong> {error.digest}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Please provide this reference when contacting support for faster assistance.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}