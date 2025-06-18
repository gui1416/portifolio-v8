import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Mail, MessageSquare, Cpu, Database, Globe, Layout, Smartphone, Server, Phone, MapPin, Github, Linkedin } from "lucide-react"
import { getPersonalInfo, getSkillsData } from "@/lib/data" // Importa funções de dados

// Mapeamento de nomes de ícones (string) para componentes LucideIcon
const iconMap = {
  Layout: Layout,
  Server: Server,
  Smartphone: Smartphone,
  Database: Database,
  Globe: Globe,
  Cpu: Cpu,
  Mail: Mail,
  Phone: Phone,
  MapPin: MapPin,
  Github: Github,
  Linkedin: Linkedin,
  MessageSquare: MessageSquare,
};

export default function SobreMim() {
  const personalInfo = getPersonalInfo(); // Obtém informações pessoais
  const skillsData = getSkillsData(); // Obtém dados de habilidades
  const technicalAreas = skillsData.technical_areas; // Usa as áreas técnicas das habilidades
  const resumeTech = [personalInfo.resume_tech.frontend, personalInfo.resume_tech.backend];

  return (
    <div className="container mx-auto max-w-4xl animate-fadeIn">
      <h1 className="text-4xl font-bold mb-8">Sobre Mim</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Imagem de Perfil */}
        <div className="flex justify-center md:justify-start">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20">
            <Image src={personalInfo.avatar} alt={personalInfo.name} fill className="object-cover" />
          </div>
        </div>

        {/* Informações de Perfil */}
        <div className="md:col-span-2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">{personalInfo.name}</h2>
          <p className="text-xl text-primary mb-4">{personalInfo.title}</p>
          <p className="text-muted-foreground mb-6">
            {personalInfo.bio}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button className="gap-2" asChild>
              <a
                href={personalInfo.cv_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={18} />
                Baixar CV
              </a>
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <a href={personalInfo.contact.email.url}>
                <Mail size={18} />
                E-mail
              </a>
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <a
                href={personalInfo.contact.phone.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare size={18} />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Tecnologias */}
      <h2 className="text-2xl font-semibold mb-6">Tecnologias</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-12">
        {technicalAreas.map((area) => {
          // Mapeia o nome do ícone (string) para o componente LucideIcon correspondente
          const IconComponent = iconMap[area.icon as keyof typeof iconMap] || Layout; // Fallback para Layout
          return (
            <Card key={area.name} className="hover:border-primary/50 transition-colors">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <IconComponent className="h-12 w-12 mb-4 text-primary" />
                <span className="text-sm font-medium">{area.name}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Resumo de Habilidades */}
      <h2 className="text-2xl font-semibold mb-6">Resumo de Habilidades</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resumeTech.map((item) => (
          <Card key={item.title}>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-3">{item.title}</h3>
              <p className="text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
