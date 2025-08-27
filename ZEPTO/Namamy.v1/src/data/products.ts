import { Product, Category, NutritionInfo } from '@/types';

// Sample nutrition info template
const baseMakhanaNutrition: NutritionInfo = {
  servingSize: '100g',
  calories: 347,
  protein: 9.7,
  totalFat: 0.1,
  saturatedFat: 0.1,
  transFat: 0,
  cholesterol: 0,
  sodium: 1,
  totalCarbohydrates: 76.9,
  dietaryFiber: 14.5,
  totalSugars: 2.1,
  addedSugars: 0,
  calcium: 60,
  iron: 1.4,
  potassium: 1368,
  vitaminA: 0,
  vitaminC: 0,
};

export const categories: Category[] = [
  {
    id: '1',
    name: 'Roasted Makhana',
    slug: 'roasted',
    description: 'Perfectly roasted fox nuts with natural flavor',
    image: '/images/products/makhana-1.jpg',
    productsCount: 15,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: '2',
    name: 'Flavored Makhana',
    slug: 'flavored',
    description: 'Delicious flavored varieties for every taste',
    image: '/images/products/makhana-2.jpg',
    productsCount: 12,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: '3',
    name: 'Premium Collection',
    slug: 'premium',
    description: 'Our finest quality makhana selection',
    image: '/images/products/makhana-3.jpg',
    productsCount: 8,
    isActive: true,
    sortOrder: 3,
  },
  {
    id: '4',
    name: 'Raw Makhana',
    slug: 'raw',
    description: 'Fresh raw fox nuts perfect for cooking and snacking',
    image: '/images/products/makhana-1.jpg',
    productsCount: 3,
    isActive: true,
    sortOrder: 4,
  },
  {
    id: '5',
    name: 'Gift Packs',
    slug: 'gift-packs',
    description: 'Beautiful gift packaging for special occasions',
    image: '/images/products/makhana-2.jpg',
    productsCount: 6,
    isActive: true,
    sortOrder: 5,
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Roasted Makhana',
    slug: 'premium-roasted-makhana',
    description: 'Our signature roasted makhana is carefully selected from the finest lotus seeds and perfectly roasted to bring out the natural nutty flavor. Rich in protein, low in calories, and packed with essential nutrients, these fox nuts are the perfect healthy snack for any time of the day.',
    shortDescription: 'Coming Soon - Perfectly roasted fox nuts with natural nutty flavor',
    price: 299,
    originalPrice: 399,
    discount: 25,
    images: [
      {
        id: '1',
        url: '/images/products/makhana-1.jpg',
        alt: 'Premium Roasted Makhana',
        isPrimary: true,
        order: 1,
      },
      {
        id: '2',
        url: '/images/products/makhana-premium-2.jpg',
        alt: 'Premium Makhana Variety',
        isPrimary: false,
        order: 2,
      },
      {
        id: '3',
        url: '/images/products/makhana-premium-3.jpg',
        alt: 'Premium Makhana Collection',
        isPrimary: false,
        order: 3,
      },
    ],
    category: 'Roasted',
    tags: ['premium', 'roasted', 'healthy', 'protein-rich', 'gluten-free'],
    inStock: false,
    stockQuantity: 0,
    stockCount: 0,
    sku: 'NAM-PRM-ROA-001',
    weight: '100g',
    nutritionInfo: baseMakhanaNutrition,
    ingredients: ['Fox nuts (Lotus seeds)', 'Rock salt', 'Turmeric'],
    allergens: [],
    shelfLife: '12 months',
    storageInstructions: 'Store in a cool, dry place away from direct sunlight',
    reviews: [],
    rating: 4.8,
    totalReviews: 124,
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    seoTitle: 'Premium Roasted Makhana - Healthy Fox Nuts | Namamy',
    seoDescription: 'Buy premium roasted makhana online. High protein, low calorie healthy snack.',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    name: 'Himalayan Pink Salt Makhana',
    slug: 'himalayan-pink-salt-makhana',
    description: 'Experience the unique combination of premium fox nuts seasoned with authentic Himalayan pink salt. This gourmet blend offers a perfect balance of taste and health, making it an ideal choice for health-conscious snacking.',
    shortDescription: 'Coming Soon - Gourmet fox nuts with Himalayan pink salt',
    price: 349,
    originalPrice: 449,
    discount: 22,
    images: [
      {
        id: '3',
        url: '/images/products/makhana-2.jpg',
        alt: 'Himalayan Pink Salt Makhana',
        isPrimary: true,
        order: 1,
      },
      {
        id: '4',
        url: '/images/products/makhana-premium-2.jpg',
        alt: 'Premium Himalayan Salt Variety',
        isPrimary: false,
        order: 2,
      },
      {
        id: '5',
        url: '/images/products/makhana-premium-3.jpg',
        alt: 'Gourmet Makhana Collection',
        isPrimary: false,
        order: 3,
      },
    ],
    category: 'Flavored',
    tags: ['himalayan-salt', 'gourmet', 'premium', 'flavored'],
    inStock: false,
    stockQuantity: 0,
    stockCount: 0,
    sku: 'NAM-HPS-MAK-002',
    weight: '100g',
    nutritionInfo: { ...baseMakhanaNutrition, sodium: 890 },
    ingredients: ['Fox nuts (Lotus seeds)', 'Himalayan pink salt', 'Black pepper'],
    allergens: [],
    shelfLife: '12 months',
    storageInstructions: 'Store in a cool, dry place away from direct sunlight',
    reviews: [],
    rating: 4.6,
    totalReviews: 87,
    isNew: true,
    isFeatured: false,
    isBestSeller: false,
    seoTitle: 'Himalayan Pink Salt Makhana - Gourmet Fox Nuts | Namamy',
    seoDescription: 'Premium fox nuts with authentic Himalayan pink salt. Healthy gourmet snacking.',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
  {
    id: '3',
    name: 'Masala Makhana Mix',
    slug: 'masala-makhana-mix',
    description: 'A delightful blend of traditional Indian spices with premium fox nuts. Our secret masala recipe transforms ordinary makhana into an extraordinary snacking experience that tingles your taste buds while providing excellent nutrition.',
    shortDescription: 'Coming Soon - Traditional Indian spiced fox nuts',
    price: 329,
    images: [
      {
        id: '4',
        url: '/images/products/makhana-1.jpg',
        alt: 'Masala Makhana Mix',
        isPrimary: true,
        order: 1,
      },
      {
        id: '6',
        url: '/images/products/makhana-premium-2.jpg',
        alt: 'Masala Spiced Variety',
        isPrimary: false,
        order: 2,
      },
      {
        id: '7',
        url: '/images/products/makhana-premium-3.jpg',
        alt: 'Traditional Spice Collection',
        isPrimary: false,
        order: 3,
      },
    ],
    category: 'Flavored',
    tags: ['masala', 'spiced', 'traditional', 'indian'],
    inStock: false,
    stockQuantity: 0,
    stockCount: 0,
    sku: 'NAM-MAS-MIX-003',
    weight: '100g',
    nutritionInfo: { ...baseMakhanaNutrition, sodium: 650 },
    ingredients: ['Fox nuts (Lotus seeds)', 'Chaat masala', 'Red chili powder', 'Cumin powder', 'Coriander powder', 'Black salt'],
    allergens: [],
    shelfLife: '10 months',
    storageInstructions: 'Store in a cool, dry place away from direct sunlight',
    reviews: [],
    rating: 4.7,
    totalReviews: 156,
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    seoTitle: 'Masala Makhana Mix - Spiced Fox Nuts | Namamy',
    seoDescription: 'Traditional Indian spiced makhana. Perfect blend of taste and nutrition.',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-18T00:00:00Z',
  },
  {
    id: '4',
    name: 'Caramel Makhana Delight',
    slug: 'caramel-makhana-delight',
    description: 'Indulge in the sweet side of healthy snacking with our caramel-coated makhana. Made with natural caramel and premium fox nuts, this treat satisfies your sweet tooth while keeping the nutrition intact.',
    shortDescription: 'Coming Soon - Sweet caramel-coated fox nuts',
    price: 379,
    originalPrice: 479,
    discount: 21,
    images: [
      {
        id: '5',
        url: '/images/products/makhana-2.jpg',
        alt: 'Caramel Makhana Delight',
        isPrimary: true,
        order: 1,
      },
    ],
    category: 'Premium',
    tags: ['caramel', 'sweet', 'dessert', 'treat'],
    inStock: false,
    stockQuantity: 0,
    stockCount: 0,
    sku: 'NAM-CAR-DEL-004',
    weight: '100g',
    nutritionInfo: { ...baseMakhanaNutrition, calories: 385, totalSugars: 18.2 },
    ingredients: ['Fox nuts (Lotus seeds)', 'Natural caramel', 'Organic cane sugar', 'Vanilla extract'],
    allergens: ['May contain traces of nuts'],
    shelfLife: '8 months',
    storageInstructions: 'Store in a cool, dry place away from direct sunlight',
    reviews: [],
    rating: 4.5,
    totalReviews: 98,
    isNew: true,
    isFeatured: false,
    isBestSeller: false,
    seoTitle: 'Caramel Makhana Delight - Sweet Fox Nuts | Namamy',
    seoDescription: 'Sweet caramel-coated makhana. Healthy dessert option for sweet cravings.',
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-22T00:00:00Z',
  },
  {
    id: '5',
    name: 'Peri Peri Makhana',
    slug: 'peri-peri-makhana',
    description: 'Spice up your snacking with our fiery peri peri flavored makhana. A perfect blend of African peri peri spices with healthy fox nuts for those who love a bit of heat in their snacks.',
    shortDescription: 'Coming Soon - Fiery peri peri flavored fox nuts',
    price: 359,
    originalPrice: 429,
    discount: 16,
    images: [
      {
        id: '6',
        url: '/images/products/makhana-1.jpg',
        alt: 'Peri Peri Makhana',
        isPrimary: true,
        order: 1,
      },
    ],
    category: 'Flavored',
    tags: ['peri-peri', 'spicy', 'flavored', 'african-spices'],
    inStock: false,
    stockQuantity: 0,
    stockCount: 0,
    sku: 'NAM-PER-PER-005',
    weight: '100g',
    nutritionInfo: { ...baseMakhanaNutrition, sodium: 720 },
    ingredients: ['Fox nuts (Lotus seeds)', 'Peri peri seasoning', 'Paprika', 'Garlic powder', 'Onion powder', 'Cayenne pepper'],
    allergens: [],
    shelfLife: '10 months',
    storageInstructions: 'Store in a cool, dry place away from direct sunlight',
    reviews: [],
    rating: 4.4,
    totalReviews: 67,
    isNew: true,
    isFeatured: false,
    isBestSeller: false,
    seoTitle: 'Peri Peri Makhana - Spicy Fox Nuts | Namamy',
    seoDescription: 'Fiery peri peri flavored makhana. Perfect spicy snack for heat lovers.',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-25T00:00:00Z',
  },
  {
    id: '6',
    name: 'Chocolate Makhana',
    slug: 'chocolate-makhana',
    description: 'A decadent combination of premium dark chocolate and crunchy makhana. This guilt-free indulgence offers the richness of chocolate with the health benefits of fox nuts.',
    shortDescription: 'Coming Soon - Dark chocolate coated fox nuts',
    price: 449,
    originalPrice: 549,
    discount: 18,
    images: [
      {
        id: '7',
        url: '/images/products/makhana-2.jpg',
        alt: 'Chocolate Makhana',
        isPrimary: true,
        order: 1,
      },
    ],
    category: 'Premium',
    tags: ['chocolate', 'premium', 'dessert', 'indulgent'],
    inStock: false,
    stockQuantity: 0,
    stockCount: 0,
    sku: 'NAM-CHO-MAK-006',
    weight: '100g',
    nutritionInfo: { ...baseMakhanaNutrition, calories: 420, totalFat: 8.5, totalSugars: 15.3 },
    ingredients: ['Fox nuts (Lotus seeds)', 'Dark chocolate (70% cocoa)', 'Cocoa butter', 'Natural vanilla'],
    allergens: ['May contain traces of milk and nuts'],
    shelfLife: '6 months',
    storageInstructions: 'Store in a cool, dry place below 25°C',
    reviews: [],
    rating: 4.6,
    totalReviews: 89,
    isNew: false,
    isFeatured: true,
    isBestSeller: false,
    seoTitle: 'Chocolate Makhana - Dark Chocolate Fox Nuts | Namamy',
    seoDescription: 'Premium dark chocolate coated makhana. Healthy indulgence redefined.',
    createdAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-01-28T00:00:00Z',
  },
  {
    id: '7',
    name: 'Premium Raw Makhana | Premium Grade Fox Nuts (Lotus Seeds)',
    slug: 'premium-raw-makhana-fox-nuts',
    description: 'Premium grade raw fox nuts (lotus seeds) sourced directly from the finest lotus farms in Bihar. These natural, fresh, and unprocessed makhana are perfect for cooking traditional recipes, making healthy snacks, or enjoying as nature intended. Rich in protein, fiber, and essential minerals, our raw makhana maintains all its natural nutritional properties. Ideal for preparing kheer, curry, roasted snacks, or as a wholesome addition to your healthy lifestyle.',
    shortDescription: 'Premium grade fresh raw fox nuts for cooking & snacking',
    price: 249,
    originalPrice: 319,
    discount: 22,
    images: [
      {
        id: '8',
        url: '/images/products/makhana-1.jpg',
        alt: 'Premium Raw Makhana | Premium Grade Fox Nuts',
        isPrimary: true,
        order: 1,
      },
      {
        id: '9',
        url: '/images/products/makhana-3.jpg',
        alt: 'Fresh Raw Makhana Close-up',
        isPrimary: false,
        order: 2,
      },
    ],
    category: 'Raw',
    tags: ['raw', 'fresh', 'premium-grade', 'natural', 'cooking', 'healthy-lifestyle', 'lotus-seeds', 'unprocessed'],
    inStock: true,
    stockQuantity: 200,
    stockCount: 200,
    sku: 'NAM-RAW-PHO-007',
    weight: '200g',
    nutritionInfo: { ...baseMakhanaNutrition, calories: 347, sodium: 0 },
    ingredients: ['100% Natural Fox nuts (Lotus seeds)'],
    allergens: [],
    shelfLife: '24 months',
    storageInstructions: 'Store in a cool, dry place away from moisture and direct sunlight. Use airtight container after opening.',
    reviews: [],
    rating: 4.9,
    totalReviews: 186,
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    seoTitle: 'Premium Raw Makhana - Premium Grade Fox Nuts for Cooking | Namamy',
    seoDescription: 'Buy premium grade raw makhana online. Fresh lotus seeds perfect for cooking, snacking, and healthy lifestyle. Natural & unprocessed fox nuts.',
    createdAt: '2024-01-30T00:00:00Z',
    updatedAt: '2024-01-30T00:00:00Z',
  },
];

// Utility functions
export const getProducts = (): Product[] => {
  return products;
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getBestSellerProducts = (): Product[] => {
  return products.filter(product => product.isBestSeller);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const getRelatedProducts = (productId: string, limit = 4): Product[] => {
  const currentProduct = getProductById(productId);
  if (!currentProduct) return [];
  
  return products
    .filter(product => 
      product.id !== productId && 
      product.category === currentProduct.category
    )
    .slice(0, limit);
};

export const searchProducts = (query: string, filters: any = {}): Product[] => {
  let filteredProducts = products;

  // Text search
  if (query) {
    const searchQuery = query.toLowerCase();
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery))
    );
  }

  // Category filter
  if (filters.category && filters.category !== 'all') {
    filteredProducts = filteredProducts.filter(product =>
      product.category.toLowerCase() === filters.category.toLowerCase()
    );
  }

  // Price range filter
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    filteredProducts = filteredProducts.filter(product =>
      product.price >= min && product.price <= max
    );
  }

  // In stock filter
  if (filters.inStock) {
    filteredProducts = filteredProducts.filter(product => product.inStock);
  }

  // Rating filter
  if (filters.rating) {
    filteredProducts = filteredProducts.filter(product => 
      product.rating >= filters.rating
    );
  }

  // Sorting
  if (filters.sortBy) {
    filteredProducts.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price':
          return filters.sortOrder === 'desc' ? b.price - a.price : a.price - b.price;
        case 'rating':
          return filters.sortOrder === 'desc' ? b.rating - a.rating : a.rating - b.rating;
        case 'name':
          return filters.sortOrder === 'desc' 
            ? b.name.localeCompare(a.name)
            : a.name.localeCompare(b.name);
        case 'newest':
          return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
        case 'popularity':
          return (b.totalReviews || 0) - (a.totalReviews || 0);
        default:
          return 0;
      }
    });
  }

  return filteredProducts;
};