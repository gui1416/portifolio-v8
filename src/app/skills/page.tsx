import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Skills() {
  const technicalSkills = [
    { name: "HTML/CSS", level: 95, category: "frontend" },
    { name: "JavaScript", level: 90, category: "frontend" },
    { name: "TypeScript", level: 85, category: "frontend" },
    { name: "React", level: 90, category: "frontend" },
    { name: "Next.js", level: 85, category: "frontend" },
    { name: "Tailwind CSS", level: 90, category: "frontend" },
    { name: "Node.js", level: 80, category: "backend" },
    { name: "Express", level: 75, category: "backend" },
    { name: "MongoDB", level: 70, category: "backend" },
    { name: "PostgreSQL", level: 65, category: "backend" },
    { name: "REST APIs", level: 85, category: "backend" },
    { name: "GraphQL", level: 60, category: "backend" },
    { name: "Git/GitHub", level: 90, category: "tools" },
    { name: "Docker", level: 65, category: "tools" },
    { name: "CI/CD", level: 60, category: "tools" },
    { name: "Jest/Testing", level: 70, category: "tools" },
  ]

  const softSkills = [
    { name: "Comunicação", level: 90 },
    { name: "Trabalho em Equipe", level: 95 },
    { name: "Resolução de Problemas", level: 85 },
    { name: "Gestão de Tempo", level: 80 },
    { name: "Adaptabilidade", level: 90 },
    { name: "Pensamento Crítico", level: 85 },
  ]

  const languages = [
    { name: "Português", level: "Nativo", badge: "Fluente" },
    { name: "Inglês", level: "Avançado", badge: "Proficiente" },
    { name: "Espanhol", level: "Intermediário", badge: "Conversacional" },
  ]

  return (
    <div className="container mx-auto max-w-4xl animate-fadeIn">
      <h1 className="text-4xl font-bold mb-8">Habilidades</h1>

      <Tabs defaultValue="technical" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="technical">Técnicas</TabsTrigger>
          <TabsTrigger value="soft">Interpessoais</TabsTrigger>
          <TabsTrigger value="languages">Idiomas</TabsTrigger>
        </TabsList>

        <TabsContent value="technical" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {technicalSkills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.name}</span>
                  <Badge variant="outline">{skill.level}%</Badge>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="soft" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {softSkills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.name}</span>
                  <Badge variant="outline">{skill.level}%</Badge>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="languages" className="mt-6">
          <div className="grid grid-cols-1 gap-4">
            {languages.map((lang) => (
              <Card key={lang.name}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{lang.name}</h3>
                    <p className="text-sm text-muted-foreground">{lang.level}</p>
                  </div>
                  <Badge>{lang.badge}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <h2 className="text-2xl font-semibold mb-6">Áreas de Especialização</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Desenvolvimento Frontend</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Especializado em criar interfaces modernas, responsivas e acessíveis com as tecnologias mais recentes.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="secondary">Tailwind</Badge>
              <Badge variant="secondary">TypeScript</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Desenvolvimento Backend</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Experiência na criação de APIs robustas e escaláveis, com foco em performance e segurança.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Node.js</Badge>
              <Badge variant="secondary">Express</Badge>
              <Badge variant="secondary">MongoDB</Badge>
              <Badge variant="secondary">REST</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">DevOps & Ferramentas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Conhecimento em práticas modernas de desenvolvimento, testes e implantação contínua.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Git</Badge>
              <Badge variant="secondary">Docker</Badge>
              <Badge variant="secondary">CI/CD</Badge>
              <Badge variant="secondary">Testing</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
