"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
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
import { yoyData, formatCurrency, formatNumber } from "@/lib/ecommerce-data";

const config = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  profit: { label: "Profit", color: "var(--chart-2)" },
  orders: { label: "Orders", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function YoyComparisonChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Year-over-Year Revenue & Profit
        </CardTitle>
        <CardDescription className="text-xs">
          Annual performance comparison across the 3-year window
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 sm:p-4 pt-2">
        <ChartContainer config={config} className="h-[240px] xs:h-[260px] sm:h-[300px] w-full">
          <BarChart
            data={yoyData}
            margin={{ left: -10, right: -5, top: 8, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: number) => String(v)}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              width={42}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: number) => formatCurrency(v, true)}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              width={34}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: number) => formatNumber(v, true)}
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.4 }}
              content={
                <ChartTooltipContent
                  formatter={(value, name) => (
                    <div className="flex w-full items-center justify-between gap-3">
                      <span className="text-xs text-muted-foreground capitalize">{name}</span>
                      <span className="font-semibold tabular-nums">
                        {name === "orders"
                          ? formatNumber(Number(value))
                          : formatCurrency(Number(value), true)}
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Bar yAxisId="left" dataKey="revenue" fill="var(--chart-1)" radius={[6, 6, 0, 0]} maxBarSize={48} />
            <Bar yAxisId="left" dataKey="profit" fill="var(--chart-2)" radius={[6, 6, 0, 0]} maxBarSize={48} />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="orders"
              stroke="var(--chart-3)"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "var(--chart-3)", stroke: "var(--background)", strokeWidth: 2 }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
