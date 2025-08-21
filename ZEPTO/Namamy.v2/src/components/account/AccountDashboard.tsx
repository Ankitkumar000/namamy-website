'use client';

import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Settings,
  Package,
  Star,
  TrendingUp,
  Award,
  Gift
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AccountSidebar } from './AccountSidebar';
import { OrderHistory } from './OrderHistory';
import { ProfileSettings } from './ProfileSettings';
import { WishlistContent } from './WishlistContent';
import { AddressManager } from './AddressManager';

interface AccountDashboardProps {
  locale: string;
}

type ActiveTab = 'overview' | 'orders' | 'wishlist' | 'addresses' | 'profile';

// Mock user data
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+91 7261071570, 70912 60484',
  joinDate: '2023-06-15',
  totalOrders: 12,
  totalSpent: 8450,
  loyaltyPoints: 850,
  wishlistItems: 5,
};

const mockStats = [
  {
    icon: Package,
    label: 'totalOrders',
    value: '12',
    change: '+2 this month',
    color: 'blue',
  },
  {
    icon: TrendingUp,
    label: 'totalSpent',
    value: '₹8,450',
    change: '+₹650 this month',
    color: 'green',
  },
  {
    icon: Award,
    label: 'loyaltyPoints',
    value: '850',
    change: '+50 this month',
    color: 'purple',
  },
  {
    icon: Heart,
    label: 'wishlistItems',
    value: '5',
    change: '+1 this week',
    color: 'red',
  },
];

export function AccountDashboard({ locale }: AccountDashboardProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [user, setUser] = useState(mockUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const t = useTranslations('dashboard');

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');
    
    if (authStatus === 'true' && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    } else {
      redirect(`/${locale}/auth/login`);
    }
  }, [locale]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return <OrderHistory locale={locale} />;
      case 'wishlist':
        return <WishlistContent locale={locale} />;
      case 'profile':
        return <ProfileSettings locale={locale} user={user} />;
      case 'addresses':
        return <AddressManager locale={locale} />;
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gradient-to-r from-makhana-500 to-makhana-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-display font-bold mb-2">
                        {t('welcome')}, {user.name}! 👋
                      </h2>
                      <p className="opacity-90">
                        {t('welcomeMessage')}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">{mockStats[2].value}</div>
                      <p className="text-sm opacity-90">{t('loyaltyPoints')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockStats.map((stat, index) => {
                const StatIcon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                            <StatIcon className={`w-6 h-6 text-${stat.color}-600`} />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <p className="text-sm font-medium text-gray-600">
                            {t(`overview.${stat.label}`)}
                          </p>
                          <p className="text-xs text-green-600">{stat.change}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Recent Orders & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{t('overview.recentOrders')}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveTab('orders')}
                      >
                        {t('overview.viewAll')}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {/* Mock recent orders */}
                      {[1, 2, 3].map((order) => (
                        <div key={order} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-makhana-100 rounded-lg flex items-center justify-center">
                              <Package className="w-5 h-5 text-makhana-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                Order #ORD-202400{order}
                              </p>
                              <p className="text-sm text-gray-600">
                                2 items • ₹599
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            Delivered
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{t('overview.quickActions')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setActiveTab('orders')}
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      {t('overview.trackOrder')}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setActiveTab('wishlist')}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      {t('overview.viewWishlist')}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setActiveTab('profile')}
                    >
                      <User className="w-4 h-4 mr-2" />
                      {t('overview.updateProfile')}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => window.open(`/${locale}/shop`, '_blank')}
                    >
                      <Gift className="w-4 h-4 mr-2" />
                      {t('overview.shopNow')}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Loyalty Program */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        {t('loyalty.title')}
                      </h3>
                      <p className="opacity-90 mb-4">
                        {t('loyalty.description')}
                      </p>
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-2xl font-bold">{mockStats[2].value}</p>
                          <p className="text-sm opacity-90">{t('loyalty.currentPoints')}</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">150</p>
                          <p className="text-sm opacity-90">{t('loyalty.nextReward')}</p>
                        </div>
                      </div>
                    </div>
                    <Award className="w-16 h-16 opacity-50" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <AccountSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            user={user}
            locale={locale}
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}