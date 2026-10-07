"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { segmentCategoryData, formatCurrency } from "@/lib/ecommerce-data";

// Order from bottom of stack to top matching Image 1: Books -> Clothing -> Electronics -> Home & Kitchen
const STACK_CATEGORIES = [
  { key: "Books", label: "Books", color: "#5c6bc0" },
  { key: "Clothing", label: "Clothing", color: "#ec407a" },
  { key: "Electronics", label: "Electronics", color: "#00b894" },
  { key: "Home & Kitchen", label: "Home & Kitchen", color: "#f39c12" },
] as const;

const config: ChartConfig = {
  Books: { label: "Books", color: "#5c6bc0" },
  Clothing: { label: "Clothing", color: "#ec407a" },
  Electronics: { label: "Electronics", color: "#00b894" },
  "Home & Kitchen": { label: "Home & Kitchen", color: "#f39c12" },
};

export function SegmentCategoryChart() {
  const data = React.useMemo(() => {
    return segmentCategoryData.map((row) => ({
      segment: row.segment,
      ...row.values,
      total: Object.values(row.values).reduce((a, b) => a + b, 0),
    }));
  }, []);

  return (
    <Card className="border border-border/60 shadow-sm transition-all hover:shadow-md">
      <CardHeader className="pb-1 pt-4 text-center">
        <CardTitle className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          Revenue by Segment × Category
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-5 pt-0">
        <ChartContainer config={config} className="h-[280px] xs:h-[320px] sm:h-[360px] md:h-[390px] w-full">
          <BarChart
            data={data}
            margin={{ left: 0, right: 16, top: 18, bottom: 8 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="2 2"
              stroke="var(--border)"
              strokeOpacity={0.45}
            />
            <XAxis
              dataKey="segment"
              tickLine={false}
              axisLine={{ stroke: "var(--border)", strokeOpacity: 0.6 }}
              tickMargin={10}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)", fontWeight: 500 }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: "var(--border)", strokeOpacity: 0.6 }}
              tickMargin={6}
              width={54}
              domain={[0, 325000]}
              ticks={[0, 50000, 100000, 150000, 200000, 250000, 300000]}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: number) => (v === 0 ? "$0" : `$${Math.round(v / 1000)}K`)}
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.2 }}
              content={
                <ChartTooltipContent
                  formatter={(value, name) => (
                    <div className="flex w-full items-center justify-between gap-4">
                      <span className="text-xs text-muted-foreground">{name}</span>
                      <span className="font-semibold tabular-nums">
                        {formatCurrency(Number(value), true)}
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="rect"
              iconSize={14}
              wrapperStyle={{
                paddingTop: 16,
                fontSize: 12,
                color: "var(--muted-foreground)",
              }}
            />
            {STACK_CATEGORIES.map((cat) => (
              <Bar
                key={cat.key}
                dataKey={cat.key}
                name={cat.label}
                fill={cat.color}
                stackId="revenue"
                maxBarSize={72}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
