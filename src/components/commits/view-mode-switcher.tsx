"use client"

import { AlignJustify, History, LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"

export type ViewMode = "grid" | "list" | "timeline" | "compact"

export const VIEW_MODE_STORAGE_KEY = "commits:view-mode"

const VIEW_MODES: { value: ViewMode; label: string; icon: typeof LayoutGrid }[] = [
  { value: "list", label: "Lista", icon: List },
  { value: "grid", label: "Grade", icon: LayoutGrid },
  { value: "timeline", label: "Linha do tempo", icon: History },
  { value: "compact", label: "Compacto", icon: AlignJustify },
]

export function ViewModeSwitcher({ value, onChange }: { value: ViewMode; onChange: (mode: ViewMode) => void }) {
  return (
    <div
      role="group"
      aria-label="Modo de visualização"
      className="inline-flex items-center gap-1 rounded-md border border-border p-1"
    >
      {VIEW_MODES.map((mode) => {
        const Icon = mode.icon
        const isActive = value === mode.value

        return (
          <Button
            key={mode.value}
            type="button"
            variant={isActive ? "secondary" : "ghost"}
            size="icon"
            onClick={() => onChange(mode.value)}
            aria-label={mode.label}
            aria-pressed={isActive}
          >
            <Icon className="h-4 w-4" />
          </Button>
        )
      })}
    </div>
  )
}
