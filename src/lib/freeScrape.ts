const FREE_SCRAPE_KEY = "reelscraper:freeScrapeUsed";

export function hasUsedFreeScrape(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(FREE_SCRAPE_KEY) === "true";
}

export function markFreeScrapeUsed(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FREE_SCRAPE_KEY, "true");
}
