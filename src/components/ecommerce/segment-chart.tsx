"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
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
} from "@/components/ui/card";
import { segmentData, formatCurrency, formatNumber } from "@/lib/ecommerce-data";

const SEGMENT_COLORS: Record<string, string> = {
  "Consumer": "#5c6bc0",
  "Corporate": "#ec407a",
  "Home Office": "#00b894",
};

const config: ChartConfig = {
  revenue: { label: "Revenue", color: "#5c6bc0" },
  profit: { label: "Profit (overlay)", color: "#369baf" },
  "Consumer": { label: "Consumer", color: "#5c6bc0" },
  "Corporate": { label: "Corporate", color: "#ec407a" },
  "Home Office": { label: "Home Office", color: "#00b894" },
};

// Custom inside percentage label for customer segment pie chart matching Image 4
const renderInsidePercentage = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, share } = props;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.58;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
      className="drop-shadow-xs"
    >
      {`${share}%`}
    </text>
  );
};

// Custom outside label for segment names
const renderOutsideLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, segment } = props;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 22;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="currentColor"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight={500}
      className="fill-slate-700 dark:fill-slate-200"
    >
      {segment}
    </text>
  );
};

export function SegmentChart() {
  return (
    <Card className="border border-border/60 shadow-sm transition-all hover:shadow-md">
      <CardContent className="p-3 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left Chart: Order Share by Customer Segment */}
          <div className="flex flex-col items-center w-full">
            <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight text-center mb-2">
              Order Share by Customer Segment
            </h3>
            <ChartContainer
              config={config}
              className="h-[280px] xs:h-[300px] sm:h-[330px] w-full max-w-[380px] mx-auto"
            >
              <PieChart margin={{ top: 16, right: 36, bottom: 16, left: 36 }}>
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      formatter={(value, _name, item) => {
                        const s = item.payload as (typeof segmentData)[number];
                        return (
                          <div className="space-y-1">
                            <div className="text-xs font-semibold text-foreground">
                              {s.segment}
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-xs text-muted-foreground">Order Share</span>
                              <span className="text-xs font-semibold tabular-nums">
                                {s.share}% ({formatNumber(Number(value))} orders)
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-xs text-muted-foreground">Revenue</span>
                              <span className="text-xs font-semibold tabular-nums">
                                {formatCurrency(s.revenue, true)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-xs text-muted-foreground">Profit</span>
                              <span className="text-xs font-semibold tabular-nums">
                                {formatCurrency(s.profit, true)}
                              </span>
                            </div>
                          </div>
                        );
                      }}
                    />
                  }
                />
                <Pie
                  data={segmentData}
                  dataKey="orders"
                  nameKey="segment"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  stroke="#ffffff"
                  strokeWidth={2.5}
                  startAngle={180}
                  endAngle={-180}
                  label={renderOutsideLabel}
                  labelLine={false}
                >
                  {segmentData.map((entry) => (
                    <Cell
                      key={entry.segment}
                      fill={SEGMENT_COLORS[entry.segment]}
                    />
                  ))}
                </Pie>
                {/* Secondary pie just for inside percentage text */}
                <Pie
                  data={segmentData}
                  dataKey="orders"
                  nameKey="segment"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  fill="none"
                  stroke="none"
                  startAngle={180}
                  endAngle={-180}
                  label={renderInsidePercentage}
                  labelLine={false}
                  pointerEvents="none"
                >
                  {segmentData.map((entry) => (
                    <Cell key={`pct-${entry.segment}`} fill="transparent" />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>

          {/* Right Chart: Revenue vs Profit by Segment */}
          <div className="flex flex-col items-center w-full">
            <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight text-center mb-1">
              Revenue vs Profit by Segment
            </h3>
            {/* Top-right legend matching Image 4 */}
            <div className="flex items-center justify-end w-full gap-4 pr-4 pt-1 pb-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <span className="h-3 w-4.5 rounded-xs bg-[#5c6bc0]" />
                <span>Revenue</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <span className="h-3 w-4.5 rounded-xs bg-[#369baf]" />
                <span>Profit (overlay)</span>
              </div>
            </div>

            {/*
              OVERLAY BAR CHART DESIGN RATIONALE:
              Recharts barGap="-100%" shifts the second <Bar> backwards by 100% of its slot width,
              superimposing the 'Profit' bar directly inside/in front of the 'Revenue' bar at the same X-coordinate.
              This perfectly reproduces the Matplotlib/Seaborn nested bar chart visualization (Image 4).
              
              Guarantees & Invariants:
              1. Z-Order: 'revenue' is rendered first (background), followed by 'profit' (foreground).
              2. Width Consistency: Both bars use an identical barSize={46} and maxBarSize={52} to prevent misaligned widths.
              3. Value Invariant: Profit <= Revenue across all segments, ensuring the foreground bar is always visible.
            */}
            <ChartContainer
              config={config}
              className="h-[280px] xs:h-[300px] sm:h-[330px] w-full"
            >
              <BarChart
                data={segmentData}
                barGap="-100%"
                margin={{ left: 0, right: 16, top: 12, bottom: 8 }}
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
                  width={52}
                  domain={[0, 325000]}
                  ticks={[0, 50000, 100000, 150000, 200000, 250000, 300000]}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  tickFormatter={(v: number) => (v === 0 ? "$0" : `$${Math.round(v / 1000)}K`)}
                />
                <ChartTooltip
                  cursor={{ fill: "var(--muted)", opacity: 0.2 }}
                  content={
                    <ChartTooltipContent
                      formatter={(value, name, item) => {
                        const s = item.payload as (typeof segmentData)[number];
                        const isRev = name === "revenue";
                        return (
                          <div className="space-y-1">
                            <div className="text-xs font-semibold text-foreground">
                              {s.segment} — {isRev ? "Total Revenue" : "Total Profit"}
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-xs text-muted-foreground">
                                {isRev ? "Revenue" : "Profit"}
                              </span>
                              <span className="text-xs font-semibold tabular-nums text-foreground">
                                {formatCurrency(Number(value), true)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-xs text-muted-foreground">Margin</span>
                              <span className="text-xs font-semibold tabular-nums text-foreground">
                                {s.profit_margin.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        );
                      }}
                    />
                  }
                />
                {/* 1. Underlying taller bar: Revenue (#5c6bc0) */}
                <Bar
                  dataKey="revenue"
                  fill="#5c6bc0"
                  barSize={46}
                  maxBarSize={52}
                  radius={[1, 1, 0, 0]}
                />
                {/* 2. Overlay bar: Profit (#369baf) superimposed on Revenue */}
                <Bar
                  dataKey="profit"
                  fill="#369baf"
                  barSize={46}
                  maxBarSize={52}
                  radius={[1, 1, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
