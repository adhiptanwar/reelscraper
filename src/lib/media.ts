// Instagram's CDN URLs are frequently bound to the IP/session that first
// fetched them (Apify's servers), so hotlinking them directly from a
// visitor's browser fails unpredictably. Routing through our own server
// (/api/media) makes every request come from one consistent, first-party
// fetch instead.
export function proxiedMediaUrl(url: string | null | undefined): string {
  if (!url) return "";
  // data: URIs (used by mock/test data) and same-origin paths need no proxying.
  if (!url.startsWith("http://") && !url.startsWith("https://")) return url;
  return `/api/media?url=${encodeURIComponent(url)}`;
}
