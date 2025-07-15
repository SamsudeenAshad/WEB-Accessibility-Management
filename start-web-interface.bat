@echo off
echo.
echo ================================================
echo  Deep Accessibility Tool - Web Interface
echo ================================================
echo.

cd /d "%~dp0web-interface"

echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Checking if npm packages are installed...
if not exist "node_modules" (
    echo Installing npm packages...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install npm packages
        pause
        exit /b 1
    )
)

echo.
echo Starting web interface server...
echo.
echo The web interface will be available at:
echo   http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

npm start
