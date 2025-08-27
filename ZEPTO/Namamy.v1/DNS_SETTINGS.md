# 🌐 EXACT DNS SETTINGS FOR HOSTINGER

## Hostinger DNS Configuration

### Login to Hostinger:
```
https://hpanel.hostinger.com/
Domain → DNS Zone → namamy.com
```

### DNS Records to Add/Update:

#### A Records:
```
Type: A
Name: @
Points to: YOUR_VPS_IP_ADDRESS
TTL: 3600 (1 hour)
```

```
Type: A  
Name: www
Points to: YOUR_VPS_IP_ADDRESS
TTL: 3600 (1 hour)
```

#### CNAME Record (Optional):
```
Type: CNAME
Name: *
Points to: namamy.com
TTL: 3600 (1 hour)
```

#### MX Records (Email - if needed):
```
Type: MX
Name: @
Points to: mail.namamy.com
Priority: 10
TTL: 3600
```

### How to Get Your VPS IP:
```bash
# SSH into VPS and run:
curl ifconfig.me
# OR
ip addr show
```

### Verify DNS Propagation:
```bash
# Check from different locations:
nslookup namamy.com
dig namamy.com
ping namamy.com

# Online checkers:
https://www.whatsmydns.net/
https://dnschecker.org/
```

### DNS Propagation Time:
- **Local**: 5-15 minutes
- **Global**: 24-48 hours (maximum)
- **Typical**: 1-2 hours

### Test Commands:
```bash
# Test A record
nslookup namamy.com

# Test WWW subdomain  
nslookup www.namamy.com

# Test from VPS
curl -I http://namamy.com
curl -I https://namamy.com
```

---

## Alternative DNS Providers:

### If using Cloudflare:
1. Change nameservers to Cloudflare
2. Add same A records in Cloudflare dashboard
3. Enable "Proxied" for CDN benefits

### If using GoDaddy:
1. Domain Manager → DNS Management
2. Add A records as shown above

---

## Verification Checklist:
- [ ] A record for @ pointing to VPS IP
- [ ] A record for www pointing to VPS IP  
- [ ] DNS propagation started (nslookup shows VPS IP)
- [ ] Website accessible via http://namamy.com
- [ ] SSL certificate can be generated
- [ ] Website accessible via https://namamy.com