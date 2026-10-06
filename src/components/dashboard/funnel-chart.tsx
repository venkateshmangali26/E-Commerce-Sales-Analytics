"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { funnelData, formatNumber } from "@/lib/dashboard-data";

const STAGE_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function FunnelChart() {
  const max = funnelData[0].value;
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Conversion Funnel
        </CardTitle>
        <CardDescription className="text-xs">
          Customer journey from visit to purchase
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-3 space-y-3">
        {funnelData.map((stage, idx) => {
          const width = (stage.value / max) * 100;
          const prevValue = idx > 0 ? funnelData[idx - 1].value : null;
          const stepConv = prevValue
            ? ((stage.value - prevValue) / prevValue) * 100
            : null;
          return (
            <div key={stage.stage} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">{stage.stage}</span>
                <span className="text-muted-foreground tabular-nums">
                  {formatNumber(stage.value)}
                </span>
              </div>
              <div className="relative h-9 w-full overflow-hidden rounded-md bg-muted/60">
                <div
                  className="absolute inset-y-0 left-0 rounded-md transition-all duration-500"
                  style={{
                    width: `${width}%`,
                    backgroundColor: STAGE_COLORS[idx],
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-end pr-2.5">
                  <span className="text-[11px] font-semibold text-foreground tabular-nums mix-blend-luminosity">
                    {width.toFixed(1)}%
                  </span>
                </div>
              </div>
              {stepConv !== null && (
                <div className="flex items-center justify-end text-[10px] text-muted-foreground">
                  Step drop-off:{" "}
                  <span
                    className={`ml-1 font-medium tabular-nums ${
                      stepConv < 0 ? "text-rose-600" : "text-emerald-600"
                    }`}
                  >
                    {stepConv < 0 ? "" : "+"}
                    {stepConv.toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
