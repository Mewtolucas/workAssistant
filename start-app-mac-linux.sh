#!/bin/bash

# Quick launcher for the Personal Assistant app
# Just run this script to start the app

cd "$(dirname "$0")"

echo ""
echo "Starting Personal Assistant..."
echo ""

npm start

if [ $? -ne 0 ]; then
    echo ""
    echo "Error starting app"
    exit 1
fi

exit 0
