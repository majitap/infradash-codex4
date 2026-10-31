/** Translate display labels without changing identifiers used by filtering. */
export function doraTierLabel(tier: string) {
  return ({ Elite: "최상위", High: "높음", Medium: "보통", Low: "낮음" } as Record<string, string>)[tier] ?? tier
}

export function stageLabel(stage: string) {
  return ({ build: "빌드", test: "테스트", lint: "코드 검사", security: "보안 검사", deploy: "배포" } as Record<string, string>)[stage] ?? stage
}
