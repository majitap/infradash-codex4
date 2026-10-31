# InfraDash (Gemini Edition)

✨ **GitLab 인프라 관측성 & AI 운영 콘솔 (Gemini Edition)**

Next.js(App Router), Tailwind CSS v4, shadcn/ui, Recharts를 기반으로 구현된 차세대 GitLab 엔터프라이즈 인프라 모니터링 & AI Ops 대시보드입니다.

- **Live URL**: [https://majitap.github.io/infradash-gemni/](https://majitap.github.io/infradash-gemni/)
- **기준 저장소**: `infradash` (Codex 버전)을 기반으로 확장 및 고도화

---

## 🌟 Gemini Edition 신규 & 특화 기능

| 메뉴 | 경로 | 설명 |
| --- | --- | --- |
| **AI Ops 센터** | `/ai-ops` | **Gemini 2.5 기반 실시간 이상 탐지**: AWS EKS 스팟 러너 사전 중단 예측, Gitaly Shard-02 I/O 병목 분석, 자연어 장애 원인 진단(Ask Gemini Infra), 1-클릭 자율 완화 실행 |
| **인프라 토폴로지** | `/topology` | **GitLab 풀스택 아키텍처 실시간 맵**: Cloudflare WAF → HAProxy LB → Rails Puma Pods → Praefect Gitaly 샤드 → PostgreSQL Patroni HA → Redis Sentinel → EKS / GPU 러너 플릿 트래픽 플로우 및 실시간 노드 텔레메트리 인스펙터 |
| **DORA 지표** | `/dora` | **구글 DORA 4대 핵심 지표 (Elite 등급)**: 배포 빈도(DF: 18.4회/일), 변경 리드 타임(LT: 42분), 변경 실패율(CFR: 1.8%), 서비스 복구 시간(MTTR: 14분) 및 마이크로서비스별 DORA 랭킹 |
| **FinOps 비용 분석** | `/finops` | **클라우드 러너 & 스토리지 비용 최적화**: 월간 지출($38,420), 스팟 인스턴스 절감액($14,280, 68.4% 채택), 유휴 자원 낭비 감지($2,840), 아티팩트 만료 및 고아 볼륨 회수 추천 |

---

## 📊 기존 주요 페이지

| 메뉴 | 경로 | 내용 |
| --- | --- | --- |
| **개요** | `/` | Gemini AI 이상 예측 배너, S1 인시던트 배너, 핵심 KPI 타일, 파이프라인 성공률 추이, 커밋 랭킹, 주간 활동 피드 |
| **파이프라인** | `/pipelines` | CI/CD 성공률, 소요 시간, 실패 단계, 프로젝트별 분석, 최근 파이프라인 |
| **러너** | `/runners` | 러너 상태 및 실행기별 분석, 부하율 추이, 러너 재시작/일시정지 시뮬레이션 |
| **인시던트** | `/incidents` | 온콜 현황, 월별 MTTR, 심각도 분포, 서비스 가용성 지표 |
| **커밋** | `/commits` | 주간/월간 커밋 랭킹 포디움, 연속 커밋 스트릭, 시간대별 히트맵 |
| **머지 리퀘스트** | `/merge-requests` | 처리량, 머지 소요 시간, 리뷰어 부하, 오래된 MR |
| **프로젝트** | `/projects` | 언어 분포, 그룹별 프로젝트 통계, 프로젝트 활동도 |
| **사용자** | `/users` | 역할 분포, 부서별 인원, 입사/퇴사 추이, 2FA 현황 |
| **권한 관리** | `/access` | 접근 요청 승인/반려, 그룹 권한 일괄 편집, 관리자 계정 정책 |
| **스토리지** | `/storage` | 리포지토리/아티팩트/레지스트리 용량 및 정리 후보 |
| **보안** | `/security` | 취약점 추이, 보안 스캐너 현황, 컴플라이언스 체크 |
| **감사 로그** | `/audit` | 이벤트 유형별 감사 기록 및 필터링 검색 |
| **업그레이드** | `/upgrade` | GitLab 버전 업그레이드 경로와 단계별 체크리스트 |

---

## 🛠️ 기술 스택

- **Framework**: Next.js 16.4.3 (App Router, Static Export `output: "export"`)
- **Styling**: Tailwind CSS v4, CSS Variables, `tw-animate-css`
- **UI Components**: shadcn/ui (`dashboard-01` 기반), Lucide Icons
- **Data Visualization**: Recharts, Custom Animated SVG Topology
- **Toast**: Sonner
- **Theme**: Light / Dark Mode (`next-themes`)
- **Deployment**: GitHub Actions → GitHub Pages (Base path: `/infradash-gemni`)

---

## 🚀 로컬 실행 & 빌드

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 정적 빌드 검증
npm run build
```
