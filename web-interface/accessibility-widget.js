// Accessibility Widget - Injected into target website
(function() {
    'use strict';
    
    // Check if already injected
    if (window.accessibilityWidgetInjected) {
        return;
    }
    window.accessibilityWidgetInjected = true;
    
    // Create the accessibility widget
    const widget = document.createElement('div');
    widget.id = 'accessibility-widget';
    widget.innerHTML = `
        <style>
            #accessibility-widget {
                position: fixed;
                top: 80px;
                left: 20px;
                z-index: 999999;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            
            #accessibility-toggle {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #3498db, #2980b9);
                border: none;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                color: white;
            }
            
            #accessibility-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 16px rgba(52, 152, 219, 0.4);
            }
            
            #accessibility-menu {
                position: absolute;
                top: 70px;
                left: 0;
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                min-width: 320px;
                max-width: 400px;
                max-height: 500px;
                overflow-y: auto;
                display: none;
                animation: slideIn 0.3s ease;
            }
            
            @keyframes slideIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .menu-header {
                padding: 20px;
                border-bottom: 1px solid #e0e0e0;
                background: #f8f9fa;
                border-radius: 12px 12px 0 0;
            }
            
            .menu-header h3 {
                margin: 0;
                color: #2c3e50;
                font-size: 18px;
                font-weight: 600;
            }
            
            .menu-options {
                padding: 10px 0;
            }
            
            .menu-section {
                border-bottom: 1px solid #f0f0f0;
                padding: 10px 0;
            }
            
            .menu-section:last-child {
                border-bottom: none;
            }
            
            .section-title {
                font-size: 14px;
                font-weight: 600;
                color: #2c3e50;
                margin: 0 0 10px 20px;
                padding: 8px 0;
            }
            
            .text-size-controls {
                display: flex;
                flex-direction: column;
            }
            
            .size-indicator {
                background: #e3f2fd;
                color: #1976d2;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 600;
                min-width: 40px;
                text-align: center;
            }
            
            .reset-btn {
                background: #fff3e0 !important;
                color: #f57c00 !important;
            }
            
            .reset-btn:hover {
                background: #ffe0b2 !important;
            }
            
            .menu-option {
                display: flex;
                align-items: center;
                padding: 15px 20px;
                cursor: pointer;
                transition: background-color 0.2s;
                border: none;
                background: none;
                width: 100%;
                text-align: left;
            }
            
            .menu-option:hover {
                background-color: #f8f9fa;
            }
            
            .menu-option.active {
                background-color: #e3f2fd;
                color: #1976d2;
            }
            
            .option-icon {
                margin-right: 12px;
                font-size: 20px;
                width: 24px;
                text-align: center;
            }
            
            .option-content {
                flex: 1;
            }
            
            .option-title {
                font-weight: 500;
                color: #2c3e50;
                margin-bottom: 2px;
            }
            
            .option-description {
                font-size: 12px;
                color: #7f8c8d;
            }
            
            .toggle-switch {
                width: 40px;
                height: 20px;
                background: #ccc;
                border-radius: 20px;
                position: relative;
                transition: background-color 0.3s;
            }
            
            .toggle-switch.active {
                background: #4caf50;
            }
            
            .toggle-switch::after {
                content: '';
                position: absolute;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: white;
                top: 2px;
                left: 2px;
                transition: transform 0.3s;
            }
            
            .toggle-switch.active::after {
                transform: translateX(20px);
            }
            
            /* Accessibility modifications */
            .accessibility-text-size-1 * {
                font-size: 102% !important;
                line-height: 1.4 !important;
            }
            
            .accessibility-text-size-2 * {
                font-size: 104% !important;
                line-height: 1.4 !important;
            }
            
            .accessibility-text-size-3 * {
                font-size: 106% !important;
                line-height: 1.5 !important;
            }
            
            .accessibility-text-size-4 * {
                font-size: 108% !important;
                line-height: 1.5 !important;
            }
            
            .accessibility-text-size-5 * {
                font-size: 110% !important;
                line-height: 1.6 !important;
            }
            
            .accessibility-text-size-6 * {
                font-size: 112% !important;
                line-height: 1.6 !important;
            }
            
            .accessibility-text-size-7 * {
                font-size: 114% !important;
                line-height: 1.7 !important;
            }
            
            .accessibility-grayscale {
                filter: grayscale(100%) !important;
            }
            
            .accessibility-high-contrast {
                filter: contrast(150%) brightness(1.2) !important;
            }
            
            .accessibility-negative-contrast {
                filter: invert(1) hue-rotate(180deg) !important;
            }
            
            .accessibility-light-background * {
                background-color: #ffffff !important;
                color: #000000 !important;
            }
            
            .accessibility-dark-mode {
                filter: invert(1) hue-rotate(180deg) !important;
            }
            
            .accessibility-links-underline a {
                text-decoration: underline !important;
                text-decoration-thickness: 2px !important;
                text-underline-offset: 2px !important;
            }
            
            .accessibility-readable-font * {
                font-family: 'Arial', 'Helvetica', sans-serif !important;
                font-weight: 400 !important;
                letter-spacing: 0.5px !important;
            }
            
            .accessibility-focus-indicators *:focus {
                outline: 3px solid #ff6b6b !important;
                outline-offset: 2px !important;
            }
            
            .accessibility-reduce-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        </style>
        
        <button id="accessibility-toggle" aria-label="Open accessibility menu">
            ♿
        </button>
        
        <div id="accessibility-menu" role="menu" aria-label="Accessibility options">
            <div class="menu-header">
                <h3>Accessibility Options</h3>
            </div>
            <div class="menu-options">
                <!-- 📝 Text Adjustments -->
                <div class="menu-section">
                    <h4 class="section-title">📝 Text Adjustments</h4>
                    <div class="text-size-controls">
                        <button class="menu-option text-size-btn" data-action="increase-text" role="menuitem">
                            <span class="option-icon">🔍</span>
                            <div class="option-content">
                                <div class="option-title">Increase Text Size</div>
                                <div class="option-description">Make text larger for better readability</div>
                            </div>
                            <div class="size-indicator" id="text-size-display">100%</div>
                        </button>
                        <button class="menu-option text-size-btn" data-action="decrease-text" role="menuitem">
                            <span class="option-icon">🔍</span>
                            <div class="option-content">
                                <div class="option-title">Decrease Text Size</div>
                                <div class="option-description">Make text smaller</div>
                            </div>
                        </button>
                    </div>
                </div>

                <!-- 🎨 Visual Enhancements -->
                <div class="menu-section">
                    <h4 class="section-title">🎨 Visual Enhancements</h4>
                    <button class="menu-option" data-feature="grayscale" role="menuitem">
                        <span class="option-icon">⚫</span>
                        <div class="option-content">
                            <div class="option-title">Grayscale Mode</div>
                            <div class="option-description">Convert pages to grayscale for better focus</div>
                        </div>
                        <div class="toggle-switch" id="toggle-grayscale"></div>
                    </button>
                    
                    <button class="menu-option" data-feature="high-contrast" role="menuitem">
                        <span class="option-icon">🎨</span>
                        <div class="option-content">
                            <div class="option-title">High Contrast</div>
                            <div class="option-description">Enhance contrast for better visibility</div>
                        </div>
                        <div class="toggle-switch" id="toggle-high-contrast"></div>
                    </button>
                    
                    <button class="menu-option" data-feature="negative-contrast" role="menuitem">
                        <span class="option-icon">🔄</span>
                        <div class="option-content">
                            <div class="option-title">Negative Contrast</div>
                            <div class="option-description">Invert colors for reduced eye strain</div>
                        </div>
                        <div class="toggle-switch" id="toggle-negative-contrast"></div>
                    </button>
                    
                    <button class="menu-option" data-feature="light-background" role="menuitem">
                        <span class="option-icon">☀️</span>
                        <div class="option-content">
                            <div class="option-title">Light Background</div>
                            <div class="option-description">Force light backgrounds for better readability</div>
                        </div>
                        <div class="toggle-switch" id="toggle-light-background"></div>
                    </button>
                    
                    <button class="menu-option" data-feature="dark-mode" role="menuitem">
                        <span class="option-icon">🌙</span>
                        <div class="option-content">
                            <div class="option-title">Dark Mode</div>
                            <div class="option-description">Apply dark theme for reduced eye strain</div>
                        </div>
                        <div class="toggle-switch" id="toggle-dark-mode"></div>
                    </button>
                </div>

                <!-- 🔗 Link Enhancements -->
                <div class="menu-section">
                    <h4 class="section-title">🔗 Link Enhancements</h4>
                    <button class="menu-option" data-feature="links-underline" role="menuitem">
                        <span class="option-icon">�</span>
                        <div class="option-content">
                            <div class="option-title">Links Underline</div>
                            <div class="option-description">Make all links clearly underlined</div>
                        </div>
                        <div class="toggle-switch" id="toggle-links-underline"></div>
                    </button>
                </div>

                <!-- 📖 Typography -->
                <div class="menu-section">
                    <h4 class="section-title">📖 Typography</h4>
                    <button class="menu-option" data-feature="readable-font" role="menuitem">
                        <span class="option-icon">📖</span>
                        <div class="option-content">
                            <div class="option-title">Readable Font</div>
                            <div class="option-description">Apply clean, readable fonts across pages</div>
                        </div>
                        <div class="toggle-switch" id="toggle-readable-font"></div>
                    </button>
                    
                    <button class="menu-option" data-feature="focus-indicators" role="menuitem">
                        <span class="option-icon">🎯</span>
                        <div class="option-content">
                            <div class="option-title">Focus Indicators</div>
                            <div class="option-description">Enhanced focus outlines for navigation</div>
                        </div>
                        <div class="toggle-switch" id="toggle-focus-indicators"></div>
                    </button>
                    
                    <button class="menu-option" data-feature="reduce-motion" role="menuitem">
                        <span class="option-icon">⚡</span>
                        <div class="option-content">
                            <div class="option-title">Reduce Motion</div>
                            <div class="option-description">Minimize animations and transitions</div>
                        </div>
                        <div class="toggle-switch" id="toggle-reduce-motion"></div>
                    </button>
                </div>

                <!-- 🔄 Reset Function -->
                <div class="menu-section">
                    <h4 class="section-title">🔄 Reset Function</h4>
                    <button class="menu-option reset-btn" data-action="reset-all" role="menuitem">
                        <span class="option-icon">🔄</span>
                        <div class="option-content">
                            <div class="option-title">Reset All</div>
                            <div class="option-description">Quickly return to default settings</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Inject into page
    document.body.appendChild(widget);
    
    // Get references to elements
    const toggleBtn = document.getElementById('accessibility-toggle');
    const menu = document.getElementById('accessibility-menu');
    const menuOptions = document.querySelectorAll('.menu-option');
    
    // State management
    const accessibilityState = {
        'textSize': 0,
        'grayscale': false,
        'high-contrast': false,
        'negative-contrast': false,
        'light-background': false,
        'dark-mode': false,
        'links-underline': false,
        'readable-font': false,
        'focus-indicators': false,
        'reduce-motion': false
    };
    
    // Toggle menu visibility
    toggleBtn.addEventListener('click', () => {
        const isVisible = menu.style.display !== 'none';
        menu.style.display = isVisible ? 'none' : 'block';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!widget.contains(e.target)) {
            menu.style.display = 'none';
        }
    });
    
    // Handle accessibility feature toggles
    menuOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            
            const feature = option.dataset.feature;
            const action = option.dataset.action;
            
            if (feature) {
                // Handle feature toggle
                const toggle = document.getElementById(`toggle-${feature}`);
                
                // Toggle state
                accessibilityState[feature] = !accessibilityState[feature];
                
                // Update UI
                toggle.classList.toggle('active', accessibilityState[feature]);
                option.classList.toggle('active', accessibilityState[feature]);
                
                // Apply accessibility feature
                applyAccessibilityFeature(feature, accessibilityState[feature]);
                
            } else if (action) {
                // Handle action button
                executeAction(action);
            }
        });
    });
    
    // Execute action functions
    function executeAction(action) {
        switch (action) {
            case 'increase-text':
                if (accessibilityState.textSize < 7) {
                    accessibilityState.textSize++;
                    updateTextSize();
                }
                break;
            case 'decrease-text':
                if (accessibilityState.textSize > 0) {
                    accessibilityState.textSize--;
                    updateTextSize();
                }
                break;
            case 'reset-all':
                resetAllSettings();
                break;
        }
    }
    
    // Update text size
    function updateTextSize() {
        const body = document.body;
        
        // Remove all text size classes
        for (let i = 0; i <= 7; i++) {
            body.classList.remove(`accessibility-text-size-${i}`);
        }
        
        // Apply current text size
        if (accessibilityState.textSize > 0) {
            body.classList.add(`accessibility-text-size-${accessibilityState.textSize}`);
        }
        
        // Update display
        const display = document.getElementById('text-size-display');
        if (display) {
            display.textContent = `${100 + (accessibilityState.textSize * 2)}%`;
        }
        
        // Save state
        localStorage.setItem('accessibility-state', JSON.stringify(accessibilityState));
    }
    
    // Reset all settings
    function resetAllSettings() {
        const body = document.body;
        
        // Reset text size
        accessibilityState.textSize = 0;
        for (let i = 0; i <= 7; i++) {
            body.classList.remove(`accessibility-text-size-${i}`);
        }
        
        // Reset all other features
        Object.keys(accessibilityState).forEach(feature => {
            if (feature !== 'textSize') {
                accessibilityState[feature] = false;
                body.classList.remove(`accessibility-${feature}`);
                
                // Update UI
                const toggle = document.getElementById(`toggle-${feature}`);
                const option = document.querySelector(`[data-feature="${feature}"]`);
                if (toggle) toggle.classList.remove('active');
                if (option) option.classList.remove('active');
            }
        });
        
        // Update text size display
        const display = document.getElementById('text-size-display');
        if (display) {
            display.textContent = '100%';
        }
        
        // Clear localStorage
        localStorage.removeItem('accessibility-state');
    }
    
    // Apply accessibility features to the page
    function applyAccessibilityFeature(feature, enabled) {
        const body = document.body;
        const className = `accessibility-${feature}`;
        
        if (enabled) {
            body.classList.add(className);
        } else {
            body.classList.remove(className);
        }
        
        // Save state to localStorage
        localStorage.setItem('accessibility-state', JSON.stringify(accessibilityState));
    }
    
    // Load saved state
    function loadSavedState() {
        const savedState = localStorage.getItem('accessibility-state');
        if (savedState) {
            const state = JSON.parse(savedState);
            
            // Load text size
            if (state.textSize && state.textSize > 0) {
                accessibilityState.textSize = state.textSize;
                updateTextSize();
            }
            
            // Load other features
            Object.keys(state).forEach(feature => {
                if (feature !== 'textSize' && state[feature]) {
                    const toggle = document.getElementById(`toggle-${feature}`);
                    const option = document.querySelector(`[data-feature="${feature}"]`);
                    
                    accessibilityState[feature] = true;
                    if (toggle) toggle.classList.add('active');
                    if (option) option.classList.add('active');
                    applyAccessibilityFeature(feature, true);
                }
            });
        }
    }
    
    // Initialize saved state
    loadSavedState();
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            menu.style.display = 'none';
        }
    });
    
    console.log('♿ Web Accessibility Tool loaded successfully!');
})();
