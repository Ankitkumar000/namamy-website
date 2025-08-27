# 🚀 ONE-CLICK DEPLOYMENT GUIDE

## Step 1: Browser Terminal mein ye ek hi command run karo:

```bash
curl -s https://raw.githubusercontent.com/your-repo/deploy.sh | bash
```

## Step 2: Manual Commands (Copy-Paste All Together):

```bash
# Complete deployment in one go
cd /root && \
curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
apt install -y nodejs npm git nginx && \
mkdir -p /var/www/namamy && \
cd /var/www/namamy && \
npm install -g pm2 && \
cat > package.json << 'EOF'
{
  "name": "namamy-ecommerce",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
EOF
echo "✅ Package.json created" && \
cat > /etc/nginx/sites-available/namamy << 'EOF'
server {
    listen 80;
    server_name 31.97.186.101;
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
EOF
echo "✅ Nginx configured" && \
ln -sf /etc/nginx/sites-available/namamy /etc/nginx/sites-enabled/ && \
nginx -t && systemctl reload nginx && \
echo "🌐 Ready for file upload!"
```

## Step 3: Upload Your Files
- Go to File Manager
- Upload all project files to `/var/www/namamy/`

## Step 4: Final Start Command:
```bash
cd /var/www/namamy && npm install && npm run build && pm2 start npm --name namamy -- start && pm2 save
```

## ✅ Website will be live at: http://31.97.186.101