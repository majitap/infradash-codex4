"use client"

import * as React from "react"
import {
  AwardIcon,
  CheckCircle2Icon,
  ClockIcon,
  GaugeIcon,
  RocketIcon,
  TrendingUpIcon,
} from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { doraMetrics, doraServiceRankings } from "@/lib/mock-data"

export function DoraView() {
  return (
    <div className="flex flex-col gap-6 px-6 pb-12 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            DORA Velocity & Reliability
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            DevOps Research and Assessment(DORA) 4대 핵심 지표를 기반으로 한 소프트웨어 전달 성능
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 text-xs font-bold text-emerald-600">
          <AwardIcon className="size-4" />
          Elite Tier Organization
        </span>
      </div>

      {/* 4 Core DORA Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {doraMetrics.map((item, idx) => (
          <div
            key={item.key}
            className={`rounded-3xl p-5 shadow-xs flex flex-col justify-between min-h-[140px] transition-transform hover:-translate-y-0.5 ${
              idx === 0
                ? "bg-[#5551ff] text-white shadow-sm shadow-[#5551ff]/20"
                : "bg-white border border-slate-200/70"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold ${idx === 0 ? "text-white/90" : "text-slate-500"}`}>
                {item.title.split(" (")[0]}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                idx === 0 ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
              }`}>
                {item.tier}
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-black tracking-tight ${idx === 0 ? "text-white" : "text-slate-900"}`}>
                  {item.value}
                </span>
                <span className={`text-xs font-medium ${idx === 0 ? "text-white/80" : "text-slate-400"}`}>
                  {item.unit}
                </span>
                <span className={`ml-auto text-xs font-bold ${idx === 0 ? "text-white" : "text-emerald-500"}`}>
                  {item.delta}
                </span>
              </div>
              <p className={`mt-1 text-xs leading-relaxed ${idx === 0 ? "text-white/80" : "text-slate-400"}`}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Service-Level DORA Table */}
      <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-xs flex flex-col gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">서비스별 DORA 지표 현황</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            주요 마이크로서비스 및 파이프라인별 엔지니어링 속도 비교
          </p>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100">
                <TableHead className="text-xs font-bold text-slate-400">서비스 리포지토리</TableHead>
                <TableHead className="text-xs font-bold text-slate-400">담당 팀</TableHead>
                <TableHead className="text-xs font-bold text-slate-400">배포 빈도 (DF)</TableHead>
                <TableHead className="text-xs font-bold text-slate-400">변경 리드 타임 (LT)</TableHead>
                <TableHead className="text-xs font-bold text-slate-400">변경 실패율 (CFR)</TableHead>
                <TableHead className="text-xs font-bold text-slate-400">복구 시간 (MTTR)</TableHead>
                <TableHead className="text-right text-xs font-bold text-slate-400">DORA 등급</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doraServiceRankings.map((svc) => (
                <TableRow key={svc.name} className="border-slate-100 hover:bg-slate-50/60">
                  <TableCell className="font-mono font-bold text-xs text-slate-900">{svc.name}</TableCell>
                  <TableCell className="text-xs text-slate-500">{svc.team}</TableCell>
                  <TableCell className="font-mono text-xs text-slate-700">{svc.df}</TableCell>
                  <TableCell className="font-mono text-xs text-slate-700">{svc.lt}</TableCell>
                  <TableCell className="font-mono text-xs text-emerald-600 font-semibold">{svc.cfr}</TableCell>
                  <TableCell className="font-mono text-xs text-slate-700">{svc.mttr}</TableCell>
                  <TableCell className="text-right">
                    <span className="rounded-full bg-[#5551ff]/10 text-[#5551ff] px-2.5 py-0.5 text-[10px] font-bold">
                      {svc.tier}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
