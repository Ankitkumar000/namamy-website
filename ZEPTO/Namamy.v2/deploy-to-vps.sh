#!/bin/bash

# Namamy Website Deployment Script for VPS
# This script will deploy your Next.js application to Hostinger VPS

set -e

echo "🚀 Starting Namamy Website Deployment..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
echo "📦 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify Node.js installation
node --version
npm --version

# Create directory structure
echo "📁 Creating directories..."
sudo mkdir -p /var/www/namamy
sudo chown $USER:$USER /var/www/namamy

# Navigate to deployment directory
cd /var/www/namamy

# Copy files (you need to upload the project files first)
echo "📋 Note: Make sure to upload your project files to /var/www/namamy first"

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Install PM2 for process management
echo "⚙️ Installing PM2..."
sudo npm install -g pm2

# Start the application with PM2
echo "🚀 Starting application..."
pm2 start npm --name "namamy-website" -- start
pm2 save
pm2 startup | sudo bash

# Install and configure Nginx
echo "🌐 Setting up Nginx..."
sudo apt install nginx -y

# Create Nginx configuration
sudo tee /etc/nginx/sites-available/namamy > /dev/null <<EOF
server {
    listen 80;
    server_name srv958858.hstgr.cloud;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/namamy /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl enable nginx

# Configure firewall
echo "🔥 Configuring firewall..."
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

echo "✅ Deployment completed!"
echo "🌐 Your website should be accessible at: http://srv958858.hstgr.cloud"
echo "📊 To check PM2 status: pm2 status"
echo "📊 To view logs: pm2 logs namamy-website"
echo "🔄 To restart: pm2 restart namamy-website"