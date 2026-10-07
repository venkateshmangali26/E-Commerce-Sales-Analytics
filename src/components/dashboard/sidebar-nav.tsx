"use client";

import * as React from "react";
import {
  BarChart3,
  Box,
  CreditCard,
  Home,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: TrendingUp, label: "Analytics" },
  { icon: ShoppingCart, label: "Orders" },
  { icon: Box, label: "Products" },
  { icon: Users, label: "Customers" },
  { icon: CreditCard, label: "Payments" },
  { icon: BarChart3, label: "Reports" },
];

const BOTTOM = [
  { icon: Settings, label: "Settings" },
  { icon: Home, label: "Storefront" },
];

export function SidebarNav() {
  return (
    <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-border/60 bg-muted/20 px-3 py-4 sticky top-16 h-[calc(100vh-4rem)]">
      <div className="px-2 pb-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Menu
        </p>
      </div>
      <nav className="flex flex-col gap-0.5">
        {NAV.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              item.active
                ? "bg-primary text-primary-foreground font-medium shadow-sm"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            }`}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="mt-auto">
        <div className="px-2 pb-2 pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            General
          </p>
        </div>
        <nav className="flex flex-col gap-0.5">
          {BOTTOM.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
