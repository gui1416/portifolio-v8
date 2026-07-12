export interface ProjectGalleryImage {
  url: string
  caption?: string
}

export interface RelatedProject {
  id: number
  slug: string
  title: string
  category: string
  shortDescription?: string
  technologies?: string[]
  timeline: string
  liveUrl?: string
  githubUrl?: string
  image: string
}

// Fields that can be translated per locale via the API `i18n` overlay.
export interface ProjectTranslation {
  title?: string
  category?: string
  shortDescription?: string
  description?: string[]
  features?: string[]
  role?: string
}

export interface Project {
  id: number
  slug: string
  title: string
  category: string
  shortDescription: string
  description: string[]
  features: string[]
  technologies: string[]
  coverImage: string
  thumbnailImage: string
  gallery?: ProjectGalleryImage[]
  client?: string
  timeline: string
  role: string
  liveUrl?: string
  githubUrl?: string
  relatedProjects?: RelatedProject[]
  // Canonical (untranslated) category used for filtering; set by localizeProject.
  categoryKey?: string
  // Per-locale overlays (present in db.json). Not rendered directly.
  i18n?: {
    en?: ProjectTranslation
    es?: ProjectTranslation
  }
}

import { getRepoTimeline } from "./repo-timeline"
import { getRepoPushedDates, normalizeRepoUrl } from "./github"

export type Locale = "pt" | "en" | "es"

const API_URL = process.env.PROJECTS_API_URL;

async function fetchProjects(): Promise<Project[]> {
  if (!API_URL) {
    console.error("A variável de ambiente PROJECTS_API_URL não está definida.");
    return [];
  }

  try {
    const response = await fetch(API_URL, { next: { revalidate: 3600 } });
    if (!response.ok) {
      throw new Error('Falha ao buscar projetos');
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    return [];
  }
}

// Applies the locale overlay over the base (PT) record. Falls back to the base
// value whenever a translation is missing. `categoryKey` always keeps the
// canonical category so UI filters keep working across languages.
function localizeProject(project: Project, locale: Locale): Project {
  const categoryKey = project.category
  if (locale === "pt" || !project.i18n?.[locale]) {
    return { ...project, categoryKey }
  }
  const overlay = project.i18n[locale]!
  return {
    ...project,
    categoryKey,
    title: overlay.title ?? project.title,
    category: overlay.category ?? project.category,
    shortDescription: overlay.shortDescription ?? project.shortDescription,
    description: overlay.description ?? project.description,
    features: overlay.features ?? project.features,
    role: overlay.role ?? project.role,
  }
}


// Overwrites the manual `timeline` with the year derived from the repo's
// creation date (falls back to the manual value on any failure).
async function withRepoTimeline(project: Project): Promise<Project> {
  const timeline = await getRepoTimeline(project.githubUrl, project.timeline)
  return { ...project, timeline }
}

export async function getAllProjects(locale: Locale = "pt"): Promise<Project[]> {
  const projects = await fetchProjects()
  const [enriched, pushedDates] = await Promise.all([
    Promise.all(projects.map((project) => withRepoTimeline(localizeProject(project, locale)))),
    getRepoPushedDates(),
  ])

  // Ordena do commit mais recente ao mais antigo, usando a data de push do repo.
  // Projetos sem repo/sem correspondência caem para o fim (timestamp 0).
  const lastActivity = (project: Project): number => {
    if (!project.githubUrl) return 0
    const date = pushedDates.get(normalizeRepoUrl(project.githubUrl))
    return date ? new Date(date).getTime() : 0
  }

  return enriched.sort((a, b) => lastActivity(b) - lastActivity(a))
}

// Índice leve de projetos (sem enriquecer com dados do repositório) para o
// command palette. Rápido e serializável — apenas o necessário para busca/navegação.
export interface ProjectIndexItem {
  slug: string
  title: string
  category: string
}

export async function getProjectsIndex(locale: Locale = "pt"): Promise<ProjectIndexItem[]> {
  const projects = await fetchProjects()
  return projects.map((project) => {
    const localized = localizeProject(project, locale)
    return {
      slug: localized.slug,
      title: localized.title,
      category: localized.category,
    }
  })
}

export async function getProjectBySlug(slug: string, locale: Locale = "pt"): Promise<Project | undefined> {
  const projects = await fetchProjects();
  const project = projects.find((project) => project.slug === slug)
  return project ? withRepoTimeline(localizeProject(project, locale)) : undefined
}

export async function getRelatedProjects(currentSlug: string, locale: Locale = "pt", limit = 2): Promise<RelatedProject[]> {
  const projects = await fetchProjects();
  const currentProject = projects.find((project) => project.slug === currentSlug);

  if (!currentProject || !currentProject.relatedProjects || currentProject.relatedProjects.length === 0) {
    return projects
      .filter((project) => project.slug !== currentSlug)
      .slice(0, limit)
      .map((project) => localizeProject(project, locale))
      .map((project) => ({
        id: project.id,
        slug: project.slug,
        title: project.title,
        category: project.category,
        image: project.thumbnailImage,
        timeline: project.timeline,
        shortDescription: project.shortDescription,
        technologies: project.technologies,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
      }))
  }

  return currentProject.relatedProjects.slice(0, limit)
}
