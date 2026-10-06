"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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
import { segmentCategoryData, categoryList, formatCurrency } from "@/lib/ecommerce-data";

const CAT_COLORS: Record<string, string> = {
  "Electronics": "var(--chart-1)",
  "Clothing": "var(--chart-2)",
  "Home & Kitchen": "var(--chart-3)",
  "Books": "var(--chart-4)",
};

const config: ChartConfig = {
  ...Object.fromEntries(
    categoryList.map((c) => [c, { label: c, color: CAT_COLORS[c] }])
  ),
} satisfies ChartConfig;

export function SegmentCategoryChart() {
  // Flatten for recharts grouped bar
  const data = segmentCategoryData.map((row) => ({
    segment: row.segment,
    ...row.values,
  }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Segment × Category Revenue
        </CardTitle>
        <CardDescription className="text-xs">
          Cross-analysis showing which segments favor which categories
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer config={config} className="aspect-[16/9] w-full">
          <BarChart
            data={data}
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
                  formatter={(value, name) => (
                    <div className="flex w-full items-center justify-between gap-3">
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
              wrapperStyle={{ fontSize: 11 }}
              iconType="circle"
              iconSize={8}
            />
            {categoryList.map((c) => (
              <Bar
                key={c}
                dataKey={c}
                fill={CAT_COLORS[c]}
                radius={[4, 4, 0, 0]}
                maxBarSize={36}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
