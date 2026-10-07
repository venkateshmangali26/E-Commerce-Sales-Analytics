"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  BarChart3, Calendar, ChevronDown, Database, Moon, Search, Sun,
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

const TAB_COLORS: Record<string, string> = {
  overview: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  sales: "linear-gradient(135deg, #10b981, #06b6d4)",
  geo: "linear-gradient(135deg, #06b6d4, #0ea5e9)",
  products: "linear-gradient(135deg, #f59e0b, #ef4444)",
  customers: "linear-gradient(135deg, #ec4899, #f43f5e)",
  operations: "linear-gradient(135deg, #84cc16, #f59e0b)",
};

export function DashboardHeader({
  activeTab, onTabChange,
}: { activeTab: string; onTabChange: (t: string) => void }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const TABS = [
    { id: "overview", label: "Overview", emoji: "📊" },
    { id: "sales", label: "Sales", emoji: "💰" },
    { id: "geo", label: "Geographic", emoji: "🌍" },
    { id: "products", label: "Products", emoji: "🛍️" },
    { id: "customers", label: "Customers", emoji: "👥" },
    { id: "operations", label: "Operations", emoji: "⚙️" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-card/80 backdrop-blur-lg supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center gap-3 px-4 md:px-6">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg"
            style={{ background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)" }}
          >
            <BarChart3 className="h-5 w-5" />
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <span
              className="text-sm font-bold tracking-tight bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)" }}
            >
              CommerceIQ
            </span>
            <span className="text-[11px] text-muted-foreground font-medium">Global Sales Analytics</span>
          </div>
        </div>

        <nav className="ml-4 hidden items-center gap-1.5 lg:flex">
          {TABS.map((t) => {
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onTabChange(t.id)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "text-white shadow-md scale-105"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground hover:scale-105"
                }`}
                style={active ? { background: TAB_COLORS[t.id] } : undefined}
              >
                <span className="text-xs">{t.emoji}</span>
                <span>{t.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="relative ml-auto hidden max-w-xs md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search the dashboard..."
            className="h-9 rounded-full border-border/60 bg-muted/40 pl-9"
          />
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Select defaultValue="3y">
            <SelectTrigger className="hidden h-9 w-[150px] gap-2 rounded-full sm:flex">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025 only</SelectItem>
              <SelectItem value="2024">2024 only</SelectItem>
              <SelectItem value="3y">2023 – 2025</SelectItem>
              <SelectItem value="ytd">Year to date</SelectItem>
            </SelectContent>
          </Select>

          <div
            className="hidden items-center gap-1.5 rounded-full border border-border/40 px-2.5 py-1.5 text-xs font-medium text-muted-foreground lg:flex"
            style={{ background: "linear-gradient(135deg, oklch(0.95 0.04 268), oklch(0.95 0.04 320))" }}
          >
            <Database className="h-3.5 w-3.5 text-indigo-500" />
            2,000 txns
          </div>

          <div
            className="hidden items-center gap-1.5 rounded-full border border-emerald-200/60 px-2.5 py-1.5 text-xs font-medium text-emerald-700 lg:flex"
            style={{ background: "linear-gradient(135deg, oklch(0.95 0.05 162), oklch(0.95 0.05 200))" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live
          </div>

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full border border-border/40 bg-muted/30 px-2 py-1 transition-all hover:scale-105 hover:bg-muted/60">
                <Avatar className="h-7 w-7">
                  <AvatarFallback
                    className="text-xs font-semibold text-white"
                    style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}
                  >
                    AK
                  </AvatarFallback>
                </Avatar>
                <div className="hidden flex-col items-start leading-tight sm:flex">
                  <span className="text-xs font-medium">Alex K.</span>
                  <span className="text-[10px] text-muted-foreground">Analyst</span>
                </div>
                <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground sm:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Export report</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile tabs — colorful pills */}
      <div className="flex overflow-x-auto border-t border-border/40 px-2 py-1.5 lg:hidden [scrollbar-width:none]">
        {TABS.map((t) => {
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onTabChange(t.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                active
                  ? "text-white shadow-md scale-105"
                  : "text-muted-foreground hover:bg-muted/60"
              }`}
              style={active ? { background: TAB_COLORS[t.id] } : undefined}
            >
              <span className="mr-1">{t.emoji}</span>
              {t.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
