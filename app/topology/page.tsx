import type { Metadata } from "next"
import { TopologyView } from "@/components/views/topology-view"

export const metadata: Metadata = { title: "인프라 구성도" }

export default function TopologyPage() {
  return <TopologyView />
}
