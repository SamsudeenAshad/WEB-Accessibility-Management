class AccessibilityWebInterface {
    constructor() {
        this.activeFeatures = new Set();
        this.textSizeLevel = 0;
        this.maxTextSize = 10;
        this.minTextSize = -5;
        this.currentUrl = 'demo.html';
        this.websiteFrame = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.websiteFrame = document.getElementById('websiteFrame');
        this.updateStatus('Ready to load website and apply accessibility effects');
        this.updateCurrentUrl(this.currentUrl);
    }

    setupEventListeners() {
        // Icon clicks for features
        document.querySelectorAll('.icon-item[data-feature]').forEach(item => {
            item.addEventListener('click', (e) => {
                const feature = e.currentTarget.dataset.feature;
                this.toggleFeature(feature, e.currentTarget);
            });
        });

        // Icon clicks for actions
        document.querySelectorAll('.icon-item[data-action]').forEach(item => {
            item.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.executeAction(action, e.currentTarget);
            });
        });

        // Load website button
        document.getElementById('loadWebsite').addEventListener('click', () => {
            this.loadWebsite();
        });

        // Website controls
        document.getElementById('refreshWebsite').addEventListener('click', () => {
            this.refreshWebsite();
        });

        document.getElementById('openInNewTab').addEventListener('click', () => {
            this.openInNewTab();
        });

        // URL input Enter key
        document.getElementById('targetUrl').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.loadWebsite();
            }
        });

        // Modal controls
        document.querySelector('.close').addEventListener('click', () => {
            document.getElementById('corsModal').style.display = 'none';
        });

        document.getElementById('closeCorsModal').addEventListener('click', () => {
            document.getElementById('corsModal').style.display = 'none';
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('corsModal');
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.altKey) {
                switch (e.key) {
                    case 'r':
                        e.preventDefault();
                        this.executeAction('reset');
                        break;
                    case 'h':
                        e.preventDefault();
                        this.toggleFeature('highContrast');
                        break;
                    case 'd':
                        e.preventDefault();
                        this.toggleFeature('darkMode');
                        break;
                    case '+':
                    case '=':
                        e.preventDefault();
                        this.executeAction('increaseText');
                        break;
                    case '-':
                        e.preventDefault();
                        this.executeAction('decreaseText');
                        break;
                    case 'l':
                        e.preventDefault();
                        this.loadWebsite();
                        break;
                }
            }
        });

        // Listen for iframe load events
        this.websiteFrame.addEventListener('load', () => {
            this.onWebsiteLoad();
        });
    }

    loadWebsite() {
        const url = document.getElementById('targetUrl').value.trim();
        if (!url) {
            this.updateStatus('Please enter a valid URL', 'error');
            return;
        }

        // Add protocol if missing
        let finalUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            finalUrl = 'https://' + url;
        }

        this.updateStatus('Loading website...', 'loading');
        this.currentUrl = finalUrl;
        this.updateCurrentUrl(finalUrl);

        // Try to load the website
        try {
            this.websiteFrame.src = finalUrl;
        } catch (error) {
            this.updateStatus('Error loading website: ' + error.message, 'error');
            this.showCorsModal();
        }
    }

    refreshWebsite() {
        if (this.websiteFrame && this.websiteFrame.src) {
            this.updateStatus('Refreshing website...', 'loading');
            this.websiteFrame.src = this.websiteFrame.src;
        }
    }

    openInNewTab() {
        if (this.currentUrl && this.currentUrl !== 'demo.html') {
            window.open(this.currentUrl, '_blank');
        }
    }

    onWebsiteLoad() {
        try {
            // Check if we can access the iframe content
            const iframeDoc = this.websiteFrame.contentDocument || this.websiteFrame.contentWindow.document;
            
            if (iframeDoc) {
                this.updateStatus('Website loaded successfully');
                // Apply current accessibility settings to the loaded website
                setTimeout(() => {
                    this.applyAllEffects();
                }, 500);
            }
        } catch (error) {
            // CORS error - website loaded but we can't access it
            this.updateStatus('Website loaded (limited access due to CORS)', 'warning');
            this.showCorsModal();
        }
    }

    toggleFeature(feature, element) {
        this.addClickAnimation(element);
        
        // Handle theme conflicts
        if (feature === 'darkMode' && this.activeFeatures.has('lightBackground')) {
            this.activeFeatures.delete('lightBackground');
            this.updateFeatureButton('lightBackground', false);
        }
        if (feature === 'lightBackground' && this.activeFeatures.has('darkMode')) {
            this.activeFeatures.delete('darkMode');
            this.updateFeatureButton('darkMode', false);
        }

        // Toggle feature
        const isActive = this.activeFeatures.has(feature);
        if (isActive) {
            this.activeFeatures.delete(feature);
        } else {
            this.activeFeatures.add(feature);
        }

        this.updateFeatureButton(feature, !isActive);
        this.updateActiveFeaturesList();
        this.updateStatus(`${feature} ${!isActive ? 'enabled' : 'disabled'}`);
        this.applyAllEffects();
    }

    executeAction(action, element) {
        if (element) {
            this.addClickAnimation(element);
        }

        switch (action) {
            case 'increaseText':
                if (this.textSizeLevel < this.maxTextSize) {
                    this.textSizeLevel++;
                    this.updateStatus(`Text size increased: ${this.getTextSizeDescription()}`);
                    this.applyAllEffects();
                }
                break;
            case 'decreaseText':
                if (this.textSizeLevel > this.minTextSize) {
                    this.textSizeLevel--;
                    this.updateStatus(`Text size decreased: ${this.getTextSizeDescription()}`);
                    this.applyAllEffects();
                }
                break;
            case 'reset':
                this.resetAll();
                break;
        }
    }

    resetAll() {
        this.textSizeLevel = 0;
        this.activeFeatures.clear();
        
        // Reset all button states
        document.querySelectorAll('.icon-item').forEach(item => {
            item.classList.remove('active');
        });

        this.updateActiveFeaturesList();
        this.updateStatus('All settings reset successfully');
        this.applyAllEffects();
    }

    applyAllEffects() {
        try {
            const iframeDoc = this.websiteFrame.contentDocument || this.websiteFrame.contentWindow.document;
            if (iframeDoc) {
                this.applyEffectsToDocument(iframeDoc);
            }
        } catch (error) {
            // Can't access iframe content due to CORS
            console.log('Cannot apply effects due to CORS restrictions');
        }
    }

    applyEffectsToDocument(doc) {
        // Remove existing accessibility styles
        const existingStyles = doc.querySelectorAll('[id^="accessibility-"]');
        existingStyles.forEach(style => style.remove());

        // Apply text size
        if (this.textSizeLevel !== 0) {
            this.applyTextSizeToDocument(doc);
        }

        // Apply features
        this.applyFeaturesToDocument(doc);
    }

    applyTextSizeToDocument(doc) {
        const scale = 1 + (this.textSizeLevel * 0.05);
        const css = `
            * {
                font-size: ${scale}em !important;
                line-height: ${Math.max(1.4, scale * 1.3)} !important;
            }
            p, div, span, li, td, th {
                line-height: ${Math.max(1.5, scale * 1.4)} !important;
                margin-bottom: ${scale * 0.5}em !important;
            }
            h1, h2, h3, h4, h5, h6 {
                line-height: ${Math.max(1.3, scale * 1.2)} !important;
                margin-top: ${scale * 0.8}em !important;
                margin-bottom: ${scale * 0.5}em !important;
            }
            input, textarea, select {
                font-size: ${scale * 0.9}em !important;
                line-height: ${Math.max(1.3, scale * 1.2)} !important;
                padding: ${scale * 0.4}em !important;
            }
            button {
                font-size: ${scale}em !important;
                line-height: ${Math.max(1.2, scale * 1.1)} !important;
                padding: ${scale * 0.5}em ${scale * 0.8}em !important;
            }
        `;
        this.addStyleToDocument(doc, 'accessibility-textSize', css);
    }

    applyFeaturesToDocument(doc) {
        let css = '';

        if (this.activeFeatures.has('grayscale')) {
            css += 'html { filter: grayscale(100%) !important; }';
        }

        if (this.activeFeatures.has('highContrast')) {
            css += `
                * {
                    background-color: black !important;
                    color: white !important;
                    border-color: white !important;
                }
                a, a:visited { color: yellow !important; }
                img { filter: contrast(200%) !important; }
            `;
        }

        if (this.activeFeatures.has('negativeContrast')) {
            css += `
                html { filter: invert(1) hue-rotate(180deg) !important; }
                img, video, iframe, svg { filter: invert(1) hue-rotate(180deg) !important; }
            `;
        }

        if (this.activeFeatures.has('lightBackground')) {
            css += `
                * {
                    background-color: #ffffff !important;
                    color: #000000 !important;
                }
                a, a:visited { color: #0066cc !important; }
            `;
        }

        if (this.activeFeatures.has('darkMode')) {
            css += `
                * {
                    background-color: #1a1a1a !important;
                    color: #e0e0e0 !important;
                    border-color: #404040 !important;
                }
                body { background-color: #1a1a1a !important; }
                div, section, article, main, header, footer, nav {
                    background-color: #2d2d2d !important;
                }
                input, textarea, select, button {
                    background-color: #404040 !important;
                    color: #e0e0e0 !important;
                    border-color: #606060 !important;
                }
                a, a:visited { color: #64b5f6 !important; }
                a:hover { color: #90caf9 !important; }
                h1, h2, h3, h4, h5, h6 { color: #ffffff !important; }
                code, pre {
                    background-color: #333333 !important;
                    color: #f0f0f0 !important;
                }
                table { background-color: #2d2d2d !important; }
                th, td {
                    border-color: #505050 !important;
                    background-color: #353535 !important;
                }
                img { opacity: 0.9; filter: brightness(0.9); }
            `;
        }

        if (this.activeFeatures.has('linksUnderline')) {
            css += `
                a {
                    text-decoration: underline !important;
                    text-decoration-thickness: 2px !important;
                }
            `;
        }

        if (this.activeFeatures.has('readableFont')) {
            css += `
                * {
                    font-family: "Arial", "Helvetica", "Open Sans", sans-serif !important;
                    font-weight: 400 !important;
                    letter-spacing: 0.5px !important;
                }
                h1, h2, h3, h4, h5, h6 {
                    font-weight: 600 !important;
                }
            `;
        }

        if (css) {
            this.addStyleToDocument(doc, 'accessibility-features', css);
        }
    }

    addStyleToDocument(doc, id, css) {
        const style = doc.createElement('style');
        style.id = id;
        style.textContent = css;
        doc.head.appendChild(style);
    }

    updateFeatureButton(feature, isActive) {
        const button = document.querySelector(`[data-feature="${feature}"]`);
        if (button) {
            button.classList.toggle('active', isActive);
        }
    }

    updateActiveFeaturesList() {
        const activeList = document.getElementById('activeFeaturesList');
        if (this.activeFeatures.size === 0) {
            activeList.textContent = 'None';
        } else {
            activeList.textContent = Array.from(this.activeFeatures).join(', ');
        }
    }

    updateCurrentUrl(url) {
        const currentUrlDisplay = document.getElementById('currentUrlDisplay');
        currentUrlDisplay.textContent = url;
    }

    updateStatus(message, type = 'success') {
        const statusText = document.getElementById('statusText');
        const statusIcon = document.getElementById('statusIcon');
        
        statusText.textContent = message;
        
        // Update icon color based on type
        switch (type) {
            case 'error':
                statusIcon.style.color = '#ef4444';
                break;
            case 'warning':
                statusIcon.style.color = '#f59e0b';
                break;
            case 'loading':
                statusIcon.style.color = '#3b82f6';
                break;
            default:
                statusIcon.style.color = '#10b981';
        }
        
        // Reset status after 3 seconds (except for loading)
        if (type !== 'loading') {
            setTimeout(() => {
                statusText.textContent = 'Ready to load website and apply accessibility effects';
                statusIcon.style.color = '#10b981';
            }, 3000);
        }
    }

    getTextSizeDescription() {
        if (this.textSizeLevel === 0) return 'Normal';
        if (this.textSizeLevel > 0) return `+${this.textSizeLevel * 5}%`;
        return `${this.textSizeLevel * 5}%`;
    }

    addClickAnimation(element) {
        element.classList.add('clicked');
        setTimeout(() => {
            element.classList.remove('clicked');
        }, 300);
    }

    showCorsModal() {
        document.getElementById('corsModal').style.display = 'block';
    }
}

// Initialize the web interface when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.accessibilityInterface = new AccessibilityWebInterface();
});
