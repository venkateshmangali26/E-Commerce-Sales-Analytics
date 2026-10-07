"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { monthlyData, formatCurrency, formatNumber } from "@/lib/ecommerce-data";

const config = {
  revenue: { label: "Revenue", color: "#5c6bc0" },
  profit: { label: "Profit", color: "#00b894" },
  orders: { label: "Orders", color: "#ec407a" },
} satisfies ChartConfig;

export function MonthlyTrendChart() {
  // Extract 2025 data (the 12 months that produce the exact $34K, $6K, 99 in Image 1)
  const sparklineData = React.useMemo(() => {
    return monthlyData.filter((d) => d.year_month.startsWith("2025"));
  }, []);

  // Dynamically compute latest month metrics from dataset instead of hardcoding
  const latestMetrics = React.useMemo(() => {
    const latest = sparklineData[sparklineData.length - 1] ?? monthlyData[monthlyData.length - 1];
    if (!latest) {
      return { revenue: "$0", profit: "$0", orders: "0" };
    }
    return {
      revenue: `$${Math.round(latest.revenue / 1000)}K`,
      profit: `$${Math.round(latest.profit / 1000)}K`,
      orders: latest.orders.toString(),
    };
  }, [sparklineData]);

  return (
    <div className="space-y-4">
      {/* 3 Mini Sparklines Strip matching Image 1 */}
      <Card className="border border-border/60 shadow-sm p-3 sm:p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 divide-y md:divide-y-0 md:divide-x divide-border/60">
          {/* 1. Revenue Sparkline */}
          <div className="flex flex-col pt-2 md:pt-0 md:px-3 first:pl-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Revenue
              </span>
              <span className="text-sm sm:text-base font-extrabold text-[#5c6bc0] tabular-nums">
                {latestMetrics.revenue}
              </span>
            </div>
            <div className="h-[75px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData} margin={{ top: 4, right: 2, left: 2, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sparkRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5c6bc0" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#5c6bc0" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#5c6bc0"
                    strokeWidth={2.5}
                    fill="url(#sparkRev)"
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 2. Profit Sparkline */}
          <div className="flex flex-col pt-3 md:pt-0 md:px-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Profit
              </span>
              <span className="text-sm sm:text-base font-extrabold text-[#00b894] tabular-nums">
                {latestMetrics.profit}
              </span>
            </div>
            <div className="h-[75px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData} margin={{ top: 4, right: 2, left: 2, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sparkProf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00b894" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#00b894" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stroke="#00b894"
                    strokeWidth={2.5}
                    fill="url(#sparkProf)"
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3. Orders Sparkline */}
          <div className="flex flex-col pt-3 md:pt-0 md:px-3 last:pr-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Orders
              </span>
              <span className="text-sm sm:text-base font-extrabold text-[#ec407a] tabular-nums">
                {latestMetrics.orders}
              </span>
            </div>
            <div className="h-[75px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData} margin={{ top: 4, right: 2, left: 2, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sparkOrd" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ec407a" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#ec407a" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="orders"
                    stroke="#ec407a"
                    strokeWidth={2.5}
                    fill="url(#sparkOrd)"
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Card>

      {/* Full 3-Year Interactive Monthly Evolution */}
      <Card className="col-span-full border border-border/60 shadow-sm">
        <CardHeader className="pb-1 pt-4 text-center">
          <CardTitle className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            Monthly Sales &amp; Profit Trend (2023 – 2025)
          </CardTitle>
          <CardDescription className="text-xs">
            Revenue and profit evolution across 36 months of transaction data
          </CardDescription>
        </CardHeader>
        <CardContent className="p-2 sm:p-5 pt-0">
          <ChartContainer config={config} className="h-[260px] xs:h-[290px] sm:h-[340px] md:h-[380px] w-full">
            <AreaChart data={monthlyData} margin={{ left: 0, right: 16, top: 12, bottom: 8 }}>
              <defs>
                <linearGradient id="fillRev3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5c6bc0" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#5c6bc0" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="fillProf3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00b894" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#00b894" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="2 2"
                stroke="var(--border)"
                strokeOpacity={0.45}
              />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={{ stroke: "var(--border)", strokeOpacity: 0.6 }}
                tickMargin={8}
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                minTickGap={28}
              />
              <YAxis
                tickLine={false}
                axisLine={{ stroke: "var(--border)", strokeOpacity: 0.6 }}
                tickMargin={6}
                width={52}
                tick={{ fontSize: 10.5, fill: "var(--muted-foreground)" }}
                tickFormatter={(v: number) => (v === 0 ? "$0" : `$${Math.round(v / 1000)}K`)}
              />
              <ChartTooltip
                cursor={{ stroke: "var(--border)", strokeWidth: 1, strokeDasharray: "2 2" }}
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => (
                      <div className="flex w-full items-center justify-between gap-4">
                        <span className="text-xs text-muted-foreground capitalize">{name}</span>
                        <span className="font-semibold tabular-nums text-foreground">
                          {formatCurrency(Number(value), true)}
                        </span>
                      </div>
                    )}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#5c6bc0"
                strokeWidth={2.5}
                fill="url(#fillRev3)"
                dot={false}
                activeDot={{ r: 5, strokeWidth: 2, stroke: "#ffffff", fill: "#5c6bc0" }}
              />
              <Area
                type="monotone"
                dataKey="profit"
                name="Profit"
                stroke="#00b894"
                strokeWidth={2}
                fill="url(#fillProf3)"
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2, stroke: "#ffffff", fill: "#00b894" }}
              />
            </AreaChart>
          </ChartContainer>

          <div className="mt-3 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-4 rounded-xs bg-[#5c6bc0]" />
              <span>Revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-4 rounded-xs bg-[#00b894]" />
              <span>Profit</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
