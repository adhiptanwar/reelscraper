import { ApifyClient } from "apify-client";
import type { Reel } from "./types";

const ACTOR_ID = "apify/instagram-reel-scraper";
const RESULTS_LIMIT = 5;

function getClient(): ApifyClient {
  const token = process.env.APIFY_TOKEN;
  if (!token) {
    throw new Error(
      "Missing APIFY_TOKEN environment variable. Add it to .env.local — see .env.example."
    );
  }
  return new ApifyClient({ token });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toReel(item: Record<string, any>): Reel {
  return {
    id: String(item.id ?? item.shortCode ?? item.url ?? crypto.randomUUID()),
    shortCode: String(item.shortCode ?? ""),
    url: String(item.url ?? ""),
    caption: String(item.caption ?? ""),
    hashtags: Array.isArray(item.hashtags) ? item.hashtags : [],
    mentions: Array.isArray(item.mentions) ? item.mentions : [],
    timestamp: String(item.timestamp ?? ""),
    ownerUsername: String(item.ownerUsername ?? ""),
    likesCount: Number(item.likesCount ?? 0),
    commentsCount: Number(item.commentsCount ?? 0),
    videoViewCount: Number(item.videoViewCount ?? item.videoPlayCount ?? 0),
    videoPlayCount: Number(item.videoPlayCount ?? 0),
    sharesCount:
      item.sharesCount === undefined || item.sharesCount === null
        ? null
        : Number(item.sharesCount),
    videoDuration: Number(item.videoDuration ?? 0),
    videoUrl: String(item.videoUrl ?? ""),
    audioUrl: item.audioUrl ? String(item.audioUrl) : null,
    displayUrl: String(item.displayUrl ?? ""),
    transcript: item.transcript ? String(item.transcript) : null,
    musicInfo: item.musicInfo ?? null,
  };
}

export async function fetchReelsForHandle(username: string): Promise<Reel[]> {
  const client = getClient();

  const run = await client.actor(ACTOR_ID).call({
    username: [username],
    resultsLimit: RESULTS_LIMIT,
    includeTranscript: true,
    includeSharesCount: true,
    skipPinnedPosts: false,
  });

  const { items } = await client.dataset(run.defaultDatasetId).listItems();

  return items.slice(0, RESULTS_LIMIT).map(toReel);
}
