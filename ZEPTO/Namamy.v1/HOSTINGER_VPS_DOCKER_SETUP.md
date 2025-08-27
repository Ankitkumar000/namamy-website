# Hostinger VPS Docker Setup Guide

## Step 1: Setup Hostinger VPS with Docker

### 1.1 Connect to Your Hostinger VPS

```bash
# SSH into your VPS (replace with your actual IP and username)
ssh root@your-vps-ip
# OR
ssh username@your-vps-ip
```

### 1.2 Update System Packages

```bash
# Update package index
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release
```

### 1.3 Install Docker

```bash
# Remove any old Docker installations
sudo apt remove docker docker-engine docker.io containerd runc

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package index again
sudo apt update

# Install Docker
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to docker group (to run docker without sudo)
sudo usermod -aG docker $USER

# Apply group changes
newgrp docker

# Verify Docker installation
docker --version
docker compose version
```

### 1.4 Configure Docker for Production

```bash
# Create Docker daemon configuration
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json > /dev/null <<EOF
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2"
}
EOF

# Restart Docker with new configuration
sudo systemctl restart docker

# Verify Docker is running
sudo systemctl status docker
```

### 1.5 Install Docker Compose (Standalone)

```bash
# Download Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Make it executable
sudo chmod +x /usr/local/bin/docker-compose

# Create symlink for easier access
sudo ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose

# Verify installation
docker-compose --version
```

### 1.6 Configure Firewall

```bash
# Install UFW if not installed
sudo apt install -y ufw

# Allow SSH
sudo ufw allow ssh

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow Coolify ports
sudo ufw allow 8000/tcp
sudo ufw allow 6001/tcp

# Enable firewall
sudo ufw --force enable

# Check status
sudo ufw status
```

### 1.7 Create Application Directory

```bash
# Create directory for your application
sudo mkdir -p /opt/namamy
sudo chown $USER:$USER /opt/namamy
cd /opt/namamy

# Create necessary directories
mkdir -p {logs,data,backups,ssl}
```

### 1.8 Test Docker Installation

```bash
# Test Docker with hello-world
docker run hello-world

# Test Docker Compose
echo "version: '3.8'
services:
  test:
    image: hello-world" > docker-compose.test.yml

docker-compose -f docker-compose.test.yml up
docker-compose -f docker-compose.test.yml down
rm docker-compose.test.yml
```

## Step 2: Install Coolify v4.0.0-beta.421

### 2.1 Download and Install Coolify

```bash
# Navigate to opt directory
cd /opt

# Download Coolify installation script
curl -fsSL https://cdn.coollabs.io/coolify/install.sh -o install.sh

# Make it executable
chmod +x install.sh

# Run installation (this will install Coolify v4)
sudo ./install.sh
```

### 2.2 Alternative Manual Installation

If the script doesn't work, install manually:

```bash
# Clone Coolify repository
cd /opt
sudo git clone https://github.com/coollabsio/coolify.git
sudo chown -R $USER:$USER coolify
cd coolify

# Checkout specific version
git checkout v4.0.0-beta.421

# Copy environment file
cp .env.example .env

# Generate application key
echo "APP_KEY=$(openssl rand -base64 32)" >> .env

# Set your domain
echo "APP_URL=http://your-vps-ip:8000" >> .env

# Start Coolify
docker-compose up -d

# Check if services are running
docker-compose ps
```

### 2.3 Configure Coolify

```bash
# Wait for services to start (2-3 minutes)
sleep 180

# Check Coolify logs
docker-compose logs -f coolify

# Access Coolify web interface
echo "Coolify is available at: http://your-vps-ip:8000"
```

### 2.4 First-time Setup

1. Open browser and go to `http://your-vps-ip:8000`
2. Create admin account
3. Complete initial setup wizard
4. Configure server settings

## Step 3: Configure Domain DNS Settings

### 3.1 Domain Configuration

**If using Hostinger Domain Management:**

1. Login to Hostinger control panel
2. Go to Domain → DNS Zone
3. Add/Update these DNS records:

```
Type: A
Name: @
Value: YOUR_VPS_IP
TTL: 3600

Type: A  
Name: www
Value: YOUR_VPS_IP
TTL: 3600

Type: CNAME
Name: *
Value: namamy.com
TTL: 3600
```

**If using external DNS provider:**
- Point your domain's nameservers to your DNS provider
- Create A records pointing to your VPS IP

### 3.2 Verify DNS Propagation

```bash
# Check DNS resolution
nslookup namamy.com
dig namamy.com

# Test from different locations
curl -I http://namamy.com
```

## Step 4: Deploy Application via Coolify

### 4.1 Prepare Git Repository

```bash
# If you haven't created a GitHub repo yet:
# 1. Create new repository on GitHub named "namamy-ecommerce"
# 2. Push your local code:

cd /Users/ankit/Downloads/ZEPTO/Namamy.v1
git remote add origin https://github.com/yourusername/namamy-ecommerce.git
git branch -M main
git push -u origin main
```

### 4.2 Deploy via Coolify Web Interface

1. **Login to Coolify**: `http://your-vps-ip:8000`
2. **Add New Application**:
   - Click "New Application"
   - Select "Git Repository"
   - Enter repository URL: `https://github.com/yourusername/namamy-ecommerce.git`
   - Branch: `main`
   - Build pack: `Docker`

3. **Configure Environment Variables**:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_APP_URL=https://namamy.com
   DATABASE_URL=postgresql://username:password@localhost:5432/namamy_production
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=https://namamy.com
   SMTP_HOST=smtp.hostinger.com
   SMTP_PORT=587
   SMTP_USER=noreply@namamy.com
   SMTP_PASS=your-email-password
   ```

4. **Configure Domain**:
   - Add custom domain: `namamy.com`
   - Enable SSL certificate generation
   - Configure redirects

5. **Deploy**:
   - Click "Deploy"
   - Monitor deployment logs
   - Wait for successful deployment

### 4.3 Alternative Manual Deployment

If Coolify doesn't work, deploy manually:

```bash
# Clone your repository
cd /opt
git clone https://github.com/yourusername/namamy-ecommerce.git namamy
cd namamy

# Copy production environment
cp .env.production .env

# Build and deploy
docker-compose -f docker-compose.prod.yml up -d --build

# Check status
docker-compose -f docker-compose.prod.yml ps
```

## Step 5: Setup Production Database

### 5.1 Install PostgreSQL

```bash
# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Start and enable PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql <<EOF
CREATE DATABASE namamy_production;
CREATE USER namamy_user WITH PASSWORD 'secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE namamy_production TO namamy_user;
ALTER USER namamy_user CREATEDB;
\q
EOF
```

### 5.2 Configure Database Connection

```bash
# Update .env with database URL
echo "DATABASE_URL=postgresql://namamy_user:secure_password_here@localhost:5432/namamy_production" >> .env
```

### 5.3 Run Database Migrations

```bash
# Navigate to your application directory
cd /opt/namamy

# Run Prisma migrations
docker exec -it namamy_app npx prisma migrate deploy

# Generate Prisma client
docker exec -it namamy_app npx prisma generate

# Seed database (optional)
docker exec -it namamy_app npx prisma db seed
```

## Step 6: Configure SSL Certificate

### 6.1 Install Certbot

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Or install via snap
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

### 6.2 Generate SSL Certificate

```bash
# Generate certificate for your domain
sudo certbot --nginx -d namamy.com -d www.namamy.com

# Test automatic renewal
sudo certbot renew --dry-run
```

### 6.3 Configure SSL in Coolify/Nginx

If using Coolify, SSL should be handled automatically. For manual setup:

```bash
# Create nginx configuration
sudo tee /etc/nginx/sites-available/namamy.com > /dev/null <<EOF
server {
    listen 80;
    server_name namamy.com www.namamy.com;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name namamy.com www.namamy.com;
    
    ssl_certificate /etc/letsencrypt/live/namamy.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/namamy.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/namamy.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Step 7: Final Production Testing and Monitoring

### 7.1 Test Application

```bash
# Test health endpoint
curl -I https://namamy.com/api/health

# Test main pages
curl -I https://namamy.com
curl -I https://namamy.com/shop
curl -I https://namamy.com/contact

# Check application logs
docker logs namamy_app
```

### 7.2 Setup Monitoring

```bash
# Install monitoring tools
sudo apt install -y htop iotop nethogs

# Setup log rotation
sudo tee /etc/logrotate.d/namamy > /dev/null <<EOF
/opt/namamy/logs/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    copytruncate
}
EOF
```

### 7.3 Create Backup Script

```bash
# Create backup script
sudo tee /opt/namamy/backup.sh > /dev/null <<EOF
#!/bin/bash
DATE=\$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/namamy/backups"

# Database backup
pg_dump namamy_production > \$BACKUP_DIR/db_backup_\$DATE.sql

# Files backup
tar -czf \$BACKUP_DIR/files_backup_\$DATE.tar.gz /opt/namamy --exclude=backups --exclude=node_modules

# Keep only last 7 days of backups
find \$BACKUP_DIR -name "*.sql" -mtime +7 -delete
find \$BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
EOF

chmod +x /opt/namamy/backup.sh

# Setup cron job for daily backups
echo "0 2 * * * /opt/namamy/backup.sh" | sudo crontab -
```

### 7.4 Final Checklist

- [ ] VPS accessible via SSH
- [ ] Docker and Docker Compose installed
- [ ] Coolify v4.0.0-beta.421 running
- [ ] Domain DNS configured
- [ ] Application deployed and accessible
- [ ] Database setup and migrations run
- [ ] SSL certificate configured
- [ ] Monitoring and backups setup
- [ ] Application fully functional at https://namamy.com

## Troubleshooting

### Common Issues:

1. **Docker permission denied**: 
   ```bash
   sudo usermod -aG docker $USER
   newgrp docker
   ```

2. **Port already in use**:
   ```bash
   sudo netstat -tulpn | grep :8000
   sudo kill -9 PID
   ```

3. **SSL certificate issues**:
   ```bash
   sudo certbot renew --force-renewal
   ```

4. **Database connection issues**:
   ```bash
   sudo systemctl status postgresql
   sudo -u postgres psql -c "\l"
   ```

Your Namamy ecommerce website should now be fully deployed and accessible at https://namamy.com! 🚀