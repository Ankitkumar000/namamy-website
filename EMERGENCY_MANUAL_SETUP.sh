#!/bin/bash

# EMERGENCY MANUAL SETUP - If automated script fails
# VPS में run करो ye commands one by one

echo "🚨 EMERGENCY MANUAL SETUP FOR NAMAMY"
echo "===================================="

# Step 1: Update System
echo "Step 1: Updating system..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git unzip

# Step 2: Install Docker
echo "Step 2: Installing Docker..."
sudo apt remove -y docker docker-engine docker.io containerd runc
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker

# Step 3: Install Docker Compose
echo "Step 3: Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Step 4: Install PostgreSQL
echo "Step 4: Installing PostgreSQL..."
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Step 5: Create Database
echo "Step 5: Creating database..."
sudo -u postgres psql <<EOF
CREATE DATABASE namamy_production;
CREATE USER namamy_user WITH PASSWORD 'secure_password_123';
GRANT ALL PRIVILEGES ON DATABASE namamy_production TO namamy_user;
ALTER USER namamy_user CREATEDB;
\q
EOF

# Step 6: Install Nginx
echo "Step 6: Installing Nginx..."
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Step 7: Install Certbot
echo "Step 7: Installing Certbot..."
sudo apt install -y certbot python3-certbot-nginx

# Step 8: Configure Firewall
echo "Step 8: Configuring firewall..."
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Step 9: Create App Directory
echo "Step 9: Creating app directory..."
sudo mkdir -p /opt/namamy
sudo chown $USER:$USER /opt/namamy

# Step 10: Clone Repository
echo "Step 10: Cloning repository..."
cd /opt/namamy
git clone https://github.com/Ankitkumar000/namamy-website.git .

# Step 11: Setup Environment
echo "Step 11: Setting up environment..."
cp .env.example .env.production
sed -i 's/your-database-password/secure_password_123/g' .env.production
sed -i 's/localhost:3000/namamy.com/g' .env.production

# Step 12: Build and Deploy
echo "Step 12: Building and deploying..."
docker-compose -f docker-compose.prod.yml up -d --build

# Step 13: Generate SSL Certificate (after DNS is configured)
echo "Step 13: Generating SSL certificate..."
echo "Run this AFTER DNS is configured:"
echo "sudo certbot --nginx -d namamy.com -d www.namamy.com"

# Step 14: Final Check
echo "Step 14: Final health check..."
sleep 30
curl -I http://localhost:3000/api/health || echo "Health check failed - check logs"

echo ""
echo "✅ Manual setup completed!"
echo ""
echo "Next steps:"
echo "1. Configure DNS to point to this server's IP"
echo "2. Wait for DNS propagation"  
echo "3. Run: sudo certbot --nginx -d namamy.com -d www.namamy.com"
echo "4. Check: https://namamy.com"
echo ""
echo "Database credentials:"
echo "- Database: namamy_production"
echo "- Username: namamy_user" 
echo "- Password: secure_password_123"
echo ""
echo "Troubleshooting:"
echo "docker logs namamy_app"
echo "docker-compose -f docker-compose.prod.yml ps"
echo "sudo systemctl status nginx"