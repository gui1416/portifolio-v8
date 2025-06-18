import { z } from 'zod';

export const socialLinkSchema = z.object({
 platform: z.string().min(1),
 url: z.string().url(),
 icon: z.string().min(1), // Assume que o ícone é uma string que corresponde ao nome do componente LucideIcon
});

export const contactInfoSchema = z.object({
 email: z.string().email(),
 phone: z.string(),
 location: z.string(),
 availability: z.object({
  days: z.string(),
  hours: z.string(),
  response_time: z.string(),
 }),
 preference: z.string(),
});

export const personalInfoSchema = z.object({
 name: z.string().min(1),
 title: z.string().min(1),
 bio: z.string().min(1),
 avatar: z.string().url(),
 contact: contactInfoSchema,
 social: z.array(socialLinkSchema),
 cv_link: z.string().url(),
});

export const experienceSchema = z.object({
 company: z.string().min(1),
 position: z.string().min(1),
 period: z.string().min(1),
 local: z.string().min(1),
 description: z.string().min(1),
 responsibilities: z.array(z.string().min(1)),
 technologies: z.array(z.string().min(1)),
});

export const educationSchema = z.object({
 instituicao: z.string().min(1),
 curso: z.string().min(1),
 periodo: z.string().min(1),
 local: z.string().min(1),
 descricao: z.string().min(1),
 certifications: z.array(z.string().min(1)),
 link: z.string().url().or(z.literal("#")),
});

export const projectLinkSchema = z.object({
 demo: z.string().url().or(z.literal("#")),
 github: z.string().url().or(z.literal("#")),
});

export const projectImageSchema = z.object({
 src: z.string(),
 alt: z.string(),
});

export const projectSchema = z.object({
 id: z.string().min(1),
 slug: z.string().regex(/^[a-z0-9-]+$/),
 title: z.string().min(1),
 description: z.string().min(1),
 category: z.enum(["web", "mobile", "backend", "all"]),
 technologies: z.array(z.string().min(1)),
 images: z.array(projectImageSchema),
 timeline: z.string().min(1),
 role: z.string().min(1),
 links: projectLinkSchema,
 featured: z.boolean(),
});

export const skillSchema = z.object({
 name: z.string().min(1),
 level: z.number().int().min(0).max(100),
 category: z.string(), // Agora obrigatório
});

export const languageSchema = z.object({
 name: z.string().min(1),
 level: z.string().min(1),
 badge: z.string().min(1),
});