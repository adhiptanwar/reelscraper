import { NextRequest, NextResponse } from "next/server";
import { fetchReelsForHandle } from "@/lib/apify";
import { normalizeHandle } from "@/lib/format";
import type { ReelsApiResponse } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 120;

const HANDLE_PATTERN = /^[a-zA-Z0-9._]{1,30}$/;

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

  try {
    const reels = await fetchReelsForHandle(username);

    if (reels.length === 0) {
      return NextResponse.json<ReelsApiResponse>(
        {
          ok: false,
          error: `No reels found for @${username}. The account may be private or have no reels.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json<ReelsApiResponse>({ ok: true, username, reels });
  } catch (error) {
    console.error("Failed to fetch reels", error);
    const message =
      error instanceof Error ? error.message : "Something went wrong fetching reels.";
    return NextResponse.json<ReelsApiResponse>({ ok: false, error: message }, { status: 502 });
  }
}
