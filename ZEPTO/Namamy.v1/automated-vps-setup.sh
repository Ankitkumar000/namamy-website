#!/bin/bash

# Namamy Production Deployment - Automated VPS Setup Script
# Usage: curl -fsSL https://raw.githubusercontent.com/yourusername/namamy-ecommerce/main/automated-vps-setup.sh | bash

set -e

echo "🚀 Starting Namamy Production Deployment Setup..."
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root. Please run as a regular user with sudo privileges."
   exit 1
fi

# Variables (customize these)
APP_NAME="namamy"
APP_DIR="/opt/${APP_NAME}"
DOMAIN="namamy.com"
DB_NAME="${APP_NAME}_production"
DB_USER="${APP_NAME}_user"
DB_PASS=$(openssl rand -base64 32)

print_status "Configuration:"
echo "  - App Directory: $APP_DIR"
echo "  - Domain: $DOMAIN"
echo "  - Database: $DB_NAME"
echo "  - Database User: $DB_USER"
echo ""

read -p "Continue with installation? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

# Update system
print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release htop

# Install Docker
print_status "Installing Docker..."
if ! command -v docker &> /dev/null; then
    # Remove old versions
    sudo apt remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true
    
    # Add Docker GPG key
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    
    # Add Docker repository
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    # Install Docker
    sudo apt update
    sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    
    # Configure Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -aG docker $USER
    
    print_status "Docker installed successfully"
else
    print_warning "Docker already installed"
fi

# Install Docker Compose
print_status "Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    sudo ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
    print_status "Docker Compose installed successfully"
else
    print_warning "Docker Compose already installed"
fi

# Configure Docker daemon
print_status "Configuring Docker daemon..."
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

sudo systemctl restart docker

# Configure firewall
print_status "Configuring firewall..."
sudo ufw --force reset
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 8000/tcp
sudo ufw allow 6001/tcp
sudo ufw --force enable

# Create application directory
print_status "Creating application directory..."
sudo mkdir -p $APP_DIR
sudo chown $USER:$USER $APP_DIR
mkdir -p $APP_DIR/{logs,data,backups,ssl}

# Install PostgreSQL
print_status "Installing PostgreSQL..."
if ! command -v psql &> /dev/null; then
    sudo apt install -y postgresql postgresql-contrib
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
    
    # Create database and user
    sudo -u postgres psql <<EOF
CREATE DATABASE $DB_NAME;
CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
ALTER USER $DB_USER CREATEDB;
\q
EOF
    print_status "PostgreSQL configured successfully"
else
    print_warning "PostgreSQL already installed"
fi

# Install Nginx
print_status "Installing Nginx..."
if ! command -v nginx &> /dev/null; then
    sudo apt install -y nginx
    sudo systemctl start nginx
    sudo systemctl enable nginx
    print_status "Nginx installed successfully"
else
    print_warning "Nginx already installed"
fi

# Install Certbot
print_status "Installing Certbot..."
if ! command -v certbot &> /dev/null; then
    sudo apt install -y certbot python3-certbot-nginx
    print_status "Certbot installed successfully"
else
    print_warning "Certbot already installed"
fi

# Install Node.js (for manual deployment if needed)
print_status "Installing Node.js..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt install -y nodejs
    print_status "Node.js installed successfully"
else
    print_warning "Node.js already installed"
fi

# Install Coolify
print_status "Installing Coolify v4.0.0-beta.421..."
cd /opt
if [ ! -d "/opt/coolify" ]; then
    # Try automatic installation first
    if curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash; then
        print_status "Coolify installed via automatic installer"
    else
        print_warning "Automatic installer failed, trying manual installation..."
        
        # Manual installation
        sudo git clone https://github.com/coollabsio/coolify.git
        sudo chown -R $USER:$USER coolify
        cd coolify
        
        # Use latest stable version if specific version not available
        git checkout v4.0.0-beta.421 2>/dev/null || git checkout $(git describe --tags --abbrev=0)
        
        cp .env.example .env
        echo "APP_KEY=$(openssl rand -base64 32)" >> .env
        echo "APP_URL=http://$(curl -s ifconfig.me):8000" >> .env
        
        docker-compose up -d
        print_status "Coolify installed manually"
    fi
else
    print_warning "Coolify directory already exists"
fi

# Create environment file
print_status "Creating production environment file..."
cd $APP_DIR
cat > .env.production <<EOF
# Database
DATABASE_URL=postgresql://$DB_USER:$DB_PASS@localhost:5432/$DB_NAME

# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://$DOMAIN
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL=https://$DOMAIN

# Email (update with your SMTP settings)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=noreply@$DOMAIN
SMTP_PASS=your_email_password

# Admin
ADMIN_EMAIL=admin@$DOMAIN
ADMIN_PASSWORD=$(openssl rand -base64 16)
EOF

# Create Docker Compose for manual deployment
print_status "Creating Docker Compose configuration..."
cat > docker-compose.prod.yml <<EOF
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
    env_file:
      - .env.production
    volumes:
      - ./logs:/app/logs
      - ./public/uploads:/app/public/uploads
    depends_on:
      - postgres
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  postgres:
    image: postgres:15-alpine
    container_name: namamy_db
    environment:
      - POSTGRES_DB=$DB_NAME
      - POSTGRES_USER=$DB_USER
      - POSTGRES_PASSWORD=$DB_PASS
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups
    ports:
      - "5432:5432"
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    container_name: namamy_nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
      - /etc/letsencrypt:/etc/letsencrypt
    depends_on:
      - namamy_app
    restart: unless-stopped

volumes:
  postgres_data:
EOF

# Create Nginx configuration
print_status "Creating Nginx configuration..."
cat > nginx.conf <<EOF
events {
    worker_connections 1024;
}

http {
    upstream app {
        server namamy_app:3000;
    }

    server {
        listen 80;
        server_name $DOMAIN www.$DOMAIN;
        return 301 https://\$server_name\$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name $DOMAIN www.$DOMAIN;
        
        ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
        
        location / {
            proxy_pass http://app;
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
}
EOF

# Create backup script
print_status "Creating backup script..."
cat > backup.sh <<'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/namamy/backups"

# Database backup
docker exec namamy_db pg_dump -U $DB_USER $DB_NAME > $BACKUP_DIR/db_backup_$DATE.sql

# Files backup
tar -czf $BACKUP_DIR/files_backup_$DATE.tar.gz /opt/namamy --exclude=backups --exclude=node_modules

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x backup.sh

# Setup cron job for backups
print_status "Setting up automated backups..."
(crontab -l 2>/dev/null; echo "0 2 * * * $APP_DIR/backup.sh") | crontab -

# Create deployment script
print_status "Creating deployment script..."
cat > deploy.sh <<'EOF'
#!/bin/bash
set -e

echo "🚀 Deploying Namamy to Production..."

# Pull latest code
if [ -d ".git" ]; then
    git pull origin main
else
    echo "Not a git repository. Please clone your repository here first."
    exit 1
fi

# Build and deploy
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to start
echo "Waiting for services to start..."
sleep 30

# Run database migrations
echo "Running database migrations..."
docker exec namamy_app npx prisma migrate deploy
docker exec namamy_app npx prisma generate

# Check health
echo "Checking application health..."
curl -f http://localhost:3000/api/health || echo "Health check failed"

echo "✅ Deployment completed!"
echo "Application should be available at: https://$DOMAIN"
EOF

chmod +x deploy.sh

# Create system service for monitoring
print_status "Creating monitoring service..."
sudo tee /etc/systemd/system/namamy-monitor.service > /dev/null <<EOF
[Unit]
Description=Namamy Application Monitor
After=docker.service

[Service]
Type=oneshot
ExecStart=/bin/bash -c 'cd $APP_DIR && docker-compose -f docker-compose.prod.yml ps --services --filter "status=running" | wc -l | grep -q "3" || docker-compose -f docker-compose.prod.yml up -d'
User=$USER

[Timer]
OnCalendar=*:0/5
Persistent=true

[Install]
WantedBy=timers.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable namamy-monitor.timer
sudo systemctl start namamy-monitor.timer

# Apply new group membership
print_status "Applying Docker group membership..."
newgrp docker <<EOF
# Test Docker installation
docker --version
docker-compose --version
EOF

print_status "Setup completed successfully! 🎉"
echo ""
echo "=================================================="
echo "📋 NEXT STEPS:"
echo "=================================================="
echo ""
echo "1. 🔗 Configure DNS:"
echo "   - Point $DOMAIN to this server's IP: $(curl -s ifconfig.me)"
echo "   - Wait for DNS propagation (can take up to 24 hours)"
echo ""
echo "2. 📁 Clone your repository:"
echo "   cd $APP_DIR"
echo "   git clone https://github.com/yourusername/namamy-ecommerce.git ."
echo ""
echo "3. 🔒 Generate SSL certificate:"
echo "   sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo ""
echo "4. 🚀 Deploy your application:"
echo "   cd $APP_DIR"
echo "   ./deploy.sh"
echo ""
echo "5. 🌐 Or use Coolify (recommended):"
echo "   - Visit: http://$(curl -s ifconfig.me):8000"
echo "   - Create admin account"
echo "   - Add your Git repository"
echo "   - Configure domain and deploy"
echo ""
echo "=================================================="
echo "📊 IMPORTANT INFORMATION:"
echo "=================================================="
echo ""
echo "🗄️  Database:"
echo "   - Database: $DB_NAME"
echo "   - Username: $DB_USER"
echo "   - Password: $DB_PASS"
echo "   - Connection: postgresql://$DB_USER:$DB_PASS@localhost:5432/$DB_NAME"
echo ""
echo "🔧 Configuration files:"
echo "   - Environment: $APP_DIR/.env.production"
echo "   - Docker Compose: $APP_DIR/docker-compose.prod.yml"
echo "   - Nginx: $APP_DIR/nginx.conf"
echo "   - Backup script: $APP_DIR/backup.sh"
echo "   - Deploy script: $APP_DIR/deploy.sh"
echo ""
echo "🔍 Monitoring:"
echo "   - Application: http://localhost:3000/api/health"
echo "   - Coolify: http://$(curl -s ifconfig.me):8000"
echo "   - Logs: docker logs namamy_app"
echo "   - System: sudo systemctl status namamy-monitor.timer"
echo ""
echo "💾 Backups:"
echo "   - Automated daily backups at 2 AM"
echo "   - Manual backup: $APP_DIR/backup.sh"
echo "   - Backup location: $APP_DIR/backups/"
echo ""
print_warning "⚠️  Please save the database password shown above!"
print_status "Setup completed! Your server is ready for deployment."
EOF