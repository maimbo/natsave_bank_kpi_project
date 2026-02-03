# Natsave Bank KPI - Project Context

## Overview
This project is a high-fidelity **HTML/CSS/Vue.js (CDN)** port of a React-based KPI dashboard for Natsave Bank. The goal was to create a lightweight, static-ready version of the application that requires no build process and can run directly in a browser.

## Core Objectives
1.  **Zero Build Step**: Run directly from `index.html`.
2.  **High Fidelity**: Maintain the "Premium" look and feel of the original design.
3.  **Interactivity**: Support drill-downs, filtering, and data entry simulation using Vue.js for reactivity.
4.  **Static Deployment**: Ready for GitHub Pages or any static web host.

## Current State
The application is feature-complete in terms of structure and layout.
-   **Main Dashboard**: `index.html` provides the executive overview.
-   **Detailed Views**: 20 sub-dashboard HTML files in `dashboards/` offer granular analysis.
-   **Data Entry**: A functional simulated data entry form exists within the main view.

## Usage
Simply open `index.html` in any browser. Internet access is required for CDN dependencies (Vue.js, ApexCharts, Lucide Icons, Fonts).
