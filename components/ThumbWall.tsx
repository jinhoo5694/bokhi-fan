// 히어로 뒤에 떠다니는 썸네일 콜라주.
// 격자 나열이 아니라, 살짝 기울어진 카드들이 둥둥 부유한다.

// 배치(컨테이너 기준 %): 가운데(프로필·제목)는 비워 가독성 확보
const SLOTS = [
  { left: "4%", top: "9%", w: "21%", rot: -6, dur: 7, delay: 0, v: 1 },
  { left: "76%", top: "6%", w: "20%", rot: 5, dur: 8.5, delay: 1, v: 2 },
  { left: "-1%", top: "54%", w: "18%", rot: 5, dur: 9, delay: 2, v: 1 },
  { left: "81%", top: "50%", w: "21%", rot: -5, dur: 7.5, delay: 0.6, v: 2 },
  { left: "29%", top: "73%", w: "20%", rot: 6, dur: 8.5, delay: 1.6, v: 1 },
  { left: "58%", top: "75%", w: "19%", rot: -4, dur: 9.5, delay: 0.9, v: 2 },
  { left: "14%", top: "31%", w: "15%", rot: 9, dur: 10, delay: 2.3, v: 1 },
  { left: "71%", top: "27%", w: "15%", rot: -8, dur: 8, delay: 1.2, v: 2 },
  { left: "44%", top: "1%", w: "17%", rot: 3, dur: 9, delay: 0.3, v: 1 },
  { left: "87%", top: "79%", w: "15%", rot: 5, dur: 7, delay: 2, v: 2 },
  { left: "6%", top: "80%", w: "17%", rot: -7, dur: 8, delay: 0.5, v: 1 },
];

export default function ThumbWall({
  thumbs,
}: {
  thumbs: { src: string; vertical: boolean }[];
}) {
  if (!thumbs.length) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {SLOTS.map((s, i) => {
        const t = thumbs[i % thumbs.length];
        // 쇼츠는 세로 카드 + 폭을 줄여(폰 화면처럼) 좌우를 잘라낸다
        const width = t.vertical ? `calc(${s.w} * 0.62)` : s.w;
        return (
          <div
            key={i}
            className="absolute"
            style={{ left: s.left, top: s.top, width, transform: `rotate(${s.rot}deg)` }}
          >
            <div
              className="anim-floaty"
              style={{
                animation: `${s.v === 2 ? "floaty2" : "floaty"} ${s.dur}s ease-in-out ${s.delay}s infinite`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.src}
                alt=""
                loading="lazy"
                className={`w-full rounded-xl object-cover shadow-soft ring-1 ring-white/40 ${
                  t.vertical ? "aspect-[9/16]" : "aspect-video"
                }`}
              />
            </div>
          </div>
        );
      })}

      {/* 따뜻한 톤 오버레이 — 아래쪽을 배경색으로 자연스럽게 */}
      <div className="absolute inset-0 bg-gradient-to-b from-sand/25 via-sand/15 to-sand" />
      {/* 가운데(프로필·제목 영역)만 살짝 차분하게 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(250,241,228,0.7), transparent 46%)",
        }}
      />
    </div>
  );
}
