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
import { segmentData, formatCurrency, formatNumber } from "@/lib/ecommerce-data";

const SEG_COLORS: Record<string, string> = {
  "Consumer": "var(--chart-1)",
  "Corporate": "var(--chart-2)",
  "Home Office": "var(--chart-3)",
};

const config = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  profit: { label: "Profit", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function SegmentChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Revenue &amp; Profit by Customer Segment
        </CardTitle>
        <CardDescription className="text-xs">
          Compares Consumer, Corporate, and Home Office performance
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer config={config} className="aspect-[16/9] w-full">
          <BarChart
            data={segmentData}
            margin={{ left: 4, right: 8, top: 8, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="segment"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              width={52}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: number) => formatCurrency(v, true)}
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.4 }}
              content={
                <ChartTooltipContent
                  formatter={(value, name, item) => {
                    const p = item.payload as (typeof segmentData)[number];
                    return (
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-foreground">
                          {p.segment}
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground capitalize">{name}</span>
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
                          <span className="text-xs text-muted-foreground">Avg Order</span>
                          <span className="text-xs font-semibold tabular-nums">
                            {formatCurrency(p.avg_order_value)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">Avg Discount</span>
                          <span className="text-xs font-semibold tabular-nums">
                            {p.avg_discount.toFixed(1)}%
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
            <Bar dataKey="revenue" radius={[6, 6, 0, 0]} maxBarSize={56}>
              {segmentData.map((s) => (
                <Cell key={s.segment} fill={SEG_COLORS[s.segment]} />
              ))}
            </Bar>
            <Bar dataKey="profit" radius={[6, 6, 0, 0]} maxBarSize={56}>
              {segmentData.map((s) => (
                <Cell key={s.segment} fill={SEG_COLORS[s.segment]} fillOpacity={0.55} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[var(--chart-1)]" />
            <span>Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[var(--chart-1)] opacity-55" />
            <span>Profit (lighter)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
