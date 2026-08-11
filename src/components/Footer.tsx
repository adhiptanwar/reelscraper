export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 px-4 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-muted sm:flex-row">
        <span>© {new Date().getFullYear()} Reelscraper.ai</span>
        <span>Built for public Instagram reels only. Not affiliated with Meta.</span>
      </div>
    </footer>
  );
}
