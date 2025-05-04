import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Calendar, MapPin, Award, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function Educacao() {
  const educacaoItems = [
    {
      instituicao: "Universidade Federal",
      curso: "Bacharelado em Ciência da Computação",
      periodo: "2018 - 2022",
      local: "São Paulo, SP",
      descricao:
        "Formação completa em Ciência da Computação com foco em desenvolvimento de software e sistemas distribuídos.",
      certificacoes: ["Programação Avançada", "Inteligência Artificial", "Desenvolvimento Web"],
      link: "https://drive.google.com/file/d/17CMBXGeC5yJLQuPmN6iFuSCLePmPEHZV/view?usp=drive_link",
    },
    {
      instituicao: "Instituto Técnico",
      curso: "Técnico em Desenvolvimento de Sistemas",
      periodo: "2016 - 2018",
      local: "São Paulo, SP",
      descricao: "Curso técnico com ênfase em programação e desenvolvimento de aplicações web e mobile.",
      certificacoes: ["Desenvolvimento Frontend", "Banco de Dados"],
      link: "https://drive.google.com/file/d/1on_Qu1wlEA40ko26wib39d_F8VpqOcMh/view?usp=drive_link",
    },
    {
      instituicao: "Plataforma Online",
      curso: "Especialização em React e Next.js",
      periodo: "2022",
      local: "Online",
      descricao:
        "Curso intensivo focado em desenvolvimento frontend com React e Next.js, incluindo práticas modernas e otimização de performance.",
      certificacoes: ["React Avançado", "Next.js", "TypeScript"],
      link: "https://drive.google.com/file/d/17CMBXGeC5yJLQuPmN6iFuSCLePmPEHZV/view?usp=drive_link",
    },
  ]

  const cursosList = [
    {
      nome: "Desenvolvimento Web Fullstack - Udemy",
      link: "https://www.udemy.com/certificate/example1/",
    },
    {
      nome: "UI/UX Design Fundamentals - Coursera",
      link: "https://www.coursera.org/certificate/example2/",
    },
    {
      nome: "DevOps e CI/CD - Alura",
      link: "https://www.alura.com.br/certificate/example3/",
    },
  ]

  const workshopsList = [
    {
      nome: "Web Summit 2022",
      link: "https://websummit.com/certificate/example1/",
    },
    {
      nome: "Hackathon de Inovação Digital",
      link: "https://hackathon.example.com/certificate/",
    },
    {
      nome: "Workshop de Acessibilidade Web",
      link: "https://accessibility.workshop.com/certificate/",
    },
  ]

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
                  {item.certificacoes.map((cert, i) => (
                    <Badge key={i} variant="secondary">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button size="sm" className="mt-2" asChild>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  <ExternalLink className="h-4 w-4" />
                  Ver Certificado
                </a>
              </Button>
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
                      {curso.nome}
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
                      {workshop.nome}
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
