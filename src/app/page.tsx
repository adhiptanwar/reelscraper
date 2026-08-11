"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SearchForm from "@/components/SearchForm";
import ReelGrid from "@/components/ReelGrid";
import ReelGridSkeleton from "@/components/ReelGridSkeleton";
import ErrorMessage from "@/components/ErrorMessage";
import Footer from "@/components/Footer";
import { useReelSearch } from "@/hooks/useReelSearch";

export default function Home() {
  const { isLoading, error, reels, username, search } = useReelSearch();

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
    </>
  );
}
