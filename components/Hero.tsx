import type { ChannelInfo } from "@/lib/types";
import ThumbWall from "./ThumbWall";

const HANDLE = process.env.NEXT_PUBLIC_CHANNEL_HANDLE || "bokhi-3637";
const CHANNEL_URL = `https://www.youtube.com/@${HANDLE}`;

export default function Hero({
  channel,
  isLive,
  thumbs,
}: {
  channel: ChannelInfo;
  isLive: boolean;
  thumbs: { src: string; vertical: boolean }[];
}) {
  return (
    <header className="relative overflow-hidden">
      <ThumbWall thumbs={thumbs} />
      <div className="relative z-10 mx-auto max-w-5xl px-5 pb-10 pt-16 text-center sm:pt-24">
        {/* 프로필 */}
        <div className="relative mx-auto mb-6 h-36 w-36 sm:h-44 sm:w-44">
          <div className="absolute inset-0 rounded-full bg-fur/30 blur-2xl" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={channel.avatar}
            alt={channel.title}
            className="relative h-full w-full rounded-full object-cover shadow-soft-lg ring-[6px] ring-cream"
          />
          {isLive && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-soft">
              <span className="mr-1 inline-block h-2 w-2 animate-pulse-live rounded-full bg-white align-middle" />
              LIVE
            </span>
          )}
        </div>

        <p className="mb-2 inline-block rounded-full bg-paw/40 px-4 py-1 text-sm font-semibold text-cocoa">
          🐹 떡복히 팬 페이지
        </p>
        <h1 className="font-display text-4xl text-cocoa sm:text-6xl">
          {channel.title}
        </h1>
        {channel.description && (
          <p className="mx-auto mt-4 max-w-2xl whitespace-pre-line text-cocoa-soft line-clamp-3">
            {channel.description}
          </p>
        )}

        {/* CTA */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`${CHANNEL_URL}?sub_confirmation=1`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-fur px-7 py-3 font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-fur-dark hover:shadow-soft-lg"
          >
            ▶ 유튜브에서 구독하기
          </a>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-cream px-7 py-3 font-bold text-cocoa shadow-soft ring-1 ring-fur/20 transition hover:-translate-y-0.5 hover:bg-fur-light"
          >
            채널 바로가기
          </a>
        </div>

        {/* 섹션 네비 */}
        <nav className="mt-10 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold">
          {isLive && (
            <a
              href="#live"
              className="rounded-full bg-red-50 px-4 py-2 text-red-500 ring-1 ring-red-200 transition hover:bg-red-100"
            >
              🔴 라이브
            </a>
          )}
          <a
            href="#shorts"
            className="rounded-full bg-cream px-4 py-2 text-cocoa ring-1 ring-fur/20 transition hover:bg-fur-light"
          >
            쇼츠
          </a>
          <a
            href="#videos"
            className="rounded-full bg-cream px-4 py-2 text-cocoa ring-1 ring-fur/20 transition hover:bg-fur-light"
          >
            동영상
          </a>
          <a
            href="#support"
            className="rounded-full bg-paw/50 px-4 py-2 text-cocoa ring-1 ring-paw-dark/30 transition hover:bg-paw"
          >
            🍞 빵 사주기
          </a>
        </nav>
      </div>
    </header>
  );
}
