'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface LaunchingSoonPopupProps {
  isOpen?: boolean;
  onClose?: () => void;
  showCloseButton?: boolean;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export default function LaunchingSoonPopup({ 
  isOpen = true, 
  onClose,
  showCloseButton = true,
  autoClose = false,
  autoCloseDelay = 5000
}: LaunchingSoonPopupProps) {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
    
    if (autoClose && isOpen) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-black/60 via-gray-900/50 to-black/70 animate-fade-in"
        onClick={handleClose}
      />
      
      {/* Popup Container */}
      <div className="relative max-w-lg w-full animate-scale-in">
        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={handleClose}
            className="absolute -top-2 -right-2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors duration-200 group"
          >
            <X className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          </button>
        )}
        
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 right-8 w-20 h-20 bg-makhana-400 rounded-full blur-2xl"></div>
            <div className="absolute bottom-8 left-6 w-16 h-16 bg-organic-400 rounded-full blur-xl"></div>
          </div>
          
          {/* Content */}
          <div className="relative px-8 py-12 text-center">
            {/* Icon/Logo */}
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-makhana-500 to-organic-600 rounded-2xl flex items-center justify-center shadow-xl">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <div className="w-5 h-5 bg-gradient-to-br from-makhana-600 to-organic-700 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Main Title */}
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-3">
              <span className="bg-gradient-to-r from-makhana-700 via-organic-600 to-makhana-800 bg-clip-text text-transparent">
                Premium Makhana Coming Soon!
              </span>
            </h2>
            
            {/* Subtitle */}
            <p className="text-lg text-gray-600 mb-8 font-medium">
              Something Amazing is Roasting...
            </p>
            
            {/* Decorative Line */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-makhana-300 to-transparent w-32"></div>
              <div className="mx-4 w-2 h-2 bg-makhana-400 rounded-full"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-makhana-300 to-transparent w-32"></div>
            </div>
            
            {/* Description */}
            <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
              We're perfecting our premium fox nuts collection to bring you the finest quality makhana. Stay tuned for healthy snacking redefined!
            </p>
            
            {/* Action Button */}
            <button
              onClick={handleClose}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-makhana-600 to-organic-600 text-white font-semibold rounded-xl hover:from-makhana-700 hover:to-organic-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-glow group"
            >
              <span className="group-hover:scale-110 transition-transform duration-200">
                Can't Wait!
              </span>
            </button>
            
            {/* Loading Dots Animation */}
            <div className="flex justify-center mt-6 space-x-2">
              <div className="w-2 h-2 bg-makhana-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-organic-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-makhana-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
          
          {/* Bottom Accent Bar */}
          <div className="h-2 bg-gradient-to-r from-makhana-500 via-organic-500 to-makhana-600"></div>
        </div>
      </div>
    </div>
  );
}