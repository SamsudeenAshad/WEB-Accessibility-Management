const express = require('express');
const path = require('path');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/demo', (req, res) => {
    res.sendFile(path.join(__dirname, 'demo.html'));
});

// CORS proxy endpoint for loading external websites
app.use('/proxy', createProxyMiddleware({
    target: 'https://example.com',
    changeOrigin: true,
    router: (req) => {
        // Extract the target URL from the request
        const targetUrl = req.headers['x-target-url'];
        if (targetUrl) {
            return targetUrl;
        }
        return 'https://example.com';
    },
    pathRewrite: {
        '^/proxy': '',
    },
    onProxyReq: (proxyReq, req, res) => {
        // Log the proxy request
        console.log('Proxying request to:', req.headers['x-target-url']);
    },
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).json({ error: 'Proxy error: ' + err.message });
    }
}));

// API endpoint to get website content with CORS bypass
app.get('/api/fetch-website', async (req, res) => {
    const { url } = req.query;
    
    if (!url) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const html = await response.text();
        
        // Inject base tag to resolve relative URLs
        const baseTag = `<base href="${url}">`;
        const modifiedHtml = html.replace('<head>', `<head>${baseTag}`);
        
        res.setHeader('Content-Type', 'text/html');
        res.send(modifiedHtml);
    } catch (error) {
        console.error('Error fetching website:', error);
        res.status(500).json({ error: 'Failed to fetch website: ' + error.message });
    }
});

// API endpoint to log accessibility actions
app.post('/api/accessibility', (req, res) => {
    const { action, data } = req.body;
    
    // Log the accessibility action
    console.log('Accessibility action:', action, data);
    
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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🌐 Deep Accessibility Tool Web Interface running on http://localhost:${PORT}`);
    console.log(`📱 Demo page available at http://localhost:${PORT}/demo`);
    console.log(`🎯 Load any website and apply accessibility effects directly`);
    console.log(`🔧 Use /api/fetch-website?url=<website-url> to bypass CORS`);
});

module.exports = app;
