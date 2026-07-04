"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { useLocale, useTranslations } from "next-intl"
import { Clock, GitFork, Star } from "lucide-react"
import { dateFnsLocale } from "@/lib/date-locale"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { GithubRepo } from "@/lib/github"

export type RepoItemVariant = "grid" | "list" | "timeline" | "compact"

export function RepoItem({ repo, variant }: { repo: GithubRepo; variant: RepoItemVariant }) {
  const t = useTranslations("commits")
  const locale = useLocale()
  const updatedAgo = formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true, locale: dateFnsLocale(locale) })

  if (variant === "compact") {
    return (
      <Link
        href={`/commits/${repo.name}`}
        className="flex items-center gap-2 py-1.5 px-2 hover:bg-muted text-sm"
      >
        <span className="font-medium truncate flex-1">{repo.name}</span>
        {repo.language && (
          <Badge variant="outline" className="shrink-0">
            {repo.language}
          </Badge>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1 text-muted-foreground shrink-0">
            <Star className="h-3.5 w-3.5" /> {repo.stargazers_count}
          </span>
        )}
        <span className="text-xs text-muted-foreground shrink-0">{updatedAgo}</span>
      </Link>
    )
  }

  if (variant === "timeline") {
    return (
      <Link href={`/commits/${repo.name}`} className="block group">
        <div className="relative pl-6 pb-6 border-l border-border last:border-transparent last:pb-0">
          <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-primary" />
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Clock className="h-3 w-3" />
            <span>{t("updated", { time: updatedAgo })}</span>
          </div>
          <p className="font-medium text-sm group-hover:underline">{repo.name}</p>
          <p className="text-sm text-muted-foreground">{repo.description || t("noDescription")}</p>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/commits/${repo.name}`} className={`block group ${variant === "grid" ? "h-full" : ""}`}>
      <Card
        className={`transition-colors group-hover:border-primary/50 ${variant === "grid" ? "h-full" : "mb-4"}`}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-lg break-words">{repo.name}</CardTitle>
          <CardDescription>{repo.description || t("noDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {repo.language && <Badge variant="outline">{repo.language}</Badge>}
            {repo.stargazers_count > 0 && (
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5" /> {repo.stargazers_count}
              </span>
            )}
            {repo.forks_count > 0 && (
              <span className="flex items-center gap-1">
                <GitFork className="h-3.5 w-3.5" /> {repo.forks_count}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-0 text-xs text-muted-foreground">{t("updated", { time: updatedAgo })}</CardFooter>
      </Card>
    </Link>
  )
}
