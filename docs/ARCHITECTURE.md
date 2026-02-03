# Architecture & Tech Stack

## Technology Stack
-   **Core**: Vanilla HTML5
-   **Styling**: Vanilla CSS3 (Custom properties for theming, Flexbox/Grid for layout). No external CSS frameworks (like Bootstrap) are used.
-   **Logic**: Vue.js 3 (Global Build via CDN). Used for state management, DOM rendering, and interactivity.
-   **Visualization**: ApexCharts (via CDN).
-   **Icons**: Lucide Icons (via CDN).

## File Structure
```
c:/sc.saas/natsave_bank_kpi/
├── index.html              # Entry point (Executive Dashboard + Data Entry)
├── css/
│   └── styles.css          # Global styles, variables, and component classes
├── js/
│   ├── app.js              # Logic for index.html (Vue app instance)
│   ├── data.js             # Mock data for index.html
│   └── dashboard-data.js   # Detailed data used by sub-dashboards
├── dashboards/             # Individual HTML files for detailed KPI views
│   ├── roa-roe.html
│   ├── nim.html
│   └── ... (20 files total)
├── assets/                 # Static images
└── docs/                   # Documentation (You are here)
```

## Key Patterns
-   **Shared CSS**: All pages link to `../css/styles.css`.
-   **Vue Instances**: Each HTML file creates its own Vue app instance. `index.html` uses `js/app.js`, while sub-dashboards use inline scripts or specific logic files.
-   **Navigation**: Sidebar navigation is hardcoded in HTML but uses consistent classes. Active state is managed via Vue or CSS classes.
-   **Data Loading**: Data is loaded from global objects (`MOCK_DATA`, `DASHBOARD_DATA`) defined in the JS files. There is no backend API; it is a simulation.
