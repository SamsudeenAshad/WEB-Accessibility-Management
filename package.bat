@echo off
REM Package script for Deep Accessibility Tool Extension (Windows)
REM Creates a clean ZIP file ready for Chrome Web Store submission

echo 🚀 Packaging Deep Accessibility Tool Extension...

REM Create package directory
if not exist package mkdir package
cd package

REM Copy required files
echo 📁 Copying extension files...
copy ..\manifest.json .
copy ..\popup.html .
copy ..\popup.css .
copy ..\popup.js .
copy ..\content.js .
copy ..\background.js .
copy ..\accessibility.css .
copy ..\LICENSE .

REM Copy icons directory (if it exists)
if exist "..\icons" (
    xcopy "..\icons" "icons\" /E /I
    echo ✅ Icons copied
) else (
    echo ⚠️  Warning: Icons directory not found. Please create icon files before publishing.
    mkdir icons
    echo # Icon files needed: > icons\README.txt
    echo # - icon16.png (16x16) >> icons\README.txt
    echo # - icon48.png (48x48) >> icons\README.txt
    echo # - icon128.png (128x128) >> icons\README.txt
)

REM Create ZIP file using PowerShell
echo 📦 Creating ZIP package...
powershell -command "Compress-Archive -Path '.\*' -DestinationPath '..\deep-accessibility-tool-v1.0.0.zip' -Force"

REM Clean up
cd ..
rmdir /s /q package

echo ✅ Package created: deep-accessibility-tool-v1.0.0.zip
echo.
echo 🎯 Next steps:
echo 1. Create icon files (16x16, 48x48, 128x128 PNG)
echo 2. Test the extension by loading the ZIP file
echo 3. Submit to Chrome Web Store
echo.
echo 📋 Store submission requirements:
echo - Chrome Web Store Developer account ($5)
echo - Privacy policy URL
echo - Screenshots (5 recommended)
echo - Promotional images
echo.
echo 🌟 Extension is ready for publication!

pause
