export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: number | null;
  durationSeconds: number;
  isShort: boolean;
}

export interface LiveItem {
  id: string;
  title: string;
  thumbnail: string;
}

export interface ChannelInfo {
  id: string;
  title: string;
  description: string;
  avatar: string;
  subscriberCount: number | null;
  videoCount: number | null;
}

export interface HomeData {
  channel: ChannelInfo;
  videos: VideoItem[];
  shorts: VideoItem[];
  live: LiveItem | null;
  source: "api" | "rss";
}
