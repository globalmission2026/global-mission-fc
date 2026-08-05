/**
 * GET /api/events-health
 *
 * Diagnostic endpoint (dev-only) to check the events table state:
 * - Total event count
 * - Upcoming event count (start_date >= now)
 * - The 5 most recent events with their dates
 *
 * This helps diagnose why no events show on the homepage.
 * Protected in production by checking NODE_ENV or a secret header.
 */
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function GET(request: Request) {
  // Restrict in production unless the caller passes the upload API key
  const isProduction = process.env.NODE_ENV === "production";
  if (isProduction) {
    const apiKey = request.headers.get("x-api-key");
    if (apiKey !== process.env.UPLOAD_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !serviceKey) {
    return NextResponse.json({ error: "Supabase env vars not configured" }, { status: 500 });
  }

  // Use service role so RLS does not filter results
  const admin = createClient(url, serviceKey);

  const now = new Date().toISOString();

  const [totalRes, upcomingRes, samplesRes] = await Promise.all([
    admin.from("events").select("id", { count: "exact", head: true }),
    admin.from("events").select("id", { count: "exact", head: true }).gte("start_date", now),
    admin
      .from("events")
      .select("id, title, start_date, slug")
      .order("start_date", { ascending: false })
      .limit(5),
  ]);

  return NextResponse.json({
    serverNow: now,
    total: totalRes.count ?? 0,
    totalError: totalRes.error?.message ?? null,
    upcoming: upcomingRes.count ?? 0,
    upcomingError: upcomingRes.error?.message ?? null,
    latestSamples: samplesRes.data ?? [],
    samplesError: samplesRes.error?.message ?? null,
  });
}
