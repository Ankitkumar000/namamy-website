#!/bin/bash
# 🚀 INSTANT DEPLOYMENT SCRIPT
# Just run this one command in Browser Terminal

set -e
echo "🚀 Starting Namamy Deployment..."

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs npm git nginx

# Setup directory
mkdir -p /var/www/namamy
cd /var/www/namamy

# Install PM2
npm install -g pm2

# Create basic package.json
cat > package.json << 'EOF'
{
  "name": "namamy-ecommerce",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -H 0.0.0.0",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@prisma/client": "^5.22.0",
    "next": "^14.1.0",
    "next-intl": "^3.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.0"
  }
}
EOF

# Configure Nginx
cat > /etc/nginx/sites-available/namamy << 'EOF'
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
EOF

# Enable Nginx site
ln -sf /etc/nginx/sites-available/namamy /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
systemctl enable nginx

# Setup firewall
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable

echo "✅ Server setup completed!"
echo "📁 Now upload your project files to: /var/www/namamy/"
echo "🚀 Then run: cd /var/www/namamy && npm install && npm run build && pm2 start npm --name namamy -- start"
echo "🌐 Website will be live at: http://31.97.186.101"