#!/bin/bash

# NAMAMY COMPLETE DEPLOYMENT - COPY PASTE YE COMMANDS
# Tumhe bas ye commands copy paste karni hain

echo "🚀 NAMAMY COMPLETE DEPLOYMENT SCRIPT"
echo "====================================="

# Step 1: GitHub Repository को Public बनाओ
echo "1. GitHub.com पर जाओ: https://github.com/Ankitkumar000/namamy-website"
echo "2. Settings → General → Danger Zone → Change repository visibility → Public"
echo ""

# Step 2: VPS में SSH करो
echo "STEP 2: VPS में SSH करो"
echo "ssh root@your-hostinger-vps-ip"
echo ""
echo "Press Enter when connected to VPS..."
read -p ""

# Step 3: Automated Setup (VPS में run करो)
echo "STEP 3: VPS में ये command run करो:"
echo ""
echo "curl -fsSL https://raw.githubusercontent.com/Ankitkumar000/namamy-website/main/automated-vps-setup.sh | bash"
echo ""
echo "यह command:"
echo "- Docker install करेगा"
echo "- PostgreSQL setup करेगा" 
echo "- Coolify install करेगा"
echo "- Firewall configure करेगा"
echo "- SSL certificate setup करेगा"
echo ""

# Step 4: DNS Configuration
echo "STEP 4: DNS Configure करो (script के साथ-साथ):"
echo ""
echo "Hostinger Control Panel → Domain → DNS Zone:"
echo "A record: @ → YOUR_VPS_IP"
echo "A record: www → YOUR_VPS_IP" 
echo "CNAME: * → namamy.com"
echo ""

# Step 5: Final Deployment (VPS में)
echo "STEP 5: Final Deployment (VPS में run करो):"
echo ""
echo "cd /opt/namamy"
echo "git clone https://github.com/Ankitkumar000/namamy-website.git ."
echo "sudo certbot --nginx -d namamy.com -d www.namamy.com"
echo "./deploy.sh"
echo ""

echo "🎉 WEBSITE LIVE: https://namamy.com"
echo ""
echo "ALTERNATIVE: Coolify Web Interface"
echo "1. http://your-vps-ip:8000"
echo "2. Add Git Repository: https://github.com/Ankitkumar000/namamy-website.git"
echo "3. Configure domain: namamy.com"
echo "4. Deploy!"
EOF