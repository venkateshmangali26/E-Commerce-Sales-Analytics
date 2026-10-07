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
import { regionData, formatCurrency, formatNumber } from "@/lib/ecommerce-data";

const config = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
} satisfies ChartConfig;

// RdYlGn-style color interpolation by profit margin (-5%..40%)
function marginColor(margin: number): string {
  const clamped = Math.max(-5, Math.min(40, margin));
  const t = (clamped + 5) / 45; // 0..1
  // Red (245,99,99) -> Yellow (250,213,99) -> Green (90,180,90)
  let r: number, g: number, b: number;
  if (t < 0.5) {
    const k = t / 0.5;
    r = 245 + (250 - 245) * k;
    g = 99 + (213 - 99) * k;
    b = 99 + (99 - 99) * k;
  } else {
    const k = (t - 0.5) / 0.5;
    r = 250 + (90 - 250) * k;
    g = 213 + (180 - 213) * k;
    b = 99 + (90 - 99) * k;
  }
  return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
}

export function RegionChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Revenue by Region
        </CardTitle>
        <CardDescription className="text-xs">
          Bar color encodes profit margin % — greener = healthier
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 sm:p-4 pt-2">
        <ChartContainer config={config} className="h-[240px] xs:h-[260px] sm:h-[300px] w-full">
          <BarChart
            data={regionData}
            margin={{ left: -10, right: 4, top: 8, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="region"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 9.5, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: string) =>
                v.length > 11 ? `${v.slice(0, 10)}…` : v
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              width={42}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
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
                          <span className="text-xs text-muted-foreground">Revenue</span>
                          <span className="text-xs font-semibold tabular-nums">
                            {formatCurrency(Number(value), true)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">Profit</span>
                          <span className="text-xs font-semibold tabular-nums">
                            {formatCurrency(p.profit, true)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">Orders</span>
                          <span className="text-xs font-semibold tabular-nums">
                            {formatNumber(p.orders)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">Avg Order</span>
                          <span className="text-xs font-semibold tabular-nums">
                            {formatCurrency(p.avg_order)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">Margin</span>
                          <span className="text-xs font-semibold tabular-nums">
                            {p.profit_margin.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    );
                  }}
                />
              }
            />
            <Bar dataKey="revenue" radius={[6, 6, 0, 0]} maxBarSize={64}>
              {regionData.map((entry) => (
                <Cell key={entry.region} fill={marginColor(entry.profit_margin)} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
