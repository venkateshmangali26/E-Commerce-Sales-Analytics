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
        {/* 🎨 Colorful hero banner */}
        <div
          className="relative overflow-hidden rounded-2xl border border-border/40 p-5 md:p-6 mb-5"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.55 0.22 268 / 0.92) 0%, oklch(0.62 0.22 320 / 0.88) 50%, oklch(0.70 0.20 25 / 0.85) 100%)",
          }}
        >
          {/* Decorative blurred orbs */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-yellow-300/20 blur-2xl" />
          <div className="relative flex flex-wrap items-end justify-between gap-3">
            <div className="text-white">
              <div className="mb-1.5 inline-flex items-center gap-2 rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-medium backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Live · 2,000 transactions · 22 countries
              </div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Global E-Commerce Sales Analytics
              </h1>
              <p className="mt-1 text-sm text-white/85 max-w-2xl">
                Interactive dashboard mirroring the EDA notebook · revenue, profit, geography, customers, and operational KPIs across 2023 – 2025
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/90">
              <div className="rounded-lg bg-white/15 px-3 py-1.5 font-medium backdrop-blur">
                Last updated: {new Date().toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
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
