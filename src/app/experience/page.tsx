import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Briefcase } from "lucide-react"

export default function Experiencia() {
  const experiencias = [
    {
      cargo: "Desenvolvedor Frontend Sênior",
      empresa: "Tech Solutions",
      periodo: "2021 - Presente",
      local: "São Paulo, SP",
      descricao:
        "Desenvolvimento de aplicações web modernas utilizando React, Next.js e TypeScript. Liderança técnica de equipe e implementação de melhores práticas de desenvolvimento.",
      responsabilidades: [
        "Desenvolvimento de interfaces responsivas e acessíveis",
        "Implementação de arquitetura de componentes reutilizáveis",
        "Otimização de performance e SEO",
        "Mentoria de desenvolvedores júnior",
      ],
      tecnologias: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
    },
    {
      cargo: "Desenvolvedor Fullstack",
      empresa: "Digital Innovations",
      periodo: "2019 - 2021",
      local: "São Paulo, SP",
      descricao:
        "Atuação no desenvolvimento completo de aplicações web, desde o frontend até o backend, com foco em soluções escaláveis e de alta performance.",
      responsabilidades: [
        "Desenvolvimento de APIs RESTful",
        "Implementação de autenticação e autorização",
        "Integração com serviços de terceiros",
        "Desenvolvimento de interfaces de usuário",
      ],
      tecnologias: ["JavaScript", "Node.js", "Express", "MongoDB", "React"],
    },
    {
      cargo: "Desenvolvedor Web Júnior",
      empresa: "Startup Creative",
      periodo: "2018 - 2019",
      local: "São Paulo, SP",
      descricao:
        "Início da carreira profissional com foco em desenvolvimento frontend e implementação de designs responsivos para diversos clientes.",
      responsabilidades: [
        "Desenvolvimento de websites responsivos",
        "Implementação de designs a partir de mockups",
        "Otimização para dispositivos móveis",
        "Manutenção de sites existentes",
      ],
      tecnologias: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"],
    },
  ]

  return (
    <div className="container mx-auto max-w-4xl animate-fadeIn">
      <h1 className="text-4xl font-bold mb-8">Experiência Profissional</h1>

      <div className="space-y-8">
        {experiencias.map((exp, index) => (
          <Card key={index} className="relative overflow-hidden">
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

              <div>
                <h4 className="text-sm font-medium mb-2">Tecnologias Utilizadas:</h4>
                <div className="flex flex-wrap gap-2">
                  {exp.tecnologias.map((tech, i) => (
                    <Badge key={i} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
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
                <h3 className="text-lg font-medium">E-commerce Platform</h3>
              </div>
              <p className="text-muted-foreground mb-3">
                Desenvolvimento completo de uma plataforma de e-commerce com integração de pagamentos, gestão de estoque
                e painel administrativo.
              </p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">Node.js</Badge>
                <Badge variant="outline">MongoDB</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Briefcase className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Dashboard Analytics</h3>
              </div>
              <p className="text-muted-foreground mb-3">
                Criação de um dashboard de análise de dados em tempo real com visualizações interativas e relatórios
                personalizados.
              </p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">Next.js</Badge>
                <Badge variant="outline">D3.js</Badge>
                <Badge variant="outline">Firebase</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
