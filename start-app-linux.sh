#!/bin/bash

# Quick launcher for the Personal Assistant app
# Linux version

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
