"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ActivityIcon,
  CircleArrowUpIcon,
  CoinsIcon,
  GaugeIcon,
  HardDriveIcon,
  LayoutDashboardIcon,
  NetworkIcon,
  ServerIcon,
  ShieldCheckIcon,
  SparklesIcon,
  WorkflowIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  const currentPath = pathname ? pathname.replace(/\/+$/, "") || "/" : "/"

  const navSections = [
    {
      label: "MENU",
      items: [
        { label: "Dashboard", href: "/", icon: LayoutDashboardIcon },
        { label: "Pipelines", href: "/pipelines", icon: WorkflowIcon },
        { label: "Runners", href: "/runners", icon: ServerIcon },
        { label: "Topology", href: "/topology", icon: NetworkIcon },
        { label: "DORA Metrics", href: "/dora", icon: GaugeIcon },
      ],
    },
    {
      label: "INTELLIGENCE & OPS",
      items: [
        { label: "Gemini AI Ops", href: "/ai-ops", icon: SparklesIcon },
        { label: "FinOps Cost", href: "/finops", icon: CoinsIcon },
        { label: "Storage & Disk", href: "/storage", icon: HardDriveIcon },
        { label: "Security & Audit", href: "/security", icon: ShieldCheckIcon },
        { label: "Version Upgrade", href: "/upgrade", icon: CircleArrowUpIcon },
      ],
    },
  ]

  return (
    <Sidebar collapsible="offcanvas" className="border-r border-slate-200/70 bg-white" {...props}>
      {/* Brand Header */}
      <SidebarHeader className="px-6 py-5">
        <Link
          href="/"
          onClick={() => setOpenMobile(false)}
          className="flex items-center gap-2.5 group"
        >
          <div className="flex size-9 items-center justify-center rounded-2xl bg-[#5551ff] text-white shadow-sm shadow-[#5551ff]/30">
            <SparklesIcon className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-[#5551ff] transition-colors">
              infradash
            </span>
          </div>
        </Link>
      </SidebarHeader>

      {/* Nav Items */}
      <SidebarContent className="px-4 py-2 flex flex-col gap-6">
        {navSections.map((sec) => (
          <div key={sec.label} className="flex flex-col gap-1.5">
            <span className="px-3 text-[10px] font-bold tracking-wider text-slate-400">
              {sec.label}
            </span>
            <div className="flex flex-col gap-1">
              {sec.items.map((item) => {
                const isActive = currentPath === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpenMobile(false)}
                    className={`relative flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#5551ff] text-white shadow-sm shadow-[#5551ff]/25 font-bold"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <item.icon
                      className={`size-4 ${
                        isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </SidebarContent>

      {/* Bottom Info Card like coursie mobile app card */}
      <SidebarFooter className="p-4">
        <div className="relative overflow-hidden rounded-2xl bg-slate-950 p-4 text-white shadow-md">
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex size-7 items-center justify-center rounded-full bg-white/10 text-[#8b87ff]">
              <SparklesIcon className="size-3.5" />
            </div>
            <div>
              <h5 className="text-xs font-bold">GitLab EKS Fleet</h5>
              <p className="text-[10px] text-slate-400 mt-0.5">
                v17.2 · 145 Runners Active
              </p>
            </div>
            <Link
              href="/ai-ops"
              onClick={() => setOpenMobile(false)}
              className="mt-1 flex items-center justify-center rounded-xl bg-[#5551ff] py-1.5 text-[11px] font-bold text-white transition-opacity hover:opacity-90"
            >
              Gemini AI Status
            </Link>
          </div>
          {/* Subtle decorative circles */}
          <div className="absolute -right-4 -bottom-4 size-24 rounded-full bg-[#5551ff]/20 blur-xl pointer-events-none" />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
