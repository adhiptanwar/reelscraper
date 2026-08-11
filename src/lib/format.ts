export function formatCompactNumber(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatDuration(seconds: number | null | undefined): string {
  if (!seconds || Number.isNaN(seconds)) return "0:00";
  const total = Math.round(seconds);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function formatRelativeDate(timestamp: string | null | undefined): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "";
  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return "today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 30) return `${diffDays} days ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears}y ago`;
}

export function normalizeHandle(input: string): string {
  let handle = input.trim();
  handle = handle.replace(/^https?:\/\/(www\.)?instagram\.com\//i, "");
  handle = handle.replace(/^@/, "");
  handle = handle.split("/")[0].split("?")[0];
  return handle;
}
