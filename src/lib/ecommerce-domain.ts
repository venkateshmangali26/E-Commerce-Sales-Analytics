/**
 * Shared e-commerce domain constants and types.
 * Used by both the seed script and the API layer so the schema stays in sync.
 */

export const REGIONS = [
  "North America",
  "Europe",
  "Asia Pacific",
  "Latin America",
  "Middle East & Africa",
] as const;
export type Region = (typeof REGIONS)[number];

export const COUNTRIES: Record<Region, string[]> = {
  "North America": ["United States", "Canada", "Mexico"],
  "Europe": ["United Kingdom", "Germany", "France", "Spain", "Italy", "Netherlands"],
  "Asia Pacific": ["China", "Japan", "India", "Australia", "Singapore", "South Korea"],
  "Latin America": ["Brazil", "Argentina", "Chile"],
  "Middle East & Africa": ["United Arab Emirates", "Saudi Arabia", "South Africa", "Turkey"],
};

export const CATEGORIES = ["Electronics", "Clothing", "Home & Kitchen", "Books"] as const;
export type Category = (typeof CATEGORIES)[number];

export const PRODUCTS: Record<Category, { name: string; price: number }[]> = {
  Electronics: [
    { name: "Aurora Wireless Earbuds Pro", price: 199.0 },
    { name: "Pulse Fitness Tracker X", price: 159.0 },
    { name: "Vertex Stainless Smartwatch", price: 249.0 },
    { name: "Echo Bluetooth Speaker", price: 129.0 },
    { name: "Lumina Smart LED Lamp", price: 89.9 },
    { name: "Nimbus Tablet 10.4", price: 419.0 },
    { name: "Horizon 4K Action Camera", price: 329.0 },
  ],
  Clothing: [
    { name: "Summit Trekking Backpack", price: 124.5 },
    { name: "Vortex Running Shoes", price: 109.0 },
    { name: "Coastline Linen Shirt", price: 64.0 },
    { name: "Alpine Down Jacket", price: 289.0 },
    { name: "Studio Yoga Leggings", price: 59.0 },
    { name: "Heritage Denim Jacket", price: 139.0 },
  ],
  "Home & Kitchen": [
    { name: "Nimbus Memory Foam Pillow", price: 64.0 },
    { name: "Cascade Insulated Bottle", price: 39.9 },
    { name: "Verde Ceramic Cookware Set", price: 219.0 },
    { name: "Lumen Aroma Diffuser", price: 49.5 },
    { name: "Olive Wood Cutting Board", price: 34.0 },
    { name: "Cozy Weighted Blanket", price: 119.0 },
  ],
  Books: [
    { name: "Atomic Habits (Hardcover)", price: 24.0 },
    { name: "The Pragmatic Programmer", price: 39.99 },
    { name: "Sapiens: A Brief History", price: 22.5 },
    { name: "Deep Work", price: 27.0 },
    { name: "The Lean Startup", price: 26.99 },
  ],
};

export const CUSTOMER_SEGMENTS = ["Consumer", "Corporate", "Home Office"] as const;
export type CustomerSegment = (typeof CUSTOMER_SEGMENTS)[number];

export const PAYMENT_METHODS = ["Credit Card", "PayPal", "Bank Transfer", "Debit Card"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

// Region → base shipping cost
export const REGION_SHIP_BASE: Record<Region, number> = {
  "North America": 12.5,
  Europe: 15.8,
  "Asia Pacific": 18.4,
  "Latin America": 22.1,
  "Middle East & Africa": 28.6,
};

// Category → base margin before discount
export const CATEGORY_MARGIN: Record<Category, number> = {
  Electronics: 0.22,
  Clothing: 0.42,
  "Home & Kitchen": 0.34,
  Books: 0.55,
};

// Segment → discount propensity range
export const SEGMENT_DISCOUNT: Record<CustomerSegment, [number, number]> = {
  Consumer: [0, 15],
  Corporate: [5, 25],
  "Home Office": [0, 20],
};

// Monthly demand weights — Q4 peaks (holiday season)
export const MONTH_WEIGHTS = [0.85, 0.8, 0.9, 0.95, 1.0, 1.05, 1.05, 1.0, 1.1, 1.2, 1.45, 1.65];

export const FIRST_NAMES = [
  "Olivia", "Liam", "Sophia", "Noah", "Emma", "James", "Ava", "Lucas", "Mia", "Ethan",
  "Isabella", "Mason", "Amelia", "Logan", "Harper", "Evelyn", "Henry", "Abigail",
  "Jackson", "Emily", "Daniel", "Ella", "Matthew", "Scarlett", "David", "Victoria",
  "Joseph", "Samuel", "Charlotte", "Nathan",
];

export const LAST_NAMES = [
  "Bennett", "Carter", "Nguyen", "Patel", "Rodriguez", "Mitchell", "Thompson", "Hill",
  "Flores", "Brooks", "Reyes", "Cooper", "Lee", "Walker", "Hall", "Allen", "Young",
  "King", "Wright", "Lopez", "Scott", "Green", "Adams", "Baker", "Nelson", "Carter",
  "Roberts", "Turner", "Phillips", "Parker",
];

// Pick with weights: weights must be array of numbers, returns the chosen item.
export function weightedPick<T>(items: readonly T[], weights: number[]): T {
  const total = weights.reduce((s, w) => s + w, 0);
  let r = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

// Tiny seeded RNG (mulberry32) so seeds are reproducible.
export function makeRng(seed: number) {
  let t = seed >>> 0;
  return function () {
    t = (t + 0x6d2b79f5) | 0;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}
