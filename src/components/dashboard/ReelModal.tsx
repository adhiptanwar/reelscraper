"use client";

import { useEffect } from "react";
import type { Reel } from "@/lib/types";
import { formatCompactNumber, formatRelativeDate } from "@/lib/format";
import { proxiedMediaUrl } from "@/lib/media";
import StatBadge from "@/components/StatBadge";
import { CloseIcon, CommentIcon, EyeIcon, HeartIcon, ShareIcon } from "@/components/icons";

export default function ReelModal({ reel, onClose }: { reel: Reel; onClose: () => void }) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-surface glow-border-active"
      >
        <div className="relative aspect-[9/16] w-full max-h-[65vh] bg-black">
          {reel.displayUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={proxiedMediaUrl(reel.displayUrl)}
              alt={reel.caption || "Reel"}
              className="absolute inset-0 h-full w-full object-contain"
            />
          )}

          {reel.videoUrl && (
            <video
              src={proxiedMediaUrl(reel.videoUrl)}
              autoPlay
              controls
              playsInline
              className="absolute inset-0 h-full w-full object-contain"
            />
          )}

          {!reel.displayUrl && !reel.videoUrl && (
            <div className="flex h-full w-full items-center justify-center text-xs text-muted">
              No preview
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-3 overflow-y-auto p-4">
          <p className="text-sm text-foreground/90">{reel.caption || "No caption"}</p>

          <div className="flex flex-wrap gap-1.5">
            <StatBadge icon={<HeartIcon />} label="Likes" value={formatCompactNumber(reel.likesCount)} />
            <StatBadge
              icon={<CommentIcon />}
              label="Comments"
              value={formatCompactNumber(reel.commentsCount)}
            />
            <StatBadge icon={<EyeIcon />} label="Views" value={formatCompactNumber(reel.videoViewCount)} />
            {reel.sharesCount !== null && (
              <StatBadge
                icon={<ShareIcon />}
                label="Shares"
                value={formatCompactNumber(reel.sharesCount)}
              />
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-muted">
            <span>@{reel.ownerUsername}</span>
            <span>{formatRelativeDate(reel.timestamp)}</span>
          </div>

          <a
            href={reel.url}
            target="_blank"
            rel="noreferrer"
            className="text-center text-xs text-muted underline decoration-white/20 underline-offset-2 transition hover:text-foreground"
          >
            View on Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
