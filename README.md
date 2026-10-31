# InfraDash 04

[사이트 열기](https://majitap.github.io/infradash-codex4/)

GitLab 인프라의 성과와 현재 상태, 다음 조치를 한눈에 확인하는 한국어 운영 대시보드입니다. 좋아했던 이전 버전의 보라색과 둥근 카드를 계승하고, 8px 간격 체계와 Pretendard로 새롭게 정리했습니다.

## 달라진 점

- 새로운 브랜드, 사이드바, 상단 탐색, 개요 화면. 카드 24px 간격, 내부 24px 여백, 기본 화면 32px 여백.
- 파이프라인 성공률과 실행 수는 선택한 7/30일의 같은 데이터로 계산합니다.
- 날짜별 차트 선택, 실행 상태 필터, 파이프라인 상세와 단계별 상태.
- 선택 기간의 원본 데이터를 CSV로 저장합니다.
- 검색, 운영 알림 이동, 밝고 어두운 테마, 모바일 메뉴.
- 파이프라인·러너·비용·DORA·구성도·보안 등 모든 기존 화면에 공통 여백과 글자 규칙 적용.
- 폰트 자체 호스팅, 포커스 표시, 모션 감소, 본문 바로가기.

상세 기준과 참고 자료는 [DESIGN.md](DESIGN.md)를 참고하세요.

## 데이터

2026년 10월 31일 기준 결정적 모의 데이터입니다. 실제 GitLab, 클라우드, AI API에 연결되지 않습니다. AI 응답과 조치 버튼은 예시 및 로컬 데모 상태를 표시합니다. 원본에 있던 여러 분석 데이터셋은 서로 다른 집계 범위이며, 첫 화면의 같은 항목은 같은 데이터에서 계산합니다.

## 개발 및 배포

```sh
npm ci
npm run dev
# http://localhost:3000/infradash-codex4/
npm run check:spacing
npm run lint
npx tsc --noEmit
npm run build
```

Next.js 정적 내보내기로 생성한 out/을 GitHub Pages에 배포합니다. main에 푸시하면 GitHub Actions에서 간격 검사·코드 검사·타입 검사·빌드 후 배포합니다.

## 출처

[infradash-codex3](https://github.com/majitap/infradash-codex3)와 [원본 Gemini Edition](https://github.com/majitap/infradash-gemni)의 데이터 모델, 분석 화면과 동작을 기반으로 했습니다. Git 기록과 원본 설명 [README.gemini.md](README.gemini.md)를 보존합니다. Pretendard와 Geist Mono의 라이선스는 public/licenses/에 포함합니다.
