import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

// Only Instagram/Facebook's own CDN hosts may be proxied — this route must
// never become an open proxy for arbitrary URLs (SSRF risk).
const ALLOWED_HOST_SUFFIXES = ["cdninstagram.com", "fbcdn.net"];

function isAllowedHost(hostname: string): boolean {
  return ALLOWED_HOST_SUFFIXES.some(
    (suffix) => hostname === suffix || hostname.endsWith(`.${suffix}`)
  );
}

export async function GET(req: NextRequest) {
  const targetUrl = req.nextUrl.searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json({ error: "Missing url parameter." }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(targetUrl);
  } catch {
    return NextResponse.json({ error: "Invalid url." }, { status: 400 });
  }

  if (parsed.protocol !== "https:" || !isAllowedHost(parsed.hostname)) {
    return NextResponse.json({ error: "URL host is not allowed." }, { status: 400 });
  }

  const range = req.headers.get("range");

  let upstream: Response;
  try {
    upstream = await fetch(parsed.toString(), {
      headers: range ? { range } : undefined,
    });
  } catch {
    return NextResponse.json({ error: "Failed to reach upstream media host." }, { status: 502 });
  }

  if (!upstream.ok && upstream.status !== 206) {
    return NextResponse.json(
      { error: `Upstream responded with ${upstream.status}.` },
      { status: 502 }
    );
  }

  const headers = new Headers();
  const passthroughHeaders = [
    "content-type",
    "content-length",
    "content-range",
    "accept-ranges",
  ];
  for (const key of passthroughHeaders) {
    const value = upstream.headers.get(key);
    if (value) headers.set(key, value);
  }
  headers.set("cache-control", "public, max-age=3600, immutable");

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers,
  });
}
