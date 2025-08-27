import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Verify admin authentication
async function verifyAdmin(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '') || 
                request.cookies.get('admin_token')?.value;
  
  if (!token) {
    throw new Error('Authorization token required');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as any;
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// GET /api/admin/users/[id] - Get specific user
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // await verifyAdmin(request); // Commented for development

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        loginCount: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        ...user,
        lastLogin: user.lastLoginAt?.toISOString() || null
      }
    });
  } catch (error) {
    console.error('User fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/users/[id] - Update specific user
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // await verifyAdmin(request); // Commented for development

    const { name, email, phone, role, status } = await request.json();

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: params.id }
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user
    const user = await prisma.user.update({
      where: { id: params.id },
      data: {
        name: name || existingUser.name,
        email: email || existingUser.email,
        phone: phone || existingUser.phone,
        role: role || existingUser.role,
        status: status || existingUser.status,
        updatedAt: new Date()
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        loginCount: true
      }
    });

    return NextResponse.json({
      success: true,
      user: {
        ...user,
        lastLogin: user.lastLoginAt?.toISOString() || null
      },
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error('User update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users/[id] - Delete specific user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // await verifyAdmin(request); // Commented for development

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: params.id }
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Prevent deletion of super admin users
    if (existingUser.role === 'super_admin') {
      return NextResponse.json(
        { success: false, error: 'Super admin users cannot be deleted' },
        { status: 403 }
      );
    }

    // Delete user
    await prisma.user.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('User deletion error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/users/[id] - Reset password
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // await verifyAdmin(request); // Commented for development

    const { action, password } = await request.json();

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: params.id }
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    if (action === 'reset_password') {
      if (!password) {
        return NextResponse.json(
          { success: false, error: 'Password is required' },
          { status: 400 }
        );
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Update password
      await prisma.user.update({
        where: { id: params.id },
        data: {
          password: hashedPassword,
          updatedAt: new Date()
        }
      });

      return NextResponse.json({
        success: true,
        message: 'Password reset successfully'
      });
    } else if (action === 'toggle_status') {
      const newStatus = existingUser.status === 'active' ? 'inactive' : 'active';

      await prisma.user.update({
        where: { id: params.id },
        data: {
          status: newStatus,
          updatedAt: new Date()
        }
      });

      return NextResponse.json({
        success: true,
        message: `User ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`,
        status: newStatus
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('User action error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to perform action' },
      { status: 500 }
    );
  }
}