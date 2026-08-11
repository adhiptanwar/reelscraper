"use client";

import { useRouter } from "next/navigation";
import SearchForm from "@/components/SearchForm";
import { useReelSearch } from "@/hooks/useReelSearch";

export default function DashboardHomePage() {
  const router = useRouter();
  const { isLoading, error, search } = useReelSearch((username) => {
    router.push(`/dashboard/${username.toLowerCase()}`);
  });

  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center px-4">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <span className="mb-6 rounded-full border border-white/10 bg-surface px-4 py-1.5 text-xs font-medium text-muted">
          Scrape a new profile
        </span>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Enter a public
          <span className="font-accent text-gradient font-normal not-italic sm:italic">
            {" "}
            Instagram handle.
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm text-muted">
          We&apos;ll pull their last 5 reels with stats and transcripts, and
          save it to your Recents so you can revisit it anytime.
        </p>

        <div className="mt-8 w-full">
          <SearchForm onSearch={search} isLoading={isLoading} />
        </div>

        {error && (
          <div className="mt-4 w-full rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
