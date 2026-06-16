import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 햄스터 뽀록 톤앤매너 (골든 시리안 햄스터)
        cream: "#FFF8EE", // 배 / 카드 밝은 톤
        sand: "#FAF1E4", // 우드 베딩 배경
        fur: "#E2A05E", // 골든 캐러멜 털 (메인)
        "fur-dark": "#C07C3C", // 진한 캐러멜
        "fur-light": "#F2C892", // 밝은 털
        paw: "#F2B8B5", // 핑크 발
        "paw-dark": "#E59A95", // 진한 핑크 (코)
        bedding: "#E8D5B0", // 베딩 톤
        cocoa: "#5B4636", // 메인 텍스트 (진한 갈색)
        "cocoa-soft": "#8A7160", // 보조 텍스트
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(91, 70, 54, 0.25)",
        "soft-lg": "0 24px 50px -20px rgba(91, 70, 54, 0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        wiggle: {
          "0%,100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "pulse-live": {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        wiggle: "wiggle 1.2s ease-in-out infinite",
        "pulse-live": "pulse-live 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
