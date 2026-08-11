import Link from "next/link";

export default function Header() {
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

        <nav className="hidden items-center gap-6 text-sm text-muted sm:flex">
          <a href="#how-it-works" className="transition hover:text-foreground">
            How it works
          </a>
          <a
            href="https://apify.com/apify/instagram-reel-scraper"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-foreground"
          >
            Powered by Apify
          </a>
        </nav>
      </div>
    </header>
  );
}
