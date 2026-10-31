"use client"

import * as React from "react"
import { CheckCircle2Icon, PiggyBankIcon } from "lucide-react"
import { toast } from "sonner"



import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { finOpsCostBreakdown, finOpsData, finOpsSavingsRecommendations } from "@/lib/mock-data"

export function FinOpsView() {
  const [recs, setRecs] = React.useState(finOpsSavingsRecommendations)

  const handleApplyRec = (id: string, title: string) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 800)),
      {
        loading: `${title} 최적화 적용 중...`,
        success: () => {
          setRecs((prev) => prev.filter((r) => r.id !== id))
          return `최적화 정책이 적용되었습니다.`
        },
        error: "적용 중 오류 발생",
      }
    )
  }

  return (
    <div className="flex flex-col gap-6 px-6 pb-12 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            클라우드 비용 분석
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            GitLab EKS 컴퓨팅, Gitaly 볼륨, 아티팩트 스토리지 및 네트워크 전송 비용 분석
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 text-xs font-bold text-[#5551ff]">
          <PiggyBankIcon className="size-4" />
          월간 $14,280 스팟 절감 달성 중
        </span>
      </div>

      {/* Top 4 FinOps KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-3xl bg-[#5551ff] text-white p-5 shadow-sm shadow-[#5551ff]/20 flex flex-col justify-between min-h-[140px] transition-transform hover:-translate-y-0.5">
          <span className="text-xs font-semibold text-white/90">월간 총 인프라 비용</span>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black tracking-tight">
                ${finOpsData.monthlyTotal.toLocaleString()}
              </span>
              <span className="ml-auto text-xs font-bold text-emerald-300">
                {finOpsData.monthlyDelta}% 전월 대비
              </span>
            </div>
            <p className="mt-1 text-xs text-white/80">전월 대비 $5,420 절감</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200/70 p-5 shadow-xs flex flex-col justify-between min-h-[140px] transition-transform hover:-translate-y-0.5">
          <span className="text-xs font-semibold text-slate-500">스팟 인스턴스 절감액</span>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black tracking-tight text-emerald-600">
                ${finOpsData.spotSavings.toLocaleString()}
              </span>
              <span className="ml-auto text-xs font-bold text-slate-400">
                {finOpsData.spotRatio}% 채택
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">온디맨드 대비 68.4% 절감</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200/70 p-5 shadow-xs flex flex-col justify-between min-h-[140px] transition-transform hover:-translate-y-0.5">
          <span className="text-xs font-semibold text-slate-500">유휴 자원 낭비</span>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black tracking-tight text-amber-500">
                ${finOpsData.idleWaste.toLocaleString()}
              </span>
              <span className="ml-auto text-xs font-bold text-slate-400">/ 월</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">고아 아티팩트 및 정지된 러너</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200/70 p-5 shadow-xs flex flex-col justify-between min-h-[140px] transition-transform hover:-translate-y-0.5">
          <span className="text-xs font-semibold text-slate-500">회수 가능 스토리지</span>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black tracking-tight text-slate-900">
                {finOpsData.reclaimableStorage}
              </span>
              <span className="ml-auto text-xs font-bold text-emerald-500">만료 대상</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">미사용 컨테이너 이미지 & 캐시</p>
          </div>
        </div>
      </div>

      {/* Cost Breakdown & Recommendations */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-xs flex flex-col gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">인프라 항목별 지출 상세</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              지난 30일 기준 GitLab 운영 인프라 컴포넌트별 클라우드 비용 구성
            </p>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-100">
                  <TableHead className="text-xs font-bold text-slate-400">인프라 서비스</TableHead>
                  <TableHead className="text-xs font-bold text-slate-400">월 비용 (USD)</TableHead>
                  <TableHead className="text-xs font-bold text-slate-400">비중</TableHead>
                  <TableHead className="text-right text-xs font-bold text-slate-400">상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {finOpsCostBreakdown.map((row) => (
                  <TableRow key={row.category} className="border-slate-100 hover:bg-slate-50/60">
                    <TableCell className="font-medium text-xs text-slate-800">{row.category}</TableCell>
                    <TableCell className="font-mono text-xs font-bold text-slate-900">${row.cost.toLocaleString()}</TableCell>
                    <TableCell className="text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div style={{ width: `${row.percentage}%` }} className="h-full bg-[#5551ff] rounded-full" />
                        </div>
                        <span className="text-slate-400 text-[0.7778rem] font-semibold">{row.percentage}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[0.7222rem] font-bold text-slate-600">
                        {row.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="lg:col-span-4 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-xs flex flex-col gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">비용 최적화 추천</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              즉시 실행 가능한 클라우드 비용 절감 조치
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {recs.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 text-center text-xs text-slate-400">
                <CheckCircle2Icon className="size-8 text-emerald-500 mb-2" />
                모든 추천 최적화가 적용되었습니다!
              </div>
            ) : (
              recs.map((rec) => (
                <div key={rec.id} className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-[#fbfcfd] p-3.5 text-xs">
                  <div className="flex items-start justify-between gap-1">
                    <span className="font-bold text-slate-800 leading-tight">{rec.title}</span>
                    <span className="rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 text-[0.7222rem] font-bold shrink-0">
                      {rec.impact}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[0.7778rem] leading-relaxed">
                    {rec.description}
                  </p>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 mt-1">
                    <span className="text-[0.7222rem] text-slate-400">난이도: {rec.effort}</span>
                    <button
                      onClick={() => handleApplyRec(rec.id, rec.title)}
                      className="rounded-full bg-[#5551ff] hover:bg-[#4743eb] text-white px-3 py-1 text-[0.7778rem] font-bold shadow-xs transition-colors"
                    >
                      적용하기
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
