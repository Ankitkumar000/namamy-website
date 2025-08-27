# Namamy - Premium Makhana eCommerce Website

A comprehensive, premium eCommerce website built with Next.js 14, TypeScript, and TailwindCSS for Namamy - a luxury Makhana (Fox nuts) brand.

## 🌟 Features Overview

### ✅ Complete Page Structure (23 Pages)
1. **Homepage** - Hero, categories, best sellers, benefits, reviews, newsletter
2. **Shop Page** - Advanced filtering, sorting, grid/list view, pagination
3. **Product Details** - Image gallery, reviews, nutrition, variants, Q&A
4. **Shopping Cart** - Real-time updates, coupon codes, shipping calculator
5. **Checkout Flow** - Multi-step process with address, payment, review
6. **Payment Integration** - Stripe, Razorpay, UPI, Net Banking, COD
7. **Order Confirmation** - Success page with order tracking
8. **Order Tracking** - Real-time status updates with timeline
9. **User Authentication** - Login/Signup with social OAuth
10. **User Dashboard** - Order history, wishlist, addresses, profile
11. **Admin Dashboard** - Products, orders, users, analytics, inventory
12. **About Us** - Company story, mission, team
13. **Blog** - SEO-friendly articles with CMS integration
14. **Single Blog Post** - Rich content, social sharing, comments
15. **Contact Us** - Form, location, WhatsApp integration
16. **Legal Pages** - Privacy, Terms, Refund policies
17. **FAQ** - Searchable knowledge base
18. **Why Choose Us** - Health benefits, process, quality
19. **Reviews & Testimonials** - Customer feedback showcase
20. **Press & Media** - Media coverage and press releases
21. **404 Error Page** - Custom branded error handling
22. **Sitemap** - Dynamic XML sitemap generation
23. **Multilingual Support** - English, Hindi, Tamil, Bengali

### 🚀 Advanced eCommerce Features
- **Smart Shopping Cart** - Persistent storage, real-time calculations
- **Advanced Search & Filtering** - Category, price, rating, availability filters
- **Product Variants** - Size, flavor, packaging options
- **Wishlist Management** - Save for later functionality
- **Coupon System** - Percentage, fixed, free shipping coupons
- **Inventory Tracking** - Real-time stock management
- **Order Management** - Complete lifecycle tracking
- **Customer Reviews** - Photo uploads, helpful votes, admin responses
- **Loyalty Program** - Points system for repeat customers
- **Newsletter Integration** - Mailchimp/SendGrid integration
- **Bulk Order Support** - B2B functionality
- **Gift Packaging** - Special occasion customization

### 🎨 Premium Design System
- **Luxury Brand Identity** - Elegant, minimalist design inspired by premium D2C brands
- **Custom Color Palette** - Makhana-inspired golden tones with premium accent colors
- **Typography System** - Inter (body), Playfair Display (headings), Poppins (display)
- **Sophisticated Animations** - Framer Motion powered micro-interactions
- **Glass Morphism Effects** - Modern frosted glass UI elements
- **Advanced Shadows** - Soft shadows with glow effects for premium feel
- **Responsive Design** - Mobile-first approach with perfect desktop scaling
- **Dark Mode Support** - System preference detection with toggle
- **Accessibility First** - WCAG 2.1 AA compliant, keyboard navigation

### 🌐 Internationalization (i18n)
- **4 Languages** - English (default), Hindi, Tamil, Bengali
- **Dynamic Routing** - `/en`, `/hi`, `/ta`, `/bn` URL structure
- **RTL Support** - Right-to-left text direction for applicable languages
- **Localized Content** - Currency, date formats, cultural adaptations
- **SEO Optimization** - hreflang tags, localized meta data
- **Translation Management** - Structured JSON files for easy updates

### 🔧 Technical Excellence
- **Next.js 14** - Latest App Router with React Server Components
- **TypeScript** - Strict type safety throughout the application
- **Zustand** - Lightweight state management for cart and auth
- **React Hook Form** - Performant forms with Zod validation
- **NextAuth.js** - Secure authentication with social providers
- **Prisma ORM** - Type-safe database operations
- **Stripe & Razorpay** - Multiple payment gateway integration
- **SendGrid** - Email service for transactional emails
- **Cloudinary** - Image optimization and management
- **Vercel Analytics** - Performance monitoring and insights

### ⚡ Performance & SEO
- **Core Web Vitals** - Optimized for perfect Lighthouse scores
- **Image Optimization** - Next.js Image with blur placeholders
- **Code Splitting** - Dynamic imports for optimal bundle sizes
- **Caching Strategy** - ISR for product pages, SSG for static content
- **SEO Optimized** - Meta tags, Open Graph, Twitter Cards
- **Structured Data** - JSON-LD for rich snippets
- **Sitemap Generation** - Dynamic XML sitemaps
- **robots.txt** - Search engine optimization

### 🔐 Security & Compliance
- **Data Protection** - GDPR compliance with privacy controls
- **Secure Payments** - PCI DSS compliant payment processing
- **Authentication** - JWT tokens with refresh mechanism
- **Input Validation** - Server-side validation with Zod schemas
- **Rate Limiting** - API protection against abuse
- **HTTPS Enforcement** - Secure data transmission
- **Environment Variables** - Secure configuration management

## 📁 Project Structure

```
namamy-ecommerce/
├── src/
│   ├── app/                          # Next.js 14 App Router
│   │   ├── [locale]/                 # Internationalized routes
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── shop/                 # Shop & product pages
│   │   │   │   ├── page.tsx          # Shop listing
│   │   │   │   └── [category]/       # Category pages
│   │   │   ├── product/              # Product pages
│   │   │   │   └── [slug]/           # Individual product
│   │   │   ├── cart/                 # Shopping cart
│   │   │   ├── checkout/             # Checkout flow
│   │   │   ├── auth/                 # Authentication
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   └── forgot-password/
│   │   │   ├── dashboard/            # User dashboard
│   │   │   │   ├── orders/
│   │   │   │   ├── wishlist/
│   │   │   │   ├── addresses/
│   │   │   │   └── profile/
│   │   │   ├── admin/                # Admin dashboard
│   │   │   │   ├── dashboard/
│   │   │   │   ├── products/
│   │   │   │   ├── orders/
│   │   │   │   ├── users/
│   │   │   │   └── analytics/
│   │   │   ├── about/                # About us
│   │   │   ├── blog/                 # Blog listing & posts
│   │   │   │   └── [slug]/
│   │   │   ├── contact/              # Contact page
│   │   │   ├── legal/                # Legal pages
│   │   │   │   ├── privacy/
│   │   │   │   ├── terms/
│   │   │   │   └── refund/
│   │   │   ├── faq/                  # FAQ page
│   │   │   ├── why-choose-us/        # Benefits page
│   │   │   ├── reviews/              # Reviews page
│   │   │   └── press/                # Press & media
│   │   ├── api/                      # API routes
│   │   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── products/             # Product CRUD
│   │   │   ├── cart/                 # Cart management
│   │   │   ├── orders/               # Order processing
│   │   │   ├── users/                # User management
│   │   │   ├── admin/                # Admin operations
│   │   │   ├── newsletter/           # Email subscriptions
│   │   │   ├── reviews/              # Review system
│   │   │   ├── blog/                 # Blog management
│   │   │   ├── payments/             # Payment processing
│   │   │   └── webhooks/             # Payment webhooks
│   │   ├── globals.css               # Global styles
│   │   └── layout.tsx                # Root layout
│   ├── components/                   # React components
│   │   ├── ui/                       # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── ...
│   │   ├── layout/                   # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── homepage/                 # Homepage sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── CategoriesSection.tsx
│   │   │   ├── BestSellersSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── NewsletterSection.tsx
│   │   ├── shop/                     # Shop components
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── FilterSidebar.tsx
│   │   │   └── SortDropdown.tsx
│   │   ├── cart/                     # Cart components
│   │   │   ├── CartDrawer.tsx
│   │   │   ├── CartItem.tsx
│   │   │   └── CartSummary.tsx
│   │   ├── auth/                     # Authentication
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── SocialLogin.tsx
│   │   ├── admin/                    # Admin components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── ProductManager.tsx
│   │   │   ├── OrderManager.tsx
│   │   │   └── Analytics.tsx
│   │   ├── blog/                     # Blog components
│   │   │   ├── BlogCard.tsx
│   │   │   ├── BlogPost.tsx
│   │   │   └── BlogSidebar.tsx
│   │   └── dashboard/                # User dashboard
│   │       ├── OrderHistory.tsx
│   │       ├── Wishlist.tsx
│   │       └── ProfileSettings.tsx
│   ├── lib/                          # Utilities & configurations
│   │   ├── utils.ts                  # Helper functions
│   │   ├── auth.ts                   # Authentication config
│   │   ├── db.ts                     # Database connection
│   │   ├── email.ts                  # Email service
│   │   ├── payment.ts                # Payment gateways
│   │   └── validations.ts            # Zod schemas
│   ├── store/                        # State management
│   │   ├── cart.ts                   # Cart store (Zustand)
│   │   ├── auth.ts                   # Auth store
│   │   ├── products.ts               # Products store
│   │   └── ui.ts                     # UI state store
│   ├── types/                        # TypeScript definitions
│   │   ├── index.ts                  # Core types
│   │   ├── api.ts                    # API response types
│   │   └── auth.ts                   # Auth types
│   ├── data/                         # Static data & mock data
│   │   ├── products.ts               # Product catalog
│   │   ├── categories.ts             # Category data
│   │   └── testimonials.ts           # Customer reviews
│   ├── hooks/                        # Custom React hooks
│   │   ├── useCart.ts
│   │   ├── useAuth.ts
│   │   ├── useProducts.ts
│   │   └── useLocalStorage.ts
│   ├── utils/                        # Utility functions
│   │   ├── formatting.ts             # Text/date formatting
│   │   ├── validation.ts             # Input validation
│   │   └── constants.ts              # App constants
│   ├── i18n.ts                       # Internationalization config
│   └── middleware.ts                 # Next.js middleware
├── public/                           # Static assets
│   ├── images/                       # Product & brand images
│   │   ├── products/
│   │   ├── categories/
│   │   ├── hero/
│   │   └── brand/
│   ├── icons/                        # SVG icons & favicons
│   ├── patterns/                     # Background patterns
│   └── robots.txt                    # SEO robots file
├── messages/                         # Translation files
│   ├── en.json                       # English translations
│   ├── hi.json                       # Hindi translations
│   ├── ta.json                       # Tamil translations
│   └── bn.json                       # Bengali translations
├── prisma/                           # Database schema
│   ├── schema.prisma                 # Prisma schema
│   ├── migrations/                   # DB migrations
│   └── seed.ts                       # Database seeding
├── emails/                           # Email templates
│   ├── welcome.tsx                   # Welcome email
│   ├── order-confirmation.tsx        # Order confirmation
│   ├── shipping-notification.tsx     # Shipping updates
│   └── newsletter.tsx                # Newsletter template
├── .env.example                      # Environment variables template
├── .env.local                        # Local environment variables
├── next.config.js                    # Next.js configuration
├── tailwind.config.js                # TailwindCSS configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies & scripts
└── README.md                         # Project documentation
```

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ and npm/yarn
- Database (MongoDB/PostgreSQL)
- Stripe/Razorpay accounts
- Email service account (SendGrid)
- Cloudinary account (optional)

### Installation Steps

1. **Clone and Setup**
```bash
git clone <repository-url>
cd namamy-ecommerce
npm install
# or yarn install
```

2. **Environment Configuration**
```bash
cp .env.example .env.local
# Fill in your actual environment variables
```

3. **Database Setup**
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

4. **Development Server**
```bash
npm run dev
# or yarn dev
```

5. **Access the Application**
- Frontend: `http://localhost:3000`
- Admin Panel: `http://localhost:3000/admin`

## 🔧 Development Workflow

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
npm run email:dev    # Start email development server
```

### Adding New Features

1. **New Page**
```bash
# Create new page component
src/app/[locale]/new-page/page.tsx

# Add to navigation
src/components/layout/Navigation.tsx

# Add translations
messages/en.json, messages/hi.json, etc.
```

2. **New Component**
```bash
# Create component
src/components/category/ComponentName.tsx

# Export from index
src/components/index.ts

# Add Storybook story (optional)
src/stories/ComponentName.stories.tsx
```

3. **New API Endpoint**
```bash
# Create API route
src/app/api/endpoint/route.ts

# Add types
src/types/api.ts

# Add validation schema
src/lib/validations.ts
```

## 💳 Payment Integration

### Stripe Setup
```typescript
// Stripe configuration
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Payment processing
const paymentIntent = await stripe.paymentIntents.create({
  amount: totalAmount * 100, // Convert to cents
  currency: 'inr',
  metadata: { orderId }
});
```

### Razorpay Setup
```typescript
// Razorpay configuration
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Order creation
const order = await razorpay.orders.create({
  amount: totalAmount * 100,
  currency: 'INR',
  receipt: `order_${orderId}`,
});
```

## 📧 Email System

### Email Templates
- Welcome emails for new users
- Order confirmation with invoice
- Shipping notifications with tracking
- Password reset emails
- Newsletter campaigns
- Abandoned cart recovery

### Setup
```typescript
// SendGrid configuration
const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

// Send email
await sendgrid.send({
  to: user.email,
  from: 'hello@namamy.com',
  templateId: 'welcome-template-id',
  dynamicTemplateData: { name: user.name }
});
```

## 🔐 Security Implementation

### Authentication Flow
```typescript
// JWT token generation
const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Password hashing
const hashedPassword = await bcrypt.hash(password, 12);

// Session management
const session = await getServerSession(authOptions);
```

### API Security
```typescript
// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // requests per window
});

// Input validation
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
```

## 📊 Analytics & Monitoring

### Performance Monitoring
- Core Web Vitals tracking
- Real User Monitoring (RUM)
- Error tracking with Sentry
- API performance monitoring

### Business Analytics
- Sales dashboard with charts
- Customer behavior analysis
- Product performance metrics
- Conversion funnel tracking

## 🚢 Deployment Guide

### Vercel Deployment (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Environment variables
vercel env add NEXTAUTH_SECRET
vercel env add DATABASE_URL
vercel env add STRIPE_SECRET_KEY
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Database Migration
```bash
# Production migration
npx prisma migrate deploy

# Seed production data
npx prisma db seed
```

## 🔍 SEO Optimization

### Technical SEO
- Dynamic sitemap generation
- Structured data (JSON-LD)
- Meta tags optimization
- Image optimization with alt tags
- Core Web Vitals optimization

### Content SEO
- Blog system for content marketing
- Product page optimization
- Category page SEO
- Local SEO for Indian market

## 🌍 Internationalization

### Adding New Language
1. Create translation file: `messages/[locale].json`
2. Add locale to `src/i18n.ts`
3. Update middleware configuration
4. Add language switcher option

### Translation Management
```typescript
// Using translations in components
const t = useTranslations('namespace');

// Dynamic translations
const message = t('key', { count: items.length });

// Rich text translations
const content = t.rich('content', {
  link: (chunks) => <Link href="/shop">{chunks}</Link>
});
```

## 🧪 Testing Strategy

### Unit Testing
```bash
# Run tests
npm run test

# Test coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### E2E Testing
```bash
# Playwright tests
npx playwright test

# Visual regression testing
npm run test:visual
```

## 📈 Performance Optimization

### Bundle Analysis
```bash
# Analyze bundle size
npm run analyze

# Check for unused dependencies
npx depcheck
```

### Image Optimization
```typescript
// Next.js Image optimization
<Image
  src="/product.jpg"
  alt="Product"
  width={400}
  height={300}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

## 🤝 Contributing Guidelines

### Code Standards
- Use TypeScript strict mode
- Follow ESLint rules
- Write meaningful commit messages
- Add JSDoc comments for functions
- Test new features

### Pull Request Process
1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request
5. Code review process

## 📞 Support & Documentation

### Getting Help
- 📧 Technical Support: dev@namamy.com
- 🐛 Bug Reports: GitHub Issues
- 💬 Community: Discord Server
- 📖 Documentation: Wiki Pages

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Guide](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Acknowledgments

- Design inspiration from premium D2C brands
- Open source community for amazing tools
- Beta testers and early feedback providers
- Indian food culture and makhana tradition

---

**Built with ❤️ for healthy snacking and premium eCommerce experiences**

*Ready to revolutionize the makhana industry with technology and taste!*