'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem, Product, ProductVariant } from '@/types';
import { calculateShipping, calculateTax, generateId } from '@/lib/utils';

interface CartStore extends Cart {
  // Actions
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Promise<{ success: boolean; message?: string }>;
  removeCoupon: () => void;
  calculateTotals: () => void;
  
  // Computed values
  isEmpty: boolean;
  
  // Utility functions
  getItemById: (itemId: string) => CartItem | undefined;
  hasProduct: (productId: string) => boolean;
  getItemCount: (productId: string) => number;
}

const DEFAULT_TAX_RATE = 0.18; // 18% GST
const FREE_SHIPPING_THRESHOLD = 500;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      id: generateId(),
      items: [],
      totalItems: 0,
      subtotal: 0,
      tax: 0,
      shipping: 0,
      discount: 0,
      total: 0,
      couponCode: undefined,
      couponDiscount: 0,
      updatedAt: new Date().toISOString(),
      isEmpty: true,

      addItem: (product: Product, quantity = 1, variant?: ProductVariant) => {
        const state = get();
        const existingItemIndex = state.items.findIndex(
          item => item.productId === product.id && 
          item.selectedVariant?.id === variant?.id
        );

        if (existingItemIndex >= 0) {
          // Update existing item quantity
          const newItems = [...state.items];
          newItems[existingItemIndex].quantity += quantity;
          set({ items: newItems });
        } else {
          // Add new item
          const newItem: CartItem = {
            id: generateId(),
            productId: product.id,
            product,
            quantity,
            selectedVariant: variant,
            addedAt: new Date().toISOString(),
          };
          set({ items: [...state.items, newItem] });
        }
        
        get().calculateTotals();
      },

      removeItem: (itemId: string) => {
        const state = get();
        const newItems = state.items.filter(item => item.id !== itemId);
        set({ items: newItems });
        get().calculateTotals();
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const state = get();
        const newItems = state.items.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        );
        set({ items: newItems });
        get().calculateTotals();
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          subtotal: 0,
          tax: 0,
          shipping: 0,
          discount: 0,
          total: 0,
          couponCode: undefined,
          couponDiscount: 0,
          isEmpty: true,
          updatedAt: new Date().toISOString(),
        });
      },

      applyCoupon: async (code: string): Promise<{ success: boolean; message?: string }> => {
        try {
          const state = get();
          const response = await fetch('/api/coupons/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              code: code.trim().toUpperCase(), 
              orderValue: state.subtotal 
            }),
          });

          const data = await response.json();

          if (response.ok && data.valid) {
            set({ 
              couponCode: data.coupon.code, 
              couponDiscount: data.discountAmount,
              updatedAt: new Date().toISOString(),
            });
            get().calculateTotals();
            return { 
              success: true, 
              message: data.message || `Coupon applied! You saved ₹${data.discountAmount}` 
            };
          } else {
            return { 
              success: false, 
              message: data.error || 'Invalid coupon code' 
            };
          }
        } catch (error) {
          console.error('Error applying coupon:', error);
          return { 
            success: false, 
            message: 'Failed to apply coupon. Please try again.' 
          };
        }
      },

      removeCoupon: () => {
        set({ 
          couponCode: undefined, 
          couponDiscount: 0,
          updatedAt: new Date().toISOString(),
        });
        get().calculateTotals();
      },

      calculateTotals: () => {
        const state = get();
        
        // Calculate subtotal
        const subtotal = state.items.reduce((total, item) => {
          const price = item.selectedVariant?.price || item.product.price;
          return total + (price * item.quantity);
        }, 0);

        // Calculate total items
        const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

        // Calculate discount
        let discount = state.couponDiscount || 0;
        if (state.couponCode && discount > subtotal) {
          discount = subtotal; // Cap discount at subtotal
        }

        // Calculate shipping
        const shipping = calculateShipping(subtotal - discount, totalItems);

        // Calculate tax
        const tax = calculateTax(subtotal - discount);

        // Calculate total
        const total = subtotal - discount + tax + shipping;

        set({
          subtotal,
          totalItems,
          discount,
          tax,
          shipping,
          total,
          isEmpty: state.items.length === 0,
          updatedAt: new Date().toISOString(),
        });
      },

      getItemById: (itemId: string) => {
        return get().items.find(item => item.id === itemId);
      },

      hasProduct: (productId: string) => {
        return get().items.some(item => item.productId === productId);
      },

      getItemCount: (productId: string) => {
        return get().items
          .filter(item => item.productId === productId)
          .reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'namamy-cart',
      partialize: (state) => ({
        id: state.id,
        items: state.items,
        couponCode: state.couponCode,
        couponDiscount: state.couponDiscount,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.calculateTotals();
        }
      },
    }
  )
);