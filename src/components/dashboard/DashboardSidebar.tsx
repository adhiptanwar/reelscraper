"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSavedSearches } from "@/hooks/useSavedSearches";
import { removeSearch } from "@/lib/storage";
import { DashboardIcon, ExternalLinkIcon, TrashIcon } from "@/components/icons";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { searches } = useSavedSearches();

  function handleRemove(e: React.MouseEvent, username: string) {
    e.preventDefault();
    e.stopPropagation();
    removeSearch(username);
    if (pathname === `/dashboard/${username.toLowerCase()}`) {
      router.push("/dashboard");
    }
  }

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-surface">
      <div className="flex items-center gap-2 px-5 py-5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent-2 to-accent">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="text-sm font-bold tracking-tight">
          Reelscraper<span className="text-accent-2">.ai</span>
        </span>
      </div>

      <nav className="px-3">
        <Link
          href="/dashboard"
          className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
            pathname === "/dashboard"
              ? "bg-accent-soft text-accent-2"
              : "text-muted hover:bg-white/[0.04] hover:text-foreground"
          }`}
        >
          <DashboardIcon />
          Dashboard
        </Link>
      </nav>

      <div className="mt-6 flex min-h-0 flex-1 flex-col px-3">
        <h2 className="px-3 text-xs font-semibold uppercase tracking-wide text-muted">
          Recents
        </h2>

        <div className="mt-1 flex flex-1 flex-col gap-0.5 overflow-y-auto pb-3">
          {searches.length === 0 && (
            <p className="px-3 py-3 text-xs leading-relaxed text-muted">
              Your scraped profiles will show up here.
            </p>
          )}

          {searches.map((s) => {
            const href = `/dashboard/${s.username.toLowerCase()}`;
            const isActive = pathname === href;
            return (
              <Link
                key={s.username}
                href={href}
                className={`group flex items-center gap-1 rounded-lg px-3 py-2 text-left transition ${
                  isActive ? "bg-accent-soft" : "hover:bg-white/[0.04]"
                }`}
              >
                <span
                  className={`min-w-0 flex-1 truncate text-sm ${
                    isActive ? "font-medium text-accent-2" : "text-foreground/85"
                  }`}
                >
                  @{s.username}
                </span>
                <button
                  type="button"
                  onClick={(e) => handleRemove(e, s.username)}
                  aria-label={`Remove @${s.username}`}
                  className="shrink-0 rounded-md p-1.5 text-muted opacity-0 transition hover:bg-white/10 hover:text-red-300 group-hover:opacity-100"
                >
                  <TrashIcon />
                </button>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="border-t border-white/10 px-3 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted transition hover:bg-white/[0.04] hover:text-foreground"
        >
          <ExternalLinkIcon />
          Back to site
        </Link>
      </div>
    </aside>
  );
}
