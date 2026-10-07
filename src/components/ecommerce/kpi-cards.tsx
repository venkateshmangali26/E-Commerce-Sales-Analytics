"use client";

import * as React from "react";
import {
  ArrowDownRight, ArrowUpRight, CreditCard, DollarSign, Package,
  Percent, Truck, UserCheck, Users, Wallet,
} from "lucide-react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  kpis, calcChange, formatCurrency, formatNumber, monthlyData,
} from "@/lib/ecommerce-data";

type SparkProps = { data: number[]; gradientId: string; stroke: string; };

function Sparkline({ data, gradientId, stroke }: SparkProps) {
  const w = 100, h = 30;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = w / Math.max(1, data.length - 1);
  const points = data.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`).join(" ");
  const fillPoints = `0,${h} ${points} ${w},${h}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-9 w-full" aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={stroke} stopOpacity={0.55} />
          <stop offset="95%" stopColor={stroke} stopOpacity={0.05} />
        </linearGradient>
      </defs>
      <polygon points={fillPoints} fill={`url(#${gradientId})`} />
      <polyline points={points} fill="none" stroke={stroke} strokeWidth={2.4}
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type KpiProps = {
  title: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
  sparkData: number[];
  sparkColor: string;
  gradient: string;
  glow: string;
  caption?: string;
};

function KpiCard({
  title, value, change, icon, sparkData, sparkColor, gradient, glow, caption,
}: KpiProps) {
  const showChange = change !== undefined;
  const isPositive = (change ?? 0) >= 0;
  return (
    <Card
      className="group relative overflow-hidden border-border/40 bg-card/90 backdrop-blur-sm transition-all duration-200 hover:scale-[1.01] sm:hover:scale-[1.02] hover:-translate-y-0.5"
      style={{ boxShadow: "0 4px 20px -10px oklch(0.50 0.04 265 / 0.25)" }}
    >
      {/* Top gradient accent bar */}
      <div
        className="absolute inset-x-0 top-0 h-1 opacity-90"
        style={{ background: gradient }}
      />
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: glow }}
      />
      <CardHeader className="p-2.5 sm:p-3 sm:pb-2">
        <div className="flex items-start justify-between gap-1">
          <div className="space-y-0.5 sm:space-y-1 min-w-0">
            <CardDescription className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-muted-foreground truncate">
              {title}
            </CardDescription>
            <CardTitle className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold tracking-tight tabular-nums truncate">
              {value}
            </CardTitle>
          </div>
          {/* Gradient icon tile */}
          <div
            className="flex h-7 w-7 xs:h-8 xs:w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl text-white shadow-sm sm:shadow-md transition-transform duration-300 group-hover:scale-105"
            style={{ background: gradient }}
          >
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-2.5 pt-0 sm:p-3 sm:pt-0">
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 xs:gap-2">
          {showChange ? (
            <div
              className={`inline-flex items-center gap-0.5 sm:gap-1 rounded-full px-1.5 py-0.5 text-[10px] sm:text-xs font-semibold w-fit ${
                isPositive
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                  : "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400"
              }`}
            >
              {isPositive ? <ArrowUpRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> : <ArrowDownRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />}
              <span className="tabular-nums">{Math.abs(change as number).toFixed(1)}%</span>
              <span className="hidden sm:inline text-muted-foreground font-normal">{caption ?? "vs 2024"}</span>
            </div>
          ) : (
            <div className="text-[10px] sm:text-xs text-muted-foreground truncate">{caption}</div>
          )}
          <div className="w-16 xs:w-20 sm:w-28 shrink-0 self-end xs:self-auto">
            <Sparkline
              data={sparkData}
              gradientId={`spark-${title.replace(/\s/g, "-")}`}
              stroke={sparkColor}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function KpiCards() {
  const recentMonthly = monthlyData.slice(-12);
  const revSpark = recentMonthly.map((m) => m.revenue);
  const profitSpark = recentMonthly.map((m) => m.profit);
  const ordersSpark = recentMonthly.map((m) => m.orders);

  const yearly = kpis.yearly;
  const years = Object.keys(yearly).map(Number).sort();
  const lastYear = years[years.length - 1] || 2025;
  const prevYear = years[years.length - 2] || 2024;
  const yCur = yearly[lastYear] || { revenue: 0, profit: 0, orders: 0 };
  const yPrev = yearly[prevYear] || { revenue: 1, profit: 1, orders: 1 };

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
      <KpiCard
        title="Total Revenue"
        value={formatCurrency(kpis.total_sales, true)}
        change={calcChange(yCur.revenue, yPrev.revenue)}
        icon={<DollarSign className="h-5 w-5" />}
        sparkData={revSpark}
        sparkColor="#10b981"
        gradient="linear-gradient(135deg, #10b981 0%, #06b6d4 100%)"
        glow="0 8px 30px -8px rgba(16, 185, 129, 0.45)"
        caption={`vs ${prevYear}`}
      />
      <KpiCard
        title="Net Profit"
        value={formatCurrency(kpis.total_profit, true)}
        change={calcChange(yCur.profit, yPrev.profit)}
        icon={<Wallet className="h-5 w-5" />}
        sparkData={profitSpark}
        sparkColor="#f59e0b"
        gradient="linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)"
        glow="0 8px 30px -8px rgba(245, 158, 11, 0.45)"
        caption={`vs ${prevYear}`}
      />
      <KpiCard
        title="Total Orders"
        value={formatNumber(kpis.total_orders)}
        change={calcChange(yCur.orders, yPrev.orders)}
        icon={<Package className="h-5 w-5" />}
        sparkData={ordersSpark}
        sparkColor="#8b5cf6"
        gradient="linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
        glow="0 8px 30px -8px rgba(99, 102, 241, 0.45)"
        caption={`vs ${prevYear}`}
      />
      <KpiCard
        title="Avg Order Value"
        value={formatCurrency(kpis.avg_order_value)}
        change={calcChange(yCur.revenue / yCur.orders, yPrev.revenue / yPrev.orders)}
        icon={<CreditCard className="h-5 w-5" />}
        sparkData={revSpark.map((r, i) => (ordersSpark[i] ? r / ordersSpark[i] : 0))}
        sparkColor="#ec4899"
        gradient="linear-gradient(135deg, #ec4899 0%, #6366f1 100%)"
        glow="0 8px 30px -8px rgba(236, 72, 153, 0.45)"
        caption={`vs ${prevYear}`}
      />
      <KpiCard
        title="Profit Margin"
        value={`${kpis.profit_margin.toFixed(2)}%`}
        icon={<Percent className="h-5 w-5" />}
        sparkData={profitSpark.map((p, i) => (revSpark[i] ? (p / revSpark[i]) * 100 : 0))}
        sparkColor="#06b6d4"
        gradient="linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)"
        glow="0 8px 30px -8px rgba(6, 182, 212, 0.45)"
        caption="across 2023-2025"
      />
      <KpiCard
        title="Unique Customers"
        value={formatNumber(kpis.unique_customers)}
        icon={<Users className="h-5 w-5" />}
        sparkData={ordersSpark}
        sparkColor="#0ea5e9"
        gradient="linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)"
        glow="0 8px 30px -8px rgba(14, 165, 233, 0.45)"
        caption={`${formatNumber(kpis.total_orders / kpis.unique_customers, true)} orders/customer`}
      />
      <KpiCard
        title="Avg Discount"
        value={`${kpis.avg_discount.toFixed(1)}%`}
        icon={<UserCheck className="h-5 w-5" />}
        sparkData={revSpark.map((r, i) => (ordersSpark[i] ? r / ordersSpark[i] : 0))}
        sparkColor="#f43f5e"
        gradient="linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)"
        glow="0 8px 30px -8px rgba(244, 63, 94, 0.45)"
        caption="per order avg"
      />
      <KpiCard
        title="Total Shipping"
        value={formatCurrency(kpis.total_shipping, true)}
        icon={<Truck className="h-5 w-5" />}
        sparkData={ordersSpark}
        sparkColor="#84cc16"
        gradient="linear-gradient(135deg, #84cc16 0%, #f59e0b 100%)"
        glow="0 8px 30px -8px rgba(132, 204, 22, 0.45)"
        caption={`${formatCurrency(kpis.total_shipping / kpis.total_orders, true)}/order`}
      />
    </div>
  );
}
