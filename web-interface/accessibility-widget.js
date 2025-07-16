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
            
            /* Accessibility modifications */
            .accessibility-large-text * {
                font-size: 120% !important;
                line-height: 1.5 !important;
            }
            
            .accessibility-high-contrast {
                filter: contrast(150%) !important;
            }
            
            .accessibility-dark-mode {
                filter: invert(1) hue-rotate(180deg) !important;
            }
            
            .accessibility-dyslexia-font * {
                font-family: 'Comic Sans MS', cursive !important;
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
                <button class="menu-option" data-feature="large-text" role="menuitem">
                    <span class="option-icon">🔍</span>
                    <div class="option-content">
                        <div class="option-title">Large Text</div>
                        <div class="option-description">Increase text size for better readability</div>
                    </div>
                    <div class="toggle-switch" id="toggle-large-text"></div>
                </button>
                
                <button class="menu-option" data-feature="high-contrast" role="menuitem">
                    <span class="option-icon">🎨</span>
                    <div class="option-content">
                        <div class="option-title">High Contrast</div>
                        <div class="option-description">Enhance color contrast for better visibility</div>
                    </div>
                    <div class="toggle-switch" id="toggle-high-contrast"></div>
                </button>
                
                <button class="menu-option" data-feature="dark-mode" role="menuitem">
                    <span class="option-icon">🌙</span>
                    <div class="option-content">
                        <div class="option-title">Dark Mode</div>
                        <div class="option-description">Switch to dark theme</div>
                    </div>
                    <div class="toggle-switch" id="toggle-dark-mode"></div>
                </button>
                
                <button class="menu-option" data-feature="dyslexia-font" role="menuitem">
                    <span class="option-icon">📖</span>
                    <div class="option-content">
                        <div class="option-title">Dyslexia-Friendly Font</div>
                        <div class="option-description">Use fonts that are easier to read</div>
                    </div>
                    <div class="toggle-switch" id="toggle-dyslexia-font"></div>
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
        'large-text': false,
        'high-contrast': false,
        'dark-mode': false,
        'dyslexia-font': false,
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
            const toggle = document.getElementById(`toggle-${feature}`);
            
            // Toggle state
            accessibilityState[feature] = !accessibilityState[feature];
            
            // Update UI
            toggle.classList.toggle('active', accessibilityState[feature]);
            option.classList.toggle('active', accessibilityState[feature]);
            
            // Apply accessibility feature
            applyAccessibilityFeature(feature, accessibilityState[feature]);
        });
    });
    
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
            Object.keys(state).forEach(feature => {
                if (state[feature]) {
                    const toggle = document.getElementById(`toggle-${feature}`);
                    const option = document.querySelector(`[data-feature="${feature}"]`);
                    
                    accessibilityState[feature] = true;
                    toggle.classList.add('active');
                    option.classList.add('active');
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
