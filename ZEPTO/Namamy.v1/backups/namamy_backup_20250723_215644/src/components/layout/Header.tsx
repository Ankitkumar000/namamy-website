'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Menu, X, Search, ShoppingCart, User, Heart, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/store/cart';
import { cn } from '@/lib/utils';

interface HeaderProps {
  locale: string;
}

const navigation = [
  { name: 'home', href: '/' },
  { name: 'shop', href: '/shop' },
  { name: 'about', href: '/about' },
  { name: 'blog', href: '/blog' },
  { name: 'contact', href: '/contact' },
];

const userMenuItems = [
  { name: 'account', href: '/account', icon: User },
  { name: 'orders', href: '/account/orders', icon: ShoppingCart },
  { name: 'wishlist', href: '/wishlist', icon: Heart },
];

export function Header({ locale }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const t = useTranslations('header');
  const { totalItems } = useCartStore();

  return (
    <header className="bg-white shadow-sm border-b border-makhana-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-makhana-500 to-makhana-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="font-display text-2xl font-bold bg-gradient-to-r from-makhana-600 to-makhana-800 bg-clip-text text-transparent">
                Namamy
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={`/${locale}${item.href === '/' ? '' : item.href}`}
                className="text-gray-700 hover:text-makhana-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {t(`nav.${item.name}`)}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Search className="w-5 h-5" />
            </Button>

            {/* Wishlist */}
            <Link href={`/${locale}/wishlist`}>
              <Button variant="ghost" size="sm">
                <Heart className="w-5 h-5" />
              </Button>
            </Link>

            {/* Cart */}
            <Link href={`/${locale}/cart`}>
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {totalItems > 99 ? '99+' : totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-1"
              >
                <User className="w-5 h-5" />
                <ChevronDown className="w-3 h-3" />
              </Button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1">
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={`/${locale}${item.href}`}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <item.icon className="w-4 h-4 mr-3" />
                      {t(`userMenu.${item.name}`)}
                    </Link>
                  ))}
                  <hr className="my-1" />
                  <Link
                    href={`/${locale}/auth/login`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    {t('userMenu.login')}
                  </Link>
                  <Link
                    href={`/${locale}/auth/signup`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    {t('userMenu.signup')}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={`/${locale}${item.href === '/' ? '' : item.href}`}
                  className="text-gray-700 hover:text-makhana-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(`nav.${item.name}`)}
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center px-3 py-2">
                  <Search className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-gray-700">{t('search')}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}