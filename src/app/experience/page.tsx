import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Briefcase } from "lucide-react"

export default function Experiencia() {
  const experiencias = [
    {
      cargo: "Auxiliar de Desenvolvimento",
      empresa: "Soluções Serviços Terceirizados - LTDA",
      periodo: "2025 - Presente",
      local: "São Paulo, SP",
      descricao:
        "Desenvolvimento de aplicações web modernas utilizando React, Next.js e TypeScript.",
      responsabilidades: [
        "Documentação Técnica",
        "Implantação de Sistemas",
        "Aprendizado Contínuo",
        "Colaboração com Outras Áreas",
      ],
      tecnologias: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
    },
    {
      cargo: "Auxiliar de Contratos",
      empresa: "Soluções Serviços Terceirizados - LTDA",
      periodo: "2024 - 2025",
      local: "São Paulo, SP",
      descricao:
        "Atuação no auxilio de todos o ciclo de vida contratual, desde a elaboração até o arquivamento.",
      responsabilidades: [
        "Organização e Arquivamento de Documentos",
        "Controle de Prazos e Vencimentos",
        "Cadastro e Atualização de Informações",
        "Manutenção do equilibrio finânceiro",
      ],
      tecnologias: ["Teknisa", "Google Shet", "Excel"],
    },
    {
      cargo: "Operador de Cobranças",
      empresa: "Roveri Associados",
      periodo: "2023 - 2023",
      local: "São Caetano do Sul, SP",
      descricao:
        "Atuação na realização de cobranças de valores devidos por clientes, buscando a regularização de débitos de forma eficiente.",
      responsabilidades: [
        "Contato com Clientes Devedores",
        "Negociação de Pagamentos",
        "Esclarecimento de Dúvidas",
        "Emissão de Boletos e Outros Documentos",
      ],
      tecnologias: [null],
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
                Desenvolvimento de uma plataforma de e-commerce com integração de pagamentos.
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
