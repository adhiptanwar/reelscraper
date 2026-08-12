"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SearchForm from "@/components/SearchForm";
import ReelGrid from "@/components/ReelGrid";
import ReelGridSkeleton from "@/components/ReelGridSkeleton";
import ErrorMessage from "@/components/ErrorMessage";
import Footer from "@/components/Footer";
import AuthGateModal from "@/components/AuthGateModal";
import { useAuth } from "@/hooks/useAuth";
import { useReelSearch } from "@/hooks/useReelSearch";
import { saveSearch } from "@/lib/searches";

export default function Home() {
  const { user } = useAuth();
  const [showAuthGate, setShowAuthGate] = useState(false);
  const { isLoading, error, reels, username, search } = useReelSearch({
    onAuthRequired: () => setShowAuthGate(true),
    onSuccess: (u, r) => {
      if (user) saveSearch(u, r);
    },
  });

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero>
          <SearchForm onSearch={search} isLoading={isLoading} />
        </Hero>

        {isLoading && <ReelGridSkeleton />}
        {!isLoading && error && <ErrorMessage message={error} />}
        {!isLoading && !error && reels && <ReelGrid reels={reels} username={username} />}
      </main>
      <Footer />

      {showAuthGate && <AuthGateModal onClose={() => setShowAuthGate(false)} />}
    </>
  );
}
