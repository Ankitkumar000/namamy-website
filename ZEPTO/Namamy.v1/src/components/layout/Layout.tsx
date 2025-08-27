'use client';

import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Breadcrumb } from './Breadcrumb';

interface LayoutProps {
  children: ReactNode;
  locale: string;
  showBreadcrumb?: boolean;
  breadcrumbItems?: Array<{
    label: string;
    href?: string;
  }>;
  className?: string;
}

export function Layout({ 
  children, 
  locale, 
  showBreadcrumb = false, 
  breadcrumbItems,
  className = ''
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} />
      
      {showBreadcrumb && breadcrumbItems && (
        <Breadcrumb items={breadcrumbItems} locale={locale} />
      )}
      
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      
      <Footer locale={locale} />
    </div>
  );
}