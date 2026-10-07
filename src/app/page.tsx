"use client";

import * as React from "react";

import { DashboardHeader, DASHBOARD_TABS, type TabId } from "@/components/ecommerce/dashboard-header";
import { KpiCards } from "@/components/ecommerce/kpi-cards";
import { MonthlyTrendChart } from "@/components/ecommerce/monthly-trend-chart";
import { YoyComparisonChart } from "@/components/ecommerce/yoy-chart";
import { QuarterlyHeatmap } from "@/components/ecommerce/quarterly-heatmap";
import { RegionChart } from "@/components/ecommerce/region-chart";
import { CountryChart } from "@/components/ecommerce/country-chart";
import { CategoryChart } from "@/components/ecommerce/category-chart";
import { TopProductsChart } from "@/components/ecommerce/top-products-chart";
import { SegmentChart } from "@/components/ecommerce/segment-chart";
import { SegmentCategoryChart } from "@/components/ecommerce/segment-category-chart";
import { DiscountScatterChart } from "@/components/ecommerce/discount-scatter-chart";
import { DiscountRangeChart } from "@/components/ecommerce/discount-range-chart";
import { PaymentMethodChart } from "@/components/ecommerce/payment-method-chart";
import { ShippingCostChart } from "@/components/ecommerce/shipping-cost-chart";
import { CorrelationHeatmap } from "@/components/ecommerce/correlation-heatmap";
import { DayOfWeekChart } from "@/components/ecommerce/day-of-week-chart";
import { RecentOrdersTable } from "@/components/ecommerce/recent-orders-table";
import { KeyInsights } from "@/components/ecommerce/key-insights";

const TAB_META: Record<
  TabId,
  { title: string; subtitle: string; badge: string; color: string }
> = {
  overview: {
    title: "Executive Overview & Global Summary",
    subtitle: "High-level performance, KPI metrics, monthly sales trajectory, and algorithmic key insights.",
    badge: "Summary View",
    color: "from-indigo-500 to-purple-600",
  },
  sales: {
    title: "Sales Trends & Day-of-Week Seasonality",
    subtitle: "Deep dive into 36-month sales volume, peak weekday spikes, and quarterly revenue distribution.",
    badge: "Sales Analytics",
    color: "from-emerald-500 to-cyan-600",
  },
  geo: {
    title: "Geographic Markets & Shipping Efficiency",
    subtitle: "Regional revenue contributions, country-level sales volume, and logistics cost impact.",
    badge: "Geographic View",
    color: "from-cyan-500 to-blue-600",
  },
  products: {
    title: "Product Performance & Category Profitability",
    subtitle: "Top 10 revenue-driving SKUs, category market share donut, and revenue vs profit margins.",
    badge: "Product Analytics",
    color: "from-amber-500 to-rose-600",
  },
  customers: {
    title: "Customer Segments & Payment Behavior",
    subtitle: "Consumer vs Corporate vs Home Office breakdown, payment preferences, and cross-category affinity.",
    badge: "Customer Intelligence",
    color: "from-pink-500 to-rose-600",
  },
  operations: {
    title: "Operations, Correlations & Discount Sensitivity",
    subtitle: "Pearson correlation matrix across numerical variables, discount tier margins, and risk scatter analysis.",
    badge: "Statistical Analysis",
    color: "from-lime-500 to-amber-600",
  },
};

export default function Home() {
  const [activeTab, setActiveTab] = React.useState<string>("overview");

  // Sync state with URL hash on mount and when hash changes
  React.useEffect(() => {
    const syncFromHash = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash.replace("#", "").toLowerCase();
        if (DASHBOARD_TABS.some((t) => t.id === hash)) {
          setActiveTab(hash);
        }
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const switchTab = (tabId: string) => {
    setActiveTab(tabId);
    if (typeof window !== "undefined") {
      window.location.hash = tabId;
      // Scroll to content container
      const el = document.getElementById("dashboard-tab-content");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const currentMeta = TAB_META[activeTab as TabId] || TAB_META.overview;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DashboardHeader activeTab={activeTab} onTabChange={switchTab} />

      <main className="flex-1 overflow-x-hidden px-2.5 py-3 sm:px-6 sm:py-5 lg:px-8 max-w-[1600px] mx-auto w-full">
        {/* Colorful hero banner */}
        <div
          className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-border/40 p-3.5 sm:p-5 md:p-6 mb-3 sm:mb-5"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.55 0.22 268 / 0.92) 0%, oklch(0.62 0.22 320 / 0.88) 50%, oklch(0.70 0.20 25 / 0.85) 100%)",
          }}
        >
          {/* Decorative blurred orbs */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-yellow-300/20 blur-2xl" />
          <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 sm:gap-3">
            <div className="text-white">
              <div className="mb-1.5 inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-medium backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Live · 2,000 transactions · 22 countries
              </div>
              <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                Global E-Commerce Sales Analytics
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-white/90 max-w-2xl leading-relaxed">
                Interactive executive dashboard · revenue, profit margins, geography, customer segments, and operations across 2023 – 2025.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-white/90 shrink-0 self-start sm:self-auto">
              <div className="rounded-lg bg-white/15 px-2.5 py-1 sm:px-3 sm:py-1.5 font-medium backdrop-blur">
                2023 – 2025 Dataset
              </div>
            </div>
          </div>
        </div>

        {/* KPI summary (always visible) */}
        <KpiCards />

        {/* PROMINENT IN-PAGE TAB NAVIGATION BAR */}
        <div id="dashboard-tab-content" className="mt-6 scroll-mt-20">
          <div className="rounded-2xl border border-border/70 bg-card p-1.5 sm:p-2 shadow-sm">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto [scrollbar-width:none] touch-pan-x -webkit-overflow-scrolling-touch py-0.5">
              {DASHBOARD_TABS.map((t) => {
                const active = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    id={`inpage-tab-${t.id}`}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => switchTab(t.id)}
                    className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer select-none ${
                      active
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md scale-[1.02]"
                        : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    }`}
                  >
                    <span className="text-sm sm:text-base">{t.emoji}</span>
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Section Info Banner */}
          <div className="mt-3.5 mb-4 rounded-xl border border-border/50 bg-muted/30 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                <span>{currentMeta.badge}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                {currentMeta.title}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {currentMeta.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 text-xs text-muted-foreground">
              <span className="font-medium">Active tab:</span>
              <span className="rounded-md bg-background px-2 py-0.5 font-bold text-foreground border border-border capitalize">
                {activeTab}
              </span>
            </div>
          </div>
        </div>

        {/* Tab content sections */}
        <div className="space-y-4">
          {/* 1. OVERVIEW TAB */}
          {activeTab === "overview" && (
            <>
              <MonthlyTrendChart />
              <KeyInsights />
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <YoyComparisonChart />
                <QuarterlyHeatmap />
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <RegionChart />
                <CategoryChart />
              </div>
            </>
          )}

          {/* 2. SALES TRENDS TAB */}
          {activeTab === "sales" && (
            <>
              <MonthlyTrendChart />
              <DayOfWeekChart />
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <YoyComparisonChart />
                <QuarterlyHeatmap />
              </div>
            </>
          )}

          {/* 3. GEOGRAPHIC ANALYSIS TAB */}
          {activeTab === "geo" && (
            <>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <RegionChart />
                <ShippingCostChart />
              </div>
              <CountryChart />
            </>
          )}

          {/* 4. PRODUCTS & CATEGORIES TAB */}
          {activeTab === "products" && (
            <>
              <TopProductsChart />
              <CategoryChart />
            </>
          )}

          {/* 5. CUSTOMERS & PAYMENT METHODS TAB */}
          {activeTab === "customers" && (
            <>
              <SegmentChart />
              <PaymentMethodChart />
              <SegmentCategoryChart />
            </>
          )}

          {/* 6. OPERATIONS & ANALYTICS TAB */}
          {activeTab === "operations" && (
            <>
              <CorrelationHeatmap />
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <DiscountRangeChart />
                <ShippingCostChart />
              </div>
              <DiscountScatterChart />
            </>
          )}
        </div>

        {/* Recent orders always visible */}
        <div className="mt-6 grid grid-cols-1 gap-4">
          <RecentOrdersTable />
        </div>

        {/* Footer */}
        <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
          <span>
            © {new Date().getFullYear()} CommerceIQ · Interactive sales analytics mirroring{" "}
            <span className="font-mono">global_ecommerce_sales.csv</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            All systems operational
          </span>
        </footer>
      </main>
    </div>
  );
}
