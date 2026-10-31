import type { Metadata } from "next"
import { DoraView } from "@/components/views/dora-view"

export const metadata: Metadata = { title: "DORA 지표" }

export default function DoraPage() {
  return <DoraView />
}
