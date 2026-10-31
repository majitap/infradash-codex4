"use client"

import * as React from "react"
import {
  AwardIcon,
  CheckCircle2Icon,
  ClockIcon,
  GaugeIcon,
  RocketIcon,
  ShieldCheckIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  ZapIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { doraMetrics, doraServiceRankings } from "@/lib/mock-data"

export function DoraView() {
  return (
    <div className="flex flex-col gap-6 px-4 lg:px-6">
      {/* Header */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold tracking-tight">DORA 엔지니어링 속도 & 안정성 지표</h2>
            <Badge variant="secondary" className="gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10">
              <AwardIcon className="size-3.5" />
              전사 Elite Tier 달성
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            DevOps Research and Assessment(DORA) 4대 핵심 지표를 기반으로 한 GitLab CI/CD 소프트웨어 인도 성능 분석
          </p>
        </div>
      </div>

      {/* 4 Core DORA Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {doraMetrics.map((item) => (
          <Card key={item.key} className="border-border/80 shadow-xs">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">{item.title.split(" (")[0]}</span>
                <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-[10px]">
                  {item.tier}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-foreground">{item.value}</span>
                <span className="text-xs font-medium text-muted-foreground">{item.unit}</span>
                <span className="ml-auto flex items-center gap-0.5 text-xs font-semibold text-emerald-500">
                  <TrendingUpIcon className="size-3.5" />
                  {item.delta}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              <div className="mt-2 rounded-md bg-muted/40 p-2 text-[11px] text-muted-foreground">
                <strong className="text-foreground">기준: </strong>{item.benchmark}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* DORA Tier Benchmark Guide */}
      <Card className="border-border/80 shadow-xs">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold">DORA 성능 등급 기준 (Industry Standard Comparison)</CardTitle>
          <CardDescription>
            구글 Cloud DORA 보고서 기준 대비 현재 조직의 위치
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-4 text-xs">
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-3">
              <div className="flex items-center justify-between font-bold text-emerald-500">
                <span>Elite (현재 위치)</span>
                <CheckCircle2Icon className="size-4" />
              </div>
              <ul className="mt-2 flex flex-col gap-1 text-muted-foreground text-[11px]">
                <li>• 배포 빈도: 하루 수 회 이상</li>
                <li>• 리드 타임: 1시간 미만</li>
                <li>• 복구 시간: 1시간 미만</li>
                <li>• 실패율: 0% ~ 15%</li>
              </ul>
            </div>

            <div className="rounded-xl border bg-muted/20 p-3 opacity-80">
              <span className="font-bold text-foreground">High Tier</span>
              <ul className="mt-2 flex flex-col gap-1 text-muted-foreground text-[11px]">
                <li>• 배포 빈도: 1주 1회 ~ 1달 1회</li>
                <li>• 리드 타임: 1일 ~ 1주일</li>
                <li>• 복구 시간: 1일 미만</li>
                <li>• 실패율: 0% ~ 15%</li>
              </ul>
            </div>

            <div className="rounded-xl border bg-muted/20 p-3 opacity-60">
              <span className="font-bold text-foreground">Medium Tier</span>
              <ul className="mt-2 flex flex-col gap-1 text-muted-foreground text-[11px]">
                <li>• 배포 빈도: 1달 1회 ~ 6달 1회</li>
                <li>• 리드 타임: 1주일 ~ 1달</li>
                <li>• 복구 시간: 1일 ~ 1주일</li>
                <li>• 실패율: 16% ~ 30%</li>
              </ul>
            </div>

            <div className="rounded-xl border bg-muted/20 p-3 opacity-40">
              <span className="font-bold text-foreground">Low Tier</span>
              <ul className="mt-2 flex flex-col gap-1 text-muted-foreground text-[11px]">
                <li>• 배포 빈도: 6달 이상에 1회</li>
                <li>• 리드 타임: 6달 이상</li>
                <li>• 복구 시간: 1주일 이상</li>
                <li>• 실패율: 46% ~ 60%</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service-Level DORA Table */}
      <Card className="border-border/80 shadow-xs">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold">서비스별 DORA 지표 현황</CardTitle>
          <CardDescription>
            주요 마이크로서비스 및 파이프라인별 엔지니어링 속도 비교
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>서비스 리포지토리</TableHead>
                <TableHead>담당 팀</TableHead>
                <TableHead>배포 빈도 (DF)</TableHead>
                <TableHead>변경 리드 타임 (LT)</TableHead>
                <TableHead>변경 실패율 (CFR)</TableHead>
                <TableHead>복구 시간 (MTTR)</TableHead>
                <TableHead className="text-right">DORA 등급</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doraServiceRankings.map((svc) => (
                <TableRow key={svc.name}>
                  <TableCell className="font-mono font-bold text-xs">{svc.name}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{svc.team}</TableCell>
                  <TableCell className="font-mono text-xs">{svc.df}</TableCell>
                  <TableCell className="font-mono text-xs">{svc.lt}</TableCell>
                  <TableCell className="font-mono text-xs text-emerald-500">{svc.cfr}</TableCell>
                  <TableCell className="font-mono text-xs">{svc.mttr}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={svc.tier === "Elite" ? "default" : "secondary"}
                      className="text-[10px]"
                    >
                      {svc.tier}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
