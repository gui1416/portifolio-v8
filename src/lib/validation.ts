import { z } from 'zod';

// Zod schema para um método de contato
export const contactMethodSchema = z.object({
 icon: z.string().min(1),
 info: z.string().min(1),
 url: z.string().url().or(z.literal("#")), // Permite "#" como URL válida
});

// Zod schema para links de redes sociais
export const socialLinkSchema = z.object({
 platform: z.string().min(1),
 url: z.string().url(),
 icon: z.string().min(1),
 info: z.string().optional(), // Informação é opcional
});

export const resumeTechSchema = z.object({
 frontend: z.object({
  title: z.string().min(1),
  description: z.string().min(1),
 }),
 backend: z.object({
  title: z.string().min(1),
  description: z.string().min(1),
 }),
});

// Zod schema para informações de contato detalhadas
export const contactInfoSchema = z.object({
 email: contactMethodSchema,
 phone: contactMethodSchema,
 location: z.object({
  icon: z.string().min(1),
  info: z.string().min(1),
  url: z.string().url().or(z.literal("#")).nullable(), // URL do local pode ser nula ou '#'
 }),
 github: contactMethodSchema,
 linkedin: contactMethodSchema,
 availability: z.object({
  days: z.string(),
  hours: z.string(),
  response_time: z.string(),
 }),
 preference: z.string(),
});

// Zod schema para informações pessoais
export const personalInfoSchema = z.object({
 name: z.string().min(1),
 title: z.string().min(1),
 bio: z.string().min(1),
 resume_tech: resumeTechSchema,
 avatar: z.string().url(),
 contact: contactInfoSchema,
 social: z.array(socialLinkSchema),
 cv_link: z.string().url(),
});

// Zod schema para experiência profissional
export const experienceSchema = z.object({
 company: z.string().min(1),
 position: z.string().min(1),
 period: z.string().min(1),
 local: z.string().min(1),
 description: z.string().min(1),
 responsibilities: z.array(z.string().min(1)),
 technologies: z.array(z.string().min(1)).nullable(), // Pode ser nulo
});

// Zod schema para item de educação
export const educationSchema = z.object({
 instituicao: z.string().min(1),
 curso: z.string().min(1),
 periodo: z.string().min(1),
 local: z.string().min(1),
 descricao: z.string().min(1),
 certifications: z.array(z.string().min(1)),
 link: z.string().url().or(z.literal("#")),
});

// Zod schema para links de projeto
export const projectLinkSchema = z.object({
 demo: z.string().url().or(z.literal("#")).optional(), // Opcional
 github: z.string().url().or(z.literal("#")).optional(), // Opcional
});

// Zod schema para imagem de projeto
export const projectImageSchema = z.object({
 src: z.string(), // URL da imagem
 alt: z.string(), // Texto alternativo
});

// Zod schema para projeto
export const projectSchema: z.ZodType<any> = z.object({
 id: z.string().min(1),
 slug: z.string().regex(/^[a-z0-9-]+$/),
 title: z.string().min(1),
 description: z.string().min(1),
 category: z.enum(["web", "mobile", "all"]),
 technologies: z.array(z.string().min(1)),
 images: z.array(projectImageSchema),
 timeline: z.string().min(1),
 role: z.string().min(1),
 links: projectLinkSchema,
 featured: z.boolean().optional(), // Opcional
 related: z.array(z.lazy(() => projectSchema)).optional(), // Recursivo para projetos relacionados
});

// Zod schema para área técnica
export const technicalAreaSchema = z.object({
 name: z.string().min(1),
 icon: z.string().min(1),
});

// Zod schema para habilidade
export const skillSchema = z.object({
 name: z.string().min(1),
 level: z.number().int().min(0).max(100),
 category: z.string().optional(), // Opcional
});

// Zod schema para idioma
export const languageSchema = z.object({
 name: z.string().min(1),
 level: z.string().min(1),
 badge: z.string().min(1),
});

// Zod schema para curso complementar
export const complementaryCourseSchema = z.object({
 name: z.string().min(1),
 link: z.string().url().or(z.literal("#")),
});

// Zod schema para commit do GitHub
export const githubCommitSchema = z.object({
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

// Zod schema para meta informações
export const metaInfoSchema = z.object({
 title: z.string(),
 description: z.string(),
});
