const express = require('express');
const path = require('path');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fetch = require('node-fetch');
const fs = require('fs');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Demo page with accessibility widget pre-injected
app.get('/demo', (req, res) => {
    const demoPath = path.join(__dirname, 'demo.html');
    let html = fs.readFileSync(demoPath, 'utf8');
    
    // Inject accessibility widget
    const widgetScript = `
        <script>
            (function() {
                const script = document.createElement('script');
                script.src = '${req.protocol}://${req.get('host')}/accessibility-widget.js';
                script.onload = function() {
                    console.log('♿ Accessibility widget loaded successfully on demo page!');
                };
                document.head.appendChild(script);
            })();
        </script>
    `;
    
    html = html.replace('</head>', widgetScript + '</head>');
    
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
});

// Serve the accessibility widget script
app.get('/accessibility-widget.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'accessibility-widget.js'));
});

// API endpoint to inject accessibility tool
app.post('/api/inject-accessibility', async (req, res) => {
    try {
        const { targetUrl } = req.body;
        
        if (!targetUrl) {
            return res.status(400).json({ error: 'Target URL is required' });
        }
        
        // Validate URL format
        try {
            new URL(targetUrl);
        } catch (e) {
            return res.status(400).json({ error: 'Invalid URL format' });
        }
        
        // Store the injection request (in a real app, you'd use a database)
        console.log(`📝 Injection request for: ${targetUrl}`);
        console.log(`🔗 Widget will be available at: ${req.protocol}://${req.get('host')}/accessibility-widget.js`);
        
        // Return success response with injection instructions
        res.json({
            success: true,
            message: 'Accessibility tool injection initiated',
            targetUrl,
            widgetUrl: `${req.protocol}://${req.get('host')}/accessibility-widget.js`,
            instructions: [
                'Copy the widget URL above',
                'Add it as a script tag to your target website',
                'The accessibility icon will appear in the top-right corner'
            ]
        });
        
    } catch (error) {
        console.error('Error injecting accessibility tool:', error);
        res.status(500).json({ error: 'Failed to inject accessibility tool' });
    }
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

        let html = await response.text();
        
        // Inject base tag to resolve relative URLs
        const baseTag = `<base href="${url}">`;
        html = html.replace('<head>', `<head>${baseTag}`);
        
        // Inject accessibility widget
        const widgetScript = `
            <script>
                (function() {
                    const script = document.createElement('script');
                    script.src = '${req.protocol}://${req.get('host')}/accessibility-widget.js';
                    script.onload = function() {
                        console.log('♿ Accessibility widget loaded successfully!');
                    };
                    document.head.appendChild(script);
                })();
            </script>
        `;
        
        html = html.replace('</head>', widgetScript + '</head>');
        
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
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
    console.log(`\n🚀 Web Accessibility Management Tool started successfully!\n`);
    console.log(`📱 Control Panel: http://localhost:${PORT}`);
    console.log(`� Widget Script: http://localhost:${PORT}/accessibility-widget.js`);
    console.log(`🛠️  API Endpoint: http://localhost:${PORT}/api/fetch-website?url=<target-url>`);
});

module.exports = app;
