import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { ArrowLeft, ExternalLink, GitFork, Github, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CommitsFeed } from "@/components/commits/commits-feed"
import { getAllRepos, getRepoDetail } from "@/lib/github"
import { Link } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"

interface RepoPageProps {
  params: Promise<{ locale: string; repo: string }>
}

export async function generateStaticParams() {
  const repos = await getAllRepos()
  return routing.locales.flatMap((locale) =>
    repos.map((repo) => ({ locale, repo: repo.name }))
  )
}

export default async function RepoPage({ params }: RepoPageProps) {
  const { locale, repo: repoName } = await params
  setRequestLocale(locale)
  const t = await getTranslations("repo")
  const detail = await getRepoDetail(repoName)

  if (!detail) {
    notFound()
  }

  const { repo, commits } = detail

  return (
    <div className="container mx-auto max-w-4xl animate-fadeIn">
      <Link
        href="/commits"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t("back")}
      </Link>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-wrap justify-between items-start gap-2">
            <div className="min-w-0">
              <CardTitle className="text-2xl break-words">{repo.name}</CardTitle>
              <CardDescription className="mt-1">{repo.description || t("noDescription")}</CardDescription>
            </div>
            {repo.language && <Badge variant="outline">{repo.language}</Badge>}
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4" /> {repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1">
              <GitFork className="h-4 w-4" /> {repo.forks_count}
            </span>
          )}
          <Button asChild variant="outline" size="sm" className="ml-auto">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              {t("viewOnGithub")}
              <ExternalLink className="h-3 w-3 ml-2" />
            </a>
          </Button>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mb-4">{t("recentCommits")}</h2>

      <CommitsFeed
        commits={commits}
        showRepo={false}
        emptyTitle={t("emptyTitle")}
        emptyDescription={t("emptyDescription")}
      />
    </div>
  )
}
