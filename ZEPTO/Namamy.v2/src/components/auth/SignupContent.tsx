'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

interface SignupContentProps {
  locale: string;
}

export function SignupContent({ locale }: SignupContentProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    newsletter: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const t = useTranslations('auth.register');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('errors.nameRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('errors.emailInvalid');
    }

    if (formData.phone && !/^[+]?[\d\s\-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = t('errors.phoneInvalid');
    }

    if (!formData.password) {
      newErrors.password = t('errors.passwordRequired');
    } else if (formData.password.length < 6) {
      newErrors.password = t('errors.passwordMinLength');
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('errors.confirmPasswordRequired');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('errors.passwordMismatch');
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = t('errors.termsRequired');
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate signup API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful registration
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({
        id: '1',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      }));
      
      router.push(`/${locale}/account?welcome=true`);
    } catch (error) {
      setErrors({
        general: t('errors.signupFailed'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleGoogleSignup = () => {
    // In real app, this would initiate Google OAuth
    console.log('Google signup initiated');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link href={`/${locale}`} className="inline-flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-makhana-500 to-makhana-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="font-display text-2xl font-bold bg-gradient-to-r from-makhana-600 to-makhana-800 bg-clip-text text-transparent">
              Namamy
            </span>
          </Link>
          
          <h2 className="text-3xl font-display font-bold text-gray-900">
            {t('title')}
          </h2>
          <p className="mt-2 text-gray-600">
            {t('subtitle')}
          </p>
        </motion.div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.general && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-800">{errors.general}</p>
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    {t('name')} <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-3 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t('email')} <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-3 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email address"
                    />
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    {t('phone')}
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-3 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+91 7261071570, 70912 60484"
                    />
                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    {t('password')} <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`w-full px-3 py-2 pl-10 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Create a password (min. 6 characters)"
                    />
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    {t('confirmPassword')} <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`w-full px-3 py-2 pl-10 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Confirm your password"
                    />
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>

                {/* Terms & Newsletter */}
                <div className="space-y-4">
                  <div className="flex items-start">
                    <input
                      id="acceptTerms"
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                      className="h-4 w-4 text-makhana-600 focus:ring-makhana-500 border-gray-300 rounded mt-0.5"
                    />
                    <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-900">
                      {t('terms')} <span className="text-red-500">*</span>
                    </label>
                  </div>
                  {errors.acceptTerms && <p className="text-sm text-red-600">{errors.acceptTerms}</p>}

                  <div className="flex items-center">
                    <input
                      id="newsletter"
                      type="checkbox"
                      checked={formData.newsletter}
                      onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                      className="h-4 w-4 text-makhana-600 focus:ring-makhana-500 border-gray-300 rounded"
                    />
                    <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-900">
                      {t('newsletter')}
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <ArrowRight className="w-5 h-5 mr-2" />
                  )}
                  {isLoading ? t('creatingAccount') : t('createAccount')}
                </Button>
              </form>

              {/* Divider */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      {t('orContinueWith')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Google Signup */}
              <div className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignup}
                  className="w-full"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {t('google')}
                </Button>
              </div>

              {/* Sign In Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {t('hasAccount')}{' '}
                  <Link
                    href={`/${locale}/auth/login`}
                    className="font-medium text-makhana-600 hover:text-makhana-500"
                  >
                    {t('signIn')}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}