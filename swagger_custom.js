// === JAVASCRIPT LOAD CHECK ===
console.log('JavaScript file swagger_custom.js loaded!');

// === THEME TOGGLE FUNCTION ===

// Optimized theme toggle function
function toggleTheme() {
    const body = document.body;
    const rootElement = document.documentElement;
    const themeIcon = document.querySelector('.theme-icon');
    const currentTheme = body.getAttribute('data-theme');

    // Instant toggle without delay
    if (currentTheme === 'dark') {
        // Switch to light theme
        body.removeAttribute('data-theme');
        rootElement.removeAttribute('data-theme');
        if (themeIcon) themeIcon.textContent = '';
        localStorage.setItem('theme', 'light');

        // Delayed notification to avoid UI lag
        setTimeout(() => {
            if (typeof showEnhancedNotification === 'function') {
                showEnhancedNotification('Switched to light theme', 'success');
            }
        }, 0);

        // Update scroll button theme
        if (window.updateScrollButtonTheme) {
            window.updateScrollButtonTheme();
        }

        // Force fix button in light mode
        if (window.fixScrollButtonDarkMode) {
            setTimeout(() => {
                window.fixScrollButtonDarkMode();
            }, 100);
        }
    } else {
        // Switch to dark theme
        body.setAttribute('data-theme', 'dark');
        rootElement.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.textContent = '';
        localStorage.setItem('theme', 'dark');

        // Delayed notification to avoid UI lag
        setTimeout(() => {
            if (typeof showEnhancedNotification === 'function') {
                showEnhancedNotification('Switched to dark theme', 'success');
            }
        }, 0);

        // Update scroll button theme
        if (window.updateScrollButtonTheme) {
            window.updateScrollButtonTheme();
        }

        // Force fix button in dark mode
        if (window.fixScrollButtonDarkMode) {
            setTimeout(() => {
                window.fixScrollButtonDarkMode();
            }, 100);
        }
    }
}

// Fast theme initialization on load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const rootElement = document.documentElement;
    const themeIcon = document.querySelector('.theme-icon');

    // Instant theme application without delay
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        rootElement.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.textContent = '';
    } else {
        body.removeAttribute('data-theme');
        rootElement.removeAttribute('data-theme');
        if (themeIcon) themeIcon.textContent = '';
    }

    // Update scroll button theme after initialization
    setTimeout(() => {
        if (window.updateScrollButtonTheme) {
            window.updateScrollButtonTheme();
        }
        if (window.fixScrollButtonDarkMode) {
            window.fixScrollButtonDarkMode();
        }
    }, 100);
}

// Export theme toggle function to the global scope
window.toggleTheme = toggleTheme;
window.initializeTheme = initializeTheme;

// Add event handlers
document.addEventListener('DOMContentLoaded', function() {
    // Handler for the theme toggle button
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
        console.log("Theme toggle button found, adding handler");
        themeToggleBtn.addEventListener('click', toggleTheme);
    } else {
        console.log("Theme toggle button not found");
    }

    // Initialize export dropdown menu with a delay to ensure DOM is loaded
    setTimeout(() => {
        initializeExportDropdown();
    }, 100);

    // Additional initialization after a longer interval
    setTimeout(() => {
        if (!dropdownInitialized) {
            console.log('Re-initializing dropdown menu');
            initializeExportDropdown();
        }
    }, 1000);

    // Constant monitoring and restoration of handlers
    setInterval(() => {
        const button = document.querySelector('.export-dropdown-btn');
        if (button && !button.hasAttribute('data-export-initialized')) {
            console.log('Restoring export button handlers');
            reinitializeDropdown();
        }

        // Force re-attach handlers every 3 seconds
        if (button) {
            console.log('Forcing update of export button handlers');
            forceReattachHandlers();
        }
    }, 3000);

    // Initialize scroll to top button
    initializeScrollToTop();

    // Observe DOM changes and restore handlers
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        const exportButton = node.querySelector ? node.querySelector('.export-dropdown-btn') : null;
                        if (exportButton && !exportButton.hasAttribute('data-export-initialized')) {
                            console.log('New export button detected, initializing handlers');
                            setTimeout(() => {
                                forceReattachHandlers();
                            }, 100);
                        }
                    }
                });
            }
        });
    });

    // Start observing DOM changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// === ENHANCED MICROINTERACTIONS ===

// Initialize all enhancements
function initializeEnhancedInteractions() {
    console.log("🎬 Initializing enhanced microinteractions...");
    addMagneticEffect();
    addRippleEffect();
    addScrollAnimations();
    enhanceSwaggerUI();
    initializeScrollToTop();
    console.log("Microinteractions initialized");
}

// Magnetic effect for buttons
function addMagneticEffect() {
    const buttons = document.querySelectorAll('.export-btn, .theme-toggle-btn');
    buttons.forEach(button => {
        // Check if magnetic effect is already added
        if (button.classList.contains('magnetic-button')) {
            return;
        }

        button.classList.add('magnetic-button');
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
            button.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // Separate handling for the export button without magnetic effect
    const exportButton = document.querySelector('.export-dropdown-btn');
    if (exportButton) {
        // Remove magnetic effect from export button to avoid conflict with dropdown
        exportButton.classList.remove('magnetic-button');
        exportButton.addEventListener('mouseleave', () => {
            exportButton.style.transform = 'translate(0, 0) scale(1)';
        });
    }
}

// Ripple effect for buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.export-btn, .export-dropdown-btn, .theme-toggle-btn, .swagger-ui .btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Scroll animations
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'fadeInUp 0.8s ease';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.swagger-ui .opblock, .swagger-ui .info').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Swagger UI enhancements
function enhanceSwaggerUI() {
    // Animations for buttons
    document.querySelectorAll('.swagger-ui .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.style.animation = 'successCheck 0.6s ease-in-out';
            setTimeout(() => btn.style.animation = '', 600);
        });
    });

    // Animations for input fields
    document.querySelectorAll('.swagger-ui input, .swagger-ui textarea').forEach(input => {
        input.addEventListener('focus', () => {
            input.style.animation = 'searchPulse 0.6s ease-in-out';
        });
        input.addEventListener('blur', () => {
            input.style.animation = '';
        });
    });
}

// Enhanced notifications
function showEnhancedNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };

    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 18px;">${type === 'success' ? '' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : ''}</span>
            <span style="font-size: 14px; font-weight: 500;">${message}</span>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        animation: slideInNotification 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    document.body.appendChild(notification);

    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Function to add custom styles
function addCustomStyles() {
    console.log("Applying custom styles...");

    // Add classes to Swagger UI elements for better styling
    const infoElement = document.querySelector('.swagger-ui .info');
    if (infoElement) {
        infoElement.classList.add('custom-info-style');
    }

    // Add animations to headers
    const headers = document.querySelectorAll('.swagger-ui h1, .swagger-ui h2, .swagger-ui h3');
    headers.forEach((header, index) => {
        header.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
    });

    console.log("Custom styles applied");
}

// Export functions
window.addCustomStyles = addCustomStyles;
window.initializeEnhancedInteractions = initializeEnhancedInteractions;

// === SCROLL TO TOP BUTTON ===

// Create scroll to top button
function createScrollToTopButton() {
    // Check if the button already exists
    if (document.querySelector('.scroll-to-top-btn')) {
        return;
    }

    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top-btn'; // Remove show and show-on-hover classes
    scrollBtn.innerHTML = '⬆️';
    scrollBtn.title = 'Scroll to top';

    // Add dark mode support on creation
    const isDarkMode = document.body.getAttribute('data-theme') === 'dark' ||
        document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDarkMode) {
        scrollBtn.classList.add('dark-mode');
        console.log('Scroll button created in dark mode');
    } else {
        console.log('Scroll button created in light mode');
    }

    // Add click handler
    scrollBtn.addEventListener('click', scrollToTop);

    // Add hover handler for the right side of the screen with a proximity effect
    let hoverTimeout;
    let isHovering = false;
    let isAnimating = false; // Flag to track appearance animation
    let lastMoveTime = 0;

    document.addEventListener('mousemove', (e) => {
        // Debounce for performance improvement
        const now = Date.now();
        if (now - lastMoveTime < 16) return; // ~60fps
        lastMoveTime = now;
        const windowWidth = window.innerWidth;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const scrollY = window.scrollY;
        const scrollThreshold = Math.max(300, document.documentElement.scrollHeight * 0.2);

        // Get button position
        const btnRect = scrollBtn.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;

        // Calculate distance to the button
        const distanceX = Math.abs(mouseX - btnCenterX);
        const distanceY = Math.abs(mouseY - btnCenterY);
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // If the mouse is in the right part of the screen (last 100px) and scroll is above the threshold
        if (mouseX > windowWidth - 100 && scrollY > scrollThreshold) {
            if (!isHovering) {
                isHovering = true;
                scrollBtn.classList.add('show-on-hover');
            }

            // Don't apply proximity effect during the appearance animation
            if (!scrollBtn.classList.contains('animate')) {
                // Proximity effect - the closer the mouse, the brighter the button
                const maxDistance = 300; // Maximum distance for the effect (increased to 300px)
                const activationRadius = 50; // Activation radius for the arrow
                const minOpacity = 0.3; // Minimum opacity
                const maxOpacity = 0.8; // Maximum opacity

                // Debug information (can be removed later)
                if (distance < 350) {
                    console.log(`Distance to button: ${Math.round(distance)}px, Activation: ${distance < activationRadius ? 'YES' : 'NO'}, Effect: ${distance < maxDistance ? 'YES' : 'NO'}`);
                }

                if (distance < activationRadius) {
                    // Activation within a 50px radius - maximum brightness and glow
                    scrollBtn.classList.add('activated');
                    scrollBtn.style.opacity = '1';
                    scrollBtn.style.transform = 'translateY(0) scale(1.1)';
                } else if (distance < maxDistance) {
                    // Normal proximity effect in the 50-300px range
                    scrollBtn.classList.remove('activated');
                    const opacity = maxOpacity - (distance / maxDistance) * (maxOpacity - minOpacity);
                    scrollBtn.style.opacity = opacity;

                    // Scaling effect on proximity
                    const scale = 1 + (1 - distance / maxDistance) * 0.1;
                    scrollBtn.style.transform = `translateY(0) scale(${scale})`;
                } else {
                    // Base state when distance > 300px
                    scrollBtn.classList.remove('activated');
                    scrollBtn.style.opacity = '';
                    scrollBtn.style.transform = '';
                }
            }
        } else {
            if (isHovering) {
                isHovering = false;
                scrollBtn.classList.remove('show-on-hover', 'activated');
                // Smoothly return to the base state
                scrollBtn.style.opacity = '';
                scrollBtn.style.transform = '';
            }
        }
    });

    document.body.appendChild(scrollBtn);
    console.log('Scroll to top button created');
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Show notification
    showEnhancedNotification('Scrolling to top', 'info');
}

// Scroll handler to show/hide the button
function handleScroll() {
    const scrollBtn = document.querySelector('.scroll-to-top-btn');
    if (!scrollBtn) return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Show button when scroll is below 300px or 20% of the document
    const scrollThreshold = Math.max(300, documentHeight * 0.2);

    if (scrollY > scrollThreshold) {
        if (!scrollBtn.classList.contains('show')) {
            scrollBtn.classList.add('show', 'animate');
            // Completely reset inline styles on first appearance
            scrollBtn.style.opacity = '';
            scrollBtn.style.transform = '';

            // Add dark mode support
            const isDarkMode = document.body.getAttribute('data-theme') === 'dark' ||
                document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDarkMode) {
                scrollBtn.classList.add('dark-mode');
                console.log('Scroll button updated to dark mode');
            } else {
                scrollBtn.classList.remove('dark-mode');
                console.log('Scroll button updated to light mode');
            }

            setTimeout(() => scrollBtn.classList.remove('animate'), 1200);
        }
    } else {
        scrollBtn.classList.remove('show', 'show-on-hover');
        // Reset inline styles on hide
        scrollBtn.style.opacity = '';
        scrollBtn.style.transform = '';
    }
}

// Initialize scroll button
function initializeScrollToTop() {
    createScrollToTopButton();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Add window resize handler

    // Check initial scroll state
    setTimeout(() => {
        handleScroll();
    }, 100);

    // Add function for testing in the console
    window.testScrollButton = function() {
        const scrollBtn = document.querySelector('.scroll-to-top-btn');
        if (scrollBtn) {
            const rect = scrollBtn.getBoundingClientRect();
            const isDarkMode = document.body.getAttribute('data-theme') === 'dark' ||
                document.documentElement.getAttribute('data-theme') === 'dark';
            console.log('Testing scroll button:');
            console.log('- Button found:', !!scrollBtn);
            console.log('- Classes:', scrollBtn.className);
            console.log('- Dark mode:', isDarkMode);
            console.log('- Class dark-mode:', scrollBtn.classList.contains('dark-mode'));
            console.log('- Styles opacity:', scrollBtn.style.opacity || 'CSS');
            console.log('- Styles transform:', scrollBtn.style.transform || 'CSS');
            console.log('- Position:', rect);
            console.log('- Button center:', {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            });
            console.log('📏 Activation logic:');
            console.log('  • 0-50px: full activation');
            console.log('  • 50-300px: proximity effect');
            console.log('  • >300px: base state');
        } else {
            console.log('Scroll button not found');
        }
    };

    // Add function to force fix button in dark mode
    window.fixScrollButtonDarkMode = function() {
        const scrollBtn = document.querySelector('.scroll-to-top-btn');
        if (scrollBtn) {
            const isDarkMode = document.body.getAttribute('data-theme') === 'dark' ||
                document.documentElement.getAttribute('data-theme') === 'dark';

            if (isDarkMode) {
                scrollBtn.classList.add('dark-mode');
                // Set only dark mode styles, without forced positioning
                scrollBtn.style.background = 'rgba(255, 255, 255, 0.2)';
                scrollBtn.style.color = 'white';
                scrollBtn.style.border = '1px solid rgba(255, 255, 255, 0.3)';
                scrollBtn.style.boxShadow = '0 8px 25px rgba(88, 166, 255, 0.4)';
                console.log('Scroll button fixed for dark mode');
            } else {
                scrollBtn.classList.remove('dark-mode');
                // Reset inline styles for light mode
                scrollBtn.style.background = '';
                scrollBtn.style.color = '';
                scrollBtn.style.border = '';
                scrollBtn.style.boxShadow = '';
                console.log('Scroll button fixed for light mode');
            }
        } else {
            console.log('Scroll button not found for fixing');
        }
    };

    // Add function to update scroll button theme
    window.updateScrollButtonTheme = function() {
        const scrollBtn = document.querySelector('.scroll-to-top-btn');
        if (scrollBtn) {
            const isDarkMode = document.body.getAttribute('data-theme') === 'dark' ||
                document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDarkMode) {
                scrollBtn.classList.add('dark-mode');
                console.log('Scroll button theme updated: dark');
            } else {
                scrollBtn.classList.remove('dark-mode');
                console.log('Scroll button theme updated: light');
            }
        } else {
            console.log('Scroll button not found for theme update');
        }
    };

    console.log('Scroll to top button initialized');
    console.log('For testing use: testScrollButton()');
    console.log('For theme update use: updateScrollButtonTheme()');
}

// === EXPORT DROPDOWN MENU MANAGEMENT ===

// Global variable to track dropdown state
let exportDropdownOpen = false;
let dropdownInitialized = false;

// Function to manage the export dropdown menu
function initializeExportDropdown() {
    // Check if it has already been initialized
    if (dropdownInitialized) {
        console.log('Dropdown menu already initialized');
        return;
    }

    const exportDropdown = document.querySelector('.export-dropdown');
    const exportDropdownContent = document.querySelector('.export-dropdown-content');
    const exportButton = document.querySelector('.export-dropdown-btn');

    if (!exportDropdown || !exportDropdownContent || !exportButton) {
        console.log('Export dropdown menu not found');
        return;
    }

    console.log('Initializing export dropdown menu');

    // Function to open dropdown
    function openDropdown() {
        exportDropdownContent.classList.add('show');
        exportDropdownOpen = true;
        console.log('Dropdown menu opened');
    }

    // Function to close dropdown
    function closeDropdown() {
        exportDropdownContent.classList.remove('show');
        exportDropdownOpen = false;
        console.log('Dropdown menu closed');
    }

    // Function to toggle dropdown
    function toggleDropdown(e) {
        e.preventDefault();
        e.stopPropagation();

        if (exportDropdownOpen) {
            closeDropdown();
        } else {
            openDropdown();
        }
    }

    // Add handler to the button
    exportButton.addEventListener('click', toggleDropdown);

    // Click handler outside the dropdown to close it
    document.addEventListener('click', (e) => {
        // If the click is on a link inside the dropdown, let it work
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            if (exportDropdown.contains(e.target)) {
                closeDropdown();
            }
            return;
        }

        // If the click is outside the dropdown, close it
        if (!exportDropdown.contains(e.target)) {
            closeDropdown();
        }
    });

    // Escape key handler to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && exportDropdownOpen) {
            closeDropdown();
        }
    });

    // Mark as initialized
    dropdownInitialized = true;
    console.log('Export dropdown menu initialized');
}

// Function to check dropdown state (for debugging)
window.testExportDropdown = function() {
    console.log('Testing export dropdown menu:');

    const exportDropdown = document.querySelector('.export-dropdown');
    const exportDropdownContent = document.querySelector('.export-dropdown-content');
    const exportButton = document.querySelector('.export-dropdown-btn');

    console.log('- exportDropdown:', exportDropdown);
    console.log('- exportDropdownContent:', exportDropdownContent);
    console.log('- exportButton:', exportButton);
    console.log('- dropdownInitialized:', dropdownInitialized);
    console.log('- exportDropdownOpen:', exportDropdownOpen);

    if (exportButton) {
        console.log('- Button found, checking handlers...');
        // Check if there are handlers on the button
        const events = getEventListeners ? getEventListeners(exportButton) : 'getEventListeners not available';
        console.log('- Event handlers:', events);

        // Test click programmatically
        console.log('- Testing programmatic click...');
        exportButton.click();
    }
};

// Function to force open dropdown
window.forceOpenDropdown = function() {
    const exportDropdownContent = document.querySelector('.export-dropdown-content');
    if (exportDropdownContent) {
        exportDropdownContent.classList.add('show');
        exportDropdownOpen = true;
        console.log('Dropdown forcibly opened');
    } else {
        console.log('Dropdown content not found');
    }
};

// Export functions
window.showEnhancedNotification = showEnhancedNotification;
window.initializeScrollToTop = initializeScrollToTop;
window.scrollToTop = scrollToTop;
window.initializeExportDropdown = initializeExportDropdown;
window.testExportDropdown = window.testExportDropdown;
window.forceOpenDropdown = window.forceOpenDropdown;