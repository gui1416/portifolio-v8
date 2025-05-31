"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react"
import { toast } from "sonner"

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Logando os dados do formulário no console
    console.log("Dados do formulário:", formData)

    // Simulando envio do formulário
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

  const contatoInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "guirmdev@gmail.com",
      link: "mailto:guirmdev@gmail.com",
    },
    {
      icon: Phone,
      label: "Telefone",
      value: "+55 (11) 96995-4587",
      link: "https://wa.me/5511969954587?text=Olá%2C%20vim%20pelo%20seu%20site!",
    },
    {
      icon: MapPin,
      label: "Localização",
      value: "Mauá, SP - Brasil",
      link: null,
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/gui1416",
      link: "https://github.com/gui1416",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/guilherme-rabelo",
      link: "https://www.linkedin.com/in/guilherme-rabelo-3aa160294/",
    },
  ]

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
                {contatoInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.label}</h3>
                      {item.link ? (
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
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="pt-6">
              <h3 className="font-medium mb-2">Horário de Disponibilidade</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Segunda a Sexta: 9h às 18h
                <br />
                Respondo emails e mensagens em até 24 horas.
              </p>

              <h3 className="font-medium mb-2">Preferência de Contato</h3>
              <p className="text-sm text-muted-foreground">
                Para assuntos profissionais, prefiro contato por email ou LinkedIn. Para conversas rápidas, pode me
                chamar no WhatsApp.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
