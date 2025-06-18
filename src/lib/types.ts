import { LucideIcon } from "lucide-react";

export interface MetaInfo {
 title: string;
 description: string;
}

export interface SocialLink {
 platform: string;
 url: string;
 icon: string; // Aceita qualquer string, compatível com o JSON e o schema
}

export interface ContactInfo {
 email: string;
 phone: string;
 location: string;
 availability: {
  days: string;
  hours: string;
  response_time: string;
 };
 preference: string;
}

export interface PersonalInfo {
 name: string;
 title: string;
 bio: string;
 avatar: string;
 contact: ContactInfo;
 social: SocialLink[];
 cv_link: string;
}

export interface Experience {
 company: string;
 position: string;
 period: string;
 local: string;
 description: string;
 responsibilities: string[];
 technologies: string[];
}

export interface EducationItem {
 instituicao: string;
 curso: string;
 periodo: string;
 local: string;
 descricao: string;
 certifications: string[];
 link: string;
}

export interface ComplementaryCourse {
 name: string;
 link: string;
}

export interface SkillsSummary {
 title: string;
 description: string;
 badges: string[];
}

export interface TechnicalArea {
 name: string;
 icon: keyof typeof import("lucide-react");
}

export interface Skill {
 name: string;
 level: number;
 category: string;
}

export interface Language {
 name: string;
 level: string;
 badge: string;
}

export interface Skills {
 technical_areas: TechnicalArea[];
 technical: Skill[];
 soft: Skill[];
 languages: Language[];
 specialties: SkillsSummary[];
}

export interface ProjectImage {
 src: string;
 alt: string;
}

export interface ProjectLinks {
 demo: string;
 github: string;
}

export interface Project {
 id: string;
 slug: string;
 title: string;
 description: string;
 category: "web" | "mobile" | "backend" | "all"; // Adicionado "backend" e "all" para maior flexibilidade
 technologies: string[];
 images: ProjectImage[];
 timeline: string;
 role: string;
 links: ProjectLinks;
 featured: boolean;
}

// Para commits do GitHub
export interface GithubCommit {
 repo: {
  name: string;
  url: string;
  description: string;
  stars: number;
  language: string;
 };
 sha: string;
 message: string;
 author: string;
 date: string;
 url: string;
 branch: string;
}