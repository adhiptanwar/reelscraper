"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const { user, isLoading } = useAuth();

  return (
    <header className="sticky top-4 z-50 mx-auto w-[calc(100%-2rem)] max-w-5xl">
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/60 px-5 py-3 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent-2 to-accent">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="text-base font-bold tracking-tight">
            Reelscraper<span className="text-accent-2">.ai</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 text-sm text-muted sm:flex">
            <Link href="/" className="transition hover:text-foreground">
              Home
            </Link>
          </nav>

          {!isLoading && (
            <Link
              href={user ? "/dashboard" : "/login"}
              className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              {user ? "Dashboard" : "Get Started"}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
