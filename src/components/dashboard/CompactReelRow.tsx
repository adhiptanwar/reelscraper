"use client";

import { useState } from "react";
import type { Reel } from "@/lib/types";
import ReelThumb from "./ReelThumb";
import ReelModal from "./ReelModal";

export default function CompactReelRow({ reels }: { reels: Reel[] }) {
  const [expandedReel, setExpandedReel] = useState<Reel | null>(null);

  return (
    <>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
        {reels.map((reel, i) => (
          <ReelThumb key={reel.id} reel={reel} index={i} onExpand={setExpandedReel} />
        ))}
      </div>

      {expandedReel && (
        <ReelModal reel={expandedReel} onClose={() => setExpandedReel(null)} />
      )}
    </>
  );
}
