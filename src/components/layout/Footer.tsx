'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  Leaf,
  Shield,
  Truck,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface FooterProps {
  locale: string;
}

const footerLinks = {
  company: [
    { name: 'about', href: '/about' },
    { name: 'whyNamamy', href: '/why-namamy' },
  ],
  products: [
    { name: 'shop', href: '/shop' },
    { name: 'roasted', href: '/shop?category=roasted' },
    { name: 'flavored', href: '/shop?category=flavored' },
    { name: 'premium', href: '/shop?category=premium' },
  ],
  support: [
    { name: 'contact', href: '/contact' },
    { name: 'faq', href: '/faq' },
    { name: 'returns', href: '/returns' },
  ],
  legal: [
    { name: 'privacy', href: '/legal/privacy' },
    { name: 'terms', href: '/legal/terms' },
    { name: 'refund', href: '/legal/refund' },
    { name: 'shipping', href: '/legal/shipping' },
  ],
};

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/namamy', icon: Facebook },
  { name: 'Twitter', href: 'https://twitter.com/namamy', icon: Twitter },
  { name: 'Instagram', href: 'https://instagram.com/namamy', icon: Instagram },
  { name: 'YouTube', href: 'https://youtube.com/namamy', icon: Youtube },
];

const features = [
  {
    icon: Truck,
    title: 'freeShipping',
    description: 'freeShippingDesc',
  },
  {
    icon: Shield,
    title: 'qualityGuarantee',
    description: 'qualityGuaranteeDesc',
  },
  {
    icon: Leaf,
    title: 'naturalIngredients',
    description: 'naturalIngredientsDesc',
  },
  {
    icon: Heart,
    title: 'healthyChoice',
    description: 'healthyChoiceDesc',
  },
];

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        setEmail('');
      } else {
        setMessage({ type: 'error', text: data.error || 'Subscription failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Features Section */}
      <div className="bg-organic-50 py-12 border-t border-organic-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-organic-500 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {t(`features.${feature.title}`)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t(`features.${feature.description}`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href={`/${locale}`} className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-organic-500 to-makhana-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">N</span>
                </div>
                <span className="font-display text-2xl font-bold text-white">
                  Namamy
                </span>
              </Link>
              <p className="text-gray-300 mb-6 max-w-md">
                {t('brandDescription')}
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-organic-400" />
                  <span className="text-gray-300">contact@namamy.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-organic-400" />
                  <span className="text-gray-300">+91 7261071570, 70912 60484</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-organic-400" />
                  <span className="text-gray-300">House no-263, Police Station Road, Sabour, Bhagalpur, 813210</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-makhana-400 transition-colors"
                  >
                    <span className="sr-only">{social.name}</span>
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('company')}</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {t(`links.${link.name}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t('products')}</h3>
              <ul className="space-y-2">
                {footerLinks.products.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {t(`links.${link.name}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t('support')}</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {t(`links.${link.name}`)}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-2">{t('legal')}</h4>
                <ul className="space-y-1">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={`/${locale}${link.href}`}
                        className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
                      >
                        {t(`links.${link.name}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-1">{t('newsletter.title')}</h3>
              <p className="text-gray-400">{t('newsletter.description')}</p>
            </div>
            <div className="w-full max-w-md">
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('newsletter.placeholder')}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent disabled:opacity-50"
                />
                <Button 
                  type="submit" 
                  disabled={isLoading || !email}
                  className="rounded-l-none"
                >
                  {isLoading ? 'Subscribing...' : t('newsletter.subscribe')}
                </Button>
              </form>
              {message && (
                <div className={`mt-2 flex items-center gap-2 text-sm ${
                  message.type === 'success' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {message.type === 'success' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  {message.text}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © {currentYear} Namamy. {t('copyright')}
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">{t('madeWith')} </span>
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-gray-400 text-sm"> {t('inIndia')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}