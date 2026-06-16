// 국악 무드의 동적 배경 — 순수 CSS/SVG 애니메이션.
// 화면 전체 뒤에 깔리며 클릭을 가로채지 않습니다.

// 현(絃)의 잔향 — 악기를 그리지 않고, 줄의 울림만 아주 연하게 추상화.
// 화면 전역에 가로로 흐르는 금빛 선이 느린 정상파로 은은히 떨린다.
const RESONANCE = Array.from({ length: 13 }, (_, i) => {
  const y = 7 + i * 7; // viewBox(0~100) 세로 위치
  const amp = 0.5 + (i % 4) * 0.22; // 미세한 진폭
  const dur = 13 + (i % 5) * 2.4; // 느린 국악 템포
  const begin = -(i * 1.7);
  return {
    y,
    dur,
    begin,
    up: `M 0 ${y} Q 50 ${(y - amp).toFixed(2)} 100 ${y}`,
    down: `M 0 ${y} Q 50 ${(y + amp).toFixed(2)} 100 ${y}`,
  };
});

// 떠다니는 매화 꽃잎 — 위치/크기/속도 고정값(하이드레이션 안정)
const PETALS = [
  { left: "8%", size: 16, dur: 15, delay: 0, swayDur: 4 },
  { left: "18%", size: 11, dur: 19, delay: 6, swayDur: 5 },
  { left: "27%", size: 20, dur: 13, delay: 2, swayDur: 3.5 },
  { left: "37%", size: 13, dur: 21, delay: 9, swayDur: 6 },
  { left: "46%", size: 9, dur: 17, delay: 4, swayDur: 4.5 },
  { left: "55%", size: 18, dur: 14, delay: 11, swayDur: 3.8 },
  { left: "64%", size: 12, dur: 20, delay: 1, swayDur: 5.5 },
  { left: "72%", size: 15, dur: 16, delay: 7, swayDur: 4.2 },
  { left: "81%", size: 10, dur: 22, delay: 3, swayDur: 6.2 },
  { left: "89%", size: 17, dur: 15, delay: 10, swayDur: 3.6 },
  { left: "95%", size: 12, dur: 18, delay: 5, swayDur: 5 },
  { left: "3%", size: 14, dur: 23, delay: 8, swayDur: 4.8 },
];

export default function Backdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* 천천히 흐르는 한지빛 블롭 */}
      <div
        className="anim-drift absolute -left-[10%] -top-[10%] h-[55vh] w-[55vh] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(242,200,146,0.55), transparent 70%)",
          animation: "drift 22s ease-in-out infinite",
        }}
      />
      <div
        className="anim-drift absolute right-[-12%] top-[8%] h-[48vh] w-[48vh] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(242,184,181,0.5), transparent 70%)",
          animation: "drift 26s ease-in-out infinite",
          animationDelay: "-6s",
        }}
      />
      <div
        className="anim-drift absolute bottom-[-15%] left-[25%] h-[50vh] w-[50vh] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(226,160,94,0.4), transparent 70%)",
          animation: "drift 30s ease-in-out infinite",
          animationDelay: "-12s",
        }}
      />
      {/* 청자빛 살짝 — 국악 분위기 악센트 */}
      <div
        className="anim-drift absolute right-[20%] bottom-[5%] h-[40vh] w-[40vh] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(167,196,181,0.5), transparent 70%)",
          animation: "drift 28s ease-in-out infinite",
          animationDelay: "-9s",
        }}
      />

      {/* 현의 잔향 — 아주 연한 금빛 줄이 천천히 울림 */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.10]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {RESONANCE.map((s, i) => (
          <path
            key={i}
            d={s.up}
            fill="none"
            stroke="#c79a4e"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          >
            <animate
              attributeName="d"
              dur={`${s.dur}s`}
              begin={`${s.begin}s`}
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
              values={`${s.up};${s.down};${s.up}`}
            />
          </path>
        ))}
      </svg>

      {/* 떠다니는 매화 꽃잎 */}
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="anim-petal-fall absolute top-0"
          style={{
            left: p.left,
            animation: `petal-fall ${p.dur}s linear infinite`,
            animationDelay: `-${p.delay}s`,
          }}
        >
          <span
            className="petal anim-petal-sway block"
            style={{
              width: p.size,
              height: p.size,
              animation: `petal-sway ${p.swayDur}s ease-in-out infinite`,
            }}
          />
        </span>
      ))}
    </div>
  );
}
