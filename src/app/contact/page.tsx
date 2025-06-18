"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Github, Linkedin, Send, LucideIcon } from "lucide-react" // Importa LucideIcon
import { toast } from "sonner"
import { getPersonalInfo } from "@/lib/data" // Importa getPersonalInfo

// Mapeamento de nomes de ícones (string) para componentes LucideIcon
// Necessário para renderizar dinamicamente os ícones a partir de strings
const iconMap: { [key: string]: LucideIcon } = {
  Mail: Mail,
  Phone: Phone,
  MapPin: MapPin,
  Github: Github,
  Linkedin: Linkedin,
  // Adicione outros ícones que possam ser usados nos dados de contato, se houver
};

export default function Contato() {
  const personalInfo = getPersonalInfo(); // Obtém informações pessoais de forma centralizada

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Logando os dados do formulário no console (para fins de demonstração)
    console.log("Dados do formulário:", formData)

    // Simula o envio do formulário com um timeout
    setTimeout(() => {
      toast.success("Mensagem enviada!", {
        description: "Obrigado pelo contato. Responderei em breve.",
      })
      setFormData({
        nome: "",
        email: "",
        assunto: "",
        mensagem: "",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  // Prepara os detalhes de contato usando os dados de personalInfo
  const contatoDetails = [
    {
      key: "email",
      icon: personalInfo.contact.email.icon,
      label: "Email",
      value: personalInfo.contact.email.info,
      link: personalInfo.contact.email.url,
    },
    {
      key: "phone",
      icon: personalInfo.contact.phone.icon,
      label: "Telefone",
      value: personalInfo.contact.phone.info,
      link: personalInfo.contact.phone.url,
    },
    {
      key: "location",
      icon: personalInfo.contact.location.icon,
      label: "Localização",
      value: personalInfo.contact.location.info,
      link: personalInfo.contact.location.url,
    },
    {
      key: "github",
      icon: personalInfo.contact.github.icon,
      label: "GitHub",
      value: personalInfo.contact.github.info,
      link: personalInfo.contact.github.url,
    },
    {
      key: "linkedin",
      icon: personalInfo.contact.linkedin.icon,
      label: "LinkedIn",
      value: personalInfo.contact.linkedin.info,
      link: personalInfo.contact.linkedin.url,
    },
  ];

  return (
    <div className="container mx-auto max-w-4xl animate-fadeIn">
      <h1 className="text-4xl font-bold mb-8">Contato</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Envie uma mensagem</h2>
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    name="nome"
                    placeholder="Seu nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu.email@exemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assunto">Assunto</Label>
                  <Input
                    id="assunto"
                    name="assunto"
                    placeholder="Assunto da mensagem"
                    value={formData.assunto}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mensagem">Mensagem</Label>
                  <Textarea
                    id="mensagem"
                    name="mensagem"
                    placeholder="Sua mensagem..."
                    rows={5}
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Informações de Contato</h2>
          <Card>
            <CardHeader>
              <CardTitle>Vamos conversar!</CardTitle>
              <CardDescription>
                Estou disponível para projetos freelance, oportunidades de trabalho ou apenas para trocar ideias sobre
                tecnologia.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contatoDetails.map((item) => {
                  const IconComponent = iconMap[item.icon]; // Obtém o componente do ícone do mapeamento
                  return (
                    <div key={item.key} className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        {IconComponent && <IconComponent className="h-5 w-5 text-primary" />}
                      </div>
                      <div>
                        <h3 className="font-medium">{item.label}</h3>
                        {item.link && item.link !== "#" ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground">{item.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="pt-6">
              <h3 className="font-medium mb-2">Horário de Disponibilidade</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {personalInfo.contact.availability.days}: {personalInfo.contact.availability.hours}
                <br />
                Respondo emails e mensagens {personalInfo.contact.availability.response_time}.
              </p>

              <h3 className="font-medium mb-2">Preferência de Contato</h3>
              <p className="text-sm text-muted-foreground">
                {personalInfo.contact.preference}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
