'use client';

import { useState, useEffect } from 'react';
import { 
  Save, 
  User, 
  Lock, 
  Bell, 
  Mail, 
  Globe, 
  Shield, 
  Database, 
  Palette,
  Upload,
  Eye,
  EyeOff
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AdminLayout } from '@/components/admin/AdminLayout';

export default function AdminSettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [siteVisibility, setSiteVisibility] = useState('live'); // 'live', 'coming-soon', or 'shop-only-coming-soon'
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState(null);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [siteSettings, setSiteSettings] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState('Light');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // Load saved settings from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('namamy-admin-theme');
      const savedLanguage = localStorage.getItem('namamy-admin-language');
      
      if (savedTheme) {
        setSelectedTheme(savedTheme);
      }
      if (savedLanguage) {
        setSelectedLanguage(savedLanguage);
      }
    }
  }, []);

  // Load site settings
  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const response = await fetch('/api/admin/site-settings');
        const data = await response.json();
        if (data.success) {
          setSiteSettings(data.settings);
          if (data.settings.shopOnlyComingSoon) {
            setSiteVisibility('shop-only-coming-soon');
          } else if (data.settings.isComingSoon) {
            setSiteVisibility('coming-soon');
          } else {
            setSiteVisibility('live');
          }
        }
      } catch (error) {
        console.error('Failed to fetch site settings:', error);
      }
    };

    fetchSiteSettings();
  }, []);

  const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'backup', label: 'Backup', icon: Database }
  ];

  const TabIcon = tabs.find(tab => tab.id === activeTab)?.icon || User;

  const handleSaveChanges = async () => {
    setIsSaving(true);
    
    try {
      // Save site settings
      const response = await fetch('/api/admin/site-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isComingSoon: siteVisibility === 'coming-soon',
          shopOnlyComingSoon: siteVisibility === 'shop-only-coming-soon',
          comingSoonMessage: (siteSettings as any)?.comingSoonMessage,
          comingSoonTitle: (siteSettings as any)?.comingSoonTitle,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSiteSettings(data.settings);
        alert('Settings saved successfully!');
      } else {
        alert('Failed to save settings. Please try again.');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdatePassword = () => {
    alert('Password would be updated here. This is a demo, so no actual password change occurs.');
  };

  const handleToggle2FA = () => {
    if (twoFactorEnabled) {
      const confirm = window.confirm('Are you sure you want to disable Two-Factor Authentication? This will make your account less secure.');
      if (confirm) {
        setTwoFactorEnabled(false);
        alert('Two-Factor Authentication has been disabled.');
      }
    } else {
      alert('Two-Factor Authentication setup would begin here. This typically involves scanning a QR code with an authenticator app.');
      setTwoFactorEnabled(true);
    }
  };

  const handlePaymentGateway = (gateway: string, action: string) => {
    if (action === 'Connect') {
      alert(`Connecting to ${gateway}... This would open the ${gateway} integration setup.`);
    } else {
      alert(`Opening ${gateway} configuration... This would show connection settings and API keys.`);
    }
  };

  const handleShippingPartner = (partner: string, action: string) => {
    if (action === 'Connect') {
      alert(`Connecting to ${partner}... This would open the ${partner} integration setup.`);
    } else {
      alert(`Opening ${partner} configuration... This would show shipping settings and API keys.`);
    }
  };

  const handleCreateBackup = () => {
    alert('Creating backup... This would generate a backup file with all your data (products, orders, customers).');
  };

  const handleRestoreBackup = () => {
    const confirm = window.confirm('Are you sure you want to restore from backup? This will overwrite your current data.');
    if (confirm) {
      alert('Restore process would begin here. You would typically select a backup file to restore.');
    }
  };

  const handleDownloadBackup = (date: string) => {
    alert(`Downloading backup from ${date}... This would download the backup file to your computer.`);
  };

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    // Save to localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('namamy-admin-theme', theme);
    }
    alert(`Theme changed to ${theme}! This setting will persist after page refresh. The ${theme.toLowerCase()} theme would be applied to the admin interface.`);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    // Save to localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('namamy-admin-language', language);
    }
    alert(`Language changed to ${language}! This setting will persist after page refresh. The admin interface would switch to ${language}.`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage your admin preferences and configurations</p>
          </div>
          <Button 
            onClick={handleSaveChanges}
            disabled={isSaving}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-makhana-100 text-makhana-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>

          {/* Settings Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>General Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Information */}
                  <div>
                    <h4 className="font-medium mb-4">Profile Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Admin User"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue="contact@namamy.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          defaultValue="+91 7261071570"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Role
                        </label>
                        <Badge className="bg-makhana-100 text-makhana-800">Super Admin</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Store Information */}
                  <div>
                    <h4 className="font-medium mb-4">Store Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Store Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Namamy"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Store Email
                        </label>
                        <input
                          type="email"
                          defaultValue="contact@namamy.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Store Address
                        </label>
                        <textarea
                          rows={3}
                          defaultValue="Near Ghantaghar, Bhagalpur - 812001, Bihar, India"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Site Visibility */}
                  <div>
                    <h4 className="font-medium mb-4">Site Visibility</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Manage how your site appears to visitors. <a href="#" className="text-makhana-600 hover:text-makhana-700">Learn more</a>
                    </p>
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <strong>New:</strong> User-specific shop page settings are now available. Users can customize their shop page experience without affecting other parts of the site.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          id="live"
                          name="siteVisibility"
                          value="live"
                          checked={siteVisibility === 'live'}
                          onChange={(e) => setSiteVisibility(e.target.value)}
                          className="mt-1 w-4 h-4 text-makhana-600 focus:ring-makhana-500"
                        />
                        <div className="flex-1">
                          <label htmlFor="live" className="block text-sm font-medium text-gray-900 mb-1">
                            Live
                          </label>
                          <p className="text-sm text-gray-600">
                            Your entire site is visible to everyone.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          id="shop-only-coming-soon"
                          name="siteVisibility"
                          value="shop-only-coming-soon"
                          checked={siteVisibility === 'shop-only-coming-soon'}
                          onChange={(e) => setSiteVisibility(e.target.value)}
                          className="mt-1 w-4 h-4 text-makhana-600 focus:ring-makhana-500"
                        />
                        <div className="flex-1">
                          <label htmlFor="shop-only-coming-soon" className="block text-sm font-medium text-gray-900 mb-1">
                            Shop page coming soon
                          </label>
                          <p className="text-sm text-gray-600">
                            Only the shop page shows "Coming soon". Other pages (Home, About, Reviews, Blog, Contact) remain accessible.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          id="coming-soon"
                          name="siteVisibility"
                          value="coming-soon"
                          checked={siteVisibility === 'coming-soon'}
                          onChange={(e) => setSiteVisibility(e.target.value)}
                          className="mt-1 w-4 h-4 text-makhana-600 focus:ring-makhana-500"
                        />
                        <div className="flex-1">
                          <label htmlFor="coming-soon" className="block text-sm font-medium text-gray-900 mb-1">
                            Entire site coming soon
                          </label>
                          <p className="text-sm text-gray-600">
                            Your entire site is hidden from visitors behind a "Coming soon" landing page until it's ready for viewing.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Security Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Change Password */}
                  <div>
                    <h4 className="font-medium mb-4">Change Password</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                        />
                      </div>
                      <Button onClick={handleUpdatePassword}>
                        <Lock className="w-4 h-4 mr-2" />
                        Update Password
                      </Button>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div>
                    <h4 className="font-medium mb-4">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Enable 2FA</p>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline" onClick={handleToggle2FA}>
                        {twoFactorEnabled ? 'Disable' : 'Enable'}
                      </Button>
                    </div>
                  </div>

                  {/* Login Sessions */}
                  <div>
                    <h4 className="font-medium mb-4">Active Sessions</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Current Session</p>
                          <p className="text-sm text-gray-600">Chrome on MacOS • India</p>
                          <p className="text-xs text-gray-500">Last active: Now</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Notification Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Email Notifications */}
                  <div>
                    <h4 className="font-medium mb-4">Email Notifications</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'New Orders', description: 'Get notified when new orders are placed' },
                        { label: 'Low Stock Alerts', description: 'Get notified when products are running low' },
                        { label: 'Customer Messages', description: 'Get notified about customer inquiries' },
                        { label: 'Weekly Reports', description: 'Receive weekly performance reports' },
                        { label: 'Security Alerts', description: 'Get notified about security events' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{item.label}</p>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked={index < 3}
                            className="w-4 h-4 text-makhana-600 rounded focus:ring-makhana-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="w-5 h-5" />
                    <span>Appearance Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Theme */}
                  <div>
                    <h4 className="font-medium mb-4">Theme</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['Light', 'Dark', 'Auto'].map((theme) => (
                        <div key={theme} className="relative">
                          <input
                            type="radio"
                            name="theme"
                            checked={selectedTheme === theme}
                            onChange={() => handleThemeChange(theme)}
                            className="sr-only"
                          />
                          <div 
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              selectedTheme === theme
                                ? 'border-makhana-500 bg-makhana-50'
                                : 'border-gray-200 hover:border-makhana-300'
                            }`}
                            onClick={() => handleThemeChange(theme)}
                          >
                            <div className="text-center">
                              <div className={`w-12 h-12 mx-auto mb-2 rounded-lg ${
                                theme === 'Light' ? 'bg-white border' : 
                                theme === 'Dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-white to-gray-800'
                              }`} />
                              <p className="font-medium">{theme}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Language */}
                  <div>
                    <h4 className="font-medium mb-4">Language</h4>
                    <select 
                      value={selectedLanguage}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Bengali">Bengali</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Integrations Settings */}
            {activeTab === 'integrations' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span>Integrations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Payment Gateways */}
                  <div>
                    <h4 className="font-medium mb-4">Payment Gateways</h4>
                    <div className="space-y-3">
                      {[
                        { name: 'Razorpay', status: 'Connected', description: 'UPI, Cards, Net Banking' },
                        { name: 'PayPal', status: 'Not Connected', description: 'International payments' },
                        { name: 'Stripe', status: 'Not Connected', description: 'Global payment processing' }
                      ].map((gateway, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{gateway.name}</p>
                            <p className="text-sm text-gray-600">{gateway.description}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge className={
                              gateway.status === 'Connected' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }>
                              {gateway.status}
                            </Badge>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handlePaymentGateway(gateway.name, gateway.status === 'Connected' ? 'Configure' : 'Connect')}
                            >
                              {gateway.status === 'Connected' ? 'Configure' : 'Connect'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Partners */}
                  <div>
                    <h4 className="font-medium mb-4">Shipping Partners</h4>
                    <div className="space-y-3">
                      {[
                        { name: 'Delhivery', status: 'Connected', description: 'Pan-India delivery network' },
                        { name: 'Blue Dart', status: 'Not Connected', description: 'Express delivery services' },
                        { name: 'DTDC', status: 'Not Connected', description: 'Domestic & international courier' }
                      ].map((partner, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{partner.name}</p>
                            <p className="text-sm text-gray-600">{partner.description}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge className={
                              partner.status === 'Connected' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }>
                              {partner.status}
                            </Badge>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleShippingPartner(partner.name, partner.status === 'Connected' ? 'Configure' : 'Connect')}
                            >
                              {partner.status === 'Connected' ? 'Configure' : 'Connect'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Backup Settings */}
            {activeTab === 'backup' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5" />
                    <span>Backup & Data</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Automatic Backups */}
                  <div>
                    <h4 className="font-medium mb-4">Automatic Backups</h4>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Enable Daily Backups</p>
                        <p className="text-sm text-gray-600">Automatically backup your data every day at 2:00 AM</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-makhana-600 rounded focus:ring-makhana-500"
                      />
                    </div>
                  </div>

                  {/* Manual Backup */}
                  <div>
                    <h4 className="font-medium mb-4">Manual Backup</h4>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        Create a backup of your current data including products, orders, and customers.
                      </p>
                      <div className="flex space-x-4">
                        <Button onClick={handleCreateBackup}>
                          <Database className="w-4 h-4 mr-2" />
                          Create Backup
                        </Button>
                        <Button variant="outline" onClick={handleRestoreBackup}>
                          <Upload className="w-4 h-4 mr-2" />
                          Restore Backup
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Recent Backups */}
                  <div>
                    <h4 className="font-medium mb-4">Recent Backups</h4>
                    <div className="space-y-3">
                      {[
                        { date: '2024-01-30', size: '2.4 MB', status: 'Completed' },
                        { date: '2024-01-29', size: '2.3 MB', status: 'Completed' },
                        { date: '2024-01-28', size: '2.2 MB', status: 'Completed' }
                      ].map((backup, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">Backup - {backup.date}</p>
                            <p className="text-sm text-gray-600">Size: {backup.size}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge className="bg-green-100 text-green-800">{backup.status}</Badge>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDownloadBackup(backup.date)}
                            >
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}