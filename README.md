# DINGA — Interactive Prototype

흩어진 공연 정보를 AI로 통합해서, 대학·인디 밴드와 관객, 그리고 공연 가능한 로컬 공간(카페·펍 등)을 연결하는 3-sided 마켓플레이스 프로토타입입니다. 대전권 한남대 일대 인디씬을 첫 타겟으로 합니다.

아이디어톤 발표용 **클릭 가능한 데모**로, 11개 화면(공통 3 / 관객 5 / 밴드 3)을 키보드와 마우스로 이동하며 시연할 수 있습니다.

## 화면 구성

- **공통** — 스플래시 / 온보딩 / 유저 타입 선택
- **관객** — 취향 입력 / 홈 추천 피드 / 지도 + 캘린더 / 공연 상세 / 예매 완료
- **밴드** — AI 자동 프로필 정제 / 공간 매칭 결과 / 원클릭 홍보

## 단축키

| 키 | 동작 |
|---|---|
| `←` `→` | 이전 / 다음 화면 |
| `space` | 시연 ↔ 전체보기 모드 토글 |
| `R` | 처음으로 |
| `F` | 발표 모드 (Esc로 종료) |
| `1` / `2` / `3` | 관객 / 밴드 / 공간 매칭 플로우로 점프 |

## 로컬에서 실행

순수 정적 사이트입니다. 어떤 정적 서버로도 띄울 수 있어요.

```bash
# Python
python -m http.server 5173

# Node (npx)
npx serve .
```

브라우저에서 `http://localhost:5173` 열기.

> React 18 UMD + Babel standalone을 CDN으로 로드합니다. JSX는 브라우저에서 트랜스파일되므로 첫 로드에 1–2초 정도 걸릴 수 있습니다.

## Vercel 배포

루트의 `vercel.json` 만으로 zero-build 정적 배포가 됩니다.

1. 이 저장소를 GitHub에 푸시
2. [vercel.com/new](https://vercel.com/new) → GitHub 리포 선택 → Import
3. Framework Preset은 **Other** 그대로 두고 Deploy

CLI를 쓴다면:

```bash
npm i -g vercel
vercel        # 미리보기 배포
vercel --prod # 프로덕션 배포
```

## 파일 구조

```
index.html                  — 진입점
context.jsx                 — 전역 상태 + 네비게이션
app.jsx                     — 셸/탑바/컨트롤바/모달 레이어
screens-common.jsx          — 스플래시·온보딩·유저 타입
screens-audience.jsx        — 관객 5화면
screens-band.jsx            — 밴드 3화면
styles.css                  — 브랜드 스타일
untitled-ui-tokens.css      — 디자인 토큰
vercel.json                 — 정적 호스팅 설정
```

## 디자인 가이드

- 메인 컬러: **다크 포레스트 그린** `#2D4A3E`
- 크림: `#F5F1E8`, 잉크: `#1A2B23`, 머스타드: `#D4A24C`
- 폰트: Caveat(손글씨), Pretendard(한글), Inter(영문)
- 무드: 인디·로컬·아날로그 감성의 따뜻한 톤

---

팀 일단사자 · 한남대 멋쟁이사자처럼 14기
