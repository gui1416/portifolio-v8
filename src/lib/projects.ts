export interface ProjectGalleryImage {
 url: string
 caption?: string
}

export interface RelatedProject {
 slug: string
 title: string
 category: string
 shortDescription?: string
 technologies?: string[]
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

const projects: Project[] = [
 {
  id: 1,
  slug: "qr-code-encurtador-links",
  title: "Gerador de QR Code e Encurtador de Links",
  category: "Web Application",
  shortDescription: "Site simples para geração de QR codes e encurtamento de links.",
  description: [
   "Site simples para geração de QR codes e encurtamento de links.",
   "Permite criar QR codes personalizados e encurtar URLs para fácil compartilhamento."
  ],
  features: [
   "Geração de QR Code",
   "Encurtamento de links",
   "Interface simples e intuitiva"
  ],
  technologies: ["Next.js", "qrcode.react", "clsx"],
  coverImage: "/QRcode-links.png",
  thumbnailImage: "/QRcode-links.png",
  gallery: [
   { url: "/QRcode-links.png", caption: "QR Code Generator" }
  ],
  timeline: "2025",
  role: "Desenvolvedor Frontend",
  liveUrl: "https://q-rcode-generator-phi.vercel.app/",
  githubUrl: "https://github.com/gui1416/QRcode-generator",
  relatedProjects: []
 },
 {
  id: 2,
  slug: "linktree-clone",
  title: "Linktree Clone",
  category: "Mobile App",
  shortDescription: "Clone do Linktree feito como treino e para uso pessoal.",
  description: [
   "Clone do Linktree feito como treino e para uso pessoal.",
   "Permite criar uma página de links personalizada para redes sociais e contatos."
  ],
  features: [
   "Página de links personalizada",
   "Design responsivo",
   "Fácil de usar"
  ],
  technologies: ["Next.js 14", "TypeScript", "Shadcn-ui"],
  coverImage: "/linktree.png",
  thumbnailImage: "/linktree.png",
  gallery: [
   { url: "/linktree.png", caption: "Linktree Clone" }
  ],
  timeline: "2025",
  role: "Desenvolvedor Full Stack",
  liveUrl: "https://linktree-guilherme-machado.vercel.app/",
  githubUrl: "https://github.com/gui1416",
  relatedProjects: []
 },
 {
  id: 3,
  slug: "e-commerce-platform",
  title: "E-commerce Platform",
  category: "Web Application",
  shortDescription: "Plataforma de e-commerce com carrinho de compras.",
  description: [
   "Plataforma de e-commerce com carrinho de compras.",
   "Permite gerenciar produtos, pedidos e pagamentos online."
  ],
  features: [
   "Carrinho de compras",
   "Gestão de produtos",
   "Integração com métodos de pagamento"
  ],
  technologies: ["TypeScript", "Vite", "Tailwind CSS"],
  coverImage: "/e-commerce.png",
  thumbnailImage: "/e-commerce.png",
  gallery: [
   { url: "/e-commerce.png", caption: "E-commerce Platform" }
  ],
  timeline: "2024",
  role: "Desenvolvedor Backend",
  liveUrl: "#",
  githubUrl: "https://github.com/gui1416/econverse",
  relatedProjects: []
 },
 {
  id: 4,
  slug: "task-management-app",
  title: "Task Management App",
  category: "Web Application",
  shortDescription: "Aplicativo de gerenciamento de tarefas com recursos de colaboração em tempo real e notificações.",
  description: [
   "Aplicativo de gerenciamento de tarefas com recursos de colaboração em tempo real e notificações.",
   "Permite criar, editar e acompanhar tarefas em equipe."
  ],
  features: [
   "Colaboração em tempo real",
   "Notificações automáticas",
   "Gestão de tarefas por equipe"
  ],
  technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  coverImage: "/task-management.png",
  thumbnailImage: "/task-management.png",
  gallery: [
   { url: "/task-management.png", caption: "Task Management App" }
  ],
  timeline: "2025",
  role: "Desenvolvedor Full Stack",
  liveUrl: "https://task-management-three-orpin.vercel.app/",
  githubUrl: "https://github.com/gui1416/task-management",
  relatedProjects: []
 },
 {
  id: 5,
  slug: "weather-dashboard",
  title: "Weather Dashboard",
  category: "Web Application",
  shortDescription: "Dashboard interativo que exibe previsões meteorológicas com visualizações de dados avançadas.",
  description: [
   "Dashboard interativo que exibe previsões meteorológicas com visualizações de dados avançadas.",
   "Permite consultar o clima em tempo real de diversas cidades."
  ],
  features: [
   "Visualização de dados meteorológicos",
   "Busca por cidade",
   "Interface responsiva"
  ],
  technologies: ["React", "D3.js", "OpenWeather API"],
  coverImage: "/weather-dashboard.png",
  thumbnailImage: "/weather-dashboard.png",
  gallery: [
   { url: "/weather-dashboard.png", caption: "Weather Dashboard" }
  ],
  timeline: "2024",
  role: "Desenvolvedor Frontend",
  liveUrl: "#",
  githubUrl: "#",
  relatedProjects: []
 },
 {
  id: 6,
  slug: "portfolio-template",
  title: "Portfolio Template",
  category: "Web Application",
  shortDescription: "Template de portfólio responsivo e personalizável para desenvolvedores e designers.",
  description: [
   "Template de portfólio responsivo e personalizável para desenvolvedores e designers.",
   "Fácil de editar e adaptar para diferentes perfis profissionais."
  ],
  features: [
   "Design responsivo",
   "Personalização fácil",
   "Pronto para deploy"
  ],
  technologies: ["HTML", "CSS", "JavaScript"],
  coverImage: "/portfolio-template.png",
  thumbnailImage: "/portfolio-template.png",
  gallery: [
   { url: "/portfolio-template.png", caption: "Portfolio Template" }
  ],
  timeline: "2022",
  role: "Desenvolvedor Frontend",
  liveUrl: "https://gui1416.github.io/Web-Portifolio/",
  githubUrl: "https://github.com/gui1416/Web-Portifolio",
  relatedProjects: []
 }
]

export { projects }

export function getAllProjects(): Project[] {
 return projects
}

export function getProjectBySlug(slug: string): Project | undefined {
 return projects.find((project) => project.slug === slug)
}

export function getRelatedProjects(currentSlug: string, limit = 2): RelatedProject[] {
 const currentProject = getProjectBySlug(currentSlug)
 if (!currentProject || !currentProject.relatedProjects) {
  // If no related projects defined, return random projects
  return projects
   .filter((project) => project.slug !== currentSlug)
   .slice(0, limit)
   .map((project) => ({
    slug: project.slug,
    title: project.title,
    category: project.category,
    image: project.thumbnailImage,
   }))
 }

 return currentProject.relatedProjects.slice(0, limit)
}

