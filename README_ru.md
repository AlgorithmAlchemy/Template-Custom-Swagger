# Шаблон кастомного Swagger UI

[🇬🇧 Read in English](README.md)

Шаблон для кастомизации стандартного Swagger UI. Он заменяет стандартную верхнюю панель на настраиваемую, брендированную, а также добавляет такие возможности, как экспорт спецификации API, тёмная тема и улучшенные микро-взаимодействия.

![Скриншот кастомного Swagger UI](https://user-images.githubusercontent.com/12345/some-image.png)

## ✨ Возможности

* **Брендированная верхняя панель**: легко добавить логотип компании, свои ссылки и контактную информацию.
* **Экспорт спецификации API**: кнопки для выгрузки API-описания в форматах `JSON` и `YAML`, `PDF`.
* **Тёмная тема**: современная тёмная тема для всего интерфейса, которую пользователь может включать и выключать.
* **Адаптивный дизайн**: интерфейс полностью адаптивен и корректно отображается на мобильных устройствах.
* **Улучшенные микро-взаимодействия**: плавные анимации, эффекты нажатия кнопок и кнопка «наверх» для удобства работы.
* **Простая интеграция**: достаточно подключить CSS и JavaScript файлы в существующем Swagger UI.

## 🚀 Начало работы

### Требования

Необходимо иметь работающий Swagger UI. Этот шаблон рассчитан на использование поверх стандартного Swagger UI.

### Установка

1. Клонируйте репозиторий или скачайте файлы.
2. Скопируйте следующие файлы в директорию статических ресурсов вашего веб-сервера, где размещён Swagger UI:

   * `custom-swagger.css`
   * `custom-swagger.js`
   * `swagger_custom.css`
   * `swagger_custom.js`

### Использование

В HTML-файле, который подключает Swagger UI, добавьте ссылки на кастомные CSS и JavaScript. Подключать их нужно **после** официальных файлов Swagger UI.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My API Docs</title>
    <!-- Стандартный Swagger UI CSS -->
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@3/swagger-ui.css">

    <!-- Кастомные CSS -->
    <link rel="stylesheet" type="text/css" href="/static/custom-swagger.css">
    <link rel="stylesheet" type="text/css" href="/static/swagger_custom.css">
</head>

<body>
    <div id="swagger-ui"></div>

    <!-- Стандартный Swagger UI JavaScript -->
    <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js"></script>
    <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-standalone-preset.js"></script>

    <script>
    window.onload = function() {
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

    <!-- Кастомные JavaScript -->
    <script src="/static/custom-swagger.js"></script>
    <script src="/static/swagger_custom.js"></script>
</body>
</html>
```

## 🔧 Настройка

Настроить верхнюю панель можно в файле `custom-swagger.js`.

* **Логотип и ссылки**: найдите функцию `createBlueStrip` и измените константу `stripHTML`, чтобы заменить логотип, ссылки и текст.
* **Имена экспортируемых файлов**: их можно поменять в атрибуте `download` тегов `<a>` внутри `stripHTML`.

Стили меняются в `custom-swagger.css` и `swagger_custom.css`.

## 📂 Структура проекта

* `custom-swagger.js`: создаёт кастомную верхнюю панель и её элементы.
* `custom-swagger.css`: стили для верхней панели.
* `swagger_custom.js`: логика для дополнительных возможностей — переключение темы, микро-взаимодействия, кнопка «наверх».
* `swagger_custom.css`: стили для тёмной темы, адаптивности и UI-улучшений.

## 🤝 Вклад

Любые улучшения приветствуются! Отправляйте Pull Request.

## 📄 Лицензия

Проект распространяется под лицензией MIT — см. файл [LICENSE.md](LICENSE.md).
