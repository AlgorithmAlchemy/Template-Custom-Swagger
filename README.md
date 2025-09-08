# Custom Swagger UI Template

A template for customizing the standard Swagger UI. This template replaces the default top bar with a custom, brandable one, and adds features like API specification export, dark mode, and enhanced micro-interactions.

![Custom Swagger UI Screenshot](https://user-images.githubusercontent.com/12345/some-image.png) <!-- It's a good idea to add a screenshot of your custom UI -->

## ✨ Features

-   **Custom Branded Top Bar**: Easily add your company logo, custom links, and contact information.
-   **API Specification Export**: Buttons to export the API definition in `JSON` and `YAML` formats.
-   **Dark Mode**: A sleek, modern dark theme for the entire UI, toggleable by the user.
-   **Responsive Design**: The custom UI is fully responsive and works on mobile devices.
-   **Enhanced Micro-interactions**: Smooth animations, ripple effects on buttons, and scroll-to-top functionality for a better user experience.
-   **Easy Integration**: Simply include the CSS and JavaScript files in your existing Swagger UI setup.

## 🚀 Getting Started

### Prerequisites

You need to have a working Swagger UI instance. This template is designed to be an overlay on top of the standard Swagger UI.

### Installation

1.  Clone this repository or download the files.
2.  Copy the following files to the static assets directory of your web server where your Swagger UI is hosted:
    -   `custom-swagger.css`
    -   `custom-swagger.js`
    -   `swagger_custom.css`
    -   `swagger_custom.js`

### Usage

In your HTML file that serves Swagger UI, include the custom CSS and JavaScript files. Make sure to load them **after** the official Swagger UI assets.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My API Docs</title>
    <!-- Standard Swagger UI CSS -->
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@3/swagger-ui.css">

    <!-- Custom CSS -->
    <link rel="stylesheet" type="text/css" href="/static/custom-swagger.css">
    <link rel="stylesheet" type="text/css" href="/static/swagger_custom.css">
</head>

<body>
    <div id="swagger-ui"></div>

    <!-- Standard Swagger UI JavaScript -->
    <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js"></script>
    <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-standalone-preset.js"></script>

    <script>
    window.onload = function() {
      // Build a system
      const ui = SwaggerUIBundle({
        url: "https://petstore.swagger.io/v2/swagger.json",
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout"
      })
      window.ui = ui
    }
    </script>

    <!-- Custom JavaScript -->
    <script src="/static/custom-swagger.js"></script>
    <script src="/static/swagger_custom.js"></script>
</body>
</html>
```

## 🔧 Configuration

You can customize the top bar by editing `custom-swagger.js`.

-   **Logo and Links**: Find the `createBlueStrip` function and modify the `stripHTML` constant to change the logo, links, and text.
-   **Export file names**: You can change the default names for exported files in the `download` attribute of the anchor tags within `stripHTML`.

The styles can be modified in `custom-swagger.css` and `swagger_custom.css`.

## 📂 File Structure

-   `custom-swagger.js`: Handles the creation of the custom top bar and its elements.
-   `custom-swagger.css`: Provides the styles for the custom top bar.
-   `swagger_custom.js`: Contains logic for advanced features like theme switching, micro-interactions, and the scroll-to-top button.
-   `swagger_custom.css`: Contains extensive styles for the dark theme, responsive design, and other UI enhancements.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
