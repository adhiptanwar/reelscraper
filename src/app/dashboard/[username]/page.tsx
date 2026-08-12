"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import CompactReelRow from "@/components/dashboard/CompactReelRow";
import TranscriptTable from "@/components/dashboard/TranscriptTable";
import { RefreshIcon } from "@/components/icons";
import { useReelSearch } from "@/hooks/useReelSearch";
import { useSavedSearches } from "@/hooks/useSavedSearches";
import { formatRelativeDate } from "@/lib/format";
import { saveSearch } from "@/lib/searches";

export default function DashboardUserPage() {
  const params = useParams<{ username: string }>();
  const routeUsername = decodeURIComponent(params.username ?? "");
  const { searches, isLoaded } = useSavedSearches();
  const { isLoading, error, search } = useReelSearch({
    onSuccess: (username, reels) => saveSearch(username, reels),
  });

  const active = searches.find(
    (s) => s.username.toLowerCase() === routeUsername.toLowerCase()
  );

  if (isLoaded && !active && !isLoading) {
    return (
      <div className="flex h-full min-h-screen flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-sm font-medium">No saved scrape for @{routeUsername}</p>
        <p className="max-w-xs text-xs text-muted">
          This profile hasn&apos;t been scraped yet, or was removed from your Recents.
        </p>
        <Link
          href="/dashboard"
          className="mt-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-white/90"
        >
          Scrape a profile
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8">
      {isLoading && (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-white/10 bg-surface text-sm text-muted">
          Scraping reels…
        </div>
      )}

      {!isLoading && error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.06] px-5 py-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {!isLoading && !error && active && (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">
                @<span className="text-accent-2">{active.username}</span>
              </h1>
              <p className="text-xs text-muted">
                Scraped {formatRelativeDate(active.savedAt)} · {active.reels.length} reels
              </p>
            </div>
            <button
              type="button"
              onClick={() => search(active.username)}
              className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-muted transition hover:border-accent/50 hover:text-foreground"
            >
              <RefreshIcon />
              Re-scrape
            </button>
          </div>

          <CompactReelRow reels={active.reels} />

          <div>
            <h2 className="mb-3 text-sm font-semibold text-foreground/90">
              Stats &amp; transcripts
            </h2>
            <TranscriptTable reels={active.reels} />
          </div>
        </>
      )}
    </div>
  );
}
