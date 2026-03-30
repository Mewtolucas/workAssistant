@echo off
REM Quick launcher for the Personal Assistant app
REM Just double-click this file to start the app

cd /d "%~dp0"

echo.
echo Starting Personal Assistant...
echo.

npm start

if errorlevel 1 (
    echo.
    echo Error starting app. Press any key to exit...
    pause
    exit /b 1
)
