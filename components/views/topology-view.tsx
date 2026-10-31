"use client"

import * as React from "react"
import { ActivityIcon, CheckCircle2Icon, CpuIcon, HardDriveIcon, RefreshCwIcon, SparklesIcon } from "lucide-react"
import { toast } from "sonner"


import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { topologyNodes, type TopologyNode } from "@/lib/mock-data"

export function TopologyView() {
  const [selectedNode, setSelectedNode] = React.useState<TopologyNode>(topologyNodes[2]) // Default to GitLab Rails
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all")

  const filteredNodes = categoryFilter === "all"
    ? topologyNodes
    : topologyNodes.filter((n) => n.category === categoryFilter)

  const categories = [
    { key: "all", label: "전체 아키텍처" },
    { key: "edge", label: "엣지·부하 분산" },
    { key: "app", label: "애플리케이션" },
    { key: "storage", label: "Gitaly 스토리지" },
    { key: "database", label: "데이터베이스 & 캐시" },
    { key: "runner", label: "러너 구성" },
    { key: "object", label: "오브젝트 스토리지" },
  ]

  return (
    <div className="flex flex-col gap-6 px-6 pb-12 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            인프라 구성도
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Cloudflare 엣지부터 Rails Puma, Praefect, PostgreSQL, EKS 러너 플릿까지의 실시간 아키텍처
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => toast.success("토폴로지 메트릭을 동기화했습니다.")}
            className="rounded-full bg-white hover:bg-slate-50 border-slate-200 text-xs font-bold px-4 h-9 shadow-xs text-slate-700"
          >
            <RefreshCwIcon className="size-3.5 mr-1.5" />
            새로고침
          </Button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setCategoryFilter(c.key)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              categoryFilter === c.key
                ? "bg-[#5551ff] text-white shadow-xs font-bold"
                : "bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Architecture Flow + Selected Node Detail */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Architecture Grid (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {filteredNodes.map((node) => {
              const isSelected = selectedNode.id === node.id
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`group relative flex cursor-pointer flex-col justify-between rounded-3xl border p-5 transition-all ${
                    isSelected
                      ? "border-[#5551ff] bg-white ring-2 ring-[#5551ff]/20 shadow-md"
                      : "border-slate-200/70 bg-white hover:border-[#5551ff]/50 shadow-xs"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`size-2.5 rounded-full ${
                        node.status === "healthy" ? "bg-emerald-400" : "bg-amber-400"
                      }`} />
                      <span className="text-[0.7778rem] font-bold text-slate-400">
                        {node.categoryLabel}
                      </span>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[0.6667rem] font-mono text-slate-500 font-semibold">
                      {node.zone}
                    </span>
                  </div>

                  <div className="my-3">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#5551ff] transition-colors">
                      {node.name}
                    </h4>
                    <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                      {node.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs text-slate-500">
                    {node.metrics.cpu !== undefined ? (
                      <span className="flex items-center gap-1 text-[0.7778rem]">
                        <CpuIcon className="size-3 text-slate-400" />
                        CPU {node.metrics.cpu}%
                      </span>
                    ) : node.metrics.storage ? (
                      <span className="flex items-center gap-1 text-[0.7778rem]">
                        <HardDriveIcon className="size-3 text-slate-400" />
                        {node.metrics.storage}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[0.7778rem]">
                        <ActivityIcon className="size-3 text-slate-400" />
                        {node.metrics.qps ?? "정상"}
                      </span>
                    )}

                    {node.metrics.latency && (
                      <span className="font-mono text-slate-800 font-bold text-[0.7778rem]">
                        {node.metrics.latency}
                      </span>
                    )}
                    {node.metrics.instances && (
                      <span className="font-mono text-slate-800 font-bold text-[0.7778rem]">
                        {node.metrics.instances}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Selected Node Real-time Inspector (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-xs sticky top-24 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {selectedNode.categoryLabel}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                <CheckCircle2Icon className="size-3.5" />
                {selectedNode.status === "healthy" ? "정상" : "주의"}
              </span>
            </div>

            <div>
              <h3 className="text-base font-black text-slate-900">
                {selectedNode.name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                위치: {selectedNode.zone}
              </p>
            </div>

            <p className="rounded-2xl bg-slate-50 border border-slate-100 p-3 text-xs text-slate-600 leading-relaxed">
              {selectedNode.description}
            </p>

            <div className="flex flex-col gap-3 pt-1">
              <h5 className="text-xs font-bold text-slate-800">실시간 텔레메트리</h5>

              {selectedNode.metrics.cpu !== undefined && (
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>CPU 사용률</span>
                    <strong className="text-slate-800">{selectedNode.metrics.cpu}%</strong>
                  </div>
                  <Progress value={selectedNode.metrics.cpu} className="h-1.5 bg-slate-100" />
                </div>
              )}

              {selectedNode.metrics.memory !== undefined && (
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>메모리 점유율</span>
                    <strong className="text-slate-800">{selectedNode.metrics.memory}%</strong>
                  </div>
                  <Progress value={selectedNode.metrics.memory} className="h-1.5 bg-slate-100" />
                </div>
              )}

              {selectedNode.metrics.latency && (
                <div className="flex justify-between rounded-xl bg-slate-50 p-2.5 text-xs text-slate-500">
                  <span>응답 레이턴시</span>
                  <strong className="font-mono text-slate-900">{selectedNode.metrics.latency}</strong>
                </div>
              )}

              {selectedNode.metrics.qps && (
                <div className="flex justify-between rounded-xl bg-slate-50 p-2.5 text-xs text-slate-500">
                  <span>처리량 (QPS)</span>
                  <strong className="font-mono text-slate-900">{selectedNode.metrics.qps}</strong>
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-[#5551ff]/10 border border-[#5551ff]/20 p-3 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#5551ff]">
                <SparklesIcon className="size-3.5" />
                <span>Gemini 진단</span>
              </div>
              <p className="mt-1 text-[0.7778rem] text-slate-600 leading-relaxed">
                {selectedNode.status === "healthy"
                  ? "최근 24시간 동안 안정적인 상태입니다. 리소스 임계치 초과 징후가 없습니다."
                  : "I/O 큐 대기 시간 증가 및 메모리 점유율 상승 추세가 감지되었습니다. 자동 완화 조치를 실행할 수 있습니다."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
