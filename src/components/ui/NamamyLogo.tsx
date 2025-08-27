'use client';

import React from 'react';

interface NamamyLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10', 
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

const textSizeClasses = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-3xl', 
  xl: 'text-4xl',
};

export function NamamyLogo({ size = 'md', variant = 'full', className = '' }: NamamyLogoProps) {
  const LogoIcon = () => (
    <div className={`${sizeClasses[size]} relative`}>
      {/* Main logo container with gradient background */}
      <div className="w-full h-full bg-gradient-to-br from-makhana-400 via-makhana-500 to-makhana-700 rounded-xl flex items-center justify-center shadow-lg border-2 border-white/20 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
        
        {/* Makhana/Fox Nuts inspired logo */}
        <svg
          viewBox="0 0 48 48"
          className="w-4/5 h-4/5 text-white relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Letter 'N' stylized as fox nuts/makhana */}
          <path 
            d="M12 8C10.3431 8 9 9.34315 9 11V37C9 38.6569 10.3431 40 12 40C13.6569 40 15 38.6569 15 37V26.5L30 37.2C31.2 38.2 33 37.3 33 35.7V11C33 9.34315 31.6569 8 30 8C28.3431 8 27 9.34315 27 11V21.5L12 10.8C11.4 10.3 11 10.5 11 11.2V37"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Decorative makhana dots */}
          <circle cx="38" cy="12" r="2.5" fill="currentColor" opacity="0.7"/>
          <circle cx="40" cy="20" r="1.5" fill="currentColor" opacity="0.5"/>
          <circle cx="36" cy="28" r="2" fill="currentColor" opacity="0.6"/>
          <circle cx="38" cy="36" r="1.8" fill="currentColor" opacity="0.8"/>
        </svg>
        
        {/* Shine Effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent opacity-50 rounded-xl"></div>
      </div>
    </div>
  );

  const LogoText = () => (
    <div className="flex flex-col">
      <span className={`font-display ${textSizeClasses[size]} font-bold bg-gradient-to-r from-makhana-600 via-makhana-700 to-makhana-800 bg-clip-text text-transparent leading-tight`}>
        Namamy
      </span>
      {size === 'lg' || size === 'xl' ? (
        <span className="text-xs font-medium text-makhana-600 opacity-80 -mt-1">
          Premium Fox Nuts
        </span>
      ) : null}
    </div>
  );

  if (variant === 'icon') {
    return <div className={className}><LogoIcon /></div>;
  }

  if (variant === 'text') {
    return <div className={className}><LogoText /></div>;
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <LogoIcon />
      <LogoText />
    </div>
  );
}

// Logo with background (like your 123.jpeg image)
export function NamamyLogoBanner({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-gradient-to-br from-makhana-400 via-makhana-500 to-makhana-700 rounded-3xl p-16 text-center shadow-2xl border border-white/10 relative overflow-hidden ${className}`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-8 right-8 w-6 h-6 bg-white rounded-full"></div>
        <div className="absolute top-16 left-12 w-4 h-4 bg-white rounded-full"></div>
        <div className="absolute bottom-12 right-16 w-5 h-5 bg-white rounded-full"></div>
        <div className="absolute bottom-8 left-8 w-3 h-3 bg-white rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-white rounded-full"></div>
      </div>
      
      <div className="flex flex-col items-center space-y-8 relative z-10">
        {/* Large Enhanced N Icon */}
        <div className="w-32 h-32 bg-white/15 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl border border-white/20 relative">
          {/* Inner glow */}
          <div className="absolute inset-2 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
          
          <svg
            viewBox="0 0 48 48"
            className="w-20 h-20 text-white relative z-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Enhanced N with makhana style */}
            <path 
              d="M12 8C10.3431 8 9 9.34315 9 11V37C9 38.6569 10.3431 40 12 40C13.6569 40 15 38.6569 15 37V26.5L30 37.2C31.2 38.2 33 37.3 33 35.7V11C33 9.34315 31.6569 8 30 8C28.3431 8 27 9.34315 27 11V21.5L12 10.8C11.4 10.3 11 10.5 11 11.2V37"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Makhana decorative dots */}
            <circle cx="38" cy="12" r="3" fill="currentColor" opacity="0.8"/>
            <circle cx="40" cy="22" r="2" fill="currentColor" opacity="0.6"/>
            <circle cx="36" cy="30" r="2.5" fill="currentColor" opacity="0.7"/>
            <circle cx="38" cy="38" r="2.2" fill="currentColor" opacity="0.9"/>
          </svg>
        </div>
        
        {/* Enhanced Namamy Text */}
        <div className="text-center space-y-2">
          <h1 className="text-7xl font-display font-bold text-white drop-shadow-2xl tracking-wide">
            Namamy
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-white to-transparent mx-auto opacity-60"></div>
        </div>
        
        {/* Enhanced Tagline */}
        <div className="text-center space-y-2">
          <p className="text-2xl text-white/95 font-semibold tracking-wide">
            Premium Fox Nuts & Healthy Snacks
          </p>
          <p className="text-lg text-white/80 font-medium">
            From Bihar's Finest Lotus Farms
          </p>
        </div>
        
        {/* Premium badge */}
        <div className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/30">
          <span className="text-white font-medium text-sm tracking-wider">EST. 2024</span>
        </div>
      </div>
      
      {/* Overall shine effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-70 rounded-3xl"></div>
    </div>
  );
}