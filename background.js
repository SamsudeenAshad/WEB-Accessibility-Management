// Background script for the extension
chrome.runtime.onInstalled.addListener(() => {
    console.log('Deep Accessibility Tool installed');
    
    // Set default settings
    chrome.storage.local.set({
        accessibilitySettings: {
            textSizeLevel: 0,
            features: {
                grayscale: false,
                highContrast: false,
                negativeContrast: false,
                lightBackground: false,
                linksUnderline: false,
                readableFont: false
            }
        }
    });
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
    // This will open the popup automatically
});

// Listen for tab updates to maintain accessibility settings
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        // Re-inject content script if needed
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        }).catch(() => {
            // Ignore errors for non-scriptable pages
        });
    }
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'saveSettings') {
        chrome.storage.local.set({ accessibilitySettings: request.settings });
        sendResponse({ success: true });
    }
});

// Context menu for quick access (optional)
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'toggleAccessibility') {
        chrome.action.openPopup();
    }
});

// Create context menu on installation
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'toggleAccessibility',
        title: 'Open Accessibility Tools',
        contexts: ['page']
    });
});
