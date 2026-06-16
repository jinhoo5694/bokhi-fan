import type { Metadata } from "next";
import "./globals.css";
import Backdrop from "@/components/Backdrop";

export const metadata: Metadata = {
  title: "뽀록 | 어느각도로 봐도 떡복히",
  description:
    "골든 햄스터 뽀록의 유튜브 채널 팬 페이지 — 최신 영상, 쇼츠, 라이브 방송을 한 곳에서 🐹",
  openGraph: {
    title: "뽀록 | 어느각도로 봐도 떡복히",
    description: "골든 햄스터 뽀록의 유튜브 채널 팬 페이지 🐹",
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐹</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Backdrop />
        {children}
      </body>
    </html>
  );
}
