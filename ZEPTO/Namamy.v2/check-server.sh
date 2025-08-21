#!/bin/bash
echo "🔍 Checking Namamy Development Server Status..."
echo ""

# Check if process is running
if ps aux | grep "next dev" | grep -v grep > /dev/null; then
    echo "✅ Server Process: RUNNING"
    echo "📍 URL: http://localhost:3000"
    echo "🕐 Started: $(ps -o lstart= -p $(ps aux | grep "next dev" | grep -v grep | awk '{print $2}'))"
else
    echo "❌ Server Process: NOT RUNNING"
    echo "💡 To start: cd /Users/ankit/Downloads/Namamy && npm run dev"
fi

echo ""

# Check if port is listening
if netstat -an | grep LISTEN | grep 3000 > /dev/null; then
    echo "✅ Port 3000: LISTENING"
else
    echo "❌ Port 3000: NOT LISTENING"
fi

echo ""
echo "📋 Recent activity:"
tail -5 /Users/ankit/Downloads/Namamy/dev-server.log 2>/dev/null || echo "No log file found"