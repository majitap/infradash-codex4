"use client"

import * as React from "react"
import {
  ActivityIcon,
  CheckCircle2Icon,
  CpuIcon,
  DatabaseIcon,
  GlobeIcon,
  HardDriveIcon,
  LayersIcon,
  NetworkIcon,
  RefreshCwIcon,
  ServerIcon,
  ShieldCheckIcon,
  SparklesIcon,
  WorkflowIcon,
} from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { topologyNodes, type TopologyNode } from "@/lib/mock-data"

export function TopologyView() {
  const [selectedNode, setSelectedNode] = React.useState<TopologyNode>(topologyNodes[2]) // Default to GitLab Rails
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all")

  const filteredNodes = categoryFilter === "all"
    ? topologyNodes
    : topologyNodes.filter((n) => n.category === categoryFilter)

  const categories = [
    { key: "all", label: "전체 아키텍처 (All)" },
    { key: "edge", label: "엣지 & LB" },
    { key: "app", label: "애플리케이션" },
    { key: "storage", label: "Gitaly 스토리지" },
    { key: "database", label: "데이터베이스 & 캐시" },
    { key: "runner", label: "러너 플릿" },
    { key: "object", label: "오브젝트 스토리지" },
  ]

  return (
    <div className="flex flex-col gap-6 px-4 lg:px-6">
      {/* Header */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold tracking-tight">GitLab Enterprise 인프라 토폴로지</h2>
            <Badge variant="outline" className="border-sky-500/40 bg-sky-500/10 text-sky-400">
              <span className="mr-1.5 size-1.5 animate-pulse rounded-full bg-emerald-400" />
              13개 핵심 서비스 정상 연동
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Cloudflare 엣지부터 Rails Puma, Praefect Gitaly 샤드, Patroni PostgreSQL, EKS 러너 플릿까지의 실시간 아키텍처 맵
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("토폴로지 메트릭을 실시간 동기화했습니다.")}
            className="gap-2"
          >
            <RefreshCwIcon className="size-3.5" />
            토폴로지 새로고침
          </Button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <Button
            key={c.key}
            size="sm"
            variant={categoryFilter === c.key ? "default" : "outline"}
            onClick={() => setCategoryFilter(c.key)}
            className="text-xs"
          >
            {c.label}
          </Button>
        ))}
      </div>

      {/* Main Grid: Architecture Flow + Selected Node Detail */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Architecture Topology Grid */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {filteredNodes.map((node) => {
              const isSelected = selectedNode.id === node.id
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`group relative flex cursor-pointer flex-col justify-between rounded-xl border p-4 transition-all duration-200 ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
                      : "border-border/80 bg-card hover:border-primary/50 hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="relative flex size-2.5">
                        <span
                          className={`absolute inline-flex size-full animate-ping rounded-full opacity-75 ${
                            node.status === "healthy"
                              ? "bg-emerald-400"
                              : "bg-amber-400"
                          }`}
                        />
                        <span
                          className={`relative inline-flex size-2.5 rounded-full ${
                            node.status === "healthy"
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          }`}
                        />
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">
                        {node.categoryLabel}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-mono">
                      {node.zone}
                    </Badge>
                  </div>

                  <div className="my-2.5">
                    <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {node.name}
                    </h4>
                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                      {node.description}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center justify-between border-t pt-2 text-[11px] text-muted-foreground">
                    {node.metrics.cpu !== undefined ? (
                      <span className="flex items-center gap-1">
                        <CpuIcon className="size-3" />
                        CPU {node.metrics.cpu}%
                      </span>
                    ) : node.metrics.storage ? (
                      <span className="flex items-center gap-1">
                        <HardDriveIcon className="size-3" />
                        {node.metrics.storage}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <ActivityIcon className="size-3" />
                        {node.metrics.qps ?? "정상"}
                      </span>
                    )}

                    {node.metrics.latency && (
                      <span className="font-mono text-foreground font-medium">
                        {node.metrics.latency}
                      </span>
                    )}
                    {node.metrics.instances && (
                      <span className="font-mono text-foreground font-medium">
                        {node.metrics.instances}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Architecture Pipeline Flow Summary */}
          <Card className="border-border/80 shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <NetworkIcon className="size-4 text-sky-400" />
                <CardTitle className="text-sm font-bold">GitLab 트래픽 데이터 플로우</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2 font-mono">
                  <Badge variant="outline" className="bg-sky-500/10 text-sky-400 border-sky-500/30">1. Edge</Badge>
                  <span>Cloudflare CDN (WAF) ➔ HAProxy Ingress (Active/Standby) [14ms]</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <Badge variant="outline" className="bg-violet-500/10 text-violet-400 border-violet-500/30">2. App</Badge>
                  <span>HAProxy ➔ GitLab Rails Puma Pods (8개) ➔ Sidekiq Queue Workers [42ms]</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">3. Storage</Badge>
                  <span>Puma / SSH ➔ Praefect HA Router ➔ Gitaly Shards 01/02/03 (NVMe) [8ms]</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30">4. Runners</Badge>
                  <span>GitLab Workhorse ➔ Karpenter EKS Spot Runner (64 Nodes) / GPU (CUDA)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Node Real-time Inspector */}
        <div className="flex flex-col gap-4">
          <Card className="border-primary/40 shadow-sm sticky top-20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {selectedNode.categoryLabel}
                </Badge>
                <Badge
                  variant={selectedNode.status === "healthy" ? "outline" : "default"}
                  className="gap-1 text-emerald-500 border-emerald-500/30"
                >
                  <CheckCircle2Icon className="size-3" />
                  {selectedNode.status === "healthy" ? "운영 중 (Healthy)" : "주의 (Warning)"}
                </Badge>
              </div>
              <CardTitle className="text-base font-bold mt-2">
                {selectedNode.name}
              </CardTitle>
              <CardDescription className="text-xs">
                위치: {selectedNode.zone}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 text-xs">
              <p className="rounded-lg border bg-muted/40 p-3 text-muted-foreground leading-relaxed">
                {selectedNode.description}
              </p>

              <div className="flex flex-col gap-3">
                <h5 className="font-bold text-foreground">실시간 리소스 텔레메트리</h5>

                {selectedNode.metrics.cpu !== undefined && (
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-muted-foreground">
                      <span>CPU 사용률</span>
                      <strong className="text-foreground">{selectedNode.metrics.cpu}%</strong>
                    </div>
                    <Progress value={selectedNode.metrics.cpu} className="h-1.5" />
                  </div>
                )}

                {selectedNode.metrics.memory !== undefined && (
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-muted-foreground">
                      <span>메모리 점유율</span>
                      <strong className="text-foreground">{selectedNode.metrics.memory}%</strong>
                    </div>
                    <Progress value={selectedNode.metrics.memory} className="h-1.5" />
                  </div>
                )}

                {selectedNode.metrics.latency && (
                  <div className="flex justify-between rounded-md border p-2 text-muted-foreground">
                    <span>응답 레이턴시</span>
                    <strong className="font-mono text-foreground">{selectedNode.metrics.latency}</strong>
                  </div>
                )}

                {selectedNode.metrics.qps && (
                  <div className="flex justify-between rounded-md border p-2 text-muted-foreground">
                    <span>처리 처리량 (Throughput)</span>
                    <strong className="font-mono text-foreground">{selectedNode.metrics.qps}</strong>
                  </div>
                )}

                {selectedNode.metrics.storage && (
                  <div className="flex justify-between rounded-md border p-2 text-muted-foreground">
                    <span>스토리지 용량</span>
                    <strong className="font-mono text-foreground">{selectedNode.metrics.storage}</strong>
                  </div>
                )}

                {selectedNode.metrics.instances && (
                  <div className="flex justify-between rounded-md border p-2 text-muted-foreground">
                    <span>인스턴스 / 파드 수</span>
                    <strong className="font-mono text-foreground">{selectedNode.metrics.instances}</strong>
                  </div>
                )}
              </div>

              {/* Gemini Autonomous Assessment */}
              <div className="rounded-xl border border-violet-500/30 bg-violet-500/5 p-3">
                <div className="flex items-center gap-1.5 font-bold text-violet-400">
                  <SparklesIcon className="size-3.5" />
                  <span>Gemini 노드 헬스 진단</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                  {selectedNode.status === "healthy"
                    ? "메트릭 시계열 분석 결과 최근 24시간 동안 안정적인 상태입니다. 임계치 초과 징후가 없습니다."
                    : "I/O 큐 대기 시간 증가 및 메모리 점유율 상승 추세가 감지되었습니다. AI Ops 센터에서 완화 조치를 실행할 수 있습니다."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
