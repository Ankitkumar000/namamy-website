'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Settings,
  LogOut,
  Grid3X3,
  Bell,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface AccountSidebarProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
  user: any;
  locale: string;
}

const menuItems = [
  { id: 'overview', label: 'overview', icon: Grid3X3 },
  { id: 'orders', label: 'orders', icon: ShoppingBag },
  { id: 'wishlist', label: 'wishlist', icon: Heart },
  { id: 'addresses', label: 'addresses', icon: MapPin },
  { id: 'profile', label: 'profile', icon: Settings },
  { id: 'notifications', label: 'notifications', icon: Bell },
];

export function AccountSidebar({ activeTab, onTabChange, user, locale }: AccountSidebarProps) {
  const router = useRouter();
  const t = useTranslations('dashboard');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    router.push(`/${locale}/auth/login`);
  };

  return (
    <div className="space-y-6">
      {/* User Info Card */}
      <Card>
        <CardContent className="p-6 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-makhana-500 to-makhana-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{user.name}</h3>
          <p className="text-sm text-gray-600 mb-3">{user.email}</p>
          <Badge variant="outline" className="text-xs">
            {t('memberSince')} {new Date(user.joinDate).getFullYear()}
          </Badge>
        </CardContent>
      </Card>

      {/* Navigation Menu */}
      <Card>
        <CardContent className="p-4">
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const ItemIcon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors
                    ${isActive 
                      ? 'bg-makhana-50 text-makhana-700 border-l-4 border-makhana-500' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <ItemIcon className="w-5 h-5" />
                  <span className="font-medium">{t(`menu.${item.label}`)}</span>
                  {item.id === 'notifications' && (
                    <Badge variant="destructive" className="ml-auto w-2 h-2 p-0 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </CardContent>
      </Card>

      {/* Help & Support */}
      <Card>
        <CardContent className="p-4">
          <Button variant="outline" className="w-full justify-start mb-3">
            <HelpCircle className="w-4 h-4 mr-2" />
            {t('menu.support')}
          </Button>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {t('menu.logout')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}