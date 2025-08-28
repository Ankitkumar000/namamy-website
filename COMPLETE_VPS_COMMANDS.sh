#!/bin/bash

# 🚀 NAMAMY COMPLETE DEPLOYMENT - Copy Paste All Commands
# Just copy and paste these commands one by one on your VPS

echo "🚀 NAMAMY COMPLETE DEPLOYMENT STARTING..."
echo "============================================="

# Step 1: Check Docker containers
echo "STEP 1: Checking containers..."
docker ps

# Step 2: Database setup and migrations
echo "STEP 2: Setting up database..."
docker exec namamy_app npx prisma migrate deploy
docker exec namamy_app npx prisma generate

# Step 3: Create admin user (optional)
echo "STEP 3: Creating admin user..."
docker exec namamy_app npx prisma db seed || echo "Seed failed - not critical"

# Step 4: Health check
echo "STEP 4: Health check..."
curl -I http://localhost:3000/api/health || echo "Health check failed - check logs"

# Step 5: Check application logs
echo "STEP 5: Checking application logs..."
docker logs namamy_app --tail 50

# Step 6: Test application locally first
echo "STEP 6: Testing application on port 3000..."
curl -I http://localhost:3000 || echo "App not responding on port 3000"

echo "============================================="
echo "✅ VPS DEPLOYMENT COMPLETED!"
echo ""
echo "Next steps:"
echo "1. Configure DNS in Hostinger panel:"
echo "   - A Record: @ → $(curl -s ifconfig.me)"
echo "   - A Record: www → $(curl -s ifconfig.me)" 
echo ""
echo "2. After DNS propagation, run SSL:"
echo "   sudo certbot --nginx -d namamy.com -d www.namamy.com"
echo ""
echo "3. Final test:"
echo "   curl -I https://namamy.com"
echo "============================================="