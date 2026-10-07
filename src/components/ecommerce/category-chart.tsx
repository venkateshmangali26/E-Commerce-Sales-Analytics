"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { categoryData, formatCurrency, formatNumber } from "@/lib/ecommerce-data";

const CAT_COLORS: Record<string, string> = {
  "Electronics": "#5c6bc0",
  "Clothing": "#ec407a",
  "Home & Kitchen": "#00b894",
  "Books": "#f39c12",
};

const config: ChartConfig = {
  revenue: { label: "Revenue", color: "#5c6bc0" },
  profit: { label: "Profit", color: "#00b894" },
  Electronics: { label: "Electronics", color: "#5c6bc0" },
  Clothing: { label: "Clothing", color: "#ec407a" },
  "Home & Kitchen": { label: "Home & Kitchen", color: "#00b894" },
  Books: { label: "Books", color: "#f39c12" },
};

// Custom inside percentage label for category donut chart matching Image 3
const renderInsidePercentage = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, share } = props;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11.5}
      fontWeight={600}
      className="drop-shadow-xs"
    >
      {`${share}%`}
    </text>
  );
};

// Custom outside label for category names
const renderOutsideLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, category } = props;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 20;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="currentColor"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight={500}
      className="fill-slate-700 dark:fill-slate-200"
    >
      {category}
    </text>
  );
};

export function CategoryChart() {
  return (
    <Card className="col-span-full border border-border/60 shadow-sm transition-all hover:shadow-md">
      <CardContent className="p-3 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left Chart: Revenue Share by Category (Donut) */}
          <div className="flex flex-col items-center w-full">
            <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight text-center mb-2">
              Revenue Share by Category
            </h3>
            <ChartContainer
              config={config}
              className="h-[280px] xs:h-[300px] sm:h-[330px] w-full max-w-[380px] mx-auto"
            >
              <PieChart margin={{ top: 16, right: 36, bottom: 16, left: 36 }}>
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      formatter={(value, _name, item) => {
                        const c = item.payload as (typeof categoryData)[number];
                        return (
                          <div className="space-y-1">
                            <div className="text-xs font-semibold text-foreground">
                              {c.category}
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-xs text-muted-foreground">Revenue Share</span>
                              <span className="text-xs font-semibold tabular-nums">
                                {c.share}% ({formatCurrency(Number(value), true)})
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-xs text-muted-foreground">Profit</span>
                              <span className="text-xs font-semibold tabular-nums">
                                {formatCurrency(c.profit, true)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-xs text-muted-foreground">Orders</span>
                              <span className="text-xs font-semibold tabular-nums">
                                {formatNumber(c.orders)}
                              </span>
                            </div>
                          </div>
                        );
                      }}
                    />
                  }
                />
                <Pie
                  data={categoryData}
                  dataKey="revenue"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={56}
                  outerRadius={95}
                  stroke="#ffffff"
                  strokeWidth={2.5}
                  startAngle={180}
                  endAngle={-180}
                  label={renderOutsideLabel}
                  labelLine={false}
                >
                  {categoryData.map((entry) => (
                    <Cell
                      key={entry.category}
                      fill={CAT_COLORS[entry.category]}
                    />
                  ))}
                </Pie>
                {/* Secondary pie just for inside percentage text rendering */}
                <Pie
                  data={categoryData}
                  dataKey="revenue"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={56}
                  outerRadius={95}
                  fill="none"
                  stroke="none"
                  startAngle={180}
                  endAngle={-180}
                  label={renderInsidePercentage}
                  labelLine={false}
                  pointerEvents="none"
                >
                  {categoryData.map((entry) => (
                    <Cell key={`pct-${entry.category}`} fill="transparent" />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>

          {/* Right Chart: Revenue vs Profit by Category (Grouped Bar) */}
          <div className="flex flex-col items-center w-full">
            <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight text-center mb-1">
              Revenue vs Profit by Category
            </h3>
            {/* Top-right legend matching Image 3 */}
            <div className="flex items-center justify-end w-full gap-4 pr-4 pt-1 pb-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <span className="h-3 w-4.5 rounded-xs bg-[#5c6bc0]" />
                <span>Revenue</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <span className="h-3 w-4.5 rounded-xs bg-[#00b894]" />
                <span>Profit</span>
              </div>
            </div>

            <ChartContainer
              config={config}
              className="h-[280px] xs:h-[300px] sm:h-[330px] w-full"
            >
              <BarChart
                data={categoryData}
                margin={{ left: 0, right: 16, top: 12, bottom: 20 }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="2 2"
                  stroke="var(--border)"
                  strokeOpacity={0.45}
                />
                <XAxis
                  dataKey="category"
                  tickLine={false}
                  axisLine={{ stroke: "var(--border)", strokeOpacity: 0.6 }}
                  tickMargin={12}
                  angle={-14}
                  textAnchor="end"
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)", fontWeight: 500 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={{ stroke: "var(--border)", strokeOpacity: 0.6 }}
                  tickMargin={6}
                  width={52}
                  domain={[0, 360000]}
                  ticks={[0, 50000, 100000, 150000, 200000, 250000, 300000, 350000]}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  tickFormatter={(v: number) => (v === 0 ? "$0" : `$${Math.round(v / 1000)}K`)}
                />
                <ChartTooltip
                  cursor={{ fill: "var(--muted)", opacity: 0.2 }}
                  content={
                    <ChartTooltipContent
                      formatter={(value, name, item) => {
                        const c = item.payload as (typeof categoryData)[number];
                        const isRev = name === "revenue";
                        return (
                          <div className="space-y-1">
                            <div className="text-xs font-semibold text-foreground">
                              {c.category} — {isRev ? "Revenue" : "Profit"}
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-xs text-muted-foreground">
                                {isRev ? "Total Revenue" : "Total Profit"}
                              </span>
                              <span className="text-xs font-semibold tabular-nums text-foreground">
                                {formatCurrency(Number(value), true)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-xs text-muted-foreground">Margin</span>
                              <span className="text-xs font-semibold tabular-nums text-foreground">
                                {c.profit_margin.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        );
                      }}
                    />
                  }
                />
                {/* 1. Revenue bar (#5c6bc0) */}
                <Bar
                  dataKey="revenue"
                  fill="#5c6bc0"
                  maxBarSize={44}
                  radius={[1, 1, 0, 0]}
                />
                {/* 2. Profit bar (#00b894) */}
                <Bar
                  dataKey="profit"
                  fill="#00b894"
                  maxBarSize={44}
                  radius={[1, 1, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
