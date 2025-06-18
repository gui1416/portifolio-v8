export interface ProjectGalleryImage {
 url: string;
 alt?: string;
}

export interface RelatedProject {
 slug: string;
 title: string;
 description: string;
 category: "web" | "mobile" | "backend";
 image?: ProjectGalleryImage;
 links?: {
  demo?: string;
  github?: string;
 };
}

export interface Project {
 id: string;
 slug: string;
 title: string;
 description: string;
 category: "web" | "mobile" | "backend" | "all";
 technologies: string[];
 images: ProjectGalleryImage[];
 timeline: string;
 role: string;
 links: {
  demo?: string;
  github?: string;
 };
 featured?: boolean;
 related?: RelatedProject[];
}

const projects: Project[] = [
 {
  id: "1",
  slug: "qr-code-encurtador-links",
  title: "Gerador de QR Code e Encurtador de Links",
  description: "Site simples para geração de QR codes e encurtamento de links.",
  category: "web",
  technologies: ["Next.js", "qrcode.react", "clsx"],
  images: [
   { url: "/QRcode-links.png?height=200&width=400", alt: "QR Code Generator" }
  ],
  timeline: "2025",
  role: "Desenvolvedor Frontend",
  links: {
   demo: "https://q-rcode-generator-phi.vercel.app/",
   github: "https://github.com/gui1416/QRcode-generator"
  }
 },
 {
  id: "2",
  slug: "linktree-clone",
  title: "Linktree Clone",
  description: "Clone do Linktree feito como treino e para uso pessoal.",
  category: "mobile",
  technologies: ["Next.js 14", "TypeScript", "Shadcn-ui"],
  images: [
   { url: "/linktree.png?height=200&width=400", alt: "Linktree Clone" }
  ],
  timeline: "2025",
  role: "Desenvolvedor Full Stack",
  links: {
   demo: "https://linktree-guilherme-machado.vercel.app/",
   github: "https://github.com/gui1416"
  }
 },
 {
  id: "3",
  slug: "e-commerce-platform",
  title: "E-commerce Platform",
  description: "Plataforma de e-commerce com carrinho de compras.",
  category: "web",
  technologies: ["TypeScript", "Vite", "Tailwind CSS"],
  images: [
   { url: "/e-commerce.png?height=200&width=400", alt: "E-commerce Platform" }
  ],
  timeline: "2024",
  role: "Desenvolvedor Backend",
  links: {
   demo: "#",
   github: "https://github.com/gui1416/econverse"
  }
 },
 {
  id: "4",
  slug: "task-management-app",
  title: "Task Management App",
  description: "Aplicativo de gerenciamento de tarefas com recursos de colaboração em tempo real e notificações.",
  category: "web",
  technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  images: [
   { url: "/task-management.png?height=200&width=400", alt: "Task Management App" }
  ],
  timeline: "2025",
  role: "Desenvolvedor Full Stack",
  links: {
   demo: "https://task-management-three-orpin.vercel.app/",
   github: "https://github.com/gui1416/task-management"
  }
 },
 {
  id: "5",
  slug: "weather-dashboard",
  title: "Weather Dashboard",
  description: "Dashboard interativo que exibe previsões meteorológicas com visualizações de dados avançadas.",
  category: "web",
  technologies: ["React", "D3.js", "OpenWeather API"],
  images: [
   { url: "/weather-dashboard.png?height=200&width=400", alt: "Weather Dashboard" }
  ],
  timeline: "2024",
  role: "Desenvolvedor Frontend",
  links: {
   demo: "#",
   github: "#"
  }
 },
 {
  id: "6",
  slug: "portfolio-template",
  title: "Portfolio Template",
  description: "Template de portfólio responsivo e personalizável para desenvolvedores e designers.",
  category: "web",
  technologies: ["HTML", "CSS", "JavaScript"],
  images: [
   { url: "/portfolio-template.png?height=200&width=400", alt: "Portfolio Template" }
  ],
  timeline: "2022",
  role: "Desenvolvedor Frontend",
  links: {
   demo: "https://gui1416.github.io/Web-Portifolio/",
   github: "https://github.com/gui1416/Web-Portifolio"
  }
 }
]

export { projects }

// Add these functions after the projects array export

export function getAllProjects(): Project[] {
 return projects
}

export function getProjectBySlug(slug: string): Project | undefined {
 return projects.find((project) => project.slug === slug)
}

