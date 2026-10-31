import {
  CircleArrowUpIcon,
  CoinsIcon,
  FolderGit2Icon,
  GaugeIcon,
  GitCommitHorizontalIcon,
  GitPullRequestIcon,
  HardDriveIcon,
  LayoutDashboardIcon,
  NetworkIcon,
  ScrollTextIcon,
  ServerIcon,
  ShieldCheckIcon,
  SirenIcon,
  SparklesIcon,
  UserCogIcon,
  UsersIcon,
  WorkflowIcon,
  type LucideIcon,
} from "lucide-react"

export type Tone = "indigo" | "emerald" | "amber" | "rose" | "sky" | "violet" | "teal" | "orange"

export type NavItem = {
  title: string
  url: string
  icon: LucideIcon
  description: string
  tone: Tone
  keywords?: string[]
}

export type NavGroup = {
  label: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    label: "AI 분석 및 운영",
    items: [
      { title: "AI 운영 센터", url: "/ai-ops", icon: SparklesIcon, description: "Gemini 기반 인프라 이상 탐지 및 자동 대응", tone: "violet", keywords: ["gemini", "ai", "ops", "anomaly", "이상탐지"] },
      { title: "인프라 구성도", url: "/topology", icon: NetworkIcon, description: "GitLab 풀스택 아키텍처 실시간 맵", tone: "sky", keywords: ["topology", "architecture", "map", "인프라", "토폴로지"] },
      { title: "배포 성과 지표", url: "/dora", icon: GaugeIcon, description: "엔지니어링 배포 속도와 안정성 지표", tone: "emerald", keywords: ["dora", "velocity", "배포빈도", "리드타임"] },
      { title: "클라우드 비용 분석", url: "/finops", icon: CoinsIcon, description: "클라우드 러너 및 스토리지 비용 최적화", tone: "amber", keywords: ["finops", "cost", "비용", "spot", "스팟"] },
    ],
  },
  {
    label: "모니터링",
    items: [
      { title: "개요", url: "/", icon: LayoutDashboardIcon, description: "조직 전체 상태를 한눈에", tone: "indigo", keywords: ["overview", "home", "대시보드"] },
      { title: "파이프라인", url: "/pipelines", icon: WorkflowIcon, description: "CI/CD 성공률, 소요 시간, 실패 원인", tone: "sky", keywords: ["pipelines", "ci", "cd", "jobs"] },
      { title: "러너", url: "/runners", icon: ServerIcon, description: "러너 상태와 용량", tone: "teal", keywords: ["runners", "executor"] },
      { title: "인시던트", url: "/incidents", icon: SirenIcon, description: "장애 현황, MTTR, 서비스 가용성", tone: "rose", keywords: ["incidents", "on-call", "장애"] },
    ],
  },
  {
    label: "개발 활동",
    items: [
      { title: "커밋", url: "/commits", icon: GitCommitHorizontalIcon, description: "주간 커밋 순위와 활동 패턴", tone: "violet", keywords: ["commits", "leaderboard", "순위", "기여"] },
      { title: "머지 리퀘스트", url: "/merge-requests", icon: GitPullRequestIcon, description: "리뷰 대기, 처리량, 머지 소요 시간", tone: "orange", keywords: ["merge requests", "mr", "review", "리뷰"] },
      { title: "프로젝트", url: "/projects", icon: FolderGit2Icon, description: "프로젝트 활동과 건강도", tone: "emerald", keywords: ["projects", "repositories", "저장소"] },
    ],
  },
  {
    label: "관리",
    items: [
      { title: "사용자", url: "/users", icon: UsersIcon, description: "계정, 입사자/퇴사자, 2FA", tone: "indigo", keywords: ["users", "members", "멤버", "계정"] },
      { title: "권한 관리", url: "/access", icon: UserCogIcon, description: "접근 요청 승인, 그룹 역할, 관리자 계정", tone: "orange", keywords: ["access", "permissions", "roles", "admin", "권한", "승인", "인가", "관리자"] },
      { title: "스토리지", url: "/storage", icon: HardDriveIcon, description: "저장소, 아티팩트, 레지스트리 사용량", tone: "amber", keywords: ["storage", "disk", "artifacts", "registry"] },
      { title: "보안", url: "/security", icon: ShieldCheckIcon, description: "취약점, 스캐너, 컴플라이언스", tone: "rose", keywords: ["security", "vulnerabilities", "취약점"] },
      { title: "감사 로그", url: "/audit", icon: ScrollTextIcon, description: "누가 무엇을 언제 변경했는지", tone: "sky", keywords: ["audit", "log", "events"] },
      { title: "업그레이드", url: "/upgrade", icon: CircleArrowUpIcon, description: "버전 업그레이드 경로와 체크리스트", tone: "violet", keywords: ["upgrade", "version", "release"] },
    ],
  },
]

export const navItems: NavItem[] = navGroups.flatMap((g) => g.items)

/** usePathname() may carry a trailing slash because of `trailingSlash: true`. */
export function normalizePath(pathname: string | null) {
  if (!pathname || pathname === "/") return "/"
  return pathname.replace(/\/+$/, "")
}

export function findNavItem(pathname: string | null) {
  const path = normalizePath(pathname)
  return navItems.find((item) => item.url === path)
}
