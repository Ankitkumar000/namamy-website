'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  User,
  Store,
  BookOpen,
  MessageSquare,
  Mail,
  Star,
  Shield,
  Tag,
  CreditCard,
  TrendingUp,
  Megaphone,
  Phone,
  Plus,
  AlertTriangle,
  Upload,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { NamamyLogo } from '@/components/ui/NamamyLogo';
import { ToastProvider } from '@/components/ui/Toast';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const quickAccess = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Customers', href: '/admin/customers', icon: Users },
];

const navigationSections = [
  {
    title: 'Analytics & Reports',
    items: [
      { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
      { name: 'Payments', href: '/admin/payments', icon: CreditCard },
    ]
  },
  {
    title: 'Sales & Promotions',
    items: [
      { name: 'Coupons', href: '/admin/coupons', icon: Tag },
    ]
  },
  {
    title: 'Inventory & Reviews',
    items: [
      { name: 'Inventory', href: '/admin/inventory', icon: AlertTriangle },
      { name: 'Reviews', href: '/admin/reviews', icon: Star },
    ]
  },
  {
    title: 'User Management',
    items: [
      { name: 'Users', href: '/admin/users', icon: Shield },
    ]
  },
  {
    title: 'Content & Media',
    items: [
      { name: 'Blog', href: '/admin/blog', icon: BookOpen },
      { name: 'Comments', href: '/admin/comments', icon: MessageSquare },
      { name: 'Files', href: '/admin/files', icon: Upload },
    ]
  },
  {
    title: 'Marketing & SEO',
    items: [
      { name: 'Marketing', href: '/admin/marketing', icon: Megaphone },
      { name: 'Email Templates', href: '/admin/email-templates', icon: Mail },
      { name: 'SEO', href: '/admin/seo', icon: Globe },
    ]
  },
  {
    title: 'Support & Settings',
    items: [
      { name: 'Contact', href: '/admin/contact', icon: Phone },
      { name: 'Settings', href: '/admin/settings', icon: Settings },
    ]
  }
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    // Clear admin token
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/admin/login');
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg text-white">Namamy</span>
                <div className="text-xs text-slate-400">Admin Panel</div>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            {/* Quick Access */}
            <div className="mb-6">
              <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Quick Access
              </div>
              <div className="space-y-1">
                {quickAccess.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className={`w-5 h-5 mr-3 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                      }`} />
                      {item.name}
                      {item.name === 'Orders' && (
                        <Badge variant="default" className="ml-auto bg-orange-500 text-white">
                          12
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Section Divider */}
            <div className="border-t border-slate-700 mb-6"></div>

            {navigationSections.map((section, sectionIndex) => (
              <div key={section.title} className={sectionIndex > 0 ? 'mt-6' : ''}>
                {/* Section Title */}
                <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {section.title}
                </div>
                
                {/* Section Items */}
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <item.icon className={`w-5 h-5 mr-3 ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                        }`} />
                        {item.name}
                        {item.name === 'Comments' && (
                          <Badge variant="destructive" className="ml-auto bg-red-500 text-white">
                            5
                          </Badge>
                        )}
                        {item.name === 'Orders' && (
                          <Badge variant="default" className="ml-auto bg-orange-500 text-white">
                            12
                          </Badge>
                        )}
                        {item.name === 'Inventory' && (
                          <Badge variant="destructive" className="ml-auto bg-red-500 text-white">
                            3
                          </Badge>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin User</p>
                <p className="text-xs text-slate-400 truncate">admin@namamy.com</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-500"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="bg-slate-900 shadow-sm border-b border-slate-700">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="ml-4 lg:ml-0">
                <h1 className="text-2xl font-semibold text-white capitalize">
                  {pathname.split('/').pop()?.replace('-', ' ') || 'Home'}
                </h1>
                <div className="text-xs text-slate-400 mt-0.5">
                  Manage your {pathname.split('/').pop()?.replace('-', ' ') || 'dashboard'}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search admin..."
                  className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative text-slate-300 hover:text-white hover:bg-slate-700">
                <Bell className="w-5 h-5" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white"
                >
                  3
                </Badge>
              </Button>

              {/* Quick Actions */}
              <div className="hidden sm:block h-6 w-px bg-slate-600"></div>

              {/* Store Link */}
              <Link href="/">
                <Button variant="outline" size="sm" className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-500">
                  <Store className="w-4 h-4 mr-2" />
                  View Store
                </Button>
              </Link>

              {/* Add New Button */}
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="bg-gray-100 min-h-screen">
          <div className="p-4 sm:p-6">
            {children}
          </div>
        </main>
      </div>
      </div>
    </ToastProvider>
  );
}