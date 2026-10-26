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
      title: "Diwali & Festive Season drives 42% of annual GMV",
      body: "September through November consistently outperforms other months due to Navratri, Diwali, and Great Indian / Big Billion festive mega-sales. October and November show 1.5-1.8x revenue spikes vs Q2. Advance regional warehouse inventory placement is essential.",
      tone: "positive",
    },
    {
      icon: <Globe2 className="h-4 w-4" />,
      category: "Geographic Hubs",
      title: "South & West hubs lead GMV, North East incurs logistics premium",
      body: "Karnataka, Maharashtra, and Delhi NCR generate over 55% of total revenue driven by tech corridors. Central & North East regions show strong order traction but higher shipping costs (avg ₹125/order) due to terrain logistics.",
      tone: "neutral",
    },
    {
      icon: <Package className="h-4 w-4" />,
      category: "Product Strategy",
      title: "Electronics leads GMV, Indian Ethnic & Books deliver peak margins",
      body: "boAt, Noise, and OnePlus smart devices capture the highest sales volume. Clothing (FabIndia, W, Roadster) and Books deliver superior 38-52% margins, making them prime candidates for festive gifting bundles.",
      tone: "neutral",
    },
    {
      icon: <Users className="h-4 w-4" />,
      category: "Customer Segments",
      title: "Corporate & MSME clients generate highest basket values",
      body: "Corporate and institutional buyers show the highest average order value driven by corporate festive gifting and bulk purchases. Retail consumers deliver consistent high-frequency repeat volume across Tier-1 and Tier-2 cities.",
      tone: "neutral",
    },
    {
      icon: <AlertTriangle className="h-4 w-4" />,
      category: "Discount Dynamics",
      title: "Festive discounts above 20% erode gross margins",
      body: "Orders discounted above 20% experience sharp margin compression. Recommend shifting festive promotions toward instant UPI/bank card cashbacks and minimum cart threshold offers rather than flat markdowns.",
      tone: "warning",
    },
    {
      icon: <ShoppingCart className="h-4 w-4" />,
      category: "Payment Operations",
      title: "UPI commands 54% checkout share with highest conversion",
      body: "UPI (PhonePe, Google Pay, Paytm) is the predominant payment rail at 54% volume with near-zero payment failures. Cash on Delivery (COD) represents 5% and requires automated OTP verification to curb Return-to-Origin (RTO).",
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
