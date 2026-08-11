# Reelscraper.ai

Drop a public Instagram handle and get their last 5 reels — likes, comments,
views, shares, playback (one reel plays at a time), and a full spoken
transcript for each video.

Reel data (including transcripts) comes from the
[`apify/instagram-reel-scraper`](https://apify.com/apify/instagram-reel-scraper)
Apify actor — no separate Whisper/transcription step needed, the actor
returns transcripts directly when `includeTranscript` is enabled.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the env template and add your Apify API token:

   ```bash
   cp .env.example .env.local
   ```

   Get a token from [console.apify.com/settings/integrations](https://console.apify.com/settings/integrations).

3. Run the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## How it works

- `src/app/page.tsx` — client page: handle search form, loading/error states.
- `src/app/api/reels/route.ts` — server route that validates the handle and
  calls the Apify actor.
- `src/lib/apify.ts` — Apify client wrapper (`fetchReelsForHandle`), maps raw
  actor output to a typed `Reel`.
- `src/components/ReelGrid.tsx` + `ReelCard.tsx` — reel grid with stats,
  transcript toggle, and inline video playback.
- `src/components/PlaybackContext.tsx` — shared "currently playing" id so
  starting one reel automatically pauses any other reel that's playing.

## Notes

- Only public Instagram accounts are supported (no login flow — the actor
  scrapes public data only).
- The Apify actor bills per result/minute of transcript — see its
  [pricing](https://apify.com/apify/instagram-reel-scraper) before heavy use.
