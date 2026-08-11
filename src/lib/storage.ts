import type { Reel } from "./types";

export type SavedSearch = {
  username: string;
  reels: Reel[];
  savedAt: string;
};

const STORAGE_KEY = "reelscraper:searches";
const MAX_SAVED_SEARCHES = 20;
export const SEARCHES_CHANGED_EVENT = "reelscraper:searches-changed";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function notifyChanged() {
  window.dispatchEvent(new Event(SEARCHES_CHANGED_EVENT));
}

export function getSavedSearches(): SavedSearch[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSearch(username: string, reels: Reel[]): SavedSearch[] {
  if (!isBrowser()) return [];
  const existing = getSavedSearches().filter(
    (s) => s.username.toLowerCase() !== username.toLowerCase()
  );
  const next: SavedSearch[] = [
    { username, reels, savedAt: new Date().toISOString() },
    ...existing,
  ].slice(0, MAX_SAVED_SEARCHES);

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  notifyChanged();
  return next;
}

export function removeSearch(username: string): SavedSearch[] {
  if (!isBrowser()) return [];
  const next = getSavedSearches().filter(
    (s) => s.username.toLowerCase() !== username.toLowerCase()
  );
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  notifyChanged();
  return next;
}

export function updateReelTranscript(
  username: string,
  reelId: string,
  transcript: string
): SavedSearch[] {
  if (!isBrowser()) return [];
  const next = getSavedSearches().map((s) => {
    if (s.username.toLowerCase() !== username.toLowerCase()) return s;
    return {
      ...s,
      reels: s.reels.map((r) => (r.id === reelId ? { ...r, transcript } : r)),
    };
  });
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  notifyChanged();
  return next;
}
