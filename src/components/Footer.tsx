export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-background px-4 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-center text-xs text-muted">
        <span>© {new Date().getFullYear()} Reelscraper.ai</span>
      </div>
    </footer>
  );
}
