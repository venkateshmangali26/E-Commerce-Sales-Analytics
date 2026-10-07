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
import { shippingData, formatCurrency } from "@/lib/ecommerce-data";

const config = {
  avg_shipping: { label: "Avg Shipping", color: "var(--chart-1)" },
} satisfies ChartConfig;

function marginColor(margin: number): string {
  if (margin < 5) return "#f43f5e";
  if (margin < 12) return "#f59e0b";
  if (margin < 18) return "#84cc16";
  return "#10b981";
}

export function ShippingCostChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Average Shipping Cost by Region
        </CardTitle>
        <CardDescription className="text-xs">
          Color encodes average profit margin — logistics impact on profitability
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 sm:p-4 pt-2">
        <ChartContainer config={config} className="h-[240px] xs:h-[260px] sm:h-[300px] w-full">
          <BarChart
            data={shippingData}
            margin={{ left: -10, right: 8, top: 8, bottom: 0 }}
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
              width={38}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: number) => `$${v.toFixed(0)}`}
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.4 }}
              content={
                <ChartTooltipContent
                  formatter={(value, _name, item) => {
                    const p = item.payload as (typeof shippingData)[number];
                    return (
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-foreground">
                          {p.region}
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">Avg Shipping</span>
                          <span className="text-xs font-semibold tabular-nums">
                            {formatCurrency(Number(value))}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">Avg Margin</span>
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
            <Bar dataKey="avg_shipping" radius={[6, 6, 0, 0]} maxBarSize={64}>
              {shippingData.map((entry) => (
                <Cell key={entry.region} fill={marginColor(entry.profit_margin)} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
