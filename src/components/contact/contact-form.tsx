"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Send } from "lucide-react"
import { toast } from "sonner"

const EMPTY_FORM = { nome: "", email: "", assunto: "", mensagem: "" }

// Formulário de contato reutilizável. Renderiza apenas o <form> — o consumidor
// (página /contact ou o dialog do command palette) decide o container.
// `onSuccess` é chamado após um envio bem-sucedido (ex.: fechar o dialog).
export function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
  const t = useTranslations("contact")
  const [formData, setFormData] = useState(EMPTY_FORM)
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
      })

      if (response.status === 429) {
        toast.error(t("toastRateLimitTitle"), {
          description: t("toastRateLimitDesc"),
        })
      } else if (response.ok) {
        toast.success(t("toastSuccessTitle"), {
          description: t("toastSuccessDesc"),
        })
        setFormData(EMPTY_FORM)
        onSuccess?.()
      } else {
        const errorData = await response.json()
        toast.error(t("toastErrorTitle"), {
          description: errorData.error || t("toastUnexpectedError"),
        })
      }
    } catch (error) {
      console.error("Erro de rede ou ao enviar o formulário:", error)
      toast.error(t("toastConnErrorTitle"), {
        description: t("toastConnErrorDesc"),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
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
  )
}
