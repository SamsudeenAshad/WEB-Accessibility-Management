const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'web-interface')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'web-interface', 'index.html'));
});

app.get('/demo', (req, res) => {
    res.sendFile(path.join(__dirname, 'web-interface', 'demo.html'));
});

// API endpoint to communicate with extension
app.post('/api/accessibility', (req, res) => {
    const { action, data } = req.body;
    
    // Log the accessibility action
    console.log('Accessibility action received:', action, data);
    
    // Here you can add logic to communicate with your extension
    // For now, we'll just return a success response
    res.json({
        success: true,
        message: `Applied ${action} successfully`,
        data: data
    });
});

// API endpoint to get current settings
app.get('/api/settings', (req, res) => {
    res.json({
        textSizeLevel: 0,
        features: {
            grayscale: false,
            highContrast: false,
            negativeContrast: false,
            lightBackground: false,
            darkMode: false,
            linksUnderline: false,
            readableFont: false
        }
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🌐 Deep Accessibility Tool Web Interface running on http://localhost:${PORT}`);
    console.log(`📱 Demo page available at http://localhost:${PORT}/demo`);
    console.log(`🎯 Use this interface to control accessibility features on any website`);
});

module.exports = app;
