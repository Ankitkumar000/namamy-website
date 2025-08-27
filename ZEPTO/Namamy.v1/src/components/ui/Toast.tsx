'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString();
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);

    // Auto-remove after duration (default 5 seconds)
    const duration = toast.duration || 5000;
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(() => onRemove(toast.id), 150);
  };

  useEffect(() => {
    // Auto-remove animation when duration is reached
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, (toast.duration || 5000) - 200);

    return () => clearTimeout(timer);
  }, [toast.duration]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getColors = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 text-green-800';
      case 'error':
        return 'bg-gradient-to-r from-red-50 to-rose-50 border-red-300 text-red-800';
      case 'warning':
        return 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300 text-yellow-800';
      case 'info':
        return 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 text-blue-800';
    }
  };

  return (
    <div
      className={`
        transform transition-all duration-300 ease-in-out
        ${isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
        ${getColors()}
        min-w-80 max-w-md p-4 rounded-xl border shadow-xl
        backdrop-blur-sm bg-opacity-95
        hover:shadow-2xl hover:scale-[1.02] transition-all duration-200
      `}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">
            {toast.title}
          </p>
          {toast.message && (
            <p className="text-sm mt-1 opacity-90">
              {toast.message}
            </p>
          )}
        </div>
        <button
          onClick={handleRemove}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Enhanced toast messages with better styling
export const createEnhancedToast = {
  userAdded: (userName: string) => ({
    type: 'success' as const,
    title: '✅ User Added Successfully!',
    message: `${userName} has been added to the system and can now access their account.`,
    duration: 4000
  }),
  
  userUpdated: (userName: string) => ({
    type: 'success' as const,
    title: '🔄 User Updated!',
    message: `${userName}'s information has been successfully updated.`,
    duration: 4000
  }),
  
  userStatusChanged: (userName: string, status: string) => ({
    type: 'success' as const,
    title: `🔐 User ${status === 'active' ? 'Activated' : 'Deactivated'}!`,
    message: `${userName} has been ${status === 'active' ? 'activated and can now' : 'deactivated and cannot'} access the system.`,
    duration: 4000
  }),
  
  passwordReset: (userName: string) => ({
    type: 'success' as const,
    title: '🔑 Password Reset Complete!',
    message: `New password has been generated for ${userName}. They can now login with their new credentials.`,
    duration: 5000
  }),
  
  passwordMismatch: () => ({
    type: 'error' as const,
    title: '❌ Password Mismatch',
    message: 'The passwords you entered do not match. Please check and try again.',
    duration: 4000
  }),
  
  userAddFailed: (error?: string) => ({
    type: 'error' as const,
    title: '🚫 Failed to Add User',
    message: error || 'Unable to create the user account. Please check the information and try again.',
    duration: 5000
  }),
  
  userUpdateFailed: (error?: string) => ({
    type: 'error' as const,
    title: '🚫 Update Failed',
    message: error || 'Unable to update user information. Please try again.',
    duration: 5000
  }),
  
  statusUpdateFailed: (error?: string) => ({
    type: 'error' as const,
    title: '🚫 Status Update Failed',
    message: error || 'Unable to change user status. Please try again.',
    duration: 5000
  }),
  
  resetPasswordFailed: (error?: string) => ({
    type: 'error' as const,
    title: '🚫 Password Reset Failed',
    message: error || 'Unable to reset the password. Please try again.',
    duration: 5000
  }),
  
  networkError: () => ({
    type: 'error' as const,
    title: '🌐 Connection Error',
    message: 'Unable to connect to the server. Please check your internet connection and try again.',
    duration: 5000
  }),

  // Dashboard specific toasts
  dashboardLoaded: () => ({
    type: 'success' as const,
    title: '📊 Dashboard Updated!',
    message: 'Latest data has been loaded successfully. All metrics are up to date.',
    duration: 3000
  }),

  dashboardLoadFailed: (error?: string) => ({
    type: 'error' as const,
    title: '📊 Dashboard Load Failed',
    message: error || 'Unable to load dashboard data. Please refresh the page or try again.',
    duration: 5000
  }),

  dataRefreshed: () => ({
    type: 'info' as const,
    title: '🔄 Data Refreshed!',
    message: 'All statistics and metrics have been updated with the latest information.',
    duration: 3000
  }),

  lowStockAlert: (productCount: number) => ({
    type: 'warning' as const,
    title: '⚠️ Low Stock Alert!',
    message: `${productCount} products are running low on stock. Check inventory to avoid stockouts.`,
    duration: 6000
  }),

  quickActionSuccess: (action: string) => ({
    type: 'success' as const,
    title: '⚡ Quick Action Complete!',
    message: `${action} has been processed successfully.`,
    duration: 3000
  }),

  exportSuccess: (type: string) => ({
    type: 'success' as const,
    title: '📤 Export Complete!',
    message: `${type} data has been exported successfully. Check your downloads folder.`,
    duration: 4000
  }),

  settingsUpdated: () => ({
    type: 'success' as const,
    title: '⚙️ Settings Updated!',
    message: 'Your dashboard preferences have been saved successfully.',
    duration: 3000
  })
};