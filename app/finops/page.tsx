import type { Metadata } from "next"
import { FinOpsView } from "@/components/views/finops-view"

export const metadata: Metadata = { title: "FinOps 비용 분석" }

export default function FinOpsPage() {
  return <FinOpsView />
}
