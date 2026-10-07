"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { trendData, formatCurrency, formatNumber } from "@/lib/dashboard-data";

const config = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  orders: { label: "Orders", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function SalesTrendChart() {
  const [metric, setMetric] = React.useState<"revenue" | "orders">("revenue");

  return (
    <Card className="col-span-full xl:col-span-2">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base font-semibold">
              Sales Performance
            </CardTitle>
            <CardDescription className="text-xs">
              Daily revenue and order volume over the last 30 days
            </CardDescription>
          </div>
          <ToggleGroup
            type="single"
            value={metric}
            onValueChange={(v) => v && setMetric(v as "revenue" | "orders")}
            size="sm"
          >
            <ToggleGroupItem value="revenue" className="text-xs">
              Revenue
            </ToggleGroupItem>
            <ToggleGroupItem value="orders" className="text-xs">
              Orders
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer config={config} className="aspect-[16/7] w-full">
          <AreaChart data={trendData} margin={{ left: 4, right: 12, top: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              interval={4}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              width={48}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: number) =>
                metric === "revenue"
                  ? formatCurrency(v, true)
                  : formatNumber(v, true)
              }
            />
            <ChartTooltip
              cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
              content={
                <ChartTooltipContent
                  formatter={(value, _name) => (
                    <div className="flex w-full items-center justify-between gap-3">
                      <span className="text-xs text-muted-foreground">
                        {metric === "revenue" ? "Revenue" : "Orders"}
                      </span>
                      <span className="font-semibold tabular-nums">
                        {metric === "revenue"
                          ? formatCurrency(Number(value))
                          : formatNumber(Number(value))}
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Area
              type="monotone"
              dataKey={metric}
              stroke={metric === "revenue" ? "var(--chart-1)" : "var(--chart-2)"}
              strokeWidth={2.5}
              fill={
                metric === "revenue" ? "url(#fillRevenue)" : "url(#fillOrders)"
              }
              dot={false}
              activeDot={{
                r: 5,
                strokeWidth: 2,
                stroke: "var(--background)",
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
