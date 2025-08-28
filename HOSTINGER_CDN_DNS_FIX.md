# 🔧 HOSTINGER CDN DNS FIX

## Problem: "Cannot add A/AAAA record when CDN is enabled"

### Solution: Disable CDN First

## Method 1: Disable CDN (Recommended)

### Step 1: Login to Hostinger
1. Go to: https://hpanel.hostinger.com/
2. Login with your credentials

### Step 2: Find CDN Settings
1. Go to **Websites** or **Hosting**
2. Find your **namamy.com** domain
3. Look for **CDN** or **Performance** section
4. Click **CDN Settings** or **Manage CDN**

### Step 3: Disable CDN
1. Find **Enable CDN** toggle
2. **Turn OFF** the CDN
3. Click **Save** or **Apply Changes**
4. Wait 5-10 minutes for changes to propagate

### Step 4: Add DNS Records (After CDN is disabled)
1. Go to **Domains** section  
2. Find **namamy.com** domain
3. Click **DNS Zone** or **Manage DNS**
4. Add these records:

| Type | Name | Content | TTL |
|------|------|---------|-----|
| A | @ | 31.97.186.101 | 3600 |
| A | www | 31.97.186.101 | 3600 |

## Method 2: Use CDN with Custom Settings (Advanced)

If you want to keep CDN enabled:

### Step 1: CDN Configuration
1. In CDN settings, look for **Origin Server** or **Backend**
2. Set Origin Server IP to: `31.97.186.101`
3. Set Origin Port to: `80` (HTTP) or `443` (HTTPS)

### Step 2: CDN DNS Records
CDN will automatically handle DNS routing to your VPS.

## Method 3: Contact Hostinger Support

If above methods don't work:
1. Go to Hostinger Support Chat
2. Ask them to: "Disable CDN for namamy.com so I can add custom A records"
3. They'll do it instantly

## ✅ Verification After DNS Fix

Test DNS after changes:
```bash
nslookup namamy.com
ping namamy.com
```

Should show your VPS IP: `31.97.186.101`

## Next Steps After DNS is Fixed

Run on VPS:
```bash
cd /opt/namamy/namamy-website
./COMPLETE_VPS_COMMANDS.sh
```

Then wait 15 minutes and run:
```bash
./FINAL_SSL_COMMANDS.sh
```

## 🎯 Result: https://namamy.com will be LIVE!