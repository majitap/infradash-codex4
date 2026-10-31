import type { Metadata } from "next"
import { DoraView } from "@/components/views/dora-view"

export const metadata: Metadata = { title: "배포 성과 지표" }

export default function DoraPage() {
  return <DoraView />
}
