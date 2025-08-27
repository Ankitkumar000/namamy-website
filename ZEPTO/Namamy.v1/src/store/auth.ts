'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginWithFacebook: () => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface AuthStore extends AuthState, AuthActions {}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string): Promise<boolean> => {
        try {
          set({ isLoading: true, error: null });

          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const error = await response.json();
            set({ error: error.message, isLoading: false });
            return false;
          }

          const { user, token } = await response.json();
          
          // Store token in localStorage or httpOnly cookie
          localStorage.setItem('auth-token', token);
          
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return true;
        } catch (error) {
          set({
            error: 'Login failed. Please try again.',
            isLoading: false,
          });
          return false;
        }
      },

      loginWithGoogle: async (): Promise<boolean> => {
        try {
          set({ isLoading: true, error: null });
          
          // Implement Google OAuth login
          // This would typically use NextAuth.js or Google OAuth library
          
          // Mock implementation
          const mockUser: User = {
            id: '1',
            email: 'user@example.com',
            name: 'John Doe',
            role: UserRole.CUSTOMER,
            isVerified: true,
            isActive: true,
            addresses: [],
            orders: [],
            reviews: [],
            wishlist: [],
            loyaltyPoints: 0,
            totalSpent: 0,
            preferences: {
              language: 'en',
              currency: 'INR',
              newsletter: true,
              smsNotifications: true,
              emailNotifications: true,
              notifications: {
                orderUpdates: true,
                promotions: true,
                newProducts: false,
                priceAlerts: false,
                stockAlerts: false,
              },
              dietaryPreferences: [],
              allergies: [],
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return true;
        } catch (error) {
          set({
            error: 'Google login failed. Please try again.',
            isLoading: false,
          });
          return false;
        }
      },

      loginWithFacebook: async (): Promise<boolean> => {
        try {
          set({ isLoading: true, error: null });
          
          // Implement Facebook OAuth login
          // Similar to Google login implementation
          
          return true;
        } catch (error) {
          set({
            error: 'Facebook login failed. Please try again.',
            isLoading: false,
          });
          return false;
        }
      },

      register: async (data: RegisterData): Promise<boolean> => {
        try {
          set({ isLoading: true, error: null });

          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            const error = await response.json();
            set({ error: error.message, isLoading: false });
            return false;
          }

          const { user, token } = await response.json();
          
          localStorage.setItem('auth-token', token);
          
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return true;
        } catch (error) {
          set({
            error: 'Registration failed. Please try again.',
            isLoading: false,
          });
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem('auth-token');
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      updateProfile: async (data: Partial<User>): Promise<boolean> => {
        try {
          set({ isLoading: true, error: null });

          const response = await fetch('/api/auth/profile', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
            },
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            const error = await response.json();
            set({ error: error.message, isLoading: false });
            return false;
          }

          const { user } = await response.json();
          
          set({
            user,
            isLoading: false,
            error: null,
          });

          return true;
        } catch (error) {
          set({
            error: 'Profile update failed. Please try again.',
            isLoading: false,
          });
          return false;
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      refreshUser: async () => {
        try {
          const token = localStorage.getItem('auth-token');
          if (!token) return;

          const response = await fetch('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const { user } = await response.json();
            set({ 
              user, 
              isAuthenticated: true,
              error: null,
            });
          } else {
            // Token is invalid, logout
            get().logout();
          }
        } catch (error) {
          // Silent fail, but logout if token is invalid
          get().logout();
        }
      },
    }),
    {
      name: 'namamy-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && state.isAuthenticated) {
          // Refresh user data on app start
          state.refreshUser();
        }
      },
    }
  )
);