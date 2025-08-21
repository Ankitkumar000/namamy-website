#!/bin/bash

# Hostinger VPS Deployment Script
# Using API Token: OT9rYORwQpJ6K2urujPVPw7ZyWG9qHGmFwchPnDG736e1b37

set -e

VPS_IP="31.97.186.101"
API_TOKEN="OT9rYORwQpJ6K2urujPVPw7ZyWG9qHGmFwchPnDG736e1b37"

echo "🚀 Starting Hostinger VPS Deployment..."

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf deploy-package.tar.gz \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.git \
  --exclude=deploy-package.tar.gz \
  .

# Upload and deploy via SSH (will need manual password entry)
echo "🌐 Connecting to VPS: $VPS_IP"
echo "📋 Manual steps needed:"
echo "1. Run: scp deploy-package.tar.gz root@$VPS_IP:/tmp/"
echo "2. SSH into server: ssh root@$VPS_IP"
echo "3. Run deployment commands..."

# Create remote deployment script
cat > remote-deploy.sh << 'EOF'
#!/bin/bash
set -e

echo "🔧 Setting up VPS environment..."

# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Create app directory
mkdir -p /var/www/namamy
cd /var/www/namamy

# Extract deployment package
tar -xzf /tmp/deploy-package.tar.gz

# Install dependencies
npm install --production

# Build application
npm run build

# Setup PM2
pm2 delete namamy-website 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Install Nginx
apt install nginx -y

# Configure Nginx
cat > /etc/nginx/sites-available/namamy << 'NGINX_EOF'
server {
    listen 80;
    server_name 31.97.186.101;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINX_EOF

# Enable site
ln -sf /etc/nginx/sites-available/namamy /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
systemctl enable nginx

# Setup firewall
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable

echo "✅ Deployment completed!"
echo "🌐 Website live at: http://31.97.186.101"
EOF

echo "📋 Remote deployment script created!"
echo "🔑 Next steps:"
echo "1. Upload files: scp deploy-package.tar.gz remote-deploy.sh root@$VPS_IP:/tmp/"
echo "2. SSH connect: ssh root@$VPS_IP"  
echo "3. Run: chmod +x /tmp/remote-deploy.sh && /tmp/remote-deploy.sh"