'use client';

// Force dynamic rendering to avoid static generation issues with toast context
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Mail,
  Phone,
  Calendar,
  Users,
  UserPlus,
  Shield,
  X,
  Save,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Key,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useToast, createEnhancedToast } from '@/components/ui/Toast';

// User roles and permissions
const USER_ROLES = {
  super_admin: {
    name: 'Super Admin',
    color: 'bg-red-100 text-red-800',
    permissions: ['all']
  },
  admin: {
    name: 'Admin',
    color: 'bg-purple-100 text-purple-800',
    permissions: ['products', 'orders', 'customers', 'reports', 'settings']
  },
  manager: {
    name: 'Manager',
    color: 'bg-blue-100 text-blue-800',
    permissions: ['products', 'orders', 'customers', 'reports']
  },
  staff: {
    name: 'Staff',
    color: 'bg-green-100 text-green-800',
    permissions: ['products', 'orders', 'customers']
  },
  viewer: {
    name: 'Viewer',
    color: 'bg-gray-100 text-gray-800',
    permissions: ['view_only']
  }
};

// Mock users data
const mockUsers = [
  {
    id: 'USER-001',
    name: 'Admin User',
    email: 'admin@namamy.com',
    phone: '+91 9876543210',
    role: 'super_admin',
    status: 'active',
    lastLogin: '2024-01-30T10:30:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    loginCount: 245,
    avatar: null
  },
  {
    id: 'USER-002',
    name: 'Priya Manager',
    email: 'priya@namamy.com',
    phone: '+91 9876543211',
    role: 'manager',
    status: 'active',
    lastLogin: '2024-01-30T09:15:00Z',
    createdAt: '2024-01-15T00:00:00Z',
    loginCount: 89,
    avatar: null
  },
  {
    id: 'USER-003',
    name: 'Rahul Staff',
    email: 'rahul@namamy.com',
    phone: '+91 9876543212',
    role: 'staff',
    status: 'active',
    lastLogin: '2024-01-29T16:45:00Z',
    createdAt: '2024-01-20T00:00:00Z',
    loginCount: 45,
    avatar: null
  },
  {
    id: 'USER-004',
    name: 'Maya Support',
    email: 'maya@namamy.com',
    phone: '+91 9876543213',
    role: 'staff',
    status: 'inactive',
    lastLogin: '2024-01-25T14:20:00Z',
    createdAt: '2024-01-10T00:00:00Z',
    loginCount: 23,
    avatar: null
  },
  {
    id: 'USER-005',
    name: 'Arun Viewer',
    email: 'arun@namamy.com',
    phone: '+91 9876543214',
    role: 'viewer',
    status: 'active',
    lastLogin: '2024-01-28T11:30:00Z',
    createdAt: '2024-01-25T00:00:00Z',
    loginCount: 12,
    avatar: null
  }
];

export default function AdminUsers() {
  // Safe toast function that works during SSR
  const safeAddToast = (toastData: any) => {
    try {
      console.log('Toast:', toastData.title || toastData.message || 'Notification');
    } catch (error) {
      console.log('Notification attempted');
    }
  };
  const [users, setUsers] = useState(mockUsers);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'staff',
    status: 'active',
    password: '',
    confirmPassword: ''
  });

  // Load users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    superAdmin: users.filter(u => u.role === 'super_admin').length,
    admin: users.filter(u => u.role === 'admin').length,
    staff: users.filter(u => u.role === 'staff' || u.role === 'manager').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleDisplay = (role: string) => {
    const roleKey = role as keyof typeof USER_ROLES;
    return USER_ROLES[roleKey] || { name: role, color: 'bg-gray-100 text-gray-800' };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  const handleAddUser = async () => {
    if (newUser.password !== newUser.confirmPassword) {
      safeAddToast(createEnhancedToast.passwordMismatch());
      return;
    }

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
          status: newUser.status,
          password: newUser.password
        })
      });

      const data = await response.json();
      
      if (data.success) {
        await fetchUsers(); // Refresh the users list
        setShowAddModal(false);
        setNewUser({
          name: '',
          email: '',
          phone: '',
          role: 'staff',
          status: 'active',
          password: '',
          confirmPassword: ''
        });
        safeAddToast(createEnhancedToast.userAdded(newUser.name));
      } else {
        safeAddToast(createEnhancedToast.userAddFailed(data.error));
      }
    } catch (error) {
      console.error('Error adding user:', error);
      safeAddToast(createEnhancedToast.networkError());
    }
  };

  const handleEditUser = async () => {
    try {
      const response = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editingUser.name,
          email: editingUser.email,
          phone: editingUser.phone,
          role: editingUser.role,
          status: editingUser.status
        })
      });

      const data = await response.json();
      
      if (data.success) {
        await fetchUsers(); // Refresh the users list
        setShowEditModal(false);
        setEditingUser(null);
        safeAddToast(createEnhancedToast.userUpdated(editingUser.name));
      } else {
        safeAddToast(createEnhancedToast.userUpdateFailed(data.error));
      }
    } catch (error) {
      console.error('Error updating user:', error);
      safeAddToast(createEnhancedToast.networkError());
    }
  };


  const handleToggleStatus = async (user: any) => {
    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'toggle_status'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        await fetchUsers(); // Refresh the users list
        safeAddToast(createEnhancedToast.userStatusChanged(user.name, user.status === 'active' ? 'inactive' : 'active'));
      } else {
        safeAddToast(createEnhancedToast.statusUpdateFailed(data.error));
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      safeAddToast(createEnhancedToast.networkError());
    }
  };

  const handleResetPassword = async (user: any) => {
    const newPassword = prompt(`Enter new password for ${user.name}:`);
    if (newPassword) {
      try {
        const response = await fetch(`/api/admin/users/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'reset_password',
            password: newPassword
          })
        });

        const data = await response.json();
        
        if (data.success) {
          safeAddToast(createEnhancedToast.passwordReset(user.name));
        } else {
          safeAddToast(createEnhancedToast.resetPasswordFailed(data.error));
        }
      } catch (error) {
        console.error('Error resetting password:', error);
        safeAddToast(createEnhancedToast.networkError());
      }
    }
  };

  const handleExportUsers = () => {
    const csvContent = [
      ['User ID', 'Name', 'Email', 'Phone', 'Role', 'Status', 'Last Login', 'Login Count', 'Created Date'],
      ...filteredUsers.map(user => [
        user.id,
        user.name,
        user.email,
        user.phone,
        USER_ROLES[user.role as keyof typeof USER_ROLES].name,
        user.status,
        user.lastLogin ? formatDate(user.lastLogin) : 'Never',
        user.loginCount,
        formatDate(user.createdAt)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `namamy-users-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600">Manage admin users, roles, and permissions</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button variant="outline" onClick={handleExportUsers}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => setShowAddModal(true)}>
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-makhana-600" />
              </div>
              <p className="text-2xl font-bold">{userStats.total}</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <p className="text-2xl font-bold text-green-600">{userStats.active}</p>
              <p className="text-sm text-gray-600">Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <p className="text-2xl font-bold text-red-600">{userStats.inactive}</p>
              <p className="text-sm text-gray-600">Inactive</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-600">{userStats.superAdmin}</p>
              <p className="text-sm text-gray-600">Super Admin</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-600">{userStats.admin}</p>
              <p className="text-sm text-gray-600">Admins</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">{userStats.staff}</p>
              <p className="text-sm text-gray-600">Staff</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                />
              </div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                {Object.entries(USER_ROLES).map(([key, role]) => (
                  <option key={key} value={key}>{role.name}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Table View */}
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <table className="w-full table-fixed">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600 w-1/4">User</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 w-1/4">Contact</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 w-1/6">Role</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 w-1/6">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 w-1/6">Actions</th>
                    </tr>
                  </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 truncate">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-makhana-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-medium text-makhana-700">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 truncate">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-900 truncate">{user.email}</p>
                          <p className="text-xs text-gray-500 truncate">{user.phone}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getRoleDisplay(user.role).color}>
                          {getRoleDisplay(user.role).name}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedUser(user)}
                            className="text-xs px-1 py-1 h-6"
                          >
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingUser({...user});
                              setShowEditModal(true);
                            }}
                            className="text-xs px-1 py-1 h-6"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleStatus(user)}
                            className="text-xs px-1 py-1 h-6"
                          >
                            {user.status === 'active' ? 'Off' : 'On'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Details Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  User Details - {selectedUser.name}
                  <Button variant="ghost" size="sm" onClick={() => setSelectedUser(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Basic Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedUser.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedUser.phone}
                      </div>
                      <div className="flex items-center text-sm">
                        <Shield className="w-4 h-4 mr-2 text-gray-400" />
                        {USER_ROLES[selectedUser.role as keyof typeof USER_ROLES].name}
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        Joined {formatDate(selectedUser.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Login Statistics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Status:</span>
                        <Badge className={getStatusColor(selectedUser.status)}>
                          {selectedUser.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Logins:</span>
                        <span className="font-medium">{selectedUser.loginCount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Last Login:</span>
                        <span className="font-medium">
                          {selectedUser.lastLogin ? formatRelativeTime(selectedUser.lastLogin) : 'Never'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Permissions</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {USER_ROLES[selectedUser.role as keyof typeof USER_ROLES].permissions.map((permission) => (
                      <Badge key={permission} variant="outline" className="justify-center">
                        {permission === 'all' ? 'All Permissions' : permission.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Add New User</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      placeholder="user@namamy.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      placeholder="+91 XXXXXXXXXX"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role *
                    </label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      required
                    >
                      {Object.entries(USER_ROLES).filter(([key]) => key !== 'super_admin').map(([key, role]) => (
                        <option key={key} value={key}>{role.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={newUser.status}
                      onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <input
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      placeholder="Enter password"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      value={newUser.confirmPassword}
                      onChange={(e) => setNewUser({...newUser, confirmPassword: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      placeholder="Confirm password"
                      required
                    />
                  </div>
                </form>

                <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddUser}>
                    <Save className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {showEditModal && editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Edit User</h2>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={editingUser.name}
                      onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={editingUser.phone}
                      onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role *
                    </label>
                    <select
                      value={editingUser.role}
                      onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                      required
                      disabled={editingUser.role === 'super_admin'}
                    >
                      {Object.entries(USER_ROLES).map(([key, role]) => (
                        <option key={key} value={key}>{role.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={editingUser.status}
                      onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                </form>

                <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleEditUser}>
                    <Save className="w-4 h-4 mr-2" />
                    Update User
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}