// src/lib/data.ts (NOVO)
import portfolioData from '@/data/portfolio.json';
import { projects } from '@/lib/projects';
import {
 PersonalInfo,
 Experience,
 EducationItem,
 ComplementaryCourse,
 Skill,
 Language,
 Skills,
 Project,
 MetaInfo,
 GithubCommit,
} from './types';
import { personalInfoSchema, experienceSchema, educationSchema, projectSchema, skillSchema, languageSchema } from '@/lib/validation'; // Importa os schemas de validação
import { z } from 'zod'; // Importa Zod

// Funções para acessar os dados do portfolio.json
export const getMetaInfo = (): MetaInfo => z.object({
 title: z.string(),
 description: z.string(),
}).parse(portfolioData.meta);

export const getPersonalInfo = (): PersonalInfo =>
 personalInfoSchema.parse({
  ...portfolioData.personal,
  // Não precisa de cast, schema já valida
  social: portfolioData.personal.social,
 });

export const getExperiences = (): Experience[] => z.array(experienceSchema).parse(portfolioData.experiences);

export const getEducationItems = (): EducationItem[] => z.array(educationSchema).parse(portfolioData.education);

export const getComplementaryCourses = (): ComplementaryCourse[] => z.array(z.object({
 name: z.string(),
 link: z.string().url().or(z.literal("#")),
})).parse(portfolioData.complementary_education.courses);

export const getWorkshops = (): ComplementaryCourse[] => z.array(z.object({
 name: z.string(),
 link: z.string().url().or(z.literal("#")),
})).parse(portfolioData.complementary_education.workshops);

export const getTechnicalSkills = (): Skill[] =>
 z.array(skillSchema).parse(
  portfolioData.skills.technical.map((skill: any) => ({
   ...skill,
   category: skill.category ?? "",
  }))
 );

export const getSoftSkills = (): Skill[] =>
 z.array(skillSchema).parse(
  portfolioData.skills.soft.map((skill: any) => ({
   ...skill,
   category: skill.category ?? "",
  }))
 );

export const getLanguages = (): Language[] => z.array(languageSchema).parse(portfolioData.skills.languages);
export const getSkillsData = (): Skills => ({
 technical_areas: portfolioData.skills.technical_areas.map((area: any) => ({
  ...area,
  icon: area.icon ?? "Layout",
 })),
 technical: portfolioData.skills.technical.map((skill: any) => ({
  ...skill,
  category: skill.category ?? "",
 })),
 soft: portfolioData.skills.soft.map((skill: any) => ({
  ...skill,
  category: skill.category ?? "",
 })),
 languages: portfolioData.skills.languages,
 specialties: portfolioData.skills.specialties,
});


// Funções para projetos (de projects.json)
export const getAllProjects = (): Project[] =>
 projects.map((project: any) => ({
  ...project,
  images: project.images.map((img: any) => ({
   src: img.src ?? img.url ?? "",
   alt: img.alt ?? "",
  })),
 }));

export const getProjectBySlug = (slug: string): Project | null => {
 const project = projects.find((p) => p.slug === slug);
 if (!project) return null;
 return {
  ...project,
  images: project.images.map((img: any) => ({
   src: img.src ?? img.url ?? "",
   alt: img.alt ?? "",
  })),
 };
};

export const getFeaturedProjects = (limit = 3): Project[] => {
 const featured = projects.filter((project) => project.featured);
 return featured.slice(0, limit);
};

// Função para buscar commits do GitHub (mantida, mas com tipagem)
export async function getGithubCommits(): Promise<GithubCommit[]> {
 const username = "gui1416";
 try {
  const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`, {
   next: { revalidate: 3600 },
  });
  if (!reposResponse.ok) {
   throw new Error(`Erro ao buscar repositórios: ${reposResponse.status}`);
  }
  const repos = await reposResponse.json();

  const commitsPromises = repos.map(async (repo: any) => {
   const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=5`, {
    next: { revalidate: 3600 },
   });
   if (!commitsResponse.ok) {
    console.error(`Erro ao buscar commits para ${repo.name}: ${commitsResponse.status}`);
    return [];
   }
   const commits = await commitsResponse.json();
   return commits.map((commit: any) => ({
    repo: {
     name: repo.name,
     url: repo.html_url,
     description: repo.description ?? "",
     stars: repo.stargazers_count,
     language: repo.language ?? "",
    },
    sha: commit.sha,
    message: commit.commit.message,
    author: commit.commit.author.name,
    date: commit.commit.author.date,
    url: commit.html_url,
    branch: "main",
   }));
  });

  const commitsArrays = await Promise.all(commitsPromises);
  const allCommits = commitsArrays.flat().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Ajusta o schema para aceitar description como string
  const githubCommitSchema = z.object({
   repo: z.object({
    name: z.string(),
    url: z.string().url(),
    description: z.string(),
    stars: z.number().int().min(0),
    language: z.string(),
   }),
   sha: z.string(),
   message: z.string(),
   author: z.string(),
   date: z.string(),
   url: z.string().url(),
   branch: z.string(),
  });

  return z.array(githubCommitSchema).parse(allCommits);

 } catch (error) {
  console.error("Erro ao buscar dados do GitHub:", error);
  return [];
 }
}