"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dowData, formatCurrency, formatNumber } from "@/lib/ecommerce-data";

const config = {
  orders: { label: "Orders", color: "var(--chart-1)" },
  avg_revenue: { label: "Avg Revenue", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function DayOfWeekChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Orders &amp; Avg Revenue by Day of Week
        </CardTitle>
        <CardDescription className="text-xs">
          Combined bars (orders) + line (avg revenue) — reveals weekend lift patterns
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer config={config} className="aspect-[16/9] w-full">
          <ComposedChart
            data={dowData}
            margin={{ left: 4, right: 12, top: 8, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              width={44}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: number) => formatNumber(v, true)}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              width={52}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: number) => formatCurrency(v, true)}
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.4 }}
              content={
                <ChartTooltipContent
                  formatter={(value, name) => (
                    <div className="flex w-full items-center justify-between gap-3">
                      <span className="text-xs text-muted-foreground">
                        {name === "avg_revenue" ? "Avg Revenue" : "Orders"}
                      </span>
                      <span className="font-semibold tabular-nums">
                        {name === "avg_revenue"
                          ? formatCurrency(Number(value))
                          : formatNumber(Number(value))}
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Bar
              yAxisId="left"
              dataKey="orders"
              fill="var(--chart-1)"
              fillOpacity={0.7}
              radius={[4, 4, 0, 0]}
              maxBarSize={42}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="avg_revenue"
              stroke="var(--chart-2)"
              strokeWidth={2.5}
              dot={{
                r: 4,
                fill: "var(--chart-2)",
                stroke: "var(--background)",
                strokeWidth: 2,
              }}
            />
          </ComposedChart>
        </ChartContainer>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[var(--chart-1)] opacity-70" />
            <span>Orders (left axis)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--chart-2)]" />
            <span>Avg Revenue (right axis)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
