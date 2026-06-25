import { Suspense } from "react"
import Link from "next/link"
import { Github } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CommitsTabs } from "@/components/commits/commits-tabs"
import { getAllRepos, getGithubCommits } from "@/lib/github"

function CommitsPageSkeleton() {
  return (
    <div>
      <Skeleton className="h-10 w-64 mb-4" />
      {[1, 2, 3].map((i) => (
        <Card key={i} className="mb-4">
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-60 mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-3/4" />
          </CardContent>
          <CardFooter className="pt-0 flex justify-between">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-24" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

async function CommitsPageContent() {
  const [repos, commits] = await Promise.all([getAllRepos(), getGithubCommits()])
  return <CommitsTabs repos={repos} commits={commits} />
}

export default function Atualizacoes() {
  return (
    <div className="container mx-auto max-w-4xl animate-fadeIn">
      <h1 className="text-4xl font-bold mb-2">Atualizações</h1>
      <p className="text-muted-foreground mb-8">
        Explore meus repositórios públicos ou acompanhe minhas contribuições mais recentes no GitHub.
      </p>

      <Suspense fallback={<CommitsPageSkeleton />}>
        <CommitsPageContent />
      </Suspense>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground mb-4">
          Quer ver mais do meu trabalho? Visite meu perfil completo no GitHub.
        </p>
        <Link
          href="https://github.com/gui1416"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <Github className="h-5 w-5" />
          github.com/gui1416
        </Link>
      </div>
    </div>
  )
}
