import type { LiveItem } from "@/lib/types";

const HANDLE = process.env.NEXT_PUBLIC_CHANNEL_HANDLE || "bokhi-3637";

export default function LiveSection({ live }: { live: LiveItem }) {
  return (
    <section id="live" className="mx-auto max-w-5xl scroll-mt-6 px-5 py-10">
      <div className="mb-5 flex items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
          <span className="h-2 w-2 animate-pulse-live rounded-full bg-white" />
          LIVE NOW
        </span>
        <h2 className="font-display text-2xl text-cocoa">지금 방송 중! 🐹</h2>
      </div>

      <div className="overflow-hidden rounded-4xl bg-black shadow-soft-lg ring-4 ring-paw/40">
        <div className="relative aspect-video w-full">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${live.id}?autoplay=1&mute=1&rel=0`}
            title={live.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      <p className="mt-3 text-center font-medium text-cocoa">{live.title}</p>
      <p className="text-center text-sm text-cocoa-soft">
        소리가 안 들리면 플레이어 음소거를 해제해 주세요 ·{" "}
        <a
          className="font-semibold text-fur-dark underline-offset-2 hover:underline"
          href={`https://www.youtube.com/@${HANDLE}/live`}
          target="_blank"
          rel="noreferrer"
        >
          유튜브에서 보기
        </a>
      </p>
    </section>
  );
}
