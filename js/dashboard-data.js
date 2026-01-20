// Sub-Dashboard Data for KPI Categories
const DASHBOARD_DATA = {
    // Financial Performance Category
    roa_roe: {
        title: "Return on Assets & Equity",
        description: "Profitability performance analysis for NatSave Bank",
        category: "Financial Performance",
        period: "FY 2024",
        kpis: [
            {
                label: "Return on Assets (ROA)",
                value: "1.16%",
                target: "1.20%",
                status: "below",
                trend: "up",
                change: "+0.08%",
                description: "Net Income / Total Assets"
            },
            {
                label: "Return on Equity (ROE)",
                value: "15.2%",
                target: "15.0%",
                status: "above",
                trend: "up",
                change: "+0.5%",
                description: "Net Income / Shareholders' Equity"
            },
            {
                label: "Asset Turnover",
                value: "0.082",
                target: "0.085",
                status: "below",
                trend: "neutral",
                change: "0.00",
                description: "Revenue / Total Assets"
            },
            {
                label: "Equity Multiplier",
                value: "7.6x",
                target: "7.5x",
                status: "above",
                trend: "up",
                change: "+0.2x",
                description: "Total Assets / Shareholders' Equity"
            }
        ],
        trendData: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            roa: [1.08, 1.12, 1.14, 1.16],
            roe: [14.2, 14.7, 15.0, 15.2],
            targets: {
                roa: 1.20,
                roe: 15.0
            }
        },
        breakdown: [
            { label: "Net Income", value: "ZMW 145.2M", change: "+8.5%" },
            { label: "Total Assets", value: "ZMW 12.55B", change: "+5.2%" },
            { label: "Shareholders' Equity", value: "ZMW 1.65B", change: "+3.8%" }
        ]
    },

    nim: {
        title: "Net Interest Margin",
        description: "Interest income efficiency and spread analysis",
        category: "Financial Performance",
        period: "FY 2024",
        kpis: [
            {
                label: "Net Interest Margin",
                value: "6.8%",
                target: "7.0%",
                status: "below",
                trend: "up",
                change: "+0.15%",
                description: "Net Interest Income / Interest-Earning Assets"
            },
            {
                label: "Interest Income",
                value: "ZMW 1.82B",
                target: "ZMW 1.90B",
                status: "below",
                trend: "up",
                change: "+12.5%",
                description: "Total interest earned"
            },
            {
                label: "Interest Expense",
                value: "ZMW 1.14B",
                target: "ZMW 1.10B",
                status: "above",
                trend: "up",
                change: "+15.2%",
                description: "Cost of funds"
            },
            {
                label: "Net Interest Income",
                value: "ZMW 685M",
                target: "ZMW 720M",
                status: "below",
                trend: "up",
                change: "+8.5%",
                description: "Interest Income - Interest Expense"
            }
        ],
        trendData: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            nim: [6.5, 6.55, 6.6, 6.62, 6.65, 6.70, 6.72, 6.75, 6.77, 6.78, 6.79, 6.8],
            interestIncome: [148, 152, 150, 154, 156, 158, 152, 154, 148, 156, 160, 164],
            interestExpense: [92, 95, 93, 96, 97, 99, 95, 96, 92, 97, 100, 102]
        },
        yieldBreakdown: [
            { label: "Loans & Advances", yield: "14.5%", volume: "ZMW 8.2B" },
            { label: "Securities", yield: "15.2%", volume: "ZMW 2.8B" },
            { label: "Other Interest-Earning", yield: "8.5%", volume: "ZMW 1.2B" }
        ],
        costBreakdown: [
            { label: "Customer Deposits", cost: "3.1%", volume: "ZMW 10.1B" },
            { label: "Borrowings", cost: "9.2%", volume: "ZMW 0.8B" },
            { label: "Other Liabilities", cost: "5.5%", volume: "ZMW 0.5B" }
        ]
    },

    cost_income: {
        title: "Cost-to-Income Ratio",
        description: "Operational efficiency and expense management",
        category: "Financial Performance",
        period: "FY 2024",
        kpis: [
            {
                label: "Cost-to-Income Ratio",
                value: "56.3%",
                target: "55.0%",
                status: "above",
                trend: "down",
                change: "-1.2%",
                description: "Operating Expenses / Operating Income"
            },
            {
                label: "Operating Income",
                value: "ZMW 1.03B",
                target: "ZMW 1.05B",
                status: "below",
                trend: "up",
                change: "+12%",
                description: "Total revenue generated"
            },
            {
                label: "Operating Expenses",
                value: "ZMW 580M",
                target: "ZMW 577M",
                status: "above",
                trend: "up",
                change: "+10.5%",
                description: "Total operating costs"
            },
            {
                label: "Efficiency Ratio",
                value: "43.7%",
                target: "45.0%",
                status: "above",
                trend: "up",
                change: "+1.2%",
                description: "Income / Expenses (inverse of CIR)"
            }
        ],
        trendData: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            cir: [58.5, 57.2, 56.8, 56.3],
            income: [240, 255, 265, 280],
            expenses: [140, 146, 151, 158]
        },
        expenseBreakdown: [
            { category: "Staff Costs", amount: "ZMW 320M", percent: "55.2%" },
            { category: "Infrastructure & IT", amount: "ZMW 160M", percent: "27.6%" },
            { category: "Marketing", amount: "ZMW 45M", percent: "7.8%" },
            { category: "Other Operating", amount: "ZMW 55M", percent: "9.5%" }
        ]
    },

    revenue: {
        title: "Revenue Analysis",
        description: "Comprehensive revenue streams and growth analysis",
        category: "Financial Performance",
        period: "FY 2024",
        kpis: [
            {
                label: "Total Revenue",
                value: "ZMW 1.03B",
                target: "ZMW 1.05B",
                status: "below",
                trend: "up",
                change: "+12%",
                description: "All revenue streams combined"
            },
            {
                label: "Interest Revenue",
                value: "ZMW 685M",
                target: "ZMW 720M",
                status: "below",
                trend: "up",
                change: "+8.5%",
                description: "Interest-based income"
            },
            {
                label: "Fee & Commission",
                value: "ZMW 245M",
                target: "ZMW 230M",
                status: "above",
                trend: "up",
                change: "+18.5%",
                description: "Non-interest income"
            },
            {
                label: "Other Income",
                value: "ZMW 100M",
                target: "ZMW 100M",
                status: "on_target",
                trend: "neutral",
                change: "+0.5%",
                description: "Miscellaneous revenue"
            }
        ],
        trendData: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            total: [82, 84.5, 81, 86, 88, 92, 89, 90.5, 87, 94, 96, 98],
            interest: [56, 58, 55, 59, 60, 63, 61, 62, 59, 64, 66, 67],
            fees: [19, 19.5, 19, 20, 21, 22, 21, 21.5, 21, 23, 23, 24],
            other: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
        },
        revenueByChannel: [
            { channel: "Branch Banking", amount: "ZMW 450M", percent: "43.7%" },
            { channel: "Digital Banking", amount: "ZMW 320M", percent: "31.1%" },
            { channel: "Corporate Banking", amount: "ZMW 180M", percent: "17.5%" },
            { channel: "Other Channels", amount: "ZMW 80M", percent: "7.8%" }
        ]
    },

    // Operational Efficiency Category
    transaction_processing: {
        title: "Transaction Processing",
        category: "Operational Efficiency",
        period: "FY 2024",
        description: "Transaction volumes, success rates, and processing speed",
        kpis: [
            { label: "Total Transactions", value: "12.5M", target: "12.0M", status: "above", trend: "up", change: "+4.2%", description: "Volume across all channels" },
            { label: "Success Rate", value: "99.8%", target: "99.5%", status: "above", trend: "up", change: "+0.3%", description: "Successful vs attempted" },
            { label: "Avg Processing Time", value: "1.2s", target: "1.5s", status: "above", trend: "down", change: "-20%", description: "Core banking latency" },
            { label: "Failed Transactions", value: "0.2%", target: "0.5%", status: "above", trend: "down", change: "-60%", description: "Technical failures" }
        ],
        trendData: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            labelsFull: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            volume: [2.8, 3.1, 3.2, 3.4],
            success: [99.5, 99.6, 99.7, 99.8]
        },
        breakdown: [
            { label: "Mobile Baking", value: "5.2M", change: "+15%" },
            { label: "ATM", value: "3.1M", change: "-2%" },
            { label: "POS", value: "2.8M", change: "+8%" },
            { label: "Branch", value: "1.4M", change: "-5%" }
        ]
    },
    branch_performance: {
        title: "Branch Performance",
        category: "Operational Efficiency",
        period: "FY 2024",
        description: "Branch network efficiency and footfall analysis",
        kpis: [
            { label: "Footfall", value: "450k", target: "400k", status: "above", trend: "up", change: "+12.5%", description: "Monthly customer visits" },
            { label: "Avg Wait Time", value: "8 min", target: "10 min", status: "above", trend: "down", change: "-20%", description: "Queue time" },
            { label: "Service Time", value: "5 min", target: "6 min", status: "above", trend: "down", change: "-16%", description: "Teller service duration" },
            { label: "Cost per Transaction", value: "ZMW 25", target: "ZMW 28", status: "above", trend: "down", change: "-10%", description: "Physical channel cost" }
        ],
        trendData: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            footfall: [110, 115, 120, 105], // in thousands
            waitTime: [12, 10, 9, 8] // in minutes
        },
        breakdown: [
            { label: "Lusaka Main", value: "45k Visits", change: "+5%" },
            { label: "Ndola", value: "32k Visits", change: "+2%" },
            { label: "Kitwe", value: "28k Visits", change: "+3%" },
            { label: "Livingstone", value: "15k Visits", change: "0%" }
        ]
    },
    digital_usage: {
        title: "Digital Channel Usage",
        category: "Operational Efficiency",
        period: "FY 2024",
        description: "Adoption and engagement of digital banking platforms",
        kpis: [
            { label: "Active Mobile Users", value: "120k", target: "100k", status: "above", trend: "up", change: "+20%", description: "30-day active users" },
            { label: "Internet Banking", value: "45k", target: "40k", status: "above", trend: "up", change: "+12%", description: "Corporate & Retail" },
            { label: "App Downloads", value: "250k", target: "200k", status: "above", trend: "up", change: "+25%", description: "Cumulative installs" },
            { label: "Digital Migration", value: "65%", target: "60%", status: "above", trend: "up", change: "+5%", description: "% txns done digitally" }
        ],
        trendData: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            mobile: [90, 100, 110, 120], // thousands
            migration: [55, 58, 62, 65] // percentage
        },
        breakdown: [
            { label: "Android App", value: "180k Users", change: "+22%" },
            { label: "iOS App", value: "40k Users", change: "+18%" },
            { label: "USSD", value: "250k Users", change: "+5%" }
        ]
    },
    employee_productivity: {
        title: "Employee Productivity",
        category: "Operational Efficiency",
        period: "FY 2024",
        description: "Staff performance metrics and efficiency",
        kpis: [
            { label: "Revenue per Emp", value: "ZMW 1.2M", target: "ZMW 1.0M", status: "above", trend: "up", change: "+20%", description: "Total Revenue / Headcount" },
            { label: "Accounts per RN", value: "450", target: "400", status: "above", trend: "up", change: "+12%", description: "Accounts managed by RM" },
            { label: "Training Hours", value: "45h", target: "40h", status: "above", trend: "up", change: "+12.5%", description: "Avg training per employee" },
            { label: "Absenteeism", value: "2.1%", target: "3.0%", status: "above", trend: "down", change: "-30%", description: "Unplanned leave rate" }
        ],
        trendData: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            revenuePerEmp: [1.0, 1.1, 1.15, 1.2], // millions
            absenteeism: [2.5, 2.4, 2.2, 2.1]
        },
        breakdown: [
            { label: "Retail Banking", value: "ZMW 850k", change: "+10%" },
            { label: "Corporate", value: "ZMW 2.5M", change: "+15%" },
            { label: "Operations", value: "98% SLA", change: "+2%" }
        ]
    },

    // Quality & Customer Experience Category
    customer_satisfaction: {
        title: "Customer Satisfaction (CSAT)",
        category: "Quality & Experience",
        period: "FY 2024",
        description: "Customer satisfaction scores across touchpoints",
        kpis: [
            { label: "Overall CSAT", value: "4.2/5", target: "4.0/5", status: "above", trend: "up", change: "+0.2", description: "Average satisfaction score" },
            { label: "Branch CSAT", value: "4.5/5", target: "4.2/5", status: "above", trend: "up", change: "+0.3", description: "In-branch experience" },
            { label: "Digital CSAT", value: "4.0/5", target: "3.8/5", status: "above", trend: "up", change: "+0.2", description: "App & Web experience" },
            { label: "Call Center", value: "3.8/5", target: "3.5/5", status: "above", trend: "up", change: "+0.3", description: "Support satisfaction" }
        ],
        trendData: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            csat: [3.9, 4.0, 4.1, 4.2],
            digital: [3.6, 3.8, 3.9, 4.0]
        },
        breakdown: [
            { label: "Promoters", value: "45%", change: "+5%" },
            { label: "Passives", value: "35%", change: "-2%" },
            { label: "Detractors", value: "20%", change: "-3%" }
        ]
    },
    nps: {
        title: "Net Promoter Score (NPS)",
        category: "Quality & Experience",
        period: "FY 2024",
        description: "Customer loyalty and likelihood to recommend",
        kpis: [
            { label: "NPS Score", value: "+42", target: "+35", status: "above", trend: "up", change: "+7", description: "% Promoters - % Detractors" },
            { label: "Retail NPS", value: "+38", target: "+30", status: "above", trend: "up", change: "+8", description: "Retail customer segment" },
            { label: "Corporate NPS", value: "+55", target: "+45", status: "above", trend: "up", change: "+10", description: "Corporate client segment" },
            { label: "SME NPS", value: "+32", target: "+25", status: "above", trend: "up", change: "+7", description: "Small business segment" }
        ],
        trendData: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            nps: [35, 38, 40, 42],
            corporate: [48, 50, 52, 55]
        },
        breakdown: [
            { label: "Promoters (9-10)", value: "58%", change: "+4%" },
            { label: "Passives (7-8)", value: "26%", change: "-1%" },
            { label: "Detractors (0-6)", value: "16%", change: "-3%" }
        ]
    },
    service_quality: {
        title: "Service Quality",
        category: "Quality & Experience",
        period: "FY 2024",
        description: "Adherence to service level agreements and standards",
        kpis: [
            { label: "SLA Adherence", value: "95%", target: "90%", status: "above", trend: "up", change: "+5%", description: "Requests met within time" },
            { label: "First Contact Res", value: "82%", target: "75%", status: "above", trend: "up", change: "+7%", description: "Resolved on first interaction" },
            { label: "Error Rate", value: "0.5%", target: "1.0%", status: "above", trend: "down", change: "-50%", description: "Processing errors" },
            { label: "Call Abandonment", value: "3.2%", target: "5.0%", status: "above", trend: "down", change: "-36%", description: "Dropped calls" }
        ],
        trendData: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            sla: [90, 92, 94, 95],
            fcr: [75, 78, 80, 82]
        },
        breakdown: [
            { label: "Account Opening", value: "98% SLA", change: "+2%" },
            { label: "Loan Processing", value: "92% SLA", change: "+5%" },
            { label: "Card Issuance", value: "95% SLA", change: "+3%" }
        ]
    },
    complaint_resolution: {
        title: "Complaint Resolution",
        category: "Quality & Experience",
        period: "FY 2024",
        description: "Efficiency in handling customer grievances",
        kpis: [
            { label: "Avg Resolution Time", value: "24h", target: "48h", status: "above", trend: "down", change: "-50%", description: "Time to close tickets" },
            { label: "Open Tickets", value: "45", target: "100", status: "above", trend: "down", change: "-55%", description: "Currently active complaints" },
            { label: "Escalation Rate", value: "5%", target: "10%", status: "above", trend: "down", change: "-50%", description: "Tickets escalated to mgmt" },
            { label: "Cust Satisfaction", value: "4.5/5", target: "4.0/5", status: "above", trend: "up", change: "+0.5", description: "Post-resolution survey" }
        ],
        trendData: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            resolutionTime: [40, 32, 28, 24], // hours
            tickets: [120, 90, 60, 45]
        },
        breakdown: [
            { label: "ATM Disputes", value: "15 Tickets", change: "-20%" },
            { label: "Transfer Issues", value: "12 Tickets", change: "-10%" },
            { label: "Account Fees", value: "8 Tickets", change: "-5%" },
            { label: "Other", value: "10 Tickets", change: "0%" }
        ]
    },

    // Risk Management Category
    credit_risk: {
        title: "Credit Risk",
        category: "Risk Management",
        period: "FY 2024",
        description: "Loan portfolio quality and default risk",
        kpis: [
            { label: "NPL Ratio", value: "5.2%", target: "5.0%", status: "below", trend: "down", change: "-0.3%", description: "Non-Performing Loans / Total" },
            { label: "PAR 30", value: "6.5%", target: "6.0%", status: "below", trend: "down", change: "-0.5%", description: "Portfolio at Risk > 30 days" },
            { label: "Cost of Risk", value: "1.2%", target: "1.0%", status: "below", trend: "down", change: "-0.1%", description: "Impairment charges / Loans" },
            { label: "Coverage Ratio", value: "85%", target: "100%", status: "below", trend: "up", change: "+5%", description: "Provisions / NPLs" }
        ],
        trendData: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            npl: [5.8, 5.6, 5.4, 5.2],
            coverage: [70, 75, 80, 85]
        },
        breakdown: [
            { label: "Agriculture", value: "14.5% NPL", change: "+2%" },
            { label: "SME", value: "8.2% NPL", change: "-1%" },
            { label: "Personal Loans", value: "3.1% NPL", change: "-0.5%" },
            { label: "Corporate", value: "1.5% NPL", change: "0%" }
        ]
    },
    market_risk: {
        title: "Market Risk",
        category: "Risk Management",
        period: "FY 2024",
        description: "Exposure to interest rate and FX fluctuations",
        kpis: [
            { label: "VaR (1-day)", value: "ZMW 1.5M", target: "ZMW 2.0M", status: "above", trend: "neutral", change: "0%", description: "Value at Risk @ 99%" },
            { label: "FX Exposure", value: "$4.2M", target: "$5.0M", status: "above", trend: "down", change: "-16%", description: "Net Open Position" },
            { label: "Ear @ Risk", value: "2.5%", target: "3.0%", status: "above", trend: "down", change: "-16%", description: "Earnings at Risk" },
            { label: "Duration Gap", value: "0.5 yrs", target: "1.0 yrs", status: "above", trend: "neutral", change: "0", description: "Asset vs Liability duration" }
        ],
        trendData: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            var: [1.8, 1.6, 1.5, 1.5],
            fx: [4.8, 4.5, 4.3, 4.2]
        },
        breakdown: [
            { label: "USD Position", value: "$2.5M Long", change: "-10%" },
            { label: "ZAR Position", value: "R15M Short", change: "+5%" },
            { label: "EUR Position", value: "€500k Long", change: "0%" }
        ]
    },
    operational_risk: {
        title: "Operational Risk",
        category: "Risk Management",
        period: "FY 2024",
        description: "Risk of loss from failed processes, people, or systems",
        kpis: [
            { label: "Loss Events", value: "3", target: "0", status: "below", trend: "down", change: "-2", description: "Major loss incidents" },
            { label: "Total Fin Loss", value: "ZMW 45k", target: "ZMW 0", status: "below", trend: "down", change: "-50%", description: "Value of losses" },
            { label: "Near Misses", value: "12", target: "20", status: "above", trend: "up", change: "+4", description: "Reported near misses" },
            { label: "KRIs Breach", value: "2", target: "0", status: "below", trend: "down", change: "-1", description: "Key Risk Indicators red" }
        ],
        trendData: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            losses: [120, 80, 50, 45], // thousand ZMW
            events: [2, 1, 1, 3]
        },
        breakdown: [
            { label: "Fraud (Ext)", value: "2 Events", change: "0" },
            { label: "Process Error", value: "1 Event", change: "-1" },
            { label: "System Failure", value: "0 Events", change: "-1" }
        ]
    },
    liquidity_risk: {
        title: "Liquidity Risk",
        category: "Risk Management",
        period: "FY 2024",
        description: "Ability to meet short and long term obligations",
        kpis: [
            { label: "LCR", value: "145%", target: "100%", status: "above", trend: "up", change: "+5%", description: "Liquidity Coverage Ratio" },
            { label: "NSFR", value: "125%", target: "100%", status: "above", trend: "up", change: "+2%", description: "Net Stable Funding Ratio" },
            { label: "LDR", value: "72%", target: "80%", status: "above", trend: "down", change: "-2%", description: "Loan to Deposit Ratio" },
            { label: "Concentration", value: "15%", target: "20%", status: "above", trend: "down", change: "-1%", description: "Top 10 Depositors %" }
        ],
        trendData: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            lcr: [135, 138, 142, 145],
            ldr: [75, 74, 73, 72]
        },
        breakdown: [
            { label: "HQLA", value: "ZMW 2.5B", change: "+8%" },
            { label: "Net Outflows", value: "ZMW 1.7B", change: "+3%" },
            { label: "Stable Deposits", value: "ZMW 8.5B", change: "+5%" }
        ]
    },

    // Compliance Category
    boz_regulations: {
        title: "BoZ Regulations",
        category: "Compliance",
        period: "FY 2024",
        description: "Bank of Zambia regulatory compliance status",
        kpis: [
            { label: "Capital Adequacy", value: "18.5%", target: "10.0%", status: "above", trend: "up", change: "+0.5%", description: "Total Capital Ratio" },
            { label: "Regulatory Breaches", value: "0", target: "0", status: "on_target", trend: "neutral", change: "0", description: "Reported breaches" },
            { label: "Reporting Accuracy", value: "100%", target: "100%", status: "on_target", trend: "neutral", change: "0%", description: "BoZ Return accuracy" },
            { label: "Timeliness", value: "100%", target: "100%", status: "on_target", trend: "neutral", change: "0%", description: "On-time submission" }
        ],
        trendData: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            car: [17.8, 18.0, 18.2, 18.5],
            tier1: [15.5, 15.8, 16.0, 16.2]
        },
        breakdown: [
            { label: "Tier 1 Capital", value: "ZMW 1.2B", change: "+5%" },
            { label: "Tier 2 Capital", value: "ZMW 0.4B", change: "+2%" },
            { label: "RWA", value: "ZMW 8.5B", change: "+3%" }
        ]
    },
    aml_cft: {
        title: "AML / CFT",
        category: "Compliance",
        period: "FY 2024",
        description: "Anti-Money Laundering & Counter Terrorist Financing",
        kpis: [
            { label: "KYC Compliance", value: "98.5%", target: "100%", status: "below", trend: "up", change: "+1.5%", description: "Customer file completeness" },
            { label: "STRs Filed", value: "15", target: "N/A", status: "on_target", trend: "neutral", change: "+2", description: "Suspicious Txn Reports" },
            { label: "Txn Monitoring", value: "100%", target: "100%", status: "on_target", trend: "neutral", change: "0%", description: "Real-time screening" },
            { label: "Staff Training", value: "95%", target: "100%", status: "below", trend: "up", change: "+5%", description: "Annual AML refresh" }
        ],
        trendData: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            kyc: [95, 96.5, 97.5, 98.5],
            alerts: [450, 420, 380, 350]
        },
        breakdown: [
            { label: "Corporate KYC", value: "100%", change: "0%" },
            { label: "Retail KYC", value: "98.2%", change: "+2%" },
            { label: "SME KYC", value: "97.5%", change: "+3%" }
        ]
    },
    data_protection: {
        title: "Data Protection",
        category: "Compliance",
        period: "FY 2024",
        description: "Data privacy and protection (DPA) compliance",
        kpis: [
            { label: "Data Breaches", value: "0", target: "0", status: "on_target", trend: "neutral", change: "0", description: "Reported leaks" },
            { label: "Subject Requests", value: "12", target: "N/A", status: "on_target", trend: "up", change: "+4", description: "Access/Delete requests" },
            { label: "Policy Acceptance", value: "100%", target: "100%", status: "on_target", trend: "neutral", change: "0%", description: "Staff sign-off" },
            { label: "Vendor Audit", value: "85%", target: "100%", status: "below", trend: "up", change: "+15%", description: "3rd party compliance" }
        ],
        trendData: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            requests: [2, 4, 6, 12],
            audits: [5, 5, 8, 12]
        },
        breakdown: [
            { label: "Access Requests", value: "8", change: "+2" },
            { label: "Rectification", value: "3", change: "+1" },
            { label: "Deletion", value: "1", change: "+1" }
        ]
    },
    audit_compliance: {
        title: "Audit Compliance",
        category: "Compliance",
        period: "FY 2024",
        description: "Internal and external audit finding closure",
        kpis: [
            { label: "Open Findings", value: "8", target: "0", status: "below", trend: "down", change: "-4", description: "Unresolved issues" },
            { label: "High Risk Open", value: "1", target: "0", status: "below", trend: "down", change: "-2", description: "Critical findings" },
            { label: "Closure Rate", value: "92%", target: "100%", status: "below", trend: "up", change: "+7%", description: "% findings closed on time" },
            { label: "Repeat Findings", value: "0", target: "0", status: "on_target", trend: "neutral", change: "0", description: "Recurrent issues" }
        ],
        trendData: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            open: [25, 18, 12, 8],
            closure: [85, 88, 90, 92]
        },
        breakdown: [
            { label: "IT Audit", value: "3 Open", change: "-2" },
            { label: "Credit Audit", value: "2 Open", change: "-1" },
            { label: "Finance Audit", value: "1 Open", change: "-1" },
            { label: "Ops Audit", value: "2 Open", change: "0" }
        ]
    }
};

