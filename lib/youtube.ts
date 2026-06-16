import type { ChannelInfo, HomeData, LiveItem, VideoItem } from "./types";

const CHANNEL_ID =
  process.env.NEXT_PUBLIC_CHANNEL_ID || "UCmHeohP_NalyuChLdCGRxvw";
const API_KEY = process.env.YOUTUBE_API_KEY;

// 데이터 캐싱 주기(초). 라이브 감지도 이 주기로 갱신됩니다.
const REVALIDATE = 120;

// API 키가 없을 때 쓰는 폴백 프로필 이미지
const FALLBACK_AVATAR =
  "https://yt3.googleusercontent.com/1mtnEUZAnA_QqhC2EjUi7rcK1GFNfJrBO8hSlunTR6Q_ZIUiNNenpDj-Ilm2CsIQYSTkKk1D=s900-c-k-c0x00ffffff-no-rj";

const FALLBACK_TITLE = "어느각도로 봐도 떡복히";

/** ISO8601 (PT#H#M#S) → 초 */
function parseDuration(iso: string): number {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return 0;
  const [, h, mi, s] = m;
  return (Number(h) || 0) * 3600 + (Number(mi) || 0) * 60 + (Number(s) || 0);
}

function bestThumb(thumbs: Record<string, { url: string }> | undefined): string {
  if (!thumbs) return "";
  return (
    thumbs.maxres?.url ||
    thumbs.standard?.url ||
    thumbs.high?.url ||
    thumbs.medium?.url ||
    thumbs.default?.url ||
    ""
  );
}

async function ytFetch(
  endpoint: string,
  params: Record<string, string>
): Promise<any> {
  const url = new URL(`https://www.googleapis.com/youtube/v3/${endpoint}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  url.searchParams.set("key", API_KEY as string);
  const res = await fetch(url.toString(), { next: { revalidate: REVALIDATE } });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`YouTube API ${endpoint} ${res.status}: ${body.slice(0, 300)}`);
  }
  return res.json();
}

async function fetchFromApi(): Promise<HomeData> {
  // 1) 채널 정보 + 업로드 재생목록 ID
  const chRes = await ytFetch("channels", {
    part: "snippet,statistics,contentDetails",
    id: CHANNEL_ID,
  });
  const ch = chRes.items?.[0];
  if (!ch) throw new Error("채널을 찾을 수 없습니다.");

  const channel: ChannelInfo = {
    id: CHANNEL_ID,
    title: ch.snippet?.title || FALLBACK_TITLE,
    description: ch.snippet?.description || "",
    avatar: bestThumb(ch.snippet?.thumbnails) || FALLBACK_AVATAR,
    subscriberCount: ch.statistics?.hiddenSubscriberCount
      ? null
      : Number(ch.statistics?.subscriberCount) || null,
    videoCount: Number(ch.statistics?.videoCount) || null,
  };

  const uploadsId: string | undefined =
    ch.contentDetails?.relatedPlaylists?.uploads;

  let videos: VideoItem[] = [];
  let shorts: VideoItem[] = [];
  let live: LiveItem | null = null;

  if (uploadsId) {
    // 2) 업로드 재생목록 → 최신 영상 ID (최대 50)
    const plRes = await ytFetch("playlistItems", {
      part: "contentDetails",
      playlistId: uploadsId,
      maxResults: "50",
    });
    const ids: string[] = (plRes.items || [])
      .map((it: any) => it.contentDetails?.videoId)
      .filter(Boolean);

    if (ids.length) {
      // 3) 영상 상세 (길이/조회수/라이브 상태)
      const vRes = await ytFetch("videos", {
        part: "snippet,contentDetails,statistics",
        id: ids.join(","),
        maxResults: "50",
      });

      const items: (VideoItem & { liveState: string })[] = (vRes.items || []).map(
        (v: any) => {
          const durationSeconds = parseDuration(v.contentDetails?.duration || "");
          return {
            id: v.id,
            title: v.snippet?.title || "",
            thumbnail: bestThumb(v.snippet?.thumbnails),
            publishedAt: v.snippet?.publishedAt || "",
            viewCount: Number(v.statistics?.viewCount) || null,
            durationSeconds,
            // 60초 이하 → 쇼츠로 분류
            isShort: durationSeconds > 0 && durationSeconds <= 60,
            liveState: v.snippet?.liveBroadcastContent || "none",
          };
        }
      );

      // 라이브 감지: 업로드 목록 내 현재 방송 중인 항목 (search 호출 불필요 → 쿼터 절약)
      const liveItem = items.find((i) => i.liveState === "live");
      if (liveItem) {
        live = {
          id: liveItem.id,
          title: liveItem.title,
          thumbnail: liveItem.thumbnail,
        };
      }

      const normal = items.filter((i) => i.liveState !== "live");
      shorts = normal.filter((i) => i.isShort);
      videos = normal.filter((i) => !i.isShort);
    }
  }

  return { channel, videos, shorts, live, source: "api" };
}

/** API 키가 없을 때: RSS 폴백 (영상 목록만, 쇼츠/라이브 구분 없음) */
async function fetchFromRss(): Promise<HomeData> {
  const res = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
    { next: { revalidate: REVALIDATE } }
  );
  const xml = await res.text();

  const channelTitle =
    xml.match(/<title>([^<]+)<\/title>/)?.[1]?.trim() || FALLBACK_TITLE;

  const entries = xml.split("<entry>").slice(1);
  const videos: VideoItem[] = entries.map((e) => {
    const id = e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] || "";
    const title = e.match(/<title>([^<]+)<\/title>/)?.[1] || "";
    const publishedAt = e.match(/<published>([^<]+)<\/published>/)?.[1] || "";
    const views =
      e.match(/<media:statistics views="(\d+)"/)?.[1] ||
      e.match(/views="(\d+)"/)?.[1];
    return {
      id,
      title,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      publishedAt,
      viewCount: views ? Number(views) : null,
      durationSeconds: 0,
      isShort: false,
    };
  });

  const channel: ChannelInfo = {
    id: CHANNEL_ID,
    title: channelTitle,
    description: "",
    avatar: FALLBACK_AVATAR,
    subscriberCount: null,
    videoCount: null,
  };

  return { channel, videos, shorts: [], live: null, source: "rss" };
}

export async function getHomeData(): Promise<HomeData> {
  try {
    if (API_KEY) return await fetchFromApi();
    return await fetchFromRss();
  } catch (err) {
    console.error("[youtube] fetch failed, falling back to RSS:", err);
    try {
      return await fetchFromRss();
    } catch {
      // 완전 실패 시 빈 데이터로라도 페이지가 렌더되도록
      return {
        channel: {
          id: CHANNEL_ID,
          title: FALLBACK_TITLE,
          description: "",
          avatar: FALLBACK_AVATAR,
          subscriberCount: null,
          videoCount: null,
        },
        videos: [],
        shorts: [],
        live: null,
        source: "rss",
      };
    }
  }
}

export { CHANNEL_ID };
