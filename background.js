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
                darkMode: false,
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

// Handle messages from content script and web interface
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'saveSettings') {
        chrome.storage.local.set({ accessibilitySettings: request.settings });
        sendResponse({ success: true });
    }
    
    // Handle web interface communication
    if (request.action === 'webInterfaceCommand') {
        // Forward command to active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, request.data);
            }
        });
        sendResponse({ success: true });
    }
});

// Enable communication with web interface
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    // Only accept messages from localhost (web interface)
    if (sender.url && sender.url.startsWith('http://localhost:')) {
        // Forward to active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, request, (response) => {
                    sendResponse(response);
                });
            } else {
                sendResponse({ error: 'No active tab' });
            }
        });
        return true; // Will respond asynchronously
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
    
    // Create context menu for web interface
    chrome.contextMenus.create({
        id: 'openWebInterface',
        title: 'Open Web Interface',
        contexts: ['page']
    });
});

// Handle web interface context menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'openWebInterface') {
        chrome.tabs.create({ url: 'http://localhost:3000' });
    }
});
