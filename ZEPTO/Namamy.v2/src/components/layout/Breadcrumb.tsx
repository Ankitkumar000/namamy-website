'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
  }>;
  locale: string;
}

export function Breadcrumb({ items, locale }: BreadcrumbProps) {
  const t = useTranslations('breadcrumb');

  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 py-4 text-sm">
          {/* Home link */}
          <li>
            <Link
              href={`/${locale}`}
              className="flex items-center text-gray-500 hover:text-makhana-600 transition-colors"
            >
              <Home className="w-4 h-4 mr-1" />
              {t('home')}
            </Link>
          </li>

          {/* Dynamic breadcrumb items */}
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              {item.href && index < items.length - 1 ? (
                <Link
                  href={`/${locale}${item.href}`}
                  className="text-gray-500 hover:text-makhana-600 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}