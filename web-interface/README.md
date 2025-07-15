# Deep Accessibility Tool - Web Interface

A modern web interface for the Deep Accessibility Tool Chrome extension. This interface provides an intuitive way to apply accessibility effects to any website by clicking on visual icons.

## 🌟 Features

- **Intuitive Icon-Based Interface**: Click on visual icons to apply accessibility effects
- **Real-time Preview**: See how effects look before applying them
- **Multiple Accessibility Options**:
  - Text size increase/decrease
  - Grayscale filter
  - High contrast mode
  - Negative contrast
  - Light/Dark theme
  - Link underlines
  - Readable fonts
- **Live Demo**: Interactive demo page to test effects
- **Extension Integration**: Seamlessly works with the Chrome extension

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Chrome browser with Deep Accessibility Tool extension installed

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd "d:\Git Folder\WEB-Accessibility-Management"
   ```

2. **Run the setup script**:
   ```bash
   start-web-interface.bat
   ```

   Or manually:
   ```bash
   cd web-interface
   npm install
   npm start
   ```

3. **Open your browser** and go to:
   ```
   http://localhost:3000
   ```

## 🎯 How to Use

### Method 1: Direct Web Interface
1. Start the web interface server
2. Open `http://localhost:3000` in your browser
3. Click on any accessibility icon to apply effects
4. Use the URL input to target specific websites
5. See real-time preview in the demo section

### Method 2: With Chrome Extension
1. Install the Deep Accessibility Tool Chrome extension
2. Start the web interface server
3. Navigate to any website
4. Use the web interface to apply effects
5. Effects will be applied to the current tab

## 🔧 Features Overview

### Text Size Control
- **Increase Text**: Makes text larger (up to +50%)
- **Decrease Text**: Makes text smaller (down to -25%)

### Visual Effects
- **Grayscale**: Converts page to black and white
- **High Contrast**: Black background with white text
- **Negative Contrast**: Inverts all colors

### Theme Options
- **Light Background**: Forces white background
- **Dark Mode**: Applies dark theme to all elements

### Typography
- **Links Underline**: Adds underlines to all links
- **Readable Font**: Applies accessible font family

### Reset
- **Reset All**: Removes all applied effects

## 🎨 Customization

### Adding New Effects
1. Add icon to `index.html` in the appropriate section
2. Update `script.js` to handle the new effect
3. Add CSS styles in `style.css`
4. Update the extension's `content.js` to support the new effect

### Changing Appearance
- Modify `style.css` for visual changes
- Update `demo.html` for preview content
- Customize icons using Font Awesome classes

## 🔌 API Endpoints

The web interface provides these API endpoints:

- `GET /` - Main interface
- `GET /demo` - Demo page
- `POST /api/accessibility` - Apply accessibility effects
- `GET /api/settings` - Get current settings

## 🛠️ Development

### File Structure
```
web-interface/
├── index.html          # Main interface
├── style.css           # Styling
├── script.js           # JavaScript functionality
├── demo.html           # Demo page
├── server.js           # Express server
├── package.json        # Dependencies
└── README.md           # This file
```

### Running in Development Mode
```bash
cd web-interface
npm install
npm run dev  # Uses nodemon for auto-restart
```

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🔧 Troubleshooting

### Common Issues

1. **Server won't start**
   - Check if Node.js is installed: `node --version`
   - Install dependencies: `npm install`

2. **Extension not communicating**
   - Ensure Chrome extension is installed
   - Check browser console for errors
   - Verify extension permissions

3. **Effects not applying**
   - Check if target website allows scripts
   - Try refreshing the page
   - Check browser console for errors

### Port Configuration
Default port is 3000. To change:
```bash
PORT=8080 npm start
```

## 📱 Mobile Support

The interface is responsive and works on mobile devices, though the extension integration requires desktop Chrome.

## 🤝 Integration with Chrome Extension

The web interface communicates with the Chrome extension through:
- `chrome.runtime.sendMessage()` for extension communication
- `window.postMessage()` for cross-frame communication
- Local storage for persistence

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Font Awesome for icons
- Express.js for server framework
- Chrome Extensions API for integration

---

**Need help?** Check the browser console for error messages or create an issue in the repository.
