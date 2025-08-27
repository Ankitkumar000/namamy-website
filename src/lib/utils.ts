import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export function calculateDiscount(originalPrice: number, salePrice: number): number {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `ORD-${timestamp}-${random}`.toUpperCase();
}

export function calculateShipping(subtotal: number, items: number): number {
  if (subtotal >= 500) return 0; // Free shipping above ₹500
  if (items <= 2) return 50;
  return Math.min(100, items * 25); // ₹25 per item, max ₹100
}

export function calculateTax(subtotal: number): number {
  return Math.round(subtotal * 0.18); // 18% GST
}

export function getOrderStatus(status: string): {
  label: string;
  color: string;
  bgColor: string;
} {
  const statusMap = {
    pending: { label: 'Pending', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    confirmed: { label: 'Confirmed', color: 'text-blue-600', bgColor: 'bg-blue-100' },
    processing: { label: 'Processing', color: 'text-orange-600', bgColor: 'bg-orange-100' },
    shipped: { label: 'Shipped', color: 'text-purple-600', bgColor: 'bg-purple-100' },
    delivered: { label: 'Delivered', color: 'text-green-600', bgColor: 'bg-green-100' },
    cancelled: { label: 'Cancelled', color: 'text-red-600', bgColor: 'bg-red-100' },
    refunded: { label: 'Refunded', color: 'text-gray-600', bgColor: 'bg-gray-100' },
  };
  return statusMap[status as keyof typeof statusMap] || statusMap.pending;
}

export function generateSKU(productName: string, variant?: string): string {
  const base = productName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6);
  const variantCode = variant ? variant.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 3) : '';
  const random = Math.random().toString(36).substr(2, 3).toUpperCase();
  return `${base}${variantCode}${random}`;
}

export function isValidIndianPincode(pincode: string): boolean {
  const pincodeRegex = /^[1-9][0-9]{5}$/;
  return pincodeRegex.test(pincode);
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  return phone;
}