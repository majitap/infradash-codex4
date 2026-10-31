"use client"

import * as React from "react"
import {
  ArrowDownRightIcon,
  CheckCircle2Icon,
  CoinsIcon,
  DollarSignIcon,
  HardDriveIcon,
  PiggyBankIcon,
  ServerIcon,
  SparklesIcon,
  Trash2Icon,
  TrendingDownIcon,
  Wand2Icon,
  ZapIcon,
} from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { finOpsCostBreakdown, finOpsData, finOpsSavingsRecommendations } from "@/lib/mock-data"

export function FinOpsView() {
  const [recs, setRecs] = React.useState(finOpsSavingsRecommendations)

  const handleApplyRec = (id: string, title: string) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
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
    <div className="flex flex-col gap-6 px-4 lg:px-6">
      {/* Header */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold tracking-tight">FinOps 클라우드 & 러너 비용 최적화</h2>
            <Badge variant="outline" className="border-amber-500/40 bg-amber-500/10 text-amber-500">
              <PiggyBankIcon className="mr-1.5 size-3.5" />
              월간 $14,280 스팟 절감 달성 중
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            GitLab EKS 컴퓨팅, Gitaly 볼륨, 아티팩트 스토리지 및 네트워크 전송 비용 분석과 낭비 자원 회수
          </p>
        </div>
      </div>

      {/* Top 4 FinOps KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/80 shadow-xs">
          <CardHeader className="pb-2">
            <span className="text-xs font-semibold text-muted-foreground">월간 총 인프라 비용</span>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold tracking-tight text-foreground">
                ${finOpsData.monthlyTotal.toLocaleString()}
              </span>
              <span className="ml-auto flex items-center gap-0.5 text-xs font-semibold text-emerald-500">
                <ArrowDownRightIcon className="size-3.5" />
                {finOpsData.monthlyDelta}% MoM
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">전월 대비 $5,420 절감</p>
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-xs">
          <CardHeader className="pb-2">
            <span className="text-xs font-semibold text-muted-foreground">스팟 인스턴스 절감액</span>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold tracking-tight text-emerald-500">
                ${finOpsData.spotSavings.toLocaleString()}
              </span>
              <span className="ml-auto text-xs font-semibold text-muted-foreground">
                {finOpsData.spotRatio}% 채택
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">온디맨드 대비 68.4% 비용 절감</p>
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-xs">
          <CardHeader className="pb-2">
            <span className="text-xs font-semibold text-muted-foreground">감지된 유휴 자원 낭비</span>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold tracking-tight text-amber-500">
                ${finOpsData.idleWaste.toLocaleString()}
              </span>
              <span className="ml-auto text-xs font-semibold text-muted-foreground">/ 월</span>
            </div>
            <p className="text-[11px] text-muted-foreground">고아 아티팩트 및 정지된 러너</p>
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-xs">
          <CardHeader className="pb-2">
            <span className="text-xs font-semibold text-muted-foreground">회수 가능 스토리지</span>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold tracking-tight text-foreground">
                {finOpsData.reclaimableStorage}
              </span>
              <span className="ml-auto text-xs font-semibold text-emerald-500">만료 대상</span>
            </div>
            <p className="text-[11px] text-muted-foreground">미사용 컨테이너 이미지 & 캐시</p>
          </CardContent>
        </Card>
      </div>

      {/* Cost Breakdown Table */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/80 shadow-xs">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">인프라 항목별 지출 상세</CardTitle>
            <CardDescription>
              지난 30일 기준 GitLab 운영 인프라 컴포넌트별 클라우드 비용 구성
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>인프라 서비스 컴포넌트</TableHead>
                  <TableHead>월 비용 (USD)</TableHead>
                  <TableHead>비중</TableHead>
                  <TableHead className="text-right">상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {finOpsCostBreakdown.map((row) => (
                  <TableRow key={row.category}>
                    <TableCell className="font-medium text-xs">{row.category}</TableCell>
                    <TableCell className="font-mono text-xs font-bold">${row.cost.toLocaleString()}</TableCell>
                    <TableCell className="text-xs">
                      <div className="flex items-center gap-2">
                        <Progress value={row.percentage} className="h-1.5 w-16" />
                        <span className="text-muted-foreground text-[11px]">{row.percentage}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          row.status === "최적화됨"
                            ? "outline"
                            : row.status === "전환 권장"
                            ? "default"
                            : "secondary"
                        }
                        className="text-[10px]"
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="border-border/80 shadow-xs">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <SparklesIcon className="size-4 text-violet-400" />
              <CardTitle className="text-sm font-bold">Gemini 비용 최적화 추천</CardTitle>
            </div>
            <CardDescription className="text-xs">
              즉시 실행 가능한 클라우드 비용 절감 조치
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {recs.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 text-center text-xs text-muted-foreground">
                <CheckCircle2Icon className="size-8 text-emerald-500 mb-2" />
                모든 추천 최적화가 적용되었습니다!
              </div>
            ) : (
              recs.map((rec) => (
                <div key={rec.id} className="flex flex-col gap-2 rounded-xl border p-3 text-xs bg-muted/20">
                  <div className="flex items-start justify-between gap-1">
                    <span className="font-bold text-foreground">{rec.title}</span>
                    <Badge variant="secondary" className="text-[10px] text-emerald-500 shrink-0 font-mono">
                      {rec.impact}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    {rec.description}
                  </p>
                  <div className="flex items-center justify-between border-t pt-2">
                    <span className="text-[10px] text-muted-foreground">난이도: {rec.effort}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleApplyRec(rec.id, rec.title)}
                      className="h-7 text-[11px] gap-1"
                    >
                      <Wand2Icon className="size-3" />
                      적용하기
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
