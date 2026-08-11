"use client";

import { useEffect, useState } from "react";
import { getSavedSearches, SEARCHES_CHANGED_EVENT, type SavedSearch } from "@/lib/storage";

export function useSavedSearches(): { searches: SavedSearch[]; isLoaded: boolean } {
  const [searches, setSearches] = useState<SavedSearch[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    function refresh() {
      setSearches(getSavedSearches());
      setIsLoaded(true);
    }
    refresh();
    window.addEventListener(SEARCHES_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(SEARCHES_CHANGED_EVENT, refresh);
  }, []);

  return { searches, isLoaded };
}
