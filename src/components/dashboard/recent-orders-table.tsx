"use client";

import * as React from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronsUpDown,
  Search,
} from "lucide-react";
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
import { recentOrders, formatCurrency, type OrderRow } from "@/lib/dashboard-data";

const statusVariant: Record<
  OrderRow["status"],
  "default" | "secondary" | "destructive" | "outline"
> = {
  Paid: "default",
  Shipped: "secondary",
  Pending: "outline",
  Refunded: "destructive",
};

const statusClass: Record<OrderRow["status"], string> = {
  Paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900",
  Shipped: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400 border-sky-200 dark:border-sky-900",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border-amber-200 dark:border-amber-900",
  Refunded: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 border-rose-200 dark:border-rose-900",
};

export function RecentOrdersTable() {
  const [query, setQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [sortByAmount, setSortByAmount] = React.useState<"none" | "asc" | "desc">("none");

  const filtered = React.useMemo(() => {
    let result = recentOrders.filter((o) => {
      const q = query.toLowerCase();
      const matches =
        o.customer.toLowerCase().includes(q) ||
        o.product.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q);
      const statusMatch = statusFilter === "all" || o.status === statusFilter;
      return matches && statusMatch;
    });
    if (sortByAmount !== "none") {
      result = [...result].sort((a, b) =>
        sortByAmount === "asc" ? a.amount - b.amount : b.amount - a.amount
      );
    }
    return result;
  }, [query, statusFilter, sortByAmount]);

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base font-semibold">
              Recent Orders
            </CardTitle>
            <CardDescription className="text-xs">
              Latest transactions across all channels
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-8 w-[200px] pl-8 text-xs"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-8 w-[120px] text-xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <button
              onClick={() =>
                setSortByAmount((s) =>
                  s === "none" ? "desc" : s === "desc" ? "asc" : "none"
                )
              }
              className="flex h-8 items-center gap-1.5 rounded-md border border-border/60 bg-muted/30 px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
            >
              <ChevronsUpDown className="h-3.5 w-3.5" />
              Amount
              {sortByAmount === "desc" && <ArrowDownRight className="h-3 w-3" />}
              {sortByAmount === "asc" && <ArrowUpRight className="h-3 w-3" />}
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="max-h-[420px] overflow-y-auto rounded-md border border-border/60 [scrollbar-width:thin]">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-muted/40 backdrop-blur">
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="text-xs font-medium uppercase tracking-wider">
                  Order ID
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider">
                  Customer
                </TableHead>
                <TableHead className="hidden text-xs font-medium uppercase tracking-wider md:table-cell">
                  Product
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider">
                  Date
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="text-right text-xs font-medium uppercase tracking-wider">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-xs text-muted-foreground py-10"
                  >
                    No orders match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((order) => (
                  <TableRow
                    key={order.id}
                    className="border-border/60 text-sm hover:bg-muted/40 transition-colors"
                  >
                    <TableCell className="font-mono text-xs font-medium">
                      {order.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col leading-tight">
                        <span className="font-medium">{order.customer}</span>
                        <span className="text-[11px] text-muted-foreground">
                          {order.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                      {order.product}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground tabular-nums">
                      {order.date}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={statusVariant[order.status]}
                        className={`text-[11px] font-medium border ${statusClass[order.status]}`}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium tabular-nums">
                      {formatCurrency(order.amount)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
