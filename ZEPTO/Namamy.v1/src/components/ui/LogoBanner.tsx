'use client';

import React from 'react';

interface LogoBannerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'w-64 h-48',
  md: 'w-80 h-60', 
  lg: 'w-96 h-72',
  xl: 'w-[500px] h-96',
};

export function LogoBanner({ className = '', size = 'lg' }: LogoBannerProps) {
  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      {/* Exact recreation of 123.jpeg with website colors */}
      <div className="w-full h-full bg-gradient-to-br from-makhana-500 via-makhana-600 to-makhana-700 rounded-2xl flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
        
        {/* Background subtle pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 left-8 w-16 h-16 bg-white rounded-full blur-xl"></div>
          <div className="absolute bottom-8 right-8 w-12 h-12 bg-white rounded-full blur-lg"></div>
          <div className="absolute top-1/2 left-4 w-8 h-8 bg-white rounded-full blur-md"></div>
        </div>

        {/* Main content - exactly like 123.jpeg */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
          
          {/* N Logo - matching the style from 123.jpeg */}
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 shadow-xl">
            <div className="text-white text-4xl font-bold font-display relative">
              N
              {/* Small decorative element like in original */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full opacity-60"></div>
            </div>
          </div>
          
          {/* Namamy Text - exactly matching 123.jpeg typography */}
          <div className="text-center">
            <h1 className="text-white text-5xl font-light font-sans tracking-wide">
              Namamy
            </h1>
          </div>

        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-makhana-800/20 to-transparent rounded-2xl"></div>
      </div>
    </div>
  );
}

// Alternative version with exact same proportions as 123.jpeg
export function LogoBannerExact({ className = '' }: { className?: string }) {
  return (
    <div className={`aspect-[4/3] w-full max-w-lg ${className}`}>
      <div className="w-full h-full bg-gradient-to-br from-makhana-500 via-makhana-600 to-makhana-700 flex flex-col items-center justify-center relative rounded-lg overflow-hidden">
        
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-black/10"></div>
        
        <div className="relative z-10 text-center space-y-8">
          {/* The N icon with exact styling from image */}
          <div className="w-16 h-16 mx-auto">
            <div className="w-full h-full bg-white/15 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold">N</span>
            </div>
          </div>
          
          {/* Namamy text with exact font weight and spacing */}
          <div>
            <h1 className="text-white text-4xl font-light tracking-wider">
              Namamy
            </h1>
          </div>
        </div>
        
      </div>
    </div>
  );
}