"use client";

import { useEffect, useState } from "react";

export default function Support() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section id="support" className="mx-auto max-w-5xl scroll-mt-6 px-5 py-12">
      <div className="overflow-hidden rounded-4xl bg-gradient-to-br from-cream to-sand p-8 text-center shadow-soft ring-1 ring-fur/15 sm:p-12">
        <p className="text-4xl">🍞</p>
        <h2 className="mt-2 font-display text-2xl text-cocoa sm:text-3xl">
          떡복히에게 빵 사주기
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-cocoa-soft">
          떡복히를 응원하고 싶다면 여기를 눌러주세요 🐹
        </p>

        <button
          onClick={() => setOpen(true)}
          className="mt-7 rounded-full bg-fur px-8 py-3.5 text-lg font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-fur-dark hover:shadow-soft-lg"
        >
          🍞 빵 사주기
        </button>
      </div>

      {/* 준비중 안내 */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa/60 p-5 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-sm animate-fade-up rounded-4xl bg-cream p-8 text-center shadow-soft-lg ring-1 ring-fur/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="닫기"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-sand text-cocoa transition hover:bg-fur-light"
            >
              ✕
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bokhi.jpg"
              alt="떡복히"
              className="mx-auto h-32 w-32 rounded-full object-cover shadow-soft ring-4 ring-cream"
            />
            <p className="mt-5 font-display text-2xl text-cocoa">
              준비중이에요! 🐹
            </p>
            <p className="mt-2 text-cocoa-soft">
              후원 기능은 아직 준비 중이에요.
              <br />
              조금만 기다려 주세요 🍞
            </p>

            <button
              onClick={() => setOpen(false)}
              className="mt-6 rounded-full bg-fur px-6 py-2.5 font-bold text-white shadow-soft transition hover:bg-fur-dark"
            >
              알겠어요
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
