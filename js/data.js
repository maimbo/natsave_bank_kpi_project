const MOCK_DATA = {
    dashboard: {
        nim: {
            value: 6.8,
            change: 0.15,
            trend: "up",
            description: "Net interest margin vs last month",
            drill_down: {
                sections: [
                    {
                        title: "Yield Analysis",
                        items: [
                            {
                                label: "Yield on Loans (Avg)",
                                value: "14.5%",
                                sub_items: [
                                    { label: "Corporate Term Loans", value: "11.5%" },
                                    { label: "SME Overdrafts", value: "18.2%" },
                                    { label: "Retail Personal Loans", value: "24.5%" },
                                    { label: "Mortgages", value: "12.0%" }
                                ]
                            },
                            {
                                label: "Yield on Securities",
                                value: "15.2%",
                                sub_items: [
                                    { label: "Treasury Bills (Weighted)", value: "14.8%" },
                                    { label: "GRZ Bonds (Fixed)", value: "16.5%" }
                                ]
                            }
                        ]
                    },
                    {
                        title: "Funding Cost Analysis",
                        items: [
                            {
                                label: "Cost of Deposits",
                                value: "3.1%",
                                sub_items: [
                                    { label: "Current/Cheque (CASA)", value: "0.0%" },
                                    { label: "Savings Accounts", value: "2.5%" },
                                    { label: "Fixed Term Deposits", value: "8.5%" }
                                ]
                            },
                            {
                                label: "Wholesale Funding",
                                value: "9.2%",
                                sub_items: [
                                    { label: "Interbank Borrowing", value: "9.5%" },
                                    { label: "Long-term Debt", value: "8.5%" }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        active_customers: {
            value: "142,500",
            change: 1250,
            trend: "up",
            description: "New this month",
            drill_down: {
                sections: [
                    {
                        title: "Segment Breakdown",
                        items: [
                            {
                                label: "Retail Customers",
                                value: "98,750",
                                sub_items: [
                                    { label: "Savings Account Holders", value: "65,400" },
                                    { label: "Current Account Holders", value: "18,200" },
                                    { label: "Loan Customers", value: "15,150" }
                                ]
                            },
                            {
                                label: "SME Customers",
                                value: "38,250",
                                sub_items: [
                                    { label: "Small Enterprises", value: "28,100" },
                                    { label: "Medium Enterprises", value: "10,150" }
                                ]
                            },
                            {
                                label: "Corporate Customers",
                                value: "5,500",
                                sub_items: [
                                    { label: "Private Sector", value: "4,200" },
                                    { label: "Government/Parastatals", value: "1,300" }
                                ]
                            }
                        ]
                    },
                    {
                        title: "Channel Activity (MTD)",
                        items: [
                            {
                                label: "Digital Active",
                                value: "96,900",
                                sub_items: [
                                    { label: "Mobile Banking", value: "78,500" },
                                    { label: "Internet Banking", value: "18,400" }
                                ]
                            },
                            {
                                label: "Branch Active",
                                value: "45,600",
                                sub_items: [
                                    { label: "Branch Transactions", value: "32,100" },
                                    { label: "ATM/CDM Users", value: "13,500" }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        compliance_score: {
            value: 98.5,
            change: 0.5,
            trend: "up",
            description: "BoZ regulations compliance",
            drill_down: {
                sections: [
                    {
                        title: "Prudential Requirements",
                        items: [
                            {
                                label: "Capital Adequacy Ratio",
                                value: "18.2%",
                                sub_items: [
                                    { label: "Core Capital (Tier 1)", value: "14.5%" },
                                    { label: "Supplementary (Tier 2)", value: "3.7%" },
                                    { label: "Minimum Required", value: "10.0%" }
                                ]
                            },
                            {
                                label: "Liquidity Coverage Ratio",
                                value: "145%",
                                sub_items: [
                                    { label: "High-Quality Liquid Assets", value: "ZMW 1.82B" },
                                    { label: "Net Cash Outflows (30d)", value: "ZMW 1.26B" },
                                    { label: "Minimum Required", value: "100%" }
                                ]
                            },
                            {
                                label: "Credit Concentration",
                                value: "Compliant",
                                sub_items: [
                                    { label: "Single Borrower Limit", value: "18.5% (Max 25%)" },
                                    { label: "Related Parties", value: "4.2% (Max 20%)" }
                                ]
                            }
                        ]
                    },
                    {
                        title: "Operational Compliance",
                        items: [
                            {
                                label: "AML/CFT Compliance",
                                value: "99.2%",
                                sub_items: [
                                    { label: "KYC Updated", value: "98.5%" },
                                    { label: "STR Filed (MTD)", value: "24" },
                                    { label: "Suspicious Activity Resolved", value: "100%" }
                                ]
                            },
                            {
                                label: "Data Protection (GDPR)",
                                value: "97.8%",
                                sub_items: [
                                    { label: "Consent Forms", value: "99.1%" },
                                    { label: "Data Breaches (YTD)", value: "0" }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        revenue_trend: [
            { month: "Jan", revenue: 82000000 },
            { month: "Feb", revenue: 84500000 },
            { month: "Mar", revenue: 81000000 },
            { month: "Apr", revenue: 86000000 },
            { month: "May", revenue: 88000000 },
            { month: "Jun", revenue: 92000000 },
            { month: "Jul", revenue: 89000000 },
            { month: "Aug", revenue: 90500000 },
            { month: "Sep", revenue: 87000000 },
            { month: "Oct", revenue: 94000000 },
            { month: "Nov", revenue: 96000000 },
            { month: "Dec", revenue: 98000000 }
        ],
        revenue_details: {
            value: "ZMW 1.03B",
            change: "+12%",
            trend: "up",
            drill_down: {
                sections: [
                    {
                        title: "Revenue Streams",
                        items: [
                            {
                                label: "Interest Income",
                                value: "ZMW 685M",
                                sub_items: [
                                    { label: "Loans & Advances", value: "ZMW 580M" },
                                    { label: "Securities & Investments", value: "ZMW 105M" }
                                ]
                            },
                            {
                                label: "Fee & Commission Income",
                                value: "ZMW 245M",
                                sub_items: [
                                    { label: "Transaction Fees", value: "ZMW 145M" },
                                    { label: "Service Charges", value: "ZMW 68M" },
                                    { label: "FX Trading Income", value: "ZMW 32M" }
                                ]
                            },
                            {
                                label: "Other Operating Income",
                                value: "ZMW 100M",
                                sub_items: [
                                    { label: "Rental Income", value: "ZMW 45M" },
                                    { label: "Insurance Commissions", value: "ZMW 35M" },
                                    { label: "Other", value: "ZMW 20M" }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    },
    roa: [{
        report_date: "2023-12-31",
        net_income: 145200000.00,
        total_assets: 12550000000.00,
        roa_percentage: 1.16,
        drill_down: {
            sections: [
                {
                    title: "Income Statement Analysis (YTD)",
                    items: [
                        {
                            label: "Net Interest Income",
                            value: "ZMW 685M",
                            sub_items: [
                                { label: "Interest Income", value: "ZMW 1,820M" },
                                { label: "Interest Expense", value: "(ZMW 1,135M)" }
                            ]
                        },
                        {
                            label: "Non-Interest Revenue",
                            value: "ZMW 345M",
                            sub_items: [
                                { label: "Fees & Commissions", value: "ZMW 245M" },
                                { label: "FX & Trading", value: "ZMW 68M" },
                                { label: "Other Income", value: "ZMW 32M" }
                            ]
                        },
                        {
                            label: "Operating Expenses",
                            value: "(ZMW 580M)",
                            sub_items: [
                                { label: "Staff Costs", value: "(ZMW 320M)" },
                                { label: "Infrastructure & IT", value: "(ZMW 160M)" },
                                { label: "Other Opex", value: "(ZMW 100M)" }
                            ]
                        },
                        {
                            label: "Impairment Charges",
                            value: "(ZMW 85M)",
                            sub_items: [
                                { label: "Loan Loss Provisions", value: "(ZMW 78M)" },
                                { label: "Other Impairments", value: "(ZMW 7M)" }
                            ]
                        }
                    ]
                },
                {
                    title: "Balance Sheet Structure",
                    items: [
                        {
                            label: "Total Assets",
                            value: "ZMW 12.55B",
                            sub_items: [
                                { label: "Loans & Advances", value: "ZMW 8.2B" },
                                { label: "Securities", value: "ZMW 2.8B" },
                                { label: "Cash & Equivalents", value: "ZMW 1.2B" },
                                { label: "Other Assets", value: "ZMW 0.35B" }
                            ]
                        },
                        {
                            label: "Liabilities & Equity",
                            value: "ZMW 12.55B",
                            sub_items: [
                                { label: "Customer Deposits", value: "ZMW 10.1B" },
                                { label: "Borrowings", value: "ZMW 0.8B" },
                                { label: "Equity", value: "ZMW 1.65B" }
                            ]
                        }
                    ]
                }
            ]
        }
    }]
};
