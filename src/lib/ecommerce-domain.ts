/**
 * Shared e-commerce domain constants and types.
 * Used by both the seed script and the API layer so the schema stays in sync.
 */

export const REGIONS = [
  "South India",
  "West India",
  "North India",
  "East India",
  "Central & North East",
] as const;
export type Region = (typeof REGIONS)[number];

export const COUNTRIES: Record<Region, string[]> = {
  "South India": ["Karnataka", "Tamil Nadu", "Telangana", "Kerala", "Andhra Pradesh"],
  "West India": ["Maharashtra", "Gujarat", "Madhya Pradesh", "Goa"],
  "North India": ["Delhi NCR", "Uttar Pradesh", "Punjab", "Haryana", "Rajasthan", "Chandigarh"],
  "East India": ["West Bengal", "Odisha", "Bihar", "Jharkhand"],
  "Central & North East": ["Assam", "Chhattisgarh", "Uttarakhand"],
};

export const CATEGORIES = ["Electronics", "Clothing", "Home & Kitchen", "Books"] as const;
export type Category = (typeof CATEGORIES)[number];

export const PRODUCTS: Record<Category, { name: string; price: number }[]> = {
  Electronics: [
    { name: "boAt Airdopes Pro True Wireless", price: 2499.0 },
    { name: "Noise ColorFit Pulse Smartwatch", price: 3499.0 },
    { name: "OnePlus Nord Wireless Buds", price: 2999.0 },
    { name: "Fire-Boltt Stainless Smartwatch", price: 4999.0 },
    { name: "Mi Smart LED Desk Lamp 1S", price: 1899.0 },
    { name: "realme Pad Mini 8.7 Tablet", price: 11999.0 },
    { name: "Portronics SoundDrum Bluetooth Speaker", price: 1699.0 },
  ],
  Clothing: [
    { name: "FabIndia Handblock Cotton Kurta", price: 1899.0 },
    { name: "Roadster Casual Denim Jacket", price: 2499.0 },
    { name: "Wildcraft Trekking Rucksack 45L", price: 3299.0 },
    { name: "HRX Performance Running Shoes", price: 2199.0 },
    { name: "W for Woman Festive Anarkali Kurta", price: 2899.0 },
    { name: "Bombay Dyeing Linen Casual Shirt", price: 1499.0 },
    { name: "Cultsport Active Yoga Leggings", price: 1299.0 },
  ],
  "Home & Kitchen": [
    { name: "Prestige Deluxe Induction Cookware Set", price: 3499.0 },
    { name: "Milton Thermosteel Insulated Bottle", price: 899.0 },
    { name: "Wakefit Orthopedic Memory Foam Pillow", price: 1299.0 },
    { name: "Philips Ultrasonic Aroma Diffuser", price: 1599.0 },
    { name: "Borosil Glass Storage Container Set", price: 1199.0 },
    { name: "Spaces Ultra Soft Microfiber Blanket", price: 2299.0 },
  ],
  Books: [
    { name: "Atomic Habits (Hardcover)", price: 499.0 },
    { name: "The Psychology of Money", price: 399.0 },
    { name: "Sapiens: A Brief History", price: 550.0 },
    { name: "Wings of Fire: APJ Abdul Kalam", price: 350.0 },
    { name: "The Immortals of Meluha", price: 399.0 },
    { name: "Rich Dad Poor Dad", price: 425.0 },
    { name: "The Lean Startup", price: 599.0 },
  ],
};

export const CUSTOMER_SEGMENTS = ["Consumer", "Corporate", "Home Office"] as const;
export type CustomerSegment = (typeof CUSTOMER_SEGMENTS)[number];

export const PAYMENT_METHODS = ["UPI", "Credit Card", "Net Banking", "Debit Card", "Cash on Delivery"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

// Region → base shipping cost (in INR ₹)
export const REGION_SHIP_BASE: Record<Region, number> = {
  "South India": 60,
  "West India": 70,
  "North India": 75,
  "East India": 90,
  "Central & North East": 125,
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

// Monthly demand weights — Indian festive peaks (Diwali, Navratri, Republic Day, Independence Day)
export const MONTH_WEIGHTS = [1.15, 0.90, 0.95, 0.90, 1.00, 0.95, 1.05, 1.25, 1.45, 1.85, 1.60, 1.30];

export const FIRST_NAMES = [
  "Aarav", "Vihaan", "Vivaan", "Ananya", "Diya", "Advik", "Kabir", "Ishaan", "Sai", "Arjun",
  "Reyansh", "Aryan", "Aditi", "Anaya", "Sanvi", "Mira", "Riya", "Priya", "Rohan", "Rahul",
  "Vikram", "Pooja", "Sneha", "Neha", "Amit", "Rajesh", "Sunita", "Suresh", "Manoj", "Deepika",
  "Lakshmi", "Karthik", "Venkatesh", "Harish", "Sanjay", "Anjali",
];

export const LAST_NAMES = [
  "Sharma", "Verma", "Gupta", "Patel", "Reddy", "Kumar", "Singh", "Iyer", "Nair", "Rao",
  "Joshi", "Kulkarni", "Mehta", "Shah", "Das", "Mukherjee", "Chatterjee", "Banerjee", "Bose",
  "Agarwal", "Mishra", "Bhat", "Pillai", "Deshmukh", "Patil", "Chawla", "Malhotra", "Kapoor",
  "Nambiar", "Hegde",
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
