import type { Reel } from "@/lib/types";
import { formatCompactNumber, formatDuration, formatRelativeDate } from "@/lib/format";
import TranscriptCell from "./TranscriptCell";

export default function TranscriptTable({ reels }: { reels: Reel[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-surface">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-surface-2 text-xs font-semibold uppercase tracking-wide text-muted">
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Caption</th>
            <th className="px-4 py-3">Posted</th>
            <th className="px-4 py-3 text-right">Duration</th>
            <th className="px-4 py-3 text-right">Likes</th>
            <th className="px-4 py-3 text-right">Comments</th>
            <th className="px-4 py-3 text-right">Views</th>
            <th className="px-4 py-3">Transcript</th>
          </tr>
        </thead>
        <tbody>
          {reels.map((reel, i) => (
            <tr key={reel.id} className="border-b border-white/5 align-top last:border-0">
              <td className="px-4 py-3 text-muted">{i + 1}</td>
              <td className="max-w-[220px] px-4 py-3">
                <p className="line-clamp-3 text-foreground/90">{reel.caption || "—"}</p>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-muted">
                {formatRelativeDate(reel.timestamp)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right text-muted">
                {formatDuration(reel.videoDuration)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right font-medium">
                {formatCompactNumber(reel.likesCount)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right font-medium">
                {formatCompactNumber(reel.commentsCount)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right font-medium">
                {formatCompactNumber(reel.videoViewCount)}
              </td>
              <td className="min-w-[320px] max-w-[420px] px-4 py-3">
                <TranscriptCell reel={reel} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
