'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ContactForm } from './ContactForm';

interface ContactContentProps {
  locale: string;
}

const contactMethods = [
  {
    icon: Mail,
    title: 'email',
    value: 'contact@namamy.com',
    description: 'emailDesc',
    action: 'mailto:contact@namamy.com',
    actionText: 'sendEmail',
  },
  {
    icon: Phone,
    title: 'phone',
    value: '+91 7261071570, 70912 60484',
    description: 'phoneDesc',
    action: 'tel:+917261071570',
    actionText: 'callNow',
  },
  {
    icon: MessageCircle,
    title: 'whatsapp',
    value: '+91 7261071570',
    description: 'whatsappDesc',
    action: 'https://wa.me/917261071570',
    actionText: 'chatWhatsApp',
  },
];

const officeInfo = [
  {
    icon: MapPin,
    title: 'address',
    details: [
      'House no-263, Police Station Road',
      'Sabour, Bhagalpur, 813210',
      'Bihar, India',
    ],
  },
  {
    icon: Clock,
    title: 'hours',
    details: [
      'Monday - Friday: 9:00 AM - 6:00 PM',
      'Saturday: 10:00 AM - 4:00 PM',
      'Sunday: Closed',
      'IST (Indian Standard Time)',
    ],
  },
];

const faqItems = [
  {
    question: 'orderQuestions',
    answer: 'orderAnswers',
  },
  {
    question: 'productQuestions',
    answer: 'productAnswers',
  },
  {
    question: 'shippingQuestions',
    answer: 'shippingAnswers',
  },
  {
    question: 'returnQuestions',
    answer: 'returnAnswers',
  },
];

export function ContactContent({ locale }: ContactContentProps) {
  const [submitted, setSubmitted] = useState(false);
  const t = useTranslations('contact');

  const handleFormSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </motion.div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-makhana-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-8 h-8 text-makhana-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t(`methods.${method.title}`)}
                  </h3>
                  <p className="font-medium text-makhana-600 mb-2">
                    {method.value}
                  </p>
                  <p className="text-gray-600 mb-4">
                    {t(`methods.${method.description}`)}
                  </p>
                  <a
                    href={method.action}
                    target={method.action.startsWith('http') ? '_blank' : undefined}
                    rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <Button variant="outline" size="sm">
                      {t(`methods.${method.actionText}`)}
                      {method.action.startsWith('http') && (
                        <ExternalLink className="w-4 h-4 ml-2" />
                      )}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="w-6 h-6 text-makhana-600" />
                <span>{t('form.title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t('form.success.title')}
                  </h3>
                  <p className="text-gray-600">
                    {t('form.success.message')}
                  </p>
                </motion.div>
              ) : (
                <ContactForm locale={locale} onSubmit={handleFormSubmit} />
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Office Information */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {officeInfo.map((info, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-makhana-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-makhana-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t(`office.${info.title}`)}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Interactive Map Section */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-makhana-500 to-makhana-600 text-white">
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-6 h-6" />
                <span>Find Us Here</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Embedded Google Maps */}
              <div className="relative h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114955.35793165654!2d86.8929167!3d25.2550171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f04a68cb8b0c6b%3A0x39e1e97f7a1e9f7a!2sSabour%2C%20Bihar%20813210!5e0!3m2!1sen!2sin!4v1707234567890!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Namamy Location - Sabour, Bhagalpur, Bihar"
                  className="rounded-t-none"
                ></iframe>
                
                {/* Location Pin Overlay */}
                <motion.div
                  initial={{ scale: 0, y: -20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="absolute top-4 right-4 pointer-events-none"
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                    <MapPin className="w-6 h-6 text-red-500" fill="currentColor" />
                  </div>
                </motion.div>
                
                {/* Address Card Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="absolute bottom-4 left-4 right-4"
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <h4 className="font-bold text-gray-900 text-lg">Namamy Headquarters</h4>
                        </div>
                        
                        <div className="space-y-2 text-gray-700">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-makhana-600 flex-shrink-0" />
                            <span className="text-sm font-medium">House no-263, Police Station Road</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 flex-shrink-0"></div>
                            <span className="text-sm">Sabour, Bhagalpur - 813210</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 flex-shrink-0"></div>
                            <span className="text-sm font-medium">Bihar, India</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        size="sm"
                        className="ml-4 bg-makhana-600 hover:bg-makhana-700"
                        onClick={() => {
                          const address = "House no-263, Police Station Road, Sabour, Bhagalpur, 813210, Bihar, India";
                          const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
                          window.open(googleMapsUrl, '_blank');
                        }}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open Maps
                      </Button>
                    </div>
                  </div>
                </motion.div>
                
                {/* Interactive Map Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                    🗺️ Interactive Google Maps
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="p-4 bg-gray-50 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const address = "House no-263, Police Station Road, Sabour, Bhagalpur, 813210, Bihar, India";
                        navigator.clipboard.writeText(address);
                        alert('Address copied to clipboard!');
                      }}
                    >
                      📋 Copy Address
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const address = "House no-263, Police Station Road, Sabour, Bhagalpur, 813210, Bihar, India";
                        const appleMapUrl = `http://maps.apple.com/?q=${encodeURIComponent(address)}`;
                        window.open(appleMapUrl, '_blank');
                      }}
                    >
                      🍎 Apple Maps
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500">
                    📍 Bhagalpur, Bihar
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {t(`faq.${item.question}`)}
                  </h3>
                  <p className="text-gray-600">
                    {t(`faq.${item.answer}`)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            {t('faq.moreHelp')}
          </p>
          <Button asChild>
            <a href={`/${locale}/faq`}>
              {t('faq.viewAll')}
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}