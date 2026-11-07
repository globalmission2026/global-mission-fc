export type KeepAliveStatus = "active" | "restoring" | "paused" | "restore_failed" | "unhealthy";

export interface KeepAliveOptions {
  supabaseUrl: string;
  supabaseKey: string;
  managementToken?: string;
  fetchFn?: typeof fetch;
}

export interface KeepAliveResult {
  ok: boolean;
  status: KeepAliveStatus;
  eventsStatus: number;
  messagesStatus: number;
  restoreStatus?: number;
  checkedAt: string;
}

const REQUEST_TIMEOUT_MS = 10_000;

export function extractProjectRef(supabaseUrl: string): string | null {
  const match = supabaseUrl.match(/^https?:\/\/([^./]+)\./);
  return match?.[1] ?? null;
}

async function safeStatusFetch(
  fetchFn: typeof fetch,
  url: string,
  init: RequestInit,
): Promise<number> {
  try {
    const response = await fetchFn(url, {
      ...init,
      cache: "no-store",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    return response.status;
  } catch {
    return 0;
  }
}

/**
 * Pings Supabase REST tables (`events` and `contact_messages`) so free-tier
 * projects register active database compute and never hit the 7-day inactivity pause.
 * If the project is already paused (HTTP 540 / 503 / unreachable) and a
 * `SUPABASE_ACCESS_TOKEN` is configured, triggers auto-restore via the Management API.
 */
export async function runSupabaseKeepAlive({
  supabaseUrl,
  supabaseKey,
  managementToken,
  fetchFn = fetch,
}: KeepAliveOptions): Promise<KeepAliveResult> {
  const baseUrl = supabaseUrl.replace(/\/+$/, "");
  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
  };

  const [eventsStatus, messagesStatus] = await Promise.all([
    safeStatusFetch(fetchFn, `${baseUrl}/rest/v1/events?select=id&limit=1`, { headers }),
    safeStatusFetch(fetchFn, `${baseUrl}/rest/v1/contact_messages?select=id&limit=1`, { headers }),
  ]);

  const checkedAt = new Date().toISOString();

  if (eventsStatus >= 200 && eventsStatus < 300) {
    return {
      ok: true,
      status: "active",
      eventsStatus,
      messagesStatus,
      checkedAt,
    };
  }

  const isPausedOrUnreachable = eventsStatus === 540 || eventsStatus === 503 || eventsStatus === 0;

  if (isPausedOrUnreachable) {
    const projectRef = extractProjectRef(baseUrl);
    if (managementToken && projectRef) {
      const restoreStatus = await safeStatusFetch(
        fetchFn,
        `https://api.supabase.com/v1/projects/${projectRef}/restore`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${managementToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (restoreStatus >= 200 && restoreStatus < 300) {
        return {
          ok: true,
          status: "restoring",
          eventsStatus,
          messagesStatus,
          restoreStatus,
          checkedAt,
        };
      }

      return {
        ok: false,
        status: "restore_failed",
        eventsStatus,
        messagesStatus,
        restoreStatus,
        checkedAt,
      };
    }

    return {
      ok: false,
      status: "paused",
      eventsStatus,
      messagesStatus,
      checkedAt,
    };
  }

  return {
    ok: false,
    status: "unhealthy",
    eventsStatus,
    messagesStatus,
    checkedAt,
  };
}
