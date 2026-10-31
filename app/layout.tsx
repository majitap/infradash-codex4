import type { Metadata } from "next";
import "@fontsource-variable/geist-mono";
import "./globals.css";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { CommandMenuProvider } from "@/components/layout/command-menu";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: { default: "InfraDash 한글판", template: "%s · InfraDash 한글판" },
  description: "Gemini Edition의 디자인을 유지하고 한글화와 가독성을 개선한 GitLab 인프라 운영 콘솔. 모든 데이터와 AI 응답은 데모입니다.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning className="h-full">
      <body className="min-h-full bg-[#f4f6fa] text-slate-800 antialiased selection:bg-[#5551ff]/20">
        <a className="skip-to-content" href="#main-content">본문으로 건너뛰기</a>
        <ThemeProvider>
          <TooltipProvider>
            <CommandMenuProvider>
              <SidebarProvider
                style={
                  {
                    "--sidebar-width": "15rem",
                    "--header-height": "4.5rem",
                  } as React.CSSProperties
                }
              >
                <AppSidebar />
                <SidebarInset className="min-w-0 bg-[#f4f6fa]">
                  <SiteHeader />
                  <div id="main-content" tabIndex={-1} className="flex flex-1 flex-col py-2">
                    {children}
                    <footer className="mx-auto w-full max-w-7xl px-6 pb-6 text-xs leading-relaxed text-slate-500">
                      모의 데이터 기반 데모입니다. AI 진단과 조치는 실제 시스템에 연결되지 않습니다.
                    </footer>
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
