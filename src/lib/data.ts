// src/lib/data.ts
import portfolioData from '@/data/portfolio.json'; // Importa os dados do portfólio em JSON
import { projects } from '@/lib/projects'; // Importa o array de projetos
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
} from './types'; // Importa todas as interfaces
import {
 personalInfoSchema,
 experienceSchema,
 educationSchema,
 skillSchema,
 languageSchema,
 complementaryCourseSchema,
 metaInfoSchema,
 githubCommitSchema,
 projectSchema,
} from '@/lib/validation'; // Importa todos os schemas de validação
import { z } from 'zod'; // Importa Zod para validação

// Função para obter as meta informações do portfólio
export const getMetaInfo = (): MetaInfo => metaInfoSchema.parse(portfolioData.meta);

// Função para obter as informações pessoais
export const getPersonalInfo = (): PersonalInfo => personalInfoSchema.parse(portfolioData.personal);

// Função para obter as experiências profissionais
export const getExperiences = (): Experience[] => {
 // Transforma `null` em array vazio para `technologies` para evitar erros de tipagem/validação
 return z.array(experienceSchema).parse(
  portfolioData.experiences.map((exp: any) => ({
   ...exp,
   technologies: exp.technologies === null ? [] : exp.technologies,
  }))
 );
};

// Função para obter os itens de educação
export const getEducationItems = (): EducationItem[] => z.array(educationSchema).parse(portfolioData.education);

// Função para obter os cursos complementares
export const getComplementaryCourses = (): ComplementaryCourse[] =>
 z.array(complementaryCourseSchema).parse(portfolioData.complementary_education.courses);

// Função para obter os workshops
export const getWorkshops = (): ComplementaryCourse[] =>
 z.array(complementaryCourseSchema).parse(portfolioData.complementary_education.workshops);

// Função para obter as habilidades técnicas
export const getTechnicalSkills = (): Skill[] =>
 z.array(skillSchema).parse(
  portfolioData.skills.technical.map((skill: any) => ({
   ...skill,
   category: skill.category ?? "", // Garante que a categoria seja uma string, mesmo que vazia
  }))
 );

// Função para obter as habilidades interpessoais (soft skills)
export const getSoftSkills = (): Skill[] =>
 z.array(skillSchema).parse(
  portfolioData.skills.soft.map((skill: any) => ({
   ...skill,
   category: skill.category ?? "", // Garante que a categoria seja uma string, mesmo que vazia
  }))
 );

// Função para obter os idiomas
export const getLanguages = (): Language[] => z.array(languageSchema).parse(portfolioData.skills.languages);

// Função para obter todos os dados de habilidades (incluindo áreas técnicas e especializações)
export const getSkillsData = (): Skills => ({
 technical_areas: portfolioData.skills.technical_areas.map((area: any) => ({
  ...area,
  icon: area.icon ?? "Layout", // Garante que o ícone seja uma string
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

// Funções para projetos (usando o array importado de projects.ts)
// Retorna todos os projetos, validando-os com o schema Project
export const getAllProjects = (): Project[] => z.array(projectSchema).parse(projects);

// Retorna um projeto pelo seu slug
export const getProjectBySlug = (slug: string): Project | null => {
 const project = projects.find((p) => p.slug === slug);
 if (!project) return null;
 return projectSchema.parse(project); // Valida o projeto encontrado
};

// Retorna projetos destacados, com um limite opcional
export const getFeaturedProjects = (limit = 3): Project[] => {
 const featured = projects.filter((project) => project.featured);
 return z.array(projectSchema).parse(featured.slice(0, limit)); // Valida e limita os projetos destacados
};

// Função assíncrona para buscar commits do GitHub
export async function getGithubCommits(): Promise<GithubCommit[]> {
 const username = "gui1416"; // Nome de usuário do GitHub
 try {
  // Busca os repositórios públicos do usuário
  const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`, {
   next: { revalidate: 3600 }, // Revalida a cada hora
  });

  if (!reposResponse.ok) {
   throw new Error(`Erro ao buscar repositórios: ${reposResponse.status}`);
  }
  const repos = await reposResponse.json();

  // Para cada repositório, busca os commits mais recentes
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
     description: repo.description ?? "", // Garante que a descrição seja uma string
     stars: repo.stargazers_count,
     language: repo.language ?? "",
    },
    sha: commit.sha,
    message: commit.commit.message,
    author: commit.commit.author.name,
    date: commit.commit.author.date,
    url: commit.html_url,
    branch: "main", // A API não retorna a branch diretamente, assumimos main/master
   }));
  });

  const commitsArrays = await Promise.all(commitsPromises);
  const allCommits = commitsArrays.flat().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Valida e retorna os commits usando o schema Zod
  return z.array(githubCommitSchema).parse(allCommits);

 } catch (error) {
  console.error("Erro ao buscar dados do GitHub:", error);
  return [];
 }
}
