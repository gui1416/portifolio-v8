import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Github, Calendar } from "lucide-react"
import { getAllProjects } from "@/lib/data" // Importa a função e o tipo Project
import { Project } from "@/lib/types" // Importa o tipo Project

// Componente para exibir um card de projeto
function ProjetoCard({ projeto }: { projeto: Project }) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full">
        {/* Usa o primeiro src da array de imagens ou um placeholder */}
        <Image src={projeto.images[0]?.src || "/placeholder.svg"} alt={projeto.images[0]?.alt || projeto.title} fill className="object-cover" />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{projeto.title}</CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {projeto.timeline}
          </Badge>
        </div>
        <CardDescription>{projeto.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {projeto.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* Botão para GitHub, visível apenas se o link existir e não for '#' */}
        {projeto.links?.github && projeto.links.github !== "#" && (
          <Button variant="outline" size="sm" asChild>
            <a href={projeto.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <Github className="h-4 w-4" />
              Código
            </a>
          </Button>
        )}
        {/* Botão para Demo, visível apenas se o link existir e não for '#' */}
        {projeto.links?.demo && projeto.links.demo !== "#" && (
          <Button size="sm" asChild>
            <a href={projeto.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <ExternalLink className="h-4 w-4" />
              Demo
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default function Projetos() {
  const projetos = getAllProjects(); // Obtém todos os projetos de forma centralizada

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
              <ProjetoCard key={projeto.id} projeto={projeto} /> // Usa 'projeto.id' como chave
            ))}
          </div>
        </TabsContent>

        <TabsContent value="web" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projetos
              .filter((projeto) => projeto.category === "web")
              .map((projeto) => (
                <ProjetoCard key={projeto.id} projeto={projeto} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="mobile" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projetos
              .filter((projeto) => projeto.category === "mobile")
              .map((projeto) => (
                <ProjetoCard key={projeto.id} projeto={projeto} />
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
