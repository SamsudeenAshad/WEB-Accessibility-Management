#!/bin/bash

# Package script for Deep Accessibility Tool Extension
# Creates a clean ZIP file ready for Chrome Web Store submission

echo "🚀 Packaging Deep Accessibility Tool Extension..."

# Create package directory
mkdir -p package
cd package

# Copy required files
echo "📁 Copying extension files..."
cp ../manifest.json .
cp ../popup.html .
cp ../popup.css .
cp ../popup.js .
cp ../content.js .
cp ../background.js .
cp ../accessibility.css .
cp ../LICENSE .

# Copy icons directory (if it exists)
if [ -d "../icons" ]; then
    cp -r ../icons .
    echo "✅ Icons copied"
else
    echo "⚠️  Warning: Icons directory not found. Please create icon files before publishing."
    mkdir icons
    echo "# Icon files needed:" > icons/README.txt
    echo "# - icon16.png (16x16)" >> icons/README.txt
    echo "# - icon48.png (48x48)" >> icons/README.txt
    echo "# - icon128.png (128x128)" >> icons/README.txt
fi

# Create ZIP file
echo "📦 Creating ZIP package..."
zip -r "deep-accessibility-tool-v1.0.0.zip" ./*

# Move ZIP to parent directory
mv "deep-accessibility-tool-v1.0.0.zip" ../

# Clean up
cd ..
rm -rf package

echo "✅ Package created: deep-accessibility-tool-v1.0.0.zip"
echo "📊 Package contents:"
unzip -l "deep-accessibility-tool-v1.0.0.zip"

echo ""
echo "🎯 Next steps:"
echo "1. Create icon files (16x16, 48x48, 128x128 PNG)"
echo "2. Test the extension by loading the ZIP file"
echo "3. Submit to Chrome Web Store"
echo ""
echo "📋 Store submission requirements:"
echo "- Chrome Web Store Developer account ($5)"
echo "- Privacy policy URL"
echo "- Screenshots (5 recommended)"
echo "- Promotional images"
echo ""
echo "🌟 Extension is ready for publication!"
