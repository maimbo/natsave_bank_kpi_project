# Style Guide & Design System

## Color Palette (CSS Variables)
Defined in `:root` of `css/styles.css`.

| Variable | Hex | Description |
| :--- | :--- | :--- |
| `--primary` | `#00AE57` | Natsave Jade (Brand Primary) |
| `--secondary` | `#0F5132` | Natsave Jewel (Brand Secondary/Dark) |
| `--accent` | `#FFD700` | Gold (Highlights) |
| `--background` | `#F8FAFC` | Page Background (Light Blue-Grey) |
| `--card-bg` | `#FFFFFF` | Card Background |
| `--text-primary` | `#1E293B` | Main Text |
| `--text-secondary`| `#64748B` | Subtitles / Muted Text |

## Typography
-   **Family**: Inter (Google Fonts)
-   **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

## Layout Components
-   **Sidebar**: Fixed width (`260px`), dark theme.
-   **Cards**: White background, slight shadow, rounded corners (`12px`).
-   **Badges**: Pill-shaped, used for status indicators.

## Icons
-   Library: **Lucide Icons**
-   Usage: `<i data-lucide="icon-name"></i>`
-   Initialization: `lucide.createIcons()` must be called after DOM updates.
