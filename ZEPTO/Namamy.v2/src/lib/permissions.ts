// Permission system for admin users

export type Permission = 
  // Dashboard permissions
  | 'dashboard.view'
  
  // Product permissions
  | 'products.view'
  | 'products.create'
  | 'products.edit'
  | 'products.delete'
  | 'products.manage_stock'
  
  // Order permissions
  | 'orders.view'
  | 'orders.edit'
  | 'orders.delete'
  | 'orders.fulfill'
  | 'orders.refund'
  
  // Customer permissions
  | 'customers.view'
  | 'customers.create'
  | 'customers.edit'
  | 'customers.delete'
  | 'customers.export'
  
  // User management permissions
  | 'users.view'
  | 'users.create'
  | 'users.edit'
  | 'users.delete'
  | 'users.manage_roles'
  | 'users.reset_password'
  
  // Content management permissions
  | 'blog.view'
  | 'blog.create'
  | 'blog.edit'
  | 'blog.delete'
  | 'blog.publish'
  
  // Review permissions
  | 'reviews.view'
  | 'reviews.moderate'
  | 'reviews.delete'
  
  // Contact & Support permissions
  | 'contact.view'
  | 'contact.reply'
  | 'contact.delete'
  | 'contact.assign'
  
  // Newsletter permissions
  | 'newsletter.view'
  | 'newsletter.send'
  | 'newsletter.export'
  
  // Analytics permissions
  | 'analytics.view'
  | 'analytics.export'
  | 'analytics.advanced'
  
  // Settings permissions
  | 'settings.view'
  | 'settings.edit'
  | 'settings.advanced'
  | 'settings.site_visibility'
  | 'settings.payment_gateway'
  | 'settings.shipping'
  
  // System permissions
  | 'system.backup'
  | 'system.logs'
  | 'system.maintenance';

export type UserRole = 'super_admin' | 'admin' | 'manager' | 'staff' | 'viewer';

// Role-based permission mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  // Super Admin - Full access to everything
  super_admin: [
    // Dashboard
    'dashboard.view',
    
    // Products - Full access
    'products.view',
    'products.create',
    'products.edit',
    'products.delete',
    'products.manage_stock',
    
    // Orders - Full access
    'orders.view',
    'orders.edit',
    'orders.delete',
    'orders.fulfill',
    'orders.refund',
    
    // Customers - Full access
    'customers.view',
    'customers.create',
    'customers.edit',
    'customers.delete',
    'customers.export',
    
    // User Management - Full access
    'users.view',
    'users.create',
    'users.edit',
    'users.delete',
    'users.manage_roles',
    'users.reset_password',
    
    // Content - Full access
    'blog.view',
    'blog.create',
    'blog.edit',
    'blog.delete',
    'blog.publish',
    
    // Reviews - Full access
    'reviews.view',
    'reviews.moderate',
    'reviews.delete',
    
    // Contact - Full access
    'contact.view',
    'contact.reply',
    'contact.delete',
    'contact.assign',
    
    // Newsletter - Full access
    'newsletter.view',
    'newsletter.send',
    'newsletter.export',
    
    // Analytics - Full access
    'analytics.view',
    'analytics.export',
    'analytics.advanced',
    
    // Settings - Full access
    'settings.view',
    'settings.edit',
    'settings.advanced',
    'settings.site_visibility',
    'settings.payment_gateway',
    'settings.shipping',
    
    // System - Full access
    'system.backup',
    'system.logs',
    'system.maintenance'
  ],

  // Admin - Almost full access, but cannot manage other admins or system settings
  admin: [
    // Dashboard
    'dashboard.view',
    
    // Products - Full access
    'products.view',
    'products.create',
    'products.edit',
    'products.delete',
    'products.manage_stock',
    
    // Orders - Full access
    'orders.view',
    'orders.edit',
    'orders.delete',
    'orders.fulfill',
    'orders.refund',
    
    // Customers - Full access
    'customers.view',
    'customers.create',
    'customers.edit',
    'customers.delete',
    'customers.export',
    
    // User Management - Limited (cannot manage super admins or other admins)
    'users.view',
    'users.create',
    'users.edit',
    'users.reset_password',
    
    // Content - Full access
    'blog.view',
    'blog.create',
    'blog.edit',
    'blog.delete',
    'blog.publish',
    
    // Reviews - Full access
    'reviews.view',
    'reviews.moderate',
    'reviews.delete',
    
    // Contact - Full access
    'contact.view',
    'contact.reply',
    'contact.delete',
    'contact.assign',
    
    // Newsletter - Full access
    'newsletter.view',
    'newsletter.send',
    'newsletter.export',
    
    // Analytics - Full access
    'analytics.view',
    'analytics.export',
    'analytics.advanced',
    
    // Settings - Limited access
    'settings.view',
    'settings.edit',
    'settings.payment_gateway',
    'settings.shipping'
  ],

  // Manager - Can manage operations but not users or advanced settings
  manager: [
    // Dashboard
    'dashboard.view',
    
    // Products - Full access
    'products.view',
    'products.create',
    'products.edit',
    'products.delete',
    'products.manage_stock',
    
    // Orders - Full access
    'orders.view',
    'orders.edit',
    'orders.fulfill',
    'orders.refund',
    
    // Customers - View and basic edit
    'customers.view',
    'customers.edit',
    'customers.export',
    
    // Content - Can create and edit but not delete
    'blog.view',
    'blog.create',
    'blog.edit',
    
    // Reviews - Can moderate
    'reviews.view',
    'reviews.moderate',
    
    // Contact - Can view and reply
    'contact.view',
    'contact.reply',
    'contact.assign',
    
    // Newsletter - Can view and send
    'newsletter.view',
    'newsletter.send',
    
    // Analytics - Can view reports
    'analytics.view',
    'analytics.export',
    
    // Settings - View only
    'settings.view'
  ],

  // Staff - Basic operational access
  staff: [
    // Dashboard
    'dashboard.view',
    
    // Products - View and edit, but cannot delete
    'products.view',
    'products.edit',
    'products.manage_stock',
    
    // Orders - View and fulfill
    'orders.view',
    'orders.edit',
    'orders.fulfill',
    
    // Customers - View and basic edit
    'customers.view',
    'customers.edit',
    
    // Content - View and create
    'blog.view',
    'blog.create',
    'blog.edit',
    
    // Reviews - View and moderate
    'reviews.view',
    'reviews.moderate',
    
    // Contact - View and reply
    'contact.view',
    'contact.reply',
    
    // Newsletter - View only
    'newsletter.view',
    
    // Analytics - Basic view
    'analytics.view'
  ],

  // Viewer - Read-only access
  viewer: [
    // Dashboard - View only
    'dashboard.view',
    
    // Products - View only
    'products.view',
    
    // Orders - View only
    'orders.view',
    
    // Customers - View only
    'customers.view',
    
    // Content - View only
    'blog.view',
    
    // Reviews - View only
    'reviews.view',
    
    // Contact - View only
    'contact.view',
    
    // Newsletter - View only
    'newsletter.view',
    
    // Analytics - View only
    'analytics.view'
  ]
};

// Helper functions for permission checking
export function hasPermission(userRole: UserRole, permission: Permission): boolean {
  const rolePermissions = ROLE_PERMISSIONS[userRole];
  return rolePermissions.includes(permission);
}

export function hasAnyPermission(userRole: UserRole, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(userRole, permission));
}

export function hasAllPermissions(userRole: UserRole, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(userRole, permission));
}

export function getUserPermissions(userRole: UserRole): Permission[] {
  return ROLE_PERMISSIONS[userRole] || [];
}

export function canAccessRoute(userRole: UserRole, route: string): boolean {
  const routePermissions: Record<string, Permission[]> = {
    '/admin/dashboard': ['dashboard.view'],
    '/admin/products': ['products.view'],
    '/admin/orders': ['orders.view'],
    '/admin/customers': ['customers.view'],
    '/admin/users': ['users.view'],
    '/admin/blog': ['blog.view'],
    '/admin/reviews': ['reviews.view'],
    '/admin/contact': ['contact.view'],
    '/admin/newsletter': ['newsletter.view'],
    '/admin/analytics': ['analytics.view'],
    '/admin/settings': ['settings.view']
  };

  const requiredPermissions = routePermissions[route];
  if (!requiredPermissions) return true; // Allow access to routes not in the map

  return hasAnyPermission(userRole, requiredPermissions);
}

// Permission descriptions for UI
export const PERMISSION_DESCRIPTIONS: Record<Permission, string> = {
  // Dashboard
  'dashboard.view': 'View admin dashboard and statistics',
  
  // Products
  'products.view': 'View product listings and details',
  'products.create': 'Add new products to catalog',
  'products.edit': 'Edit existing product information',
  'products.delete': 'Remove products from catalog',
  'products.manage_stock': 'Update product stock levels',
  
  // Orders
  'orders.view': 'View all customer orders',
  'orders.edit': 'Edit order details and status',
  'orders.delete': 'Cancel or delete orders',
  'orders.fulfill': 'Process and fulfill orders',
  'orders.refund': 'Issue refunds to customers',
  
  // Customers
  'customers.view': 'View customer information',
  'customers.create': 'Add new customer accounts',
  'customers.edit': 'Edit customer details',
  'customers.delete': 'Remove customer accounts',
  'customers.export': 'Export customer data',
  
  // Users
  'users.view': 'View admin user accounts',
  'users.create': 'Create new admin accounts',
  'users.edit': 'Edit admin user details',
  'users.delete': 'Remove admin accounts',
  'users.manage_roles': 'Change user roles and permissions',
  'users.reset_password': 'Reset user passwords',
  
  // Blog
  'blog.view': 'View blog posts and content',
  'blog.create': 'Create new blog posts',
  'blog.edit': 'Edit existing blog posts',
  'blog.delete': 'Delete blog posts',
  'blog.publish': 'Publish or unpublish posts',
  
  // Reviews
  'reviews.view': 'View customer reviews',
  'reviews.moderate': 'Approve or reject reviews',
  'reviews.delete': 'Remove inappropriate reviews',
  
  // Contact
  'contact.view': 'View customer inquiries',
  'contact.reply': 'Respond to customer messages',
  'contact.delete': 'Remove contact entries',
  'contact.assign': 'Assign inquiries to team members',
  
  // Newsletter
  'newsletter.view': 'View newsletter subscribers',
  'newsletter.send': 'Send newsletter campaigns',
  'newsletter.export': 'Export subscriber lists',
  
  // Analytics
  'analytics.view': 'View basic analytics and reports',
  'analytics.export': 'Export analytics data',
  'analytics.advanced': 'Access advanced analytics features',
  
  // Settings
  'settings.view': 'View system settings',
  'settings.edit': 'Edit basic settings',
  'settings.advanced': 'Access advanced configuration',
  'settings.site_visibility': 'Control site visibility (coming soon mode)',
  'settings.payment_gateway': 'Configure payment methods',
  'settings.shipping': 'Configure shipping options',
  
  // System
  'system.backup': 'Create and restore backups',
  'system.logs': 'View system logs and errors',
  'system.maintenance': 'Perform system maintenance'
};

// Role descriptions
export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  super_admin: 'Complete system access including user management and system configuration',
  admin: 'Full operational access with limited user management capabilities',
  manager: 'Operational management with content and order management permissions',
  staff: 'Basic operational access for daily tasks and customer support',
  viewer: 'Read-only access to view data and reports'
};