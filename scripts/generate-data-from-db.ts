/**
 * Generates src/lib/ecommerce-data.ts directly from the Prisma SQLite database.
 * Run with: bun run scripts/generate-data-from-db.ts
 */
import * as fs from "fs";
import * as path from "path";
import { getAnalytics, getRecentOrders } from "../src/lib/analytics";
import { CATEGORIES, CUSTOMER_SEGMENTS, REGIONS } from "../src/lib/ecommerce-domain";
import { db } from "../src/lib/db";

async function main() {
  console.log("Fetching analytics from database...");
  const analytics = await getAnalytics();
  const recentOrdersData = await getRecentOrders({ limit: 25 });

  const tsContent = `// AUTO-GENERATED from Prisma database for Indian E-Commerce Market
// Synthetic e-commerce dataset: 2,000 transactions across 2023-01-01 .. 2025-12-31

export type Kpis = {
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

export const kpis: Kpis = ${JSON.stringify(analytics.kpis, null, 2)};

export const monthlyData = ${JSON.stringify(analytics.monthly, null, 2)};

export const yoyData = ${JSON.stringify(analytics.yoy, null, 2)};

export const heatmapData = ${JSON.stringify(analytics.heatmap, null, 2)};

export const regionData = ${JSON.stringify(analytics.region, null, 2)};

export const countryData = ${JSON.stringify(analytics.country, null, 2)};

export const categoryData = ${JSON.stringify(analytics.category, null, 2)};

export const topProductsData = ${JSON.stringify(analytics.top_products, null, 2)};

export const segmentData = ${JSON.stringify(analytics.segment, null, 2)};

export const segmentCategoryData = ${JSON.stringify(analytics.segment_category, null, 2)};

export const discountScatter = ${JSON.stringify(analytics.discount_scatter, null, 2)};

export const discountRangeData = ${JSON.stringify(analytics.discount_ranges, null, 2)};

export const paymentData = ${JSON.stringify(analytics.payment, null, 2)};

export const shippingData = ${JSON.stringify(analytics.shipping, null, 2)};

export const correlationMatrix = ${JSON.stringify(analytics.correlation, null, 2)};

export const correlationFeatures = ${JSON.stringify(analytics.correlation_features, null, 2)};

export const dowData = ${JSON.stringify(analytics.dow, null, 2)};

export const recentOrders = ${JSON.stringify(recentOrdersData.rows, null, 2)};

export const categoryList = ${JSON.stringify(CATEGORIES, null, 2)};

export const segmentList = ${JSON.stringify(CUSTOMER_SEGMENTS, null, 2)};

export const regionList = ${JSON.stringify(REGIONS, null, 2)};

// Formatters for Indian Rupee (₹) and Indian Numbering System
export const formatCurrency = (value: number, compact = false) => {
  if (compact) {
    const abs = Math.abs(value);
    const sign = value < 0 ? "-" : "";
    if (abs >= 10000000) return \`\${sign}₹\${(abs / 10000000).toFixed(2)} Cr\`;
    if (abs >= 100000) return \`\${sign}₹\${(abs / 100000).toFixed(1)} L\`;
    if (abs >= 1000) return \`\${sign}₹\${(abs / 1000).toFixed(1)} K\`;
    return \`\${sign}₹\${abs.toFixed(0)}\`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number, compact = false) => {
  if (compact) {
    const abs = Math.abs(value);
    const sign = value < 0 ? "-" : "";
    if (abs >= 10000000) return \`\${sign}\${(abs / 10000000).toFixed(2)} Cr\`;
    if (abs >= 100000) return \`\${sign}\${(abs / 100000).toFixed(1)} L\`;
    if (abs >= 1000) return \`\${sign}\${(abs / 1000).toFixed(1)} K\`;
    return \`\${sign}\${abs.toFixed(0)}\`;
  }
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 1,
  }).format(value);
};

export const calcChange = (current: number, previous: number) => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};
`;

  const outPath = path.join(__dirname, "..", "src", "lib", "ecommerce-data.ts");
  fs.writeFileSync(outPath, tsContent, "utf-8");
  console.log(`✓ Wrote ${outPath} (${fs.statSync(outPath).size} bytes)`);
}

main()
  .catch((e) => {
    console.error("Error generating data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
