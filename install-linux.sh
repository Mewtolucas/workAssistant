#!/bin/bash

# Personal Assistant App - Complete Setup
# Linux Installer

set -e

cd "$(dirname "$0")"

clear

echo ""
echo "============================================"
echo "  Personal Assistant - Complete Setup"
echo "============================================"
echo ""
echo "This installer will:"
echo "  1. Check if Node.js is installed"
echo "  2. Install dependencies"
echo "  3. Create API key configuration"
echo "  4. Set up the Chrome extension"
echo "  5. Start the app"
echo ""
echo "This may take 5-10 minutes"
echo ""
read -p "Press Enter to continue..."

# Check if Node.js is installed
echo ""
echo "[STEP 1] Checking for Node.js..."
echo ""

if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo ""
    echo "Please install Node.js from: https://nodejs.org/"
    echo "Download the LTS version and install it"
    echo ""
    echo "Then run this installer again"
    read -p "Press Enter to exit..."
    exit 1
fi

NODE_VERSION=$(node --version)
echo "[OK] Node.js $NODE_VERSION is installed"
echo ""

# Check npm
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not installed!"
    echo "Please reinstall Node.js"
    read -p "Press Enter to exit..."
    exit 1
fi

NPM_VERSION=$(npm --version)
echo "[OK] npm $NPM_VERSION is installed"
echo ""

# Install dependencies
echo "[STEP 2] Installing dependencies..."
echo "This may take a few minutes..."
echo ""

if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo ""
        echo "ERROR: npm install failed!"
        echo "Please check your internet connection and try again"
        read -p "Press Enter to exit..."
        exit 1
    fi
else
    echo "[OK] Dependencies already installed"
fi

echo ""
echo "[OK] Dependencies installed successfully"
echo ""

# Check for .env file
echo "[STEP 3] Configuring API Key..."
echo ""

if [ -f ".env" ]; then
    echo ".env file already exists"
    echo ""
    echo "Current configuration:"
    cat .env
    echo ""
    read -p "Do you want to reconfigure? (Y/N): " RECONFIGURE
    if [ "$RECONFIGURE" = "Y" ] || [ "$RECONFIGURE" = "y" ]; then
        rm .env
    else
        SKIP_ENV=1
    fi
fi

# Create .env file with API key
if [ "$SKIP_ENV" != "1" ]; then
    echo ""
    echo "You need a Claude API key to use the Summarizer and Flashcard features"
    echo ""
    echo "Get your API key from: https://console.anthropic.com/"
    echo "1. Go to the website"
    echo "2. Sign in (create account if needed)"
    echo "3. Click 'API Keys' in the left menu"
    echo "4. Click 'Create Key'"
    echo "5. Copy the key that starts with 'sk-ant-'"
    echo ""
    read -p "Paste your Claude API key (or press Enter to skip): " CLAUDE_KEY

    if [ ! -z "$CLAUDE_KEY" ]; then
        echo "REACT_APP_CLAUDE_API_KEY=$CLAUDE_KEY" > .env
        echo "[OK] API key saved to .env"
    else
        echo "[SKIPPED] No API key provided - Summarizer and Flashcards will not work"
        echo "You can add it later by editing .env file"
        echo ""
    fi
fi

# Extension setup
echo ""
echo "[STEP 4] Setting up Chrome Extension..."
echo ""

if [ -f "extension/manifest.json" ]; then
    echo "[OK] Chrome extension files found"
    echo ""
    echo "To install the extension:"
    echo "  1. Go to: chrome://extensions/"
    echo "  2. Enable 'Developer mode' (top right)"
    echo "  3. Click 'Load unpacked'"
    echo "  4. Select the 'extension' folder"
    echo "  5. Done!"
    echo ""
    read -p "Press Enter to continue..."
else
    echo "[WARNING] Extension files not found"
fi

# Start the app
echo ""
echo "[STEP 5] Starting the app..."
echo ""
echo "The app will open in a new window"
echo ""

clear
echo ""
echo "============================================"
echo "  Personal Assistant is starting..."
echo "============================================"
echo ""
echo "The React development server is starting"
echo "The Electron app will open when ready"
echo ""
echo "This may take 1-2 minutes on first run"
echo ""
echo "To stop the app, press Ctrl+C"
echo ""
read -p "Press Enter to start..."

npm start

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Failed to start the app!"
    echo ""
    echo "Try running this command manually:"
    echo "  npm start"
    echo ""
    read -p "Press Enter to exit..."
    exit 1
fi

exit 0
