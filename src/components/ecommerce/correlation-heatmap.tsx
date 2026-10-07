"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { correlationMatrix, correlationFeatures } from "@/lib/ecommerce-data";

// Matplotlib/Seaborn 'coolwarm' color mapping
// -1.00 = coral red (#f04c4c)
//  0.00 = pale neutral/white (#f5f6fa)
// +1.00 = royal periwinkle/blue (#5c6bc0)
function getCoolwarmColor(val: number): string {
  // Clamp between -1 and 1
  const v = Math.max(-1, Math.min(1, val));

  if (v >= 0) {
    // Interpolate from neutral (#f5f6fa: 245, 246, 250) to royal blue (#5c6bc0: 92, 107, 192)
    const t = v; // 0..1
    const r = Math.round(245 + (92 - 245) * t);
    const g = Math.round(246 + (107 - 246) * t);
    const b = Math.round(250 + (220 - 250) * t);
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    // Interpolate from neutral (#f5f6fa: 245, 246, 250) to red (#f04c4c: 240, 76, 76)
    const t = Math.abs(v); // 0..1
    const r = Math.round(245 + (240 - 245) * t);
    const g = Math.round(246 + (76 - 246) * t);
    const b = Math.round(250 + (76 - 250) * t);
    return `rgb(${r}, ${g}, ${b})`;
  }
}

// Determines text contrast color
function getTextColor(val: number): string {
  if (val >= 0.5) return "#ffffff";
  if (val <= -0.65) return "#ffffff";
  return "#1e293b"; // dark slate for low to moderate values
}

const COLORBAR_TICKS = [
  "1.00",
  "0.75",
  "0.50",
  "0.25",
  "0.00",
  "-0.25",
  "-0.50",
  "-0.75",
  "-1.00",
];

export function CorrelationHeatmap() {
  const features = correlationFeatures;

  return (
    <Card className="border border-border/60 shadow-sm transition-all hover:shadow-md">
      <CardHeader className="pb-2 pt-4 text-center">
        <CardTitle className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          Pearson Correlation Matrix
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-6 pt-2">
        <div className="overflow-x-auto [scrollbar-width:thin] touch-pan-x -webkit-overflow-scrolling-touch pb-6">
          <div className="min-w-[580px] max-w-[760px] mx-auto flex items-start justify-center gap-6 sm:gap-8 pt-2">
            {/* Heatmap Matrix Table */}
            <div className="flex flex-col">
              {/* Row items */}
              <div className="flex flex-col gap-1">
                {correlationMatrix.map((row) => (
                  <div key={row.feature} className="flex items-center gap-1">
                    {/* Y-axis label */}
                    <div className="w-32 sm:w-36 pr-3 text-right text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {row.feature}
                    </div>

                    {/* Matrix Cells */}
                    <div className="flex gap-1">
                      {features.map((col) => {
                        const val = (row as any)[col] as number;
                        const bg = getCoolwarmColor(val);
                        const textColor = getTextColor(val);
                        const displayVal = val.toFixed(2);

                        return (
                          <div
                            key={col}
                            className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xs transition-transform hover:scale-105 hover:z-10 shadow-2xs"
                            style={{
                              backgroundColor: bg,
                              color: textColor,
                            }}
                            title={`${row.feature} × ${col}: ${displayVal}`}
                          >
                            <span className="text-xs sm:text-[13px] font-medium tabular-nums tracking-tight">
                              {displayVal}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* X-axis labels angled 45 degrees matching Image 5 */}
              <div className="flex items-start pl-32 sm:pl-36 pt-2 gap-1">
                {features.map((col) => (
                  <div
                    key={col}
                    className="w-12 sm:w-14 relative h-28 flex items-start justify-start"
                  >
                    <div
                      className="absolute top-2 left-3 origin-top-left text-xs sm:text-[13px] font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap"
                      style={{
                        transform: "rotate(-45deg)",
                      }}
                    >
                      {col}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vertical Colorbar on the Right matching Image 5 */}
            <div className="flex items-stretch gap-2.5 pt-0.5">
              {/* Gradient Strip */}
              <div
                className="w-4 sm:w-4.5 rounded-xs shadow-inner h-[308px] sm:h-[356px]"
                style={{
                  background:
                    "linear-gradient(to bottom, #5c6bc0 0%, #a4b0e8 25%, #f5f6fa 50%, #f49898 75%, #f04c4c 100%)",
                }}
              />

              {/* Ticks and Labels */}
              <div
                className="flex flex-col justify-between text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 py-0.5 select-none h-[308px] sm:h-[356px]"
              >
                {COLORBAR_TICKS.map((tick) => (
                  <div key={tick} className="flex items-center gap-1.5 leading-none">
                    <span className="h-[1px] w-1.5 sm:w-2 bg-slate-400 dark:bg-slate-500 shrink-0" aria-hidden="true" />
                    <span className="tabular-nums">{tick}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
