export interface ContributionDay {
  date: string
  count: number
  level: number
}

export interface ContributionsData {
  total: number
  days: ContributionDay[]
}

const USERNAME = "gui1416"

export async function getGithubContributions(): Promise<ContributionsData> {
  try {
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`Falha ao buscar contribuições: ${response.status}`)
    }

    const data = await response.json()

    return {
      total: data.total?.lastYear ?? 0,
      days: data.contributions ?? [],
    }
  } catch (error) {
    console.error("Erro ao buscar contribuições do GitHub:", error)
    return { total: 0, days: [] }
  }
}
