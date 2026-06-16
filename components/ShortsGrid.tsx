"use client";

import type { VideoItem } from "@/lib/types";
import { formatCount } from "@/lib/format";
import { usePlayer } from "./PlayerModal";

export default function ShortsGrid({ shorts }: { shorts: VideoItem[] }) {
  const { open } = usePlayer();

  if (shorts.length === 0) {
    return (
      <p className="rounded-3xl bg-cream/70 p-8 text-center text-cocoa-soft">
        아직 쇼츠가 없어요 🐹
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {shorts.map((s, i) => (
        <button
          key={s.id}
          onClick={() => open(s.id, s.title)}
          style={{ animationDelay: `${Math.min(i, 10) * 40}ms` }}
          className="group animate-fade-up text-left"
        >
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-3xl bg-bedding shadow-soft ring-1 ring-fur/10 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-soft-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.thumbnail}
              alt={s.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa/80 via-transparent to-transparent" />
            <span className="absolute left-2 top-2 rounded-full bg-paw/90 px-2 py-0.5 text-[10px] font-bold text-cocoa shadow">
              쇼츠
            </span>
            <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-cream/90 text-xl text-fur-dark opacity-0 shadow-soft transition duration-300 group-hover:scale-100 group-hover:opacity-100">
              ▶
            </span>
            <div className="absolute inset-x-0 bottom-0 p-2.5">
              <h3 className="line-clamp-2 text-xs font-semibold leading-snug text-cream">
                {s.title}
              </h3>
              {s.viewCount != null && (
                <p className="mt-0.5 text-[11px] text-cream/80">
                  조회수 {formatCount(s.viewCount)}회
                </p>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
