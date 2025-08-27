'use client';

import { useState, useEffect } from 'react';
import DynamicBannerPopup from '@/components/ui/DynamicBannerPopup';

interface HomePageWithPopupProps {
  locale: string;
  children: React.ReactNode;
}

export function HomePageWithPopup({ locale, children }: HomePageWithPopupProps) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup after a short delay when the page loads
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {children}
      {showPopup && (
        <DynamicBannerPopup 
          type="POPUP"
          onClose={handleClosePopup}
        />
      )}
    </>
  );
}