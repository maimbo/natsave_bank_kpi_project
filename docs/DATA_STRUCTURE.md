# Data Structure & Models

The application uses two primary data sources, both implemented as global JavaScript objects.

## 1. Executive Data (`js/data.js`)
Used by `index.html`.
*   **Variable**: `MOCK_DATA`
*   **Structure**:
    ```json
    {
      "dashboard": {
        "nim": { "value": 6.8, "trend": "up", ... },
        "active_customers": { ... },
        "compliance_score": { ... },
        "revenue_trend": [ ... ] // Chart data
      },
      "roa": [ ... ] // Sheet/Modal detailed data
    }
    ```

## 2. Detailed Dashboard Data (`js/dashboard-data.js`)
Used by files in `dashboards/`.
*   **Variable**: `DASHBOARD_DATA`
*   **Access Pattern**: Pages look up their specific data key (e.g., `roa_roe`) based on the URL or hardcoded logic.
*   **Structure**:
    ```json
    {
      "roa_roe": {
        "title": "Return on Assets",
        "category": "Financial Performance",
        "kpis": [ ... ],
        "trendData": { ... },
        "breakdown": [ ... ]
      },
      "transaction_processing": { ... },
      ...
    }
    ```

## Data Flow
-   **Read**: Vue components read directly from these global objects on `mounted()`.
-   **Write**: The "Data Entry" form in `index.html` simulates writing by updating local Vue state, but changes **are not persisted** to the file system or a backend.
