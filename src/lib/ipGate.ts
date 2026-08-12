import crypto from "node:crypto";
import type { NextRequest } from "next/server";

// Not a secret — just enough to avoid storing raw client IPs verbatim.
const IP_HASH_SALT = "reelscraper-anon-scrape-gate";

export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

export function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(`${IP_HASH_SALT}:${ip}`).digest("hex");
}
