import type { Metadata } from "next"
import { TopologyView } from "@/components/views/topology-view"

export const metadata: Metadata = { title: "인프라 토폴로지" }

export default function TopologyPage() {
  return <TopologyView />
}
