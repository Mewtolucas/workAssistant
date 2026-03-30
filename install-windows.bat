@echo off
REM ============================================
REM Personal Assistant App - Complete Setup
REM Windows Installer
REM ============================================
REM This script automates the entire installation process

setlocal enabledelayedexpansion
cd /d "%~dp0"

color 0A
cls

echo.
echo ============================================
echo  Personal Assistant - Complete Setup
echo ============================================
echo.
echo This installer will:
echo   1. Check if Node.js is installed
echo   2. Install dependencies
echo   3. Create API key configuration
echo   4. Set up the Chrome extension
echo   5. Start the app
echo.
echo This may take 5-10 minutes
echo.
pause

REM Check if Node.js is installed
echo.
echo [STEP 1] Checking for Node.js...
echo.

node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Download the LTS version and install it
    echo.
    echo Then run this installer again
    pause
    exit /b 1
)

for /f "tokens=*" %%A in ('node --version') do set NODE_VERSION=%%A
echo [OK] Node.js %NODE_VERSION% is installed
echo.

REM Check npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm is not installed!
    echo Please reinstall Node.js
    pause
    exit /b 1
)

for /f "tokens=*" %%A in ('npm --version') do set NPM_VERSION=%%A
echo [OK] npm %NPM_VERSION% is installed
echo.

REM Install dependencies
echo [STEP 2] Installing dependencies...
echo This may take a few minutes...
echo.

if not exist "node_modules" (
    call npm install
    if errorlevel 1 (
        echo.
        echo ERROR: npm install failed!
        echo Please check your internet connection and try again
        pause
        exit /b 1
    )
) else (
    echo [OK] Dependencies already installed
)

echo.
echo [OK] Dependencies installed successfully
echo.

REM Check for .env file
echo [STEP 3] Configuring API Key...
echo.

if exist ".env" (
    echo .env file already exists
    echo.
    echo Current configuration:
    type .env
    echo.
    set /p RECONFIGURE="Do you want to reconfigure? (Y/N): "
    if /i "!RECONFIGURE!"=="Y" (
        del .env
    ) else (
        goto extension_setup
    )
)

REM Create .env file with API key
echo.
echo You need a Claude API key to use the Summarizer and Flashcard features
echo.
echo Get your API key from: https://console.anthropic.com/
echo 1. Go to the website
echo 2. Sign in (create account if needed)
echo 3. Click "API Keys" in the left menu
echo 4. Click "Create Key"
echo 5. Copy the key that starts with "sk-ant-"
echo.
set /p CLAUDE_KEY="Paste your Claude API key (or press Enter to skip): "

if not "!CLAUDE_KEY!"=="" (
    (
        echo REACT_APP_CLAUDE_API_KEY=!CLAUDE_KEY!
    ) > .env
    echo [OK] API key saved to .env
) else (
    echo [SKIPPED] No API key provided - Summarizer and Flashcards will not work
    echo You can add it later by editing .env file
    echo.
)

:extension_setup
echo.
echo [STEP 4] Setting up Chrome Extension...
echo.

if exist "extension\manifest.json" (
    echo [OK] Chrome extension files found
    echo.
    echo To install the extension:
    echo   1. Go to: chrome://extensions/
    echo   2. Enable "Developer mode" (top right)
    echo   3. Click "Load unpacked"
    echo   4. Select the "extension" folder
    echo   5. Done!
    echo.
    pause
) else (
    echo [WARNING] Extension files not found
)

REM Start the app
echo.
echo [STEP 5] Starting the app...
echo.
echo The app will open in a new window
echo.

cls
echo.
echo ============================================
echo  Personal Assistant is starting...
echo ============================================
echo.
echo The React development server is starting
echo The Electron app will open when ready
echo.
echo This may take 1-2 minutes on first run
echo.
echo To stop the app, press Ctrl+C in this window
echo.
pause

call npm start

if errorlevel 1 (
    echo.
    echo ERROR: Failed to start the app!
    echo.
    echo Try running this command manually:
    echo   npm start
    echo.
    pause
    exit /b 1
)

endlocal
pause
