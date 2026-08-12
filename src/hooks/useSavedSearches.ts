"use client";

import { useEffect, useState } from "react";
import { getSavedSearches, SEARCHES_CHANGED_EVENT, type SavedSearch } from "@/lib/searches";

export function useSavedSearches(): { searches: SavedSearch[]; isLoaded: boolean } {
  const [searches, setSearches] = useState<SavedSearch[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      const next = await getSavedSearches();
      if (cancelled) return;
      setSearches(next);
      setIsLoaded(true);
    }

    refresh();
    window.addEventListener(SEARCHES_CHANGED_EVENT, refresh);
    return () => {
      cancelled = true;
      window.removeEventListener(SEARCHES_CHANGED_EVENT, refresh);
    };
  }, []);

  return { searches, isLoaded };
}
