import "./globals.css";

export const metadata = {
  title: "취플 - 오늘의 취미를 플레이하세요",
  description: "한국인들을 위한 위치 기반 취미 플레이 및 소모임 매칭 서비스",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" as="style" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
