# Pending Tasks & Future Work

## Critical Priority 🔴

### Data Entry & Capture Forms
**Impact**: High | **Effort**: High

- [ ] Create dedicated data entry forms for **11 dashboards** currently missing them
  - Operational: Transaction Processing, Branch Performance, Digital Usage, Employee Productivity
  - Quality: Service Quality, Complaint Resolution
  - Risk: Credit Risk, Market Risk, Operational Risk, Liquidity Risk
  
- [ ] Enhance generic forms for **9 dashboards** using basic tabs
  - Add dashboard-specific fields
  - Implement proper validation

**See**: `DATA_ENTRY_STATUS.md` for detailed breakdown.

---

## High Priority 🟡

### Navigation & UX
- [ ] Comprehensive link verification (all sidebar links on all pages)
- [ ] Breadcrumb consistency check across sub-dashboards
- [ ] Add "Edit Data" buttons on dashboard view pages linking to their entry forms

### Data Persistence
- [ ] Implement localStorage or backend API for data saves
- [ ] Add export/import functionality for captured data

---

## Medium Priority 🟢

### Mobile & Responsive Design
- [ ] Optimize data tables for small screens
- [ ] Test sidebar collapse/expand on mobile
- [ ] Ensure charts render properly on tablets

### Additional Features
- [ ] Implement actual filtering logic (currently visual only)
- [ ] Add date range pickers for historical data views
- [ ] Create print-friendly CSS for reports

---

## Low Priority 🔵

### Documentation
- [ ] Add inline code comments to `app.js` and `dashboard-data.js`
- [ ] Create video walkthrough for user training
- [ ] Write deployment guide for various hosting platforms

### Performance
- [ ] Lazy-load ApexCharts on demand
- [ ] Minify CSS and JS for production
- [ ] Add service worker for offline capability

---

## Completed ✅
- [x] Fix HTML title tags across all dashboards
- [x] Create Reports placeholder page
- [x] Create comprehensive documentation in `docs/`
- [x] Port React version to Vue.js/HTML
