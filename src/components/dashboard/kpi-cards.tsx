"use client";

import * as React from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Repeat,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  calcChange,
  formatCurrency,
  formatNumber,
  kpis,
  trendData,
} from "@/lib/dashboard-data";

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 100;
  const h = 32;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
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
  change: number;
  icon: React.ReactNode;
  sparkData: number[];
  sparkColor: string;
  caption: string;
};

function KpiCard({
  title,
  value,
  change,
  icon,
  sparkData,
  sparkColor,
  caption,
}: KpiProps) {
  const isPositive = change >= 0;
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardDescription className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {title}
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tracking-tight tabular-nums">
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
            <span className="tabular-nums">
              {Math.abs(change).toFixed(1)}%
            </span>
            <span className="text-muted-foreground font-normal">{caption}</span>
          </div>
          <div className="w-24">
            <Sparkline data={sparkData} color={sparkColor} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function KpiCards() {
  const revenueSpark = trendData.slice(-14).map((d) => d.revenue);
  const ordersSpark = trendData.slice(-14).map((d) => d.orders);
  const aovSpark = trendData
    .slice(-14)
    .map((d) => (d.orders ? d.revenue / d.orders : 0));
  const conversionSpark = trendData
    .slice(-14)
    .map((d) => (d.visitors ? (d.orders / d.visitors) * 100 : 0));

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Total Revenue"
        value={formatCurrency(kpis.totalRevenue, true)}
        change={calcChange(kpis.totalRevenue, kpis.revenuePrev)}
        icon={<DollarSign className="h-4 w-4" />}
        sparkData={revenueSpark}
        sparkColor="#10b981"
        caption="vs last month"
      />
      <KpiCard
        title="Orders"
        value={formatNumber(kpis.totalOrders)}
        change={calcChange(kpis.totalOrders, kpis.ordersPrev)}
        icon={<CreditCard className="h-4 w-4" />}
        sparkData={ordersSpark}
        sparkColor="#f59e0b"
        caption="vs last month"
      />
      <KpiCard
        title="Avg Order Value"
        value={formatCurrency(kpis.aov)}
        change={calcChange(kpis.aov, kpis.aovPrev)}
        icon={<TrendingUp className="h-4 w-4" />}
        sparkData={aovSpark}
        sparkColor="#8b5cf6"
        caption="vs last month"
      />
      <KpiCard
        title="Conversion Rate"
        value={`${kpis.conversion.toFixed(2)}%`}
        change={calcChange(kpis.conversion, kpis.conversionPrev)}
        icon={<Repeat className="h-4 w-4" />}
        sparkData={conversionSpark}
        sparkColor="#ec4899"
        caption="vs last month"
      />
    </div>
  );
}
