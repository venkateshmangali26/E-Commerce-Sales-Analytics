"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { monthlyData, formatCurrency } from "@/lib/ecommerce-data";

const config = {
  revenue: { label: "Revenue", color: "var(--chart-2)" },  // emerald
  profit: { label: "Profit", color: "var(--chart-3)" },    // orange
} satisfies ChartConfig;

export function MonthlyTrendChart() {
  return (
    <Card className="col-span-full border-border/40 bg-card/90 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-grad-revenue flex items-center justify-center text-white shadow-md">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 17l6-6 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 7v6h-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <CardTitle className="text-base font-bold">Monthly Sales Trend (2023 – 2025)</CardTitle>
            <CardDescription className="text-xs">
              Revenue and profit evolution across all regions and categories
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer config={config} className="aspect-[16/6] w-full">
          <AreaChart data={monthlyData} margin={{ left: 4, right: 12, top: 8, bottom: 0 }}>
            <defs>
              {/* 🎨 Vibrant multi-stop gradients */}
              <linearGradient id="fillRevenue2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                <stop offset="60%" stopColor="#06b6d4" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="fillProfit2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.45} />
                <stop offset="60%" stopColor="#ef4444" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.02} />
              </linearGradient>
              {/* Stroke gradients */}
              <linearGradient id="strokeRev" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="strokeProfit" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.5} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={10}
              tick={{ fontSize: 10.5, fill: "var(--muted-foreground)" }} interval={2} />
            <YAxis tickLine={false} axisLine={false} tickMargin={6} width={48}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: number) => formatCurrency(v, true)} />
            <ChartTooltip
              cursor={{ stroke: "var(--border)", strokeWidth: 1, strokeDasharray: "3 3" }}
              content={
                <ChartTooltipContent
                  formatter={(value, name) => (
                    <div className="flex w-full items-center justify-between gap-3">
                      <span className="text-xs text-muted-foreground capitalize">{name}</span>
                      <span className="font-semibold tabular-nums">
                        {formatCurrency(Number(value), true)}
                      </span>
                    </div>
                  )}
                  labelFormatter={(label) => `Month: ${label}`}
                />
              }
            />
            <Area type="monotone" dataKey="revenue" stroke="url(#strokeRev)" strokeWidth={3}
              fill="url(#fillRevenue2)" dot={false}
              activeDot={{ r: 6, strokeWidth: 3, stroke: "var(--background)", fill: "#10b981" }} />
            <Area type="monotone" dataKey="profit" stroke="url(#strokeProfit)" strokeWidth={2.5}
              fill="url(#fillProfit2)" dot={false}
              activeDot={{ r: 5, strokeWidth: 3, stroke: "var(--background)", fill: "#f59e0b" }} />
          </AreaChart>
        </ChartContainer>
        {/* Legend pills */}
        <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "linear-gradient(135deg, #10b981, #06b6d4)" }} />
            <span>Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)" }} />
            <span>Profit</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
