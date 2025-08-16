#!/bin/bash

echo "🏃‍♂️ SportsPro Quick Start"
echo "=========================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "📝 Please create a .env file first:"
    echo "   cp env.example .env"
    echo "   # Then edit .env with your credentials"
    echo ""
    echo "📖 See SETUP.md for detailed instructions"
    exit 1
fi

echo "✅ Environment file found"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    pnpm install
    echo ""
fi

echo "🚀 Starting SportsPro Application..."
echo ""

# Start both frontend and backend
echo "🔄 Starting frontend and backend servers..."
echo "📱 Frontend will be available at: http://localhost:3000"
echo "🔧 Backend will be available at: http://localhost:5001"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start both servers concurrently
pnpm run dev:full 