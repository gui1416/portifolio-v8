import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, GitFork, Github, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CommitsFeed } from "@/components/commits/commits-feed"
import { getAllRepos, getRepoDetail } from "@/lib/github"

interface RepoPageProps {
  params: Promise<{ repo: string }>
}

export async function generateStaticParams() {
  const repos = await getAllRepos()
  return repos.map((repo) => ({ repo: repo.name }))
}

export default async function RepoPage({ params }: RepoPageProps) {
  const { repo: repoName } = await params
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
        Voltar para Atualizações
      </Link>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-wrap justify-between items-start gap-2">
            <div className="min-w-0">
              <CardTitle className="text-2xl break-words">{repo.name}</CardTitle>
              <CardDescription className="mt-1">{repo.description || "Sem descrição"}</CardDescription>
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
              Ver no GitHub
              <ExternalLink className="h-3 w-3 ml-2" />
            </a>
          </Button>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mb-4">Commits recentes</h2>

      <CommitsFeed
        commits={commits}
        showRepo={false}
        emptyTitle="Nenhum commit encontrado"
        emptyDescription="Nenhum commit encontrado para este repositório."
      />
    </div>
  )
}
