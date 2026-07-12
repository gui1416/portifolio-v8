// Identidade e contato do CV. Centraliza dados que hoje estão hardcoded em
// `src/app/[locale]/hero/page.tsx` para evitar duplicação. O texto de role/bio
// continua vindo das traduções (`messages/*.json` → namespace `hero`).

export type CvProfile = {
  nome: string
  email: string
  whatsapp: string
  github: string
  githubUrl: string
  portfolioUrl: string
  localidade: string
  fotoUrl: string
}

export const cvProfile: CvProfile = {
  nome: "Guilherme Machado",
  email: "guirmdev@gmail.com",
  whatsapp: "+55 11 96995-4587",
  github: "gui1416",
  githubUrl: "https://github.com/gui1416",
  portfolioUrl: "https://portifolio-v8.vercel.app",
  localidade: "São Paulo, SP",
  fotoUrl: "https://github.com/gui1416.png",
}
