/**
 * GET /api/cron/keepalive
 *
 * Permanent Vercel Cron endpoint (configured in `vercel.json` to run daily at 06:00 UTC).
 * Unlike GitHub Actions `schedule`, Vercel Cron never disables due to git repository inactivity.
 *
 * - Pings `events` and `contact_messages` in Supabase so the free-tier database never pauses.
 * - Optionally verifies `Authorization: Bearer <CRON_SECRET>` when `CRON_SECRET` is set in Vercel.
 * - Optionally triggers Supabase Management API auto-restore if `SUPABASE_ACCESS_TOKEN` is set.
 */
import { NextResponse } from "next/server";
import { runSupabaseKeepAlive } from "@/lib/keepalive";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
};

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: NO_STORE_HEADERS },
      );
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: "Supabase env vars not configured" },
      { status: 500, headers: NO_STORE_HEADERS },
    );
  }

  const result = await runSupabaseKeepAlive({
    supabaseUrl,
    supabaseKey,
    managementToken: process.env.SUPABASE_ACCESS_TOKEN,
  });

  return NextResponse.json(result, {
    status: result.ok ? 200 : 503,
    headers: NO_STORE_HEADERS,
  });
}
