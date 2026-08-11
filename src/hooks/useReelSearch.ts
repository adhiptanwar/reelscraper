"use client";

import { useCallback, useState } from "react";
import { saveSearch } from "@/lib/storage";
import type { Reel, ReelsApiResponse } from "@/lib/types";

export function useReelSearch(onSaved?: (username: string, reels: Reel[]) => void) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reels, setReels] = useState<Reel[] | null>(null);
  const [username, setUsername] = useState("");

  const search = useCallback(
    async (handle: string) => {
      setIsLoading(true);
      setError(null);
      setReels(null);

      try {
        const res = await fetch("/api/reels", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: handle }),
        });
        const data: ReelsApiResponse = await res.json();

        if (!data.ok) {
          setError(data.error);
          return;
        }

        setUsername(data.username);
        setReels(data.reels);
        saveSearch(data.username, data.reels);
        onSaved?.(data.username, data.reels);
      } catch {
        setError("Couldn't reach the server. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [onSaved]
  );

  return { isLoading, error, reels, username, search, setReels, setUsername, setError };
}
