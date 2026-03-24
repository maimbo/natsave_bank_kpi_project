# Natsave Bank KPI — Step-by-Step Implementation Plan

> **Audience**: Developer implementing the PHP + MySQL back-end.  
> **Project Stack**: HTML/Vue.js (CDN) front-end · PHP 8.1+ REST API · MySQL 8.0+  
> **Version**: 1.0 | **Created**: 2026-03-24

---

## Phase 0 — Environment Setup

### 0.1 Install Prerequisites
- PHP 8.1+ with extensions: `pdo_mysql`, `json`, `mbstring`, `openssl`
- MySQL 8.0+ (or MariaDB 10.6+)
- A local server (XAMPP / Laragon / native)
- Optionally: Composer (for password hashing only—no framework)

### 0.2 Project Directory Structure
```
natsave_bank_kpi/
├── api/                    ← All PHP back-end files
│   ├── config/
│   │   ├── db.php          ← PDO connection singleton
│   │   └── cors.php        ← CORS headers helper
│   ├── helpers/
│   │   ├── Response.php    ← JSON response formatter
│   │   ├── Auth.php        ← Session / token validation
│   │   └── Validator.php   ← Input sanitisation
│   ├── repositories/       ← One file per KPI domain
│   │   ├── FinancialRepo.php
│   │   ├── OperationalRepo.php
│   │   ├── QualityRepo.php
│   │   ├── RiskRepo.php
│   │   └── ComplianceRepo.php
│   ├── endpoints/          ← One file per REST resource
│   │   ├── auth.php
│   │   ├── financial.php
│   │   ├── operational.php
│   │   ├── quality.php
│   │   ├── risk.php
│   │   ├── compliance.php
│   │   ├── dashboard.php   ← Executive overview data
│   │   └── periods.php
│   └── index.php           ← Router / front-controller
├── database/
│   ├── schema.sql          ← Full schema
│   └── seed.sql            ← All INSERT...SELECT seed data
├── docs/
│   └── design/             ← Architecture documents (this folder)
├── js/
│   └── api.js              ← NEW: centralised fetch() wrapper
└── ...existing front-end files...
```

---

## Phase 1 — Database

### 1.1 Create Database & Run Schema
```bash
mysql -u root -p < database/schema.sql
```

### 1.2 Run Seed Data
Extract all INSERT blocks from `docs/design/schema_guide.md` into `database/seed.sql`, then:
```bash
mysql -u root -p natsave_kpi_db < database/seed.sql
```

### 1.3 Create Application Database User
```sql
CREATE USER 'natsave_app'@'localhost' IDENTIFIED BY 'strong_password_here';
GRANT SELECT, INSERT, UPDATE ON natsave_kpi_db.* TO 'natsave_app'@'localhost';
FLUSH PRIVILEGES;
```

---

## Phase 2 — PHP Core Infrastructure

### 2.1 `api/config/db.php` — PDO Singleton
**Purpose**: Returns a single shared PDO connection.  
**Input**: Environment constants (`DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`)  
**Output**: `PDO` instance

```php
<?php
class Database {
    private static ?PDO $instance = null;

    public static function connect(): PDO {
        if (self::$instance === null) {
            $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
            self::$instance = new PDO($dsn, DB_USER, DB_PASS, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ]);
        }
        return self::$instance;
    }
}
```

### 2.2 `api/config/cors.php` — CORS Headers
```php
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
```

### 2.3 `api/helpers/Response.php`
**Purpose**: Standardise all API responses.  
**Methods**:
- `json($data, $status = 200)` — success response
- `error($message, $status = 400)` — error response

### 2.4 `api/index.php` — Front Controller / Router
**Purpose**: Parse URL, authenticate, dispatch to endpoint.  
**Input**: `$_SERVER['REQUEST_URI']`, `$_SERVER['REQUEST_METHOD']`  
**Output**: Delegates to endpoint file

```
GET  /api/dashboard            → endpoints/dashboard.php
GET  /api/financial?period=FY2024  → endpoints/financial.php
POST /api/financial            → endpoints/financial.php (save)
GET  /api/operational          → endpoints/operational.php
POST /api/operational          → endpoints/operational.php
GET  /api/quality              → endpoints/quality.php
POST /api/quality              → endpoints/quality.php
GET  /api/risk                 → endpoints/risk.php
POST /api/risk                 → endpoints/risk.php
GET  /api/compliance           → endpoints/compliance.php
POST /api/compliance           → endpoints/compliance.php
GET  /api/periods              → endpoints/periods.php
POST /api/auth/login           → endpoints/auth.php
POST /api/auth/logout          → endpoints/auth.php
```

---

## Phase 3 — Repository Layer (Domain Logic)

Each repository class connects to the DB and isolates all SQL.

### 3.1 `api/repositories/FinancialRepo.php`

| Method | Parameters | Returns | SQL Target |
|--------|------------|---------|------------|
| `getRoaRoe($periodCode)` | `string $periodCode` | `array` | `fp_roa_roe` JOIN `reporting_periods` |
| `saveRoaRoe($data, $periodCode, $userId)` | form data, period, user | `int` insertId | INSERT/UPDATE `fp_roa_roe` |
| `getNim($periodCode)` | `string` | `array` incl. yield & cost breakdown | `fp_nim` + sub-tables |
| `saveNim($data, $periodCode, $userId)` | form data | `int` | INSERT/UPDATE `fp_nim` + sub-tables |
| `getCostIncome($periodCode)` | `string` | `array` | `fp_cost_income` |
| `saveCostIncome($data, ...)` | form data | `int` | INSERT/UPDATE |
| `getRevenue($periodCode)` | `string` | `array` incl. channel breakdown | `fp_revenue` + `fp_revenue_by_channel` |
| `saveRevenue($data, ...)` | form data | `int` | INSERT/UPDATE |
| `getFinancialTrends($metric, $periods)` | metric name, period list | `array` | `kpi_trend_snapshots` |

### 3.2 `api/repositories/OperationalRepo.php`

| Method | Returns |
|--------|---------|
| `getTransactionProcessing($periodCode)` | aggregate + channel breakdown |
| `saveTransactionProcessing($data, ...)` | `int` |
| `getBranchPerformance($periodCode)` | aggregate + per-branch detail |
| `saveBranchPerformance($data, ...)` | `int` |
| `getDigitalUsage($periodCode)` | digital channel metrics |
| `getEmployeeProductivity($periodCode)` | productivity + computed metrics |

### 3.3 `api/repositories/QualityRepo.php`

| Method | Returns |
|--------|---------|
| `getCsat($periodCode)` | CSAT scores + promoter breakdown |
| `getNps($periodCode)` | NPS score + segment scores |
| `getServiceQuality($periodCode)` | SLA, FCR, error rate |
| `getComplaintResolution($periodCode)` | aggregate + complaint types |

### 3.4 `api/repositories/RiskRepo.php`

| Method | Returns |
|--------|---------|
| `getCreditRisk($periodCode)` | NPL ratio + sector breakdown |
| `getMarketRisk($periodCode)` | VaR, FX positions |
| `getOperationalRisk($periodCode)` | loss events detail |
| `getLiquidityRisk($periodCode)` | LCR, NSFR, LDR |

### 3.5 `api/repositories/ComplianceRepo.php`

| Method | Returns |
|--------|---------|
| `getBozRegulations($periodCode)` | CAR, tier ratios |
| `getAmlCft($periodCode)` | KYC compliance + segment breakdown |
| `getDataProtection($periodCode)` | breach & request counts |
| `getAuditCompliance($periodCode)` | findings + department detail |

---

## Phase 4 — API Endpoints

### 4.1 `GET /api/dashboard?period=FY2024`
**Purpose**: Power the Executive Overview page (`index.html`).  
**Response structure**:
```json
{
  "period": "FY2024",
  "financial": { "roa": 1.16, "nim": 6.8, "cir": 56.3, "revenue": 1030000000 },
  "operational": { "txn_success_rate": 99.8, "digital_pct": 65.0 },
  "quality": { "csat": 4.2, "nps": 42 },
  "risk": { "npl_ratio": 5.2, "lcr": 145.0 },
  "compliance": { "car": 18.5, "kyc_pct": 98.5 },
  "revenue_trend": [ { "month": "Jan", "total": 82000000 }, ... ]
}
```

### 4.2 `GET /api/financial?kpi=roa_roe&period=FY2024`
**Purpose**: Power individual financial dashboard pages.  
**Response**: Full DASHBOARD_DATA-compatible object replacing `js/dashboard-data.js` mock

### 4.3 `POST /api/financial`
**Purpose**: Save data from the Data Capture form.  
**Input (JSON body)**:
```json
{
  "kpi": "roa_roe",
  "period": "FY2024",
  "netIncome": 145200000,
  "totalAssets": 12550000000,
  "totalLiabilities": 10900000000,
  "shEquity": 1650000000
}
```
**Output**: `{ "success": true, "message": "Saved", "id": 5 }`

*(Repeat same pattern for `/api/operational`, `/api/quality`, `/api/risk`, `/api/compliance`)*

---

## Phase 5 — Front-End Integration

### 5.1 Create `js/api.js`
Central fetch wrapper consumed by all pages.
```js
const API_BASE = '/api';

const KpiApi = {
    async get(endpoint, params = {}) {
        const url = new URL(API_BASE + endpoint, window.location.origin);
        Object.entries(params).forEach(([k,v]) => url.searchParams.set(k, v));
        const res = await fetch(url);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },
    async post(endpoint, body) {
        const res = await fetch(API_BASE + endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        return res.json();
    }
};
```

### 5.2 Update `index.html` — Executive Dashboard
- Replace `MOCK_DATA` loading in Vue `mounted()` with:
  ```js
  const data = await KpiApi.get('/dashboard', { period: this.filters.year });
  this.dashboard = data;
  ```
- Update save buttons to call `KpiApi.post('/financial', formData)`

### 5.3 Update Each Sub-Dashboard (`dashboards/*.html`)
- Replace `DASHBOARD_DATA[key]` init with:
  ```js
  const category = this.getDashboardKey();
  this.dashboard = await KpiApi.get(`/financial`, { kpi: category, period: 'FY2024' });
  ```

### 5.4 Add `js/api.js` script tag to all pages
```html
<script src="../js/api.js"></script>
```

---

## Phase 6 — Authentication

### 6.1 `POST /api/auth/login`
- Verify `username` + `password` against `users` table (PHP `password_verify()`)
- On success: create PHP session, return `{ "user": {...}, "token": "..." }`
- On fail: return `401`

### 6.2 Protect Write Endpoints
All `POST` endpoints call `Auth::requireLogin()` which checks session/token:
```php
Auth::requireLogin(); // throws 401 if not authenticated
```

### 6.3 Login Page
Create `login.html` → redirects to `index.html` on success.

---

## Phase 7 — Audit Trail

On every successful INSERT/UPDATE call `AuditLogger::log()`:
```php
AuditLogger::log($pdo, $userId, 'UPDATE', 'fp_roa_roe', $recordId, $old, $new, $_SERVER['REMOTE_ADDR']);
```
Inserts a row into `audit_log` with JSON `old_values` / `new_values`.

---

## Phase 8 — Testing Checklist

- [ ] `GET /api/periods` returns list of periods
- [ ] `GET /api/dashboard?period=FY2024` returns correct dashboard data
- [ ] `POST /api/financial` saves data and `GET` returns updated values
- [ ] Page refresh shows saved data (not mock data)
- [ ] Unauthenticated POST returns 401
- [ ] `audit_log` table receives a row on every save
- [ ] All 20 dashboard pages load data from API 

---

## Implementation Order Summary

| Order | Task | File(s) |
|-------|------|---------|
| 1 | DB Setup | `database/schema.sql`, `database/seed.sql` |
| 2 | PDO Connection | `api/config/db.php`, `api/config/cors.php` |
| 3 | Helpers | `api/helpers/Response.php`, `Auth.php`, `Validator.php` |
| 4 | Router | `api/index.php` |
| 5 | Financial Repo + Endpoint | `FinancialRepo.php`, `endpoints/financial.php` |
| 6 | Dashboard Endpoint | `endpoints/dashboard.php` |
| 7 | Front-end `api.js` | `js/api.js` |
| 8 | Update `index.html` | Replace mock data calls |
| 9 | Update 20 dashboard HTMLs | Replace `DASHBOARD_DATA` |
| 10 | Remaining Repos + Endpoints | Operational, Quality, Risk, Compliance |
| 11 | Authentication | `endpoints/auth.php`, `login.html` |
| 12 | Audit Trail | `AuditLogger.php` |
| 13 | End-to-end Testing | All 20 dashboards + data entry |
