import { NextRequest, NextResponse } from "next/server";
import { fetchReelsForHandle, UnscrapableAccountError } from "@/lib/apify";
import { normalizeHandle } from "@/lib/format";
import { getClientIp, hashIp } from "@/lib/ipGate";
import { getMockReels, MOCK_HANDLE } from "@/lib/mockReels";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createServerSupabaseClient } from "@/lib/supabase/server";
import type { ReelsApiResponse } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 120;

const HANDLE_PATTERN = /^[a-zA-Z0-9._]{1,30}$/;
const AUTH_REQUIRED_MESSAGE =
  "You've used your free scrape. Sign in or create a free account to keep going.";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json<ReelsApiResponse>(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const rawHandle =
    typeof body === "object" && body !== null && "username" in body
      ? String((body as { username: unknown }).username ?? "")
      : "";

  const username = normalizeHandle(rawHandle);

  if (!username || !HANDLE_PATTERN.test(username)) {
    return NextResponse.json<ReelsApiResponse>(
      { ok: false, error: "Enter a valid public Instagram handle." },
      { status: 400 }
    );
  }

  if (username.toLowerCase() === MOCK_HANDLE) {
    return NextResponse.json<ReelsApiResponse>({
      ok: true,
      username: MOCK_HANDLE,
      reels: getMockReels(),
    });
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const admin = createAdminClient();
  const ipHash = hashIp(getClientIp(req));

  // Anonymous visitors get one free scrape ever, tracked server-side by IP
  // so it can't be bypassed by clearing localStorage or using a private
  // browsing window. Authenticated users are never gated here.
  if (!user) {
    const { data: existing, error: lookupError } = await admin
      .from("anon_scrapes")
      .select("id")
      .eq("ip_hash", ipHash)
      .limit(1)
      .maybeSingle();

    if (lookupError) {
      console.error("Failed to check anon scrape gate", lookupError);
    } else if (existing) {
      return NextResponse.json<ReelsApiResponse>(
        { ok: false, error: AUTH_REQUIRED_MESSAGE, code: "AUTH_REQUIRED" },
        { status: 403 }
      );
    }
  }

  try {
    const reels = await fetchReelsForHandle(username);

    if (!user) {
      const { error: insertError } = await admin.from("anon_scrapes").insert({ ip_hash: ipHash });
      if (insertError) {
        console.error("Failed to record anon scrape", insertError);
      }
    }

    return NextResponse.json<ReelsApiResponse>({ ok: true, username, reels });
  } catch (error) {
    if (error instanceof UnscrapableAccountError) {
      return NextResponse.json<ReelsApiResponse>(
        { ok: false, error: error.message },
        { status: 404 }
      );
    }

    console.error("Failed to fetch reels", error);
    const message =
      error instanceof Error ? error.message : "Something went wrong fetching reels.";
    return NextResponse.json<ReelsApiResponse>({ ok: false, error: message }, { status: 502 });
  }
}
