"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
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
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardHeader() {
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
            <span className="text-[11px] text-muted-foreground">Sales Analytics</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative ml-2 hidden flex-1 max-w-md md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search orders, products, customers..."
            className="h-9 pl-9 bg-muted/40 border-border/60"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Date range */}
          <Select defaultValue="30d">
            <SelectTrigger className="hidden h-9 w-[150px] gap-2 sm:flex">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="14d">Last 14 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last quarter</SelectItem>
              <SelectItem value="ytd">Year to date</SelectItem>
            </SelectContent>
          </Select>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-destructive" />
          </Button>

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
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          )}

          {/* User */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-2 py-1 transition-colors hover:bg-muted/60">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                    AK
                  </AvatarFallback>
                </Avatar>
                <div className="hidden flex-col items-start leading-tight sm:flex">
                  <span className="text-xs font-medium">Alex Kumar</span>
                  <span className="text-[10px] text-muted-foreground">Admin</span>
                </div>
                <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground sm:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
