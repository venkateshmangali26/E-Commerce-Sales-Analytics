"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dowData, formatCurrency, formatNumber } from "@/lib/ecommerce-data";

const config: ChartConfig = {
  revenue: { label: "Revenue", color: "#ec407a" },
};

export function DayOfWeekChart() {
  // Peak day is Monday in the dataset
  const peakDay = React.useMemo(() => {
    return dowData.reduce((prev, curr) => (curr.revenue > prev.revenue ? curr : prev), dowData[0]).day;
  }, []);

  return (
    <Card className="border border-border/60 shadow-sm transition-all hover:shadow-md">
      <CardHeader className="pb-1 pt-4 text-center">
        <CardTitle className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          Revenue by Day of Week
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-5 pt-0">
        {/* Top-left Legend matching Image 2 */}
        <div className="flex flex-col gap-1.5 pl-6 sm:pl-10 pt-1 pb-2">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
            <span className="h-3.5 w-5 rounded-xs bg-[#00b894]" />
            <span>Peak day</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
            <span className="h-3.5 w-5 rounded-xs bg-[#ec407a]" />
            <span>Other days</span>
          </div>
        </div>

        <ChartContainer config={config} className="h-[280px] xs:h-[320px] sm:h-[350px] md:h-[380px] w-full">
          <BarChart
            data={dowData}
            margin={{ left: 0, right: 16, top: 12, bottom: 8 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="2 2"
              stroke="var(--border)"
              strokeOpacity={0.45}
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={{ stroke: "var(--border)", strokeOpacity: 0.6 }}
              tickMargin={10}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)", fontWeight: 500 }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: "var(--border)", strokeOpacity: 0.6 }}
              tickMargin={6}
              width={52}
              domain={[0, 92000]}
              ticks={[0, 20000, 40000, 60000, 80000]}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: number) => (v === 0 ? "$0" : `$${Math.round(v / 1000)}K`)}
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.2 }}
              content={
                <ChartTooltipContent
                  formatter={(value, _name, item) => {
                    const row = item.payload as (typeof dowData)[number];
                    return (
                      <div className="space-y-1">
                        <div className="text-xs font-semibold text-foreground">
                          {row.day} ({row.day === peakDay ? "Peak Day" : "Standard"})
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs text-muted-foreground">Revenue</span>
                          <span className="font-semibold tabular-nums text-foreground">
                            {formatCurrency(Number(value), true)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs text-muted-foreground">Orders</span>
                          <span className="font-semibold tabular-nums text-foreground">
                            {formatNumber(row.orders)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs text-muted-foreground">Avg Revenue/Order</span>
                          <span className="font-semibold tabular-nums text-foreground">
                            {formatCurrency(row.avg_revenue)}
                          </span>
                        </div>
                      </div>
                    );
                  }}
                />
              }
            />
            <Bar dataKey="revenue" maxBarSize={62} radius={[1, 1, 0, 0]}>
              {dowData.map((entry) => (
                <Cell
                  key={entry.day}
                  fill={entry.day === peakDay ? "#00b894" : "#ec407a"}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
