"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowUpRightIcon,
  CheckCircle2Icon,
  CircleIcon,
  LayersIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  RefreshCwIcon,
  RocketIcon,
  ServerIcon,
  SparklesIcon,
  WorkflowIcon,
  ZapIcon,
} from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function OverviewView() {
  const [isRunning, setIsRunning] = React.useState(true)

  // Daily activity pill bar heights (matching the reference image's Project Analytics pill chart)
  const dailyData = [
    { day: "M", height: "72%", count: 184 },
    { day: "T", height: "94%", count: 242 },
    { day: "W", height: "65%", count: 168 },
    { day: "T", height: "88%", count: 226 },
    { day: "F", height: "100%", count: 258 },
    { day: "S", height: "35%", count: 88 },
    { day: "S", height: "42%", count: 104 },
  ]

  return (
    <div className="flex flex-col gap-6 px-6 pb-12 max-w-7xl mx-auto w-full">
      {/* 1. Page Title & Action Buttons like reference image */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            A quick view of your GitLab infrastructure and team pipelines.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            onClick={() => toast.success("새 파이프라인 트리거 요청이 전송되었습니다.")}
            className="rounded-full bg-[#5551ff] hover:bg-[#4743eb] text-white text-xs font-bold px-5 h-10 shadow-sm shadow-[#5551ff]/25"
          >
            <PlusIcon className="size-3.5 mr-1" />
            Add Pipeline
          </Button>

          <Link
            href="/runners"
            className="inline-flex items-center justify-center rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold px-5 h-10 shadow-xs transition-colors"
          >
            Runner Fleet
          </Link>
        </div>
      </div>

      {/* 2. Top 4 Metric KPI Cards (1 highlighted solid royal periwinkle, 3 crisp white) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Highlighted Card in Solid Royal Periwinkle */}
        <div className="rounded-3xl bg-[#5551ff] text-white p-5 shadow-sm shadow-[#5551ff]/20 flex flex-col justify-between min-h-[140px] transition-transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white/90">
              Pipeline Success
            </span>
            <div className="flex size-7 items-center justify-center rounded-full bg-white/20 text-white">
              <ArrowUpRightIcon className="size-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black tracking-tight">98.4%</div>
            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-white/80">
              <span className="inline-block size-1.5 rounded-full bg-emerald-300" />
              <span>Increased from last month</span>
            </div>
          </div>
        </div>

        {/* Card 2: White Card */}
        <div className="rounded-3xl bg-white border border-slate-200/70 p-5 shadow-xs flex flex-col justify-between min-h-[140px] transition-transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Active Runners
            </span>
            <div className="flex size-7 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <ArrowUpRightIcon className="size-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black tracking-tight text-slate-900">145</div>
            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className="inline-block size-1.5 rounded-full bg-[#5551ff]" />
              <span>Increased from last month</span>
            </div>
          </div>
        </div>

        {/* Card 3: White Card */}
        <div className="rounded-3xl bg-white border border-slate-200/70 p-5 shadow-xs flex flex-col justify-between min-h-[140px] transition-transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Pending Deploys
            </span>
            <div className="flex size-7 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <ArrowUpRightIcon className="size-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black tracking-tight text-slate-900">32</div>
            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className="inline-block size-1.5 rounded-full bg-amber-400" />
              <span>All review apps healthy</span>
            </div>
          </div>
        </div>

        {/* Card 4: White Card */}
        <div className="rounded-3xl bg-white border border-slate-200/70 p-5 shadow-xs flex flex-col justify-between min-h-[140px] transition-transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Lead Time for Changes
            </span>
            <div className="flex size-7 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <ArrowUpRightIcon className="size-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black tracking-tight text-slate-900">24m</div>
            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className="inline-block size-1.5 rounded-full bg-emerald-400" />
              <span>Elite DORA tier benchmark</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Middle Row (Pill Bar Chart + Gemini Quick Card + Recent Deployments) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Project Analytics Capsule Bar Chart (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/70 p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-800">
              Project Analytics
            </h3>
            <span className="text-[11px] text-slate-400">Weekly Builds</span>
          </div>

          {/* Capsule/Pill Bar Chart directly matching the reference image */}
          <div className="flex items-end justify-between gap-3 h-40 pt-4 px-2">
            {dailyData.map((d) => (
              <div key={d.day} className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
                <div className="relative w-full max-w-[34px] h-32 rounded-full bg-slate-100 flex flex-col justify-end p-1 transition-all hover:bg-slate-200/70">
                  <div
                    style={{ height: d.height }}
                    className="w-full rounded-full bg-[#5551ff] transition-all duration-500 shadow-xs"
                    title={`${d.count} builds`}
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-400">
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Gemini AI Quick Insight Card (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl bg-white border border-slate-200/70 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-800">
                Gemini AI Insights
              </span>
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h4 className="text-base font-black text-[#5551ff] mt-2 leading-tight">
              Cluster Healthy & Optimized
            </h4>
            <p className="text-[11px] text-slate-400 mt-1">
              Time · 24m avg cycle time
            </p>

            <p className="text-xs text-slate-600 mt-4 leading-relaxed">
              EKS 스팟 인스턴스 64대가 안정적으로 자동 할당되어 있으며, 전체 118개 인프라 노드가 정상 가동 중입니다.
            </p>
          </div>

          <Link
            href="/ai-ops"
            className="w-full mt-5 inline-flex items-center justify-center rounded-2xl bg-[#5551ff] hover:bg-[#4743eb] text-white text-xs font-bold h-10 shadow-sm shadow-[#5551ff]/20 transition-colors"
          >
            <SparklesIcon className="size-3.5 mr-2" />
            Start AI Diagnostics
          </Link>
        </div>

        {/* Right: Recent Deployments (3 cols) */}
        <div className="lg:col-span-3 rounded-3xl bg-white border border-slate-200/70 p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-800">
              Project Analytics
            </h3>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
              + New
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-xs font-bold">
                <WorkflowIcon className="size-3.5" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-bold text-slate-800 truncate">Develop API Endpoints</span>
                <span className="text-[10px] text-slate-400 truncate">Due date: Oct 28, 2026</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 text-xs font-bold">
                <CheckCircle2Icon className="size-3.5" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-bold text-slate-800 truncate">Onboarding Flow</span>
                <span className="text-[10px] text-slate-400 truncate">Due date: Oct 26, 2026</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600 text-xs font-bold">
                <RocketIcon className="size-3.5" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-bold text-slate-800 truncate">Build Dashboard</span>
                <span className="text-[10px] text-slate-400 truncate">Due date: Oct 24, 2026</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 text-xs font-bold">
                <ZapIcon className="size-3.5" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-bold text-slate-800 truncate">Optimize Page Load</span>
                <span className="text-[10px] text-slate-400 truncate">Due date: Oct 21, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row (Active Services + 41% Gauge Meter + Dark Uptime Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Active Services / Team list (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/70 p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-800">
              Project Analytics
            </h3>
            <button
              onClick={() => toast.success("멤버 초대 창이 열립니다.")}
              className="rounded-full bg-slate-100 hover:bg-slate-200 px-3 py-1 text-[10px] font-bold text-slate-600 transition-colors"
            >
              + Add Member
            </button>
          </div>

          <div className="flex flex-col gap-3.5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar className="size-8 rounded-full bg-indigo-100 text-[#5551ff]">
                  <AvatarFallback className="text-xs font-bold">AD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800">Alexandria Deff</span>
                  <span className="text-[10px] text-slate-400">Working on GitHub Project Repository</span>
                </div>
              </div>
              <span className="rounded-full bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 text-[10px] font-bold text-[#5551ff]">
                Completed
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar className="size-8 rounded-full bg-amber-100 text-amber-700">
                  <AvatarFallback className="text-xs font-bold">EA</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800">Edwin Adenike</span>
                  <span className="text-[10px] text-slate-400">Integrated User Authentication System</span>
                </div>
              </div>
              <span className="rounded-full bg-amber-50 border border-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-600">
                In Progress
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar className="size-8 rounded-full bg-rose-100 text-rose-700">
                  <AvatarFallback className="text-xs font-bold">IO</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800">Isaac Oluwatemilorun</span>
                  <span className="text-[10px] text-slate-400">Working on Desktop Search and Filter</span>
                </div>
              </div>
              <span className="rounded-full bg-rose-50 border border-rose-100 px-2.5 py-0.5 text-[10px] font-bold text-rose-600">
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* Center: Semicircle Progress Gauge 41% like reference image (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl bg-white border border-slate-200/70 p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-800">
              Project Analytics
            </h3>
            <span className="text-[10px] text-slate-400">Cluster Capacity</span>
          </div>

          {/* Semicircle Gauge Graphic matching screenshot */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative flex flex-col items-center justify-center">
              <svg viewBox="0 0 160 85" className="w-48 overflow-visible">
                {/* Background arc */}
                <path
                  d="M 15 80 A 65 65 0 0 1 145 80"
                  fill="none"
                  stroke="#e8ebf8"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                {/* Progress arc (41% filled) */}
                <path
                  d="M 15 80 A 65 65 0 0 1 145 80"
                  fill="none"
                  stroke="#5551ff"
                  strokeWidth="16"
                  strokeDasharray="204"
                  strokeDashoffset="120"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute bottom-0 flex flex-col items-center">
                <span className="text-3xl font-black text-slate-900 tracking-tight">41%</span>
                <span className="text-[10px] font-semibold text-slate-400">Project Ended</span>
              </div>
            </div>

            {/* Legend below matching reference image */}
            <div className="mt-4 flex items-center justify-center gap-3 text-[10px] text-slate-400 font-semibold">
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-[#5551ff]" />
                Completed
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-[#8b87ff]" />
                In Progress
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-[#e8ebf8]" />
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* Right: Dark Navy Uptime Card like Time Tracker in reference image (3 cols) */}
        <div className="lg:col-span-3 rounded-3xl bg-slate-950 text-white p-6 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white/90">
              Time Tracker
            </span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
              LIVE
            </span>
          </div>

          <div className="my-auto py-3 text-center">
            <div className="text-2xl sm:text-3xl font-mono font-black tracking-wider text-white">
              01:24:08
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Active Run · 99.99% Availability
            </p>
          </div>

          {/* Action buttons like in screenshot */}
          <div className="flex items-center justify-center gap-3 mt-2">
            <button
              onClick={() => {
                setIsRunning(!isRunning)
                toast.success(isRunning ? "러너 모니터링 일시정지" : "러너 모니터링 재개")
              }}
              className="flex size-10 items-center justify-center rounded-full bg-white text-slate-900 hover:bg-slate-100 transition-colors shadow-xs"
              aria-label="Pause"
            >
              {isRunning ? <PauseIcon className="size-4 fill-slate-900" /> : <PlayIcon className="size-4 fill-slate-900 ml-0.5" />}
            </button>
            <button
              onClick={() => toast.success("새 측정 세션이 시작되었습니다.")}
              className="flex size-10 items-center justify-center rounded-full bg-rose-500 hover:bg-rose-600 text-white transition-colors shadow-xs"
              aria-label="Stop"
            >
              <div className="size-3 rounded-xs bg-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
