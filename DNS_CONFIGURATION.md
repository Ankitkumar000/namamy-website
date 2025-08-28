# 🌐 DNS CONFIGURATION FOR NAMAMY.COM

## Hostinger Panel DNS Settings

### Step 1: Login to Hostinger
1. Go to: https://hpanel.hostinger.com/
2. Login with your credentials

### Step 2: Navigate to DNS Zone
1. Go to **Domains** section
2. Find **namamy.com** domain
3. Click **DNS Zone** or **Manage DNS**

### Step 3: Add DNS Records
**YOUR VPS IP:** `31.97.186.101`

Add these records exactly:

| Type | Name | Content | TTL |
|------|------|---------|-----|
| A | @ | 31.97.186.101 | 3600 |
| A | www | 31.97.186.101 | 3600 |
| CNAME | * | namamy.com | 3600 |

### Step 4: Save Changes
- Click **Save** or **Update**
- DNS propagation takes 5-30 minutes

### Step 5: Verify DNS
Wait 10-15 minutes, then test:
```bash
nslookup namamy.com
nslookup www.namamy.com
```

## ✅ DNS Configuration Complete!

Once DNS is working, run SSL certificate command:
```bash
sudo certbot --nginx -d namamy.com -d www.namamy.com
```