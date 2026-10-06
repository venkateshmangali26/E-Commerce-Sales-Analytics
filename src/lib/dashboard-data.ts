// Mock e-commerce sales analytics data

export type TrendPoint = {
  date: string;
  revenue: number;
  orders: number;
  visitors: number;
  refunds: number;
};

export type CategoryDatum = {
  name: string;
  value: number;
  fill: string;
};

export type ProductDatum = {
  name: string;
  units: number;
  revenue: number;
  growth: number;
};

export type RegionDatum = {
  region: string;
  revenue: number;
  orders: number;
  share: number;
};

export type OrderRow = {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: number;
  status: "Paid" | "Pending" | "Refunded" | "Shipped";
  date: string;
};

export type FunnelStage = {
  stage: string;
  value: number;
};

export const trendData: TrendPoint[] = [
  { date: "Sep 01", revenue: 12480, orders: 142, visitors: 3840, refunds: 4 },
  { date: "Sep 02", revenue: 13690, orders: 158, visitors: 4120, refunds: 6 },
  { date: "Sep 03", revenue: 14230, orders: 167, visitors: 4380, refunds: 5 },
  { date: "Sep 04", revenue: 13120, orders: 151, visitors: 3990, refunds: 7 },
  { date: "Sep 05", revenue: 15780, orders: 184, visitors: 4820, refunds: 3 },
  { date: "Sep 06", revenue: 18240, orders: 212, visitors: 5460, refunds: 4 },
  { date: "Sep 07", revenue: 17960, orders: 209, visitors: 5380, refunds: 6 },
  { date: "Sep 08", revenue: 16320, orders: 191, visitors: 4980, refunds: 5 },
  { date: "Sep 09", revenue: 14870, orders: 173, visitors: 4520, refunds: 8 },
  { date: "Sep 10", revenue: 15430, orders: 179, visitors: 4710, refunds: 4 },
  { date: "Sep 11", revenue: 16890, orders: 196, visitors: 5180, refunds: 6 },
  { date: "Sep 12", revenue: 19420, orders: 224, visitors: 5890, refunds: 5 },
  { date: "Sep 13", revenue: 21870, orders: 253, visitors: 6420, refunds: 7 },
  { date: "Sep 14", revenue: 21340, orders: 248, visitors: 6290, refunds: 4 },
  { date: "Sep 15", revenue: 20180, orders: 234, visitors: 6010, refunds: 6 },
  { date: "Sep 16", revenue: 19240, orders: 223, visitors: 5780, refunds: 5 },
  { date: "Sep 17", revenue: 17860, orders: 207, visitors: 5310, refunds: 9 },
  { date: "Sep 18", revenue: 18420, orders: 214, visitors: 5490, refunds: 4 },
  { date: "Sep 19", revenue: 19680, orders: 228, visitors: 5820, refunds: 6 },
  { date: "Sep 20", revenue: 22340, orders: 259, visitors: 6540, refunds: 5 },
  { date: "Sep 21", revenue: 24180, orders: 281, visitors: 7010, refunds: 7 },
  { date: "Sep 22", revenue: 23560, orders: 274, visitors: 6840, refunds: 4 },
  { date: "Sep 23", revenue: 21890, orders: 254, visitors: 6320, refunds: 6 },
  { date: "Sep 24", revenue: 20740, orders: 241, visitors: 6080, refunds: 5 },
  { date: "Sep 25", revenue: 22130, orders: 257, visitors: 6450, refunds: 8 },
  { date: "Sep 26", revenue: 23840, orders: 276, visitors: 6890, refunds: 4 },
  { date: "Sep 27", revenue: 25960, orders: 301, visitors: 7320, refunds: 6 },
  { date: "Sep 28", revenue: 27430, orders: 318, visitors: 7680, refunds: 5 },
  { date: "Sep 29", revenue: 26120, orders: 304, visitors: 7420, refunds: 7 },
  { date: "Sep 30", revenue: 24890, orders: 289, visitors: 7180, refunds: 4 },
];

export const categoryData: CategoryDatum[] = [
  { name: "Electronics", value: 184600, fill: "var(--chart-1)" },
  { name: "Apparel", value: 128300, fill: "var(--chart-2)" },
  { name: "Home & Living", value: 89200, fill: "var(--chart-3)" },
  { name: "Beauty", value: 67400, fill: "var(--chart-4)" },
  { name: "Sports", value: 52100, fill: "var(--chart-5)" },
];

export const topProducts: ProductDatum[] = [
  { name: "Aurora Wireless Earbuds Pro", units: 1284, revenue: 128400, growth: 18.4 },
  { name: "Summit Trekking Backpack", units: 968, revenue: 96720, growth: 12.6 },
  { name: "Lumina Smart LED Lamp", units: 824, revenue: 65840, growth: -4.2 },
  { name: "Pulse Fitness Tracker X", units: 756, revenue: 98280, growth: 22.8 },
  { name: "Nimbus Memory Foam Pillow", units: 712, revenue: 42640, growth: 8.1 },
  { name: "Vertex Stainless Watch", units: 648, revenue: 116640, growth: 15.3 },
  { name: "Cascade Insulated Bottle", units: 592, revenue: 23680, growth: -2.7 },
  { name: "Echo Bluetooth Speaker", units: 534, revenue: 58740, growth: 9.4 },
];

export const regionData: RegionDatum[] = [
  { region: "North America", revenue: 248300, orders: 2890, share: 38.2 },
  { region: "Europe", revenue: 184600, orders: 2140, share: 28.4 },
  { region: "Asia Pacific", revenue: 156800, orders: 1820, share: 24.1 },
  { region: "Latin America", revenue: 38400, orders: 480, share: 5.9 },
  { region: "Middle East & Africa", revenue: 22500, orders: 270, share: 3.4 },
];

export const recentOrders: OrderRow[] = [
  { id: "ORD-78421", customer: "Olivia Bennett", email: "olivia.b@mail.com", product: "Aurora Wireless Earbuds Pro", amount: 199.00, status: "Paid", date: "2026-10-06" },
  { id: "ORD-78420", customer: "Liam Carter", email: "liam.c@mail.com", product: "Summit Trekking Backpack", amount: 124.50, status: "Shipped", date: "2026-10-06" },
  { id: "ORD-78419", customer: "Sophia Nguyen", email: "sophia.n@mail.com", product: "Vertex Stainless Watch", amount: 249.00, status: "Pending", date: "2026-10-05" },
  { id: "ORD-78418", customer: "Noah Patel", email: "noah.p@mail.com", product: "Pulse Fitness Tracker X", amount: 159.00, status: "Paid", date: "2026-10-05" },
  { id: "ORD-78417", customer: "Emma Rodriguez", email: "emma.r@mail.com", product: "Lumina Smart LED Lamp", amount: 89.90, status: "Paid", date: "2026-10-05" },
  { id: "ORD-78416", customer: "James Mitchell", email: "james.m@mail.com", product: "Echo Bluetooth Speaker", amount: 129.00, status: "Shipped", date: "2026-10-04" },
  { id: "ORD-78415", customer: "Ava Thompson", email: "ava.t@mail.com", product: "Nimbus Memory Foam Pillow", amount: 64.00, status: "Refunded", date: "2026-10-04" },
  { id: "ORD-78414", customer: "Lucas Hill", email: "lucas.h@mail.com", product: "Cascade Insulated Bottle", amount: 39.90, status: "Paid", date: "2026-10-03" },
  { id: "ORD-78413", customer: "Mia Flores", email: "mia.f@mail.com", product: "Aurora Wireless Earbuds Pro", amount: 199.00, status: "Pending", date: "2026-10-03" },
  { id: "ORD-78412", customer: "Ethan Brooks", email: "ethan.b@mail.com", product: "Vertex Stainless Watch", amount: 249.00, status: "Shipped", date: "2026-10-02" },
  { id: "ORD-78411", customer: "Isabella Reyes", email: "isabella.r@mail.com", product: "Summit Trekking Backpack", amount: 124.50, status: "Paid", date: "2026-10-02" },
  { id: "ORD-78410", customer: "Mason Cooper", email: "mason.c@mail.com", product: "Pulse Fitness Tracker X", amount: 159.00, status: "Paid", date: "2026-10-01" },
];

export const funnelData: FunnelStage[] = [
  { stage: "Visitors", value: 184600 },
  { stage: "Product Views", value: 92340 },
  { stage: "Added to Cart", value: 41280 },
  { stage: "Checkout", value: 24890 },
  { stage: "Purchased", value: 17240 },
];

export const kpis = {
  totalRevenue: 650600,
  revenuePrev: 542300,
  totalOrders: 7600,
  ordersPrev: 6840,
  aov: 85.61,
  aovPrev: 79.31,
  conversion: 4.12,
  conversionPrev: 3.68,
  refunds: 142,
  refundsPrev: 168,
  newCustomers: 2480,
  newCustomersPrev: 2120,
};

export const formatCurrency = (value: number, compact = false) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 0,
  }).format(value);

export const formatNumber = (value: number, compact = false) =>
  new Intl.NumberFormat("en-US", {
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);

export const calcChange = (current: number, previous: number) => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};
