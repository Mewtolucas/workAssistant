@echo off
REM Personal Assistant Chrome Extension Installer for Windows
REM This script opens Chrome Extensions page and shows instructions

echo.
echo ========================================
echo Personal Assistant Extension Installer
echo ========================================
echo.
echo This installer will help you add the extension to Chrome.
echo.
pause

REM Get the path to the extension folder
for /f "delims=" %%A in ('cd') do set "EXTENSION_PATH=%%A\extension"

echo.
echo Extension folder: %EXTENSION_PATH%
echo.

REM Check if extension folder exists
if not exist "%EXTENSION_PATH%\manifest.json" (
    echo ERROR: Extension folder not found!
    echo Make sure this script is in the Personal Assistant project folder.
    pause
    exit /b 1
)

echo.
echo STEP 1: Opening Chrome Extensions page...
echo Please wait...
echo.

REM Try to open Chrome with extensions page
start chrome chrome://extensions/

timeout /t 2

cls

echo.
echo ========================================
echo Manual Installation Instructions
echo ========================================
echo.
echo If Chrome didn't open automatically, follow these steps:
echo.
echo 1. Open Google Chrome
echo 2. Type in the address bar: chrome://extensions/
echo 3. Press Enter
echo.
echo 4. In the top right, toggle ON "Developer mode"
echo.
echo 5. Click "Load unpacked"
echo.
echo 6. Navigate to this folder:
echo    %EXTENSION_PATH%
echo.
echo 7. Click "Open" or "Select Folder"
echo.
echo 8. The extension should now appear in your extensions list!
echo.
echo 9. Look for the "Personal Assistant" icon in your Chrome toolbar
echo.
echo ========================================
echo DONE!
echo ========================================
echo.
pause
