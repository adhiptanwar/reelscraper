// Instagram's raw scraped CDN video URL expires (it's a signed link with a
// short TTL), but the post itself never does. Instagram's own embed player
// fetches live from Instagram at render time, so it keeps working
// indefinitely — same as clicking "View on Instagram".
export function instagramEmbedUrl(shortCode: string): string {
  return `https://www.instagram.com/reel/${shortCode}/embed`;
}
