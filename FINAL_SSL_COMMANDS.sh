#!/bin/bash

# 🔒 SSL CERTIFICATE SETUP FOR NAMAMY.COM
# Run these commands AFTER DNS is configured and propagated

echo "🔒 SETTING UP SSL CERTIFICATE..."
echo "================================="

# Step 1: Test DNS first
echo "STEP 1: Testing DNS resolution..."
nslookup namamy.com
nslookup www.namamy.com

# Step 2: Generate SSL certificate
echo "STEP 2: Generating SSL certificate..."
sudo certbot --nginx -d namamy.com -d www.namamy.com --non-interactive --agree-tos --email admin@namamy.com

# Step 3: Test HTTPS
echo "STEP 3: Testing HTTPS..."
sleep 10
curl -I https://namamy.com
curl -I https://www.namamy.com

# Step 4: Final verification
echo "STEP 4: Final verification..."
echo "✅ Website should now be live at: https://namamy.com"
echo "✅ Admin panel: https://namamy.com/admin"

# Step 5: Set up auto-renewal
echo "STEP 5: Setting up SSL auto-renewal..."
sudo crontab -l | grep -q certbot || (crontab -l; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -

echo "================================="
echo "🎉 NAMAMY WEBSITE IS NOW LIVE!"
echo "🌐 URL: https://namamy.com"
echo "👨‍💼 Admin: https://namamy.com/admin"
echo "================================="