import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { CommandMenuProvider } from "@/components/layout/command-menu";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "InfraDash (Gemini Edition)", template: "%s · InfraDash Gemini" },
  description: "GitLab 인프라 관측성 & AI 운영 콘솔 (Gemini Edition). 모든 데이터는 모의 데이터입니다.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning className={`${geistMono.variable} h-full`}>
      <body className="min-h-full bg-[#f4f6fa] text-slate-800 antialiased selection:bg-[#5551ff]/20">
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
                  <main className="flex flex-1 flex-col py-2">
                    {children}
                  </main>
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
