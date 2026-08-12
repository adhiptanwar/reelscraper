"use client";

import { createClient } from "./supabase/client";
import type { Reel } from "./types";

export type SavedSearch = {
  username: string;
  reels: Reel[];
  savedAt: string;
};

export const SEARCHES_CHANGED_EVENT = "reelscraper:searches-changed";

function notifyChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(SEARCHES_CHANGED_EVENT));
  }
}

function normalizeUsername(username: string): string {
  return username.toLowerCase();
}

export async function getSavedSearches(): Promise<SavedSearch[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("searches")
    .select("username, reels, updated_at")
    .order("updated_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    username: row.username as string,
    reels: row.reels as Reel[],
    savedAt: row.updated_at as string,
  }));
}

export async function saveSearch(username: string, reels: Reel[]): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase.from("searches").upsert(
    {
      user_id: user.id,
      username: normalizeUsername(username),
      reels,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,username" }
  );

  if (error) {
    console.error("Failed to save search", error);
    return;
  }

  notifyChanged();
}

export async function removeSearch(username: string): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase
    .from("searches")
    .delete()
    .eq("user_id", user.id)
    .eq("username", normalizeUsername(username));

  if (error) {
    console.error("Failed to remove search", error);
    return;
  }

  notifyChanged();
}

export async function updateReelTranscript(
  username: string,
  reelId: string,
  transcript: string
): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const normalized = normalizeUsername(username);

  const { data: row, error: selectError } = await supabase
    .from("searches")
    .select("reels")
    .eq("user_id", user.id)
    .eq("username", normalized)
    .maybeSingle();

  if (selectError || !row) {
    console.error("Failed to load search for transcript update", selectError);
    return;
  }

  const nextReels = (row.reels as Reel[]).map((r) =>
    r.id === reelId ? { ...r, transcript } : r
  );

  const { error: updateError } = await supabase
    .from("searches")
    .update({ reels: nextReels })
    .eq("user_id", user.id)
    .eq("username", normalized);

  if (updateError) {
    console.error("Failed to update transcript", updateError);
    return;
  }

  notifyChanged();
}
