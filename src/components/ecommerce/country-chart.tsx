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
import { countryData, formatCurrency, formatNumber } from "@/lib/ecommerce-data";

const REGION_COLORS: Record<string, string> = {
  "North America": "var(--chart-1)",
  "Europe": "var(--chart-2)",
  "Asia Pacific": "var(--chart-3)",
  "Latin America": "var(--chart-4)",
  "Middle East & Africa": "var(--chart-5)",
};

const config = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function CountryChart() {
  // Sort ascending so largest is on top in horizontal bar
  const data = [...countryData].sort((a, b) => a.revenue - b.revenue);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Revenue by Country
        </CardTitle>
        <CardDescription className="text-xs">
          Top markets across 22 countries, colored by region
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 sm:p-4 pt-2">
        <ChartContainer config={config} className="h-[520px] sm:h-[580px] w-full">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: -10, right: 12, top: 4, bottom: 4 }}
          >
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: number) => formatCurrency(v, true)}
            />
            <YAxis
              type="category"
              dataKey="country"
              tickLine={false}
              axisLine={false}
              width={98}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: string) =>
                v.length > 14 ? `${v.slice(0, 13)}…` : v
              }
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.4 }}
              content={
                <ChartTooltipContent
                  formatter={(value, _name, item) => {
                    const p = item.payload as (typeof countryData)[number];
                    return (
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-foreground">
                          {p.country} · <span className="text-muted-foreground">{p.region}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">Revenue</span>
                          <span className="text-xs font-semibold tabular-nums">
                            {formatCurrency(Number(value), true)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">Orders</span>
                          <span className="text-xs font-semibold tabular-nums">
                            {formatNumber(p.orders)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">Profit</span>
                          <span className="text-xs font-semibold tabular-nums">
                            {formatCurrency(p.profit, true)}
                          </span>
                        </div>
                      </div>
                    );
                  }}
                />
              }
            />
            <Bar dataKey="revenue" radius={[0, 4, 4, 0]} maxBarSize={20}>
              {data.map((entry) => (
                <Cell
                  key={entry.country}
                  fill={REGION_COLORS[entry.region] || "var(--chart-1)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
