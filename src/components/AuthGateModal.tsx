"use client";

import Link from "next/link";
import { CloseIcon } from "./icons";

export default function AuthGateModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-surface p-6 text-center glow-border-active"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-full p-1.5 text-muted transition hover:bg-white/10 hover:text-foreground"
        >
          <CloseIcon />
        </button>

        <h2 className="text-lg font-bold">You&apos;ve used your free scrape</h2>
        <p className="mt-2 text-sm text-muted">
          Create a free account to keep scraping reels, save your history, and
          revisit past results anytime.
        </p>

        <div className="mt-5 flex flex-col gap-2">
          <Link
            href="/login"
            className="rounded-full bg-white py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Sign up free
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-white/10 py-2.5 text-sm text-muted transition hover:text-foreground"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
