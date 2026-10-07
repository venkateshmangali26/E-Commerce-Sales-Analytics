"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  BarChart3, Calendar, ChevronDown, Moon, Search, Sun,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const DASHBOARD_TABS = [
  { id: "overview", label: "Overview", emoji: "📊", desc: "Executive Summary & KPIs" },
  { id: "sales", label: "Sales", emoji: "💰", desc: "Monthly & Day-of-Week Trends" },
  { id: "geo", label: "Geographic", emoji: "🌍", desc: "Regions & Global Markets" },
  { id: "products", label: "Products", emoji: "🛍️", desc: "Top 10 SKUs & Category Share" },
  { id: "customers", label: "Customers", emoji: "👥", desc: "Segments & Payment Methods" },
  { id: "operations", label: "Operations", emoji: "⚙️", desc: "Correlation Matrix & Discounts" },
] as const;

export type TabId = (typeof DASHBOARD_TABS)[number]["id"];

const TAB_COLORS: Record<string, string> = {
  overview: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  sales: "linear-gradient(135deg, #10b981, #06b6d4)",
  geo: "linear-gradient(135deg, #06b6d4, #0ea5e9)",
  products: "linear-gradient(135deg, #f59e0b, #ef4444)",
  customers: "linear-gradient(135deg, #ec4899, #f43f5e)",
  operations: "linear-gradient(135deg, #84cc16, #f59e0b)",
};

export function DashboardHeader({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (t: string) => void;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
    if (typeof window !== "undefined") {
      window.location.hash = tabId;
      // Smoothly scroll to the main tab content area if scrolled far down
      const tabTarget = document.getElementById("dashboard-tab-content");
      if (tabTarget) {
        tabTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-card/90 backdrop-blur-md shadow-xs">
      <div className="flex h-14 sm:h-16 items-center justify-between gap-2 px-3 sm:px-6 max-w-[1600px] mx-auto w-full">
        {/* Brand identity */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => handleTabClick("overview")}
            className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
            title="CommerceIQ Sales Analytics - Back to Overview"
          >
            <div
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl text-white shadow-md transition-transform group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)" }}
            >
              <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className="text-sm sm:text-base font-bold tracking-tight bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)" }}
              >
                CommerceIQ
              </span>
              <span className="hidden text-[10px] sm:text-[11px] text-muted-foreground font-medium xs:inline-block">
                Sales Analytics
              </span>
            </div>
          </button>
        </div>

        {/* Laptop / Desktop tabs */}
        <nav
          aria-label="Dashboard views"
          className="ml-2 hidden items-center gap-1 xl:gap-1.5 lg:flex"
        >
          {DASHBOARD_TABS.map((t) => {
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                id={`header-tab-${t.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick(t.id);
                }}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs xl:text-sm font-semibold transition-all duration-200 cursor-pointer select-none ${
                  active
                    ? "text-white shadow-md scale-105 ring-2 ring-white/20"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground hover:scale-102"
                }`}
                style={active ? { background: TAB_COLORS[t.id] } : undefined}
              >
                <span className="text-xs">{t.emoji}</span>
                <span>{t.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Search on large displays */}
        <div className="relative ml-auto hidden max-w-[160px] xl:max-w-xs xl:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search metrics..."
            className="h-8 rounded-full border-border/60 bg-muted/40 pl-8 text-xs focus-visible:ring-indigo-400"
          />
        </div>

        {/* Action icons & user profile */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Timeframe selector (tablets & laptops) */}
          <Select defaultValue="3y">
            <SelectTrigger className="hidden h-8 w-[120px] sm:w-[130px] gap-1.5 rounded-full md:flex text-xs border-border/60 bg-muted/30">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025 only</SelectItem>
              <SelectItem value="2024">2024 only</SelectItem>
              <SelectItem value="3y">2023 – 2025</SelectItem>
              <SelectItem value="ytd">Year to date</SelectItem>
            </SelectContent>
          </Select>

          {/* Live badge */}
          <div
            className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-emerald-200/60 dark:border-emerald-900/60 px-2 sm:px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30"
          >
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500" />
            </span>
            <span>Live</span>
          </div>

          {/* Theme switcher */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-full text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          )}

          {/* User profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-full border border-border/50 bg-muted/30 p-1 sm:px-2 sm:py-1 transition-all hover:bg-muted/60 cursor-pointer"
              >
                <Avatar className="h-6 w-6 sm:h-7 sm:w-7">
                  <AvatarFallback
                    className="text-[10px] sm:text-xs font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}
                  >
                    AK
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-3 w-3 text-muted-foreground sm:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Alex K. (Analyst)</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Dataset Info (2,000 txns)</DropdownMenuItem>
              <DropdownMenuItem>Export Summary</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile & Tablet Tab Scrollbar */}
      <div className="flex overflow-x-auto border-t border-border/40 px-2 py-1.5 lg:hidden [scrollbar-width:none] touch-pan-x -webkit-overflow-scrolling-touch bg-muted/20">
        <div className="flex items-center gap-1.5 min-w-max mx-auto px-1">
          {DASHBOARD_TABS.map((t) => {
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                id={`mobile-tab-${t.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick(t.id);
                }}
                className={`flex items-center gap-1.5 shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  active
                    ? "text-white shadow-sm scale-102 ring-1 ring-white/30"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground active:scale-95"
                }`}
                style={active ? { background: TAB_COLORS[t.id] } : undefined}
              >
                <span>{t.emoji}</span>
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
