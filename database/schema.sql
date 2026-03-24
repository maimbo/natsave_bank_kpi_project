-- ============================================================
-- Natsave Bank KPI Dashboard - Complete Database Schema
-- Version: 1.0
-- Created: 2026-03-24
-- Description: Full relational schema for all 5 KPI categories,
--              trend data, data capture, users, and audit trails.
-- ============================================================

CREATE DATABASE IF NOT EXISTS natsave_kpi_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE natsave_kpi_db;

-- ============================================================
-- 1. LOOKUP / REFERENCE TABLES
-- ============================================================

-- Reporting periods (fiscal years & quarters)
CREATE TABLE reporting_periods (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    period_code VARCHAR(10) NOT NULL UNIQUE,  -- e.g. 'FY2024', 'FY2024-Q1'
    period_type ENUM('ANNUAL','QUARTERLY','MONTHLY') NOT NULL,
    fiscal_year YEAR NOT NULL,
    quarter     TINYINT NULL,                  -- 1-4, NULL for annual/monthly
    month       TINYINT NULL,                  -- 1-12, NULL for annual/quarterly
    start_date  DATE NOT NULL,
    end_date    DATE NOT NULL,
    is_active   TINYINT(1) DEFAULT 1,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- KPI categories (Financial Performance, Operational Efficiency, etc.)
CREATE TABLE kpi_categories (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    code        VARCHAR(50) NOT NULL UNIQUE,   -- e.g. 'financial', 'operational'
    name        VARCHAR(100) NOT NULL,
    icon        VARCHAR(50),                   -- Lucide icon name
    sort_order  INT DEFAULT 0,
    is_active   TINYINT(1) DEFAULT 1
);

-- Insert initial categories
INSERT INTO kpi_categories (code, name, icon, sort_order) VALUES
    ('financial',    'Financial Performance',    'dollar-sign',    1),
    ('operational',  'Operational Efficiency',   'gauge',          2),
    ('quality',      'Quality & Experience',     'heart-handshake',3),
    ('risk',         'Risk Management',          'shield-alert',   4),
    ('compliance',   'Compliance',               'shield-check',   5);


-- KPI sub-categories (dashboards)
CREATE TABLE kpi_dashboards (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    category_id   INT NOT NULL,
    code          VARCHAR(50) NOT NULL UNIQUE,  -- e.g. 'roa_roe', 'nim'
    title         VARCHAR(150) NOT NULL,
    description   TEXT,
    html_file     VARCHAR(100),                 -- e.g. 'roa-roe.html'
    icon          VARCHAR(50),
    sort_order    INT DEFAULT 0,
    is_active     TINYINT(1) DEFAULT 1,
    FOREIGN KEY (category_id) REFERENCES kpi_categories(id)
);

INSERT INTO kpi_dashboards (category_id, code, title, description, html_file, icon, sort_order) VALUES
    -- Financial Performance
    (1, 'roa_roe',              'Return on Assets & Equity',    'Profitability performance analysis',               'roa-roe.html',              'trending-up',   1),
    (1, 'nim',                  'Net Interest Margin',          'Interest income efficiency and spread analysis',   'nim.html',                  'percent',       2),
    (1, 'cost_income',          'Cost-to-Income Ratio',         'Operational efficiency and expense management',    'cost-income.html',          'calculator',    3),
    (1, 'revenue',              'Revenue Analysis',             'Comprehensive revenue streams and growth',         'revenue.html',              'bar-chart-3',   4),
    -- Operational Efficiency
    (2, 'transaction_processing','Transaction Processing',      'Transaction volumes, success rates, and speed',   'transaction-processing.html','zap',          1),
    (2, 'branch_performance',   'Branch Performance',           'Branch network efficiency and footfall',           'branch-performance.html',   'building-2',    2),
    (2, 'digital_usage',        'Digital Channel Usage',        'Adoption of digital banking platforms',            'digital-usage.html',        'smartphone',    3),
    (2, 'employee_productivity','Employee Productivity',        'Staff performance metrics and efficiency',         'employee-productivity.html','users-round',   4),
    -- Quality & Experience
    (3, 'customer_satisfaction','Customer Satisfaction (CSAT)', 'Customer satisfaction scores across touchpoints',  'customer-satisfaction.html','smile',         1),
    (3, 'nps',                  'Net Promoter Score (NPS)',     'Customer loyalty and likelihood to recommend',     'nps.html',                  'award',         2),
    (3, 'service_quality',      'Service Quality',              'Service level agreement adherence and standards',  'service-quality.html',      'star',          3),
    (3, 'complaint_resolution', 'Complaint Resolution',         'Efficiency in handling customer grievances',       'complaint-resolution.html', 'message-square',4),
    -- Risk Management
    (4, 'credit_risk',          'Credit Risk',                  'Loan portfolio quality and default risk',          'credit-risk.html',          'credit-card',   1),
    (4, 'market_risk',          'Market Risk',                  'Exposure to interest rate and FX fluctuations',    'market-risk.html',          'trending-down', 2),
    (4, 'operational_risk',     'Operational Risk',             'Risk of loss from failed processes or systems',    'operational-risk.html',     'alert-triangle',3),
    (4, 'liquidity_risk',       'Liquidity Risk',               'Ability to meet short and long-term obligations',  'liquidity-risk.html',       'droplet',       4),
    -- Compliance
    (5, 'boz_regulations',      'BoZ Regulations',              'Bank of Zambia regulatory compliance status',      'boz-regulations.html',      'landmark',      1),
    (5, 'aml_cft',              'AML / CFT',                    'Anti-Money Laundering and Counter Terrorist Financing','aml-cft.html',          'shield-ban',    2),
    (5, 'data_protection',      'Data Protection',              'Data privacy and DPA compliance',                  'data-protection.html',      'lock',          3),
    (5, 'audit_compliance',     'Audit Compliance',             'Internal and external audit finding closure',      'audit-compliance.html',     'clipboard-check',4);


-- ============================================================
-- 2. FINANCIAL PERFORMANCE TABLES
-- ============================================================

-- ROA & ROE: core P&L and balance sheet inputs
CREATE TABLE fp_roa_roe (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    period_id           INT NOT NULL,
    net_income          DECIMAL(18,2) NOT NULL,         -- ZMW
    total_assets        DECIMAL(18,2) NOT NULL,         -- ZMW
    total_liabilities   DECIMAL(18,2) NOT NULL,         -- ZMW
    shareholders_equity DECIMAL(18,2) NOT NULL,         -- ZMW
    operating_income    DECIMAL(18,2),                  -- ZMW
    -- Calculated fields (stored for reporting speed)
    roa_percentage      DECIMAL(8,4) GENERATED ALWAYS AS (ROUND((net_income / total_assets) * 100, 4)) STORED,
    roe_percentage      DECIMAL(8,4) GENERATED ALWAYS AS (ROUND((net_income / shareholders_equity) * 100, 4)) STORED,
    equity_multiplier   DECIMAL(8,4) GENERATED ALWAYS AS (ROUND(total_assets / shareholders_equity, 4)) STORED,
    target_roa          DECIMAL(8,4) DEFAULT 1.20,
    target_roe          DECIMAL(8,4) DEFAULT 15.00,
    notes               TEXT,
    captured_by         INT,
    captured_at         DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_period (period_id),
    FOREIGN KEY (period_id) REFERENCES reporting_periods(id)
);

-- Net Interest Margin inputs
CREATE TABLE fp_nim (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    period_id           INT NOT NULL,
    interest_income     DECIMAL(18,2) NOT NULL,         -- ZMW
    interest_expense    DECIMAL(18,2) NOT NULL,         -- ZMW
    earning_assets      DECIMAL(18,2) NOT NULL,         -- ZMW: interest-earning assets
    total_liabilities   DECIMAL(18,2),                  -- ZMW
    -- Net Interest Income
    net_interest_income DECIMAL(18,2) GENERATED ALWAYS AS (ROUND(interest_income - interest_expense, 2)) STORED,
    -- NIM calculation
    nim_percentage      DECIMAL(8,4) GENERATED ALWAYS AS (ROUND(((interest_income - interest_expense) / earning_assets) * 100, 4)) STORED,
    target_nim          DECIMAL(8,4) DEFAULT 7.00,
    notes               TEXT,
    captured_by         INT,
    captured_at         DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_period (period_id),
    FOREIGN KEY (period_id) REFERENCES reporting_periods(id)
);

-- NIM yield & cost breakdown by instrument
CREATE TABLE fp_nim_yield_breakdown (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    nim_id              INT NOT NULL,
    instrument_name     VARCHAR(100) NOT NULL,           -- e.g. 'Loans & Advances'
    yield_percentage    DECIMAL(8,4),
    volume              DECIMAL(18,2),
    FOREIGN KEY (nim_id) REFERENCES fp_nim(id) ON DELETE CASCADE
);

CREATE TABLE fp_nim_cost_breakdown (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    nim_id              INT NOT NULL,
    funding_source      VARCHAR(100) NOT NULL,           -- e.g. 'Customer Deposits'
    cost_percentage     DECIMAL(8,4),
    volume              DECIMAL(18,2),
    FOREIGN KEY (nim_id) REFERENCES fp_nim(id) ON DELETE CASCADE
);

-- Cost-to-Income Ratio inputs
CREATE TABLE fp_cost_income (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    period_id               INT NOT NULL,
    operating_income        DECIMAL(18,2) NOT NULL,         -- ZMW
    operating_expenses      DECIMAL(18,2) NOT NULL,         -- ZMW
    -- Staff cost breakdown
    staff_costs             DECIMAL(18,2),
    infrastructure_it_costs DECIMAL(18,2),
    marketing_costs         DECIMAL(18,2),
    other_operating_costs   DECIMAL(18,2),
    -- Calculated
    cir_percentage          DECIMAL(8,4) GENERATED ALWAYS AS (ROUND((operating_expenses / operating_income) * 100, 4)) STORED,
    efficiency_ratio        DECIMAL(8,4) GENERATED ALWAYS AS (ROUND((operating_income / operating_expenses) * 100, 4)) STORED,
    target_cir              DECIMAL(8,4) DEFAULT 55.00,
    notes                   TEXT,
    captured_by             INT,
    captured_at             DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_period (period_id),
    FOREIGN KEY (period_id) REFERENCES reporting_periods(id)
);

-- Revenue Analysis
CREATE TABLE fp_revenue (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    period_id           INT NOT NULL,
    interest_revenue    DECIMAL(18,2) NOT NULL,         -- ZMW: net interest income
    fee_commission      DECIMAL(18,2) NOT NULL,         -- ZMW
    other_income        DECIMAL(18,2) NOT NULL,         -- ZMW
    -- Calculated
    total_revenue       DECIMAL(18,2) GENERATED ALWAYS AS (ROUND(interest_revenue + fee_commission + other_income, 2)) STORED,
    target_total        DECIMAL(18,2),
    notes               TEXT,
    captured_by         INT,
    captured_at         DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_period (period_id),
    FOREIGN KEY (period_id) REFERENCES reporting_periods(id)
);

-- Revenue by channel breakdown
CREATE TABLE fp_revenue_by_channel (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    revenue_id      INT NOT NULL,
    channel_name    VARCHAR(100) NOT NULL,  -- e.g. 'Branch Banking'
    amount          DECIMAL(18,2) NOT NULL,
    FOREIGN KEY (revenue_id) REFERENCES fp_revenue(id) ON DELETE CASCADE
);


-- ============================================================
-- 3. OPERATIONAL EFFICIENCY TABLES
-- ============================================================

-- Transaction Processing
CREATE TABLE oe_transaction_processing (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    period_id               INT NOT NULL,
    total_transactions      BIGINT NOT NULL,
    successful_transactions BIGINT NOT NULL,
    failed_transactions     BIGINT GENERATED ALWAYS AS (total_transactions - successful_transactions) STORED,
    avg_processing_time_sec DECIMAL(8,3),               -- seconds
    -- Channel breakdown
    mobile_transactions     BIGINT,
    atm_transactions        BIGINT,
    pos_transactions        BIGINT,
    branch_transactions     BIGINT,
    -- Calculated
    success_rate_pct        DECIMAL(8,4) GENERATED ALWAYS AS (ROUND((successful_transactions / total_transactions) * 100, 4)) STORED,
    target_success_rate     DECIMAL(8,4) DEFAULT 99.50,
    target_processing_sec   DECIMAL(8,3) DEFAULT 1.50,
    notes                   TEXT,
    captured_by             INT,
    captured_at             DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_period (period_id),
    FOREIGN KEY (period_id) REFERENCES reporting_periods(id)
);

-- Branch Performance
CREATE TABLE oe_branch_performance (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    period_id               INT NOT NULL,
    monthly_footfall        INT NOT NULL,               -- total customer visits
    avg_wait_time_min       DECIMAL(8,2) NOT NULL,
    avg_service_time_min    DECIMAL(8,2) NOT NULL,
    cost_per_transaction    DECIMAL(10,2),              -- ZMW
    target_footfall         INT,
    target_wait_time_min    DECIMAL(8,2) DEFAULT 10.00,
    target_service_time_min DECIMAL(8,2) DEFAULT 6.00,
    notes                   TEXT,
    captured_by             INT,
    captured_at             DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_period (period_id),
    FOREIGN KEY (period_id) REFERENCES reporting_periods(id)
);

-- Branch-level data
CREATE TABLE oe_branch_data (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    period_id           INT NOT NULL,
    branch_name         VARCHAR(150) NOT NULL,
    branch_code         VARCHAR(20),
    city                VARCHAR(100),
    monthly_footfall    INT,
    avg_wait_time_min   DECIMAL(8,2),
    avg_service_time_min DECIMAL(8,2),
    transactions        INT,
    revenue             DECIMAL(18,2),
    FOREIGN KEY (period_id) REFERENCES reporting_periods(id)
);

-- Digital Channel Usage
CREATE TABLE oe_digital_usage (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    period_id               INT NOT NULL,
    active_mobile_users     INT NOT NULL,
    internet_banking_users  INT NOT NULL,
    app_downloads_cumulative BIGINT,
    ussd_users              INT,
    -- Calculated proxy metrics
    digital_transaction_pct DECIMAL(8,4),               -- % of all txns done digitally
    target_mobile_users     INT,
    target_digital_pct      DECIMAL(8,4) DEFAULT 60.00,
    notes                   TEXT,
    captured_by             INT,
    captured_at             DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_period (period_id),
    FOREIGN KEY (period_id) REFERENCES reporting_periods(id)
);

-- Employee Productivity
CREATE TABLE oe_employee_productivity (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    period_id               INT NOT NULL,
    total_employees         INT NOT NULL,
    total_revenue           DECIMAL(18,2) NOT NULL,     -- from fp_revenue
    accounts_per_rm         INT,                        -- accounts per relationship manager
    avg_training_hours      DECIMAL(8,2),
    absenteeism_rate_pct    DECIMAL(8,4),
    -- Calculated
    revenue_per_employee    DECIMAL(18,2) GENERATED ALWAYS AS (ROUND(total_revenue / total_employees, 2)) STORED,
    target_revenue_per_emp  DECIMAL(18,2),
    target_accounts_per_rm  INT DEFAULT 400,
    notes                   TEXT,
    captured_by             INT,
    captured_at             DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_period (period_id),
    FOREIGN KEY (period_id) REFERENCES reporting_periods(id)
);


-- ============================================================
-- 4. QUALITY & CUSTOMER EXPERIENCE TABLES
-- ============================================================

-- Customer Satisfaction (CSAT)
CREATE TABLE qe_customer_satisfaction (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    period_id               INT NOT NULL,
    overall_csat            DECIMAL(4,2) NOT NULL,      -- scale 1-5
    branch_csat             DECIMAL(4,2),
    digital_csat            DECIMAL(4,2),
    call_center_csat        DECIMAL(4,2),
    survey_responses        INT,
    -- Promoter breakdown
    promoters_pct           DECIMAL(8,4),
    passives_pct            DECIMAL(8,4),
    detractors_pct          DECIMAL(8,4),
    target_overall_csat     DECIMAL(4,2) DEFAULT 4.00,
    notes                   TEXT,
    captured_by             INT,
    captured_at             DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_period (period_id),
    FOREIGN KEY (period_id) REFERENCES reporting_periods(id)
);

-- Net Promoter Score (NPS)
CREATE TABLE qe_nps (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    period_id           INT NOT NULL,
    promoters_count     INT NOT NULL,                   -- score 9-10
    passives_count      INT NOT NULL,                   -- score 7-8
    detractors_count    INT NOT NULL,                   -- score 0-6
    total_respondents   INT GENERATED ALWAYS AS (promoters_count + passives_count + detractors_count) STORED,
    nps_score           DECIMAL(8,2) GENERATED ALWAYS AS (
        ROUND(((promoters_count / (promoters_count + passives_count + detractors_count)) -
               (detractors_count / (promoters_count + passives_count + detractors_count))) * 100, 2)
    ) STORED,
    retail_nps          DECIMAL(8,2),
    corporate_nps       DECIMAL(8,2),
    sme_nps             DECIMAL(8,2),
    target_nps          DECIMAL(8,2) DEFAULT 35.00,
    notes               TEXT,
    captured_by         INT,
    captured_at         DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_period (period_id),
    FOREIGN KEY (period_id) REFERENCES reporting_periods(id)
);

-- Service Quality
CREATE TABLE qe_service_quality (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    period_id               INT NOT NULL,
    sla_adherence_pct       DECIMAL(8,4) NOT NULL,      -- % requests met within SLA
    first_contact_res_pct   DECIMAL(8,4) NOT NULL,      -- first contact resolution
    error_rate_pct          DECIMAL(8,4) NOT NULL,
    call_abandonment_pct    DECIMAL(8,4),
    target_sla              DECIMAL(8,4) DEFAULT 90.00,
    target_fcr              DECIMAL(8,4) DEFAULT 75.00,
    target_error_rate       DECIMAL(8,4) DEFAULT 1.00,
    notes                   TEXT,
    captured_by             INT,
    captured_at             DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_period (period_id),
    FOREIGN KEY (period_id) REFERENCES reporting_periods(id)
);

-- Complaint Resolution
CREATE TABLE qe_complaint_resolution (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    period_id               INT NOT NULL,
    total_complaints        INT NOT NULL,
    resolved_complaints     INT NOT NULL,
    pending_complaints      INT GENERATED ALWAYS AS (total_complaints - resolved_complaints) STORED,
    avg_resolution_hours    DECIMAL(8,2) NOT NULL,
    escalation_count        INT DEFAULT 0,
    post_resolution_csat    DECIMAL(4,2),               -- satisfaction after resolution
    -- Calculated
    escalation_rate_pct     DECIMAL(8,4) GENERATED ALWAYS AS (
        ROUND((escalation_count / total_complaints) * 100, 4)
    ) STORED,
    target_resolution_hours DECIMAL(8,2) DEFAULT 48.00,
    target_escalation_pct   DECIMAL(8,4) DEFAULT 10.00,
    notes                   TEXT,
    captured_by             INT,
    captured_at             DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_period (period_id),
    FOREIGN KEY (period_id) REFERENCES reporting_periods(id)
);

-- Complaint detail types
CREATE TABLE qe_complaint_types (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    resolution_id   INT NOT NULL,
    complaint_type  VARCHAR(150) NOT NULL,               -- e.g. 'ATM Dispute'
    count           INT NOT NULL,
    FOREIGN KEY (resolution_id) REFERENCES qe_complaint_resolution(id) ON DELETE CASCADE
);


-- ============================================================
-- 5. RISK MANAGEMENT TABLES
-- ============================================================

-- Credit Risk
CREATE TABLE rm_credit_risk (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    period_id               INT NOT NULL,
    total_loan_portfolio    DECIMAL(18,2) NOT NULL,     -- ZMW
    non_performing_loans    DECIMAL(18,2) NOT NULL,     -- ZMW: NPLs
    par_30_amount           DECIMAL(18,2),              -- ZMW: Portfolio at Risk > 30 days
    loan_loss_provisions    DECIMAL(18,2),              -- ZMW: impairment provisions
    -- Calculated
    npl_ratio_pct           DECIMAL(8,4) GENERATED ALWAYS AS (ROUND((non_performing_loans / total_loan_portfolio) * 100, 4)) STORED,
    par_30_pct              DECIMAL(8,4) GENERATED ALWAYS AS (ROUND((par_30_amount / total_loan_portfolio) * 100, 4)) STORED,
    coverage_ratio_pct      DECIMAL(8,4) GENERATED ALWAYS AS (ROUND((loan_loss_provisions / non_performing_loans) * 100, 4)) STORED,
    cost_of_risk_pct        DECIMAL(8,4) GENERATED ALWAYS AS (ROUND((loan_loss_provisions / total_loan_portfolio) * 100, 4)) STORED,
    target_npl_pct          DECIMAL(8,4) DEFAULT 5.00,
    target_coverage_pct     DECIMAL(8,4) DEFAULT 100.00,
    notes                   TEXT,
    captured_by             INT,
    captured_at             DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_period (period_id),
    FOREIGN KEY (period_id) REFERENCES reporting_periods(id)
);

-- Credit risk by sector
CREATE TABLE rm_credit_by_sector (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    credit_risk_id  INT NOT NULL,
    sector_name     VARCHAR(100) NOT NULL,               -- e.g. 'Agriculture', 'SME'
    loan_amount     DECIMAL(18,2),
    npl_amount      DECIMAL(18,2),
    npl_pct         DECIMAL(8,4),
    FOREIGN KEY (credit_risk_id) REFERENCES rm_credit_risk(id) ON DELETE CASCADE
);

-- Market Risk
CREATE TABLE rm_market_risk (
    id                          INT AUTO_INCREMENT PRIMARY KEY,
    period_id                   INT NOT NULL,
    var_1day_zmw                DECIMAL(18,2),           -- Value at Risk (ZMW, 1-day, 99%)
    fx_net_open_position_usd    DECIMAL(18,2),           -- net FX exposure in USD
    earnings_at_risk_pct        DECIMAL(8,4),
    duration_gap_years          DECIMAL(8,4),            -- asset vs liability duration
    target_var                  DECIMAL(18,2),
    target_fx_nop               DECIMAL(18,2),
    notes                       TEXT,
    captured_by                 INT,
    captured_at                 DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at                  DATETIME ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_period (period_id),
    FOREIGN KEY (period_id) REFERENCES reporting_periods(id)
);

-- FX position by currency
CREATE TABLE rm_fx_positions (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    market_risk_id  INT NOT NULL,
    currency_code   CHAR(3) NOT NULL,                   -- e.g. 'USD', 'ZAR', 'EUR'
    position_type   ENUM('LONG','SHORT') NOT NULL,
    position_amount DECIMAL(18,2) NOT NULL,             -- in foreign currency
    FOREIGN KEY (market_risk_id) REFERENCES rm_market_risk(id) ON DELETE CASCADE
);

-- Operational Risk
CREATE TABLE rm_operational_risk (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    period_id               INT NOT NULL,
    loss_events_count       INT NOT NULL DEFAULT 0,
    total_financial_loss    DECIMAL(18,2) NOT NULL DEFAULT 0,   -- ZMW
    near_misses_reported    INT DEFAULT 0,
    kri_breaches            INT DEFAULT 0,
    notes                   TEXT,
    captured_by             INT,
    captured_at             DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_period (period_id),
    FOREIGN KEY (period_id) REFERENCES reporting_periods(id)
);

-- Operational risk events detail
CREATE TABLE rm_operational_risk_events (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    op_risk_id      INT NOT NULL,
    event_type      VARCHAR(100) NOT NULL,               -- e.g. 'Fraud (External)', 'System Failure'
    event_date      DATE,
    financial_loss  DECIMAL(18,2) DEFAULT 0,
    description     TEXT,
    status          ENUM('OPEN','RESOLVED','UNDER_REVIEW') DEFAULT 'OPEN',
    FOREIGN KEY (op_risk_id) REFERENCES rm_operational_risk(id) ON DELETE CASCADE
);

-- Liquidity Risk
CREATE TABLE rm_liquidity_risk (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    period_id               INT NOT NULL,
    hqla_amount             DECIMAL(18,2) NOT NULL,     -- ZMW: High Quality Liquid Assets
    net_cash_outflows_30d   DECIMAL(18,2) NOT NULL,     -- ZMW: 30-day stressed outflows
    total_deposits          DECIMAL(18,2) NOT NULL,     -- ZMW
    total_loans             DECIMAL(18,2) NOT NULL,     -- ZMW
    stable_funding          DECIMAL(18,2),              -- ZMW: for NSFR
    required_stable_funding DECIMAL(18,2),              -- ZMW: for NSFR
    top10_depositor_pct     DECIMAL(8,4),               -- concentration risk
    -- Calculated
    lcr_pct                 DECIMAL(8,4) GENERATED ALWAYS AS (ROUND((hqla_amount / net_cash_outflows_30d) * 100, 4)) STORED,
    nsfr_pct                DECIMAL(8,4) GENERATED ALWAYS AS (ROUND((stable_funding / required_stable_funding) * 100, 4)) STORED,
    loan_to_deposit_pct     DECIMAL(8,4) GENERATED ALWAYS AS (ROUND((total_loans / total_deposits) * 100, 4)) STORED,
    target_lcr              DECIMAL(8,4) DEFAULT 100.00,
    target_nsfr             DECIMAL(8,4) DEFAULT 100.00,
    target_ldr              DECIMAL(8,4) DEFAULT 80.00,
    notes                   TEXT,
    captured_by             INT,
    captured_at             DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_period (period_id),
    FOREIGN KEY (period_id) REFERENCES reporting_periods(id)
);


-- ============================================================
-- 6. COMPLIANCE TABLES
-- ============================================================

-- BoZ Regulatory Compliance
CREATE TABLE comp_boz_regulations (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    period_id               INT NOT NULL,
    -- Capital
    tier1_capital           DECIMAL(18,2) NOT NULL,     -- ZMW
    tier2_capital           DECIMAL(18,2) NOT NULL,     -- ZMW
    risk_weighted_assets    DECIMAL(18,2) NOT NULL,     -- ZMW (RWA)
    regulatory_breaches     INT NOT NULL DEFAULT 0,
    reporting_accuracy_pct  DECIMAL(8,4),
    submission_timeliness_pct DECIMAL(8,4),
    -- Calculated
    total_capital           DECIMAL(18,2) GENERATED ALWAYS AS (ROUND(tier1_capital + tier2_capital, 2)) STORED,
    car_pct                 DECIMAL(8,4) GENERATED ALWAYS AS (ROUND(((tier1_capital + tier2_capital) / risk_weighted_assets) * 100, 4)) STORED,
    tier1_ratio_pct         DECIMAL(8,4) GENERATED ALWAYS AS (ROUND((tier1_capital / risk_weighted_assets) * 100, 4)) STORED,
    target_car_pct          DECIMAL(8,4) DEFAULT 10.00, -- BoZ minimum
    notes                   TEXT,
    captured_by             INT,
    captured_at             DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_period (period_id),
    FOREIGN KEY (period_id) REFERENCES reporting_periods(id)
);

-- AML / CFT
CREATE TABLE comp_aml_cft (
    id                          INT AUTO_INCREMENT PRIMARY KEY,
    period_id                   INT NOT NULL,
    total_customers             INT NOT NULL,
    kyc_compliant_customers     INT NOT NULL,
    strs_filed                  INT DEFAULT 0,          -- Suspicious Transaction Reports
    txn_monitoring_coverage_pct DECIMAL(8,4) DEFAULT 100.00,
    staff_aml_trained_pct       DECIMAL(8,4),
    alerts_generated            INT,
    alerts_reviewed             INT,
    -- Calculated
    kyc_compliance_pct          DECIMAL(8,4) GENERATED ALWAYS AS (ROUND((kyc_compliant_customers / total_customers) * 100, 4)) STORED,
    target_kyc_pct              DECIMAL(8,4) DEFAULT 100.00,
    target_staff_trained_pct    DECIMAL(8,4) DEFAULT 100.00,
    notes                       TEXT,
    captured_by                 INT,
    captured_at                 DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at                  DATETIME ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_period (period_id),
    FOREIGN KEY (period_id) REFERENCES reporting_periods(id)
);

-- AML KYC by segment
CREATE TABLE comp_aml_kyc_segments (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    aml_id      INT NOT NULL,
    segment     VARCHAR(100) NOT NULL,                  -- e.g. 'Corporate', 'Retail', 'SME'
    total       INT NOT NULL,
    compliant   INT NOT NULL,
    kyc_pct     DECIMAL(8,4) GENERATED ALWAYS AS (ROUND((compliant / total) * 100, 4)) STORED,
    FOREIGN KEY (aml_id) REFERENCES comp_aml_cft(id) ON DELETE CASCADE
);

-- Data Protection
CREATE TABLE comp_data_protection (
    id                          INT AUTO_INCREMENT PRIMARY KEY,
    period_id                   INT NOT NULL,
    data_breaches               INT NOT NULL DEFAULT 0,
    subject_access_requests     INT DEFAULT 0,          -- GDPR/DPA access requests
    rectification_requests      INT DEFAULT 0,
    deletion_requests           INT DEFAULT 0,
    staff_policy_acceptance_pct DECIMAL(8,4) DEFAULT 100.00,
    vendor_audits_completed     INT,
    vendor_audits_total         INT,
    -- Calculated
    vendor_audit_pct            DECIMAL(8,4) GENERATED ALWAYS AS (
        ROUND((vendor_audits_completed / vendor_audits_total) * 100, 4)
    ) STORED,
    notes                       TEXT,
    captured_by                 INT,
    captured_at                 DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at                  DATETIME ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_period (period_id),
    FOREIGN KEY (period_id) REFERENCES reporting_periods(id)
);

-- Audit Compliance
CREATE TABLE comp_audit_compliance (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    period_id               INT NOT NULL,
    total_findings          INT NOT NULL,
    closed_findings         INT NOT NULL,
    open_findings           INT GENERATED ALWAYS AS (total_findings - closed_findings) STORED,
    high_risk_open          INT DEFAULT 0,
    medium_risk_open        INT DEFAULT 0,
    low_risk_open           INT DEFAULT 0,
    repeat_findings         INT DEFAULT 0,
    -- Calculated
    closure_rate_pct        DECIMAL(8,4) GENERATED ALWAYS AS (ROUND((closed_findings / total_findings) * 100, 4)) STORED,
    target_closure_pct      DECIMAL(8,4) DEFAULT 100.00,
    notes                   TEXT,
    captured_by             INT,
    captured_at             DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_period (period_id),
    FOREIGN KEY (period_id) REFERENCES reporting_periods(id)
);

-- Audit findings by department
CREATE TABLE comp_audit_findings_detail (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    audit_id        INT NOT NULL,
    department      VARCHAR(100) NOT NULL,               -- e.g. 'IT Audit', 'Credit Audit'
    open_count      INT DEFAULT 0,
    closed_count    INT DEFAULT 0,
    risk_level      ENUM('HIGH','MEDIUM','LOW') NOT NULL,
    FOREIGN KEY (audit_id) REFERENCES comp_audit_compliance(id) ON DELETE CASCADE
);


-- ============================================================
-- 7. TREND / CHART DATA TABLES
-- ============================================================

-- Monthly-granularity trend snapshots for all KPIs
-- (Used to power the ApexCharts time-series in the UI)
CREATE TABLE kpi_trend_snapshots (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    dashboard_id    INT NOT NULL,
    period_id       INT NOT NULL,
    metric_name     VARCHAR(150) NOT NULL,               -- e.g. 'roa_percentage', 'nim_percentage'
    metric_value    DECIMAL(18,6),
    recorded_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_dash_period_metric (dashboard_id, period_id, metric_name),
    FOREIGN KEY (dashboard_id) REFERENCES kpi_dashboards(id),
    FOREIGN KEY (period_id)    REFERENCES reporting_periods(id)
);


-- ============================================================
-- 8. USER MANAGEMENT
-- ============================================================

CREATE TABLE users (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    username        VARCHAR(100) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    full_name       VARCHAR(200) NOT NULL,
    email           VARCHAR(200) NOT NULL UNIQUE,
    role            ENUM('ADMIN','MANAGER','ANALYST','VIEWER') NOT NULL DEFAULT 'VIEWER',
    department      VARCHAR(150),
    is_active       TINYINT(1) DEFAULT 1,
    last_login      DATETIME,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME ON UPDATE CURRENT_TIMESTAMP
);

-- Seed default admin user (password: change_on_first_login)
INSERT INTO users (username, password_hash, full_name, email, role) VALUES
    ('admin', '$2y$12$placeholder_hash', 'System Administrator', 'admin@natsave.co.zm', 'ADMIN');


-- ============================================================
-- 9. AUDIT TRAIL
-- ============================================================

CREATE TABLE audit_log (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id         INT,
    action          VARCHAR(50) NOT NULL,               -- e.g. 'INSERT', 'UPDATE', 'DELETE', 'LOGIN'
    table_name      VARCHAR(100),
    record_id       INT,
    old_values      JSON,
    new_values      JSON,
    ip_address      VARCHAR(45),                        -- supports IPv6
    user_agent      TEXT,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);


-- ============================================================
-- 10. REPORTING PERIODS SEED DATA
-- ============================================================

INSERT INTO reporting_periods (period_code, period_type, fiscal_year, quarter, month, start_date, end_date) VALUES
    ('FY2024',    'ANNUAL',    2024, NULL, NULL, '2024-01-01', '2024-12-31'),
    ('FY2024-Q1', 'QUARTERLY', 2024,    1, NULL, '2024-01-01', '2024-03-31'),
    ('FY2024-Q2', 'QUARTERLY', 2024,    2, NULL, '2024-04-01', '2024-06-30'),
    ('FY2024-Q3', 'QUARTERLY', 2024,    3, NULL, '2024-07-01', '2024-09-30'),
    ('FY2024-Q4', 'QUARTERLY', 2024,    4, NULL, '2024-10-01', '2024-12-31'),
    ('FY2023',    'ANNUAL',    2023, NULL, NULL, '2023-01-01', '2023-12-31'),
    ('FY2023-Q1', 'QUARTERLY', 2023,    1, NULL, '2023-01-01', '2023-03-31'),
    ('FY2023-Q2', 'QUARTERLY', 2023,    2, NULL, '2023-04-01', '2023-06-30'),
    ('FY2023-Q3', 'QUARTERLY', 2023,    3, NULL, '2023-07-01', '2023-09-30'),
    ('FY2023-Q4', 'QUARTERLY', 2023,    4, NULL, '2023-10-01', '2023-12-31'),
    ('FY2025',    'ANNUAL',    2025, NULL, NULL, '2025-01-01', '2025-12-31'),
    ('FY2025-Q1', 'QUARTERLY', 2025,    1, NULL, '2025-01-01', '2025-03-31'),
    ('FY2025-Q2', 'QUARTERLY', 2025,    2, NULL, '2025-04-01', '2025-06-30'),
    ('FY2025-Q3', 'QUARTERLY', 2025,    3, NULL, '2025-07-01', '2025-09-30'),
    ('FY2025-Q4', 'QUARTERLY', 2025,    4, NULL, '2025-10-01', '2025-12-31');


-- ============================================================
-- 11. USEFUL VIEWS
-- ============================================================

-- Financial Summary View
CREATE OR REPLACE VIEW v_financial_summary AS
SELECT
    rp.period_code,
    rp.fiscal_year,
    r.roa_percentage,
    r.roe_percentage,
    r.target_roa,
    r.target_roe,
    n.nim_percentage,
    n.target_nim,
    ci.cir_percentage,
    ci.target_cir,
    rev.total_revenue,
    rev.interest_revenue,
    rev.fee_commission
FROM reporting_periods rp
LEFT JOIN fp_roa_roe r     ON r.period_id = rp.id
LEFT JOIN fp_nim n         ON n.period_id = rp.id
LEFT JOIN fp_cost_income ci ON ci.period_id = rp.id
LEFT JOIN fp_revenue rev   ON rev.period_id = rp.id;

-- Risk Summary View
CREATE OR REPLACE VIEW v_risk_summary AS
SELECT
    rp.period_code,
    cr.npl_ratio_pct,
    cr.par_30_pct,
    cr.coverage_ratio_pct,
    mr.var_1day_zmw,
    mr.fx_net_open_position_usd,
    op.loss_events_count,
    op.total_financial_loss,
    lr.lcr_pct,
    lr.nsfr_pct,
    lr.loan_to_deposit_pct
FROM reporting_periods rp
LEFT JOIN rm_credit_risk    cr ON cr.period_id = rp.id
LEFT JOIN rm_market_risk    mr ON mr.period_id = rp.id
LEFT JOIN rm_operational_risk op ON op.period_id = rp.id
LEFT JOIN rm_liquidity_risk lr ON lr.period_id = rp.id;

-- Compliance Summary View
CREATE OR REPLACE VIEW v_compliance_summary AS
SELECT
    rp.period_code,
    boz.car_pct,
    boz.regulatory_breaches,
    aml.kyc_compliance_pct,
    aml.strs_filed,
    dp.data_breaches,
    aud.closure_rate_pct,
    aud.open_findings,
    aud.high_risk_open
FROM reporting_periods rp
LEFT JOIN comp_boz_regulations boz ON boz.period_id = rp.id
LEFT JOIN comp_aml_cft         aml ON aml.period_id = rp.id
LEFT JOIN comp_data_protection  dp ON dp.period_id  = rp.id
LEFT JOIN comp_audit_compliance aud ON aud.period_id = rp.id;
