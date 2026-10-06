"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
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
  topProductsData,
  formatCurrency,
  formatNumber,
} from "@/lib/ecommerce-data";

const CAT_COLORS: Record<string, string> = {
  "Electronics": "var(--chart-1)",
  "Clothing": "var(--chart-2)",
  "Home & Kitchen": "var(--chart-3)",
  "Books": "var(--chart-4)",
};

const config = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function TopProductsChart() {
  const data = [...topProductsData].sort((a, b) => a.revenue - b.revenue);

  return (
    <Card className="col-span-full xl:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Top 10 Products by Revenue
        </CardTitle>
        <CardDescription className="text-xs">
          Best-performing SKUs across all regions, colored by category
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer config={config} className="aspect-[16/12] w-full">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 4, right: 16, top: 4, bottom: 4 }}
          >
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              tick={{ fontSize: 10.5, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: number) => formatCurrency(v, true)}
            />
            <YAxis
              type="category"
              dataKey="product"
              tickLine={false}
              axisLine={false}
              width={180}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: string) =>
                v.length > 24 ? `${v.slice(0, 23)}…` : v
              }
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.4 }}
              content={
                <ChartTooltipContent
                  formatter={(value, _name, item) => {
                    const p = item.payload as (typeof topProductsData)[number];
                    return (
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-foreground">
                          {p.product}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {p.category}
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
                          <span className="text-xs text-muted-foreground">Units Sold</span>
                          <span className="text-xs font-semibold tabular-nums">
                            {formatNumber(p.units)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">Orders</span>
                          <span className="text-xs font-semibold tabular-nums">
                            {formatNumber(p.orders)}
                          </span>
                        </div>
                      </div>
                    );
                  }}
                />
              }
            />
            <Bar dataKey="revenue" radius={[0, 4, 4, 0]} maxBarSize={26}>
              {data.map((entry) => (
                <Cell key={entry.product} fill={CAT_COLORS[entry.category]} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
