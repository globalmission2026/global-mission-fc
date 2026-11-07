import { describe, it, expect, vi, afterEach } from "vitest";
import { extractProjectRef, runSupabaseKeepAlive } from "../keepalive";
import { GET } from "@/app/api/cron/keepalive/route";

describe("extractProjectRef", () => {
  it("extracts project ref from standard Supabase URL", () => {
    expect(extractProjectRef("https://abcdefghijklm.supabase.co")).toBe("abcdefghijklm");
  });

  it("returns null for invalid URLs", () => {
    expect(extractProjectRef("http://localhost:54321")).toBeNull();
  });
});

describe("runSupabaseKeepAlive", () => {
  it("returns active when events query succeeds", async () => {
    const fetchFn = vi.fn(async () => new Response("[]", { status: 200 }));

    const result = await runSupabaseKeepAlive({
      supabaseUrl: "https://proj123.supabase.co/",
      supabaseKey: "anon-key",
      fetchFn,
    });

    expect(result.ok).toBe(true);
    expect(result.status).toBe("active");
    expect(result.eventsStatus).toBe(200);
    expect(result.messagesStatus).toBe(200);
    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  it("triggers Management API auto-restore when database is paused (540) and token is set", async () => {
    const fetchFn = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("api.supabase.com")) {
        return new Response("{}", { status: 201 });
      }
      return new Response("Paused", { status: 540 });
    });

    const result = await runSupabaseKeepAlive({
      supabaseUrl: "https://proj123.supabase.co",
      supabaseKey: "anon-key",
      managementToken: "sbp_secret_token",
      fetchFn,
    });

    expect(result.ok).toBe(true);
    expect(result.status).toBe("restoring");
    expect(result.restoreStatus).toBe(201);
    expect(fetchFn).toHaveBeenCalledTimes(3);
  });

  it("returns paused when database is paused (540) and no management token is configured", async () => {
    const fetchFn = vi.fn(async () => new Response("Paused", { status: 540 }));

    const result = await runSupabaseKeepAlive({
      supabaseUrl: "https://proj123.supabase.co",
      supabaseKey: "anon-key",
      fetchFn,
    });

    expect(result.ok).toBe(false);
    expect(result.status).toBe("paused");
    expect(result.eventsStatus).toBe(540);
  });

  it("handles network fetch errors gracefully without throwing", async () => {
    const fetchFn = vi.fn(async () => {
      throw new Error("ECONNREFUSED");
    });

    const result = await runSupabaseKeepAlive({
      supabaseUrl: "https://proj123.supabase.co",
      supabaseKey: "anon-key",
      fetchFn,
    });

    expect(result.ok).toBe(false);
    expect(result.status).toBe("paused");
    expect(result.eventsStatus).toBe(0);
  });

  it("returns unhealthy on unexpected HTTP errors (e.g. 401)", async () => {
    const fetchFn = vi.fn(async () => new Response("Invalid key", { status: 401 }));

    const result = await runSupabaseKeepAlive({
      supabaseUrl: "https://proj123.supabase.co",
      supabaseKey: "bad-key",
      fetchFn,
    });

    expect(result.ok).toBe(false);
    expect(result.status).toBe("unhealthy");
    expect(result.eventsStatus).toBe(401);
  });
});

describe("GET /api/cron/keepalive", () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.restoreAllMocks();
  });

  it("enforces CRON_SECRET when configured", async () => {
    process.env.CRON_SECRET = "top-secret";
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://proj123.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key";

    const unauthorizedRes = await GET(new Request("http://localhost/api/cron/keepalive"));
    expect(unauthorizedRes.status).toBe(401);

    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("[]", { status: 200 }));
    const authorizedRes = await GET(
      new Request("http://localhost/api/cron/keepalive", {
        headers: { authorization: "Bearer top-secret" },
      }),
    );
    expect(authorizedRes.status).toBe(200);
  });

  it("returns 500 when Supabase env vars are missing", async () => {
    delete process.env.CRON_SECRET;
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;

    const res = await GET(new Request("http://localhost/api/cron/keepalive"));
    expect(res.status).toBe(500);
  });
});
