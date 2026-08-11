import type { Reel } from "./types";

export const MOCK_HANDLE = "test";

function placeholderThumb(label: string, color: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="540" height="960">
    <rect width="100%" height="100%" fill="${color}" />
    <text x="50%" y="50%" font-family="sans-serif" font-size="40" fill="white"
      text-anchor="middle" dominant-baseline="middle">${label}</text>
  </svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

const CAPTIONS = [
  "POV: you finally hit your morning routine 3 days in a row 💪 #mindset #consistency",
  "This is why we don't skip leg day. Ever. #gymtok #fitness",
  "Rating gas station snacks so you don't have to 🍫",
  "Told my landlord I'd 'think about it' 😭 #renting #adulting",
  "5 things I wish I knew before my first job #careertips #worklife",
];

const HASHTAG_SETS = [
  ["mindset", "consistency", "morningroutine"],
  ["gymtok", "fitness", "legday"],
  ["snacks", "review", "fyp"],
  ["renting", "adulting", "relatable"],
  ["careertips", "worklife", "advice"],
];

const TRANSCRIPTS = [
  "Okay so day three of actually waking up at six a.m. instead of hitting snooze eleven times. Honestly? I feel like a different person. Small wins, but they add up.",
  "Everyone skips leg day, and then wonders why they look like a lollipop. Don't be a lollipop. Squat. Every. Time.",
  "Alright, gas station snack number one, we've got the classic honey bun. Ten out of ten, tastes like a hug from your grandma.",
  "So my landlord just texted asking if I've 'thought about it' and buddy I have not thought about a single thing except how to avoid this conversation.",
  "Number one, always negotiate your first salary. Number two, ask questions in the interview. Number three, nobody actually knows what they're doing, including your boss.",
];

const COLORS = ["#7c3aed", "#db2777", "#0891b2", "#ea580c", "#16a34a"];

export function getMockReels(): Reel[] {
  const now = Date.now();

  return Array.from({ length: 5 }, (_, i) => {
    const likes = Math.round((800 + i * 3200) * (1 + (i % 3) * 0.4));
    const views = likes * (12 + i * 2);
    const comments = Math.round(likes * 0.02) + 8;
    const shares = Math.round(likes * 0.015) + 3;

    return {
      id: `mock-${i + 1}`,
      shortCode: `MOCK00${i + 1}`,
      url: `https://www.instagram.com/reel/MOCK00${i + 1}/`,
      caption: CAPTIONS[i],
      hashtags: HASHTAG_SETS[i],
      mentions: i === 0 ? ["a_friend_handle"] : [],
      timestamp: new Date(now - (i + 1) * 1000 * 60 * 60 * 24 * (i + 2)).toISOString(),
      ownerUsername: MOCK_HANDLE,
      likesCount: likes,
      commentsCount: comments,
      videoViewCount: views,
      videoPlayCount: Math.round(views * 1.3),
      sharesCount: shares,
      videoDuration: 14 + i * 9.5,
      videoUrl: "",
      audioUrl: null,
      displayUrl: placeholderThumb(`Reel #${i + 1}`, COLORS[i]),
      transcript: TRANSCRIPTS[i],
      musicInfo: {
        artist_name: i % 2 === 0 ? "Original audio" : "Some Artist",
        song_name: i % 2 === 0 ? `@${MOCK_HANDLE}` : "Trending Sound",
      },
    } satisfies Reel;
  });
}
