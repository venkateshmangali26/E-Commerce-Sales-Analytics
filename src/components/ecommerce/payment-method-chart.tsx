"use client";

import * as React from "react";
import { Cell, Pie, PieChart } from "recharts";
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
import { paymentData, formatCurrency, formatNumber } from "@/lib/ecommerce-data";

const METHOD_COLORS: Record<string, string> = {
  "Credit Card": "var(--chart-1)",
  "PayPal": "var(--chart-2)",
  "Bank Transfer": "var(--chart-3)",
  "Debit Card": "var(--chart-4)",
};

const config: ChartConfig = {
  orders: { label: "Orders" },
  ...Object.fromEntries(
    Object.keys(METHOD_COLORS).map((k) => [k, { label: k, color: METHOD_COLORS[k] }])
  ),
};

export function PaymentMethodChart() {
  const totalOrders = paymentData.reduce((s, p) => s + p.orders, 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Payment Method Distribution
        </CardTitle>
        <CardDescription className="text-xs">
          Order share and average order value by payment type
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer
          config={config}
          className="aspect-square mx-auto w-full max-w-[240px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value, _name, item) => {
                    const p = item.payload as (typeof paymentData)[number];
                    return (
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-foreground">
                          {p.method}
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">Orders</span>
                          <span className="text-xs font-semibold tabular-nums">
                            {formatNumber(Number(value))} ({p.share}%)
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">Revenue</span>
                          <span className="text-xs font-semibold tabular-nums">
                            {formatCurrency(p.revenue, true)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">Avg Order</span>
                          <span className="text-xs font-semibold tabular-nums">
                            {formatCurrency(p.avg_order)}
                          </span>
                        </div>
                      </div>
                    );
                  }}
                />
              }
            />
            <Pie
              data={paymentData}
              dataKey="orders"
              nameKey="method"
              innerRadius={58}
              outerRadius={92}
              strokeWidth={2}
              stroke="var(--card)"
              paddingAngle={2}
              label={(entry) => `${(entry.payload as (typeof paymentData)[number]).share}%`}
              labelLine={false}
            >
              {paymentData.map((entry) => (
                <Cell key={entry.method} fill={METHOD_COLORS[entry.method]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
          {paymentData.map((p) => (
            <div key={p.method} className="flex items-center gap-1.5 text-[11px]">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: METHOD_COLORS[p.method] }}
              />
              <span className="text-muted-foreground">{p.method}</span>
              <span className="ml-auto font-semibold tabular-nums">{p.share}%</span>
            </div>
          ))}
        </div>
        <div className="mt-3 text-center text-[11px] text-muted-foreground">
          Total orders processed: <span className="font-semibold text-foreground tabular-nums">{formatNumber(totalOrders)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
