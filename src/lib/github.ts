const USERNAME = "gui1416"
const MAX_REPOS_FOR_FEED = 6

export interface GithubRepo {
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  fork: boolean
  default_branch: string
  updated_at: string
  // Data do último push (proxy do commit mais recente). Vem da API do GitHub.
  pushed_at: string
}

interface GithubCommitApi {
  sha: string
  html_url: string
  commit: {
    message: string
    author: {
      date: string
    }
  }
  author: { login: string } | null
}

export interface Commit {
  repo: {
    name: string
    url: string
    description: string | null
    stars: number
    language: string | null
  }
  sha: string
  message: string
  author: string
  date: string
  url: string
  branch: string
}

async function fetchRepos(): Promise<GithubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`Erro ao buscar repositórios: ${response.status}`)
    }

    const repos: GithubRepo[] = await response.json()
    return repos.filter((repo) => !repo.fork)
  } catch (error) {
    console.error("Erro ao buscar repositórios:", error)
    return []
  }
}

async function fetchRepoCommits(repo: GithubRepo, perPage: number): Promise<Commit[]> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${USERNAME}/${repo.name}/commits?sha=${repo.default_branch}&per_page=${perPage}`,
      { next: { revalidate: 3600 } },
    )

    if (response.status === 409) {
      // Repositório vazio (sem commits) — não é um erro, a API retorna 409 nesse caso.
      return []
    }

    if (!response.ok) {
      console.warn(`Erro ao buscar commits para ${repo.name}: ${response.status}`)
      return []
    }

    const commits: GithubCommitApi[] = await response.json()

    return commits
      .filter((commit) => commit.author?.login === USERNAME)
      .map((commit) => ({
        repo: {
          name: repo.name,
          url: repo.html_url,
          description: repo.description,
          stars: repo.stargazers_count,
          language: repo.language,
        },
        sha: commit.sha,
        message: commit.commit.message,
        author: commit.author!.login,
        date: commit.commit.author.date,
        url: commit.html_url,
        branch: repo.default_branch,
      }))
  } catch (error) {
    console.warn(`Erro ao buscar commits para ${repo.name}:`, error)
    return []
  }
}

export async function getAllRepos(): Promise<GithubRepo[]> {
  return fetchRepos()
}

// Normaliza uma URL de repositório para casar projeto (githubUrl) com repo
// (html_url), ignorando caixa, sufixo .git e barras finais.
export function normalizeRepoUrl(url: string): string {
  return url.trim().toLowerCase().replace(/\.git$/, "").replace(/\/+$/, "")
}

// Mapa `URL normalizada do repo -> data do último push`, para ordenar projetos
// pelo commit mais recente. Reutiliza a lista de repos (cache de 1h, 1 request).
export async function getRepoPushedDates(): Promise<Map<string, string>> {
  const repos = await fetchRepos()
  return new Map(repos.map((repo) => [normalizeRepoUrl(repo.html_url), repo.pushed_at]))
}

export async function getRepoByName(name: string): Promise<GithubRepo | undefined> {
  const repos = await fetchRepos()
  return repos.find((repo) => repo.name === name)
}

export async function getGithubCommits(): Promise<Commit[]> {
  const repos = (await fetchRepos()).slice(0, MAX_REPOS_FOR_FEED)
  const commitsArrays = await Promise.all(repos.map((repo) => fetchRepoCommits(repo, 5)))

  return commitsArrays.flat().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getRepoDetail(name: string): Promise<{ repo: GithubRepo; commits: Commit[] } | undefined> {
  const repo = await getRepoByName(name)
  if (!repo) return undefined

  const commits = await fetchRepoCommits(repo, 30)
  return { repo, commits }
}
