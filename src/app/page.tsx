"use client";

import * as React from "react";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { SalesTrendChart } from "@/components/dashboard/sales-trend-chart";
import { CategoryChart } from "@/components/dashboard/category-chart";
import { TopProductsChart } from "@/components/dashboard/top-products-chart";
import { RegionChart } from "@/components/dashboard/region-chart";
import { FunnelChart } from "@/components/dashboard/funnel-chart";
import { RecentOrdersTable } from "@/components/dashboard/recent-orders-table";
import {
  formatCurrency,
  formatNumber,
  kpis,
  calcChange,
} from "@/lib/dashboard-data";
import {
  DollarSign,
  PackageCheck,
  RotateCcw,
  UserPlus,
} from "lucide-react";

function StatChip({
  icon,
  label,
  value,
  change,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: number;
}) {
  const positive = change >= 0;
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card px-3 py-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/60 text-muted-foreground">
        {icon}
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[11px] text-muted-foreground">{label}</span>
        <span className="text-sm font-semibold tabular-nums">{value}</span>
      </div>
      <div
        className={`ml-auto text-xs font-medium tabular-nums ${
          positive ? "text-emerald-600" : "text-rose-600"
        }`}
      >
        {positive ? "+" : ""}
        {change.toFixed(1)}%
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DashboardHeader />
      <div className="flex flex-1">
        <SidebarNav />
        <main className="flex-1 overflow-x-hidden px-4 py-5 md:px-6 lg:px-7">
          {/* Page heading */}
          <div className="flex flex-wrap items-end justify-between gap-3 pb-5">
            <div>
              <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
                Sales Analytics
              </h1>
              <p className="text-sm text-muted-foreground">
                Track revenue, orders, customers and product performance in real time.
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

          {/* KPI cards */}
          <KpiCards />

          {/* Secondary stat chips */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatChip
              icon={<UserPlus className="h-4 w-4" />}
              label="New Customers"
              value={formatNumber(kpis.newCustomers)}
              change={calcChange(kpis.newCustomers, kpis.newCustomersPrev)}
            />
            <StatChip
              icon={<PackageCheck className="h-4 w-4" />}
              label="Fulfilled Orders"
              value={formatNumber(kpis.totalOrders - 142)}
              change={calcChange(kpis.totalOrders - 142, kpis.ordersPrev - 168)}
            />
            <StatChip
              icon={<RotateCcw className="h-4 w-4" />}
              label="Refunds"
              value={formatNumber(kpis.refunds)}
              change={calcChange(kpis.refunds, kpis.refundsPrev)}
            />
            <StatChip
              icon={<DollarSign className="h-4 w-4" />}
              label="Gross Profit"
              value={formatCurrency(228710, true)}
              change={16.2}
            />
          </div>

          {/* Main charts grid */}
          <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
            <SalesTrendChart />
            <CategoryChart />
          </div>

          {/* Secondary charts grid */}
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <TopProductsChart />
            <RegionChart />
            <FunnelChart />
          </div>

          {/* Recent orders table */}
          <div className="mt-4 grid grid-cols-1 gap-4">
            <RecentOrdersTable />
          </div>

          {/* Footer */}
          <footer className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
            <span>
              © {new Date().getFullYear()} CommerceIQ. Sales data is illustrative.
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
    </div>
  );
}
