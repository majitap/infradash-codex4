"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  ChevronDown,
  CircleHelp,
  FolderGit2,
  Gauge,
  HardDrive,
  LayoutDashboard,
  Network,
  Server,
  ShieldCheck,
  Siren,
  Sparkles,
  Workflow,
  Wallet,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const sections = [
  {
    label: "워크스페이스",
    items: [
      { label: "개요", href: "/", icon: LayoutDashboard },
      { label: "파이프라인", href: "/pipelines", icon: Workflow },
      { label: "러너", href: "/runners", icon: Server },
      { label: "인프라 구성도", href: "/topology", icon: Network },
      { label: "인시던트", href: "/incidents", icon: Siren },
    ],
  },
  {
    label: "인사이트",
    items: [
      { label: "배포 성과", href: "/dora", icon: Gauge },
      { label: "클라우드 비용", href: "/finops", icon: Wallet },
      { label: "AI 운영 센터", href: "/ai-ops", icon: Sparkles },
    ],
  },
  {
    label: "관리",
    items: [
      { label: "프로젝트", href: "/projects", icon: FolderGit2 },
      { label: "스토리지", href: "/storage", icon: HardDrive },
      { label: "보안", href: "/security", icon: ShieldCheck },
    ],
  },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()?.replace(/\/+$/, "") || "/";
  const { setOpenMobile } = useSidebar();
  const close = () => setOpenMobile(false);
  return (
    <Sidebar collapsible="offcanvas" className="app-sidebar" {...props}>
      <SidebarHeader className="brand-header">
        <Link
          href="/"
          onClick={close}
          className="brand-link"
          aria-label="InfraDash 홈"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="2"
              y="16"
              width="7"
              height="14"
              rx="3.5"
              fill="currentColor"
            />
            <rect
              x="12"
              y="2"
              width="7"
              height="28"
              rx="3.5"
              fill="currentColor"
            />
            <rect
              x="22"
              y="9"
              width="7"
              height="21"
              rx="3.5"
              fill="currentColor"
            />
          </svg>
          <span>
            infradash<span className="brand-period">.</span>
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="nav-content">
        <div className="workspace-label">
          <span className="workspace-symbol">M</span>
          <div>
            <strong>Majitap</strong>
            <span>GitLab 워크스페이스</span>
          </div>
        </div>
        <nav aria-label="주 메뉴" className="nav-sections">
          {sections.map((section) => (
            <div className="nav-section" key={section.label}>
              <p className="nav-label">{section.label}</p>
              <div className="nav-items">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="nav-link"
                  >
                    <item.icon size={20} strokeWidth={1.7} />
                    <span>{item.label}</span>
                    {item.href === "/incidents" && (
                      <span className="nav-count">2</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <details className="more-nav">
            <summary>
              더 보기
              <ChevronDown size={16} />
            </summary>
            <div className="nav-items">
              {[
                { label: "커밋", href: "/commits" },
                { label: "머지 리퀘스트", href: "/merge-requests" },
                { label: "사용자", href: "/users" },
                { label: "권한 관리", href: "/access" },
                { label: "감사 로그", href: "/audit" },
                { label: "버전 업그레이드", href: "/upgrade" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  onClick={close}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
        </nav>
      </SidebarContent>
      <SidebarFooter className="nav-footer">
        <Link href="/upgrade" className="nav-support" onClick={close}>
          <CircleHelp size={18} />
          <span>운영 가이드</span>
          <ArrowUpRight size={16} />
        </Link>
        <div className="sidebar-person">
          <span className="person-avatar">지</span>
          <div>
            <strong>김지원</strong>
            <span>인프라 관리자</span>
          </div>
          <span className="person-dot" title="온라인" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
