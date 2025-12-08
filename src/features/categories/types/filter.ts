export type DynamicFilters = {
  selected: Record<string, string[]>
  options: Record<string, { key: string; label: string; options: string[] }>
}