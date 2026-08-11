import { NextRequest, NextResponse } from "next/server";
import { fetchReelsForHandle, UnscrapableAccountError } from "@/lib/apify";
import { normalizeHandle } from "@/lib/format";
import { getMockReels, MOCK_HANDLE } from "@/lib/mockReels";
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

  if (username.toLowerCase() === MOCK_HANDLE) {
    return NextResponse.json<ReelsApiResponse>({
      ok: true,
      username: MOCK_HANDLE,
      reels: getMockReels(),
    });
  }

  try {
    const reels = await fetchReelsForHandle(username);
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
