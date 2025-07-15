// Content script - Main accessibility functionality
class AccessibilityTool {
    constructor() {
        this.textSizeLevel = 0;
        this.maxTextSize = 10;
        this.minTextSize = -5;
        this.features = {
            grayscale: false,
            highContrast: false,
            negativeContrast: false,
            lightBackground: false,
            darkMode: false,
            linksUnderline: false,
            readableFont: false
        };
        this.isInitialized = false;
        this.init();
    }

    init() {
        try {
            this.createStyleElement();
            this.loadSavedSettings();
            this.addKeyboardSupport();
            this.isInitialized = true;
            console.log('Deep Accessibility Tool v1.1.0 initialized successfully');
        } catch (error) {
            console.error('Failed to initialize accessibility tool:', error);
        }
    }

    createStyleElement() {
        // Remove existing style element if present
        const existing = document.getElementById('accessibility-styles');
        if (existing) {
            existing.remove();
        }
        
        this.styleElement = document.createElement('style');
        this.styleElement.id = 'accessibility-styles';
        this.styleElement.setAttribute('data-extension', 'deep-accessibility-tool');
        document.head.appendChild(this.styleElement);
    }

    addKeyboardSupport() {
        // Add keyboard shortcuts for power users
        document.addEventListener('keydown', (e) => {
            // Ctrl+Alt+R to reset all
            if (e.ctrlKey && e.altKey && e.key === 'r') {
                e.preventDefault();
                this.resetAll();
                this.showNotification('All accessibility settings reset');
            }
            // Ctrl+Alt+H for high contrast
            if (e.ctrlKey && e.altKey && e.key === 'h') {
                e.preventDefault();
                this.toggleFeature('highContrast');
            }
            // Ctrl+Alt+D for dark mode
            if (e.ctrlKey && e.altKey && e.key === 'd') {
                e.preventDefault();
                this.toggleFeature('darkMode');
                this.showNotification(`Dark mode ${this.features.darkMode ? 'enabled' : 'disabled'}`);
            }
            // Ctrl+Alt+Plus for increase text size
            if (e.ctrlKey && e.altKey && (e.key === '+' || e.key === '=')) {
                e.preventDefault();
                this.increaseTextSize();
            }
            // Ctrl+Alt+Minus for decrease text size
            if (e.ctrlKey && e.altKey && e.key === '-') {
                e.preventDefault();
                this.decreaseTextSize();
            }
        });
    }

    showNotification(message) {
        // Create a brief notification for user feedback
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4f46e5;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 999999;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }

    executeAction(action) {
        switch (action) {
            case 'increaseText':
                this.increaseTextSize();
                break;
            case 'decreaseText':
                this.decreaseTextSize();
                break;
            default:
                console.log('Unknown action:', action);
        }
    }

    increaseTextSize() {
        if (this.textSizeLevel < this.maxTextSize) {
            this.textSizeLevel++;
            this.updateTextSize();
            this.handleOverlappingIssues();
            this.saveSettings();
            this.showNotification(`Text size: ${this.getTextSizeDescription()}`);
        }
    }

    decreaseTextSize() {
        if (this.textSizeLevel > this.minTextSize) {
            this.textSizeLevel--;
            this.updateTextSize();
            this.handleOverlappingIssues();
            this.saveSettings();
            this.showNotification(`Text size: ${this.getTextSizeDescription()}`);
        }
    }

    getTextSizeDescription() {
        if (this.textSizeLevel === 0) return 'Normal';
        if (this.textSizeLevel > 0) return `+${this.textSizeLevel * 5}%`;
        return `${this.textSizeLevel * 5}%`;
    }

    updateTextSize() {
        const scale = 1 + (this.textSizeLevel * 0.05); // 5% increments
        
        // Add class to body for CSS targeting
        if (this.textSizeLevel !== 0) {
            document.body.classList.add('accessibility-text-size-applied');
        } else {
            document.body.classList.remove('accessibility-text-size-applied');
        }
        
        const css = `
            * {
                font-size: ${scale}em !important;
                line-height: ${Math.max(1.4, scale * 1.3)} !important;
            }
            
            /* Improved spacing for text elements */
            p, div, span, li, td, th {
                line-height: ${Math.max(1.5, scale * 1.4)} !important;
                margin-bottom: ${scale * 0.5}em !important;
            }
            
            /* Headings with proper spacing */
            h1, h2, h3, h4, h5, h6 {
                line-height: ${Math.max(1.3, scale * 1.2)} !important;
                margin-top: ${scale * 0.8}em !important;
                margin-bottom: ${scale * 0.5}em !important;
            }
            
            /* Lists with better spacing */
            ul, ol {
                margin-bottom: ${scale * 0.8}em !important;
                padding-left: ${scale * 1.5}em !important;
            }
            
            li {
                margin-bottom: ${scale * 0.3}em !important;
                line-height: ${Math.max(1.4, scale * 1.3)} !important;
            }
            
            /* Table elements */
            table {
                border-spacing: ${scale * 0.1}em !important;
            }
            
            td, th {
                padding: ${scale * 0.5}em !important;
                line-height: ${Math.max(1.3, scale * 1.2)} !important;
            }
            
            /* Form elements */
            input, textarea, select {
                font-size: ${scale * 0.9}em !important;
                line-height: ${Math.max(1.3, scale * 1.2)} !important;
                padding: ${scale * 0.4}em !important;
            }
            
            /* Button elements */
            button {
                font-size: ${scale}em !important;
                line-height: ${Math.max(1.2, scale * 1.1)} !important;
                padding: ${scale * 0.5}em ${scale * 0.8}em !important;
            }
            
            /* Prevent text from overlapping in containers */
            article, section, div {
                margin-bottom: ${scale * 0.3}em !important;
            }
            
            /* Improve readability for inline elements */
            a, strong, em, code {
                line-height: inherit !important;
            }
            
            /* Code blocks */
            pre, code {
                line-height: ${Math.max(1.4, scale * 1.3)} !important;
                padding: ${scale * 0.2}em !important;
            }
            
            /* Blockquotes */
            blockquote {
                margin: ${scale * 0.8}em 0 !important;
                padding: ${scale * 0.5}em !important;
                line-height: ${Math.max(1.5, scale * 1.4)} !important;
            }
        `;
        this.updateStyles('textSize', css);
    }

    toggleFeature(feature) {
        // Handle theme conflicts - only one theme can be active at a time
        if (feature === 'darkMode' && this.features.lightBackground) {
            this.features.lightBackground = false;
        }
        if (feature === 'lightBackground' && this.features.darkMode) {
            this.features.darkMode = false;
        }
        
        this.features[feature] = !this.features[feature];
        this.updateFeatureStyles();
        this.saveSettings();
        return this.features[feature];
    }

    updateFeatureStyles() {
        let css = '';

        // Grayscale
        if (this.features.grayscale) {
            css += `
                html {
                    filter: grayscale(100%) !important;
                }
            `;
        }

        // High Contrast
        if (this.features.highContrast) {
            css += `
                * {
                    background-color: black !important;
                    color: white !important;
                    border-color: white !important;
                }
                a, a:visited {
                    color: yellow !important;
                }
                img {
                    filter: contrast(200%) !important;
                }
            `;
        }

        // Negative Contrast
        if (this.features.negativeContrast) {
            css += `
                html {
                    filter: invert(1) hue-rotate(180deg) !important;
                }
                img, video, iframe, svg {
                    filter: invert(1) hue-rotate(180deg) !important;
                }
            `;
        }

        // Light Background
        if (this.features.lightBackground) {
            css += `
                * {
                    background-color: #ffffff !important;
                    color: #000000 !important;
                }
                a, a:visited {
                    color: #0066cc !important;
                }
            `;
        }

        // Dark Mode
        if (this.features.darkMode) {
            css += `
                * {
                    background-color: #1a1a1a !important;
                    color: #e0e0e0 !important;
                    border-color: #404040 !important;
                }
                body {
                    background-color: #1a1a1a !important;
                }
                div, section, article, main, header, footer, nav {
                    background-color: #2d2d2d !important;
                }
                input, textarea, select, button {
                    background-color: #404040 !important;
                    color: #e0e0e0 !important;
                    border-color: #606060 !important;
                }
                a, a:visited {
                    color: #64b5f6 !important;
                }
                a:hover {
                    color: #90caf9 !important;
                }
                h1, h2, h3, h4, h5, h6 {
                    color: #ffffff !important;
                }
                code, pre {
                    background-color: #333333 !important;
                    color: #f0f0f0 !important;
                }
                table {
                    background-color: #2d2d2d !important;
                }
                th, td {
                    border-color: #505050 !important;
                    background-color: #353535 !important;
                }
                img {
                    opacity: 0.9;
                    filter: brightness(0.9);
                }
            `;
        }

        // Links Underline
        if (this.features.linksUnderline) {
            css += `
                a {
                    text-decoration: underline !important;
                    text-decoration-thickness: 2px !important;
                }
            `;
        }

        // Readable Font
        if (this.features.readableFont) {
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

        this.updateStyles('features', css);
    }

    updateStyles(type, css) {
        // Remove existing styles of this type
        const existingStyle = document.getElementById(`accessibility-${type}`);
        if (existingStyle) {
            existingStyle.remove();
        }

        // Add new styles
        if (css) {
            const styleElement = document.createElement('style');
            styleElement.id = `accessibility-${type}`;
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        }
    }

    resetAll() {
        this.textSizeLevel = 0;
        this.features = {
            grayscale: false,
            highContrast: false,
            negativeContrast: false,
            lightBackground: false,
            darkMode: false,
            linksUnderline: false,
            readableFont: false
        };

        // Remove all accessibility styles
        const styles = document.querySelectorAll('[id^="accessibility-"]');
        styles.forEach(style => style.remove());

        // Clear saved settings
        this.clearSavedSettings();
    }

    saveSettings() {
        const settings = {
            textSizeLevel: this.textSizeLevel,
            features: this.features
        };
        chrome.storage.local.set({ accessibilitySettings: settings });
    }

    loadSavedSettings() {
        chrome.storage.local.get(['accessibilitySettings'], (result) => {
            if (result.accessibilitySettings) {
                const settings = result.accessibilitySettings;
                this.textSizeLevel = settings.textSizeLevel || 0;
                this.features = { ...this.features, ...settings.features };
                
                // Apply loaded settings
                if (this.textSizeLevel !== 0) {
                    this.updateTextSize();
                    this.handleOverlappingIssues();
                }
                this.updateFeatureStyles();
            }
        });
    }

    clearSavedSettings() {
        chrome.storage.local.remove(['accessibilitySettings']);
    }

    // Add method to handle specific overlapping issues
    handleOverlappingIssues() {
        // Fix common overlapping scenarios
        const problematicElements = document.querySelectorAll('nav, header, footer, .menu, .sidebar');
        problematicElements.forEach(element => {
            if (element.style.position === 'fixed' || element.style.position === 'absolute') {
                element.style.zIndex = Math.max(parseInt(element.style.zIndex) || 0, 1000);
            }
        });
        
        // Ensure proper spacing for floating elements
        const floatingElements = document.querySelectorAll('[style*="float"]');
        floatingElements.forEach(element => {
            element.style.marginBottom = '0.5em';
        });
    }
}

// Initialize the accessibility tool
window.accessibilityTool = new AccessibilityTool();

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getStatus') {
        sendResponse({
            textSizeLevel: window.accessibilityTool.textSizeLevel,
            features: window.accessibilityTool.features
        });
    }
});
