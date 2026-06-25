"use client"

import { useEffect, useState } from "react"
import { Github } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { CommitItem } from "@/components/commits/commit-item"
import { ViewModeSwitcher, VIEW_MODE_STORAGE_KEY, type ViewMode } from "@/components/commits/view-mode-switcher"
import type { Commit } from "@/lib/github"

export function CommitsFeed({
  commits,
  showRepo = true,
  emptyTitle = "Nenhum commit encontrado",
  emptyDescription = "Não foi possível encontrar commits nos repositórios públicos ou ocorreu um erro ao buscar os dados.",
  viewMode: viewModeProp,
  onViewModeChange,
}: {
  commits: Commit[]
  showRepo?: boolean
  emptyTitle?: string
  emptyDescription?: string
  viewMode?: ViewMode
  onViewModeChange?: (mode: ViewMode) => void
}) {
  const isControlled = viewModeProp !== undefined
  const [internalViewMode, setInternalViewMode] = useState<ViewMode>("list")

  useEffect(() => {
    if (isControlled) return
    const stored = window.localStorage.getItem(VIEW_MODE_STORAGE_KEY) as ViewMode | null
    if (stored) setInternalViewMode(stored)
  }, [isControlled])

  const viewMode = viewModeProp ?? internalViewMode

  const handleViewModeChange = (mode: ViewMode) => {
    if (onViewModeChange) {
      onViewModeChange(mode)
      return
    }
    setInternalViewMode(mode)
    window.localStorage.setItem(VIEW_MODE_STORAGE_KEY, mode)
  }

  if (commits.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Github className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">{emptyTitle}</h3>
          <p className="text-muted-foreground text-center">{emptyDescription}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      {!isControlled && (
        <div className="flex justify-end mb-4">
          <ViewModeSwitcher value={viewMode} onChange={handleViewModeChange} />
        </div>
      )}

      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {commits.map((commit, index) => (
            <CommitItem
              key={`${commit.repo.name}-${commit.sha}-${index}`}
              commit={commit}
              variant="grid"
              showRepo={showRepo}
            />
          ))}
        </div>
      )}

      {viewMode === "list" &&
        commits.map((commit, index) => (
          <CommitItem
            key={`${commit.repo.name}-${commit.sha}-${index}`}
            commit={commit}
            variant="list"
            showRepo={showRepo}
          />
        ))}

      {viewMode === "timeline" &&
        commits.map((commit, index) => (
          <CommitItem
            key={`${commit.repo.name}-${commit.sha}-${index}`}
            commit={commit}
            variant="timeline"
            showRepo={showRepo}
          />
        ))}

      {viewMode === "compact" && (
        <div className="divide-y divide-border border border-border rounded-md">
          {commits.map((commit, index) => (
            <CommitItem
              key={`${commit.repo.name}-${commit.sha}-${index}`}
              commit={commit}
              variant="compact"
              showRepo={showRepo}
            />
          ))}
        </div>
      )}
    </div>
  )
}
