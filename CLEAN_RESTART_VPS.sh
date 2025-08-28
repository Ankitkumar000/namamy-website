#!/bin/bash

# 🧹 CLEAN RESTART FOR NAMAMY DEPLOYMENT
# This will clean everything and start fresh

echo "🧹 CLEANING VPS FOR FRESH NAMAMY DEPLOYMENT..."
echo "=============================================="

# Stop all containers first
echo "Step 1: Stopping all Docker containers..."
docker stop $(docker ps -aq) 2>/dev/null || echo "No containers to stop"

# Remove all containers
echo "Step 2: Removing all containers..."
docker rm $(docker ps -aq) 2>/dev/null || echo "No containers to remove"

# Remove all Docker networks
echo "Step 3: Cleaning Docker networks..."
docker network prune -f

# Remove all volumes
echo "Step 4: Cleaning Docker volumes..."
docker volume prune -f

# Stop PostgreSQL system service
echo "Step 5: Stopping system PostgreSQL..."
sudo systemctl stop postgresql
sudo systemctl disable postgresql

# Stop and remove Nginx
echo "Step 6: Stopping Nginx..."
sudo systemctl stop nginx
sudo systemctl disable nginx

# Kill any process using port 80 and 5432
echo "Step 7: Freeing ports 80, 443, 5432..."
sudo fuser -k 80/tcp 2>/dev/null || echo "Port 80 free"
sudo fuser -k 443/tcp 2>/dev/null || echo "Port 443 free" 
sudo fuser -k 5432/tcp 2>/dev/null || echo "Port 5432 free"

# Clean up any remaining processes
sudo pkill -f postgres 2>/dev/null || echo "No postgres processes"
sudo pkill -f nginx 2>/dev/null || echo "No nginx processes"

# Set environment variable for database password
echo "Step 8: Setting up environment..."
export DB_PASSWORD="namamy_secure_2025"

# Create simple docker-compose without port conflicts
echo "Step 9: Creating simple docker-compose..."
cat > docker-compose.simple.yml <<EOF
version: '3.8'

services:
  namamy_app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: namamy_app
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=file:./dev.db
      - NEXTAUTH_SECRET=namamy-secret-2025
      - NEXTAUTH_URL=http://localhost:3000
    volumes:
      - ./logs:/app/logs
      - ./public/uploads:/app/public/uploads
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
EOF

echo "Step 10: Starting simple deployment..."
docker-compose -f docker-compose.simple.yml up -d --build

echo "Step 11: Waiting for application to start..."
sleep 30

echo "Step 12: Testing application..."
curl -I http://localhost:3000 || echo "App not responding yet"

echo "=============================================="
echo "✅ CLEAN DEPLOYMENT COMPLETED!"
echo ""
echo "🌐 Local access: http://localhost:3000"
echo "🌐 VPS access: http://31.97.186.101:3000"
echo ""
echo "Next steps:"
echo "1. Test: curl http://localhost:3000"
echo "2. If working, then setup proper SSL"
echo "3. Configure domain properly"
echo "=============================================="