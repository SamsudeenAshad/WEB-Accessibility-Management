// Popup functionality
class AccessibilityPopup {
    constructor() {
        this.initializeButtons();
        this.loadSavedStates();
    }

    initializeButtons() {
        // Text size controls
        document.getElementById('increaseText').addEventListener('click', () => {
            this.executeAction('increaseText');
        });

        document.getElementById('decreaseText').addEventListener('click', () => {
            this.executeAction('decreaseText');
        });

        // Visual effects
        document.getElementById('grayscale').addEventListener('click', () => {
            this.toggleFeature('grayscale');
        });

        document.getElementById('highContrast').addEventListener('click', () => {
            this.toggleFeature('highContrast');
        });

        document.getElementById('negativeContrast').addEventListener('click', () => {
            this.toggleFeature('negativeContrast');
        });

        // Theme
        document.getElementById('lightBackground').addEventListener('click', () => {
            this.toggleFeature('lightBackground');
        });

        document.getElementById('darkMode').addEventListener('click', () => {
            this.toggleFeature('darkMode');
        });

        // Links
        document.getElementById('linksUnderline').addEventListener('click', () => {
            this.toggleFeature('linksUnderline');
        });

        // Typography
        document.getElementById('readableFont').addEventListener('click', () => {
            this.toggleFeature('readableFont');
        });

        // Reset
        document.getElementById('reset').addEventListener('click', () => {
            this.resetAll();
        });
    }

    async executeAction(action) {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: (actionType) => {
                    window.accessibilityTool.executeAction(actionType);
                },
                args: [action]
            });

            this.updateStatus(`${action} applied successfully`);
        } catch (error) {
            this.updateStatus(`Error: ${error.message}`, 'error');
        }
    }

    async toggleFeature(feature) {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            // Get current state
            const result = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: (featureName) => {
                    return window.accessibilityTool.toggleFeature(featureName);
                },
                args: [feature]
            });

            const isActive = result[0].result;
            
            // Update button state
            this.updateButtonState(feature, isActive);
            
            // Save state
            await this.saveState(feature, isActive);
            
            this.updateStatus(`${feature} ${isActive ? 'enabled' : 'disabled'}`);
        } catch (error) {
            this.updateStatus(`Error: ${error.message}`, 'error');
        }
    }

    async resetAll() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                    window.accessibilityTool.resetAll();
                }
            });

            // Reset all button states
            const buttons = document.querySelectorAll('.btn:not(#reset)');
            buttons.forEach(btn => btn.classList.remove('active'));

            // Clear saved states
            await chrome.storage.local.clear();
            
            this.updateStatus('All settings reset successfully');
        } catch (error) {
            this.updateStatus(`Error: ${error.message}`, 'error');
        }
    }

    updateButtonState(feature, isActive) {
        const button = document.getElementById(feature);
        if (button) {
            button.classList.toggle('active', isActive);
        }
    }

    async saveState(feature, isActive) {
        const state = {};
        state[feature] = isActive;
        await chrome.storage.local.set(state);
    }

    async loadSavedStates() {
        try {
            const saved = await chrome.storage.local.get();
            Object.keys(saved).forEach(feature => {
                this.updateButtonState(feature, saved[feature]);
            });
        } catch (error) {
            console.error('Error loading saved states:', error);
        }
    }

    updateStatus(message, type = 'success') {
        const statusElement = document.getElementById('statusMessage');
        const statusContainer = document.querySelector('.status');
        
        statusElement.textContent = message;
        statusContainer.className = `status ${type}`;
        
        setTimeout(() => {
            statusContainer.className = 'status';
            statusElement.textContent = 'Ready to enhance accessibility';
        }, 3000);
    }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AccessibilityPopup();
});
