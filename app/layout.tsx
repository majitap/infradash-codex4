import type { Metadata } from "next";
import "@fontsource-variable/geist-mono";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import "./console.css";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { CommandMenuProvider } from "@/components/layout/command-menu";
import { SiteHeader } from "@/components/layout/site-header";
import { RouteContent } from "@/components/layout/route-content";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: { default: "InfraDash · 인프라, 한눈에", template: "%s · InfraDash" },
  description:
    "배포부터 운영까지, 필요한 정보만 선명하게. GitLab 인프라 운영 대시보드. 모의 데이터 데모입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning className="h-full">
      <body className="min-h-full antialiased">
        <a className="skip-to-content" href="#main-content">
          본문으로 건너뛰기
        </a>
        <ThemeProvider>
          <TooltipProvider>
            <CommandMenuProvider>
              <SidebarProvider
                style={
                  {
                    "--sidebar-width": "16rem",
                    "--header-height": "5rem",
                  } as React.CSSProperties
                }
              >
                <AppSidebar />
                <SidebarInset className="min-w-0">
                  <SiteHeader />
                  <div
                    id="main-content"
                    tabIndex={-1}
                    className="flex flex-1 flex-col"
                  >
                    <RouteContent>{children}</RouteContent>
                  </div>
                </SidebarInset>
              </SidebarProvider>
              <Toaster richColors position="top-right" />
            </CommandMenuProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
