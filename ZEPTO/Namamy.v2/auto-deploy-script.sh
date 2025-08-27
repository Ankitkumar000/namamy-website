#!/usr/bin/expect -f

# Automated SSH deployment script
set timeout 60
set host "31.97.186.101"
set user "root" 
set password "Amit@14032710"

# Connect to server
spawn ssh -o StrictHostKeyChecking=no $user@$host

# Handle password prompt
expect {
    "*password*" { 
        send "$password\r"
        expect "*#*"
    }
    "*#*" { }
    timeout {
        puts "Connection timeout"
        exit 1
    }
}

# Run deployment commands
send "curl -fsSL https://deb.nodesource.com/setup_18.x | bash -\r"
expect "*#*"

send "apt install -y nodejs npm git nginx\r"
expect "*#*"

send "mkdir -p /var/www/namamy && cd /var/www/namamy\r"
expect "*#*"

send "npm install -g pm2\r"
expect "*#*"

# Create package.json
send "cat > package.json << 'EOF'
{
  \"name\": \"namamy-ecommerce\",
  \"version\": \"1.0.0\",
  \"private\": true,
  \"scripts\": {
    \"dev\": \"next dev -H 0.0.0.0\",
    \"build\": \"next build\", 
    \"start\": \"next start\"
  },
  \"dependencies\": {
    \"next\": \"^14.1.0\",
    \"react\": \"^18.2.0\",
    \"react-dom\": \"^18.2.0\"
  }
}
EOF\r"
expect "*#*"

# Setup Nginx
send "cat > /etc/nginx/sites-available/namamy << 'NGINX_EOF'
server {
    listen 80;
    server_name 31.97.186.101;
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host \\$host;
        proxy_set_header X-Real-IP \\$remote_addr;
    }
}
NGINX_EOF\r"
expect "*#*"

send "ln -sf /etc/nginx/sites-available/namamy /etc/nginx/sites-enabled/\r"
expect "*#*"

send "nginx -t && systemctl reload nginx\r"
expect "*#*"

send "echo 'Deployment setup complete!'\r"
expect "*#*"

send "exit\r"
expect eof