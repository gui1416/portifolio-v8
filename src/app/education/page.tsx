import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Calendar, MapPin, Award, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getEducationItems, getComplementaryCourses, getWorkshops } from "@/lib/data" // Importa funções de dados

export default function Educacao() {
  const educacaoItems = getEducationItems(); // Obtém itens de educação
  const cursosList = getComplementaryCourses(); // Obtém cursos complementares
  const workshopsList = getWorkshops(); // Obtém workshops

  return (
    <div className="container mx-auto max-w-4xl animate-fadeIn">
      <h1 className="text-4xl font-bold mb-8">Educação</h1>

      <div className="space-y-8">
        {educacaoItems.map((item, index) => (
          <Card key={index} className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{item.curso}</CardTitle>
                  <p className="text-primary font-medium mt-1">{item.instituicao}</p>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {item.periodo}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {item.local}
              </div>

              <p>{item.descricao}</p>

              <div>
                <h4 className="text-sm font-medium flex items-center mb-2">
                  <Award className="h-4 w-4 mr-1" />
                  Certificações
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.certifications.map((cert, i) => (
                    <Badge key={i} variant="secondary">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              {item.link && item.link !== "#" && ( // Mostra o botão apenas se o link for válido
                <Button size="sm" className="mt-2" asChild>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                    <ExternalLink className="h-4 w-4" />
                    Ver Certificado
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Formação Complementar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Cursos Online</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                {cursosList.map((curso, index) => (
                  <li key={index}>
                    •{" "}
                    <a
                      href={curso.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary hover:underline transition-colors"
                    >
                      {curso.name}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Award className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Workshops e Eventos</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                {workshopsList.map((workshop, index) => (
                  <li key={index}>
                    •{" "}
                    <a
                      href={workshop.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary hover:underline transition-colors"
                    >
                      {workshop.name}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
