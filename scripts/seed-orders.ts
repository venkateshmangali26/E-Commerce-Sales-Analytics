/**
 * Seed the SQLite database with 2,000 synthetic e-commerce orders.
 * Mirrors the global_ecommerce_sales.csv schema used in the notebook.
 *
 * Run with:  bun run scripts/seed-orders.ts
 *
 * Idempotent: if orders already exist, the script will skip seeding.
 */
import { PrismaClient } from "@prisma/client";
import {
  COUNTRIES,
  REGIONS,
  CATEGORIES,
  PRODUCTS,
  CUSTOMER_SEGMENTS,
  PAYMENT_METHODS,
  REGION_SHIP_BASE,
  CATEGORY_MARGIN,
  SEGMENT_DISCOUNT,
  MONTH_WEIGHTS,
  FIRST_NAMES,
  LAST_NAMES,
  weightedPick,
  makeRng,
  type Region,
  type Category,
  type CustomerSegment,
} from "../src/lib/ecommerce-domain";

const db = new PrismaClient();

const N_TXNS = 2000;
const YEARS = [2023, 2024, 2025];

function rand(rng: () => number, min: number, max: number) {
  return min + rng() * (max - min);
}

function randInt(rng: () => number, lo: number, hi: number) {
  return Math.floor(rand(rng, lo, hi + 1));
}

function pick<T>(arr: readonly T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

function generateOrder(i: number, rng: () => number) {
  // Bias month selection toward Q4
  const month = weightedPick(Array.from({ length: 12 }, (_, k) => k + 1), MONTH_WEIGHTS);
  const year = pick(YEARS, rng);
  const day = randInt(rng, 1, 28);
  const orderDate = new Date(year, month - 1, day);

  // Region & country
  const region = weightedPick(REGIONS as unknown as Region[], [34, 28, 22, 9, 7]);
  const country = pick(COUNTRIES[region], rng);

  // Category & product
  const category = weightedPick(CATEGORIES as unknown as Category[], [40, 28, 20, 12]);
  const product = pick(PRODUCTS[category], rng);
  const unitPrice = product.price;

  // Quantity
  const quantity = weightedPick([1, 2, 3, 4, 5], [45, 28, 14, 8, 5]);

  // Segment
  const segment = weightedPick(
    CUSTOMER_SEGMENTS as unknown as CustomerSegment[],
    [55, 30, 15]
  );

  // Discount
  let [dLo, dHi] = SEGMENT_DISCOUNT[segment];
  if (unitPrice > 200) dLo += 2;
  const discountPercent = rng() > 0.15
    ? Math.round(rand(rng, dLo, dHi) * 10) / 10
    : 0;

  const gross = unitPrice * quantity;
  const discountAmount = (gross * discountPercent) / 100;
  const totalSales = Math.round((gross - discountAmount) * 100) / 100;

  const baseMargin = CATEGORY_MARGIN[category];
  const shippingCost = Math.round((REGION_SHIP_BASE[region] + rand(rng, -3, 5)) * 100) / 100;
  const profit = Math.round((baseMargin * gross - discountAmount - shippingCost) * 100) / 100;

  const payment = weightedPick(PAYMENT_METHODS as unknown as string[], [55, 25, 12, 8]);
  const customer = `${pick(FIRST_NAMES, rng)} ${pick(LAST_NAMES, rng)}`;

  const yearIdx = YEARS.indexOf(year);
  const id = `ORD-${yearIdx * 10000 + i + 1}`;

  return {
    id,
    orderDate,
    customerName: customer,
    customerSegment: segment,
    country,
    region,
    productCategory: category,
    productName: product.name,
    quantity,
    unitPrice,
    discountPercent,
    shippingCost,
    totalSales,
    profit,
    paymentMethod: payment,
  };
}

async function main() {
  console.log("Checking existing orders...");
  const existing = await db.order.count();
  if (existing > 0) {
    console.log(`Database already has ${existing} orders. Skipping seed.`);
    return;
  }

  console.log(`Seeding ${N_TXNS} synthetic orders...`);
  const rng = makeRng(42); // deterministic

  // Generate in chunks for memory efficiency
  const CHUNK = 250;
  for (let chunkStart = 0; chunkStart < N_TXNS; chunkStart += CHUNK) {
    const batch = [];
    for (let i = chunkStart; i < Math.min(chunkStart + CHUNK, N_TXNS); i++) {
      batch.push(generateOrder(i, rng));
    }
    await db.order.createMany({ data: batch });
    console.log(`  Inserted orders ${chunkStart + 1}–${chunkStart + batch.length}`);
  }

  const final = await db.order.count();
  console.log(`✓ Seed complete. Database now has ${final} orders.`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
