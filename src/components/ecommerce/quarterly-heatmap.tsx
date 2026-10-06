"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { heatmapData, formatCurrency } from "@/lib/ecommerce-data";

const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
const YEARS = [2023, 2024, 2025];

// YlOrRd-like palette: returns a 6-digit hex with alpha
function colorFor(value: number, max: number): string {
  if (max === 0 || value === 0) return "rgba(0,0,0,0.04)";
  const t = value / max;
  // From light yellow (#fff7bc) to deep red (#b10026)
  const r = Math.round(255 - (255 - 177) * t);
  const g = Math.round(247 - (247 - 0) * t);
  const b = Math.round(188 - (188 - 38) * t);
  return `rgba(${r},${g},${b},${0.15 + t * 0.85})`;
}

export function QuarterlyHeatmap() {
  const cellMap = new Map<string, number>();
  let max = 0;
  heatmapData.forEach((d) => {
    cellMap.set(`${d.year}-${d.quarter}`, d.revenue);
    max = Math.max(max, d.revenue);
  });

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Revenue Heatmap by Year &amp; Quarter
        </CardTitle>
        <CardDescription className="text-xs">
          Quarterly seasonality — Q4 holiday peaks visible
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-1 text-center text-xs">
            <thead>
              <tr>
                <th className="h-8 w-16 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Year
                </th>
                {QUARTERS.map((q) => (
                  <th
                    key={q}
                    className="h-8 text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    {q}
                  </th>
                ))}
                <th className="h-8 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {YEARS.map((y) => {
                const rowTotal = QUARTERS.reduce(
                  (s, q) => s + (cellMap.get(`${y}-${q}`) || 0),
                  0
                );
                return (
                  <tr key={y}>
                    <td className="h-12 text-left text-xs font-medium">{y}</td>
                    {QUARTERS.map((q) => {
                      const v = cellMap.get(`${y}-${q}`) || 0;
                      return (
                        <td key={q} className="p-0">
                          <div
                            className="flex h-12 flex-col items-center justify-center rounded-md transition-colors"
                            style={{ backgroundColor: colorFor(v, max) }}
                            title={`${y} ${q}: ${formatCurrency(v, true)}`}
                          >
                            <span className="text-xs font-semibold tabular-nums text-foreground">
                              {formatCurrency(v, true)}
                            </span>
                          </div>
                        </td>
                      );
                    })}
                    <td className="h-12 px-2">
                      <div className="flex h-full items-center justify-center rounded-md border border-border/60 bg-muted/40">
                        <span className="text-xs font-semibold tabular-nums">
                          {formatCurrency(rowTotal, true)}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-center justify-end gap-2 text-[10px] text-muted-foreground">
          <span>Low</span>
          <div className="flex h-2 w-32 overflow-hidden rounded-full">
            {[0.1, 0.3, 0.5, 0.7, 0.9].map((t) => (
              <div
                key={t}
                className="flex-1"
                style={{ backgroundColor: colorFor(t * max, max) }}
              />
            ))}
          </div>
          <span>High</span>
        </div>
      </CardContent>
    </Card>
  );
}
