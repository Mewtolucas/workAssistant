#!/bin/bash

# Personal Assistant Chrome Extension Installer for Linux
# This script opens Chrome Extensions page and shows instructions

clear

echo ""
echo "========================================"
echo "Personal Assistant Extension Installer"
echo "========================================"
echo ""
echo "This installer will help you add the extension to Chrome."
echo ""
read -p "Press Enter to continue..."

# Get the path to the extension folder
EXTENSION_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo ""
echo "Extension folder: $EXTENSION_PATH"
echo ""

# Check if extension folder exists
if [ ! -f "$EXTENSION_PATH/manifest.json" ]; then
    echo "ERROR: Extension folder not found!"
    echo "Make sure this script is in the Personal Assistant project folder."
    read -p "Press Enter to exit..."
    exit 1
fi

echo ""
echo "STEP 1: Opening Chrome Extensions page..."
echo "Please wait..."
echo ""

# Try to open Chrome
if command -v google-chrome &> /dev/null; then
    google-chrome "chrome://extensions/" &
elif command -v chromium &> /dev/null; then
    chromium "chrome://extensions/" &
elif command -v chromium-browser &> /dev/null; then
    chromium-browser "chrome://extensions/" &
else
    echo "Chrome not found. Please open it manually."
fi

sleep 2

clear

echo ""
echo "========================================"
echo "Manual Installation Instructions"
echo "========================================"
echo ""
echo "If Chrome didn't open automatically, follow these steps:"
echo ""
echo "1. Open Google Chrome (or Chromium)"
echo "2. Type in the address bar: chrome://extensions/"
echo "3. Press Enter"
echo ""
echo "4. In the top right, toggle ON \"Developer mode\""
echo ""
echo "5. Click \"Load unpacked\""
echo ""
echo "6. Navigate to this folder:"
echo "   $EXTENSION_PATH"
echo ""
echo "7. Click \"Open\" or \"Select Folder\""
echo ""
echo "8. The extension should now appear in your extensions list!"
echo ""
echo "9. Look for the \"Personal Assistant\" icon in your Chrome toolbar"
echo ""
echo "========================================"
echo "DONE!"
echo "========================================"
echo ""
read -p "Press Enter to exit..."
