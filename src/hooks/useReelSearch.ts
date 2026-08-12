"use client";

import { useCallback, useState } from "react";
import type { Reel, ReelsApiResponse } from "@/lib/types";

type UseReelSearchOptions = {
  onSuccess?: (username: string, reels: Reel[]) => void;
  onAuthRequired?: () => void;
};

export function useReelSearch(options?: UseReelSearchOptions) {
  const { onSuccess, onAuthRequired } = options ?? {};
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
          if (data.code === "AUTH_REQUIRED") {
            onAuthRequired?.();
          } else {
            setError(data.error);
          }
          return;
        }

        setUsername(data.username);
        setReels(data.reels);
        onSuccess?.(data.username, data.reels);
      } catch {
        setError("Couldn't reach the server. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess, onAuthRequired]
  );

  return { isLoading, error, reels, username, search, setReels, setUsername, setError };
}
