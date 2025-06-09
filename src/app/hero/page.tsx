import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Mail, MessageSquare, Cpu, Database, Globe, Layout, Smartphone, Server } from "lucide-react"

export default function SobreMim() {
  const technologies = [
    { name: "Frontend", icon: Layout },
    { name: "Backend", icon: Server },
    { name: "Mobile", icon: Smartphone },
    { name: "Databases", icon: Database },
    { name: "Web", icon: Globe },
    { name: "Hardware", icon: Cpu },
  ]

  return (
    <div className="container mx-auto max-w-4xl animate-fadeIn">
      <h1 className="text-4xl font-bold mb-8">Sobre Mim</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Profile Image */}
        <div className="flex justify-center md:justify-start">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20">
            <Image src="https://github.com/gui1416.png" alt="Guilherme" fill className="object-cover" />
          </div>
        </div>

        {/* Profile Info */}
        <div className="md:col-span-2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Guilherme Machado</h2>
          <p className="text-xl text-primary mb-4">Desenvolvedor Full-Stack</p>
          <p className="text-muted-foreground mb-6">
            Sou um desenvolvedor web apaixonado por criar soluções digitais inovadoras e funcionais. Com experiência em
            diversas tecnologias, busco sempre aprender e aplicar as melhores práticas para entregar projetos de alta
            qualidade.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button className="gap-2" asChild>
              <a
                href="https://drive.google.com/file/d/17Zl6Th_r_KCQN9z0tagauV2Ch9y7JDdO/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={18} />
                Baixar CV
              </a>
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <a href="mailto:guirmdev@gmail.com">
                <Mail size={18} />
                E-mail
              </a>
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <a
                href="https://wa.me/5511969954587?text=Olá%2C%20vim%20pelo%20seu%20site!"
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

      {/* Technologies */}
      <h2 className="text-2xl font-semibold mb-6">Tecnologias</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-12">
        {technologies.map((tech) => (
          <Card key={tech.name} className="hover:border-primary/50 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <tech.icon className="h-12 w-12 mb-4 text-primary" />
              <span className="text-sm font-medium">{tech.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Skills Summary */}
      <h2 className="text-2xl font-semibold mb-6">Resumo de Habilidades</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-3">Desenvolvimento Frontend</h3>
            <p className="text-muted-foreground">
              Experiência com React, Next.js, HTML5, CSS3, Tailwind CSS e outras tecnologias modernas para criar
              interfaces responsivas e atraentes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-3">Desenvolvimento Backend</h3>
            <p className="text-muted-foreground">
              Conhecimento em Node.js, Express, APIs RESTful e integração com bancos de dados para criar aplicações
              robustas e escaláveis.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
