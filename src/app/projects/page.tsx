import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Github, Calendar } from "lucide-react"
import { getAllProjects } from "@/lib/projects"
import Link from "next/link"

export default function Projetos() {
  // Busca todos os projetos principais
  const projetos = getAllProjects().map((proj) => ({
    slug: proj.slug, // <-- Adiciona o slug ao objeto do projeto
    titulo: proj.title,
    descricao: proj.shortDescription || "",
    imagem: proj.coverImage,
    categoria: proj.category,
    tecnologias: proj.technologies || [],
    links: {
      demo: proj.liveUrl || "",
      github: proj.githubUrl || "",
    },
    data: proj.timeline,
  }));

  return (
    <div className="container mx-auto max-w-4xl animate-fadeIn">
      <h1 className="text-4xl font-bold mb-8">Projetos</h1>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="Web Application">Web</TabsTrigger>
          <TabsTrigger value="Mobile App">Mobile</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projetos.map((projeto) => (
              <ProjetoCard key={projeto.titulo} projeto={projeto} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="Web Application" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projetos
              .filter((projeto) => projeto.categoria === "Web Application")
              .map((projeto) => (
                <ProjetoCard key={projeto.titulo} projeto={projeto} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="Mobile App" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projetos
              .filter((projeto) => projeto.categoria === "Mobile App")
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
      <Link href={`/projects/${projeto.slug}`} className="block">
        <div className="relative h-48 w-full">
          <Image src={projeto.imagem || "/placeholder.svg"} alt={projeto.titulo} fill className="object-cover" />
        </div>
      </Link>
      <CardHeader>
        <div className="flex justify-between items-start">
          <Link href={`/projects/${projeto.slug}`} className="hover:underline">
            <CardTitle>{projeto.titulo}</CardTitle>
          </Link>
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
          <a href={projeto.links.demo || "/projects/not-demo"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            <ExternalLink className="h-4 w-4" />
            Demo
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
