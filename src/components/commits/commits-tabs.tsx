"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CommitsFeed } from "@/components/commits/commits-feed"
import { RepoGrid } from "@/components/commits/repo-grid"
import { ViewModeSwitcher, VIEW_MODE_STORAGE_KEY, type ViewMode } from "@/components/commits/view-mode-switcher"
import type { Commit, GithubRepo } from "@/lib/github"

const ACTIVE_TAB_STORAGE_KEY = "commits:active-tab"

type TabValue = "repos" | "commits"

export function CommitsTabs({ repos, commits }: { repos: GithubRepo[]; commits: Commit[] }) {
  const [activeTab, setActiveTab] = useState<TabValue>("repos")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")

  useEffect(() => {
    const storedTab = window.localStorage.getItem(ACTIVE_TAB_STORAGE_KEY) as TabValue | null
    if (storedTab) setActiveTab(storedTab)

    const storedViewMode = window.localStorage.getItem(VIEW_MODE_STORAGE_KEY) as ViewMode | null
    if (storedViewMode) setViewMode(storedViewMode)
  }, [])

  const handleTabChange = (value: string) => {
    const tab = value as TabValue
    setActiveTab(tab)
    window.localStorage.setItem(ACTIVE_TAB_STORAGE_KEY, tab)
  }

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode)
    window.localStorage.setItem(VIEW_MODE_STORAGE_KEY, mode)
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <div className="flex items-center justify-between mb-4">
        <TabsList>
          <TabsTrigger value="repos">Repositórios</TabsTrigger>
          <TabsTrigger value="commits">Commits</TabsTrigger>
        </TabsList>
        <ViewModeSwitcher value={viewMode} onChange={handleViewModeChange} />
      </div>
      <TabsContent value="repos">
        <RepoGrid repos={repos} viewMode={viewMode} />
      </TabsContent>
      <TabsContent value="commits">
        <CommitsFeed commits={commits} viewMode={viewMode} onViewModeChange={handleViewModeChange} />
      </TabsContent>
    </Tabs>
  )
}
