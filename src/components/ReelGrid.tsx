import type { Reel } from "@/lib/types";
import { PlaybackProvider } from "./PlaybackContext";
import ReelCard from "./ReelCard";

export default function ReelGrid({ reels, username }: { reels: Reel[]; username: string }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-24">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-lg font-semibold">
          Latest reels from <span className="text-accent-2">@{username}</span>
        </h2>
        <span className="text-xs text-muted">{reels.length} reels</span>
      </div>

      <PlaybackProvider>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {reels.map((reel, i) => (
            <ReelCard key={reel.id} reel={reel} index={i} />
          ))}
        </div>
      </PlaybackProvider>
    </section>
  );
}
