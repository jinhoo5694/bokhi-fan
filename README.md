# 🐹 bokhi — 어느각도로 봐도 떡복히 팬 페이지

골든 햄스터 **뽀록**([@bokhi-3637](https://www.youtube.com/@bokhi-3637)) 유튜브 채널의
비공식 팬 랜딩 페이지입니다. 최신 동영상 · 쇼츠 · 라이브 방송을 한 곳에서 임베드해 보여줍니다.

Next.js(App Router) + Tailwind CSS, Vercel 배포용.

## ✨ 기능

- 채널 프로필/구독자 수를 보여주는 햄스터 톤앤매너 랜딩
- **동영상 / 쇼츠** 자동 분류 그리드 (썸네일 클릭 → 모달 플레이어 임베드)
- **라이브 방송 중**이면 자동 감지 후 상단에 라이브 플레이어 노출
- API 키가 없으면 RSS로 자동 폴백 (영상 목록은 그래도 표시)

## 🔑 왜 지난번 임베딩이 안 됐나?

YouTube는 채널 페이지(`youtube.com/@핸들`)를 iframe에 직접 넣는 걸
`X-Frame-Options`로 차단합니다. 임베딩이 되는 건 `/embed/` 엔드포인트뿐이에요:

- 영상/쇼츠 → `youtube-nocookie.com/embed/{VIDEO_ID}`
- 라이브 → `youtube-nocookie.com/embed/{LIVE_VIDEO_ID}` (또는 `live_stream?channel=ID`)

그래서 이 프로젝트는 **먼저 영상 ID 목록을 가져온 뒤 각 ID로 임베드**합니다.

## 🚀 시작하기

```bash
npm install
cp .env.example .env.local   # 그리고 YOUTUBE_API_KEY 채우기
npm run dev                  # http://localhost:3000
```

### YouTube API 키 발급 (약 2분)

1. https://console.cloud.google.com/ 접속 → 새 프로젝트 생성
2. **API 및 서비스 → 라이브러리** → "YouTube Data API v3" → **사용 설정**
3. **사용자 인증 정보 → 사용자 인증 정보 만들기 → API 키**
4. 만들어진 키를 `.env.local`의 `YOUTUBE_API_KEY=` 에 붙여넣기
5. (권장) API 키 제한 → "YouTube Data API v3"로만 제한

> 키가 없어도 RSS 폴백으로 영상 목록은 보입니다. 단, 쇼츠/라이브 구분과
> 조회수는 API 키가 있어야 정확합니다.

## ▲ Vercel 배포

1. 이 폴더를 GitHub 저장소로 푸시
2. [vercel.com](https://vercel.com) → New Project → 저장소 import
3. **Environment Variables** 에 추가:
   - `YOUTUBE_API_KEY` = (발급받은 키)
   - `NEXT_PUBLIC_CHANNEL_ID` = `UCmHeohP_NalyuChLdCGRxvw` (기본값, 다른 채널이면 변경)
   - `NEXT_PUBLIC_CHANNEL_HANDLE` = `bokhi-3637`
4. Deploy ✅

## ⚙️ 동작 방식 / 쿼터

- 페이지는 ISR(`revalidate = 120s`)로 캐싱됩니다. 라이브 감지도 이 주기로 갱신.
- 갱신 1회당 API 쿼터 약 3 units (channels + playlistItems + videos).
  하루 무료 한도 10,000 units 안에서 넉넉합니다.
- 라이브 감지는 업로드 목록의 `liveBroadcastContent === "live"` 로 판별해
  비싼 `search` 호출을 피합니다.

## 🎨 톤앤매너

채널 프로필의 골든 시리안 햄스터에서 추출한 팔레트 (`tailwind.config.ts`):
캐러멜 털(`fur`), 핑크 발(`paw`), 크림 배(`cream`), 우드 베딩(`sand`), 코코아 텍스트(`cocoa`).
