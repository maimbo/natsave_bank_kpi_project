const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            loading: true,
            dashboard: null,
            roaData: null,
            // Chart instance
            revenueChart: null,
            // Header Filters
            filters: {
                year: '2024',
                period: 'Q1'
            },
            // Sub-menu state (Based on KPI categories from /docs/kpis)
            expandedMenus: {
                financial: false,
                operational: false,
                quality: false,
                risk: false,
                compliance: false
            },
            // Navigation State
            currentView: 'dashboard',
            activeTab: 'financials',
            // Modal State
            activeSheet: null,
            isMaximized: false,
            selectedItem: null
        }
    },
    mounted() {
        // Initialize Lucide icons for static elements first
        this.$nextTick(() => {
            if (window.lucide) lucide.createIcons();
        });

        // Simulate fetching data
        this.fetchData();
    },
    updated() {
        // Re-initialize icons when DOM updates
        this.$nextTick(() => {
            if (window.lucide) lucide.createIcons();
        });
    },
    methods: {
        async fetchData() {
            this.loading = true;
            try {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 800));

                // Load from global MOCK_DATA (defined in data.js)
                if (typeof MOCK_DATA !== 'undefined') {
                    this.dashboard = MOCK_DATA.dashboard;
                    this.roaData = MOCK_DATA.roa;

                    // Set loading to false first to render the DOM
                    this.loading = false;

                    // Initialize Chart after DOM is ready
                    this.$nextTick(() => {
                        this.initCharts();
                        if (window.lucide) lucide.createIcons();
                    });
                } else {
                    console.error("MOCK_DATA not found. Ensure js/data.js is loaded.");
                    this.loading = false;
                }
            } catch (error) {
                console.error("Error loading data:", error);
                this.loading = false;
            }
        },
        async applyFilters() {
            this.loading = true;
            // Simulate API call with new filters
            await new Promise(resolve => setTimeout(resolve, 600));

            // In a real app, we would fetch new data here based on filters
            // For this prototype, the mock data is static, but filters are reflected in the UI badges

            // Re-initialize the chart to ensure it's rendered properly
            this.$nextTick(() => {
                this.initCharts();
                if (window.lucide) lucide.createIcons();
            });

            this.loading = false;
        },
        setView(view) {
            this.currentView = view;
            window.scrollTo(0, 0);

            // Re-initialize chart when returning to dashboard
            if (view === 'dashboard') {
                this.$nextTick(() => {
                    if (this.dashboard && this.dashboard.revenue_trend) {
                        this.initCharts();
                    }
                    if (window.lucide) lucide.createIcons();
                });
            } else {
                // Just reinitialize icons for other views
                this.$nextTick(() => {
                    if (window.lucide) lucide.createIcons();
                });
            }
        },
        openRevenueSheet(month, value) {
            this.isMaximized = false;
            this.selectedItem = null;

            const data = this.dashboard.revenue_details;

            this.activeSheet = {
                title: `Revenue Breakdown: ${month} ${this.filters.year}`,
                description: "Monthly revenue composition and regional performance",
                icon: "pie-chart",
                value: "ZMW " + this.formatCompact(value),
                change: data.change,
                trend: data.trend,
                drill_down: data.drill_down
            };

            // Pre-select first item
            if (data.drill_down?.sections?.[0]?.items?.[0]) {
                this.selectedItem = data.drill_down.sections[0].items[0];
            }

            this.$nextTick(() => { if (window.lucide) lucide.createIcons(); });
        },
        openRevenueTrendAnalysis() {
            if (!this.dashboard || !this.dashboard.revenue_trend) return;

            const trendData = this.dashboard.revenue_trend;
            const revenues = trendData.map(d => d.revenue);

            // Calculate analytics
            const totalRevenue = revenues.reduce((sum, val) => sum + val, 0);
            const avgRevenue = totalRevenue / revenues.length;
            const maxRevenue = Math.max(...revenues);
            const minRevenue = Math.min(...revenues);
            const maxMonth = trendData.find(d => d.revenue === maxRevenue).month;
            const minMonth = trendData.find(d => d.revenue === minRevenue).month;

            // Calculate growth rate (Dec vs Jan)
            const growthRate = ((revenues[11] - revenues[0]) / revenues[0] * 100).toFixed(1);

            // Quarterly breakdown
            const q1 = revenues.slice(0, 3).reduce((sum, val) => sum + val, 0);
            const q2 = revenues.slice(3, 6).reduce((sum, val) => sum + val, 0);
            const q3 = revenues.slice(6, 9).reduce((sum, val) => sum + val, 0);
            const q4 = revenues.slice(9, 12).reduce((sum, val) => sum + val, 0);

            this.isMaximized = false;
            this.selectedItem = null;

            this.activeSheet = {
                title: "Annual Revenue Trend Analysis",
                description: `Full year performance insights for FY ${this.filters.year}`,
                icon: "trending-up",
                value: "ZMW " + this.formatCompact(totalRevenue),
                change: growthRate + "%",
                trend: parseFloat(growthRate) >= 0 ? "up" : "down",
                drill_down: {
                    sections: [
                        {
                            title: "Quarterly Performance",
                            items: [
                                {
                                    label: "Q1 (Jan-Mar)",
                                    value: "ZMW " + this.formatCompact(q1),
                                    sub_items: [
                                        { label: "Average Monthly", value: "ZMW " + this.formatCompact(q1 / 3) },
                                        { label: "Contribution to Total", value: ((q1 / totalRevenue) * 100).toFixed(1) + "%" }
                                    ]
                                },
                                {
                                    label: "Q2 (Apr-Jun)",
                                    value: "ZMW " + this.formatCompact(q2),
                                    sub_items: [
                                        { label: "Average Monthly", value: "ZMW " + this.formatCompact(q2 / 3) },
                                        { label: "Contribution to Total", value: ((q2 / totalRevenue) * 100).toFixed(1) + "%" },
                                        { label: "Growth vs Q1", value: (((q2 - q1) / q1) * 100).toFixed(1) + "%" }
                                    ]
                                },
                                {
                                    label: "Q3 (Jul-Sep)",
                                    value: "ZMW " + this.formatCompact(q3),
                                    sub_items: [
                                        { label: "Average Monthly", value: "ZMW " + this.formatCompact(q3 / 3) },
                                        { label: "Contribution to Total", value: ((q3 / totalRevenue) * 100).toFixed(1) + "%" },
                                        { label: "Growth vs Q2", value: (((q3 - q2) / q2) * 100).toFixed(1) + "%" }
                                    ]
                                },
                                {
                                    label: "Q4 (Oct-Dec)",
                                    value: "ZMW " + this.formatCompact(q4),
                                    sub_items: [
                                        { label: "Average Monthly", value: "ZMW " + this.formatCompact(q4 / 3) },
                                        { label: "Contribution to Total", value: ((q4 / totalRevenue) * 100).toFixed(1) + "%" },
                                        { label: "Growth vs Q3", value: (((q4 - q3) / q3) * 100).toFixed(1) + "%" }
                                    ]
                                }
                            ]
                        },
                        {
                            title: "Performance Insights",
                            items: [
                                {
                                    label: "Annual Metrics",
                                    value: "Overview",
                                    sub_items: [
                                        { label: "Total Annual Revenue", value: "ZMW " + this.formatCompact(totalRevenue) },
                                        { label: "Average Monthly", value: "ZMW " + this.formatCompact(avgRevenue) },
                                        { label: "YoY Growth Rate", value: growthRate + "%" }
                                    ]
                                },
                                {
                                    label: "Peak Performance",
                                    value: maxMonth + " - ZMW " + this.formatCompact(maxRevenue),
                                    sub_items: [
                                        { label: "Amount", value: "ZMW " + this.formatCompact(maxRevenue) },
                                        { label: "Above Average", value: "+" + this.formatCompact(maxRevenue - avgRevenue) },
                                        { label: "% of Total", value: ((maxRevenue / totalRevenue) * 100).toFixed(1) + "%" }
                                    ]
                                },
                                {
                                    label: "Lowest Performance",
                                    value: minMonth + " - ZMW " + this.formatCompact(minRevenue),
                                    sub_items: [
                                        { label: "Amount", value: "ZMW " + this.formatCompact(minRevenue) },
                                        { label: "Below Average", value: "-" + this.formatCompact(avgRevenue - minRevenue) },
                                        { label: "Recovery Potential", value: "ZMW " + this.formatCompact(maxRevenue - minRevenue) }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            };

            // Pre-select first item
            if (this.activeSheet.drill_down?.sections?.[0]?.items?.[0]) {
                this.selectedItem = this.activeSheet.drill_down.sections[0].items[0];
            }

            this.$nextTick(() => { if (window.lucide) lucide.createIcons(); });
        },
        openSheet(type) {
            this.isMaximized = false;
            this.selectedItem = null;

            if (type === 'roa' && this.roaData) {
                const data = this.roaData[0];
                this.activeSheet = {
                    title: "Return on Assets",
                    description: "Financial statement breakdown analysis",
                    icon: "trending-up",
                    value: data.roa_percentage + "%",
                    change: "4.5%",
                    trend: "up",
                    drill_down: data.drill_down
                };

                // Pre-select first item
                if (data.drill_down?.sections?.[0]?.items?.[0]) {
                    this.selectedItem = data.drill_down.sections[0].items[0];
                }
            } else if (this.dashboard && this.dashboard[type]) {
                const data = this.dashboard[type];
                this.activeSheet = {
                    title: type === 'nim' ? "Net Interest Margin" :
                        type === 'active_customers' ? "Active Customers" : "Compliance Score",
                    description: data.description,
                    icon: type === 'nim' ? "bar-chart-3" :
                        type === 'active_customers' ? "users" : "shield-check",
                    value: type === 'compliance_score' ? data.value + "/100" : data.value,
                    change: data.change,
                    trend: data.trend,
                    drill_down: data.drill_down
                };
                // Pre-select first item
                if (data.drill_down?.sections?.[0]?.items?.[0]) {
                    this.selectedItem = data.drill_down.sections[0].items[0];
                }
            }

            // Re-init icons inside modal and check DOM
            this.$nextTick(() => {
                if (window.lucide) lucide.createIcons();
            });
        },
        closeSheet() {
            this.activeSheet = null;
        },
        toggleMaximize() {
            this.isMaximized = !this.isMaximized;
            this.$nextTick(() => { if (window.lucide) lucide.createIcons(); });
        },
        selectItem(item) {
            if (this.isMaximized) {
                this.selectedItem = item;
            } else {
                // Auto-maximize on selection if not already
                this.isMaximized = true;
                this.selectedItem = item;
            }
        },
        toggleMenu(menuKey) {
            this.expandedMenus[menuKey] = !this.expandedMenus[menuKey];
            // Only reinitialize icons in next tick
            this.$nextTick(() => {
                if (window.lucide) {
                    // Only update icons, don't touch the chart
                    lucide.createIcons();
                }
            });
        },
        formatCompact(number) {
            if (!number) return '0';
            const formatter = Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 });
            return formatter.format(number);
        },
        getTrendClass(trend) {
            if (trend === 'up') return 'change-up flex items-center';
            if (trend === 'down') return 'change-down flex items-center';
            return 'change-neutral flex items-center';
        },
        initCharts() {
            if (!this.dashboard || !this.dashboard.revenue_trend) return;

            const trendData = this.dashboard.revenue_trend;

            // Destroy existing chart if it exists
            if (this.revenueChart) {
                this.revenueChart.destroy();
            }

            const options = {
                series: [{
                    name: 'Revenue',
                    data: trendData.map(d => d.revenue)
                }],
                chart: {
                    id: 'revenue-trend-chart',
                    type: 'bar',
                    height: 350,
                    fontFamily: 'Inter, sans-serif',
                    toolbar: { show: false },
                    events: {
                        dataPointSelection: (event, chartContext, config) => {
                            const dataIndex = config.dataPointIndex;
                            const month = trendData[dataIndex].month;
                            this.openRevenueSheet(month, trendData[dataIndex].revenue);
                        }
                    }
                },
                colors: ['#00AE57'], // Natsave Primary
                plotOptions: {
                    bar: {
                        borderRadius: 4,
                        horizontal: false,
                        columnWidth: '55%',
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: trendData.map(d => d.month),
                    axisBorder: { show: false },
                    axisTicks: { show: false }
                },
                yaxis: {
                    labels: {
                        formatter: function (val) {
                            return "ZMW " + (val / 1000000).toFixed(0) + "M";
                        }
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "ZMW " + val.toLocaleString();
                        }
                    }
                },
                grid: {
                    borderColor: '#f1f5f9',
                    strokeDashArray: 4,
                }
            };

            this.revenueChart = new ApexCharts(document.querySelector("#revenueChart"), options);
            this.revenueChart.render();
        }
    }
});

app.mount('#app');
