"use client";

import type { VideoItem } from "@/lib/types";
import { formatCount, formatDuration, relativeDate } from "@/lib/format";
import { usePlayer } from "./PlayerModal";

export default function VideoGrid({ videos }: { videos: VideoItem[] }) {
  const { open } = usePlayer();

  if (videos.length === 0) {
    return (
      <p className="rounded-3xl bg-cream/70 p-8 text-center text-cocoa-soft">
        아직 불러온 영상이 없어요 🐹
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((v, i) => (
        <button
          key={v.id}
          onClick={() => open(v.id, v.title)}
          style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
          className="group animate-fade-up text-left"
        >
          <div className="relative overflow-hidden rounded-3xl bg-bedding shadow-soft ring-1 ring-fur/10 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-soft-lg">
            <div className="relative aspect-video w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={v.thumbnail}
                alt={v.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-cocoa/0 transition group-hover:bg-cocoa/20" />
              <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-cream/90 text-2xl text-fur-dark opacity-0 shadow-soft transition duration-300 group-hover:scale-100 group-hover:opacity-100">
                ▶
              </span>
              {v.durationSeconds > 0 && (
                <span className="absolute bottom-2 right-2 rounded-md bg-cocoa/85 px-1.5 py-0.5 text-xs font-semibold text-cream">
                  {formatDuration(v.durationSeconds)}
                </span>
              )}
            </div>
          </div>
          <h3 className="mt-3 line-clamp-2 px-1 font-medium leading-snug text-cocoa transition group-hover:text-fur-dark">
            {v.title}
          </h3>
          <p className="mt-1 px-1 text-sm text-cocoa-soft">
            {v.viewCount != null && <>조회수 {formatCount(v.viewCount)}회 · </>}
            {relativeDate(v.publishedAt)}
          </p>
        </button>
      ))}
    </div>
  );
}
