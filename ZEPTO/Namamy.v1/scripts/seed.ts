import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@namamy.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@namamy.com',
      password: adminPassword,
      role: 'ADMIN',
      phone: '+91 9876543210'
    }
  });

  console.log('✅ Admin user created:', admin.email);

  // Create test user
  const userPassword = await bcrypt.hash('user123', 12);
  
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      name: 'Test User',
      email: 'test@example.com',
      password: userPassword,
      role: 'USER',
      phone: '+91 9876543211'
    }
  });

  console.log('✅ Test user created:', testUser.email);

  // Create products
  const products = [
    {
      name: 'Premium Raw Makhana',
      slug: 'premium-raw-makhana',
      description: 'Premium quality raw makhana sourced directly from Bihar farms. Naturally dried and carefully selected for the best quality.',
      price: 199.0,
      comparePrice: 249.0,
      category: 'raw',
      subcategory: 'premium',
      tags: JSON.stringify(['raw', 'premium', 'natural', 'bihar']),
      weight: '100g',
      images: JSON.stringify(['/images/products/raw-makhana-1.jpg', '/images/products/raw-makhana-2.jpg']),
      stockCount: 100,
      inStock: true,
      nutrition: JSON.stringify({
        calories: 347,
        protein: 9.7,
        carbs: 76.9,
        fat: 0.1,
        fiber: 7.6
      }),
      ingredients: JSON.stringify(['Makhana (Fox Nuts)', '100% Natural']),
      featured: true
    },
    {
      name: 'Roasted Salted Makhana',
      slug: 'roasted-salted-makhana',
      description: 'Crispy roasted makhana seasoned with pink salt for a healthy and delicious snack.',
      price: 249.0,
      comparePrice: 299.0,
      category: 'roasted',
      subcategory: 'salted',
      tags: JSON.stringify(['roasted', 'salted', 'healthy', 'snack']),
      weight: '100g',
      images: JSON.stringify(['/images/products/salted-makhana-1.jpg', '/images/products/salted-makhana-2.jpg']),
      stockCount: 75,
      inStock: true,
      nutrition: JSON.stringify({
        calories: 350,
        protein: 9.5,
        carbs: 77,
        fat: 0.2,
        fiber: 7.5
      }),
      ingredients: JSON.stringify(['Makhana', 'Pink Salt', 'Sunflower Oil']),
      featured: true
    },
    {
      name: 'Chocolate Makhana',
      slug: 'chocolate-makhana',
      description: 'Indulgent chocolate-coated makhana for guilt-free snacking. Perfect blend of health and taste.',
      price: 299.0,
      comparePrice: 349.0,
      category: 'flavored',
      subcategory: 'chocolate',
      tags: JSON.stringify(['chocolate', 'flavored', 'sweet', 'indulgent']),
      weight: '100g',
      images: JSON.stringify(['/images/products/chocolate-makhana-1.jpg', '/images/products/chocolate-makhana-2.jpg']),
      stockCount: 50,
      inStock: true,
      nutrition: JSON.stringify({
        calories: 380,
        protein: 8.5,
        carbs: 78,
        fat: 2.5,
        fiber: 7
      }),
      ingredients: JSON.stringify(['Makhana', 'Dark Chocolate', 'Cocoa Powder', 'Natural Sweetener']),
      featured: true
    },
    {
      name: 'Honey Roasted Makhana',
      slug: 'honey-roasted-makhana',
      description: 'Naturally sweetened makhana roasted with pure honey for a delightful healthy treat.',
      price: 279.0,
      comparePrice: 329.0,
      category: 'flavored',
      subcategory: 'honey',
      tags: JSON.stringify(['honey', 'sweet', 'natural', 'roasted']),
      weight: '100g',
      images: JSON.stringify(['/images/products/honey-makhana-1.jpg', '/images/products/honey-makhana-2.jpg']),
      stockCount: 50,
      inStock: true,
      nutrition: JSON.stringify({
        calories: 365,
        protein: 9,
        carbs: 79,
        fat: 1,
        fiber: 7.2
      }),
      ingredients: JSON.stringify(['Makhana', 'Pure Honey', 'Ghee']),
      featured: true
    },
    {
      name: 'Spicy Masala Makhana',
      slug: 'spicy-masala-makhana',
      description: 'Fiery blend of Indian spices with crispy makhana for those who love bold flavors.',
      price: 259.0,
      comparePrice: 309.0,
      category: 'flavored',
      subcategory: 'spicy',
      tags: JSON.stringify(['spicy', 'masala', 'indian', 'bold']),
      weight: '100g',
      images: JSON.stringify(['/images/products/masala-makhana-1.jpg', '/images/products/masala-makhana-2.jpg']),
      stockCount: 50,
      inStock: true,
      nutrition: JSON.stringify({
        calories: 355,
        protein: 9.2,
        carbs: 77.5,
        fat: 0.8,
        fiber: 7.8
      }),
      ingredients: JSON.stringify(['Makhana', 'Red Chili Powder', 'Turmeric', 'Cumin', 'Coriander', 'Garam Masala', 'Salt']),
      featured: true
    }
  ];

  for (const product of products) {
    const createdProduct = await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product
    });
    console.log('✅ Product created:', createdProduct.name);
  }

  // Create sample reviews
  const sampleReviews = [
    {
      userId: testUser.id,
      productId: (await prisma.product.findUnique({ where: { slug: 'premium-raw-makhana' } }))!.id,
      rating: 5,
      comment: 'Excellent quality! Fresh and crunchy. Will definitely order again.'
    },
    {
      userId: testUser.id,
      productId: (await prisma.product.findUnique({ where: { slug: 'roasted-salted-makhana' } }))!.id,
      rating: 4,
      comment: 'Good taste but could use a bit more salt. Overall satisfied with the quality.'
    }
  ];

  for (const review of sampleReviews) {
    await prisma.review.create({ data: review });
  }

  console.log('✅ Sample reviews created');

  // Create sample newsletter subscribers
  const subscribers = [
    { email: 'subscriber1@example.com', name: 'John Doe', status: 'ACTIVE' },
    { email: 'subscriber2@example.com', name: 'Jane Smith', status: 'ACTIVE' },
    { email: 'subscriber3@example.com', status: 'ACTIVE' }
  ];

  for (const subscriber of subscribers) {
    await prisma.newsletter.upsert({
      where: { email: subscriber.email },
      update: {},
      create: subscriber
    });
  }

  console.log('✅ Newsletter subscribers created');

  // Create sample contact inquiries
  const contacts = [
    {
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91 9876543210',
      subject: 'Product Quality Question',
      message: 'I want to know about the freshness guarantee of your makhana products.',
      status: 'NEW',
      priority: 'MEDIUM',
      source: 'CONTACT_FORM',
      category: 'PRODUCT'
    },
    {
      name: 'Priya Sharma',
      email: 'priya@example.com',
      subject: 'Order Delivery Issue',
      message: 'My order was supposed to be delivered yesterday but I haven\'t received it yet.',
      status: 'REPLIED',
      priority: 'HIGH',
      source: 'EMAIL',
      category: 'ORDER'
    }
  ];

  for (const contact of contacts) {
    await prisma.contact.create({ data: contact });
  }

  console.log('✅ Sample contact inquiries created');

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📋 Login Credentials:');
  console.log('Admin: admin@namamy.com / admin123');
  console.log('User: test@example.com / user123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });