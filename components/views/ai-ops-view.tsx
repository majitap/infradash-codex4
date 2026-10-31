"use client"

import * as React from "react"
import { CheckCircle2Icon, RefreshCwIcon, SendIcon, SparklesIcon, Wand2Icon } from "lucide-react"
import { toast } from "sonner"


import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { geminiAnomalies, type GeminiAnomaly } from "@/lib/mock-data"

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
            text: `[Gemini 분석 완료] "${userMsg}"에 대한 메트릭 상관 분석을 수행했습니다. 컴포넌트가 최근 1시간 기준 정상 임계치 내에 동작 중이며, 가용성 지표는 99.98%입니다.`,
            details: {
              steps: [
                "Prometheus 메트릭 시계열(CPU, Memory, Disk IO) 정상 범위 유지 중",
                "GitLab Rails 및 Sidekiq 에러 로그 상관성 분석: 특이 오류 0건",
                "지속적인 자동 모니터링 가동 중",
              ],
            },
          },
        ])
      }
    }, 600)
  }

  const handleMitigate = (id: string, actionLabel: string) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: `${actionLabel} 적용 중...`,
        success: () => {
          setAnomalies((prev) =>
            prev.map((a) => (a.id === id ? { ...a, resolved: true } : a))
          )
          return `완화 조치가 적용되었습니다: ${actionLabel}`
        },
        error: "실행 중 오류 발생",
      }
    )
  }

  return (
    <div className="flex flex-col gap-6 px-6 pb-12 max-w-7xl mx-auto w-full">
      {/* 1. Header Banner - Clean white card with gentle periwinkle accent */}
      <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#5551ff] text-white shadow-sm shadow-[#5551ff]/25">
            <SparklesIcon className="size-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900">Gemini AI 운영 센터</h2>
              <span className="rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-[0.7222rem] font-bold text-emerald-600">
                모니터링 중
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              GitLab EKS 클러스터, Praefect 스토리지 및 CI/CD 파이프라인의 자율 진단
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            variant="outline"
            onClick={() => toast.success("Gemini가 인프라 텔레메트리를 재검사했습니다. 신규 이상 없음.")}
            className="rounded-full bg-white hover:bg-slate-50 border-slate-200 text-xs font-bold px-4 h-9 shadow-xs text-slate-700"
          >
            <RefreshCwIcon className="size-3.5 mr-1.5" />
            재스캔 실행
          </Button>
        </div>
      </div>

      {/* 2. Interactive AI Investigation Console */}
      <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Gemini에게 원인 물어보기</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              자연어로 러너 상태, 파이프라인 오류, 스토리지 병목 원인을 질문하세요.
            </p>
          </div>
          <span className="rounded-full bg-[#5551ff]/10 text-[#5551ff] px-3 py-1 text-xs font-semibold">
            Gemini 2.5 진단 데모
          </span>
        </div>

        {/* Quick Prompts */}
        <div className="flex flex-wrap gap-2 pt-1">
          {SAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handlePrompt(prompt)}
              className="rounded-full border border-slate-200/80 bg-slate-50 hover:bg-[#5551ff]/10 hover:border-[#5551ff]/30 hover:text-[#5551ff] px-3.5 py-1.5 text-xs text-slate-600 font-medium transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Window */}
        <div className="flex max-h-80 flex-col gap-3 overflow-y-auto rounded-2xl border border-slate-100 bg-[#f9fafc] p-4">
          {chatLog.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 text-xs ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "gemini" && (
                <div className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-[#5551ff] text-white shadow-xs">
                  <SparklesIcon className="size-3.5" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-[#5551ff] text-white font-medium shadow-xs"
                    : "border border-slate-200/60 bg-white text-slate-800 shadow-xs"
                }`}
              >
                <p>{msg.text}</p>
                {msg.details && (
                  <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-2.5 text-xs text-slate-500">
                    <span className="font-bold text-slate-800">권장 조치:</span>
                    <ul className="flex flex-col gap-1 pl-1">
                      {msg.details.steps.map((st, sIdx) => (
                        <li key={sIdx}>{st}</li>
                      ))}
                    </ul>
                    {msg.details.code && (
                      <div className="mt-2 rounded-xl bg-slate-900 p-3 font-mono text-[0.7778rem] text-slate-100 overflow-x-auto">
                        <pre>{msg.details.code}</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isAnalyzing && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <SparklesIcon className="size-3.5 animate-spin text-[#5551ff]" />
              Gemini가 인프라 텔레메트리를 분석 중입니다...
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
            placeholder="질문을 입력하세요..."
            className="rounded-full bg-slate-50 border-slate-200 text-xs px-4 h-11 focus-visible:ring-[#5551ff]"
          />
          <Button
            type="submit"
            disabled={!query.trim() || isAnalyzing}
            className="rounded-full bg-[#5551ff] hover:bg-[#4743eb] text-white text-xs font-bold px-6 h-11 shadow-sm shadow-[#5551ff]/20"
          >
            <SendIcon className="size-3.5 mr-1.5" />
            질문
          </Button>
        </form>
      </div>

      {/* 3. Active Anomalies Grid */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">감지된 이상 징후</h3>
          <span className="text-xs text-slate-400">
            {anomalies.filter((a) => !a.resolved).length}건 조치 대기
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {anomalies.map((item) => (
            <div
              key={item.id}
              className={`rounded-3xl border p-5 flex flex-col justify-between transition-all ${
                item.resolved
                  ? "border-slate-100 bg-slate-50/60 opacity-60"
                  : "border-slate-200/80 bg-white shadow-xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[0.7222rem] font-bold ${
                    item.resolved
                      ? "bg-slate-100 text-slate-500"
                      : item.severity === "critical"
                      ? "bg-rose-50 text-rose-600 border border-rose-100"
                      : "bg-amber-50 text-amber-600 border border-amber-100"
                  }`}>
                    {item.resolved ? "완화됨" : { critical: "심각", warning: "주의", info: "안내" }[item.severity]}
                  </span>
                  <span className="text-[0.7778rem] font-semibold text-[#5551ff]">
                    신뢰도 {item.confidence}%
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {item.title}
                </h4>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  {item.summary}
                </p>

                <div className="mt-3 rounded-2xl bg-slate-50 border border-slate-100 p-3 text-xs text-slate-600">
                  <strong className="text-slate-800">근본 원인: </strong>
                  {item.rootCause}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="text-[0.7222rem] text-slate-400">
                  {item.timestamp}
                </span>

                {item.resolved ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                    <CheckCircle2Icon className="size-3.5" />
                    조치 완료
                  </span>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => handleMitigate(item.id, item.actionLabel)}
                    className="rounded-full bg-[#5551ff] hover:bg-[#4743eb] text-white text-xs font-bold px-4 h-8 shadow-xs"
                  >
                    <Wand2Icon className="size-3 mr-1" />
                    {item.actionLabel}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
