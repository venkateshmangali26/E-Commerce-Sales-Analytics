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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { regionData, formatCurrency } from "@/lib/dashboard-data";

const config = {
  revenue: { label: "Revenue", color: "var(--chart-3)" },
} satisfies ChartConfig;

const palette = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function RegionChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Revenue by Region
        </CardTitle>
        <CardDescription className="text-xs">
          Geographic distribution of sales revenue
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer config={config} className="aspect-[16/9] w-full">
          <BarChart
            data={regionData}
            margin={{ left: 4, right: 8, top: 4, bottom: 4 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="var(--border)"
            />
            <XAxis
              dataKey="region"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 10.5, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: string) =>
                v.length > 14 ? `${v.slice(0, 13)}…` : v
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              width={44}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: number) => formatCurrency(v, true)}
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.4 }}
              content={
                <ChartTooltipContent
                  formatter={(value, _name, item) => {
                    const p = item.payload as (typeof regionData)[number];
                    return (
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-foreground">
                          {p.region}
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">
                            Revenue
                          </span>
                          <span className="text-xs font-semibold tabular-nums">
                            {formatCurrency(Number(value), true)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">
                            Orders
                          </span>
                          <span className="text-xs font-semibold tabular-nums">
                            {p.orders.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">
                            Share
                          </span>
                          <span className="text-xs font-semibold tabular-nums">
                            {p.share}%
                          </span>
                        </div>
                      </div>
                    );
                  }}
                />
              }
            />
            <Bar dataKey="revenue" radius={[6, 6, 0, 0]} maxBarSize={64}>
              {regionData.map((entry, idx) => (
                <Cell key={entry.region} fill={palette[idx % palette.length]} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
