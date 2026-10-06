/**
 * GET /api/analytics
 * Returns all aggregated datasets needed by the dashboard in a single payload.
 *
 * Optional query:
 *   ?refresh=1   — bypass the in-memory cache
 */
import { NextResponse } from "next/server";
import { getAnalytics } from "@/lib/analytics";

// Simple in-memory cache (TTL = 60s). Avoids recomputing aggregates on every
// request when the underlying data hasn't changed.
let cache: { ts: number; data: Awaited<ReturnType<typeof getAnalytics>> } | null = null;
const TTL_MS = 60_000;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const refresh = searchParams.get("refresh") === "1";

  if (!refresh && cache && Date.now() - cache.ts < TTL_MS) {
    return NextResponse.json({
      cached: true,
      generated_at: new Date(cache.ts).toISOString(),
      data: cache.data,
    });
  }

  const data = await getAnalytics();
  cache = { ts: Date.now(), data };

  return NextResponse.json({
    cached: false,
    generated_at: new Date().toISOString(),
    data,
  });
}
