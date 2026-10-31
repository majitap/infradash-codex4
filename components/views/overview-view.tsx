"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  GitBranch,
  LoaderCircle,
  RefreshCw,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  dailyPipelines,
  successRate,
  recentPipelines,
  runnerCounts,
  runnerBusy,
  runnerCapacity,
  avgQueueSeconds,
  incidents,
  type RecentPipeline,
} from "@/lib/mock-data";
import { stageLabel } from "@/lib/localization";

const int = new Intl.NumberFormat("ko-KR");
const statusInfo = {
  success: { label: "성공", icon: CheckCircle2 },
  failed: { label: "실패", icon: CircleAlert },
  running: { label: "실행 중", icon: LoaderCircle },
  pending: { label: "대기", icon: Clock3 },
  canceled: { label: "취소", icon: X },
};
type Filter = "all" | "running" | "failed";
const shortDate = (date: string) =>
  `${Number(date.slice(5, 7))}.${Number(date.slice(8))}`;

export function OverviewView() {
  const [range, setRange] = React.useState<7 | 30>(7);
  const [selectedDay, setSelectedDay] = React.useState<string | null>(null);
  const [filter, setFilter] = React.useState<Filter>("all");
  const [pipeline, setPipeline] = React.useState<RecentPipeline | null>(null);
  const [refreshed, setRefreshed] = React.useState(false);
  const days = dailyPipelines.slice(-range);
  const previous = dailyPipelines.slice(-range * 2, -range);
  const rate = successRate(days);
  const rateDiff = rate - successRate(previous);
  const total = days.reduce(
    (sum, d) => sum + d.success + d.failed + d.canceled,
    0,
  );
  const max = Math.max(...days.map((d) => d.success + d.failed + d.canceled));
  const selected =
    days.find((d) => d.date === selectedDay) ?? days[days.length - 1];
  const utilization = Math.round((runnerBusy / runnerCapacity) * 100);
  const list = recentPipelines
    .filter((p) => filter === "all" || p.status === filter)
    .slice(0, 5);
  const unresolved = incidents.filter((i) => i.status !== "resolved");

  function downloadReport() {
    const csv =
      "\uFEFF날짜,성공,실패,취소\r\n" +
      days
        .map((d) => `${d.date},${d.success},${d.failed},${d.canceled}`)
        .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `infradash-${range}days-2026-10-31.csv`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast.success("선택한 기간의 리포트를 저장했습니다");
  }

  return (
    <div className="overview">
      <div className="overview-heading">
        <div>
          <p className="eyebrow">GITLAB / MAJITAP</p>
          <h1>인프라, 한눈에.</h1>
          <p className="page-description">
            배포부터 운영까지, 오늘의 흐름을 확인하세요.
          </p>
        </div>
        <div className="overview-heading-actions">
          <span className="snapshot-date">2026년 10월 31일 토요일</span>
          <button className="quiet-button" onClick={downloadReport}>
            <ArrowDownToLine size={18} />
            리포트 내보내기
          </button>
        </div>
      </div>

      <div className="overview-toolbar">
        <div className="period-control" role="group" aria-label="조회 기간">
          {([7, 30] as const).map((n) => (
            <button
              key={n}
              aria-pressed={range === n}
              onClick={() => {
                setRange(n);
                setSelectedDay(null);
              }}
            >
              최근 {n}일
            </button>
          ))}
        </div>
        <button
          className="refresh-button"
          onClick={() => {
            setRefreshed(true);
            toast.success("데모 스냅샷을 다시 확인했습니다");
          }}
        >
          <RefreshCw size={14} />
          <span>{refreshed ? "방금 확인" : "10:12 기준"}</span>
        </button>
      </div>

      <div className="overview-stats">
        <Link href="/pipelines" className="metric-card metric-featured">
          <div className="metric-label">
            파이프라인 성공률
            <ArrowUpRight size={20} />
          </div>
          <div className="metric-number">
            {rate.toFixed(1)}
            <span>%</span>
          </div>
          <div className="metric-note">
            <span className="metric-change">
              {rateDiff >= 0 ? "+" : ""}
              {rateDiff.toFixed(1)}%p
            </span>
            <span>이전 {range}일 대비</span>
          </div>
        </Link>
        <Link href="/pipelines" className="metric-card">
          <div className="metric-label">
            전체 파이프라인
            <ArrowUpRight size={20} />
          </div>
          <div className="metric-number">
            {int.format(total)}
            <span>회</span>
          </div>
          <div className="metric-note">
            <span className="status-dot purple" />
            최근 {range}일 실행
          </div>
        </Link>
        <Link href="/runners" className="metric-card">
          <div className="metric-label">
            온라인 러너
            <ArrowUpRight size={20} />
          </div>
          <div className="metric-number">
            {runnerCounts.online}
            <span>/ {runnerCounts.all}대</span>
          </div>
          <div className="metric-note">
            <span className="status-dot green" />
            동시 작업 {runnerCapacity}개 수용 가능
          </div>
        </Link>
        <Link href="/pipelines" className="metric-card">
          <div className="metric-label">
            평균 대기 시간
            <ArrowUpRight size={20} />
          </div>
          <div className="metric-number">
            {avgQueueSeconds}
            <span>초</span>
          </div>
          <div className="metric-note">
            <span className="status-dot green" />
            작업 생성부터 러너 할당까지
          </div>
        </Link>
      </div>

      <div className="overview-main-grid">
        <section
          className="panel pipeline-chart-panel"
          aria-labelledby="pipeline-chart-title"
        >
          <div className="panel-heading">
            <div>
              <h2 id="pipeline-chart-title">꾸준히 이어지는 배포</h2>
              <p>일별 파이프라인 실행 추이</p>
            </div>
            <Link className="text-link" href="/pipelines">
              상세 보기
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="chart-summary">
            <strong>
              {int.format(total)}
              <span>회</span>
            </strong>
            <span>
              {shortDate(days[0].date)} —{" "}
              {shortDate(days[days.length - 1].date)}
            </span>
          </div>
          <div
            className={`capsule-chart ${range === 30 ? "month-chart" : ""}`}
            role="group"
            aria-label="날짜별 파이프라인. 날짜를 선택하면 실행 건수를 확인할 수 있습니다."
          >
            {days.map((day, i) => {
              const sum = day.success + day.failed + day.canceled;
              return (
                <button
                  key={day.date}
                  className="capsule-column"
                  aria-pressed={selected.date === day.date}
                  aria-label={`${day.date}, 성공 ${day.success}회, 실패 ${day.failed}회, 취소 ${day.canceled}회`}
                  onClick={() => setSelectedDay(day.date)}
                >
                  <span className="capsule-track">
                    <span
                      className="capsule-bar"
                      style={{ height: `${(sum / max) * 100}%` }}
                    >
                      <span
                        className="capsule-failed"
                        style={{ height: `${(day.failed / sum) * 100}%` }}
                      />
                    </span>
                  </span>
                  <span className="capsule-day">
                    {range === 7
                      ? new Date(`${day.date}T12:00:00`).toLocaleDateString(
                          "ko-KR",
                          { weekday: "short" },
                        )
                      : i % 5 === 0 || i === 29
                        ? shortDate(day.date)
                        : ""}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="chart-caption" aria-live="polite">
            <div className="chart-legend">
              <span>
                <i className="purple" />
                성공·취소
              </span>
              <span>
                <i className="pink" />
                실패
              </span>
            </div>
            <p>
              <strong>{shortDate(selected.date)}</strong> 성공{" "}
              {int.format(selected.success)} · 실패 {selected.failed} · 취소{" "}
              {selected.canceled}
            </p>
          </div>
        </section>

        <section className="panel runner-panel" aria-labelledby="runner-title">
          <div className="panel-heading">
            <div>
              <h2 id="runner-title">러너 가동 현황</h2>
              <p>작업을 처리할 여유가 있어요</p>
            </div>
            <Link
              href="/runners"
              className="icon-link"
              aria-label="러너 상세 보기"
            >
              <ArrowUpRight size={20} />
            </Link>
          </div>
          <div
            className="runner-gauge"
            role="img"
            aria-label={`동시 실행 슬롯 ${runnerCapacity}개 중 ${runnerBusy}개 사용, 사용률 ${utilization}%`}
            style={{
              background: `conic-gradient(from 230deg, var(--primary) 0deg ${utilization * 2.8}deg, var(--soft-purple) ${utilization * 2.8}deg 280deg, transparent 280deg)`,
            }}
          >
            <div>
              <span>슬롯 사용률</span>
              <strong>
                {utilization}
                <span>%</span>
              </strong>
              <span>
                {runnerBusy} / {runnerCapacity}개 사용 중
              </span>
            </div>
          </div>
          <div className="runner-status-row">
            <span>
              <i className="green" />
              온라인<strong>{runnerCounts.online}</strong>
            </span>
            <span>
              <i className="gray" />
              오프라인<strong>{runnerCounts.offline}</strong>
            </span>
            <span>
              <i className="amber" />
              일시정지<strong>{runnerCounts.paused}</strong>
            </span>
          </div>
          <Link href="/runners" className="runner-footer-link">
            러너 상태 확인하기
            <ArrowRight size={16} />
          </Link>
        </section>
      </div>

      <div className="overview-main-grid lower-grid">
        <section
          className="panel recent-pipelines"
          aria-labelledby="recent-title"
        >
          <div className="panel-heading">
            <div>
              <h2 id="recent-title">최근 파이프라인</h2>
              <p>프로젝트의 마지막 실행을 확인하세요</p>
            </div>
            <Link className="text-link" href="/pipelines">
              전체 보기
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <div
            className="pipeline-tabs"
            role="group"
            aria-label="파이프라인 상태 필터"
          >
            {(
              [
                { key: "all", label: "전체" },
                { key: "running", label: "실행 중" },
                { key: "failed", label: "실패" },
              ] as const
            ).map((f) => (
              <button
                key={f.key}
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
                <span>
                  {f.key === "all"
                    ? recentPipelines.length
                    : recentPipelines.filter((p) => p.status === f.key).length}
                </span>
              </button>
            ))}
          </div>
          <div className="pipeline-list">
            {list.map((p) => {
              const meta = statusInfo[p.status];
              const Icon = meta.icon;
              return (
                <button
                  key={p.id}
                  className="pipeline-row"
                  onClick={() => setPipeline(p)}
                  aria-label={`${p.project} #${p.id} ${meta.label} 상세 보기`}
                >
                  <Icon size={20} className={`pipeline-state ${p.status}`} />
                  <span className="pipeline-project">
                    <strong>{p.project}</strong>
                    <span>
                      <GitBranch size={14} />
                      {p.ref}
                      <i />#{p.id}
                    </span>
                  </span>
                  <span className={`pipeline-status ${p.status}`}>
                    {meta.label}
                  </span>
                  <span className="pipeline-duration">
                    {Math.floor(p.durationSeconds / 60)}분{" "}
                    {p.durationSeconds % 60}초
                  </span>
                  <ChevronRight size={16} />
                </button>
              );
            })}
          </div>
        </section>

        <section
          className="panel attention-panel"
          aria-labelledby="attention-title"
        >
          <div className="panel-heading">
            <div>
              <h2 id="attention-title">
                지금 확인할 일
                <span className="attention-count">{unresolved.length + 1}</span>
              </h2>
              <p>중요한 일부터 차근차근</p>
            </div>
          </div>
          <div className="attention-list">
            <Link href="/incidents" className="attention-item">
              <span className="attention-marker red" />
              <div>
                <span className="attention-category">인시던트 · 대응 중</span>
                <h3>결제 API 응답 오류</h3>
                <p>실패 요청을 확인하고, 복구 진행 상황을 살펴보세요.</p>
              </div>
              <ArrowUpRight size={18} />
            </Link>
            <Link href="/storage" className="attention-item">
              <span className="attention-marker amber" />
              <div>
                <span className="attention-category">스토리지 · 주의</span>
                <h3>Gitaly 볼륨 사용률 91%</h3>
                <p>여유 공간이 부족해지기 전에 용량을 점검하세요.</p>
              </div>
              <ArrowUpRight size={18} />
            </Link>
            <Link href="/finops" className="attention-item">
              <span className="attention-marker purple" />
              <div>
                <span className="attention-category">비용 · 개선 제안</span>
                <h3>유휴 비용을 줄일 수 있어요</h3>
                <p>월 $2,840의 미사용 리소스를 확인하세요.</p>
              </div>
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <Link href="/ai-ops" className="insight-link">
            <span>다음 조치가 고민된다면</span>
            <strong>
              AI 운영 센터에서 확인
              <ArrowRight size={16} />
            </strong>
          </Link>
        </section>
      </div>

      <Dialog
        open={pipeline !== null}
        onOpenChange={(open) => {
          if (!open) setPipeline(null);
        }}
      >
        <DialogContent className="pipeline-dialog sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>파이프라인 #{pipeline?.id}</DialogTitle>
            <DialogDescription>
              {pipeline?.project} · {pipeline?.ref}
            </DialogDescription>
          </DialogHeader>
          {pipeline && (
            <>
              <div className="pipeline-detail-status">
                <span className={`pipeline-status ${pipeline.status}`}>
                  {statusInfo[pipeline.status].label}
                </span>
                <span>
                  실행 시간 {Math.floor(pipeline.durationSeconds / 60)}분{" "}
                  {pipeline.durationSeconds % 60}초
                </span>
              </div>
              <dl className="pipeline-detail-meta">
                <div>
                  <dt>실행자</dt>
                  <dd>{pipeline.triggeredBy.name}</dd>
                </div>
                <div>
                  <dt>시작 시간</dt>
                  <dd>{pipeline.startedAt.replace("T", " ").slice(0, 16)}</dd>
                </div>
              </dl>
              <div className="pipeline-stage-list">
                {(["build", "test", "lint", "security", "deploy"] as const).map(
                  (stage, i) => {
                    const failed = pipeline.failedStage === stage;
                    const failedIndex = (
                      ["build", "test", "lint", "security", "deploy"] as const
                    ).findIndex((s) => s === pipeline.failedStage);
                    const waiting =
                      pipeline.status === "canceled" ||
                      pipeline.status === "pending" ||
                      (pipeline.status === "failed" && i > failedIndex) ||
                      (pipeline.status === "running" && i > 1);
                    return (
                      <div key={stage}>
                        <span
                          className={
                            failed ? "failed" : waiting ? "waiting" : "success"
                          }
                        >
                          {failed ? (
                            <X size={16} />
                          ) : waiting ? (
                            <Clock3 size={16} />
                          ) : pipeline.status === "running" && i === 1 ? (
                            <LoaderCircle size={16} />
                          ) : (
                            <Check size={16} />
                          )}
                        </span>
                        <strong>{stageLabel(stage)}</strong>
                        <span>
                          {failed
                            ? "실패"
                            : waiting
                              ? "대기"
                              : pipeline.status === "running" && i === 1
                                ? "실행 중"
                                : "완료"}
                        </span>
                      </div>
                    );
                  },
                )}
              </div>
              <p className="detail-note">
                데모 실행 내역입니다. 실제 로그와 재실행은 연결되어 있지
                않습니다.
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
