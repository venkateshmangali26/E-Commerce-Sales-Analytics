"use client";

import * as React from "react";
import {
  AlertTriangle,
  BarChart3,
  Globe2,
  Lightbulb,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Insight = {
  icon: React.ReactNode;
  category: string;
  title: string;
  body: string;
  tone: "positive" | "neutral" | "warning";
};

export function KeyInsights() {
  const insights: Insight[] = [
    {
      icon: <BarChart3 className="h-4 w-4" />,
      category: "Sales Performance",
      title: "Q4 seasonal peak drives 35% of annual revenue",
      body: "October through December consistently outperforms other quarters due to holiday shopping. November and December show 1.4-1.6x revenue lift vs the rest of the year. Plan inventory and marketing spend accordingly.",
      tone: "positive",
    },
    {
      icon: <Globe2 className="h-4 w-4" />,
      category: "Geographic",
      title: "North America leads, MEA underperforms on margin",
      body: "North America contributes the largest revenue share, followed by Europe and Asia Pacific. Middle East & Africa shows strong order volumes but lower profit margins due to elevated shipping costs.",
      tone: "neutral",
    },
    {
      icon: <Package className="h-4 w-4" />,
      category: "Product Strategy",
      title: "Electronics dominates revenue, Books leads margin",
      body: "Electronics captures the largest revenue share but carries thinner margins. Books and Clothing deliver healthier profit margins and are good candidates for upsell promotions.",
      tone: "neutral",
    },
    {
      icon: <Users className="h-4 w-4" />,
      category: "Customer Segments",
      title: "Corporate customers spend more per order",
      body: "Corporate segment shows the highest average order value driven by bulk purchases, but also receives the highest average discount. Home Office customers buy mid-ticket items with healthy margins.",
      tone: "neutral",
    },
    {
      icon: <AlertTriangle className="h-4 w-4" />,
      category: "Discount Risk",
      title: "Discounts above 20% erode profitability",
      body: "Orders with discounts above 20% show a sharp margin drop and contribute disproportionately to the negative-profit order pool. Recommend capping promotional discounts at 15-18%.",
      tone: "warning",
    },
    {
      icon: <ShoppingCart className="h-4 w-4" />,
      category: "Operations",
      title: "Credit Card dominates checkout mix",
      body: "Credit Card accounts for the majority of orders and revenue. Bank Transfer and Debit Card show the lowest adoption — opportunity to optimize checkout options for these methods.",
      tone: "positive",
    },
  ];

  const toneClasses: Record<Insight["tone"], string> = {
    positive: "border-l-emerald-500",
    neutral: "border-l-sky-500",
    warning: "border-l-amber-500",
  };

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Lightbulb className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">
              Key Insights &amp; Recommendations
            </CardTitle>
            <CardDescription className="text-xs">
              Distilled findings from the 14-section exploratory analysis
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((i) => (
            <div
              key={i.title}
              className={`rounded-md border border-border/60 border-l-4 ${toneClasses[i.tone]} bg-card p-3`}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted/60 text-muted-foreground">
                  {i.icon}
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {i.category}
                </span>
              </div>
              <div className="mt-2 text-sm font-semibold text-foreground">
                {i.title}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {i.body}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
