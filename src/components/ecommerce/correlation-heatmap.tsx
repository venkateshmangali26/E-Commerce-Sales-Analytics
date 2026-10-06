"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { correlationMatrix, correlationFeatures } from "@/lib/ecommerce-data";

// coolwarm-style: -1 (blue), 0 (white/neutral), +1 (red)
function corrColor(v: number): string {
  // Use oklch-ish RGB interpolation between blue (59,130,246) and red (239,68,68) with neutral in middle
  const t = (v + 1) / 2; // 0..1
  let r: number, g: number, b: number;
  if (t < 0.5) {
    const k = t / 0.5;
    // blue to neutral
    r = Math.round(59 + (239 - 59) * k * 0.5);
    g = Math.round(130 + (240 - 130) * k * 0.5);
    b = Math.round(246 + (240 - 246) * k * 0.5);
  } else {
    const k = (t - 0.5) / 0.5;
    r = Math.round(149 + (239 - 149) * k);
    g = Math.round(185 + (68 - 185) * k);
    b = Math.round(243 + (68 - 243) * k);
  }
  return `rgba(${r},${g},${b},${0.18 + Math.abs(v) * 0.72})`;
}

export function CorrelationHeatmap() {
  const features = correlationFeatures;
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Correlation Matrix
        </CardTitle>
        <CardDescription className="text-xs">
          Pearson correlation across numerical features — red = positive, blue = negative
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0.5 text-center text-[11px]">
            <thead>
              <tr>
                <th className="h-8 w-28"></th>
                {features.map((f) => (
                  <th
                    key={f}
                    className="px-1 pb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      maxWidth: 28,
                      height: 64,
                    }}
                  >
                    {f.replace(/_/g, " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {correlationMatrix.map((row) => (
                <tr key={row.feature}>
                  <td className="h-9 w-28 pr-2 text-right text-[11px] font-medium text-muted-foreground">
                    {row.feature.replace(/_/g, " ")}
                  </td>
                  {features.map((col) => {
                    const v = row[col] as number;
                    return (
                      <td key={col} className="p-0">
                        <div
                          className="flex h-9 min-w-[40px] items-center justify-center rounded-md text-[10.5px] font-semibold tabular-nums transition-colors"
                          style={{ backgroundColor: corrColor(v) }}
                          title={`${row.feature} × ${col}: ${v.toFixed(2)}`}
                        >
                          {v.toFixed(2)}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-center justify-end gap-2 text-[10px] text-muted-foreground">
          <span>-1</span>
          <div className="flex h-2 w-32 overflow-hidden rounded-full">
            {[0, 0.25, 0.5, 0.75, 1].map((t) => (
              <div
                key={t}
                className="flex-1"
                style={{ backgroundColor: corrColor(t * 2 - 1) }}
              />
            ))}
          </div>
          <span>+1</span>
        </div>
      </CardContent>
    </Card>
  );
}
