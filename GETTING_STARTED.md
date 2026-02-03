# Getting Started - Natsave Bank KPI

## For AI Agents / Future Developers

### Quick Context
This is a **Vue.js (CDN) + HTML/CSS** KPI dashboard for Natsave Bank. It's a port from React with **no build process** - just open HTML files.

### First Steps
1. **Read the docs**: Start with [`docs/README.md`](docs/README.md)
2. **Check current status**: Read [`docs/ROADMAP.md`](docs/ROADMAP.md)
3. **Priority work**: See [`docs/DATA_ENTRY_STATUS.md`](docs/DATA_ENTRY_STATUS.md)

### Running Locally
```bash
# No installation needed!
# Just open in browser:
start index.html
# or
open index.html
```

Internet connection required for CDN libraries (Vue.js, ApexCharts, Lucide Icons).

### Project Structure at a Glance
```
natsave_bank_kpi/
├── index.html              # Main dashboard
├── reports.html            # Reports placeholder
├── css/styles.css          # All styling
├── js/
│   ├── app.js             # Main Vue app
│   ├── data.js            # Executive data
│   └── dashboard-data.js  # Detailed dashboard data
├── dashboards/            # 20 KPI view pages
└── docs/                  # YOU ARE HERE
```

### Critical Information
⚠️ **Data Entry Gap**: We have 20 dashboard VIEW pages but only 1 generic data entry form.
- 11 dashboards have NO data entry
- This is the **#1 priority** for development

See [`docs/DATA_ENTRY_STATUS.md`](docs/DATA_ENTRY_STATUS.md) for the complete breakdown.

### Tech Stack
- **No Framework**: Pure HTML files
- **Reactivity**: Vue.js 3 (CDN)
- **Charts**: ApexCharts (CDN)
- **Icons**: Lucide (CDN)
- **Styling**: Vanilla CSS with CSS variables

### Making Changes
1. Edit HTML/CSS/JS files directly
2. Refresh browser to see changes
3. Test on `index.html` and 2-3 dashboard pages
4. Check mobile view (responsive but not fully optimized)

### Key Files to Understand
- `css/styles.css` - All design tokens, theme variables
- `js/dashboard-data.js` - Data structure for all 20 dashboards
- `dashboards/roa-roe.html` - Template for dashboard pages (they're all similar)

### Common Tasks
**Add a new KPI dashboard:**
1. Add data to `js/dashboard-data.js`
2. Copy `dashboards/roa-roe.html` → rename
3. Update title and breadcrumbs
4. Add link in sidebar navigation

**Create a data entry form:**
1. See existing form in `index.html` (lines ~330-460)
2. Create new HTML file or add to existing
3. Connect to dashboard view page

### Testing Checklist
- [ ] Open in Chrome/Edge/Firefox
- [ ] Click all sidebar links
- [ ] Test drill-down modals on index.html
- [ ] Check charts render
- [ ] Test responsive view (mobile)

### Need Help?
All documentation is in `docs/`. If something is unclear, update the relevant doc file to help the next person.
