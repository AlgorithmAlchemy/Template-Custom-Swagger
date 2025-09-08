// Custom JavaScript for Swagger UI

// Function to create the blue strip
function createBlueStrip() {
    // Create HTML for the strip
    const stripHTML = `
        <div class="top-blue-strip">
            <div class="strip-left">
                <a href="https://amnezia.org" class="logo" target="_blank">
                     Amnezia Time Tracker
                </a>
            </div>
            <div class="strip-right">
                <a href="/export?format=json" class="export-btn" download="amnezia-api-docs.json">
                    JSON
                </a>
                <a href="/export?format=yaml" class="export-btn" download="amnezia-api-docs.yaml">
                    YAML
                </a>
                <!-- Temporarily disabled: HTML export
                <a href="/export?format=html" class="export-btn" download="amnezia-api-docs.html">
                    HTML
                </a>
                -->
                <a href="https://amnezia.org" class="contact-link" target="_blank">
                     Сайт
                </a>
                <a href="https://github.com/amnezia-time-tracker/amnezia-time-tracker" class="contact-link" target="_blank">
                     GitHub
                </a>
                <a href="mailto:support@amnezia.org" class="contact-link">
                    Поддержка
                </a>
            </div>
        </div>
    `;

    // Add the strip to the beginning of the body
    document.body.insertAdjacentHTML('afterbegin', stripHTML);

    // Add handlers for the export buttons
    document.querySelectorAll('.export-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const format = this.href.split('format=')[1];
            console.log(`Exporting documentation in ${format} format`);

            // Show loading indicator
            const originalText = this.innerHTML;
            this.innerHTML = '⏳ Exporting...';
            this.style.pointerEvents = 'none';

            // Restore the button after 2 seconds
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.pointerEvents = 'auto';
            }, 2000);
        });
    });
}

// Function to add CSS
function addCustomCSS() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/static/custom-swagger.css';
    document.head.appendChild(link);
}

// Initialization function
function initCustomSwagger() {
    // Add CSS
    addCustomCSS();

    // Wait for Swagger UI to load
    const checkSwagger = setInterval(() => {
        if (document.querySelector('.swagger-ui')) {
            clearInterval(checkSwagger);
            createBlueStrip();
        }
    }, 100);
}

// Run initialization when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCustomSwagger);
} else {
    initCustomSwagger();
}