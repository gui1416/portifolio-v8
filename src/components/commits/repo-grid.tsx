"use client"

import { FolderGit2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { RepoItem } from "@/components/commits/repo-item"
import type { ViewMode } from "@/components/commits/view-mode-switcher"
import type { GithubRepo } from "@/lib/github"

export function RepoGrid({ repos, viewMode }: { repos: GithubRepo[]; viewMode: ViewMode }) {
  if (repos.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <FolderGit2 className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">Nenhum repositório encontrado</h3>
          <p className="text-muted-foreground text-center">
            Não foi possível carregar os repositórios públicos agora.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <RepoItem key={repo.name} repo={repo} variant="grid" />
          ))}
        </div>
      )}

      {viewMode === "list" && repos.map((repo) => <RepoItem key={repo.name} repo={repo} variant="list" />)}

      {viewMode === "timeline" && repos.map((repo) => <RepoItem key={repo.name} repo={repo} variant="timeline" />)}

      {viewMode === "compact" && (
        <div className="divide-y divide-border border border-border rounded-md">
          {repos.map((repo) => (
            <RepoItem key={repo.name} repo={repo} variant="compact" />
          ))}
        </div>
      )}
    </div>
  )
}
