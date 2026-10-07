"use client";

import * as React from "react";
import {
  CartesianGrid,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
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
import { discountScatter, formatCurrency } from "@/lib/ecommerce-data";

const CAT_COLORS: Record<string, string> = {
  "Electronics": "var(--chart-1)",
  "Clothing": "var(--chart-2)",
  "Home & Kitchen": "var(--chart-3)",
  "Books": "var(--chart-4)",
};

const config: ChartConfig = {
  ...Object.fromEntries(
    Object.keys(CAT_COLORS).map((c) => [c, { label: c, color: CAT_COLORS[c] }])
  ),
} satisfies ChartConfig;

export function DiscountScatterChart() {
  // Group by category for multiple scatter series
  const grouped: Record<string, typeof discountScatter> = {};
  discountScatter.forEach((p) => {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  });

  return (
    <Card className="col-span-full xl:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Discount % vs Profit Margin
        </CardTitle>
        <CardDescription className="text-xs">
          Bubble size = total sales; reveals the profitability floor of high discounts
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 sm:p-4 pt-2">
        <ChartContainer config={config} className="h-[260px] xs:h-[280px] sm:h-[320px] lg:h-[360px] w-full">
          <ScatterChart
            margin={{ left: -10, right: 8, top: 8, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              type="number"
              dataKey="discount"
              name="Discount"
              domain={[-2, 35]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: number) => `${v.toFixed(0)}%`}
            />
            <YAxis
              type="number"
              dataKey="profit_margin"
              name="Profit Margin"
              domain={[-100, 80]}
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              width={40}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: number) => `${v.toFixed(0)}%`}
            />
            <ZAxis
              type="number"
              dataKey="total_sales"
              range={[40, 360]}
              name="Total Sales"
            />
            <ChartTooltip
              cursor={{ stroke: "var(--border)", strokeWidth: 1, strokeDasharray: "3 3" }}
              content={
                <ChartTooltipContent
                  formatter={(value, name, item) => {
                    const p = item.payload as (typeof discountScatter)[number];
                    return (
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-foreground">
                          {p.product}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {p.category}
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">Discount</span>
                          <span className="text-xs font-semibold tabular-nums">
                            {p.discount.toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">Profit Margin</span>
                          <span className="text-xs font-semibold tabular-nums">
                            {p.profit_margin.toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">Total Sales</span>
                          <span className="text-xs font-semibold tabular-nums">
                            {formatCurrency(p.total_sales)}
                          </span>
                        </div>
                      </div>
                    );
                  }}
                />
              }
            />
            {Object.entries(grouped).map(([cat, points]) => (
              <Scatter
                key={cat}
                data={points}
                fill={CAT_COLORS[cat]}
                fillOpacity={0.55}
                stroke={CAT_COLORS[cat]}
                strokeOpacity={0.8}
                name={cat}
              />
            ))}
          </ScatterChart>
        </ChartContainer>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px]">
          {Object.entries(CAT_COLORS).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-muted-foreground">{cat}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
