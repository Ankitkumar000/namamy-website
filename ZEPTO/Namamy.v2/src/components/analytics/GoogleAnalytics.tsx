'use client'

import Script from 'next/script'

interface GoogleAnalyticsProps {
  trackingId: string
}

export function GoogleAnalytics({ trackingId }: GoogleAnalyticsProps) {
  if (!trackingId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  )
}

// Enhanced tracking for e-commerce events
export function trackPurchase(transactionId: string, value: number, items: any[]) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'INR',
      items: items
    })
  }
}

export function trackAddToCart(itemId: string, itemName: string, price: number, quantity: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'INR',
      value: price * quantity,
      items: [{
        item_id: itemId,
        item_name: itemName,
        price: price,
        quantity: quantity
      }]
    })
  }
}

export function trackViewItem(itemId: string, itemName: string, category: string, price: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'INR',
      value: price,
      items: [{
        item_id: itemId,
        item_name: itemName,
        item_category: category,
        price: price,
        quantity: 1
      }]
    })
  }
}

export function trackSearch(searchTerm: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm
    })
  }
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}