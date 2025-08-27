# 🚀 Namamy Production Deployment Checklist

## Pre-Deployment Requirements

### ✅ Server Requirements
- [ ] Hostinger VPS with at least 2GB RAM, 2 CPU cores, 20GB storage
- [ ] Ubuntu 20.04+ or similar Linux distribution  
- [ ] Root or sudo access
- [ ] Domain name (namamy.com) purchased and accessible

### ✅ Prerequisites Completed
- [ ] Code is production-ready (TypeScript builds successfully)
- [ ] Environment variables configured
- [ ] Database schema prepared
- [ ] Docker configuration tested

## Quick Start Deployment

### Option 1: Automated Setup (Recommended)

1. **SSH into your Hostinger VPS:**
   ```bash
   ssh root@your-vps-ip
   # OR
   ssh username@your-vps-ip
   ```

2. **Run the automated setup script:**
   ```bash
   curl -fsSL https://raw.githubusercontent.com/yourusername/namamy-ecommerce/main/automated-vps-setup.sh | bash
   ```

3. **Follow the prompts and save the database credentials!**

4. **Configure DNS (while script runs):**
   - Login to Hostinger control panel
   - Go to Domain → DNS Zone  
   - Add these records:
     ```
     Type: A, Name: @, Value: YOUR_VPS_IP, TTL: 3600
     Type: A, Name: www, Value: YOUR_VPS_IP, TTL: 3600
     Type: CNAME, Name: *, Value: namamy.com, TTL: 3600
     ```

5. **Clone your repository:**
   ```bash
   cd /opt/namamy
   git clone https://github.com/yourusername/namamy-ecommerce.git .
   ```

6. **Generate SSL certificate:**
   ```bash
   sudo certbot --nginx -d namamy.com -d www.namamy.com
   ```

7. **Deploy the application:**
   ```bash
   ./deploy.sh
   ```

**That's it! Your site should be live at https://namamy.com** 🎉

---

### Option 2: Manual Step-by-Step

If you prefer to understand each step:

#### Step 1: Server Setup ⚙️
- [ ] Update system: `sudo apt update && sudo apt upgrade -y`
- [ ] Install Docker and Docker Compose
- [ ] Configure firewall (ports 80, 443, 8000, 6001)
- [ ] Create application directory: `/opt/namamy`

#### Step 2: Install Coolify 🛠️
- [ ] Download Coolify: `curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash`
- [ ] Access Coolify web interface: `http://your-vps-ip:8000`
- [ ] Create admin account
- [ ] Complete initial setup

#### Step 3: Database Setup 🗄️
- [ ] Install PostgreSQL
- [ ] Create production database and user
- [ ] Update connection string in environment variables

#### Step 4: Configure Domain 🌐
- [ ] Point DNS records to your VPS IP
- [ ] Wait for DNS propagation (up to 24 hours)
- [ ] Verify DNS: `nslookup namamy.com`

#### Step 5: SSL Certificate 🔒
- [ ] Install Certbot
- [ ] Generate certificate: `sudo certbot --nginx -d namamy.com -d www.namamy.com`
- [ ] Test auto-renewal: `sudo certbot renew --dry-run`

#### Step 6: Application Deployment 📦
- [ ] Clone repository to `/opt/namamy`
- [ ] Configure environment variables
- [ ] Build Docker containers
- [ ] Run database migrations
- [ ] Start application services

#### Step 7: Final Testing ✅
- [ ] Test application health: `curl https://namamy.com/api/health`
- [ ] Test main pages (home, shop, contact)
- [ ] Verify SSL certificate
- [ ] Test user registration and login
- [ ] Test ecommerce functionality

---

## Using Coolify (Recommended Approach)

### 1. Access Coolify Dashboard
```bash
# Open in browser
http://your-vps-ip:8000
```

### 2. Add New Application
- Click "New Application"
- Select "Git Repository" 
- Repository URL: `https://github.com/yourusername/namamy-ecommerce.git`
- Branch: `main`
- Build Pack: `Docker`

### 3. Configure Environment Variables
```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://namamy.com
DATABASE_URL=postgresql://namamy_user:password@postgres:5432/namamy_production
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXTAUTH_URL=https://namamy.com
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=noreply@namamy.com
SMTP_PASS=your-email-password
```

### 4. Configure Custom Domain
- Domain: `namamy.com`
- Enable SSL: ✅
- Force HTTPS: ✅

### 5. Deploy
- Click "Deploy"
- Monitor deployment logs
- Wait for successful deployment

---

## Manual Docker Deployment

If Coolify doesn't work, deploy manually:

### 1. Clone and Configure
```bash
cd /opt
git clone https://github.com/yourusername/namamy-ecommerce.git namamy
cd namamy

# Copy and configure environment
cp .env.example .env.production
# Edit environment variables
nano .env.production
```

### 2. Deploy with Docker Compose
```bash
# Build and start services
docker-compose -f docker-compose.prod.yml up -d --build

# Check service status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

### 3. Run Database Setup
```bash
# Run migrations
docker exec namamy_app npx prisma migrate deploy

# Generate Prisma client
docker exec namamy_app npx prisma generate

# Seed database (optional)
docker exec namamy_app npm run seed
```

---

## Post-Deployment Configuration

### Setup Monitoring 📊
```bash
# Check application health
curl -I https://namamy.com/api/health

# Monitor logs
docker logs namamy_app -f

# Check system resources
htop
```

### Setup Backups 💾
```bash
# Manual backup
cd /opt/namamy
./backup.sh

# Verify automated backups
crontab -l
ls -la backups/
```

### Configure Email 📧
Update SMTP settings in `.env.production`:
```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=noreply@namamy.com
SMTP_PASS=your-hostinger-email-password
SMTP_SECURE=false
SMTP_TLS=true
```

---

## Troubleshooting 🔧

### Common Issues:

**1. Port 3000 already in use:**
```bash
sudo netstat -tulpn | grep :3000
sudo kill -9 PID_NUMBER
```

**2. Docker permission denied:**
```bash
sudo usermod -aG docker $USER
newgrp docker
```

**3. Database connection failed:**
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Test connection
docker exec namamy_db psql -U namamy_user -d namamy_production -c "\l"
```

**4. SSL certificate issues:**
```bash
# Renew certificate
sudo certbot renew --force-renewal

# Check certificate status
sudo certbot certificates
```

**5. Application won't start:**
```bash
# Check logs
docker logs namamy_app

# Rebuild container
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
```

**6. DNS not propagating:**
```bash
# Check DNS from different locations
nslookup namamy.com
dig namamy.com
# Use online DNS checker tools
```

---

## Performance Optimization

### After Deployment:

1. **Enable Gzip Compression** in Nginx
2. **Setup CDN** (Cloudflare recommended)  
3. **Configure Redis Caching**
4. **Setup Database Connection Pooling**
5. **Enable Next.js Image Optimization**
6. **Setup Application Performance Monitoring**

---

## Security Checklist

- [ ] SSL certificate installed and auto-renewal enabled
- [ ] Firewall configured (only ports 22, 80, 443 open to public)
- [ ] Database not exposed to public internet
- [ ] Strong database passwords used
- [ ] Regular security updates scheduled
- [ ] Backup verification and recovery testing
- [ ] Application security headers configured

---

## Final Verification

### Test these URLs:
- [ ] https://namamy.com (homepage)
- [ ] https://namamy.com/shop (products)
- [ ] https://namamy.com/contact (contact form)
- [ ] https://namamy.com/api/health (health check)
- [ ] https://www.namamy.com (www redirect)

### Test functionality:
- [ ] User registration/login
- [ ] Product browsing
- [ ] Add to cart
- [ ] Checkout process (test mode)
- [ ] Admin login
- [ ] Email sending
- [ ] Form submissions

**🎉 Congratulations! Your Namamy ecommerce website is now live at https://namamy.com**

---

## Support & Maintenance

### Regular Maintenance:
- **Daily**: Check application health and logs
- **Weekly**: Review backup status and disk usage  
- **Monthly**: Apply security updates and review performance
- **Quarterly**: Review and update dependencies

### Getting Help:
- Check logs: `docker logs namamy_app`
- Application issues: Check `/opt/namamy/logs/`
- Server issues: `sudo journalctl -u docker`
- Database issues: `docker logs namamy_db`

### Update Deployment:
```bash
cd /opt/namamy
git pull origin main
./deploy.sh
```