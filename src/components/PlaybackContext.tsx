"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type PlaybackContextValue = {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
};

const PlaybackContext = createContext<PlaybackContextValue | null>(null);

export function PlaybackProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  return (
    <PlaybackContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </PlaybackContext.Provider>
  );
}

export function usePlayback(): PlaybackContextValue {
  const ctx = useContext(PlaybackContext);
  if (!ctx) {
    throw new Error("usePlayback must be used within a PlaybackProvider");
  }
  return ctx;
}
