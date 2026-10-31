"use client"

import * as React from "react"
import {
  AlertTriangleIcon,
  BotIcon,
  CheckCircle2Icon,
  CpuIcon,
  ExternalLinkIcon,
  PlayIcon,
  RefreshCwIcon,
  SendIcon,
  ShieldAlertIcon,
  SparklesIcon,
  TerminalIcon,
  TrendingDownIcon,
  Wand2Icon,
  ZapIcon,
} from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  geminiAnomalies,
  geminiOptimizations,
  type GeminiAnomaly,
} from "@/lib/mock-data"

const SAMPLE_PROMPTS = [
  "러너 오토스케일링 스팟 중단 리스크 진단해줘",
  "Gitaly Shard-02 I/O 병목 원인과 해결책은?",
  "PostgreSQL Patroni 복제 지연 완화 가이드",
  "최근 24시간 도커 캐시 미스 급증 분석",
]

const AI_RESPONSES: Record<string, { summary: string; steps: string[]; code?: string }> = {
  "러너 오토스케일링 스팟 중단 리스크 진단해줘": {
    summary:
      "현재 ap-northeast-2a의 c6i.2xlarge 스팟 인스턴스 가용량이 급감하면서 AWS 측 Rebalance Recommendation 이벤트가 12건 수신되었습니다. 즉각적인 조치가 없을 경우 45분 내 28개 빌드 잡이 강제 종료될 위험이 있습니다.",
    steps: [
      "1. Karpenter NodePool 구성에 ap-northeast-2c, 2d 서브넷을 추가하여 가용영역 다변화",
      "2. m6i.2xlarge 및 c5.2xlarge 등 대체 패밀리 풀 5개 인스턴스 타입 추가",
      "3. 핵심 프로덕션 배포 파이프라인(tag: release)은 On-Demand 풀로 즉시 폴백 라우팅",
    ],
    code: `apiVersion: karpenter.sh/v1beta1
kind: NodePool
metadata:
  name: gitlab-runner-spot
spec:
  template:
    spec:
      requirements:
        - key: "karpenter.k8s.aws/instance-family"
          operator: In
          values: ["c6i", "c5", "m6i", "m5"]
        - key: "topology.kubernetes.io/zone"
          operator: In
          values: ["ap-northeast-2a", "ap-northeast-2c", "ap-northeast-2d"]`,
  },
  "Gitaly Shard-02 I/O 병목 원인과 해결책은?": {
    summary:
      "Shard-02 노드의 NVMe 디스크 큐 길이가 18.4로 상승했습니다. 원인은 'infra/cloud-platform' 모노레포의 40개 병렬 CI 잡에서 shallow clone(--depth 1)이 적용되지 않아 수 기가바이트의 Git History를 중복 패치하고 있기 때문입니다.",
    steps: [
      "1. .gitlab-ci.yml에 GIT_DEPTH: 1 및 GIT_STRATEGY: fetch 전역 적용",
      "2. Praefect를 통해 Shard-02에 집중된 저장소 중 4개를 Shard-03(여유 용량 62%)으로 무중단 라이브 마이그레이션",
      "3. Git Pack-Objects 캐시 메모리를 4GB -> 8GB로 상향",
    ],
  },
}

export function AiOpsView() {
  const [anomalies, setAnomalies] = React.useState<GeminiAnomaly[]>(geminiAnomalies)
  const [query, setQuery] = React.useState("")
  const [chatLog, setChatLog] = React.useState<
    { sender: "user" | "gemini"; text: string; details?: { steps: string[]; code?: string } }[]
  >([
    {
      sender: "gemini",
      text: "안녕하세요! Gemini 인프라 AI 엔진입니다. GitLab 클러스터 전체 텔레메트리를 실시간 분석 중입니다. 질문하시거나 빠른 진단 프롬프트를 선택해 보세요.",
    },
  ])
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)

  const handlePrompt = (promptText: string) => {
    setQuery(promptText)
    executePrompt(promptText)
  }

  const executePrompt = (promptText: string) => {
    if (!promptText.trim()) return

    const userMsg = promptText.trim()
    setChatLog((prev) => [...prev, { sender: "user", text: userMsg }])
    setQuery("")
    setIsAnalyzing(true)

    setTimeout(() => {
      setIsAnalyzing(false)
      const canned = AI_RESPONSES[userMsg]
      if (canned) {
        setChatLog((prev) => [
          ...prev,
          {
            sender: "gemini",
            text: canned.summary,
            details: { steps: canned.steps, code: canned.code },
          },
        ])
      } else {
        setChatLog((prev) => [
          ...prev,
          {
            sender: "gemini",
            text: `[Gemini 분석 완료] "${userMsg}"에 대한 메트릭 상관 분석을 수행했습니다. 해당 컴포넌트는 최근 1시간 기준 정상 임계치 내에 동작 중이며, 가용성 지표는 99.98%입니다.`,
            details: {
              steps: [
                "Prometheus 메트릭 시계열(CPU, Memory, Disk IO) 이상점 검출 완료 (Z-Score: 0.42, 정상 범위)",
                "GitLab Rails 및 Sidekiq 에러 로그 상관성 분석: 특이 오류 0건",
                "지속적인 자동 모니터링 및 임계치 도달 시 즉시 알림 생성 예정",
              ],
            },
          },
        ])
      }
    }, 600)
  }

  const handleMitigate = (id: string, actionLabel: string) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1200)),
      {
        loading: `${actionLabel} 실행 중...`,
        success: () => {
          setAnomalies((prev) =>
            prev.map((a) => (a.id === id ? { ...a, resolved: true } : a))
          )
          return `성공적으로 적용되었습니다: ${actionLabel}`
        },
        error: "실행 중 오류가 발생했습니다.",
      }
    )
  }

  return (
    <div className="flex flex-col gap-6 px-4 lg:px-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-linear-to-r from-violet-950/40 via-background to-blue-950/30 p-6 backdrop-blur-md">
        <div className="relative z-10 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-tr from-violet-600 to-cyan-500 shadow-lg shadow-violet-500/25">
              <SparklesIcon className="size-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold tracking-tight">Gemini 2.5 Infra Intelligence</h2>
                <Badge variant="outline" className="border-violet-500/40 bg-violet-500/10 text-violet-400">
                  <span className="mr-1.5 size-1.5 animate-pulse rounded-full bg-cyan-400" />
                  실시간 AI 자율 분석 가동 중
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                GitLab EKS 클러스터, Praefect 스토리지, PostgreSQL Patroni 및 CI/CD 파이프라인의 시계열 메트릭 이상 탐지
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col text-right text-xs text-muted-foreground">
              <span>추론 지연 시간: <strong className="text-foreground">24ms</strong></span>
              <span>모니터링 대상 노드: <strong className="text-foreground">118개 인스턴스</strong></span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.success("Gemini가 인프라 텔레메트리 전체를 재검사했습니다. 신규 이상 없음.")}
              className="gap-2 border-violet-500/30"
            >
              <RefreshCwIcon className="size-3.5" />
              정밀 진단 재스캔
            </Button>
          </div>
        </div>
      </div>

      {/* Interactive AI Investigation Console */}
      <Card className="border-border/80 shadow-xs">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BotIcon className="size-5 text-violet-500" />
              <CardTitle className="text-base font-bold">Ask Gemini Infra (대화형 장애 원인 진단)</CardTitle>
            </div>
            <Badge variant="secondary" className="text-xs">
              Gemini Pro 2.5 Telemetry Engine
            </Badge>
          </div>
          <CardDescription>
            러너 병목, 스토리지 용량 고갈, 파이프라인 지연의 원인과 해결 코드를 자연어로 질문하세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Quick Prompts */}
          <div className="flex flex-wrap gap-2">
            {SAMPLE_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handlePrompt(prompt)}
                className="flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-muted/60 px-3 py-1 text-xs text-muted-foreground transition-all hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-foreground"
              >
                <ZapIcon className="size-3 text-amber-500" />
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Window */}
          <div className="flex max-h-96 flex-col gap-3 overflow-y-auto rounded-lg border bg-muted/20 p-4">
            {chatLog.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 text-sm ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "gemini" && (
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-violet-600/20 text-violet-400">
                    <SparklesIcon className="size-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-xl px-4 py-3 leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground font-medium"
                      : "border border-border/60 bg-card text-card-foreground shadow-xs"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.details && (
                    <div className="mt-3 flex flex-col gap-2 border-t pt-2.5 text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">권장 조치 단계:</span>
                      <ul className="flex flex-col gap-1 pl-1">
                        {msg.details.steps.map((st, sIdx) => (
                          <li key={sIdx}>{st}</li>
                        ))}
                      </ul>
                      {msg.details.code && (
                        <div className="mt-2 rounded-md bg-zinc-950 p-3 font-mono text-[11px] text-zinc-100 overflow-x-auto">
                          <pre>{msg.details.code}</pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isAnalyzing && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <SparklesIcon className="size-3.5 animate-spin text-violet-400" />
                Gemini가 클러스터 텔레메트리 및 로그 시계열을 분석하고 있습니다...
              </div>
            )}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              executePrompt(query)
            }}
            className="flex gap-2"
          >
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="예: Praefect shard replication lag를 해결하려면 어떤 조치를 해야 하나요?"
              className="flex-1"
            />
            <Button type="submit" disabled={!query.trim() || isAnalyzing} className="gap-2">
              <SendIcon className="size-4" />
              질문하기
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Active AI Anomaly Detections */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold">감지된 인프라 이상 징후 (Active Anomalies)</h3>
            <p className="text-xs text-muted-foreground">
              Gemini가 감지한 잠재적 장애 위험 및 자동 완화 추천 조치
            </p>
          </div>
          <Badge variant="outline" className="gap-1.5">
            <AlertTriangleIcon className="size-3.5 text-amber-500" />
            {anomalies.filter((a) => !a.resolved).length}건 조치 대기
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {anomalies.map((item) => (
            <Card
              key={item.id}
              className={`transition-all ${
                item.resolved
                  ? "border-muted bg-muted/20 opacity-70"
                  : item.severity === "critical"
                  ? "border-rose-500/40 bg-rose-500/5 shadow-xs"
                  : "border-amber-500/30 bg-amber-500/5 shadow-xs"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        item.resolved
                          ? "outline"
                          : item.severity === "critical"
                          ? "destructive"
                          : "default"
                      }
                      className="text-[11px]"
                    >
                      {item.resolved ? "완화됨" : item.severity.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                  </div>
                  <span className="text-xs font-semibold text-violet-400">
                    신뢰도 {item.confidence}%
                  </span>
                </div>
                <CardTitle className="text-sm font-bold leading-snug pt-1">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2.5 text-xs">
                <p className="text-muted-foreground">{item.summary}</p>
                <div className="rounded-lg border bg-background/60 p-2.5">
                  <span className="font-semibold text-foreground">근본 원인 (RCA):</span>
                  <p className="mt-0.5 text-muted-foreground">{item.rootCause}</p>
                </div>
                <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-2.5">
                  <span className="font-semibold text-violet-400">Gemini 권장 조치:</span>
                  <p className="mt-0.5 text-foreground">{item.recommendedAction}</p>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t pt-3">
                <span className="text-[11px] text-muted-foreground">
                  영향 노드: {item.affectedNodes.join(", ")}
                </span>
                {item.resolved ? (
                  <Badge variant="outline" className="gap-1 text-emerald-500 border-emerald-500/30">
                    <CheckCircle2Icon className="size-3" />
                    조치 완료
                  </Badge>
                ) : (
                  <Button
                    size="sm"
                    variant={item.severity === "critical" ? "default" : "outline"}
                    onClick={() => handleMitigate(item.id, item.actionLabel)}
                    className="gap-1.5 text-xs"
                  >
                    <Wand2Icon className="size-3.5" />
                    {item.actionLabel}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Autonomous Optimization History */}
      <Card className="border-border/80 shadow-xs">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ZapIcon className="size-5 text-emerald-500" />
              <CardTitle className="text-base font-bold">최근 자동 최적화 적용 내역 (Optimization Log)</CardTitle>
            </div>
            <Badge variant="secondary" className="text-xs">
              지난 24시간 4건 자동 적용
            </Badge>
          </div>
          <CardDescription>
            Gemini 자율 최적화 에이전트가 성능 및 리소스 절감을 위해 자동 실행한 결과입니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col divide-y rounded-lg border">
            {geminiOptimizations.map((opt) => (
              <div key={opt.id} className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">{opt.title}</span>
                    <Badge variant="outline" className="text-[10px] font-mono text-muted-foreground">
                      {opt.target}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{opt.metricBefore}</span>
                    <span>→</span>
                    <strong className="text-foreground">{opt.metricAfter}</strong>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10">
                    <TrendingDownIcon className="size-3" />
                    {opt.improvement}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{opt.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
