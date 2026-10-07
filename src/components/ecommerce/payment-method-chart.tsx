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
import { paymentData, formatCurrency, formatNumber } from "@/lib/ecommerce-data";

const PAYMENT_COLORS: Record<string, string> = {
  "Credit Card": "#5c6bc0",
  "PayPal": "#ec407a",
  "Bank Transfer": "#00b894",
  "Debit Card": "#f39c12",
};

const config: ChartConfig = {
  orders: { label: "Orders" },
  revenue: { label: "Revenue", color: "#00b4d8" },
  "Credit Card": { label: "Credit Card", color: "#5c6bc0" },
  PayPal: { label: "PayPal", color: "#ec407a" },
  "Bank Transfer": { label: "Bank Transfer", color: "#00b894" },
  "Debit Card": { label: "Debit Card", color: "#f39c12" },
};

// Custom inside percentage label for the pie chart matching Image 3
const renderInsidePercentage = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, share } = props;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.58;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
      className="drop-shadow-xs"
    >
      {`${share}%`}
    </text>
  );
};

// Custom outside label for slice names
const renderOutsideLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, method } = props;
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
      fontSize={11}
      fontWeight={500}
      className="fill-slate-700 dark:fill-slate-200"
    >
      {method}
    </text>
  );
};

export function PaymentMethodChart() {
  return (
    <Card className="border border-border/60 shadow-sm transition-all hover:shadow-md">
      <CardContent className="p-3 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left Chart: Order Share by Payment Method */}
          <div className="flex flex-col items-center w-full">
            <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight text-center mb-2">
              Order Share by Payment Method
            </h3>
            <ChartContainer
              config={config}
              className="h-[280px] xs:h-[300px] sm:h-[330px] w-full max-w-[380px] mx-auto"
            >
              <PieChart margin={{ top: 16, right: 28, bottom: 16, left: 28 }}>
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      formatter={(value, _name, item) => {
                        const p = item.payload as (typeof paymentData)[number];
                        return (
                          <div className="space-y-1">
                            <div className="text-xs font-semibold text-foreground">
                              {p.method}
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-xs text-muted-foreground">Order Share</span>
                              <span className="text-xs font-semibold tabular-nums">
                                {p.share}% ({formatNumber(Number(value))} orders)
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-xs text-muted-foreground">Revenue</span>
                              <span className="text-xs font-semibold tabular-nums">
                                {formatCurrency(p.revenue, true)}
                              </span>
                            </div>
                          </div>
                        );
                      }}
                    />
                  }
                />
                <Pie
                  data={paymentData}
                  dataKey="orders"
                  nameKey="method"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  stroke="#ffffff"
                  strokeWidth={2.5}
                  startAngle={180}
                  endAngle={-180}
                  label={renderOutsideLabel}
                  labelLine={false}
                >
                  {paymentData.map((entry) => (
                    <Cell
                      key={entry.method}
                      fill={PAYMENT_COLORS[entry.method]}
                    />
                  ))}
                </Pie>
                {/* Secondary pie just for inside percentage text rendering */}
                <Pie
                  data={paymentData}
                  dataKey="orders"
                  nameKey="method"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  fill="none"
                  stroke="none"
                  startAngle={180}
                  endAngle={-180}
                  label={renderInsidePercentage}
                  labelLine={false}
                  pointerEvents="none"
                >
                  {paymentData.map((entry) => (
                    <Cell key={`pct-${entry.method}`} fill="transparent" />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>

          {/* Right Chart: Revenue by Payment Method */}
          <div className="flex flex-col items-center w-full">
            <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight text-center mb-2">
              Revenue by Payment Method
            </h3>
            <ChartContainer
              config={config}
              className="h-[280px] xs:h-[300px] sm:h-[330px] w-full"
            >
              <BarChart
                data={paymentData}
                margin={{ left: 0, right: 16, top: 18, bottom: 24 }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="2 2"
                  stroke="var(--border)"
                  strokeOpacity={0.45}
                />
                <XAxis
                  dataKey="method"
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
                  domain={[0, 325000]}
                  ticks={[0, 50000, 100000, 150000, 200000, 250000, 300000]}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  tickFormatter={(v: number) => (v === 0 ? "$0" : `$${Math.round(v / 1000)}K`)}
                />
                <ChartTooltip
                  cursor={{ fill: "var(--muted)", opacity: 0.2 }}
                  content={
                    <ChartTooltipContent
                      formatter={(value, _name, item) => {
                        const p = item.payload as (typeof paymentData)[number];
                        return (
                          <div className="space-y-1">
                            <div className="text-xs font-semibold text-foreground">
                              {p.method}
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-xs text-muted-foreground">Revenue</span>
                              <span className="text-xs font-semibold tabular-nums text-foreground">
                                {formatCurrency(Number(value), true)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-xs text-muted-foreground">Orders</span>
                              <span className="text-xs font-semibold tabular-nums text-foreground">
                                {formatNumber(p.orders)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-xs text-muted-foreground">Avg Order Value</span>
                              <span className="text-xs font-semibold tabular-nums text-foreground">
                                {formatCurrency(p.avg_order)}
                              </span>
                            </div>
                          </div>
                        );
                      }}
                    />
                  }
                />
                <Bar
                  dataKey="revenue"
                  fill="#00b4d8"
                  maxBarSize={52}
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
