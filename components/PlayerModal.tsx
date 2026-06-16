"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface PlayingVideo {
  id: string;
  title: string;
}

interface PlayerContextValue {
  open: (id: string, title: string) => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function usePlayer(): PlayerContextValue {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within <PlayerProvider>");
  return ctx;
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<PlayingVideo | null>(null);

  const open = useCallback((id: string, title: string) => {
    setCurrent({ id, title });
  }, []);

  const close = useCallback(() => setCurrent(null), []);

  useEffect(() => {
    if (!current) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [current, close]);

  return (
    <PlayerContext.Provider value={{ open }}>
      {children}
      {current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa/70 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              aria-label="닫기"
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-cream text-xl font-bold text-cocoa shadow-soft transition hover:scale-105 hover:bg-fur-light"
            >
              ✕
            </button>
            <div className="overflow-hidden rounded-3xl bg-black shadow-soft-lg ring-4 ring-cream/60">
              <div className="relative aspect-video w-full">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${current.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={current.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
            <p className="mt-3 line-clamp-2 text-center text-sm font-medium text-cream/90">
              {current.title}
            </p>
          </div>
        </div>
      )}
    </PlayerContext.Provider>
  );
}
