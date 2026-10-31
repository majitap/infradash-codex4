import type { Metadata } from "next"
import { AiOpsView } from "@/components/views/ai-ops-view"

export const metadata: Metadata = { title: "Gemini AI 운영 센터" }

export default function AiOpsPage() {
  return <AiOpsView />
}
