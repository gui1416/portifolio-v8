"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Calendar, MapPin, Award, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

export default function Educacao() {
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null)

  const educacaoItems = [
    {
      instituicao: "Faculdade das Americas - FAM",
      curso: "Bacharelado em Ciência da Computação",
      duracao: "3245 horas",
      local: "São Paulo, SP",
      descricao:
        "Formação completa em Ciência da Computação com foco em desenvolvimento de software e sistemas distribuídos.",
      certificacoes: ["Programação Avançada", "Inteligência Artificial", "Desenvolvimento Web"],
      link: "",
    },
    {
      instituicao: "CISCO - Networking Academy",
      curso: "Introdução à Cibersegurança",
      duracao: "6 horas",
      local: "Online",
      descricao: "Curso técnico com ênfase em introduzir conhecimentos gerais a cibersegurança.",
      certificacoes: ["Métodos de infiltração", "Manutenção de Dados"],
      link: "https://drive.google.com/file/d/1OAV7pVmYka5x0WBxnhclRB00uzuMjWpK/view?usp=sharing",
    },
    {
      instituicao: "Udemy",
      curso: "Certificação Amazon AWS Cloud Practitioner (CLF-C01)",
      duracao: "13 horas",
      local: "Online",
      descricao: "Certificação introdutória aos serviços e conceitos da nuvem AWS.",
      certificacoes: ["Conhecimento fundamental dos serviços AWS", "Conformidade AWS", "Arquitetura em nuvem"],
      link: "https://drive.google.com/file/d/1g8N48aMPfEkkXDXtZP1BI_J71655ZUrm/view?usp=sharing",
    },
  ]

  const cursosList = [
    {
      nome: "Versionamento de Código com Git e GitHub - DIO",
      link: "https://drive.google.com/file/d/1hyY-XrEShTdTHjoiBQFLqSHSCXWAaTWx/view?usp=sharing",
    },
    {
      nome: "Intrudução ao Desenvolvimento Web - DIO",
      link: "https://drive.google.com/file/d/1UnxXivPktr3eiPqn6Ypbuk7Crypr0HZb/view?usp=sharing",
    },
    {
      nome: "Introdução à IoT e à Transformação Digital - CISCO",
      link: "https://drive.google.com/file/d/17CMBXGeC5yJLQuPmN6iFuSCLePmPEHZV/view?usp=sharing",
    },
  ]

  const workshopsList = [
    {
      nome: "Visita a Oracle",
      link: "",
    },
    {
      nome: "Palestra sobre IA",
      link: "",
    },
    {
      nome: "Workshop de Acessibilidade Web",
      link: "https://drive.google.com/file/d/1EXAMPLE/view",
    },
  ]

  const handleOpenCertificate = (url: string) => {
    setCertificateUrl(url)
  }

  return (
    <div className="container mx-auto max-w-4xl animate-fadeIn">
      <h1 className="text-4xl font-bold mb-8">Educação</h1>

      <div className="space-y-8">
        {educacaoItems.map((item, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{item.curso}</CardTitle>
                  <p className="text-primary font-medium mt-1">{item.instituicao}</p>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {item.duracao}
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

              {item.link && (
                <Button size="sm" className="mt-2 flex items-center gap-1" onClick={() => handleOpenCertificate(item.link)}>
                  <Award className="h-4 w-4" />
                  Ver Certificado
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
                      onClick={() => handleOpenCertificate(curso.link)}
                      className="cursor-pointer hover:text-primary hover:underline transition-colors"
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
                    {workshop.link ? (
                      <a
                        onClick={() => handleOpenCertificate(workshop.link)}
                        className="cursor-pointer hover:text-primary hover:underline transition-colors"
                      >
                        {workshop.nome}
                      </a>
                    ) : (
                      <span>{workshop.nome}</span>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog
        open={!!certificateUrl}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setCertificateUrl(null)
          }
        }}
      >
        <DialogContent className="p-0 w-[90vw] max-w-[1200px] flex flex-col">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle>Visualizador de Certificado</DialogTitle>
          </DialogHeader>
          <div className="w-full p-2 pt-0">
            {certificateUrl && (
              <iframe
                src={certificateUrl.replace("/view?usp=sharing", "/preview")}
                className="w-full aspect-video border-0 rounded-md"
                title="Certificado"
              ></iframe>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}