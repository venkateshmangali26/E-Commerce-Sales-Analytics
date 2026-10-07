"use client";

import * as React from "react";
import { Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  recentOrders,
  categoryList,
  regionList,
  formatCurrency,
  formatNumber,
} from "@/lib/ecommerce-data";

const categoryVariant: Record<string, string> = {
  Electronics: "bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-700 dark:from-sky-950 dark:to-cyan-950 dark:text-sky-400 border-sky-200 dark:border-sky-900",
  Clothing: "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 dark:from-amber-950 dark:to-orange-950 dark:text-amber-400 border-amber-200 dark:border-amber-900",
  "Home & Kitchen": "bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 dark:from-emerald-950 dark:to-teal-950 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900",
  Books: "bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 dark:from-rose-950 dark:to-pink-950 dark:text-rose-400 border-rose-200 dark:border-rose-900",
};

const paymentVariant: Record<string, string> = {
  "Credit Card": "from-indigo-100 to-violet-100 text-indigo-700 dark:from-indigo-950 dark:to-violet-950 dark:text-indigo-400",
  "PayPal": "from-blue-100 to-sky-100 text-blue-700 dark:from-blue-950 dark:to-sky-950 dark:text-blue-400",
  "Bank Transfer": "from-emerald-100 to-teal-100 text-emerald-700 dark:from-emerald-950 dark:to-teal-950 dark:text-emerald-400",
  "Debit Card": "from-amber-100 to-orange-100 text-amber-700 dark:from-amber-950 dark:to-orange-950 dark:text-amber-400",
};

export function RecentOrdersTable() {
  const [query, setQuery] = React.useState("");
  const [catFilter, setCatFilter] = React.useState<string>("all");
  const [regionFilter, setRegionFilter] = React.useState<string>("all");
  const [viewMode, setViewMode] = React.useState<"table" | "cards">("cards");

  const filtered = recentOrders.filter((o) => {
    const q = query.toLowerCase();
    const matches =
      o.id.toLowerCase().includes(q) ||
      o.customer.toLowerCase().includes(q) ||
      o.product.toLowerCase().includes(q) ||
      o.country.toLowerCase().includes(q);
    const catMatch = catFilter === "all" || o.category === catFilter;
    const regionMatch = regionFilter === "all" || o.region === regionFilter;
    return matches && catMatch && regionMatch;
  });

  return (
    <Card className="col-span-full border-border/40">
      <CardHeader className="p-3 sm:p-5 sm:pb-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm sm:text-base font-semibold">
                Recent Orders
              </CardTitle>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                {filtered.length}
              </span>
            </div>
            <CardDescription className="text-[11px] sm:text-xs">
              Live transaction feed across all regions &amp; customer segments
            </CardDescription>
          </div>

          {/* Responsive search & filter bar */}
          <div className="flex flex-col gap-2 xs:flex-row xs:items-center sm:gap-2">
            <div className="relative w-full xs:w-[180px] sm:w-[220px]">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-indigo-500" />
              <Input
                placeholder="Search orders, customers..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-8 w-full rounded-full pl-8 text-xs border-indigo-200/60 bg-gradient-to-r from-indigo-50/40 to-pink-50/40 focus-visible:ring-indigo-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 xs:flex xs:items-center">
              <Select value={catFilter} onValueChange={setCatFilter}>
                <SelectTrigger className="h-8 w-full xs:w-[125px] rounded-full text-[11px] sm:text-xs border-border/40 bg-muted/30">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categoryList.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="h-8 w-full xs:w-[125px] rounded-full text-[11px] sm:text-xs border-border/40 bg-muted/30">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regionList.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-5 pt-0 sm:pt-0">
        {/* Mobile Feed View (visible on small mobile screens < md) */}
        <div className="md:hidden space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground">
              No orders match your filters.
            </div>
          ) : (
            filtered.map((o) => (
              <div
                key={o.id}
                className="rounded-xl border border-border/60 bg-muted/20 p-3 space-y-2 transition-all hover:bg-muted/40"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-primary">{o.id}</span>
                  <span className="text-[11px] text-muted-foreground">{o.date}</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{o.customer}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{o.product}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`shrink-0 text-[10px] font-medium border ${categoryVariant[o.category]}`}
                  >
                    {o.category}
                  </Badge>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-border/40 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-muted-foreground">{o.country} · Qty {o.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold tabular-nums text-foreground">{formatCurrency(o.total_sales)}</span>
                    <span
                      className={`text-[11px] font-bold tabular-nums ${
                        o.profit < 0 ? "text-rose-600" : "text-emerald-600"
                      }`}
                    >
                      {o.profit > 0 ? "+" : ""}{formatCurrency(o.profit)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Laptop & Desktop Table View (hidden on small mobile screens < md) */}
        <div className="hidden md:block max-h-[460px] overflow-y-auto rounded-md border border-border/60 [scrollbar-width:thin]">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-muted/40 backdrop-blur">
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="text-[11px] font-medium uppercase tracking-wider">Order ID</TableHead>
                <TableHead className="text-[11px] font-medium uppercase tracking-wider">Date</TableHead>
                <TableHead className="text-[11px] font-medium uppercase tracking-wider">Customer</TableHead>
                <TableHead className="text-[11px] font-medium uppercase tracking-wider">Product</TableHead>
                <TableHead className="text-[11px] font-medium uppercase tracking-wider">Category</TableHead>
                <TableHead className="hidden lg:table-cell text-[11px] font-medium uppercase tracking-wider">Region</TableHead>
                <TableHead className="text-[11px] font-medium uppercase tracking-wider text-center">Qty</TableHead>
                <TableHead className="text-right text-[11px] font-medium uppercase tracking-wider">Sales</TableHead>
                <TableHead className="text-right text-[11px] font-medium uppercase tracking-wider">Profit</TableHead>
                <TableHead className="text-[11px] font-medium uppercase tracking-wider">Payment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="py-10 text-center text-xs text-muted-foreground"
                  >
                    No orders match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((o) => (
                  <TableRow
                    key={o.id}
                    className="border-border/60 text-sm hover:bg-muted/40 transition-colors"
                  >
                    <TableCell className="font-mono text-[11px] font-medium">
                      {o.id}
                    </TableCell>
                    <TableCell className="text-[11px] tabular-nums text-muted-foreground">
                      {o.date}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col leading-tight">
                        <span className="text-[12px] font-medium">{o.customer}</span>
                        <span className="text-[10px] text-muted-foreground">{o.country}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-[12px] text-muted-foreground max-w-[160px] truncate">
                      {o.product}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-medium border ${categoryVariant[o.category]}`}
                      >
                        {o.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-[11px] text-muted-foreground">
                      {o.region}
                    </TableCell>
                    <TableCell className="text-[12px] tabular-nums text-center">{o.quantity}</TableCell>
                    <TableCell className="text-right text-[12px] font-semibold tabular-nums">
                      {formatCurrency(o.total_sales)}
                    </TableCell>
                    <TableCell
                      className={`text-right text-[12px] font-semibold tabular-nums ${
                        o.profit < 0 ? "text-rose-600" : "text-emerald-600"
                      }`}
                    >
                      {formatCurrency(o.profit)}
                    </TableCell>
                    <TableCell className="text-[11px]">
                      <span className={`inline-flex items-center rounded-full bg-gradient-to-r px-2 py-0.5 text-[10px] font-medium border ${paymentVariant[o.payment_method] || "from-muted to-muted text-muted-foreground"}`}>
                        {o.payment_method}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Showing {filtered.length} of {formatNumber(recentOrders.length)} orders</span>
          <span className="hidden sm:inline">Real-time synchronized with SQLite</span>
        </div>
      </CardContent>
    </Card>
  );
}
