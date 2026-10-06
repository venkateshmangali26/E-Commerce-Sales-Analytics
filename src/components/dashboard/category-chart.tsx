"use client";

import * as React from "react";
import { Cell, Pie, PieChart } from "recharts";
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
import { categoryData, formatCurrency } from "@/lib/dashboard-data";

const config: ChartConfig = {
  value: { label: "Revenue" },
  Electronics: { label: "Electronics", color: "var(--chart-1)" },
  Apparel: { label: "Apparel", color: "var(--chart-2)" },
  "Home & Living": { label: "Home & Living", color: "var(--chart-3)" },
  Beauty: { label: "Beauty", color: "var(--chart-4)" },
  Sports: { label: "Sports", color: "var(--chart-5)" },
};

export function CategoryChart() {
  const total = categoryData.reduce((sum, c) => sum + c.value, 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Revenue by Category
        </CardTitle>
        <CardDescription className="text-xs">
          Distribution across product categories
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer
          config={config}
          className="aspect-square mx-auto w-full max-w-[260px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  nameKey="name"
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
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              innerRadius={62}
              outerRadius={92}
              strokeWidth={2}
              stroke="var(--card)"
              paddingAngle={2}
            >
              {categoryData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{ fontSize: 12 }}
            />
          </PieChart>
        </ChartContainer>
        <div className="mt-3 flex flex-col items-center text-center">
          <div className="text-xs text-muted-foreground">Total Revenue</div>
          <div className="text-xl font-semibold tabular-nums">
            {formatCurrency(total, true)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
