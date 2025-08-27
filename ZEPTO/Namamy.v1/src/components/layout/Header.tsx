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
import { NamamyLogo } from '@/components/ui/NamamyLogo';

interface HeaderProps {
  locale: string;
}

const navigation = [
  { name: 'home', href: '/' },
  { name: 'shop', href: '/shop' },
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
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const t = useTranslations('header');
  const { totalItems } = useCartStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchModal(false);
      setSearchQuery('');
      window.location.href = `/${locale}/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-organic-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={`/${locale}`}>
              <NamamyLogo size="md" variant="full" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={`/${locale}${item.href === '/' ? '' : item.href}`}
                className="text-gray-700 hover:text-organic-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {t(`nav.${item.name}`)}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden sm:flex"
              onClick={() => setShowSearchModal(true)}
            >
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
                  className="text-gray-700 hover:text-organic-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(`nav.${item.name}`)}
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-4">
                <button 
                  className="flex items-center px-3 py-2 w-full text-left hover:bg-gray-50 rounded-md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowSearchModal(true);
                  }}
                >
                  <Search className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-gray-700">{t('search')}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Modal */}
        {showSearchModal && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowSearchModal(false);
              }
            }}
          >
            <div className="bg-white rounded-lg w-full max-w-2xl mx-4 shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Search Products</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSearchModal(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for makhana, flavors, or products..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-organic-500 focus:border-transparent text-lg"
                      autoFocus
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-gray-500">
                      Press Enter to search or click the button
                    </p>
                    <Button type="submit" disabled={!searchQuery.trim()}>
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </form>

                {/* Quick search suggestions */}
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">Popular searches:</p>
                  <div className="flex flex-wrap gap-2">
                    {['roasted makhana', 'chocolate makhana', 'premium collection', 'gift packs'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setShowSearchModal(false);
                          window.location.href = `/${locale}/shop?search=${encodeURIComponent(suggestion)}`;
                        }}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}