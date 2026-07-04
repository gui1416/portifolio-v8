"use client"

import { useTranslations } from "next-intl"
import { AlignJustify, History, LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"

export type ViewMode = "grid" | "list" | "timeline" | "compact"

export const VIEW_MODE_STORAGE_KEY = "commits:view-mode"

const VIEW_MODES: { value: ViewMode; labelKey: string; icon: typeof LayoutGrid }[] = [
  { value: "list", labelKey: "viewList", icon: List },
  { value: "grid", labelKey: "viewGrid", icon: LayoutGrid },
  { value: "timeline", labelKey: "viewTimeline", icon: History },
  { value: "compact", labelKey: "viewCompact", icon: AlignJustify },
]

export function ViewModeSwitcher({ value, onChange }: { value: ViewMode; onChange: (mode: ViewMode) => void }) {
  const t = useTranslations("commits")
  return (
    <div
      role="group"
      aria-label={t("viewModeLabel")}
      className="inline-flex items-center gap-1 rounded-md border border-border p-1"
    >
      {VIEW_MODES.map((mode) => {
        const Icon = mode.icon
        const isActive = value === mode.value
        const label = t(mode.labelKey)

        return (
          <Button
            key={mode.value}
            type="button"
            variant={isActive ? "secondary" : "ghost"}
            size="icon"
            onClick={() => onChange(mode.value)}
            aria-label={label}
            aria-pressed={isActive}
          >
            <Icon className="h-4 w-4" />
          </Button>
        )
      })}
    </div>
  )
}
