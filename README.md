# 👗 Clothing Store Admin

A small admin website for managing a clothing store's inventory, built with plain **HTML, CSS and JavaScript** (no frameworks) as part of the Full Stack Development course at John Bryce.

> אתר ניהול מלאי לחנות בגדים: הוספה, תצוגה ומחיקה של פריטי לבוש, עם שמירה אוטומטית בדפדפן. (ממשק בעברית, RTL)

## Features

- **Add items** with type, description, color, price, discount and image URL
- **Dynamic table** built with DHTML (template literals + `innerHTML`)
- **Final price** calculated automatically, color-coded by range:
  - 🟢 up to 200 ₪ &nbsp;|&nbsp; 🔵 201–700 ₪ &nbsp;|&nbsp; 🔴 above 700 ₪
- **Color names in Hebrew** - the color picker's hex value is converted to the closest of 16 basic colors using RGB distance
- **Delete items** with a confirmation dialog
- **Statistics** - item count, average original price and average final price
- **Persistence** with `localStorage` - data survives closing the browser
- **JavaScript-only validation** with clear error messages (the form uses `noValidate`)
- **Two pages** - home and about, with a responsive layout and side background images on wide screens

## Concepts Practiced

DOM manipulation, template literals, arrays (`push`, `splice`), `JSON.stringify` / `JSON.parse`, `localStorage`, form handling, event handling, input validation, responsive CSS (`calc()`, media queries).

## Project Structure

```
clothing-store/
├── index.html      # Home page - form, table, statistics
├── about.html      # About page
├── style.css       # All styling
├── main.js         # All logic
└── images/         # Backgrounds, page images and favicon
```

## Run Locally

No installation needed. Download or clone the repository and open `index.html` in a browser.

## Author

**Samuel Sion** - Full Stack Development student
