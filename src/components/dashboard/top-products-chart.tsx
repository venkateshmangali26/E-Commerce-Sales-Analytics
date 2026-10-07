"use client";

import * as React from "react";
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";
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
import { topProducts, formatCurrency, formatNumber } from "@/lib/dashboard-data";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const config = {
  units: { label: "Units Sold", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function TopProductsChart() {
  const chartData = [...topProducts]
    .sort((a, b) => b.units - a.units)
    .slice(0, 6);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Top Products</CardTitle>
        <CardDescription className="text-xs">
          Best-selling SKUs by units sold this month
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer config={config} className="aspect-[16/9] w-full">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ left: 8, right: 16, top: 4, bottom: 4 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              width={130}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: string) =>
                v.length > 18 ? `${v.slice(0, 17)}…` : v
              }
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.4 }}
              content={
                <ChartTooltipContent
                  formatter={(value, _name, item) => {
                    const p = item.payload as (typeof topProducts)[number];
                    return (
                      <div className="space-y-1.5">
                        <div className="text-xs font-medium text-foreground">
                          {p.name}
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">
                            Units
                          </span>
                          <span className="text-xs font-semibold tabular-nums">
                            {formatNumber(Number(value))}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">
                            Revenue
                          </span>
                          <span className="text-xs font-semibold tabular-nums">
                            {formatCurrency(p.revenue, true)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">
                            Growth
                          </span>
                          <span
                            className={`flex items-center gap-0.5 text-xs font-semibold tabular-nums ${
                              p.growth >= 0 ? "text-emerald-600" : "text-rose-600"
                            }`}
                          >
                            {p.growth >= 0 ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            {Math.abs(p.growth).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    );
                  }}
                />
              }
            />
            <Bar dataKey="units" radius={[0, 4, 4, 0]} maxBarSize={22}>
              {chartData.map((entry, idx) => (
                <Cell
                  key={entry.name}
                  fill={idx === 0 ? "var(--chart-1)" : "var(--chart-2)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
