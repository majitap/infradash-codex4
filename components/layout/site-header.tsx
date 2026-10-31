"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BellIcon, ChevronDownIcon, MailIcon, SearchIcon, SparklesIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { useCommandMenu } from "@/components/layout/command-menu"
import { findNavItem } from "@/lib/nav"

export function SiteHeader() {
  const item = findNavItem(usePathname())
  const { setOpen } = useCommandMenu()

  return (
    <header className="sticky top-0 z-20 flex h-18 shrink-0 items-center bg-[#f4f6fa]/90 px-6 backdrop-blur-md transition-colors">
      <div className="flex w-full items-center gap-4">
        {/* Mobile trigger */}
        <SidebarTrigger className="md:hidden" />

        {/* Search Bar - Clean Pill shape like reference image */}
        <div className="flex-1 max-w-md">
          <button
            onClick={() => setOpen(true)}
            className="flex w-full items-center gap-3 rounded-full border border-slate-200/80 bg-white px-4 py-2.5 text-xs text-slate-400 shadow-xs transition-all hover:border-slate-300 hover:shadow-sm"
          >
            <SearchIcon className="size-4 text-slate-400" />
            <span className="flex-1 text-left">Search pipelines, runners, projects...</span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
              ⌘K
            </span>
          </button>
        </div>

        {/* Right Action Icons & User Profile */}
        <div className="ml-auto flex items-center gap-3">
          {/* Quick AI Trigger Pill */}
          <Link
            href="/ai-ops"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#5551ff]/10 px-3 py-1.5 text-xs font-semibold text-[#5551ff] transition-colors hover:bg-[#5551ff]/20"
          >
            <SparklesIcon className="size-3.5" />
            <span>Gemini AI</span>
          </Link>

          {/* Mail icon circle */}
          <button
            onClick={() => setOpen(true)}
            className="flex size-10 items-center justify-center rounded-full border border-slate-200/70 bg-white text-slate-500 shadow-xs transition-all hover:bg-slate-50 hover:text-slate-700"
            aria-label="Messages"
          >
            <MailIcon className="size-4" />
          </button>

          {/* Notification bell circle */}
          <button
            onClick={() => setOpen(true)}
            className="relative flex size-10 items-center justify-center rounded-full border border-slate-200/70 bg-white text-slate-500 shadow-xs transition-all hover:bg-slate-50 hover:text-slate-700"
            aria-label="Notifications"
          >
            <BellIcon className="size-4" />
            <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-[#5551ff]" />
          </button>

          {/* User Profile Card like reference image */}
          <div className="hidden sm:flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white p-1.5 pr-3 shadow-xs">
            <Avatar className="size-8 rounded-xl bg-linear-to-tr from-[#5551ff] to-[#807dff] text-white">
              <AvatarFallback className="bg-transparent text-xs font-bold text-white">
                KJ
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-xs font-bold text-slate-800">Kim Jiwon</span>
              <span className="text-[10px] text-slate-400">Infra Lead</span>
            </div>
            <ChevronDownIcon className="size-3.5 text-slate-400" />
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
