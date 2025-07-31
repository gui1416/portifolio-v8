import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Briefcase } from "lucide-react"
import { getExperiencias } from "@/lib/experiences"


export const revalidate = 3600

export default async function ExperienciaPage() {
  const experiencias = await getExperiencias();

  return (
    <div className="container mx-auto max-w-4xl animate-fadeIn">
      <h1 className="text-4xl font-bold mb-8">Experiência Profissional</h1>

      <div className="space-y-8">
        {experiencias.map((exp) => (
          <Card key={exp.id} className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <CardHeader>
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <CardTitle className="text-xl">{exp.cargo}</CardTitle>
                  <p className="text-primary font-medium mt-1">{exp.empresa}</p>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {exp.periodo}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {exp.local}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{exp.descricao}</p>

              <div>
                <h4 className="text-sm font-medium mb-2">Principais Responsabilidades:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  {exp.responsabilidades.map((resp, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {exp.tecnologias && exp.tecnologias.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Tecnologias Utilizadas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.tecnologias.map((tech, i) => (
                      tech && <Badge key={i} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Projetos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Briefcase className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Sistema de capitação</h3>
              </div>
              <p className="text-muted-foreground mb-3">
                Desenvolvimento de um sistema para capitação de licitações publicas.
              </p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">Node.js</Badge>
                <Badge variant="outline">ConLicitação API</Badge>
                <Badge variant="outline">Gemini API</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Briefcase className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Linktree Clone</h3>
              </div>
              <p className="text-muted-foreground mb-3">
                Clone do linktree feito como treino e para uso pessoal.
              </p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">Next.js 14</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">Shadcn-ui</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}