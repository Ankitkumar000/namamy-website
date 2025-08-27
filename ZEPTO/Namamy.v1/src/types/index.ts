export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  comparePrice?: number;
  originalPrice?: number;
  discount?: number;
  images: string[] | ProductImage[];
  category: string;
  subcategory?: string;
  tags: string[];
  inStock: boolean;
  stockCount: number;
  stockQuantity?: number;
  sku?: string;
  weight: string;
  dimensions?: string;
  nutrition?: any;
  nutritionInfo?: NutritionInfo;
  ingredients: string[];
  allergens?: string[];
  shelfLife?: string;
  storageInstructions?: string;
  reviews?: Review[];
  rating: number;
  reviewCount?: number;
  totalReviews?: number;
  isNew?: boolean;
  featured?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  variants?: ProductVariant[];
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price?: number;
  originalPrice?: number;
  sku: string;
  stockQuantity: number;
  images?: string[];
}

export interface NutritionInfo {
  servingSize: string;
  calories: number;
  protein: number;
  totalFat: number;
  saturatedFat: number;
  transFat: number;
  cholesterol: number;
  sodium: number;
  totalCarbohydrates: number;
  dietaryFiber: number;
  totalSugars: number;
  addedSugars: number;
  calcium: number;
  iron: number;
  potassium: number;
  vitaminA?: number;
  vitaminC?: number;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  verified: boolean;
  helpful: number;
  unhelpful: number;
  response?: AdminResponse;
  createdAt: string;
  updatedAt: string;
}

export interface AdminResponse {
  message: string;
  respondedBy: string;
  respondedAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
  customizations?: Record<string, any>;
  addedAt: string;
}

export interface Cart {
  id: string;
  userId?: string;
  sessionId?: string;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  couponCode?: string;
  couponDiscount?: number;
  estimatedDelivery?: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  addresses: Address[];
  orders: Order[];
  reviews: Review[];
  wishlist: string[];
  loyaltyPoints: number;
  totalSpent: number;
  preferences: UserPreferences;
  isVerified: boolean;
  isActive: boolean;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  landmark?: string;
  phone: string;
  isDefault: boolean;
  instructions?: string;
}

export interface UserPreferences {
  language: string;
  currency: string;
  newsletter: boolean;
  smsNotifications: boolean;
  emailNotifications: boolean;
  notifications: {
    orderUpdates: boolean;
    promotions: boolean;
    newProducts: boolean;
    priceAlerts: boolean;
    stockAlerts: boolean;
  };
  dietaryPreferences: string[];
  allergies: string[];
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  user?: User;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paymentId?: string;
  transactionId?: string;
  shippingAddress: Address;
  billingAddress: Address;
  trackingNumber?: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  couponCode?: string;
  couponDiscount?: number;
  notes?: string;
  cancellationReason?: string;
  refundAmount?: number;
  refundReason?: string;
  timeline: OrderTimeline[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  total: number;
  selectedVariant?: ProductVariant;
  customizations?: Record<string, any>;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  RETURNED = 'returned',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded',
}

export enum PaymentMethod {
  STRIPE = 'stripe',
  RAZORPAY = 'razorpay',
  UPI = 'upi',
  NET_BANKING = 'net_banking',
  DEBIT_CARD = 'debit_card',
  CREDIT_CARD = 'credit_card',
  WALLET = 'wallet',
  COD = 'cod',
}

export interface OrderTimeline {
  id: string;
  status: OrderStatus;
  message: string;
  timestamp: string;
  updatedBy?: string;
}

export interface Coupon {
  id: string;
  code: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  minOrderValue?: number;
  maxDiscount?: number;
  maxUsage?: number;
  usedCount: number;
  userLimit?: number;
  applicableProducts?: string[];
  applicableCategories?: string[];
  excludedProducts?: string[];
  excludedCategories?: string[];
  isActive: boolean;
  startsAt: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: BlogAuthor;
  publishedAt?: string;
  updatedAt: string;
  tags: string[];
  category: string;
  featuredImage: string;
  images?: string[];
  seoTitle?: string;
  seoDescription?: string;
  readTime: number;
  views: number;
  likes: number;
  comments: BlogComment[];
  isPublished: boolean;
  isFeatured: boolean;
  relatedPosts?: string[];
}

export interface BlogAuthor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface BlogComment {
  id: string;
  postId: string;
  userId?: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  content: string;
  parentId?: string;
  replies?: BlogComment[];
  isApproved: boolean;
  createdAt: string;
}

export interface Newsletter {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  subscribedAt: string;
  preferences: string[];
  isActive: boolean;
  unsubscribedAt?: string;
  source?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
  productsCount: number;
  isActive: boolean;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  addedAt: string;
}

export interface ShippingRate {
  id: string;
  name: string;
  description: string;
  minWeight: number;
  maxWeight: number;
  price: number;
  estimatedDays: number;
  isActive: boolean;
}

export interface TaxRate {
  id: string;
  name: string;
  rate: number;
  applicableStates?: string[];
  isDefault: boolean;
  isActive: boolean;
}

export interface Analytics {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
  conversionRate: number;
  averageOrderValue: number;
  topProducts: Product[];
  recentOrders: Order[];
  monthlyRevenue: { month: string; revenue: number }[];
  customerGrowth: { month: string; customers: number }[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FilterOptions {
  categories?: string[];
  priceRange?: [number, number];
  inStock?: boolean;
  rating?: number;
  brands?: string[];
  tags?: string[];
  sortBy?: 'name' | 'price' | 'rating' | 'newest' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchFilters extends FilterOptions {
  query?: string;
  page?: number;
  limit?: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  type: 'general' | 'support' | 'bulk_order' | 'partnership';
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  logo: string;
  favicon: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    whatsapp?: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  businessHours: string;
  shippingInfo: string;
  returnPolicy: string;
  freeShippingThreshold: number;
  taxRate: number;
  currency: string;
  timezone: string;
  maintenanceMode: boolean;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  userId?: string;
  actionUrl?: string;
  createdAt: string;
}