# 🚀 NAMAMY DEPLOYMENT - EXACT COMMANDS

## 📋 COPY PASTE YE COMMANDS:

### 1. GitHub Repository Public Karo:
```
https://github.com/Ankitkumar000/namamy-website
Settings → General → Danger Zone → Change repository visibility → Public
```

### 2. VPS में SSH:
```bash
ssh root@your-hostinger-vps-ip
```

### 3. One-Command Complete Setup:
```bash
curl -fsSL https://raw.githubusercontent.com/Ankitkumar000/namamy-website/main/automated-vps-setup.sh | bash
```

### 4. DNS Configuration (Hostinger Panel):
```
Type: A, Name: @, Value: YOUR_VPS_IP, TTL: 3600
Type: A, Name: www, Value: YOUR_VPS_IP, TTL: 3600  
Type: CNAME, Name: *, Value: namamy.com, TTL: 3600
```

### 5. Final Deploy Commands (VPS में):
```bash
cd /opt/namamy
git clone https://github.com/Ankitkumar000/namamy-website.git .
sudo certbot --nginx -d namamy.com -d www.namamy.com  
./deploy.sh
```

### 6. Check Website:
```
https://namamy.com
```

---

## 🎯 ALTERNATIVE - Coolify GUI Method:

### 1. Open Coolify:
```
http://your-vps-ip:8000
```

### 2. Add Application:
- Repository: `https://github.com/Ankitkumar000/namamy-website.git`
- Branch: `main`
- Build Pack: `Docker`

### 3. Environment Variables:
```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://namamy.com
DATABASE_URL=postgresql://namamy_user:password@postgres:5432/namamy_production
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://namamy.com
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=noreply@namamy.com
SMTP_PASS=your-email-password
```

### 4. Configure Domain:
- Domain: `namamy.com`
- Enable SSL: ✅
- Force HTTPS: ✅

### 5. Deploy:
- Click "Deploy"
- Monitor logs
- Wait for success

---

## 🔧 Troubleshooting Commands:

### Check Services:
```bash
docker ps
docker logs namamy_app
sudo systemctl status docker
sudo systemctl status postgresql
```

### Check DNS:
```bash
nslookup namamy.com
dig namamy.com
```

### Check SSL:
```bash
sudo certbot certificates
curl -I https://namamy.com
```

### Restart Services:
```bash
cd /opt/namamy
docker-compose -f docker-compose.prod.yml restart
```

---

## ✅ SUCCESS INDICATORS:

- ✅ `curl -I https://namamy.com` returns 200 OK
- ✅ `curl https://namamy.com/api/health` returns health status
- ✅ Website loads at https://namamy.com
- ✅ Admin panel accessible
- ✅ SSL certificate valid

**Total Time: 15-30 minutes**
**Result: LIVE WEBSITE at https://namamy.com 🎉**