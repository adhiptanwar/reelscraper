import { ApifyClient } from "apify-client";
import type { Reel } from "./types";

const ACTOR_ID = "apify/instagram-reel-scraper";
const RESULTS_LIMIT = 5;

export class UnscrapableAccountError extends Error {
  constructor(username: string) {
    super(
      `@${username} couldn't be scraped — the account is private, doesn't exist, or has no public reels.`
    );
    this.name = "UnscrapableAccountError";
  }
}

// The actor returns a placeholder item instead of a reel when it can't read
// a profile, e.g. { url, inputUrl, error: "no_items", errorDescription: "..." }.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isErrorItem(item: Record<string, any>): boolean {
  return typeof item.error === "string";
}

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
    skipPinnedPosts: false,
  });

  const { items } = await client.dataset(run.defaultDatasetId).listItems();

  const reelItems = items.filter((item) => !isErrorItem(item));

  if (reelItems.length === 0) {
    throw new UnscrapableAccountError(username);
  }

  reelItems.sort((a, b) => {
    const aTime = new Date(String(a.timestamp ?? 0)).getTime();
    const bTime = new Date(String(b.timestamp ?? 0)).getTime();
    return bTime - aTime;
  });

  return reelItems.slice(0, RESULTS_LIMIT).map(toReel);
}
