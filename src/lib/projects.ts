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
}

// A URL agora é lida da variável de ambiente
const API_URL = process.env.PROJECTS_API_URL;

async function fetchProjects(): Promise<Project[]> {
  if (!API_URL) {
    console.error("A variável de ambiente NEXT_PUBLIC_API_URL não está definida.");
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


export async function getAllProjects(): Promise<Project[]> {
  return await fetchProjects()
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await fetchProjects();
  return projects.find((project) => project.slug === slug)
}

export async function getRelatedProjects(currentSlug: string, limit = 2): Promise<RelatedProject[]> {
  const projects = await fetchProjects();
  const currentProject = projects.find((project) => project.slug === currentSlug);

  if (!currentProject || !currentProject.relatedProjects || currentProject.relatedProjects.length === 0) {
    return projects
      .filter((project) => project.slug !== currentSlug)
      .slice(0, limit)
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