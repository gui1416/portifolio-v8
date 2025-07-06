import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getAllProjects, getProjectBySlug, getRelatedProjects } from "@/lib/projects"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
// Ajuste os imports abaixo conforme sua base de componentes
// import { SkillTag } from "@/components/skill-tag"
// import { EnhancedScrollIndicator } from "@/components/enhanced-scroll-indicator"
// import { AnimatedSection } from "@/components/animated-section"
// import { PortfolioHeader } from "@/components/portfolio-header"

interface ProjectPageProps {
 params: {
  slug: string
 }
}

// Corrige a função para não ser async e acessar params diretamente
export default function ProjectPage({ params }: ProjectPageProps) {
 const { slug } = params
 const project = getProjectBySlug(slug)

 if (!project) {
  notFound()
 }

 const relatedProjects = getRelatedProjects(slug, 2)

 return (
  <main className="min-h-screen text-white">
   {/* Header e grid de fundo podem ser ajustados conforme seu layout */}
   <div className="fixed inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-20 z-0"></div>
   {/* <PortfolioHeader /> */}
   <div className="relative z-10 container mx-auto p-3 sm:p-4 pt-20 sm:pt-24 pb-6 sm:pb-8">
    <Link
     href="/projects"
     className="inline-flex items-center text-xs sm:text-sm text-zinc-400 hover:text-white mb-4 sm:mb-6 transition-colors"
    >
     <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
     Voltar para Projetos
    </Link>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
     {/* Project Header */}
     <div className="lg:col-span-3">
      <Card className="bg-zinc-900/70 border-zinc-800 backdrop-white-sm overflow-hidden">
       <div className="relative h-48 sm:h-64 md:h-80 w-full">
        <Image
         src={project.coverImage || "/placeholder.svg"}
         alt={project.title}
         fill
         className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 sm:p-6">
         <div className="text-xs sm:text-sm text-white-400 mb-1 sm:mb-2">{project.category}</div>
         <h1 className="text-xl sm:text-3xl md:text-4xl font-bold">{project.title}</h1>
         <p className="text-sm text-zinc-400 mt-1 sm:mt-2 max-w-2xl">{project.shortDescription}</p>
        </div>
       </div>
      </Card>
     </div>
     {/* Project Content */}
     <div className="lg:col-span-2 space-y-4 sm:space-y-6">
      <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
       <CardContent className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Visão Geral</h2>
        <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-zinc-300">
         {project.description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
         ))}
        </div>
        <h3 className="text-base sm:text-lg font-bold mt-6 sm:mt-8 mb-2 sm:mb-3">Principais Funcionalidades</h3>
        <ul className="list-disc pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base text-zinc-300">
         {project.features.map((feature, index) => (
          <li key={index}>{feature}</li>
         ))}
        </ul>
        <h3 className="text-base sm:text-lg font-bold mt-6 sm:mt-8 mb-2 sm:mb-3">Tecnologias Utilizadas</h3>
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
         {project.technologies.map((tech, index) => (
          <Badge key={index} variant="secondary">{tech}</Badge>
         ))}
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-6 sm:mt-8">
         {project.liveUrl && (
          <Button
           asChild
           size="sm"
           className=""
          >
           <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Ver Projeto Online
           </a>
          </Button>
         )}
         {project.githubUrl && (
          <Button asChild variant="outline" size="sm" className="text-xs sm:text-sm">
           <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Ver Código Fonte
           </a>
          </Button>
         )}
        </div>
       </CardContent>
      </Card>
      {/* Project Gallery */}
      {project.gallery && project.gallery.length > 0 && (
       <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6">
         <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Galeria do Projeto</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {project.gallery.map((image, index) => (
           <div key={index} className="relative h-40 sm:h-48 rounded-lg overflow-hidden border border-zinc-800">
            <Image
             src={image.url || "/placeholder.svg"}
             alt={image.caption || `Gallery image ${index + 1}`}
             fill
             className="object-cover"
            />
           </div>
          ))}
         </div>
        </CardContent>
       </Card>
      )}
     </div>
     {/* Project Sidebar */}
     <div className="space-y-4 sm:space-y-6">
      <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
       <CardContent className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Detalhes do Projeto</h2>
        <div className="space-y-3 sm:space-y-4">
         <div>
          <h3 className="text-xs sm:text-sm font-medium text-zinc-400">Cliente</h3>
          <p className="text-sm sm:text-base">{project.client || "Projeto Pessoal"}</p>
         </div>
         <div>
          <h3 className="text-xs sm:text-sm font-medium text-zinc-400">Período</h3>
          <p className="text-sm sm:text-base">{project.timeline}</p>
         </div>
         <div>
          <h3 className="text-xs sm:text-sm font-medium text-zinc-400">Papel</h3>
          <p className="text-sm sm:text-base">{project.role}</p>
         </div>
        </div>
       </CardContent>
      </Card>
      {/* Projetos Relacionados */}
      {relatedProjects && relatedProjects.length > 0 && (
       <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6">
         <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Mais Projetos</h2>
         <div className="space-y-3 sm:space-y-4">
          {relatedProjects.map((related, index) => (
           <Link key={index} href={`/projects/${related.slug}`} className="block group">
            <div className="flex items-center gap-2 sm:gap-3">
             <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded overflow-hidden flex-shrink-0">
              <Image
               src={related.image || "/placeholder.svg"}
               alt={related.title}
               fill
               className="object-cover"
              />
             </div>
             <div>
              <h3 className="text-sm sm:text-base font-medium group-hover:text-zinc-400 transition-colors">
               {related.title}
              </h3>
              <p className="text-xs text-zinc-400">{related.category}</p>
             </div>
            </div>
           </Link>
          ))}
         </div>
        </CardContent>
       </Card>
      )}
     </div>
    </div>
   </div>
  </main>
 )
}
