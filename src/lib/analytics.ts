/**
 * Server-side analytics aggregation helpers.
 * Computes the same datasets the front-end dashboard needs, but directly
 * from the Prisma `Order` table instead of from a static file.
 */
import { db } from "@/lib/db";
import type { Order } from "@prisma/client";

const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const DOW_ORDER = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
];

export type AnalyticsPayload = {
  kpis: {
    total_sales: number;
    total_profit: number;
    total_orders: number;
    avg_order_value: number;
    avg_discount: number;
    profit_margin: number;
    total_shipping: number;
    unique_customers: number;
    negative_profit_orders: number;
    yearly: Record<number, { revenue: number; profit: number; orders: number }>;
  };
  monthly: {
    year_month: string;
    label: string;
    revenue: number;
    profit: number;
    orders: number;
  }[];
  yoy: {
    year: number;
    revenue: number;
    profit: number;
    orders: number;
  }[];
  heatmap: {
    year: number;
    quarter: string;
    revenue: number;
  }[];
  region: {
    region: string;
    revenue: number;
    profit: number;
    orders: number;
    avg_order: number;
    avg_shipping: number;
    profit_margin: number;
  }[];
  country: {
    country: string;
    region: string;
    revenue: number;
    profit: number;
    orders: number;
  }[];
  category: {
    category: string;
    revenue: number;
    profit: number;
    orders: number;
    units: number;
    avg_price: number;
    avg_discount: number;
    profit_margin: number;
  }[];
  top_products: {
    product: string;
    category: string;
    revenue: number;
    profit: number;
    units: number;
    orders: number;
  }[];
  segment: {
    segment: string;
    revenue: number;
    profit: number;
    orders: number;
    avg_order_value: number;
    avg_discount: number;
    profit_margin: number;
  }[];
  segment_category: {
    segment: string;
    values: Record<string, number>;
  }[];
  discount_scatter: {
    discount: number;
    profit_margin: number;
    total_sales: number;
    category: string;
    product: string;
  }[];
  discount_ranges: {
    range: string;
    orders: number;
    avg_revenue: number;
    avg_profit: number;
    avg_margin: number;
  }[];
  payment: {
    method: string;
    orders: number;
    revenue: number;
    share: number;
    avg_order: number;
  }[];
  shipping: {
    region: string;
    avg_shipping: number;
    profit_margin: number;
  }[];
  correlation: {
    feature: string;
    [feature: string]: string | number;
  }[];
  correlation_features: string[];
  dow: {
    day: string;
    orders: number;
    avg_revenue: number;
  }[];
};

const round = (n: number, d = 2) => Math.round(n * 10 ** d) / 10 ** d;
const fcur = (n: number) => round(n, 2);

function pearson(xs: number[], ys: number[]) {
  const n = xs.length;
  if (n === 0) return 0;
  const mx = xs.reduce((s, x) => s + x, 0) / n;
  const my = ys.reduce((s, x) => s + x, 0) / n;
  let num = 0, dx = 0, dy = 0;
  for (let i = 0; i < n; i++) {
    const a = xs[i] - mx;
    const b = ys[i] - my;
    num += a * b;
    dx += a * a;
    dy += b * b;
  }
  const denom = Math.sqrt(dx) * Math.sqrt(dy);
  return denom === 0 ? 0 : num / denom;
}

function discountRange(p: number) {
  if (p <= 0) return "No Discount";
  if (p <= 10) return "1-10%";
  if (p <= 20) return "11-20%";
  return "21-35%";
}

export async function getAnalytics(): Promise<AnalyticsPayload> {
  // Pull all orders into memory. 2000 rows is tiny; we keep it simple.
  const orders = await db.order.findMany({
    orderBy: { orderDate: "asc" },
  });

  return computeAnalytics(orders);
}

export function computeAnalytics(orders: Order[]): AnalyticsPayload {
  // ---- KPIs ----
  let totalSales = 0;
  let totalProfit = 0;
  let totalShipping = 0;
  let totalDiscount = 0;
  let negProfit = 0;
  const customers = new Set<string>();
  const yearly: Record<number, { revenue: number; profit: number; orders: number }> = {};

  for (const o of orders) {
    totalSales += o.totalSales;
    totalProfit += o.profit;
    totalShipping += o.shippingCost;
    totalDiscount += o.discountPercent;
    if (o.profit < 0) negProfit++;
    customers.add(o.customerName);

    const y = o.orderDate.getUTCFullYear();
    if (!yearly[y]) yearly[y] = { revenue: 0, profit: 0, orders: 0 };
    yearly[y].revenue += o.totalSales;
    yearly[y].profit += o.profit;
    yearly[y].orders += 1;
  }
  const totalOrders = orders.length;

  const kpis = {
    total_sales: fcur(totalSales),
    total_profit: fcur(totalProfit),
    total_orders: totalOrders,
    avg_order_value: fcur(totalSales / totalOrders),
    avg_discount: round(totalDiscount / totalOrders, 2),
    profit_margin: round((totalProfit / totalSales) * 100, 2),
    total_shipping: fcur(totalShipping),
    unique_customers: customers.size,
    negative_profit_orders: negProfit,
    yearly: Object.fromEntries(
      Object.entries(yearly).map(([k, v]) => [
        Number(k),
        {
          revenue: fcur(v.revenue),
          profit: fcur(v.profit),
          orders: v.orders,
        },
      ])
    ),
  };

  // ---- Monthly trend ----
  const monthlyMap = new Map<string, { revenue: number; profit: number; orders: number }>();
  for (const o of orders) {
    const ym = `${o.orderDate.getUTCFullYear()}-${String(o.orderDate.getUTCMonth() + 1).padStart(2, "0")}`;
    if (!monthlyMap.has(ym)) monthlyMap.set(ym, { revenue: 0, profit: 0, orders: 0 });
    const e = monthlyMap.get(ym)!;
    e.revenue += o.totalSales;
    e.profit += o.profit;
    e.orders += 1;
  }
  const monthly = Array.from(monthlyMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([ym, v]) => {
      const monthIdx = parseInt(ym.slice(5, 7)) - 1;
      return {
        year_month: ym,
        label: `${MONTH_NAMES[monthIdx]} ${ym.slice(0, 4)}`,
        revenue: fcur(v.revenue),
        profit: fcur(v.profit),
        orders: v.orders,
      };
    });

  // ---- YoY ----
  const yoy = Object.entries(yearly)
    .map(([k, v]) => ({
      year: Number(k),
      revenue: fcur(v.revenue),
      profit: fcur(v.profit),
      orders: v.orders,
    }))
    .sort((a, b) => a.year - b.year);

  // ---- Quarterly heatmap ----
  const quarterlyMap = new Map<string, number>();
  for (const o of orders) {
    const y = o.orderDate.getUTCFullYear();
    const q = Math.floor(o.orderDate.getUTCMonth() / 3) + 1;
    const k = `${y}-${q}`;
    quarterlyMap.set(k, (quarterlyMap.get(k) || 0) + o.totalSales);
  }
  const years = Array.from(new Set(orders.map((o) => o.orderDate.getUTCFullYear()))).sort();
  const heatmap: AnalyticsPayload["heatmap"] = [];
  for (const y of years) {
    for (let q = 1; q <= 4; q++) {
      heatmap.push({
        year: y,
        quarter: `Q${q}`,
        revenue: fcur(quarterlyMap.get(`${y}-${q}`) || 0),
      });
    }
  }

  // ---- Region summary ----
  const regionMap = new Map<string, {
    revenue: number; profit: number; orders: number;
    shipping: number; shipCount: number;
  }>();
  for (const o of orders) {
    if (!regionMap.has(o.region)) regionMap.set(o.region, {
      revenue: 0, profit: 0, orders: 0, shipping: 0, shipCount: 0,
    });
    const e = regionMap.get(o.region)!;
    e.revenue += o.totalSales;
    e.profit += o.profit;
    e.orders += 1;
    e.shipping += o.shippingCost;
    e.shipCount += 1;
  }
  const region = Array.from(regionMap.entries())
    .map(([k, v]) => ({
      region: k,
      revenue: fcur(v.revenue),
      profit: fcur(v.profit),
      orders: v.orders,
      avg_order: fcur(v.revenue / v.orders),
      avg_shipping: fcur(v.shipping / v.shipCount),
      profit_margin: round((v.profit / v.revenue) * 100, 1),
    }))
    .sort((a, b) => b.revenue - a.revenue);

  // ---- Country summary ----
  const countryMap = new Map<string, {
    region: string; revenue: number; profit: number; orders: number;
  }>();
  for (const o of orders) {
    if (!countryMap.has(o.country)) countryMap.set(o.country, {
      region: o.region, revenue: 0, profit: 0, orders: 0,
    });
    const e = countryMap.get(o.country)!;
    e.revenue += o.totalSales;
    e.profit += o.profit;
    e.orders += 1;
  }
  const country = Array.from(countryMap.entries())
    .map(([k, v]) => ({
      country: k,
      region: v.region,
      revenue: fcur(v.revenue),
      profit: fcur(v.profit),
      orders: v.orders,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  // ---- Category summary ----
  const catMap = new Map<string, {
    revenue: number; profit: number; orders: number; units: number;
    priceSum: number; priceCount: number; discSum: number; discCount: number;
  }>();
  for (const o of orders) {
    if (!catMap.has(o.productCategory)) catMap.set(o.productCategory, {
      revenue: 0, profit: 0, orders: 0, units: 0,
      priceSum: 0, priceCount: 0, discSum: 0, discCount: 0,
    });
    const e = catMap.get(o.productCategory)!;
    e.revenue += o.totalSales;
    e.profit += o.profit;
    e.orders += 1;
    e.units += o.quantity;
    e.priceSum += o.unitPrice;
    e.priceCount += 1;
    e.discSum += o.discountPercent;
    e.discCount += 1;
  }
  const category = Array.from(catMap.entries())
    .map(([k, v]) => ({
      category: k,
      revenue: fcur(v.revenue),
      profit: fcur(v.profit),
      orders: v.orders,
      units: v.units,
      avg_price: fcur(v.priceSum / v.priceCount),
      avg_discount: round(v.discSum / v.discCount, 2),
      profit_margin: round((v.profit / v.revenue) * 100, 1),
    }))
    .sort((a, b) => b.revenue - a.revenue);

  // ---- Top 10 products ----
  const prodMap = new Map<string, {
    category: string; revenue: number; profit: number; units: number; orders: number;
  }>();
  for (const o of orders) {
    if (!prodMap.has(o.productName)) prodMap.set(o.productName, {
      category: o.productCategory, revenue: 0, profit: 0, units: 0, orders: 0,
    });
    const e = prodMap.get(o.productName)!;
    e.revenue += o.totalSales;
    e.profit += o.profit;
    e.units += o.quantity;
    e.orders += 1;
  }
  const top_products = Array.from(prodMap.entries())
    .map(([k, v]) => ({
      product: k,
      category: v.category,
      revenue: fcur(v.revenue),
      profit: fcur(v.profit),
      units: v.units,
      orders: v.orders,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);

  // ---- Segment summary ----
  const segMap = new Map<string, {
    revenue: number; profit: number; orders: number;
    discSum: number; discCount: number;
  }>();
  for (const o of orders) {
    if (!segMap.has(o.customerSegment)) segMap.set(o.customerSegment, {
      revenue: 0, profit: 0, orders: 0, discSum: 0, discCount: 0,
    });
    const e = segMap.get(o.customerSegment)!;
    e.revenue += o.totalSales;
    e.profit += o.profit;
    e.orders += 1;
    e.discSum += o.discountPercent;
    e.discCount += 1;
  }
  const segment = Array.from(segMap.entries())
    .map(([k, v]) => ({
      segment: k,
      revenue: fcur(v.revenue),
      profit: fcur(v.profit),
      orders: v.orders,
      avg_order_value: fcur(v.revenue / v.orders),
      avg_discount: round(v.discSum / v.discCount, 2),
      profit_margin: round((v.profit / v.revenue) * 100, 1),
    }))
    .sort((a, b) => b.revenue - a.revenue);

  // ---- Segment x Category ----
  const catKeys = Array.from(catMap.keys());
  const segCatMap = new Map<string, Record<string, number>>();
  for (const o of orders) {
    if (!segCatMap.has(o.customerSegment)) {
      segCatMap.set(o.customerSegment, Object.fromEntries(catKeys.map((c) => [c, 0])));
    }
    segCatMap.get(o.customerSegment)![o.productCategory] += o.totalSales;
  }
  const segment_category = Array.from(segCatMap.entries()).map(([seg, vals]) => ({
    segment: seg,
    values: Object.fromEntries(Object.entries(vals).map(([k, v]) => [k, fcur(v)])),
  }));

  // ---- Discount scatter (sample 200) ----
  const sample = [...orders].sort(() => Math.random() - 0.5).slice(0, 200);
  const discount_scatter = sample.map((o) => ({
    discount: o.discountPercent,
    profit_margin: o.totalSales > 0 ? round((o.profit / o.totalSales) * 100, 2) : 0,
    total_sales: fcur(o.totalSales),
    category: o.productCategory,
    product: o.productName,
  }));

  // ---- Discount ranges ----
  const drMap = new Map<string, {
    orders: number; revenue: number; profit: number; marginSum: number;
  }>();
  for (const o of orders) {
    const r = discountRange(o.discountPercent);
    if (!drMap.has(r)) drMap.set(r, { orders: 0, revenue: 0, profit: 0, marginSum: 0 });
    const e = drMap.get(r)!;
    e.orders += 1;
    e.revenue += o.totalSales;
    e.profit += o.profit;
    if (o.totalSales > 0) e.marginSum += (o.profit / o.totalSales) * 100;
  }
  const drOrder = ["No Discount", "1-10%", "11-20%", "21-35%"];
  const discount_ranges = drOrder.map((r) => {
    const d = drMap.get(r)!;
    return {
      range: r,
      orders: d.orders,
      avg_revenue: fcur(d.revenue / d.orders),
      avg_profit: fcur(d.profit / d.orders),
      avg_margin: round(d.marginSum / d.orders, 2),
    };
  }).filter((d) => d.orders > 0);

  // ---- Payment method ----
  const payMap = new Map<string, { orders: number; revenue: number }>();
  for (const o of orders) {
    if (!payMap.has(o.paymentMethod)) payMap.set(o.paymentMethod, { orders: 0, revenue: 0 });
    const e = payMap.get(o.paymentMethod)!;
    e.orders += 1;
    e.revenue += o.totalSales;
  }
  const totalPayOrders = Array.from(payMap.values()).reduce((s, v) => s + v.orders, 0);
  const payment = Array.from(payMap.entries())
    .map(([k, v]) => ({
      method: k,
      orders: v.orders,
      revenue: fcur(v.revenue),
      share: round((v.orders / totalPayOrders) * 100, 1),
      avg_order: fcur(v.revenue / v.orders),
    }))
    .sort((a, b) => b.orders - a.orders);

  // ---- Shipping by region ----
  const shipping = region.map((r) => ({
    region: r.region,
    avg_shipping: r.avg_shipping,
    profit_margin: r.profit_margin,
  }));

  // ---- Correlation matrix ----
  const CORR_FEATURES = [
    "Quantity", "Unit_Price", "Discount_Percent", "Total_Sales",
    "Shipping_Cost", "Profit", "Profit_Margin",
  ];
  const corrCols: Record<string, number[]> = {};
  for (const f of CORR_FEATURES) corrCols[f] = [];
  for (const o of orders) {
    corrCols.Quantity.push(o.quantity);
    corrCols.Unit_Price.push(o.unitPrice);
    corrCols.Discount_Percent.push(o.discountPercent);
    corrCols.Total_Sales.push(o.totalSales);
    corrCols.Shipping_Cost.push(o.shippingCost);
    corrCols.Profit.push(o.profit);
    corrCols.Profit_Margin.push(o.totalSales > 0 ? (o.profit / o.totalSales) * 100 : 0);
  }
  const correlation = CORR_FEATURES.map((a) => {
    const row: Record<string, string | number> = { feature: a };
    for (const b of CORR_FEATURES) {
      row[b] = round(pearson(corrCols[a], corrCols[b]), 2);
    }
    return row;
  });

  // ---- Day of week ----
  const dowMap = new Map<string, { orders: number; revenue: number }>();
  for (const d of DOW_ORDER) dowMap.set(d, { orders: 0, revenue: 0 });
  for (const o of orders) {
    const d = DOW_ORDER[o.orderDate.getUTCDay()];
    const e = dowMap.get(d)!;
    e.orders += 1;
    e.revenue += o.totalSales;
  }
  const dow = DOW_ORDER.slice(1).concat([DOW_ORDER[0]]).map((d) => {
    const e = dowMap.get(d)!;
    return {
      day: d,
      orders: e.orders,
      avg_revenue: e.orders > 0 ? fcur(e.revenue / e.orders) : 0,
    };
  });

  return {
    kpis,
    monthly,
    yoy,
    heatmap,
    region,
    country,
    category,
    top_products,
    segment,
    segment_category,
    discount_scatter,
    discount_ranges,
    payment,
    shipping,
    correlation,
    correlation_features: CORR_FEATURES,
    dow,
  };
}

export type RecentOrdersParams = {
  search?: string;
  category?: string;
  region?: string;
  payment?: string;
  segment?: string;
  limit?: number;
  offset?: number;
};

export async function getRecentOrders(params: RecentOrdersParams) {
  const {
    search,
    category,
    region,
    payment,
    segment,
    limit = 25,
    offset = 0,
  } = params;

  const where: Record<string, unknown> = {};
  if (category && category !== "all") where.productCategory = category;
  if (region && region !== "all") where.region = region;
  if (payment && payment !== "all") where.paymentMethod = payment;
  if (segment && segment !== "all") where.customerSegment = segment;
  if (search) {
    where.OR = [
      { id: { contains: search } },
      { customerName: { contains: search } },
      { productName: { contains: search } },
      { country: { contains: search } },
    ];
  }

  const [total, rows] = await Promise.all([
    db.order.count({ where }),
    db.order.findMany({
      where,
      orderBy: { orderDate: "desc" },
      take: limit,
      skip: offset,
    }),
  ]);

  return {
    total,
    rows: rows.map((o) => ({
      id: o.id,
      date: o.orderDate.toISOString().slice(0, 10),
      customer: o.customerName,
      country: o.country,
      region: o.region,
      product: o.productName,
      category: o.productCategory,
      quantity: o.quantity,
      total_sales: round(o.totalSales, 2),
      profit: round(o.profit, 2),
      discount_percent: o.discountPercent,
      payment_method: o.paymentMethod,
      customer_segment: o.customerSegment,
    })),
  };
}
