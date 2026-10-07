/**
 * GET /api/health
 * Returns basic service health and order count, useful for sanity checks.
 */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const orderCount = await db.order.count();
  const lastOrder = await db.order.findFirst({ orderBy: { orderDate: "desc" } });
  return NextResponse.json({
    ok: true,
    db: "sqlite",
    orders: orderCount,
    latest_order_date: lastOrder?.orderDate?.toISOString() ?? null,
    timestamp: new Date().toISOString(),
  });
}
