import { getHomeData } from "@/lib/youtube";
import { PlayerProvider } from "@/components/PlayerModal";
import Hero from "@/components/Hero";
import LiveSection from "@/components/LiveSection";
import Section from "@/components/Section";
import VideoGrid from "@/components/VideoGrid";
import ShortsGrid from "@/components/ShortsGrid";
import Footer from "@/components/Footer";

// ISR: 이 주기로 영상 목록/라이브 상태를 갱신합니다.
export const revalidate = 120;

export default async function Home() {
  const { channel, videos, shorts, live, source } = await getHomeData();

  return (
    <PlayerProvider>
      <main className="min-h-screen">
        <Hero channel={channel} isLive={!!live} />

        {live && <LiveSection live={live} />}

        {shorts.length > 0 && (
          <Section id="shorts" title="쇼츠" subtitle="짧고 귀여운 순간들">
            <ShortsGrid shorts={shorts} />
          </Section>
        )}

        <Section id="videos" title="동영상" subtitle="최신 영상 모아보기">
          <VideoGrid videos={videos} />
        </Section>

        <Footer source={source} />
      </main>
    </PlayerProvider>
  );
}
