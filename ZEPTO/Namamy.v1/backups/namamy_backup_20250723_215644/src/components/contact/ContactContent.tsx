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
    value: 'hello@namamy.com',
    description: 'emailDesc',
    action: 'mailto:hello@namamy.com',
    actionText: 'sendEmail',
  },
  {
    icon: Phone,
    title: 'phone',
    value: '+91 98765 43210',
    description: 'phoneDesc',
    action: 'tel:+919876543210',
    actionText: 'callNow',
  },
  {
    icon: MessageCircle,
    title: 'whatsapp',
    value: '+91 98765 43210',
    description: 'whatsappDesc',
    action: 'https://wa.me/919876543210',
    actionText: 'chatWhatsApp',
  },
];

const officeInfo = [
  {
    icon: MapPin,
    title: 'address',
    details: [
      'Namamy Foods Pvt. Ltd.',
      '123 Business Park, Andheri East',
      'Mumbai, Maharashtra 400069',
      'India',
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

          {/* Map Placeholder */}
          <Card>
            <CardContent className="p-0">
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">{t('office.mapPlaceholder')}</p>
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