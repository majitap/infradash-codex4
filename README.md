# InfraDash 한글판

**배포 주소: https://majitap.github.io/infradash-codex3/**

[InfraDash Gemini Edition](https://majitap.github.io/infradash-gemni/)의 소스와 디자인을 바탕으로, 화면 한글화와 가독성을 개선한 별도 배포판입니다. 보라색 강조 카드, 캡슐형 막대 차트, 반원 게이지, 시간 추적 카드의 구성을 유지합니다.

원본 소스: [majitap/infradash-gemni](https://github.com/majitap/infradash-gemni). 원본 설명은 [README.gemini.md](README.gemini.md)에 보존했습니다. 원본의 Git 기록과 작성자 정보도 유지합니다.

## 변경 내용

- 대시보드, 사이드바, 검색, 버튼, 상태, 날짜, 접근성 레이블 한글화.
- 인프라 구성도, AI 운영 센터, 배포 성과 지표, 클라우드 비용 화면의 영문 제목·분류·등급 한글화.
- 반복되던 카드 제목을 `주간 빌드 추이`, `예정된 작업`, `팀 작업 현황`, `프로젝트 진행률`로 구체화.
- 원본의 나눔스퀘어 네오와 색상·라운드·카드 구성을 유지.
- 브라우저 기본값 16px 기준 본문 기반 크기 18px. 작은 설명은 약 13–15px, 일반 메뉴·라벨은 약 15–18px.
- 흐린 회색 설명의 대비를 개선하고, 한글 줄바꿈과 작은 화면의 검색창을 조정.
- 차트 축 글자 크기와 키보드 초점 표시 개선. 모션 감소 설정 지원.
- 빠른 이동 창에서 검색 컴포넌트의 필수 상위 컨텍스트가 빠져 발생하던 오류 수정.
- 코딩 폰트 Geist Mono는 패키지에 포함하여 빌드 시 Google Fonts 요청을 제거. 라이선스는 `public/licenses/Geist-Mono.txt`.
- 별도 경로 `/infradash-codex3/` 및 독립적인 테마 저장 키 사용.

GitLab, Gemini, AWS, Gitaly 등의 제품명과 API·CPU·CI/CD·DORA 등의 기술 약어, 저장소·브랜치·코드 식별자는 그대로 유지합니다.

## 데이터와 동작

모든 수치는 원본의 모의 데이터입니다. 실제 GitLab, 클라우드, Gemini API와 연결하지 않습니다. AI 대화는 미리 작성된 예시 응답이며, 조치·정리·추가 버튼은 데모 상태와 알림만 변경합니다.

원본의 모든 경로를 유지합니다: 대시보드, 파이프라인, 러너, 인프라 구성도, 배포 성과 지표, AI 운영 센터, 클라우드 비용, 스토리지, 보안, 업그레이드와 검색에서 접근하는 개발·사용자·권한·감사 화면.

## 개발

```sh
npm ci
npm run dev
# http://localhost:3000/infradash-codex3/
npm run lint
npx tsc --noEmit
npm run build
```

Next.js 16.4.3, Tailwind CSS v4, shadcn/ui, Recharts를 사용합니다. `output: "export"`, `basePath: "/infradash-codex3"`, `trailingSlash: true`로 `out/`에 정적 사이트를 생성합니다.

`main`에 푸시하면 GitHub Actions에서 검증·빌드 후 GitHub Pages에 배포합니다.

## 가독성 참고

- [Atlassian Typography](https://atlassian.design/foundations/typography): 글자 크기, 행간, 정보 위계.
- [Material 3 Applying type](https://m3.material.io/styles/typography/applying-type): 제목·본문·라벨의 역할 구분.

화면 구성은 Gemini Edition을 기준으로 유지하고, 이 지침은 글자와 설명의 가독성을 조정하는 데 참고했습니다.
