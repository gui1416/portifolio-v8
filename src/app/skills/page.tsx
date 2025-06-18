import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTechnicalSkills, getSoftSkills, getLanguages, getSkillsData } from "@/lib/data" // Importa funções de dados

export default function Skills() {
  const technicalSkills = getTechnicalSkills(); // Obtém habilidades técnicas
  const softSkills = getSoftSkills(); // Obtém habilidades interpessoais
  const languages = getLanguages(); // Obtém idiomas
  const skillsData = getSkillsData(); // Obtém dados completos de habilidades para especializações

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
        {skillsData.specialties.map((specialty) => (
          <Card key={specialty.title}>
            <CardHeader>
              <CardTitle className="text-lg">{specialty.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {specialty.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {specialty.badges.map((badge, i) => (
                  <Badge key={i} variant="secondary">{badge}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
