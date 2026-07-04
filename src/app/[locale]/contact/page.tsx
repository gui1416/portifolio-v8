"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react"
import { toast } from "sonner"

export default function Contato() {
  const t = useTranslations("contact")
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 429) {
        toast.error(t("toastRateLimitTitle"), {
          description: t("toastRateLimitDesc"),
        });
      } else if (response.ok) {
        toast.success(t("toastSuccessTitle"), {
          description: t("toastSuccessDesc"),
        });
        setFormData({
          nome: "",
          email: "",
          assunto: "",
          mensagem: "",
        });
      } else {
        const errorData = await response.json();
        toast.error(t("toastErrorTitle"), {
          description: errorData.error || t("toastUnexpectedError"),
        });
      }
    } catch (error) {
      console.error("Erro de rede ou ao enviar o formulário:", error);
      toast.error(t("toastConnErrorTitle"), {
        description: t("toastConnErrorDesc"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contatoInfo = [
    {
      icon: Mail,
      label: t("infoEmail"),
      value: "guirmdev@gmail.com",
      link: "mailto:guirmdev@gmail.com",
    },
    {
      icon: Phone,
      label: t("infoPhone"),
      value: "+55 (11) 96995-4587",
      link: "https://wa.me/5511969954587?text=Olá%2C%20vim%20pelo%20seu%20site!",
    },
    {
      icon: MapPin,
      label: t("infoLocation"),
      value: t("locationValue"),
      link: null,
    },
    {
      icon: Github,
      label: t("infoGithub"),
      value: "github.com/gui1416",
      link: "https://github.com/gui1416",
    },
    {
      icon: Linkedin,
      label: t("infoLinkedin"),
      value: "linkedin.com/in/guilherme-rabelo",
      link: "https://www.linkedin.com/in/guilherme-rabelo-3aa160294/",
    },
  ]

  return (
    <div className="container mx-auto max-w-4xl animate-fadeIn">
      <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-6">{t("sendMessage")}</h2>
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">{t("name")}</Label>
                  <Input
                    id="nome"
                    name="nome"
                    placeholder={t("namePlaceholder")}
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assunto">{t("subject")}</Label>
                  <Input
                    id="assunto"
                    name="assunto"
                    placeholder={t("subjectPlaceholder")}
                    value={formData.assunto}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mensagem">{t("message")}</Label>
                  <Textarea
                    id="mensagem"
                    name="mensagem"
                    placeholder={t("messagePlaceholder")}
                    rows={5}
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                  {isSubmitting ? (
                    t("sending")
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {t("send")}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">{t("contactInfo")}</h2>
          <Card>
            <CardHeader>
              <CardTitle>{t("letsChat")}</CardTitle>
              <CardDescription>{t("letsChatDesc")}</CardDescription>
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
              <h3 className="font-medium mb-2">{t("availability")}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t("availabilityLine1")}
                <br />
                {t("availabilityLine2")}
              </p>

              <h3 className="font-medium mb-2">{t("contactPreference")}</h3>
              <p className="text-sm text-muted-foreground">{t("contactPreferenceValue")}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
