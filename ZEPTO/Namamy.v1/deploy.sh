#!/bin/bash

# Namamy Production Deployment Script for Hostinger + Coolify
# Author: Ankit Kumar
# Version: 1.0

set -e  # Exit on any error

echo "🚀 Starting Namamy Production Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="namamy-ecommerce"
DOMAIN="namamy.com"
NODE_VERSION="18"

echo -e "${BLUE}📋 Deployment Configuration:${NC}"
echo -e "  Project: ${PROJECT_NAME}"
echo -e "  Domain: ${DOMAIN}"
echo -e "  Node Version: ${NODE_VERSION}"
echo ""

# Pre-deployment checks
echo -e "${YELLOW}🔍 Running pre-deployment checks...${NC}"

# Check if required files exist
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ package.json not found!${NC}"
    exit 1
fi

if [ ! -f "next.config.js" ]; then
    echo -e "${RED}❌ next.config.js not found!${NC}"
    exit 1
fi

if [ ! -f "Dockerfile" ]; then
    echo -e "${RED}❌ Dockerfile not found!${NC}"
    exit 1
fi

if [ ! -f ".env.production" ]; then
    echo -e "${YELLOW}⚠️  .env.production not found. Make sure to configure environment variables in Coolify!${NC}"
fi

echo -e "${GREEN}✅ All required files found${NC}"

# Check Node.js version
if command -v node &> /dev/null; then
    NODE_CURRENT=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_CURRENT" -ge "$NODE_VERSION" ]; then
        echo -e "${GREEN}✅ Node.js version $NODE_CURRENT is compatible${NC}"
    else
        echo -e "${YELLOW}⚠️  Node.js version $NODE_CURRENT is lower than recommended $NODE_VERSION${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Node.js not found locally (will use Docker)${NC}"
fi

# Install dependencies and build locally for testing
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

echo -e "${YELLOW}🔧 Generating Prisma client...${NC}"
npx prisma generate

echo -e "${YELLOW}🏗️  Building application...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Local build successful${NC}"
else
    echo -e "${RED}❌ Build failed! Fix errors before deploying.${NC}"
    exit 1
fi

# Git checks and push
echo -e "${YELLOW}📤 Preparing Git repository...${NC}"

# Check if git repo is initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}🔧 Initializing Git repository...${NC}"
    git init
    git add .
    git commit -m "Initial commit for Namamy production deployment"
else
    echo -e "${GREEN}✅ Git repository found${NC}"
    
    # Check for uncommitted changes
    if [ -n "$(git status --porcelain)" ]; then
        echo -e "${YELLOW}📝 Committing changes...${NC}"
        git add .
        git commit -m "Production deployment updates - $(date '+%Y-%m-%d %H:%M:%S')"
    else
        echo -e "${GREEN}✅ No uncommitted changes${NC}"
    fi
fi

# Create .dockerignore if it doesn't exist
if [ ! -f ".dockerignore" ]; then
    echo -e "${YELLOW}🔧 Creating .dockerignore...${NC}"
    cat > .dockerignore << EOF
node_modules
.next
.git
.env.local
.env.development
README.md
*.log
coverage
.nyc_output
.DS_Store
*.md
docs/
EOF
fi

# Create production database migration script
echo -e "${YELLOW}🗄️  Creating database migration script...${NC}"
cat > migrate-prod.sh << EOF
#!/bin/bash
echo "🗄️  Running production database migrations..."
npx prisma migrate deploy
npx prisma db seed
echo "✅ Database migrations completed"
EOF
chmod +x migrate-prod.sh

# Generate deployment summary
echo -e "${BLUE}📋 Deployment Summary:${NC}"
echo "=================="
echo -e "Project: ${PROJECT_NAME}"
echo -e "Domain: ${DOMAIN}"
echo -e "Build Status: ${GREEN}✅ Ready${NC}"
echo -e "Docker: ${GREEN}✅ Configured${NC}"
echo -e "Environment: ${GREEN}✅ Production${NC}"
echo ""

echo -e "${GREEN}🎉 Deployment preparation completed!${NC}"
echo ""
echo -e "${BLUE}Next Steps for Coolify Deployment:${NC}"
echo "1. Push your code to GitHub repository"
echo "2. Create new project in Coolify dashboard"
echo "3. Connect your GitHub repository"
echo "4. Configure environment variables from .env.production"
echo "5. Set up PostgreSQL database service"
echo "6. Deploy the application"
echo "7. Configure domain and SSL certificate"
echo "8. Run database migrations using migrate-prod.sh"
echo ""

read -p "Do you want to push to remote repository now? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}📤 Pushing to remote repository...${NC}"
    
    # Check if remote exists
    if git remote -v | grep -q "origin"; then
        git push origin main
        echo -e "${GREEN}✅ Code pushed to remote repository${NC}"
    else
        echo -e "${RED}❌ No remote repository configured!${NC}"
        echo "Please add your remote repository:"
        echo "git remote add origin https://github.com/YOUR_USERNAME/namamy-ecommerce.git"
        echo "git push -u origin main"
    fi
fi

echo ""
echo -e "${GREEN}🚀 Namamy is ready for production deployment!${NC}"
echo -e "Visit your Coolify dashboard to complete the deployment process."
echo ""