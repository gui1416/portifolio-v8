import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Clock, ExternalLink, GitBranch, GitCommit, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Commit } from "@/lib/github"

export type CommitItemVariant = "grid" | "list" | "timeline" | "compact"

export function CommitItem({
  commit,
  variant,
  showRepo = true,
}: {
  commit: Commit
  variant: CommitItemVariant
  showRepo?: boolean
}) {
  const commitDate = new Date(commit.date)
  const timeAgo = formatDistanceToNow(commitDate, { addSuffix: true, locale: ptBR })
  const shortSha = commit.sha.substring(0, 7)

  const maxLength = variant === "compact" ? 60 : 100
  const shortMessage =
    commit.message.length > maxLength
      ? `${commit.message.slice(0, maxLength).trimEnd()}...`
      : commit.message

  if (variant === "compact") {
    return (
      <Link
        href={commit.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 py-1.5 px-2 hover:bg-muted text-sm"
      >
        <code className="text-xs text-muted-foreground shrink-0">{shortSha}</code>
        <span className="truncate flex-1">{shortMessage}</span>
        {showRepo && (
          <Badge variant="outline" className="shrink-0">
            {commit.repo.name}
          </Badge>
        )}
        <time dateTime={commit.date} className="text-xs text-muted-foreground shrink-0">
          {timeAgo}
        </time>
      </Link>
    )
  }

  if (variant === "timeline") {
    return (
      <div className="relative pl-6 pb-6 border-l border-border last:border-transparent last:pb-0">
        <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-primary" />
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
          <Clock className="h-3 w-3" />
          <time dateTime={commit.date}>{timeAgo}</time>
          {showRepo && (
            <>
              <span>•</span>
              <span>{commit.repo.name}</span>
            </>
          )}
        </div>
        <p className="font-medium text-sm">{shortMessage}</p>
        <div className="flex items-center text-xs text-muted-foreground gap-2 mt-1">
          <GitBranch className="h-3 w-3" />
          <span>{commit.branch}</span>
        </div>
        <Link
          href={commit.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:underline inline-flex items-center gap-1 mt-1"
        >
          Ver commit <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
    )
  }

  return (
    <Card className={variant === "grid" ? "h-full flex flex-col" : "mb-4"}>
      {showRepo && (
        <CardHeader className="pb-2">
          <div className="flex flex-wrap justify-between items-start gap-2">
            <div className="min-w-0">
              <Link
                href={commit.repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1"
              >
                <Github className="h-4 w-4 shrink-0" />
                <CardTitle className="text-lg break-words">{commit.repo.name}</CardTitle>
              </Link>
              {variant === "list" && (
                <CardDescription className="mt-1">{commit.repo.description || "Sem descrição"}</CardDescription>
              )}
            </div>
            {commit.repo.language && <Badge variant="outline">{commit.repo.language}</Badge>}
          </div>
        </CardHeader>
      )}
      <CardContent className={`${variant === "grid" ? "flex-1" : ""} ${showRepo ? "" : "pt-6"}`.trim()}>
        <div className="space-y-2">
          <p className="font-medium">{shortMessage}</p>
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <GitBranch className="h-4 w-4" />
            <span>{commit.branch}</span>
            <span className="mx-1">•</span>
            <GitCommit className="h-4 w-4" />
            <code className="bg-muted px-1 py-0.5 rounded text-xs">{shortSha}</code>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center text-sm">
        <div className="flex items-center text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <time dateTime={commit.date}>{timeAgo}</time>
        </div>
        <Link
          href={commit.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline flex items-center"
        >
          Ver commit <ExternalLink className="h-3 w-3 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  )
}
