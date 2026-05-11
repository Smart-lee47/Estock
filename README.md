# 📦 Estock — Inventory Management System

A front-end warehouse management website built with HTML, CSS, and JavaScript.  
Developed as a demo inventory management system project to demonstrate web development skills.

---

## 🌐 Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Landing page with hero, services, and warehouse overview |
| Warehouses | `warehouses.html` | Detailed view of all 5 warehouses |
| Services | `services.html` | Full breakdown of all 6 services offered |
| Register | `signup.html` | Company registration form |
| Dashboard | `dashboard.html` | Client inventory management dashboard |
| Admin Login | `admin-login.html` | Restricted login page for administrators |
| Admin Panel | `admin.html` | Full report of all companies and products |
| About | `about.html` | Project information and tech stack |

---

## 🏭 The 5 Warehouses

| Warehouse | Type | Capacity |
|-----------|------|----------|
| Warehouse A | General Storage | 240 slots |
| Warehouse B | Cold Storage | 180 slots |
| Warehouse C | Bulk Storage | 300 slots |
| Warehouse D | Secure Storage | 120 slots |
| Warehouse E | Logistics Hub | 360 slots |

---

## ⚙️ Services

- Warehousing
- Stock Control
- Cold Chain Management
- Logistics & Distribution
- Security & Surveillance
- Bulk Storage

---

## 🚀 How to Run

1. Clone or download this repository
2. Make sure `warehouse.png` is in the root folder (used as the background image)
3. Open `index.html` in any modern browser
4. No server or installation required — runs entirely in the browser

---

## 🔐 Admin Credentials

```
Email    : admin@stockish.com
Password : Stockish@Admin2026
```
---
## 🗂️ File Structure

```
stockish/
├── index.html
├── warehouses.html
├── services.html
├── signup.html
├── dashboard.html
├── admin-login.html
├── admin.html
├── about.html
├── style.css
├── script.js
├── logo1.svg
├── favicon.svg
├── warehouse.png
└── README.md
```

---

## 💾 Data Storage

All data is stored in the browser using **localStorage** — no backend or database required.

| Key | What it stores |
|-----|----------------|
| `stockish_companies` | All registered companies |
| `stockish_current_company` | The currently active company |
| `stockish_products` | All products across all companies |
| `stockish_admin_logged_in` | Admin session state |

---

## 🛠️ Tech Stack

- **HTML5** — Page structure and content
- **CSS3** — Styling, glass morphism effects, responsive layout
- **JavaScript** — DOM manipulation, localStorage, form validation, regex
- **Inter** — Typography (installed locally)

---

## ✅ Key Features

- Company registration with full form validation (email & password regex)
- Live inventory dashboard — add and delete products in real time
- Stat cards showing total products and stock count
- Admin panel protected by login — shows all companies and products
- Data persists across page refreshes using localStorage
- Responsive layout using CSS Grid and Flexbox
- Glass morphism UI with parallax background effect

---

## 📝 Validation Rules

- **Email** — must contain `@`, a domain name, and end with `.com`, `.net`, `.org`, or `.rw`
- **Password** — minimum **16 characters**

---

*© 2026 Estock |Inventory management system 