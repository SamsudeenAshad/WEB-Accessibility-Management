# Web Accessibility Management Tool

A comprehensive web accessibility injection tool that can add accessibility features to any website in real-time. This tool provides an intuitive interface to inject and manage accessibility widgets that enhance web content for users with disabilities.

## 🌟 Features

- **Intuitive Icon-Based Interface**: Click on visual icons to apply accessibility effects
- **Real-time Preview**: See how effects look before applying them
- **Multiple Accessibility Options**:
  - Text size increase/decrease with 7 levels
  - Grayscale filter
  - High contrast mode
  - Negative contrast (color inversion)
  - Light/Dark theme
  - Link underlines
  - Readable fonts
  - Enhanced focus indicators with keyboard navigation
  - Reduce motion for motion-sensitive users
- **Website Injection System**: Inject accessibility widgets into any website
- **Real-time Accessibility Enhancement**: Apply effects immediately without page reload
- **WCAG 2.1 Compliance**: Features designed to meet accessibility standards

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd "d:\Git Folder\WEB-Accessibility-Management"
   ```

2. **Run the setup script**:
   ```bash
   npm install
   npm start
   ```

   Or with development mode:
   ```bash
   npm run dev  # Uses nodemon for auto-restart
   ```

3. **Open your browser** and go to:
   ```
   http://localhost:3000
   ```

## 🎯 How to Use

### Method 1: Direct Injection
1. Start the web interface server
2. Open `http://localhost:3000` in your browser
3. Enter any website URL in the input field
4. Click "Inject Accessibility Tool" to add the widget to that website
5. Use the accessibility widget on the target website

### Method 2: Demo Page Testing
1. Start the web interface server
2. Open `http://localhost:3000/demo` in your browser
3. Test all accessibility features on the demo page
4. The accessibility widget is pre-loaded for immediate testing

## 🔧 Features Overview

### Text Size Control
- **Increase Text**: Makes text larger with 7 levels (102% to 114%)
- **Decrease Text**: Reset text to normal size (100%)

### Visual Effects
- **Grayscale**: Converts page to black and white
- **High Contrast**: Black background with white text
- **Negative Contrast**: Inverts all colors on the page

### Theme Options
- **Light Background**: Forces white background with black text
- **Dark Mode**: Applies proper dark theme with dark backgrounds and light text

### Typography
- **Links Underline**: Adds underlines to all links
- **Readable Font**: Applies accessible font family

### Navigation & Motion
- **Focus Indicators**: Enhanced focus outlines with high contrast colors, scaling effects, and keyboard navigation support
- **Reduce Motion**: Disables animations, transitions, and autoplay for motion-sensitive users

### Reset
- **Reset All**: Removes all applied effects

## 🎨 Customization

### Adding New Effects
1. Add the new feature to the accessibility widget menu in `accessibility-widget.js`
2. Add the corresponding CSS styles for the new effect
3. Update the feature handling in the widget's JavaScript code
4. Test the new feature on the demo page

### Changing Appearance
- Modify CSS styles within `accessibility-widget.js` for visual changes
- Update `demo.html` for preview content
- Customize the widget interface and styling

## 🔌 API Endpoints

The web interface provides these API endpoints:

- `GET /` - Main control panel interface
- `GET /demo` - Demo page with pre-injected accessibility widget
- `GET /accessibility-widget.js` - Accessibility widget script
- `POST /api/inject-accessibility` - Inject accessibility tool into target website
- `GET /api/fetch-website` - Fetch and proxy external websites
- `POST /api/accessibility` - Apply accessibility effects
- `GET /api/settings` - Get current accessibility settings

## 🛠️ Development

### File Structure
```
├── accessibility-widget.js  # Main accessibility widget (injected script)
├── index.html              # Control panel interface
├── demo.html               # Demo page for testing
├── server.js               # Express server with API endpoints
├── package.json            # Dependencies and scripts
├── package-lock.json       # Locked dependency versions
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

### Running in Development Mode
```bash
npm install
npm run dev  # Uses nodemon for auto-restart
```

### Dependencies
- **express**: Web server framework
- **cors**: Cross-origin resource sharing
- **http-proxy-middleware**: Proxy middleware for API requests
- **node-fetch**: HTTP client for server-side requests
- **nodemon**: Development dependency for auto-restart

## ♿ Browser Support

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
   - Ensure target website allows script injection
   - Check browser console for CORS errors
   - Try using the demo page for testing

3. **Widget not appearing**
   - Check if JavaScript is enabled in browser
   - Verify the injection was successful
   - Check browser console for errors

### Port Configuration
Default port is 3000. To change:
```bash
PORT=8080 npm start
```

## 📱 Mobile Support

The interface is responsive and works on mobile devices. The accessibility widget can be injected into any website and works across all modern browsers.

## 🤝 How It Works

The accessibility tool operates through:
- **Widget Injection**: JavaScript widget injected into target websites
- **Real-time Processing**: Immediate application of accessibility features
- **Local Storage**: Settings persistence across page loads
- **Cross-Domain Support**: Works on any website through proxy functionality

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Modern CSS accessibility standards
- Express.js for server framework
- WCAG 2.1 accessibility guidelines
- Web accessibility best practices

---

**Need help?** Check the browser console for error messages or create an issue in the repository.
