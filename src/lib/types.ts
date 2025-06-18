import { LucideIcon } from "lucide-react"; // Este import é útil para componentes, mas não é usado diretamente nas interfaces aqui.

// Meta informações do portfólio
export interface MetaInfo {
 title: string;
 description: string;
}

// Interface para links de redes sociais ou plataformas
export interface SocialLink {
 platform: string; // Nome da plataforma (ex: GitHub, LinkedIn)
 url: string;      // URL do perfil/link
 icon: string;     // Nome do ícone (ex: "Github", "Linkedin")
 info?: string;    // Informação adicional (ex: "github.com/usuario") - opcional
}

// Interface para um método de contato específico (email, telefone, etc.)
export interface ContactMethod {
 icon: string; // Nome do ícone (ex: "Mail", "Phone")
 info: string; // Informação de contato (ex: "meu@email.com")
 url: string;  // URL de contato (ex: "mailto:meu@email.com")
}

export interface ResumeTech {
 frontend: {
  title: string;
  description: string;
 };
 backend: {
  title: string;
  description: string;
 };
}

// Informações de contato detalhadas
export interface ContactInfo {
 email: ContactMethod;
 phone: ContactMethod;
 location: {
  icon: string;
  info: string;
  url: string | null; // URL do local pode ser nula ou '#'
 };
 github: ContactMethod;
 linkedin: ContactMethod;
 availability: {
  days: string;
  hours: string;
  response_time: string;
 };
 preference: string;
}

// Informações pessoais do desenvolvedor
export interface PersonalInfo {
 name: string;
 title: string;
 bio: string;
 resume_tech: ResumeTech; // Resumo técnico do currículo
 avatar: string;
 contact: ContactInfo; // Objeto com métodos de contato detalhados
 social: SocialLink[]; // Array de links de redes sociais
 cv_link: string;
}

// Experiência profissional
export interface Experience {
 company: string;
 position: string;
 period: string;
 local: string;
 description: string;
 responsibilities: string[];
 technologies: string[] | null; // Array de tecnologias, pode ser nulo se não houver
}

// Item de formação acadêmica
export interface EducationItem {
 instituicao: string;
 curso: string;
 periodo: string;
 local: string;
 descricao: string;
 certifications: string[];
 link: string; // Link para certificado ou informações adicionais
}

// Curso complementar ou workshop
export interface ComplementaryCourse {
 name: string;
 link: string;
}

// Resumo de uma especialização
export interface SkillsSummary {
 title: string;
 description: string;
 badges: string[]; // Badges/palavras-chave da especialização
}

// Área técnica (ex: Frontend, Backend)
export interface TechnicalArea {
 name: string;
 icon: string; // Nome do ícone que será mapeado para um componente LucideIcon
}

// Habilidade (técnica ou interpessoal)
export interface Skill {
 name: string;
 level: number; // Nível da habilidade (ex: 0-100)
 category?: string; // Categoria da habilidade (ex: "frontend", "backend") - opcional
}

// Idioma
export interface Language {
 name: string;
 level: string; // Nível de proficiência (ex: "Nativo", "Avançado")
 badge: string; // Badge de exibição (ex: "Fluente", "Proficiente")
}

// Conjunto completo de habilidades
export interface Skills {
 technical_areas: TechnicalArea[];
 technical: Skill[];
 soft: Skill[];
 languages: Language[];
 specialties: SkillsSummary[];
}

// Imagem de um projeto na galeria
export interface ProjectGalleryImage {
 src: string; // URL da imagem (otimizada para Next.js Image)
 alt: string; // Texto alternativo da imagem
}

// Links de um projeto (demo, github)
export interface ProjectLinks {
 demo?: string;   // Link para a demonstração do projeto - opcional
 github?: string; // Link para o repositório do GitHub - opcional
}

// Projeto relacionado (usado dentro da interface Project)
export interface RelatedProject {
 slug: string;
 title: string;
 description: string;
 category: "web" | "mobile" | "all";
 image?: ProjectGalleryImage;
 links?: ProjectLinks;
}

// Detalhes de um projeto
export interface Project {
 id: string;
 slug: string;
 title: string;
 description: string;
 category: "web" | "mobile" | "all"; // Categoria do projeto
 technologies: string[]; // Tecnologias utilizadas
 images: ProjectGalleryImage[]; // Array de imagens do projeto
 timeline: string; // Período de desenvolvimento
 role: string;       // Papel no projeto
 links: ProjectLinks; // Links do projeto
 featured?: boolean; // Se é um projeto destacado - opcional
 related?: RelatedProject[]; // Projetos relacionados - opcional
}

// Commits do GitHub
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
