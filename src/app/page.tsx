"use client";

import * as React from "react";

import { DashboardHeader } from "@/components/ecommerce/dashboard-header";
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

export default function Home() {
  const [activeTab, setActiveTab] = React.useState("overview");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DashboardHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 overflow-x-hidden px-4 py-5 md:px-6 lg:px-8">
        {/* Page heading */}
        <div className="flex flex-wrap items-end justify-between gap-3 pb-5">
          <div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
              Global E-Commerce Sales &amp; Customer Analytics
            </h1>
            <p className="text-sm text-muted-foreground">
              Interactive dashboard mirroring the EDA notebook · 2,000 transactions across 22 countries, 4 categories, 3 customer segments (2023 – 2025)
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="rounded-md border border-border/60 bg-muted/40 px-2 py-1 font-medium">
              Last updated: {new Date().toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        {/* KPI summary (always visible) */}
        <KpiCards />

        {/* Tab sections */}
        <div className="mt-5 space-y-4">
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

          {activeTab === "sales" && (
            <>
              <MonthlyTrendChart />
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <YoyComparisonChart />
                <QuarterlyHeatmap />
              </div>
              <DayOfWeekChart />
            </>
          )}

          {activeTab === "geo" && (
            <>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <RegionChart />
                <ShippingCostChart />
              </div>
              <CountryChart />
            </>
          )}

          {activeTab === "products" && (
            <>
              <CategoryChart />
              <TopProductsChart />
            </>
          )}

          {activeTab === "customers" && (
            <>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <SegmentChart />
                <PaymentMethodChart />
              </div>
              <SegmentCategoryChart />
            </>
          )}

          {activeTab === "operations" && (
            <>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <DiscountRangeChart />
                <ShippingCostChart />
              </div>
              <DiscountScatterChart />
              <CorrelationHeatmap />
            </>
          )}
        </div>

        {/* Recent orders always visible */}
        <div className="mt-4 grid grid-cols-1 gap-4">
          <RecentOrdersTable />
        </div>

        {/* Footer */}
        <footer className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
          <span>
            © {new Date().getFullYear()} CommerceIQ · Synthetic dataset mirroring{" "}
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
