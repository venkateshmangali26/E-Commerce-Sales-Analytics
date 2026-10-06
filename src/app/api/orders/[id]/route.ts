/**
 * GET /api/orders/[id]
 *   Returns a single order by its primary key (id).
 *
 * DELETE /api/orders/[id]
 *   Deletes an order by id.
 *
 * PATCH /api/orders/[id]
 *   Updates an existing order. Accepts any subset of the writable fields.
 */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const order = await db.order.findUnique({ where: { id } });
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  return NextResponse.json(order);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await db.order.delete({ where: { id } });
    return NextResponse.json({ ok: true, id });
  } catch {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Map API fields → Prisma fields, ignoring unknown keys.
  const allowed: Record<string, string> = {
    orderDate: "orderDate",
    customerName: "customerName",
    customerSegment: "customerSegment",
    country: "country",
    region: "region",
    productCategory: "productCategory",
    productName: "productName",
    quantity: "quantity",
    unitPrice: "unitPrice",
    discountPercent: "discountPercent",
    shippingCost: "shippingCost",
    totalSales: "totalSales",
    profit: "profit",
    paymentMethod: "paymentMethod",
  };
  const data: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(body)) {
    if (allowed[k]) {
      if (k === "orderDate") data[allowed[k]] = new Date(v as string);
      else data[allowed[k]] = v;
    }
  }

  try {
    const updated = await db.order.update({ where: { id }, data });
    return NextResponse.json({ ok: true, id: updated.id });
  } catch {
    return NextResponse.json({ error: "Order not found or update failed" }, { status: 404 });
  }
}
