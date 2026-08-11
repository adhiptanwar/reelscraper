export type MusicInfo = {
  artist_name?: string;
  song_name?: string;
};

export type Reel = {
  id: string;
  shortCode: string;
  url: string;
  caption: string;
  hashtags: string[];
  mentions: string[];
  timestamp: string;
  ownerUsername: string;
  likesCount: number;
  commentsCount: number;
  videoViewCount: number;
  videoPlayCount: number;
  sharesCount: number | null;
  videoDuration: number;
  videoUrl: string;
  audioUrl: string | null;
  displayUrl: string;
  transcript: string | null;
  musicInfo: MusicInfo | null;
};

export type ReelsApiResponse =
  | { ok: true; username: string; reels: Reel[] }
  | { ok: false; error: string };
