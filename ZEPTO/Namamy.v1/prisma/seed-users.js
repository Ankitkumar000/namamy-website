const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function seedUsers() {
  try {
    console.log('🌱 Seeding admin users...');

    // Hash passwords
    const passwordHash = await bcrypt.hash('admin123', 12);

    // Create admin users
    const users = [
      {
        name: 'Super Admin',
        email: 'admin@namamy.com',
        phone: '+91 9876543210',
        password: passwordHash,
        role: 'super_admin',
        status: 'active',
        loginCount: 25
      },
      {
        name: 'Priya Manager',
        email: 'priya@namamy.com',
        phone: '+91 9876543211',
        password: passwordHash,
        role: 'manager',
        status: 'active',
        loginCount: 15
      },
      {
        name: 'Rahul Staff',
        email: 'rahul@namamy.com',
        phone: '+91 9876543212',
        password: passwordHash,
        role: 'staff',
        status: 'active',
        loginCount: 8
      },
      {
        name: 'Maya Support',
        email: 'maya@namamy.com',
        phone: '+91 9876543213',
        password: passwordHash,
        role: 'staff',
        status: 'inactive',
        loginCount: 3
      },
      {
        name: 'Arun Viewer',
        email: 'arun@namamy.com',
        phone: '+91 9876543214',
        password: passwordHash,
        role: 'viewer',
        status: 'active',
        loginCount: 1
      }
    ];

    for (const userData of users) {
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email }
      });

      if (!existingUser) {
        await prisma.user.create({
          data: userData
        });
        console.log(`✅ Created user: ${userData.name} (${userData.email})`);
      } else {
        console.log(`⚠️  User already exists: ${userData.email}`);
      }
    }

    console.log('🎉 Admin users seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedUsers();