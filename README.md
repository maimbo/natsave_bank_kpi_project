# Natsave Dashboard Prototype (Vue/HTML)

A lightweight, static implementation of the Natsave Bank KPI Dashboard using Vue.js (CDN), plain HTML, and CSS.

## 🚀 Quick Start
**New to this project?** Read [`GETTING_STARTED.md`](GETTING_STARTED.md) first.

**For comprehensive documentation**, see the [`docs/`](docs/) folder.

## Features
- **Executive Dashboard**: Real-time view of ROA, NIM, Active Customers, and Compliance.
- **Interactive Drill-downs**: Click on any KPI card to view detailed breakdowns (Level 2 & Level 3 data).
- **Revenue Analytics**: Interactive bar chart with click-to-detail functionality.
- **Global Filtering**: Filter data by Financial Year and Period (Q1-Q4).
- **Data Capture Module**: Dedicated interface for manual entry of monthly metrics.

## Tech Stack
- **Vue.js 3** (via CDN): Reactive UI logic.
- **ApexCharts** (via CDN): Data visualization.
- **Lucide Icons**: Scalable vector icons.
- **Vanilla CSS**: Custom styling with CSS variables for branding.

## Setup & Running
No build process is required.
1. Simply open `index.html` in any modern web browser.
2. Ensure you have an internet connection to load the CDN libraries.

## Deployment
This project is static-ready. You can deploy it to:
- GitHub Pages
- Netlify (Drag & Drop)
- Vercel
- Any web server

## Project Structure
- `index.html`: Main entry point and layout.
- `css/styles.css`: All styling, including Natsave corporate theme.
- `js/app.js`: Main Vue application logic.
- `js/data.js`: Mock data repository.
- `dashboards/`: Individual KPI dashboard pages (20 files).
- `docs/`: Comprehensive project documentation.
- `assets/`: Images and static resources.

## ⚠️ Known Gap
The project has 20 dashboard VIEW pages but lacks complete data entry forms. See [`docs/DATA_ENTRY_STATUS.md`](docs/DATA_ENTRY_STATUS.md) for details.

