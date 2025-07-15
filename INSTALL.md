# Quick Installation Guide

## 🚀 For Users (Chrome Web Store)
*Coming Soon - Extension under review*

1. Visit Chrome Web Store
2. Search "Deep Accessibility Tool"
3. Click "Add to Chrome"
4. Click the extension icon to start using

## 🛠️ For Developers (Load Unpacked)

### Prerequisites
- Google Chrome or Microsoft Edge
- Basic file management skills

### Installation Steps

1. **Download the Extension**
   - Clone or download this repository
   - Extract to a folder on your computer

2. **Open Extensions Page**
   - Chrome: Go to `chrome://extensions/`
   - Edge: Go to `edge://extensions/`

3. **Enable Developer Mode**
   - Toggle "Developer mode" switch (top right)

4. **Load the Extension**
   - Click "Load unpacked"
   - Select the extension folder
   - Extension appears in toolbar

5. **Create Icons** (Required)
   - Create 3 PNG icon files in `icons/` folder:
     - `icon16.png` (16x16 pixels)
     - `icon48.png` (48x48 pixels)  
     - `icon128.png` (128x128 pixels)
   - Use any design tool or online icon generator

### Quick Icon Creation
```bash
# Use any of these methods:
# 1. Online: favicon.io, iconifier.net
# 2. Design tools: Canva, Figma, GIMP
# 3. AI tools: Generate accessibility icon
# 4. Emoji conversion: Convert ♿ or 🌐 to PNG
```

## 🎯 First Use

1. **Click Extension Icon** - Blue accessibility icon in toolbar
2. **Try Text Size** - Click "Increase Text" on any webpage
3. **Test Contrast** - Try "High Contrast" mode
4. **Try Dark Mode** - Click "Dark Mode" for comfortable night viewing
5. **Explore Features** - Each button toggles on/off
6. **Reset When Done** - Use "Reset All" to return to normal

### 🎨 **New Dark Mode Feature!**
- Perfect for night browsing and reduced eye strain
- Automatically converts any website to dark theme
- Smart conflict resolution (disables light mode when enabled)
- Keyboard shortcut: `Ctrl+Alt+D`

### ⌨️ **Keyboard Shortcuts**
- `Ctrl+Alt+R` - Reset all settings
- `Ctrl+Alt+H` - Toggle high contrast
- `Ctrl+Alt+D` - Toggle dark mode
- `Ctrl+Alt++` - Increase text size
- `Ctrl+Alt+-` - Decrease text size

### 🔧 **Improved Text Size Control**
- **Smaller increments**: 5% per click (instead of 10%)
- **More levels**: 20 total levels of adjustment
- **Visual feedback**: Shows current percentage
- **Keyboard control**: Use `Ctrl+Alt++` and `Ctrl+Alt+-`

## 🔧 Troubleshooting

### Extension Not Loading?
- Ensure all files are in the same folder
- Check for icon files in `icons/` folder
- Reload the extension in `chrome://extensions/`

### Features Not Working?
- Refresh the webpage after enabling extension
- Some sites may have Content Security Policy restrictions
- Try on different websites (Wikipedia, GitHub work well)

### Settings Not Saving?
- Check if browser allows extension storage
- Clear browser cache if issues persist
- Reinstall extension if problems continue

## 📱 Mobile Support
Currently desktop-only. Mobile browser extensions have limited support.

## 🆘 Need Help?
- Check [GitHub Issues](https://github.com/SamsudeenAshad/Deep_Accesible_tool/issues)
- Read full documentation in README.md
- Contact support (details in manifest.json)
