"use client";

import * as React from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Package,
  Percent,
  Truck,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  kpis,
  calcChange,
  formatCurrency,
  formatNumber,
  monthlyData,
} from "@/lib/ecommerce-data";

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 100;
  const h = 30;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = w / Math.max(1, data.length - 1);
  const points = data
    .map((v, i) => `${i * step},${h - ((v - min) / range) * h}`)
    .join(" ");
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="h-8 w-full"
      aria-hidden
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
  caption?: string;
};

function KpiCard({ title, value, change, icon, sparkData, sparkColor, caption }: KpiProps) {
  const showChange = change !== undefined;
  const isPositive = (change ?? 0) >= 0;
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardDescription className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {title}
            </CardDescription>
            <CardTitle className="text-xl font-semibold tracking-tight tabular-nums sm:text-2xl">
              {value}
            </CardTitle>
          </div>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${sparkColor}1a`, color: sparkColor }}
          >
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between gap-2">
          {showChange ? (
            <div
              className={`flex items-center gap-1 text-xs font-medium ${
                isPositive ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {isPositive ? (
                <ArrowUpRight className="h-3.5 w-3.5" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5" />
              )}
              <span className="tabular-nums">{Math.abs(change as number).toFixed(1)}%</span>
              <span className="text-muted-foreground font-normal">{caption ?? "vs 2024"}</span>
            </div>
          ) : (
            <div className="text-xs text-muted-foreground">{caption}</div>
          )}
          <div className="w-24">
            <Sparkline data={sparkData} color={sparkColor} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function KpiCards() {
  // Sparkline: last 12 months
  const recentMonthly = monthlyData.slice(-12);
  const revSpark = recentMonthly.map((m) => m.revenue);
  const profitSpark = recentMonthly.map((m) => m.profit);
  const ordersSpark = recentMonthly.map((m) => m.orders);

  // YoY changes vs 2024
  const yearly = kpis.yearly;
  const years = Object.keys(yearly).map(Number).sort();
  const lastYear = years[years.length - 1] || 2025;
  const prevYear = years[years.length - 2] || 2024;
  const yCur = yearly[lastYear] || { revenue: 0, profit: 0, orders: 0 };
  const yPrev = yearly[prevYear] || { revenue: 1, profit: 1, orders: 1 };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Total Revenue"
        value={formatCurrency(kpis.total_sales, true)}
        change={calcChange(yCur.revenue, yPrev.revenue)}
        icon={<DollarSign className="h-4 w-4" />}
        sparkData={revSpark}
        sparkColor="#10b981"
        caption={`vs ${prevYear}`}
      />
      <KpiCard
        title="Net Profit"
        value={formatCurrency(kpis.total_profit, true)}
        change={calcChange(yCur.profit, yPrev.profit)}
        icon={<Wallet className="h-4 w-4" />}
        sparkData={profitSpark}
        sparkColor="#f59e0b"
        caption={`vs ${prevYear}`}
      />
      <KpiCard
        title="Total Orders"
        value={formatNumber(kpis.total_orders)}
        change={calcChange(yCur.orders, yPrev.orders)}
        icon={<Package className="h-4 w-4" />}
        sparkData={ordersSpark}
        sparkColor="#8b5cf6"
        caption={`vs ${prevYear}`}
      />
      <KpiCard
        title="Avg Order Value"
        value={formatCurrency(kpis.avg_order_value)}
        change={calcChange(yCur.revenue / yCur.orders, yPrev.revenue / yPrev.orders)}
        icon={<CreditCard className="h-4 w-4" />}
        sparkData={revSpark.map((r, i) => (ordersSpark[i] ? r / ordersSpark[i] : 0))}
        sparkColor="#ec4899"
        caption={`vs ${prevYear}`}
      />
      <KpiCard
        title="Profit Margin"
        value={`${kpis.profit_margin.toFixed(2)}%`}
        icon={<Percent className="h-4 w-4" />}
        sparkData={profitSpark.map((p, i) => (revSpark[i] ? (p / revSpark[i]) * 100 : 0))}
        sparkColor="#06b6d4"
        caption="across 2023-2025"
      />
      <KpiCard
        title="Unique Customers"
        value={formatNumber(kpis.unique_customers)}
        icon={<Users className="h-4 w-4" />}
        sparkData={ordersSpark}
        sparkColor="#0ea5e9"
        caption={`${formatNumber(kpis.total_orders / kpis.unique_customers, true)} orders/customer`}
      />
      <KpiCard
        title="Avg Discount"
        value={`${kpis.avg_discount.toFixed(1)}%`}
        icon={<UserCheck className="h-4 w-4" />}
        sparkData={revSpark.map((r, i) => (ordersSpark[i] ? r / ordersSpark[i] : 0))}
        sparkColor="#f43f5e"
        caption="per order avg"
      />
      <KpiCard
        title="Total Shipping"
        value={formatCurrency(kpis.total_shipping, true)}
        icon={<Truck className="h-4 w-4" />}
        sparkData={ordersSpark}
        sparkColor="#84cc16"
        caption={`${formatCurrency(kpis.total_shipping / kpis.total_orders, true)}/order`}
      />
    </div>
  );
}
