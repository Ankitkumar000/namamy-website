'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Package, CreditCard, Truck, RotateCcw, Phone, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface FAQContentProps {
  locale: string;
}

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  icon: any;
}

const faqData: FAQItem[] = [
  // Product Questions
  {
    id: 'product-1',
    category: 'Products',
    question: 'What is makhana and why should I choose Namamy?',
    answer: 'Makhana, also known as fox nuts or lotus seeds, are nutrient-rich snacks harvested from lotus flowers. Namamy offers premium quality makhana that is hand-picked, roasted to perfection, and packed with protein, fiber, and essential minerals. Our products are 100% natural with no artificial preservatives, making them the perfect healthy snacking choice.',
    icon: Package,
  },
  {
    id: 'product-2',
    category: 'Products',
    question: 'Are your products organic and natural?',
    answer: 'Yes! All Namamy products are made from organically grown lotus seeds sourced directly from farmers in Bihar. We use traditional roasting methods and natural seasonings. Our makhana contains no artificial colors, preservatives, or harmful chemicals.',
    icon: Package,
  },
  {
    id: 'product-3',
    category: 'Products',
    question: 'What flavors do you offer?',
    answer: 'We offer a variety of delicious flavors including Classic Roasted, Masala Mix, Peri Peri, Chocolate, Himalayan Pink Salt, Cheese & Herbs, and seasonal limited editions. Each flavor is carefully crafted to deliver the perfect taste experience.',
    icon: Package,
  },
  {
    id: 'product-4',
    category: 'Products',
    question: 'What is the shelf life of your products?',
    answer: 'Our makhana products have a shelf life of 6-12 months from the manufacturing date when stored in a cool, dry place. Each package displays the manufacturing and expiry dates clearly. For best taste and crunchiness, we recommend consuming within 3 months of opening.',
    icon: Package,
  },
  {
    id: 'product-5',
    category: 'Products',
    question: 'Are your products suitable for people with dietary restrictions?',
    answer: 'Yes! Our makhana is naturally gluten-free, vegan-friendly, and suitable for people with diabetes (in moderation). Most of our flavors are also keto-friendly. However, please check individual product labels for specific allergen information.',
    icon: Package,
  },

  // Shipping Questions
  {
    id: 'shipping-1',
    category: 'Shipping',
    question: 'Do you provide free shipping?',
    answer: 'Yes! We offer free shipping on all orders above ₹500 across India. For orders below ₹500, standard shipping charges of ₹50-100 apply depending on your location. We also offer express delivery options for faster delivery.',
    icon: Truck,
  },
  {
    id: 'shipping-2',
    category: 'Shipping',
    question: 'How long does delivery take?',
    answer: 'Standard delivery takes 2-5 business days for most locations across India. Express delivery is available in major cities with 1-2 day delivery. Remote areas may take 5-7 business days. You\'ll receive tracking information once your order is shipped.',
    icon: Truck,
  },
  {
    id: 'shipping-3',
    category: 'Shipping',
    question: 'Which areas do you deliver to?',
    answer: 'We deliver pan-India to all serviceable PIN codes. This includes major cities, towns, and most rural areas. During checkout, our system will automatically verify if delivery is available to your location. If not, please contact our support team for alternative arrangements.',
    icon: Truck,
  },
  {
    id: 'shipping-4',
    category: 'Shipping',
    question: 'Can I track my order?',
    answer: 'Absolutely! Once your order is shipped, you\'ll receive an email and SMS with tracking details. You can also track your order through your account dashboard or our order tracking page. We provide real-time updates on your shipment status.',
    icon: Truck,
  },

  // Payment Questions
  {
    id: 'payment-1',
    category: 'Payments',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major payment methods including Credit/Debit Cards (Visa, MasterCard, RuPay), UPI (GPay, PhonePe, Paytm), Net Banking, Digital Wallets, and Cash on Delivery (COD) for eligible locations.',
    icon: CreditCard,
  },
  {
    id: 'payment-2',
    category: 'Payments',
    question: 'Is it safe to pay online on your website?',
    answer: 'Yes, your payment information is completely secure. We use 256-bit SSL encryption and comply with PCI DSS security standards. All transactions are processed through secure payment gateways. We never store your payment information on our servers.',
    icon: CreditCard,
  },
  {
    id: 'payment-3',
    category: 'Payments',
    question: 'Do you offer Cash on Delivery (COD)?',
    answer: 'Yes, COD is available for most locations across India. COD orders may have a small handling fee of ₹25. Please note that COD is subject to order value limits and location serviceability.',
    icon: CreditCard,
  },
  {
    id: 'payment-4',
    category: 'Payments',
    question: 'Can I get an invoice for my purchase?',
    answer: 'Yes! We provide detailed GST invoices for all purchases. You can download your invoice from your account dashboard or we can email it to you. For bulk orders, we also provide customized invoicing solutions.',
    icon: CreditCard,
  },

  // Returns & Refunds
  {
    id: 'returns-1',
    category: 'Returns',
    question: 'What is your return policy?',
    answer: 'We offer a 7-day return policy for unopened products in original packaging. Returns are accepted for damaged items, wrong products, or quality issues. Please contact our support team within 7 days of delivery to initiate a return.',
    icon: RotateCcw,
  },
  {
    id: 'returns-2',
    category: 'Returns',
    question: 'How do I return a product?',
    answer: 'Contact our customer service team at returns@namamy.com or call +91 98765 43210 within 7 days of delivery. Provide your order number and reason for return. We\'ll guide you through the return process and provide a return label if needed.',
    icon: RotateCcw,
  },
  {
    id: 'returns-3',
    category: 'Returns',
    question: 'How long does it take to process refunds?',
    answer: 'Refunds are processed within 3-5 business days after we receive the returned item. The amount will be credited to your original payment method. For COD orders, we\'ll process a bank transfer (please provide bank details).',
    icon: RotateCcw,
  },
  {
    id: 'returns-4',
    category: 'Returns',
    question: 'Can I exchange a product?',
    answer: 'Yes, exchanges are available for defective products, wrong items, or different variants. Contact our support team and we\'ll arrange an exchange. There are no additional charges for exchanges due to our error.',
    icon: RotateCcw,
  },

  // Customer Support
  {
    id: 'support-1',
    category: 'Support',
    question: 'How can I contact customer support?',
    answer: 'You can reach us via Email: support@namamy.com, Phone: +91 98765 43210, WhatsApp: +91 98765 43210, or through the contact form on our website. Our support hours are Monday-Saturday, 9AM-6PM IST.',
    icon: Phone,
  },
  {
    id: 'support-2',
    category: 'Support',
    question: 'Do you offer bulk order discounts?',
    answer: 'Yes! We offer attractive discounts for bulk orders (50+ units), corporate gifting, and wholesale purchases. Please contact our sales team at bulk@namamy.com or call +91 98765 43210 for custom pricing and solutions.',
    icon: Phone,
  },
  {
    id: 'support-3',
    category: 'Support',
    question: 'Can I cancel my order?',
    answer: 'Yes, you can cancel your order before it\'s shipped. Contact us immediately at support@namamy.com or through your account dashboard. Once shipped, cancellation is not possible, but you can return the product as per our return policy.',
    icon: Phone,
  },
  {
    id: 'support-4',
    category: 'Support',
    question: 'Do you have a loyalty program?',
    answer: 'Yes! Our Namamy Rewards program lets you earn points with every purchase. Points can be redeemed for discounts on future orders. You also get exclusive access to new products, special offers, and member-only events.',
    icon: Phone,
  },
];

const categories = ['All', 'Products', 'Shipping', 'Payments', 'Returns', 'Support'];

const categoryIcons = {
  Products: Package,
  Shipping: Truck,
  Payments: CreditCard,
  Returns: RotateCcw,
  Support: Phone,
};

export function FAQContent({ locale }: FAQContentProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqData.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mt-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Find answers to common questions about our products and services
        </p>

        {/* Search Bar */}
        <div className="max-w-lg mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="flex items-center space-x-2"
          >
            {category !== 'All' && categoryIcons[category as keyof typeof categoryIcons] && (
              (() => {
                const Icon = categoryIcons[category as keyof typeof categoryIcons];
                return <Icon className="w-4 h-4" />;
              })()
            )}
            {category === 'All' && <HelpCircle className="w-4 h-4" />}
            <span>{category}</span>
          </Button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search terms or browse different categories.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredFAQs.map((item, index) => {
            const isOpen = openItems.includes(item.id);
            const ItemIcon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <Card>
                  <CardHeader className="cursor-pointer" onClick={() => toggleItem(item.id)}>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-makhana-100 rounded-lg flex items-center justify-center">
                          <ItemIcon className="w-5 h-5 text-makhana-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 text-left">
                            {item.question}
                          </h3>
                        </div>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </CardTitle>
                  </CardHeader>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardContent className="pt-0">
                          <div className="pl-13">
                            <p className="text-gray-700 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Contact Support Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12"
      >
        <Card className="bg-gradient-to-r from-makhana-500 to-makhana-600 text-white">
          <CardContent className="p-8 text-center">
            <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
            <p className="text-makhana-100 mb-6">
              Our customer support team is here to help you with any queries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                className="bg-white text-makhana-600 border-white hover:bg-makhana-50"
                onClick={() => window.open(`/${locale}/contact`, '_blank')}
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
              <Button
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-makhana-600"
                onClick={() => window.open('https://wa.me/919876543210', '_blank')}
              >
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp Us
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}