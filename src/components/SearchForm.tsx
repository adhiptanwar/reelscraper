"use client";

import { FormEvent, useState } from "react";

type SearchFormProps = {
  onSearch: (handle: string) => void;
  isLoading: boolean;
};

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSearch(trimmed);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row"
    >
      <div className="flex flex-1 items-center gap-2 rounded-full border border-white/10 bg-surface px-5 py-3.5 transition focus-within:border-accent/60 focus-within:shadow-[0_0_0_1px_rgba(139,92,246,0.55),0_0_24px_rgba(139,92,246,0.2)]">
        <span className="text-muted">@</span>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="instagram_handle"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        className="whitespace-nowrap rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Scraping…" : "Get reels"}
      </button>
    </form>
  );
}
