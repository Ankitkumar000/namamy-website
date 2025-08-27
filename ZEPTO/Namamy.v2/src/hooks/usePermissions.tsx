'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Permission, 
  UserRole, 
  hasPermission, 
  hasAnyPermission, 
  hasAllPermissions, 
  getUserPermissions, 
  canAccessRoute 
} from '@/lib/permissions';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: string;
}

interface PermissionContextType {
  user: User | null;
  loading: boolean;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  canAccessRoute: (route: string) => boolean;
  getUserPermissions: () => Permission[];
  setUser: (user: User | null) => void;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export function PermissionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user data (normally from auth context or API)
  useEffect(() => {
    // For now, set a default admin user
    // In production, this would come from authentication
    setUser({
      id: 'admin-1',
      name: 'Admin User',
      email: 'admin@namamy.com',
      role: 'super_admin',
      status: 'active'
    });
    setLoading(false);
  }, []);

  const contextValue: PermissionContextType = {
    user,
    loading,
    hasPermission: (permission: Permission) => {
      if (!user) return false;
      return hasPermission(user.role, permission);
    },
    hasAnyPermission: (permissions: Permission[]) => {
      if (!user) return false;
      return hasAnyPermission(user.role, permissions);
    },
    hasAllPermissions: (permissions: Permission[]) => {
      if (!user) return false;
      return hasAllPermissions(user.role, permissions);
    },
    canAccessRoute: (route: string) => {
      if (!user) return false;
      return canAccessRoute(user.role, route);
    },
    getUserPermissions: () => {
      if (!user) return [];
      return getUserPermissions(user.role);
    },
    setUser
  };

  return (
    <PermissionContext.Provider value={contextValue}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissions() {
  const context = useContext(PermissionContext);
  if (context === undefined) {
    throw new Error('usePermissions must be used within a PermissionProvider');
  }
  return context;
}

// Permission-based component wrappers
interface PermissionGuardProps {
  permission?: Permission;
  permissions?: Permission[];
  requireAll?: boolean;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function PermissionGuard({ 
  permission, 
  permissions, 
  requireAll = false, 
  fallback = null, 
  children 
}: PermissionGuardProps) {
  const { hasPermission: checkPermission, hasAnyPermission, hasAllPermissions } = usePermissions();

  let hasAccess = false;

  if (permission) {
    hasAccess = checkPermission(permission);
  } else if (permissions) {
    hasAccess = requireAll 
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);
  } else {
    hasAccess = true; // No permissions specified, allow access
  }

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Role-based component wrapper
interface RoleGuardProps {
  roles: UserRole[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function RoleGuard({ roles, fallback = null, children }: RoleGuardProps) {
  const { user } = usePermissions();

  if (!user || !roles.includes(user.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Higher-order component for permission-based access
export function withPermission<P extends object>(
  Component: React.ComponentType<P>,
  permission: Permission,
  fallback?: React.ComponentType<P>
) {
  return function PermissionWrappedComponent(props: P) {
    const { hasPermission } = usePermissions();

    if (!hasPermission(permission)) {
      return fallback ? React.createElement(fallback, props) : null;
    }

    return <Component {...props} />;
  };
}

// Custom hooks for specific permission checks
export function useCanManageUsers() {
  const { hasAnyPermission } = usePermissions();
  return hasAnyPermission(['users.create', 'users.edit', 'users.delete']);
}

export function useCanManageProducts() {
  const { hasAnyPermission } = usePermissions();
  return hasAnyPermission(['products.create', 'products.edit', 'products.delete']);
}

export function useCanManageOrders() {
  const { hasAnyPermission } = usePermissions();
  return hasAnyPermission(['orders.edit', 'orders.fulfill', 'orders.refund']);
}

export function useCanAccessSettings() {
  const { hasAnyPermission } = usePermissions();
  return hasAnyPermission(['settings.view', 'settings.edit', 'settings.advanced']);
}

export function useIsAdmin() {
  const { user } = usePermissions();
  return user?.role === 'admin' || user?.role === 'super_admin';
}

export function useIsSuperAdmin() {
  const { user } = usePermissions();
  return user?.role === 'super_admin';
}