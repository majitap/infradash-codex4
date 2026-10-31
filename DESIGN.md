# InfraDash 04 디자인 규칙

좋은 정보 위계와 반복 가능한 여백을 중심으로 다듬은 GitLab 운영 대시보드입니다. 특정 회사의 디자인 복제품이나 공식 가이드를 준수한다고 주장하지 않습니다.

## 간격

모든 UI 여백과 그룹 간 간격은 **8 / 16 / 24 / 32 / 40 / 48 / 64px**를 사용합니다. 루트 글자 크기를 16px로 두어 Tailwind의 짝수 간격 유틸리티가 이 값에 대응하도록 했습니다.

| 용도                       | 값   |
| -------------------------- | ---- |
| 아이콘과 레이블, 관련 문구 | 8px  |
| 컨트롤 내부, 목록 요소     | 16px |
| 카드 내부, 카드 사이       | 24px |
| 페이지 여백, 섹션 사이     | 32px |
| 넓은 화면 바깥 여백        | 48px |

타이포그래피, 선 굵기, 아이콘의 도형 크기, 비율로 계산되는 차트 높이는 여백 토큰과 별도로 관리합니다. 유동 레이아웃의 열 너비를 억지로 8px 배수에 고정하지 않습니다.

## 글자와 색

- Pretendard Variable을 패키지에 포함해 자체 호스팅합니다. 원격 폰트 서버가 필요하지 않습니다.
- 페이지 제목 32/40px, 섹션 제목 20/32px, 주요 숫자 40/48px를 기준으로 합니다.
- 본문은 14–16px, 보조 수치와 메타 정보는 12–13px로 구분합니다.
- 한 화면에서 가장 중요한 성공률 지표에 보라색 면을 사용합니다. 나머지 카드는 중립색으로 유지합니다.
- 상태는 색과 함께 텍스트 또는 기호로 표시합니다. 키보드 포커스, 모션 감소 설정을 지원합니다.

## 정보와 동작

첫 화면은 성과 지표 → 실행 추이와 러너 여유 → 최근 실행과 필요한 조치 순서입니다. 장식용 타이머와 업무 목록을 운영 데이터로 대체했습니다.

7/30일 기간 선택은 같은 데이터셋으로 성공률·총합·차트·CSV를 갱신합니다. 실행 상태 필터, 날짜 선택, 파이프라인 상세, 알림 이동, 검색, 테마, 모바일 메뉴가 동작합니다. 실제 GitLab API나 AI API는 연결되어 있지 않습니다.

## 참고 자료

- [Apple HIG · Layout](https://developer.apple.com/design/human-interface-guidelines/layout): 일관된 간격과 화면 변화에 대응하는 배치.
- [Apple HIG · Typography](https://developer.apple.com/design/human-interface-guidelines/typography): 정보 위계와 읽기 쉬운 텍스트.
- [토스 디자인팀 인터뷰](https://toss.im/tossfeed/article/toss-designer-interview): 공통 디자인 언어와 간결한 다음 행동.
- [CMS Design System · Spacing](https://design.cms.gov/foundation/spacing/): 8px 단위의 간격 체계.
- [기반 프로젝트](https://github.com/majitap/infradash-codex3), [최초 Gemini 프로젝트](https://github.com/majitap/infradash-gemni): 데이터 모델, 분석 화면 및 기존 상호작용을 계승했습니다.
