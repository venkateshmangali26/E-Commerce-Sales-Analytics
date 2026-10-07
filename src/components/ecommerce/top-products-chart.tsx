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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  topProductsData,
  formatCurrency,
} from "@/lib/ecommerce-data";

const CATEGORY_COLORS: Record<string, string> = {
  "Electronics": "#5c6bc0",
  "Clothing": "#ec407a",
  "Home & Kitchen": "#00b894",
  "Books": "#f39c12",
};

const config = {
  revenue: { label: "Revenue", color: "#5c6bc0" },
  Clothing: { label: "Clothing", color: "#ec407a" },
  Electronics: { label: "Electronics", color: "#5c6bc0" },
  "Home & Kitchen": { label: "Home & Kitchen", color: "#00b894" },
  Books: { label: "Books", color: "#f39c12" },
} satisfies ChartConfig;

export function TopProductsChart() {
  // Order from bottom to top for Recharts vertical layout so highest is at the top matching Image 2
  const data = React.useMemo(() => {
    return [...topProductsData].reverse();
  }, []);

  return (
    <Card className="col-span-full border border-border/60 shadow-sm transition-all hover:shadow-md">
      <CardHeader className="pb-1 pt-4 text-center">
        <CardTitle className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          Top 10 Products by Revenue
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-6 pt-0">
        <ChartContainer config={config} className="h-[380px] sm:h-[440px] md:h-[480px] w-full">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 16, right: 24, top: 12, bottom: 8 }}
          >
            <CartesianGrid
              horizontal={false}
              vertical={true}
              strokeDasharray="2 2"
              stroke="var(--border)"
              strokeOpacity={0.45}
            />
            <XAxis
              type="number"
              domain={[0, 95000]}
              ticks={[0, 20000, 40000, 60000, 80000]}
              tickLine={false}
              axisLine={{ stroke: "var(--border)", strokeOpacity: 0.6 }}
              tickMargin={8}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: number) => (v === 0 ? "$0" : `$${Math.round(v / 1000)}K`)}
            />
            <YAxis
              type="category"
              dataKey="product"
              tickLine={false}
              axisLine={{ stroke: "var(--border)", strokeOpacity: 0.6 }}
              width={180}
              tickMargin={12}
              tick={{ fontSize: 11.5, fill: "var(--muted-foreground)", fontWeight: 500 }}
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.2 }}
              content={
                <ChartTooltipContent
                  formatter={(value, _name, item) => {
                    const p = item.payload as (typeof topProductsData)[number];
                    return (
                      <div className="space-y-1">
                        <div className="text-xs font-semibold text-foreground">
                          {p.product} ({p.category})
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs text-muted-foreground">Revenue</span>
                          <span className="font-semibold tabular-nums text-foreground">
                            {formatCurrency(Number(value), true)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs text-muted-foreground">Profit</span>
                          <span className="font-semibold tabular-nums text-foreground">
                            {formatCurrency(p.profit, true)}
                          </span>
                        </div>
                      </div>
                    );
                  }}
                />
              }
            />
            <Bar
              dataKey="revenue"
              maxBarSize={30}
              radius={[0, 1, 1, 0]}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.product}
                  fill={CATEGORY_COLORS[entry.category] || "#5c6bc0"}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>

        {/* Bottom-right Legend matching Image 2 with Books covered */}
        <div className="flex flex-wrap items-center justify-end gap-4 sm:gap-5 pr-4 sm:pr-6 pt-2 text-xs font-medium text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="h-3.5 w-5 rounded-xs bg-[#ec407a]" />
            <span>Clothing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3.5 w-5 rounded-xs bg-[#5c6bc0]" />
            <span>Electronics</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3.5 w-5 rounded-xs bg-[#00b894]" />
            <span>Home &amp; Kitchen</span>
          </div>
          {data.some((d) => d.category === "Books") && (
            <div className="flex items-center gap-1.5">
              <span className="h-3.5 w-5 rounded-xs bg-[#f39c12]" />
              <span>Books</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
