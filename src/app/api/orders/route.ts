/**
 * GET /api/orders
 *   Search/filter/paginate the orders table.
 *   Query params:
 *     search   — substring match against id, customerName, productName, country
 *     category — Product_Category filter (one of the 4 categories)
 *     region   — Region filter
 *     payment  — Payment_Method filter
 *     segment  — Customer_Segment filter
 *     limit    — page size (default 25, max 100)
 *     offset   — pagination offset (default 0)
 *
 * POST /api/orders
 *   Create a new order. Required fields: orderDate (ISO), customerName,
 *   customerSegment, country, region, productCategory, productName, quantity,
 *   unitPrice, discountPercent, shippingCost, totalSales, profit, paymentMethod.
 *   The `id` is auto-generated if not provided.
 */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getRecentOrders } from "@/lib/analytics";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(parseInt(searchParams.get("limit") || "25", 10) || 25, 100);
  const offset = Math.max(parseInt(searchParams.get("offset") || "0", 10) || 0, 0);

  const result = await getRecentOrders({
    search: searchParams.get("search") || undefined,
    category: searchParams.get("category") || undefined,
    region: searchParams.get("region") || undefined,
    payment: searchParams.get("payment") || undefined,
    segment: searchParams.get("segment") || undefined,
    limit,
    offset,
  });

  return NextResponse.json(result);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const required = [
    "orderDate", "customerName", "customerSegment", "country", "region",
    "productCategory", "productName", "quantity", "unitPrice",
    "discountPercent", "shippingCost", "totalSales", "profit", "paymentMethod",
  ];
  for (const f of required) {
    if (body[f] === undefined || body[f] === null) {
      return NextResponse.json({ error: `Missing field: ${f}` }, { status: 422 });
    }
  }

  // Auto-generate id: ORD-<timestamp>-<random>
  const id = (body.id as string) || `ORD-${Date.now()}-${Math.floor(Math.random() * 1e4)}`;

  const created = await db.order.create({
    data: {
      id,
      orderDate: new Date(body.orderDate as string),
      customerName: String(body.customerName),
      customerSegment: String(body.customerSegment),
      country: String(body.country),
      region: String(body.region),
      productCategory: String(body.productCategory),
      productName: String(body.productName),
      quantity: Number(body.quantity),
      unitPrice: Number(body.unitPrice),
      discountPercent: Number(body.discountPercent),
      shippingCost: Number(body.shippingCost),
      totalSales: Number(body.totalSales),
      profit: Number(body.profit),
      paymentMethod: String(body.paymentMethod),
    },
  });

  return NextResponse.json({ ok: true, id: created.id }, { status: 201 });
}
