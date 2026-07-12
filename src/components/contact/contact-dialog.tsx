"use client"

import { useTranslations } from "next-intl"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ContactForm } from "@/components/contact/contact-form"

// Dialog que reutiliza o mesmo formulário da rota /contact. Usado pelo command
// palette para permitir contato sem sair da página atual.
export function ContactDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const t = useTranslations("contact")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Responsivo: largura fluida com gutter no mobile (base do DialogContent),
          limitada em telas maiores; altura limitada à viewport (dvh, acompanha
          barras dinâmicas do mobile) com rolagem interna quando não couber. */}
      <DialogContent className="sm:max-w-md max-h-[90dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("sendMessage")}</DialogTitle>
          <DialogDescription>{t("letsChatDesc")}</DialogDescription>
        </DialogHeader>
        <ContactForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}
