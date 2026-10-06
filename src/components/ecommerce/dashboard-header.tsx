"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  Database,
  Moon,
  Search,
  Sun,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-3 px-4 md:px-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold tracking-tight">CommerceIQ</span>
            <span className="text-[11px] text-muted-foreground">
              Global Sales Analytics
            </span>
          </div>
        </div>

        {/* Tabs (visible md+) */}
        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {[
            { id: "overview", label: "Overview" },
            { id: "sales", label: "Sales" },
            { id: "geo", label: "Geographic" },
            { id: "products", label: "Products" },
            { id: "customers", label: "Customers" },
            { id: "operations", label: "Operations" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => onTabChange(t.id)}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                activeTab === t.id
                  ? "bg-primary text-primary-foreground font-medium shadow-sm"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* Search */}
        <div className="relative ml-auto hidden max-w-xs md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search the dashboard..."
            className="h-9 pl-9 bg-muted/40 border-border/60"
          />
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          {/* Date range */}
          <Select defaultValue="3y">
            <SelectTrigger className="hidden h-9 w-[150px] gap-2 sm:flex">
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

          {/* Dataset badge */}
          <div className="hidden items-center gap-1.5 rounded-md border border-border/60 bg-muted/30 px-2.5 py-1.5 text-xs font-medium text-muted-foreground lg:flex">
            <Database className="h-3.5 w-3.5" />
            2,000 txns
          </div>

          {/* Live status */}
          <div className="hidden items-center gap-1.5 rounded-md border border-border/60 bg-muted/30 px-2.5 py-1.5 text-xs font-medium text-muted-foreground lg:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live
          </div>

          {/* Theme toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          )}

          {/* User */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-2 py-1 transition-colors hover:bg-muted/60">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
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

      {/* Mobile tabs */}
      <div className="flex overflow-x-auto border-t border-border/60 px-2 py-1.5 lg:hidden">
        {[
          { id: "overview", label: "Overview" },
          { id: "sales", label: "Sales" },
          { id: "geo", label: "Geographic" },
          { id: "products", label: "Products" },
          { id: "customers", label: "Customers" },
          { id: "operations", label: "Operations" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => onTabChange(t.id)}
            className={`shrink-0 rounded-md px-3 py-1.5 text-xs transition-colors ${
              activeTab === t.id
                ? "bg-primary text-primary-foreground font-medium"
                : "text-muted-foreground hover:bg-muted/60"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </header>
  );
}
