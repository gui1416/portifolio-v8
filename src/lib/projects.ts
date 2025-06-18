import { Project } from "./types"; // Importa a interface Project de types.ts

const projects: Project[] = [
 {
  id: "1",
  slug: "qr-code-encurtador-links",
  title: "Gerador de QR Code e Encurtador de Links",
  description: "Site simples para geração de QR codes e encurtamento de links.",
  category: "web",
  technologies: ["Next.js", "qrcode.react", "clsx"],
  images: [
   { src: "/QRcode-links.png", alt: "QR Code Generator" } // Usando 'src' conforme a interface
  ],
  timeline: "2025",
  role: "Desenvolvedor Frontend",
  links: {
   demo: "https://q-rcode-generator-phi.vercel.app/",
   github: "https://github.com/gui1416/QRcode-generator"
  },
  featured: true // Exemplo de projeto destacado
 },
 {
  id: "2",
  slug: "linktree-clone",
  title: "Linktree Clone",
  description: "Clone do Linktree feito como treino e para uso pessoal.",
  category: "mobile",
  technologies: ["Next.js 14", "TypeScript", "Shadcn-ui"],
  images: [
   { src: "/linktree.png", alt: "Linktree Clone" } // Usando 'src' conforme a interface
  ],
  timeline: "2025",
  role: "Desenvolvedor Full Stack",
  links: {
   demo: "https://linktree-guilherme-machado.vercel.app/",
   github: "https://github.com/gui1416"
  },
  featured: true // Exemplo de projeto destacado
 },
 {
  id: "3",
  slug: "e-commerce-platform",
  title: "E-commerce Platform",
  description: "Plataforma de e-commerce com carrinho de compras.",
  category: "web",
  technologies: ["TypeScript", "Vite", "Tailwind CSS"],
  images: [
   { src: "/e-commerce.png", alt: "E-commerce Platform" } // Usando 'src' conforme a interface
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
   { src: "/task-management.png", alt: "Task Management App" } // Usando 'src' conforme a interface
  ],
  timeline: "2025",
  role: "Desenvolvedor Full Stack",
  links: {
   demo: "https://task-management-three-orpin.vercel.app/",
   github: "https://github.com/gui1416/task-management"
  },
  featured: true // Exemplo de projeto destacado
 },
 {
  id: "5",
  slug: "weather-dashboard",
  title: "Weather Dashboard",
  description: "Dashboard interativo que exibe previsões meteorológicas com visualizações de dados avançadas.",
  category: "web",
  technologies: ["React", "D3.js", "OpenWeather API"],
  images: [
   { src: "/weather-dashboard.png", alt: "Weather Dashboard" } // Usando 'src' conforme a interface
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
   { src: "/portfolio-template.png", alt: "Portfolio Template" } // Usando 'src' conforme a interface
  ],
  timeline: "2022",
  role: "Desenvolvedor Frontend",
  links: {
   demo: "https://gui1416.github.io/Web-Portifolio/",
   github: "https://github.com/gui1416/Web-Portifolio"
  }
 }
];

export { projects };
