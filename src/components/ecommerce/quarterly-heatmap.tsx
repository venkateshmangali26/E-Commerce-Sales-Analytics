"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { heatmapData, formatCurrency } from "@/lib/ecommerce-data";

const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
const YEARS = [2023, 2024, 2025];

// Custom gradient interpolation matching Image 4
// Domain from ~36,000 (light periwinkle #edf1fc) -> ~50,000 (blue #6376e3) -> ~58,000 (purple #8953d6) -> ~70,000 (magenta/pink #ec407a)
function getHeatmapColor(revenue: number): string {
  // Normalize between 36,000 and 70,000
  const min = 36000;
  const max = 70000;
  const t = Math.max(0, Math.min(1, (revenue - min) / (max - min)));

  if (t < 0.4) {
    // 36K to ~50K: Light periwinkle (237, 241, 252) -> Blue (99, 118, 227)
    const k = t / 0.4;
    const r = Math.round(237 + (99 - 237) * k);
    const g = Math.round(241 + (118 - 241) * k);
    const b = Math.round(252 + (227 - 252) * k);
    return `rgb(${r}, ${g}, ${b})`;
  } else if (t < 0.7) {
    // 50K to ~60K: Blue (99, 118, 227) -> Purple (137, 83, 214)
    const k = (t - 0.4) / 0.3;
    const r = Math.round(99 + (137 - 99) * k);
    const g = Math.round(118 + (83 - 118) * k);
    const b = Math.round(227 + (214 - 227) * k);
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    // 60K to 70K: Purple (137, 83, 214) -> Magenta/Pink (236, 64, 122)
    const k = (t - 0.7) / 0.3;
    const r = Math.round(137 + (236 - 137) * k);
    const g = Math.round(83 + (64 - 83) * k);
    const b = Math.round(214 + (122 - 214) * k);
    return `rgb(${r}, ${g}, ${b})`;
  }
}

function getTextColor(revenue: number): string {
  // Dark text on the light 36K cells, white text on the darker 45K+ cells
  return revenue >= 45000 ? "#ffffff" : "#1e293b";
}

const COLORBAR_TICKS = ["$70K", "$65K", "$60K", "$55K", "$50K", "$45K", "$40K", "$35K"];

export function QuarterlyHeatmap() {
  const cellMap = React.useMemo(() => {
    const map = new Map<string, number>();
    heatmapData.forEach((d) => {
      map.set(`${d.year}-${d.quarter}`, d.revenue);
    });
    return map;
  }, []);

  return (
    <Card className="border border-border/60 shadow-sm transition-all hover:shadow-md">
      <CardHeader className="pb-1 pt-4 text-center">
        <CardTitle className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          Quarterly Revenue Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-6 pt-2">
        <div className="overflow-x-auto [scrollbar-width:thin] touch-pan-x -webkit-overflow-scrolling-touch pb-4">
          <div className="min-w-[540px] max-w-[760px] mx-auto flex items-start justify-center gap-6 sm:gap-8 pt-2">
            {/* Heatmap Grid */}
            <div className="flex flex-col flex-1 max-w-[620px]">
              {/* Rows */}
              <div className="flex flex-col gap-1.5">
                {YEARS.map((y) => (
                  <div key={y} className="flex items-center gap-1.5">
                    {/* Y-axis: Year */}
                    <div className="w-16 sm:w-20 pr-3 text-right text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {y}
                    </div>

                    {/* Quarter Cells */}
                    <div className="grid grid-cols-4 gap-1.5 flex-1">
                      {QUARTERS.map((q) => {
                        const rev = cellMap.get(`${y}-${q}`) || 0;
                        const bg = getHeatmapColor(rev);
                        const textColor = getTextColor(rev);
                        const label = `$${Math.round(rev / 1000)}K`;

                        return (
                          <div
                            key={q}
                            className="flex h-16 sm:h-20 items-center justify-center rounded-xs transition-transform hover:scale-[1.02] shadow-2xs"
                            style={{
                              backgroundColor: bg,
                              color: textColor,
                            }}
                            title={`${y} ${q}: ${formatCurrency(rev, true)}`}
                          >
                            <span className="text-xs sm:text-sm font-semibold tabular-nums">
                              {label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* X-axis: Quarters at bottom matching Image 4 */}
              <div className="flex items-center pl-16 sm:pl-20 pt-3">
                <div className="grid grid-cols-4 gap-1.5 flex-1 text-center">
                  {QUARTERS.map((q) => (
                    <div
                      key={q}
                      className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >
                      {q}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vertical Colorbar on the Right matching Image 4 */}
            <div className="flex items-stretch gap-2.5 pt-0.5">
              {/* Gradient Strip: Matches getHeatmapColor exact color stops and matrix height (3 rows = 204px / 252px) */}
              <div
                className="w-3.5 sm:w-4 rounded-xs shadow-inner h-[204px] sm:h-[252px]"
                style={{
                  background:
                    "linear-gradient(to bottom, #ec407a 0%, #8953d6 30%, #6376e3 60%, #edf1fc 100%)",
                }}
              />

              {/* Ticks and Labels: Bounded to full $35K-$70K range with proper tick notches */}
              <div
                className="flex flex-col justify-between text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 select-none py-0.5 h-[204px] sm:h-[252px]"
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
