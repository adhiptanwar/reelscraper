import type { Reel } from "@/lib/types";
import { formatDuration } from "@/lib/format";
import { proxiedMediaUrl } from "@/lib/media";
import { ClockIcon, PlayIcon } from "@/components/icons";

export default function ReelThumb({
  reel,
  index,
  onExpand,
}: {
  reel: Reel;
  index: number;
  onExpand: (reel: Reel) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onExpand(reel)}
      className="group relative aspect-[9/16] w-full max-w-[150px] shrink-0 overflow-hidden rounded-xl bg-black glow-border transition hover:glow-border-active"
    >
      {reel.displayUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={proxiedMediaUrl(reel.displayUrl)}
          alt={reel.caption || "Reel thumbnail"}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs text-muted">
          No preview
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition group-hover:opacity-100">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black">
          <PlayIcon className="h-4 w-4" />
        </span>
      </div>

      <span className="absolute left-1.5 top-1.5 rounded-full bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur">
        #{index + 1}
      </span>
      <span className="absolute right-1.5 top-1.5 flex items-center gap-1 rounded-full bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur">
        <ClockIcon className="h-2.5 w-2.5" />
        {formatDuration(reel.videoDuration)}
      </span>
    </button>
  );
}
