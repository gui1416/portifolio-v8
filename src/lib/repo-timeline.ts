// Derives a project's timeline automatically from its GitHub repository
// (creation date) instead of a manually maintained value. Falls back to the
// provided value whenever the repo is private, missing or the request fails.

const GITHUB_API = "https://api.github.com/repos"

function parseOwnerRepo(githubUrl?: string): { owner: string; repo: string } | null {
  if (!githubUrl) return null
  try {
    const url = new URL(githubUrl)
    if (url.hostname !== "github.com") return null
    const [owner, repo] = url.pathname.replace(/^\/+/, "").split("/")
    if (!owner || !repo) return null
    return { owner, repo: repo.replace(/\.git$/, "") }
  } catch {
    return null
  }
}

/**
 * Returns the project's timeline (year) derived from the repository creation
 * date. Uses a 24h cache since the value rarely changes. Pass a `GITHUB_TOKEN`
 * env var to raise the unauthenticated rate limit (60 req/h per IP).
 */
export async function getRepoTimeline(githubUrl?: string, fallback = ""): Promise<string> {
  const parsed = parseOwnerRepo(githubUrl)
  if (!parsed) return fallback

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
    }
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const res = await fetch(`${GITHUB_API}/${parsed.owner}/${parsed.repo}`, {
      headers,
      next: { revalidate: 86400 },
    })
    if (!res.ok) return fallback

    const data = (await res.json()) as { created_at?: string }
    if (!data.created_at) return fallback

    return String(new Date(data.created_at).getFullYear())
  } catch {
    return fallback
  }
}
