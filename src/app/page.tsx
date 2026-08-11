"use client";

import { useCallback, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SearchForm from "@/components/SearchForm";
import ReelGrid from "@/components/ReelGrid";
import ReelGridSkeleton from "@/components/ReelGridSkeleton";
import ErrorMessage from "@/components/ErrorMessage";
import Footer from "@/components/Footer";
import type { Reel, ReelsApiResponse } from "@/lib/types";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reels, setReels] = useState<Reel[] | null>(null);
  const [username, setUsername] = useState("");

  const handleSearch = useCallback(async (handle: string) => {
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
    } catch {
      setError("Couldn't reach the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero>
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </Hero>

        {isLoading && <ReelGridSkeleton />}
        {!isLoading && error && <ErrorMessage message={error} />}
        {!isLoading && !error && reels && <ReelGrid reels={reels} username={username} />}
      </main>
      <Footer />
    </>
  );
}
