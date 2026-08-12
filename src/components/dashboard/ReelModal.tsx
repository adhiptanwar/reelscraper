"use client";

import { useEffect, useState } from "react";
import type { Reel } from "@/lib/types";
import { formatCompactNumber, formatRelativeDate } from "@/lib/format";
import { proxiedMediaUrl } from "@/lib/media";
import { updateReelTranscript } from "@/lib/searches";
import StatBadge from "@/components/StatBadge";
import { CheckIcon, CloseIcon, CommentIcon, EyeIcon, HeartIcon } from "@/components/icons";

export default function ReelModal({ reel, onClose }: { reel: Reel; onClose: () => void }) {
  const [draft, setDraft] = useState(reel.transcript ?? "");
  const [savedValue, setSavedValue] = useState(reel.transcript ?? "");
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const isDirty = draft !== savedValue;

  async function handleSave() {
    await updateReelTranscript(reel.ownerUsername, reel.id, draft);
    setSavedValue(draft);
    setJustSaved(true);
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-surface glow-border-active sm:flex-row"
      >
        <div className="relative aspect-[9/16] w-full shrink-0 bg-black sm:w-72">
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
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80 sm:hidden"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3 overflow-y-auto p-4">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-foreground/90">{reel.caption || "No caption"}</p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-white/10 hover:text-foreground sm:flex"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <StatBadge icon={<HeartIcon />} label="Likes" value={formatCompactNumber(reel.likesCount)} />
            <StatBadge
              icon={<CommentIcon />}
              label="Comments"
              value={formatCompactNumber(reel.commentsCount)}
            />
            <StatBadge icon={<EyeIcon />} label="Views" value={formatCompactNumber(reel.videoViewCount)} />
          </div>

          <div className="flex items-center justify-between text-xs text-muted">
            <span>@{reel.ownerUsername}</span>
            <span>{formatRelativeDate(reel.timestamp)}</span>
          </div>

          <a
            href={reel.url}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-muted underline decoration-white/20 underline-offset-2 transition hover:text-foreground"
          >
            View on Instagram
          </a>

          <div className="mt-1 flex min-h-0 flex-1 flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">
                Script
              </h3>
              {justSaved && !isDirty && (
                <span className="flex items-center gap-1 text-xs text-accent-2">
                  <CheckIcon />
                  Saved
                </span>
              )}
            </div>

            <textarea
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                setJustSaved(false);
              }}
              placeholder="No transcript available."
              className="min-h-[180px] flex-1 resize-none rounded-lg border border-white/10 bg-black/40 p-3 text-xs leading-relaxed text-foreground/90 focus:border-accent/60 focus:outline-none"
            />

            <button
              type="button"
              onClick={handleSave}
              disabled={!isDirty}
              className="self-end rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Save script
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
