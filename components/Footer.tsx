const HANDLE = process.env.NEXT_PUBLIC_CHANNEL_HANDLE || "bokhi-3637";

export default function Footer({ source }: { source: "api" | "rss" }) {
  return (
    <footer className="mt-8 border-t border-fur/15 bg-cream/50">
      <div className="mx-auto max-w-6xl px-5 py-10 text-center text-sm text-cocoa-soft">
        <p className="font-display text-lg text-cocoa">🐹 어느각도로 봐도 떡복히</p>
        <p className="mt-2">
          이 사이트는 팬이 만든 비공식 페이지입니다. 모든 영상의 저작권은
          원작자에게 있습니다.
        </p>
        <p className="mt-1">
          <a
            href={`https://www.youtube.com/@${HANDLE}`}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-fur-dark hover:underline"
          >
            @{HANDLE}
          </a>{" "}
          · YouTube
        </p>
        {source === "rss" && (
          <p className="mt-3 text-xs text-cocoa-soft/70">
            (RSS 모드로 동작 중 — 쇼츠/라이브 구분과 조회수를 보려면
            YOUTUBE_API_KEY 를 설정하세요)
          </p>
        )}
      </div>
    </footer>
  );
}
