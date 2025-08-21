'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface TestimonialsSectionProps {
  locale: string;
}

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai, India',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    text: 'Namamy has completely changed my snacking habits! The roasted makhana is so crispy and delicious. I\'ve been buying them for months now and they never disappoint. Perfect for my weight loss journey!',
    product: 'Classic Roasted Makhana',
    verified: true,
  },
  {
    id: 2,
    name: 'Raj Patel',
    location: 'Delhi, India',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
    text: 'As a fitness enthusiast, I\'m always looking for healthy snack options. Namamy\'s makhana is packed with protein and keeps me energized during my workouts. The quality is exceptional!',
    product: 'Protein Power Mix',
    verified: true,
  },
  {
    id: 3,
    name: 'Anita Desai',
    location: 'Bangalore, India',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
    text: 'My kids love the flavored varieties! It\'s such a relief to find a healthy snack that they actually enjoy. The packaging is beautiful too - perfect for gifting to friends and family.',
    product: 'Kids Special Flavored Pack',
    verified: true,
  },
  {
    id: 4,
    name: 'Dr. Suresh Kumar',
    location: 'Chennai, India',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit',
    text: 'As a nutritionist, I recommend Namamy to all my patients. The nutritional value is outstanding and the taste is incredible. It\'s rare to find such a perfect combination of health and flavor.',
    product: 'Premium Wellness Collection',
    verified: true,
  },
  {
    id: 5,
    name: 'Meera Reddy',
    location: 'Hyderabad, India',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kavya',
    text: 'The delivery is always on time and the product quality is consistent. I\'ve tried many brands but Namamy stands out for its freshness and crunchiness. Highly recommended!',
    product: 'Monthly Subscription Box',
    verified: true,
  },
];

export function TestimonialsSection({ locale }: TestimonialsSectionProps) {
  const t = useTranslations('homepage.testimonials');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-scroll testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-organic-50 to-makhana-100">
      <div className="container mx-auto container-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
            {/* Background Quote Icon */}
            <Quote className="absolute top-8 right-8 w-16 h-16 text-makhana-100 transform rotate-12" />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex items-center justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < testimonials[currentIndex].rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed text-center mb-8 font-medium">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center justify-center gap-4">
                <div className="relative">
                  <Image
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    width={60}
                    height={60}
                    className="w-15 h-15 rounded-full object-cover"
                  />
                  {testimonials[currentIndex].verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-organic-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-900">{testimonials[currentIndex].name}</div>
                  <div className="text-sm text-gray-600">{testimonials[currentIndex].location}</div>
                  <div className="text-xs text-makhana-600 font-medium mt-1">
                    Purchased: {testimonials[currentIndex].product}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-organic-200 to-makhana-300 rounded-full blur-xl opacity-50"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-makhana-200 to-organic-300 rounded-full blur-xl opacity-40"></div>
          </div>
        </motion.div>

        {/* Navigation Controls */}
        <div className="flex flex-col items-center gap-6">
          {/* Carousel Controls */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="rounded-full w-12 h-12 p-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-makhana-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="rounded-full w-12 h-12 p-0"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Auto-play Toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            {isAutoPlaying ? 'Pause Auto-scroll' : 'Resume Auto-scroll'}
          </button>
        </div>

        {/* Testimonial Grid Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                index === currentIndex ? 'ring-2 ring-organic-300' : ''
              }`}
              onClick={() => goToSlide(index)}
            >
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-500">{testimonial.location}</div>
                </div>
              </div>
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 line-clamp-3">
                {testimonial.text}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}