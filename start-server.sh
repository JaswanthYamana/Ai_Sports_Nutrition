#!/bin/bash

echo "🚀 Starting SportsPro Backend Server..."
echo "📁 Server directory: server/"
echo "🔧 Environment: $NODE_ENV"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found!"
    echo "📝 Please create a .env file based on env.example"
    echo "🔗 Copy env.example to .env and update with your credentials"
    echo ""
fi

# Start the server
echo "🔄 Starting server on port 5001..."
cd server && node index.js 