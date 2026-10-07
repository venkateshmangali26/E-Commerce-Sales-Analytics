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
import {
  discountRangeData,
  formatCurrency,
  kpis,
} from "@/lib/ecommerce-data";

const config = {
  orders: { label: "Orders", color: "var(--chart-1)" },
  avg_revenue: { label: "Avg Revenue", color: "var(--chart-2)" },
  avg_margin: { label: "Avg Margin", color: "var(--chart-3)" },
} satisfies ChartConfig;

function marginColor(margin: number): string {
  if (margin < 0) return "var(--destructive)";
  if (margin < 5) return "#f59e0b";
  return "#10b981";
}

export function DiscountRangeChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Discount Range Impact
        </CardTitle>
        <CardDescription className="text-xs">
          Avg revenue, profit, and margin across discount buckets
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer config={config} className="aspect-[16/9] w-full">
          <BarChart
            data={discountRangeData}
            margin={{ left: 4, right: 8, top: 8, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="range"
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
              width={48}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: number) => formatCurrency(v, true)}
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.4 }}
              content={
                <ChartTooltipContent
                  formatter={(value, name) => (
                    <div className="flex w-full items-center justify-between gap-3">
                      <span className="text-xs text-muted-foreground">{name}</span>
                      <span className="font-semibold tabular-nums">
                        {typeof value === "number" && name === "orders"
                          ? value.toLocaleString()
                          : formatCurrency(Number(value), true)}
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Bar yAxisId="left" dataKey="avg_revenue" radius={[6, 6, 0, 0]} maxBarSize={56}>
              {discountRangeData.map((d) => (
                <Cell key={d.range} fill={marginColor(d.avg_margin)} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 text-center text-xs">
            <thead>
              <tr className="text-muted-foreground">
                <th className="h-8 text-left text-[10px] font-medium uppercase tracking-wider">Discount</th>
                <th className="h-8 text-[10px] font-medium uppercase tracking-wider">Orders</th>
                <th className="h-8 text-[10px] font-medium uppercase tracking-wider">Avg Rev</th>
                <th className="h-8 text-[10px] font-medium uppercase tracking-wider">Avg Profit</th>
                <th className="h-8 text-[10px] font-medium uppercase tracking-wider">Margin</th>
              </tr>
            </thead>
            <tbody>
              {discountRangeData.map((d) => (
                <tr key={d.range} className="border-t border-border/60">
                  <td className="h-9 text-left font-medium">{d.range}</td>
                  <td className="h-9 tabular-nums">{d.orders.toLocaleString()}</td>
                  <td className="h-9 tabular-nums">{formatCurrency(d.avg_revenue)}</td>
                  <td className="h-9 tabular-nums">{formatCurrency(d.avg_profit)}</td>
                  <td
                    className={`h-9 tabular-nums font-semibold ${
                      d.avg_margin < 0
                        ? "text-rose-600"
                        : d.avg_margin < 5
                        ? "text-amber-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {d.avg_margin.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
          ⚠ {kpis.negative_profit_orders} of {kpis.total_orders} orders (
          {((kpis.negative_profit_orders / kpis.total_orders) * 100).toFixed(1)}%) had negative profit
        </div>
      </CardContent>
    </Card>
  );
}
