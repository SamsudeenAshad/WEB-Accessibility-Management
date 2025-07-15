class AccessibilityWebInterface {
    constructor() {
        this.activeFeatures = new Set();
        this.textSizeLevel = 0;
        this.maxTextSize = 10;
        this.minTextSize = -5;
        this.extensionId = 'your-extension-id-here'; // Replace with actual extension ID
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateStatus('Ready to apply accessibility effects');
        this.checkExtensionAvailability();
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

        // Apply to URL button
        document.getElementById('applyToUrl').addEventListener('click', () => {
            this.applyToUrl();
        });

        // Modal controls
        document.querySelector('.close').addEventListener('click', () => {
            document.getElementById('extensionModal').style.display = 'none';
        });

        document.getElementById('installExtension').addEventListener('click', () => {
            this.showExtensionInstallInfo();
        });

        // Keyboard support
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
                }
            }
        });
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
        this.applyToPreview();
        this.sendToExtension('toggleFeature', { feature, isActive: !isActive });
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
                    this.applyToPreview();
                    this.sendToExtension('executeAction', { action: 'increaseText' });
                }
                break;
            case 'decreaseText':
                if (this.textSizeLevel > this.minTextSize) {
                    this.textSizeLevel--;
                    this.updateStatus(`Text size decreased: ${this.getTextSizeDescription()}`);
                    this.applyToPreview();
                    this.sendToExtension('executeAction', { action: 'decreaseText' });
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
        this.applyToPreview();
        this.sendToExtension('executeAction', { action: 'reset' });
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

    updateStatus(message, type = 'success') {
        const statusText = document.getElementById('statusText');
        const statusIcon = document.getElementById('statusIcon');
        
        statusText.textContent = message;
        
        // Update icon color based on type
        statusIcon.style.color = type === 'error' ? '#ef4444' : '#10b981';
        
        // Reset status after 3 seconds
        setTimeout(() => {
            statusText.textContent = 'Ready to apply accessibility effects';
            statusIcon.style.color = '#10b981';
        }, 3000);
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

    applyToPreview() {
        const iframe = document.getElementById('previewFrame');
        if (iframe && iframe.contentDocument) {
            this.applyEffectsToDocument(iframe.contentDocument);
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
            `;
        }

        if (this.activeFeatures.has('negativeContrast')) {
            css += `
                html { filter: invert(1) hue-rotate(180deg) !important; }
                img, video { filter: invert(1) hue-rotate(180deg) !important; }
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
                }
                body { background-color: #1a1a1a !important; }
                a, a:visited { color: #64b5f6 !important; }
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
                    font-family: "Arial", "Helvetica", sans-serif !important;
                    letter-spacing: 0.5px !important;
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

    applyToUrl() {
        const url = document.getElementById('targetUrl').value;
        if (!url) {
            this.updateStatus('Please enter a valid URL', 'error');
            return;
        }

        // For now, just update the preview iframe
        const iframe = document.getElementById('previewFrame');
        iframe.src = url;
        
        iframe.onload = () => {
            setTimeout(() => {
                this.applyToPreview();
            }, 1000);
        };

        this.updateStatus(`Applying effects to ${url}`);
    }

    sendToExtension(action, data) {
        // Try to communicate with the extension
        if (typeof chrome !== 'undefined' && chrome.runtime) {
            chrome.runtime.sendMessage(this.extensionId, {
                action: action,
                data: data
            }, (response) => {
                if (chrome.runtime.lastError) {
                    console.log('Extension communication failed:', chrome.runtime.lastError.message);
                }
            });
        }
    }

    checkExtensionAvailability() {
        // Check if extension is available
        if (typeof chrome === 'undefined' || !chrome.runtime) {
            // Show modal for extension installation
            setTimeout(() => {
                document.getElementById('extensionModal').style.display = 'block';
            }, 2000);
        }
    }

    showExtensionInstallInfo() {
        const modal = document.getElementById('extensionModal');
        modal.style.display = 'none';
        
        // Create a new window or tab for extension installation
        const installUrl = 'chrome://extensions/';
        window.open(installUrl, '_blank');
    }
}

// Initialize the web interface when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AccessibilityWebInterface();
});

// Preview frame setup
document.addEventListener('DOMContentLoaded', () => {
    const iframe = document.getElementById('previewFrame');
    
    iframe.onload = () => {
        // Apply current settings to the preview
        setTimeout(() => {
            if (window.accessibilityInterface) {
                window.accessibilityInterface.applyToPreview();
            }
        }, 500);
    };
});

// Make instance globally available
window.accessibilityInterface = null;
document.addEventListener('DOMContentLoaded', () => {
    window.accessibilityInterface = new AccessibilityWebInterface();
});
