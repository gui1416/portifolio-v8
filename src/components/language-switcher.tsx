"use client"

import { useTransition } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Languages } from "lucide-react"
import { usePathname, useRouter } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const LOCALE_FLAGS: Record<string, string> = {
  pt: "🇧🇷",
  en: "🇺🇸",
  es: "🇪🇸",
}

export function LanguageSwitcher({ collapsed = false }: { collapsed?: boolean }) {
  const t = useTranslations("languageSwitcher")
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  if (collapsed) {
    return (
      <Select value={locale} onValueChange={handleChange} disabled={isPending}>
        <SelectTrigger
          className="h-9 w-full justify-center px-0 [&>svg:last-child]:hidden"
          aria-label={t("label")}
        >
          <Languages className="h-5 w-5" />
        </SelectTrigger>
        <SelectContent>
          {routing.locales.map((loc) => (
            <SelectItem key={loc} value={loc}>
              {LOCALE_FLAGS[loc]} {t(loc)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }

  return (
    <Select value={locale} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="w-full" aria-label={t("label")}>
        <span className="flex items-center gap-2">
          <Languages className="h-4 w-4" />
          <SelectValue />
        </span>
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {LOCALE_FLAGS[loc]} {t(loc)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
