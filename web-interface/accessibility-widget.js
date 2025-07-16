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
                top: 20px;
                right: 20px;
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
                right: 0;
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                min-width: 280px;
                max-height: 400px;
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
            
            .text-size-controls {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                gap: 8px;
                margin-left: auto;
                flex-shrink: 0;
            }
            
            .text-size-option {
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                padding: 15px 20px !important;
            }
            
            .text-size-option .option-content {
                flex: 1;
                margin-right: 10px;
            }
            
            .text-size-btn {
                width: 28px;
                height: 28px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                color: #333;
                cursor: pointer;
                font-size: 14px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
                flex-shrink: 0;
            }
            
            .text-size-btn:hover:not(:disabled) {
                background: #3498db;
                color: white;
                border-color: #3498db;
            }
            
            .text-size-btn:disabled {
                background: #f5f5f5;
                color: #ccc;
                border-color: #eee;
                cursor: not-allowed;
            }
            
            .text-size-display {
                font-weight: bold;
                font-size: 12px;
                color: #2c3e50;
                min-width: 40px;
                text-align: center;
                flex-shrink: 0;
            }
            
            .menu-divider {
                height: 1px;
                background: #e0e0e0;
                margin: 10px 0;
            }
            
            .reset-option {
                background: #f8f9fa;
                border: 1px solid #e0e0e0;
                margin: 10px 20px;
                border-radius: 5px;
            }
            
            .reset-option:hover {
                background: #e9ecef;
                border-color: #d0d3d6;
            }
            
            /* Text Size Accessibility - More Aggressive Approach */
            html.text-size-small,
            html.text-size-small body {
                font-size: 12px !important;
            }
            
            html.text-size-normal,
            html.text-size-normal body {
                font-size: 14px !important;
            }
            
            html.text-size-large,
            html.text-size-large body {
                font-size: 16px !important;
            }
            
            html.text-size-larger,
            html.text-size-larger body {
                font-size: 18px !important;
            }
            
            html.text-size-largest,
            html.text-size-largest body {
                font-size: 20px !important;
            }
            
            /* Target all elements with maximum specificity */
            html.text-size-small *:not(#accessibility-widget):not(#accessibility-widget *) {
                font-size: 12px !important;
            }
            
            html.text-size-normal *:not(#accessibility-widget):not(#accessibility-widget *) {
                font-size: 14px !important;
            }
            
            html.text-size-large *:not(#accessibility-widget):not(#accessibility-widget *) {
                font-size: 16px !important;
            }
            
            html.text-size-larger *:not(#accessibility-widget):not(#accessibility-widget *) {
                font-size: 18px !important;
            }
            
            html.text-size-largest *:not(#accessibility-widget):not(#accessibility-widget *) {
                font-size: 20px !important;
            }
            
            /* Ensure accessibility widget is not affected */
            #accessibility-widget,
            #accessibility-widget * {
                font-size: 14px !important;
            }
            
            .accessibility-grayscale {
                filter: grayscale(100%) !important;
            }
            
            .accessibility-high-contrast {
                filter: contrast(150%) brightness(110%) !important;
            }
            
            .accessibility-negative-contrast {
                filter: invert(1) hue-rotate(180deg) !important;
            }
            
            .accessibility-light-background {
                background-color: #ffffff !important;
                color: #000000 !important;
            }
            
            .accessibility-light-background * {
                background-color: #ffffff !important;
                color: #000000 !important;
            }
            
            .accessibility-dark-mode {
                background-color: #1a1a1a !important;
                color: #ffffff !important;
            }
            
            .accessibility-dark-mode * {
                background-color: #1a1a1a !important;
                color: #ffffff !important;
            }
            
            .accessibility-links-underline a,
            .accessibility-links-underline a:link,
            .accessibility-links-underline a:visited {
                text-decoration: underline !important;
                text-decoration-thickness: 2px !important;
            }
            
            .accessibility-readable-font,
            .accessibility-readable-font * {
                font-family: 'Arial', 'Helvetica', sans-serif !important;
            }
            
            .accessibility-focus-indicators *:focus {
                outline: 3px solid #ff6b6b !important;
                outline-offset: 2px !important;
            }
            
            .accessibility-reduce-motion,
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
                <button class="menu-option text-size-option" data-feature="text-size-increase" role="menuitem">
                    <span class="option-icon">🔍</span>
                    <div class="option-content">
                        <div class="option-title">Text Size</div>
                        <div class="option-description">Adjust text size for better readability</div>
                    </div>
                    <div class="text-size-controls">
                        <button class="text-size-btn" data-action="decrease" type="button">-</button>
                        <span class="text-size-display">Normal</span>
                        <button class="text-size-btn" data-action="increase" type="button">+</button>
                    </div>
                </button>
                
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
                
                <button class="menu-option" data-feature="links-underline" role="menuitem">
                    <span class="option-icon">�</span>
                    <div class="option-content">
                        <div class="option-title">Links Underline</div>
                        <div class="option-description">Make all links clearly underlined</div>
                    </div>
                    <div class="toggle-switch" id="toggle-links-underline"></div>
                </button>
                
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
                
                <div class="menu-divider"></div>
                
                <button class="menu-option reset-option" data-action="reset-all" role="menuitem">
                    <span class="option-icon">🔄</span>
                    <div class="option-content">
                        <div class="option-title">Reset All</div>
                        <div class="option-description">Quickly return to default settings</div>
                    </div>
                </button>
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
        'text-size-level': 1, // 0=small, 1=normal, 2=large, 3=larger, 4=largest
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
        const feature = option.dataset.feature;
        const action = option.dataset.action;
        
        if (action === 'reset-all') {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                resetAllFeatures();
            });
        } else if (feature === 'text-size-increase') {
            // Handle text size controls - prevent default click behavior
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                // Don't do anything for the main button click
            });
            
            // Add event listeners for the +/- buttons with delay
            setTimeout(() => {
                const increaseBtn = option.querySelector('[data-action="increase"]');
                const decreaseBtn = option.querySelector('[data-action="decrease"]');
                
                console.log('Setting up text size buttons:', { increaseBtn, decreaseBtn });
                
                if (increaseBtn) {
                    increaseBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        console.log('+ button clicked - increasing text size');
                        adjustTextSize(1); // Increase by 1 level
                    });
                }
                
                if (decreaseBtn) {
                    decreaseBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        console.log('- button clicked - decreasing text size');
                        adjustTextSize(-1); // Decrease by 1 level
                    });
                }
            }, 100);
        } else if (feature) {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const toggle = document.getElementById(`toggle-${feature}`);
                if (!toggle) return;
                
                // Toggle state
                accessibilityState[feature] = !accessibilityState[feature];
                
                // Update UI
                toggle.classList.toggle('active', accessibilityState[feature]);
                option.classList.toggle('active', accessibilityState[feature]);
                
                // Apply accessibility feature
                applyAccessibilityFeature(feature, accessibilityState[feature]);
            });
        }
    });
    
    // Apply accessibility features to the page
    function applyAccessibilityFeature(feature, enabled) {
        const body = document.body;
        const className = `accessibility-${feature}`;
        
        console.log(`Applying feature: ${feature}, enabled: ${enabled}`);
        
        if (feature === 'text-size-increase') {
            // Handle text size separately
            updateTextSize();
        } else {
            if (enabled) {
                body.classList.add(className);
                console.log(`Added class: ${className}`);
            } else {
                body.classList.remove(className);
                console.log(`Removed class: ${className}`);
            }
        }
        
        // Save state to localStorage
        localStorage.setItem('accessibility-state', JSON.stringify(accessibilityState));
        
        // Log current body classes
        console.log('Current body classes:', body.className);
    }
    
    // Text size adjustment function
    function adjustTextSize(increment) {
        const currentLevel = accessibilityState['text-size-level'];
        const newLevel = Math.max(0, Math.min(4, currentLevel + increment));
        
        console.log(`Adjusting text size from level ${currentLevel} to ${newLevel} (increment: ${increment})`);
        
        // Always update the state and apply changes
        accessibilityState['text-size-level'] = newLevel;
        
        // Update the CSS and display immediately
        updateTextSize();
        updateTextSizeDisplay();
        
        // Save state to localStorage
        localStorage.setItem('accessibility-state', JSON.stringify(accessibilityState));
        
        console.log(`Text size updated to level: ${newLevel}`);
        
        // Force immediate visual update
        document.body.style.display = 'none';
        document.body.offsetHeight; // Trigger reflow
        document.body.style.display = '';
    }
    
    // Update text size CSS
    function updateTextSize() {
        const textSizeLevel = accessibilityState['text-size-level'];
        const html = document.documentElement;
        const body = document.body;
        
        console.log(`Updating text size to level: ${textSizeLevel}`);
        
        // Remove all existing text size classes from both HTML and body
        html.classList.remove('text-size-small', 'text-size-normal', 'text-size-large', 'text-size-larger', 'text-size-largest');
        body.classList.remove('text-size-small', 'text-size-normal', 'text-size-large', 'text-size-larger', 'text-size-largest');
        
        // Apply the appropriate class based on level
        const sizeClasses = ['text-size-small', 'text-size-normal', 'text-size-large', 'text-size-larger', 'text-size-largest'];
        const className = sizeClasses[textSizeLevel];
        
        if (className) {
            html.classList.add(className);
            body.classList.add(className);
            console.log(`Applied class: ${className} to HTML and body`);
        }
        
        console.log(`HTML classes: ${html.className}`);
        console.log(`Body classes: ${body.className}`);
    }
    
    // Update text size display
    function updateTextSizeDisplay() {
        const display = document.querySelector('.text-size-display');
        const increaseBtn = document.querySelector('[data-action="increase"]');
        const decreaseBtn = document.querySelector('[data-action="decrease"]');
        
        const currentLevel = accessibilityState['text-size-level'];
        const sizeLabels = ['Small', 'Normal', 'Large', 'Larger', 'Largest'];
        const displayValue = sizeLabels[currentLevel] || 'Normal';
        
        console.log(`Updating text size display to: ${displayValue} (level ${currentLevel})`);
        
        if (display) {
            display.textContent = displayValue;
        }
        
        // Update button states
        if (increaseBtn) {
            increaseBtn.disabled = currentLevel >= 4;
            increaseBtn.style.opacity = currentLevel >= 4 ? '0.5' : '1';
        }
        
        if (decreaseBtn) {
            decreaseBtn.disabled = currentLevel <= 0;
            decreaseBtn.style.opacity = currentLevel <= 0 ? '0.5' : '1';
        }
    }
    
    // Reset all features
    function resetAllFeatures() {
        // Reset state
        Object.keys(accessibilityState).forEach(feature => {
            if (feature === 'text-size-level') {
                accessibilityState[feature] = 1; // Reset to normal (level 1)
            } else {
                accessibilityState[feature] = false;
            }
        });
        
        // Remove all accessibility classes from both HTML and body
        const html = document.documentElement;
        const body = document.body;
        
        [html, body].forEach(element => {
            const classes = element.className.split(' ');
            const filteredClasses = classes.filter(cls => 
                !cls.startsWith('accessibility-') && 
                !cls.startsWith('text-size-')
            );
            element.className = filteredClasses.join(' ');
        });
        
        // Remove any CSS custom properties
        body.style.removeProperty('--text-size-multiplier');
        body.style.removeProperty('font-size');
        
        // Update UI
        document.querySelectorAll('.toggle-switch').forEach(toggle => {
            toggle.classList.remove('active');
        });
        
        document.querySelectorAll('.menu-option').forEach(option => {
            option.classList.remove('active');
        });
        
        // Apply default text size
        updateTextSize();
        updateTextSizeDisplay();
        
        // Clear localStorage
        localStorage.removeItem('accessibility-state');
        
        console.log('All accessibility features reset');
    }
    
    // Load saved state
    function loadSavedState() {
        const savedState = localStorage.getItem('accessibility-state');
        if (savedState) {
            const state = JSON.parse(savedState);
            Object.keys(state).forEach(feature => {
                if (feature === 'text-size-level') {
                    accessibilityState[feature] = state[feature];
                    updateTextSize();
                } else if (state[feature]) {
                    const toggle = document.getElementById(`toggle-${feature}`);
                    const option = document.querySelector(`[data-feature="${feature}"]`);
                    
                    if (toggle && option) {
                        accessibilityState[feature] = true;
                        toggle.classList.add('active');
                        option.classList.add('active');
                        applyAccessibilityFeature(feature, true);
                    }
                }
            });
        }
        
        updateTextSizeDisplay();
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
