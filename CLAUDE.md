# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`bokhi` is an unofficial fan landing page for the YouTube channel **어느각도로 봐도 떡복히** (golden hamster "뽀록", [@bokhi-3637](https://www.youtube.com/@bokhi-3637)). It embeds the channel's latest videos, shorts, and live stream. Next.js 14 (App Router) + Tailwind, deployed on Vercel. All UI text is in Korean.

## Commands

```bash
npm run dev     # next dev → http://localhost:3000
npm run build   # production build
npm start       # serve production build
npm run lint    # next lint
```

There is no test suite. Requires `.env.local` (copy from `.env.example`).

## Environment variables

- `YOUTUBE_API_KEY` — server-only. Without it the app silently falls back to RSS (see below).
- `NEXT_PUBLIC_CHANNEL_ID` — target channel (default `UCmHeohP_NalyuChLdCGRxvw`). Client-exposed.
- `NEXT_PUBLIC_CHANNEL_HANDLE` — handle for building channel links (default `bokhi-3637`). Several components read this directly at module scope.

## Architecture

**Single page, server-rendered with ISR.** `app/page.tsx` is an async Server Component that calls `getHomeData()` once and renders everything. `export const revalidate = 120` (matched by `REVALIDATE` in `lib/youtube.ts`) means video lists *and live-stream detection* refresh on this 120s cycle — there is no per-request fetching.

**`lib/youtube.ts` is the entire data layer** and the most important file. `getHomeData()` returns a single `HomeData` object (`lib/types.ts`) and degrades gracefully through three tiers:
1. `fetchFromApi()` — used when `YOUTUBE_API_KEY` is set. Three YouTube Data API v3 calls (~3 quota units/refresh): `channels` (profile + uploads playlist id) → `playlistItems` (latest 50 video ids) → `videos` (durations, view counts, live state).
2. `fetchFromRss()` — fallback when no key, or when the API throws. Scrapes `feeds/videos.xml` with regex. Loses shorts/live classification and accurate view counts; `source` is reported as `"rss"`.
3. On total failure, returns empty data so the page still renders. `source` (`"api"` | `"rss"`) flows down to `Footer` to indicate which path was used.

**Two YouTube-specific subtleties worth preserving:**
- **Live detection avoids the expensive `search` endpoint.** Instead it finds the uploads-list item whose `snippet.liveBroadcastContent === "live"`. Don't replace this with `search` calls — it would blow the quota budget.
- **Shorts classification is two-pass.** Duration ≤60s is a first guess; then `isShortById()` does a `HEAD` request to `youtube.com/shorts/{id}` (only for candidates ≤182s) — a 200 means it's a real short, a redirect means a regular video. This catches shorts longer than 60s. Live items are excluded before this pass.
- Embeds always use `youtube-nocookie.com/embed/{id}`, never channel/watch URLs, because YouTube blocks those in iframes via `X-Frame-Options`.

**Client/server split.** Most components are Server Components. The ones marked `"use client"`: `PlayerModal` (provides `PlayerProvider` + `usePlayer()` context and the modal iframe), `VideoGrid`, `ShortsGrid`, and `Support`. Thumbnail click → `usePlayer().open(id, title)` → modal renders the nocookie embed. `PlayerProvider` wraps the whole page in `app/page.tsx`.

**Theming.** The hamster color palette (`fur`, `paw`, `cream`, `sand`, `cocoa`, etc.) and custom animations (`fade-up`, `wiggle`, `pulse-live`) live in `tailwind.config.ts`. Use these tokens rather than raw hex; the whole site's tone depends on them. `Backdrop` and `ThumbWall` are pure CSS/SVG decorative layers.

`next.config.mjs` whitelists YouTube image hosts (`i.ytimg.com`, `yt3.googleusercontent.com`, `yt3.ggpht.com`) for `next/image`.
