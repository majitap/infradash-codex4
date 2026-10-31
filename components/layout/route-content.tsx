"use client";

import { usePathname } from "next/navigation";
import { findNavItem, normalizePath } from "@/lib/nav";

const ownHeadings = ["/", "/ai-ops", "/topology", "/dora", "/finops"];
export function RouteContent({ children }: { children: React.ReactNode }) {
  const path = normalizePath(usePathname());
  const page = findNavItem(path);
  return (
    <div className="route-content @container/main">
      {!ownHeadings.includes(path) && (
        <div className="route-heading">
          <p className="eyebrow">GITLAB / MAJITAP</p>
          <h1>{page?.title}</h1>
          <p>{page?.description}</p>
        </div>
      )}
      {children}
      <footer className="site-footer">
        <span>
          <span className="footer-dot" /> 데모 워크스페이스
        </span>
        <span>
          2026.10.31 기준 모의 데이터 · 실제 인프라에 연결되지 않습니다.
        </span>
      </footer>
    </div>
  );
}
