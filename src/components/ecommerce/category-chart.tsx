"use client";

import * as React from "react";
import { Pie, PieChart, Cell } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
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
import { categoryData, formatCurrency } from "@/lib/ecommerce-data";

const CAT_COLORS: Record<string, string> = {
  "Electronics": "var(--chart-1)",
  "Clothing": "var(--chart-2)",
  "Home & Kitchen": "var(--chart-3)",
  "Books": "var(--chart-4)",
};

const config: ChartConfig = {
  revenue: { label: "Revenue" },
  profit: { label: "Profit" },
  ...Object.fromEntries(
    Object.keys(CAT_COLORS).map((k) => [
      k,
      { label: k, color: CAT_COLORS[k] },
    ])
  ),
};

export function CategoryChart() {
  const revenueTotal = categoryData.reduce((s, c) => s + c.revenue, 0);
  const profitTotal = categoryData.reduce((s, c) => s + c.profit, 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Revenue &amp; Profit Share by Category
        </CardTitle>
        <CardDescription className="text-xs">
          Dual donut — left: revenue contribution; right: profit contribution
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Revenue pie */}
          <div className="space-y-2">
            <div className="text-center text-xs font-medium text-muted-foreground">
              Revenue Share · {formatCurrency(revenueTotal, true)}
            </div>
            <ChartContainer
              config={config}
              className="aspect-square mx-auto w-full max-w-[220px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      formatter={(value, name) => (
                        <div className="flex w-full items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">{name}</span>
                          <span className="font-semibold tabular-nums">
                            {formatCurrency(Number(value), true)} ·{" "}
                            {((Number(value) / revenueTotal) * 100).toFixed(1)}%
                          </span>
                        </div>
                      )}
                    />
                  }
                />
                <Pie
                  data={categoryData}
                  dataKey="revenue"
                  nameKey="category"
                  innerRadius={50}
                  outerRadius={82}
                  strokeWidth={2}
                  stroke="var(--card)"
                  paddingAngle={2}
                >
                  {categoryData.map((entry) => (
                    <Cell key={entry.category} fill={CAT_COLORS[entry.category]} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>

          {/* Profit pie */}
          <div className="space-y-2">
            <div className="text-center text-xs font-medium text-muted-foreground">
              Profit Share · {formatCurrency(profitTotal, true)}
            </div>
            <ChartContainer
              config={config}
              className="aspect-square mx-auto w-full max-w-[220px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      formatter={(value, name) => (
                        <div className="flex w-full items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">{name}</span>
                          <span className="font-semibold tabular-nums">
                            {formatCurrency(Number(value), true)} ·{" "}
                            {((Number(value) / profitTotal) * 100).toFixed(1)}%
                          </span>
                        </div>
                      )}
                    />
                  }
                />
                <Pie
                  data={categoryData}
                  dataKey="profit"
                  nameKey="category"
                  innerRadius={50}
                  outerRadius={82}
                  strokeWidth={2}
                  stroke="var(--card)"
                  paddingAngle={2}
                >
                  {categoryData.map((entry) => (
                    <Cell key={entry.category} fill={CAT_COLORS[entry.category]} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 sm:grid-cols-4">
          {categoryData.map((c) => (
            <div key={c.category} className="flex items-center gap-1.5 text-[11px]">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: CAT_COLORS[c.category] }}
              />
              <span className="text-muted-foreground">{c.category}</span>
              <span className="ml-auto font-semibold tabular-nums">
                {((c.revenue / revenueTotal) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
