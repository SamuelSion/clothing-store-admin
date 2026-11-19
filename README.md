# 👗 Clothing Store Admin

> An admin website for managing a clothing store's inventory, with automatic saving in the browser.  
> Built with vanilla **HTML**, **CSS** & **JavaScript** — no frameworks, no dependencies.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![LocalStorage](https://img.shields.io/badge/Storage-localStorage-blue)

> אתר ניהול מלאי לחנות בגדים: הוספה, תצוגה ומחיקה של פריטי לבוש, עם שמירה אוטומטית בדפדפן. (ממשק בעברית, RTL)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Add Items** | Type, description, color, price, discount and image URL |
| **Dynamic Table** | Built with DHTML — template literals and `innerHTML` |
| **Final Price** | Calculated automatically and color-coded by range: 🟢 up to 200 ₪ · 🔵 201–700 ₪ · 🔴 above 700 ₪ |
| **Hebrew Color Names** | The picker's hex value is converted to the closest of 16 basic colors using RGB distance |
| **Delete** | Remove an item, with a confirmation dialog |
| **Statistics** | Item count, average original price and average final price |
| **Persistent Storage** | All data saved to `localStorage` — survives closing the browser |
| **Validation** | JavaScript-only validation with clear error messages (the form uses `noValidate`) |
| **Two Pages** | Home and About, with a responsive layout and side background images on wide screens |

---

## 🖥️ Demo

Open `index.html` in any modern browser — no build step, no server required.

> To run locally: clone the repo and double-click `index.html`, or use Live Server in VS Code.

---

## 🏗️ Architecture

```
clothing-store-admin/
├── index.html      # Home page — form, table, statistics
├── about.html      # About page
├── style.css       # All styling
├── main.js         # All logic
├── images/         # Backgrounds, page images and favicon
└── README.md
```

**Separation of concerns** — markup, styling and logic are split into standalone files with zero coupling beyond standard DOM APIs.

---

## 🔧 Technical Highlights

- **DHTML** — dynamic rendering with template literals and `innerHTML`
- **localStorage** — `JSON.stringify` / `JSON.parse` for object array persistence
- **Arrays** — `push` and `splice` for adding and removing items
- **Color matching** — RGB distance to the nearest of 16 basic colors
- **Validation** — all checks in JavaScript, with the browser's native validation turned off
- **Responsive CSS** — `calc()` and media queries
- **RTL Support** — full right-to-left Hebrew interface

---

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/SamuelSion/clothing-store-admin.git

# Open
cd clothing-store-admin
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

---

## 👤 Author

**Samuel Sion** — Full Stack Development student, John Bryce · [github.com/SamuelSion](https://github.com/SamuelSion)
