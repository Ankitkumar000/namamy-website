'use client';

import { useState } from 'react';
import { 
  Shield, 
  Users, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Settings,
  BarChart3,
  Package,
  ShoppingCart,
  MessageSquare,
  Star,
  BookOpen,
  Mail,
  Database,
  ChevronDown,
  ChevronRight,
  Check,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { 
  ROLE_PERMISSIONS, 
  PERMISSION_DESCRIPTIONS, 
  ROLE_DESCRIPTIONS,
  UserRole,
  Permission 
} from '@/lib/permissions';

const PERMISSION_CATEGORIES = {
  'Dashboard': {
    icon: BarChart3,
    permissions: ['dashboard.view']
  },
  'Products': {
    icon: Package,
    permissions: ['products.view', 'products.create', 'products.edit', 'products.delete', 'products.manage_stock']
  },
  'Orders': {
    icon: ShoppingCart,
    permissions: ['orders.view', 'orders.edit', 'orders.delete', 'orders.fulfill', 'orders.refund']
  },
  'Customers': {
    icon: Users,
    permissions: ['customers.view', 'customers.create', 'customers.edit', 'customers.delete', 'customers.export']
  },
  'User Management': {
    icon: Shield,
    permissions: ['users.view', 'users.create', 'users.edit', 'users.delete', 'users.manage_roles', 'users.reset_password']
  },
  'Blog & Content': {
    icon: BookOpen,
    permissions: ['blog.view', 'blog.create', 'blog.edit', 'blog.delete', 'blog.publish']
  },
  'Reviews': {
    icon: Star,
    permissions: ['reviews.view', 'reviews.moderate', 'reviews.delete']
  },
  'Contact & Support': {
    icon: MessageSquare,
    permissions: ['contact.view', 'contact.reply', 'contact.delete', 'contact.assign']
  },
  'Newsletter': {
    icon: Mail,
    permissions: ['newsletter.view', 'newsletter.send', 'newsletter.export']
  },
  'Analytics': {
    icon: BarChart3,
    permissions: ['analytics.view', 'analytics.export', 'analytics.advanced']
  },
  'Settings': {
    icon: Settings,
    permissions: ['settings.view', 'settings.edit', 'settings.advanced', 'settings.site_visibility', 'settings.payment_gateway', 'settings.shipping']
  },
  'System': {
    icon: Database,
    permissions: ['system.backup', 'system.logs', 'system.maintenance']
  }
};

export default function AdminPermissions() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('super_admin');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Dashboard', 'Products']);
  const [view, setView] = useState<'role' | 'permission'>('role');

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'staff': return 'bg-green-100 text-green-800';
      case 'viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const hasPermission = (role: UserRole, permission: Permission) => {
    return ROLE_PERMISSIONS[role].includes(permission);
  };

  const getCategoryPermissionCount = (role: UserRole, category: string) => {
    const categoryPermissions = PERMISSION_CATEGORIES[category as keyof typeof PERMISSION_CATEGORIES].permissions;
    const rolePermissions = ROLE_PERMISSIONS[role];
    return categoryPermissions.filter(p => rolePermissions.includes(p as Permission)).length;
  };

  const getAllRolesWithPermission = (permission: Permission) => {
    return Object.entries(ROLE_PERMISSIONS)
      .filter(([_, permissions]) => permissions.includes(permission))
      .map(([role]) => role as UserRole);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Permissions Management</h1>
            <p className="text-gray-600">Control what each user role can access and modify</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button
              variant={view === 'role' ? 'default' : 'outline'}
              onClick={() => setView('role')}
              size="sm"
            >
              <Shield className="w-4 h-4 mr-2" />
              By Role
            </Button>
            <Button
              variant={view === 'permission' ? 'default' : 'outline'}
              onClick={() => setView('permission')}
              size="sm"
            >
              <Settings className="w-4 h-4 mr-2" />
              By Permission
            </Button>
          </div>
        </div>

        {/* Role Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Object.entries(ROLE_PERMISSIONS).map(([role, permissions]) => (
            <Card key={role} className={selectedRole === role ? 'ring-2 ring-makhana-500' : ''}>
              <CardContent className="p-4 text-center cursor-pointer" onClick={() => setSelectedRole(role as UserRole)}>
                <div className="flex items-center justify-center mb-2">
                  <Shield className="w-6 h-6 text-makhana-600" />
                </div>
                <Badge className={getRoleColor(role as UserRole)} variant="secondary">
                  {role.replace('_', ' ').toUpperCase()}
                </Badge>
                <p className="text-2xl font-bold mt-2">{permissions.length}</p>
                <p className="text-sm text-gray-600">permissions</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {view === 'role' ? (
          /* Role-based View */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Role Selector */}
            <Card>
              <CardHeader>
                <CardTitle>Select Role</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(ROLE_DESCRIPTIONS).map(([role, description]) => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role as UserRole)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedRole === role
                          ? 'border-makhana-500 bg-makhana-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Badge className={getRoleColor(role as UserRole)} variant="secondary">
                          {role.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {ROLE_PERMISSIONS[role as UserRole].length} permissions
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{description}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Permissions for Selected Role */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    Permissions for{' '}
                    <Badge className={getRoleColor(selectedRole)} variant="secondary">
                      {selectedRole.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </span>
                  <span className="text-sm text-gray-500">
                    {ROLE_PERMISSIONS[selectedRole].length} total permissions
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(PERMISSION_CATEGORIES).map(([category, { icon: Icon, permissions }]) => {
                    const isExpanded = expandedCategories.includes(category);
                    const permissionCount = getCategoryPermissionCount(selectedRole, category);
                    const totalPermissions = permissions.length;
                    
                    return (
                      <div key={category} className="border rounded-lg">
                        <button
                          onClick={() => toggleCategory(category)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className="w-5 h-5 text-makhana-600" />
                            <span className="font-medium">{category}</span>
                            <Badge variant="outline">
                              {permissionCount}/{totalPermissions}
                            </Badge>
                          </div>
                          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                        
                        {isExpanded && (
                          <div className="border-t bg-gray-50 p-4">
                            <div className="space-y-2">
                              {permissions.map((permission) => (
                                <div key={permission} className="flex items-center justify-between py-2">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-3">
                                      {hasPermission(selectedRole, permission as Permission) ? (
                                        <Check className="w-4 h-4 text-green-600" />
                                      ) : (
                                        <X className="w-4 h-4 text-red-400" />
                                      )}
                                      <span className="text-sm font-medium">{permission}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 ml-7">
                                      {PERMISSION_DESCRIPTIONS[permission as Permission]}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Permission-based View */
          <Card>
            <CardHeader>
              <CardTitle>Permissions Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(PERMISSION_CATEGORIES).map(([category, { icon: Icon, permissions }]) => (
                  <div key={category}>
                    <div className="flex items-center space-x-3 mb-4">
                      <Icon className="w-5 h-5 text-makhana-600" />
                      <h3 className="text-lg font-semibold">{category}</h3>
                    </div>
                    <div className="space-y-3">
                      {permissions.map((permission) => {
                        const rolesWithPermission = getAllRolesWithPermission(permission as Permission);
                        return (
                          <div key={permission} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{permission}</h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  {PERMISSION_DESCRIPTIONS[permission as Permission]}
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-1 ml-4">
                                {rolesWithPermission.map((role) => (
                                  <Badge key={role} className={getRoleColor(role)} variant="secondary" size="sm">
                                    {role.replace('_', ' ')}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Reference Card */}
        <Card>
          <CardHeader>
            <CardTitle>Permission Quick Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Create & Add</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Products, Orders, Users</li>
                  <li>• Blog posts, Reviews</li>
                  <li>• Customer accounts</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">View & Access</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Dashboard analytics</li>
                  <li>• Customer data</li>
                  <li>• System reports</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Manage & Control</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• User roles & permissions</li>
                  <li>• Site settings</li>
                  <li>• System maintenance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}