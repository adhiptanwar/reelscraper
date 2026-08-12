"use client";

import { useState } from "react";
import type { Reel } from "@/lib/types";
import { updateReelTranscript } from "@/lib/searches";
import { CheckIcon, PencilIcon } from "@/components/icons";

export default function TranscriptCell({ reel }: { reel: Reel }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(reel.transcript ?? "");

  if (!isEditing) {
    return (
      <div className="group flex items-start gap-2">
        {reel.transcript ? (
          <div className="max-h-32 flex-1 overflow-y-auto whitespace-pre-wrap text-xs leading-relaxed text-muted">
            {reel.transcript}
          </div>
        ) : (
          <span className="flex-1 text-xs text-muted">No transcript</span>
        )}
        <button
          type="button"
          onClick={() => {
            setDraft(reel.transcript ?? "");
            setIsEditing(true);
          }}
          aria-label="Edit transcript"
          className="shrink-0 rounded-md p-1.5 text-muted opacity-0 transition hover:bg-white/10 hover:text-foreground group-hover:opacity-100"
        >
          <PencilIcon />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        autoFocus
        className="min-h-[100px] w-full resize-y rounded-lg border border-accent/50 bg-black/40 p-2 text-xs leading-relaxed text-foreground/90 focus:outline-none"
      />
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={async () => {
            await updateReelTranscript(reel.ownerUsername, reel.id, draft);
            setIsEditing(false);
          }}
          className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black transition hover:bg-white/90"
        >
          <CheckIcon />
          Save
        </button>
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted transition hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
