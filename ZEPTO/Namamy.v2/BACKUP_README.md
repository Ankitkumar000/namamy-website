# Namamy eCommerce Website - Backup Documentation

## 🔒 Backup Overview

This document provides comprehensive backup instructions and information for the Namamy premium makhana eCommerce website built with Next.js 14, TypeScript, and TailwindCSS.

## 📁 Backup Contents

### Core Application Files
```
src/                          # Complete application source code
├── app/[locale]/            # Next.js App Router pages
├── components/              # Reusable React components
├── data/                    # Product data and mock information
├── store/                   # Zustand state management
└── lib/                     # Utility functions

public/                      # Static assets
messages/                    # i18n translation files
package.json                 # Dependencies and scripts
next.config.js              # Next.js configuration
tailwind.config.ts          # TailwindCSS configuration
tsconfig.json               # TypeScript configuration
```

### Pages & Features Included
- ✅ **Homepage** - Hero section, features, product showcase
- ✅ **Shop** - Product catalog with filtering and search
- ✅ **Product Details** - Individual product pages
- ✅ **Cart & Checkout** - Complete eCommerce flow
- ✅ **Authentication** - Login, signup, dashboard
- ✅ **User Dashboard** - Orders, profile, wishlist, addresses
- ✅ **About Us** - Company story and values
- ✅ **Contact** - Contact form and information
- ✅ **FAQ** - Searchable frequently asked questions
- ✅ **Legal Pages** - Privacy, Terms, Refund policy
- ✅ **Order Tracking** - Real-time order status
- ✅ **Reviews** - Customer testimonials
- ✅ **Error Pages** - Custom 404 and error handling

## 🚀 Quick Backup Commands

### Automated Backup (Recommended)
```bash
# Make backup script executable
chmod +x backup.sh

# Run the backup script
./backup.sh
```

### Manual Backup
```bash
# Create backup directory
mkdir -p backups/namamy_manual_$(date +%Y%m%d)

# Copy all necessary files
cp -r src/ backups/namamy_manual_$(date +%Y%m%d)/
cp -r public/ backups/namamy_manual_$(date +%Y%m%d)/
cp -r messages/ backups/namamy_manual_$(date +%Y%m%d)/
cp package.json next.config.js tailwind.config.ts tsconfig.json backups/namamy_manual_$(date +%Y%m%d)/

# Create compressed archive
tar -czf backups/namamy_manual_$(date +%Y%m%d).tar.gz -C backups namamy_manual_$(date +%Y%m%d)
```

## 📦 Restoration Instructions

### From Compressed Archive
```bash
# Extract the backup
tar -xzf namamy_backup_YYYYMMDD_HHMMSS.tar.gz

# Navigate to extracted folder
cd namamy_backup_YYYYMMDD_HHMMSS

# Install dependencies
npm install

# Run development server
npm run dev
```

### Production Deployment
```bash
# Build for production
npm run build

# Start production server
npm start

# Or deploy to Vercel/Netlify
npx vercel --prod
```

## 🔧 Technical Stack

### Core Technologies
- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Internationalization:** next-intl

### Key Dependencies
```json
{
  "next": "14.0.4",
  "react": "^18",
  "typescript": "^5",
  "tailwindcss": "^3.4.0",
  "zustand": "^4.4.7",
  "framer-motion": "^10.16.16",
  "next-intl": "^3.5.4",
  "lucide-react": "^0.303.0"
}
```

## 🌐 Environment Configuration

### Required Environment Variables
Create `.env.local` file:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Namamy
```

### Optional Production Variables
```env
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## 📊 Backup Verification Checklist

Before considering a backup complete, verify:

### File Structure
- [ ] `src/` directory with all components
- [ ] `public/` directory with assets
- [ ] `messages/` directory with translations
- [ ] Configuration files (package.json, next.config.js, etc.)

### Critical Components
- [ ] Layout components (Header, Footer, Layout)
- [ ] Shop and product components
- [ ] Cart and checkout flow
- [ ] User authentication components
- [ ] Dashboard and account management
- [ ] All page components

### Data & Configuration
- [ ] Product data in `src/data/products.ts`
- [ ] Translation files for all supported languages
- [ ] TailwindCSS custom configuration
- [ ] Next.js configuration with i18n setup

## 🔄 Backup Scheduling

### Automated Daily Backup (Linux/Mac)
Add to crontab:
```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * cd /path/to/namamy && ./backup.sh
```

### Weekly Backup with Cleanup
```bash
#!/bin/bash
# weekly_backup.sh
cd /path/to/namamy
./backup.sh

# Keep only last 4 weekly backups
cd backups
ls -t namamy_backup_*.tar.gz | tail -n +5 | xargs rm -f
```

## 💾 Storage Recommendations

### Local Storage
- **Development:** Keep 3-5 recent backups locally
- **Size:** Each backup ~50-100MB compressed
- **Location:** External drive or cloud storage

### Cloud Storage Options
- **Google Drive** - Easy access, good for small teams
- **AWS S3** - Reliable, cost-effective for larger backups
- **GitHub** - Version control for code (exclude node_modules)
- **Dropbox** - Simple sync and sharing

## 🚨 Disaster Recovery

### Critical Files Priority
1. **Source Code** (`src/` directory)
2. **Configuration** (package.json, next.config.js)
3. **Data** (product information, translations)
4. **Assets** (images, public files)

### Recovery Testing
Regularly test backup restoration:
```bash
# Test restoration process
mkdir test_restore
cd test_restore
tar -xzf ../backups/latest_backup.tar.gz
npm install
npm run build
```

## 📝 Backup Log Template

Keep a log of backups:
```
Date: 2024-01-XX
Time: XX:XX:XX
Backup Name: namamy_backup_YYYYMMDD_HHMMSS
Size: XXX MB
Files: XXX files
Status: ✅ Success / ❌ Failed
Notes: [Any special notes or changes]
```

## 🛠️ Troubleshooting

### Common Issues
1. **Permission Errors:** Ensure backup script is executable (`chmod +x backup.sh`)
2. **Disk Space:** Check available space before creating backups
3. **Dependencies:** Some dependencies might need rebuilding after restoration
4. **Environment:** Remember to set up environment variables after restoration

### Recovery Verification
After restoration, verify:
- [ ] Application starts without errors
- [ ] All pages load correctly
- [ ] Cart functionality works
- [ ] User authentication works
- [ ] All components render properly

## 📞 Support

If you encounter issues with backup or restoration:
1. Check the backup log for errors
2. Verify file permissions
3. Ensure all dependencies are installed
4. Test with a fresh Node.js environment

## 🎯 Best Practices

1. **Regular Backups:** Daily automated backups during development
2. **Version Control:** Use Git for code versioning alongside file backups
3. **Test Restoration:** Regularly test backup restoration process
4. **Multiple Locations:** Store backups in multiple locations
5. **Documentation:** Keep backup documentation updated
6. **Cleanup:** Regularly remove old backups to save space

---

**Created:** $(date +"%Y-%m-%d")  
**Website:** Namamy Premium Makhana eCommerce  
**Framework:** Next.js 14 with TypeScript  
**Status:** Production Ready ✅