import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Github, Calendar } from "lucide-react"

export default function Projetos() {
  const projetos = [
    {
      titulo: "E-commerce Platform",
      descricao: "Plataforma completa de e-commerce com carrinho de compras, pagamentos e painel administrativo.",
      imagem: "/placeholder.svg?height=200&width=400",
      categoria: "web",
      tecnologias: ["React", "Node.js", "MongoDB", "Stripe"],
      links: {
        demo: "https://exemplo.com/demo",
        github: "https://github.com/username/projeto",
      },
      data: "2023",
    },
    {
      titulo: "Task Management App",
      descricao: "Aplicativo de gerenciamento de tarefas com recursos de colaboração em tempo real e notificações.",
      imagem: "/placeholder.svg?height=200&width=400",
      categoria: "web",
      tecnologias: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
      links: {
        demo: "https://exemplo.com/demo",
        github: "https://github.com/username/projeto",
      },
      data: "2022",
    },
    {
      titulo: "Fitness Tracker",
      descricao: "Aplicativo móvel para acompanhamento de atividades físicas, nutrição e progresso pessoal.",
      imagem: "/placeholder.svg?height=200&width=400",
      categoria: "mobile",
      tecnologias: ["React Native", "Redux", "Firebase"],
      links: {
        demo: "https://exemplo.com/demo",
        github: "https://github.com/username/projeto",
      },
      data: "2022",
    },
    {
      titulo: "Weather Dashboard",
      descricao: "Dashboard interativo que exibe previsões meteorológicas com visualizações de dados avançadas.",
      imagem: "/placeholder.svg?height=200&width=400",
      categoria: "web",
      tecnologias: ["React", "D3.js", "OpenWeather API"],
      links: {
        demo: "https://exemplo.com/demo",
        github: "https://github.com/username/projeto",
      },
      data: "2021",
    },
    {
      titulo: "Portfolio Template",
      descricao: "Template de portfólio responsivo e personalizável para desenvolvedores e designers.",
      imagem: "/placeholder.svg?height=200&width=400",
      categoria: "web",
      tecnologias: ["HTML", "CSS", "JavaScript"],
      links: {
        demo: "https://exemplo.com/demo",
        github: "https://github.com/username/projeto",
      },
      data: "2021",
    },
    {
      titulo: "Delivery App",
      descricao: "Aplicativo de entrega de comida com rastreamento em tempo real e sistema de avaliações.",
      imagem: "/placeholder.svg?height=200&width=400",
      categoria: "mobile",
      tecnologias: ["React Native", "Node.js", "MongoDB", "Google Maps API"],
      links: {
        demo: "https://exemplo.com/demo",
        github: "https://github.com/username/projeto",
      },
      data: "2020",
    },
  ]

  return (
    <div className="container mx-auto max-w-4xl animate-fadeIn">
      <h1 className="text-4xl font-bold mb-8">Projetos</h1>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="web">Web</TabsTrigger>
          <TabsTrigger value="mobile">Mobile</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projetos.map((projeto) => (
              <ProjetoCard key={projeto.titulo} projeto={projeto} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="web" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projetos
              .filter((projeto) => projeto.categoria === "web")
              .map((projeto) => (
                <ProjetoCard key={projeto.titulo} projeto={projeto} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="mobile" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projetos
              .filter((projeto) => projeto.categoria === "mobile")
              .map((projeto) => (
                <ProjetoCard key={projeto.titulo} projeto={projeto} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Interessado em mais projetos?</h2>
        <p className="text-muted-foreground mb-6">
          Visite meu GitHub para ver mais projetos e contribuições para a comunidade open source.
        </p>
        <Button className="gap-2" asChild>
          <a href="https://github.com/gui1416" target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4" />
            Ver GitHub
          </a>
        </Button>
      </div>
    </div>
  )
}

function ProjetoCard({ projeto }) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Image src={projeto.imagem || "/placeholder.svg"} alt={projeto.titulo} fill className="object-cover" />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{projeto.titulo}</CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {projeto.data}
          </Badge>
        </div>
        <CardDescription>{projeto.descricao}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {projeto.tecnologias.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <a href={projeto.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            <Github className="h-4 w-4" />
            Código
          </a>
        </Button>
        <Button size="sm" asChild>
          <a href={projeto.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            <ExternalLink className="h-4 w-4" />
            Demo
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
