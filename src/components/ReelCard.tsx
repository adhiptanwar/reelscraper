"use client";

import { useState } from "react";
import type { Reel } from "@/lib/types";
import { formatCompactNumber, formatDuration, formatRelativeDate } from "@/lib/format";
import { proxiedMediaUrl } from "@/lib/media";
import { instagramEmbedUrl } from "@/lib/instagramEmbed";
import { usePlayback } from "./PlaybackContext";
import StatBadge from "./StatBadge";
import {
  ClockIcon,
  CommentIcon,
  EyeIcon,
  HeartIcon,
  PlayIcon,
  TranscriptIcon,
} from "./icons";

export default function ReelCard({ reel, index }: { reel: Reel; index: number }) {
  const { activeId, setActiveId } = usePlayback();
  const [showTranscript, setShowTranscript] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const isActive = activeId === reel.id;
  const canEmbed = Boolean(reel.shortCode);
  // Gating on both isActive and isPlaying means that once a different card
  // becomes active, this one's embed unmounts (stopping playback) even
  // though isPlaying itself is left stale — no effect needed to reset it.
  const showEmbed = isActive && isPlaying && canEmbed;

  function handlePlayClick() {
    setActiveId(reel.id);
    setIsPlaying(true);
  }

  return (
    <article className="glow-border flex flex-col overflow-hidden rounded-2xl bg-surface transition data-[active=true]:glow-border-active" data-active={isActive}>
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
        {showEmbed ? (
          // Instagram's own embed player — fetches live from Instagram, so
          // it keeps working long after the raw scraped video URL expires.
          <iframe
            src={instagramEmbedUrl(reel.shortCode)}
            className="absolute inset-0 h-full w-full border-0"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            title={reel.caption || "Instagram reel"}
          />
        ) : (
          <>
            {reel.displayUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={proxiedMediaUrl(reel.displayUrl)}
                alt={reel.caption || "Reel thumbnail"}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-muted">
                No preview
              </div>
            )}

            {canEmbed && (
              <button
                type="button"
                onClick={handlePlayClick}
                aria-label="Play reel"
                className="absolute inset-0 flex items-center justify-center bg-black/25 transition hover:bg-black/40"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black shadow-lg backdrop-blur">
                  <PlayIcon />
                </span>
              </button>
            )}
          </>
        )}

        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
          #{index + 1}
        </span>

        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
          <ClockIcon />
          {formatDuration(reel.videoDuration)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="line-clamp-2 text-sm text-foreground/90">
          {reel.caption || <span className="text-muted">No caption</span>}
        </p>

        <div className="flex flex-wrap gap-1.5">
          <StatBadge icon={<HeartIcon />} label="Likes" value={formatCompactNumber(reel.likesCount)} />
          <StatBadge
            icon={<CommentIcon />}
            label="Comments"
            value={formatCompactNumber(reel.commentsCount)}
          />
          <StatBadge
            icon={<EyeIcon />}
            label="Views"
            value={formatCompactNumber(reel.videoViewCount)}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-muted">
          <span>@{reel.ownerUsername}</span>
          <span>{formatRelativeDate(reel.timestamp)}</span>
        </div>

        {reel.transcript && (
          <>
            <button
              type="button"
              onClick={() => setShowTranscript((v) => !v)}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 py-2 text-xs font-medium text-muted transition hover:border-accent/50 hover:text-foreground"
            >
              <TranscriptIcon />
              {showTranscript ? "Hide transcript" : "Show transcript"}
            </button>

            {showTranscript && (
              <div className="max-h-40 overflow-y-auto rounded-lg bg-black/40 p-3 text-xs leading-relaxed text-muted">
                {reel.transcript}
              </div>
            )}
          </>
        )}

        <a
          href={reel.url}
          target="_blank"
          rel="noreferrer"
          className="mt-auto text-center text-[11px] text-muted underline decoration-white/20 underline-offset-2 transition hover:text-foreground"
        >
          View on Instagram
        </a>
      </div>
    </article>
  );
}
