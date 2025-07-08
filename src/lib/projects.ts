export interface ProjectGalleryImage {
  url: string
  caption?: string
}

export interface RelatedProject {
  id: number
  slug: string
  title: string
  category: string
  shortDescription?: string
  technologies?: string[]
  timeline: string
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
      "Aplicação web desenvolvida para facilitar a criação de QR codes personalizados e o encurtamento de URLs, proporcionando praticidade no compartilhamento de links em diferentes plataformas.",
      "Permite ao usuário gerar QR codes customizados para qualquer URL, além de encurtar links longos, tornando-os mais acessíveis e fáceis de divulgar.",
      "Ideal para profissionais, empresas e eventos que desejam compartilhar informações de forma rápida, moderna e eficiente."
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
    relatedProjects: [
      {
        id: 4,
        slug: "task-management-app",
        title: "Task Management App",
        category: "Web Application",
        timeline: "2025",
        image: "/task-management.png"
      },
      {
        id: 2,
        slug: "linktree-clone",
        title: "Linktree Clone",
        category: "Mobile App",
        timeline: "2025",
        image: "/linktree.png"
      }
    ]
  },
  {
    id: 2,
    slug: "linktree-clone",
    title: "Linktree Clone",
    category: "Mobile App",
    shortDescription: "Clone do Linktree feito como treino e para uso pessoal.",
    description: [
      "Projeto inspirado no Linktree, desenvolvido para centralizar e organizar múltiplos links em uma única página personalizada.",
      "Permite ao usuário criar um perfil com links para redes sociais, contatos e outros recursos, facilitando o compartilhamento em perfis digitais.",
      "Conta com design responsivo e interface intuitiva, sendo ideal para profissionais, influenciadores e empresas que desejam reunir seus principais canais de comunicação em um só lugar."
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
    relatedProjects: [
      {
        id: 4,
        slug: "task-management-app",
        title: "Task Management App",
        category: "Web Application",
        timeline: "2025",
        image: "/task-management.png"
      },
      {
        id: 1,
        slug: "qr-code-encurtador-links",
        title: "Gerador de QR Code e Encurtador de Links",
        category: "Web Application",
        timeline: "2025",
        image: "/QRcode-links.png"
      }
    ]
  },
  {
    id: 3,
    slug: "e-commerce-platform",
    title: "E-commerce Platform",
    category: "Web Application",
    shortDescription: "Plataforma de e-commerce com carrinho de compras.",
    description: [
      "Plataforma completa de e-commerce desenvolvida para oferecer uma experiência de compra online eficiente e segura.",
      "Permite o gerenciamento de produtos, controle de estoque, processamento de pedidos e integração com métodos de pagamento digitais.",
      "Ideal para pequenos e médios negócios que buscam expandir sua presença digital e automatizar processos de vendas."
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
      "Aplicativo robusto para gerenciamento de tarefas, focado em colaboração de equipes e aumento de produtividade.",
      "Oferece recursos como criação, edição e acompanhamento de tarefas em tempo real, além de notificações automáticas para manter todos alinhados.",
      "Ideal para times que buscam organizar fluxos de trabalho, delegar responsabilidades e monitorar o progresso de projetos de forma eficiente."
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
    relatedProjects: [
      {
        id: 1,
        slug: "qr-code-encurtador-links",
        title: "Gerador de QR Code e Encurtador de Links",
        category: "Web Application",
        timeline: "2025",
        image: "/QRcode-links.png"
      },
      {
        id: 3,
        slug: "e-commerce-platform",
        title: "E-commerce Platform",
        category: "Web Application",
        timeline: "2024",
        image: "/e-commerce.png"
      }
    ]
  },
  {
    id: 5,
    slug: "licitacoes-ia",
    title: "Licitações IA",
    category: "Web Application",
    shortDescription: "Sistema de capitação de licitações publicas.",
    description: [
      "Sistema inteligente desenvolvido para automatizar a captação de licitações públicas com o apoio de inteligência artificial.",
      "Apresenta uma interface moderna e responsiva, que permite aos usuários consultar oportunidades de licitação em tempo real, filtrando por palavras-chave e critérios personalizados.",
      "Integrado com a API do ConLicitação, o sistema otimiza a análise de dados, facilitando a tomada de decisões estratégicas para empresas que atuam no setor público."
    ],
    features: [
      "Busca avançada por palavras-chave",
      "Visualização de licitações em tempo real",
      "Interface intuitiva e responsiva"
    ],
    technologies: ["Gemini API", "Next.js 15", "ConLicitação API"],
    coverImage: "/licitacoes-ia.png",
    thumbnailImage: "/licitacoes-ia-t.png",
    gallery: [
      { url: "/licitacoes-ia.png", caption: "coverImage" }
    ],
    timeline: "2025",
    role: "Desenvolvedor Full Stack",
    liveUrl: "https://cap-licita.vercel.app/",
    githubUrl: "https://github.com/gui1416/capture-system",
    relatedProjects: [
      {
        id: 2,
        slug: "linktree-clone",
        title: "Linktree Clone",
        category: "Mobile App",
        timeline: "2025",
        image: "/linktree.png"
      },
      {
        id: 4,
        slug: "task-management-app",
        title: "Task Management App",
        category: "Web Application",
        timeline: "2025",
        image: "/task-management.png"
      }
    ]
  },
  {
    id: 6,
    slug: "readme-generator",
    title: "README Generator",
    category: "Web Application",
    shortDescription: "Uma ferramenta online para gerar arquivos README.md personalizados para seus projetos GitHub!",
    description: [
      "O README Generator é uma aplicação web desenvolvida em TypeScript que simplifica a criação de arquivos `README.md` para projetos no GitHub. Ele permite gerar READMEs personalizados com facilidade, economizando tempo e garantindo consistência na documentação dos seus projetos."
    ],
    features: [
      "Geração de README.md",
      "Histórico de gerações",
      "Preview em tempo real"
    ],
    technologies: ["TypeScript", "react-markdown", "remark-gfm", "Node.js"],
    coverImage: "/readme-generator.png",
    thumbnailImage: "/readme-generator.png",
    gallery: [
      { url: "/readme-generator.png", caption: "README Generator" },
      { url: "/readme-generator-g1.png", caption: "Gallery1" },
      { url: "/readme-generator-g2.png", caption: "Gallery2" },
      { url: "/readme-generator-g3.png", caption: "Gallery3" }
    ],
    timeline: "2025",
    role: "Desenvolvedor Full Stack",
    liveUrl: "https://readme-generator-rust-one.vercel.app/",
    githubUrl: "https://github.com/gui1416/readme-generator",
    relatedProjects: [
      {
        id: 1,
        slug: "qr-code-encurtador-links",
        title: "Gerador de QR Code e Encurtador de Links",
        category: "Web Application",
        timeline: "2025",
        image: "/QRcode-links.png"
      },
      {
        id: 2,
        slug: "linktree-clone",
        title: "Linktree Clone",
        category: "Mobile App",
        timeline: "2025",
        image: "/linktree.png"
      }
    ]
  },
  {
    id: 7,
    slug: "portfolio-template",
    title: "Portfolio Template",
    category: "Web Application",
    shortDescription: "Template de portfólio responsivo e personalizável para desenvolvedores e designers.",
    description: [
      "Template moderno e responsivo criado para profissionais que desejam apresentar seus projetos e habilidades de forma elegante.",
      "Fácil de personalizar, permite a inclusão de informações, imagens e links relevantes, adaptando-se a diferentes perfis e áreas de atuação.",
      "Ideal para desenvolvedores, designers e freelancers que buscam destacar seu trabalho e conquistar novas oportunidades."
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
    return projects
      .filter((project) => project.slug !== currentSlug)
      .slice(0, limit)
      .map((project) => ({
        id: project.id,
        slug: project.slug,
        title: project.title,
        category: project.category,
        image: project.thumbnailImage,
        timeline: project.timeline,
        shortDescription: project.shortDescription,
        technologies: project.technologies,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
      }))
  }

  return currentProject.relatedProjects.slice(0, limit)
}

