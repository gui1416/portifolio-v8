import { ptBR, enUS, es } from "date-fns/locale"
import type { Locale as DateFnsLocale } from "date-fns"

// Maps the app locale to the matching date-fns locale for relative dates.
export function dateFnsLocale(locale: string): DateFnsLocale {
  switch (locale) {
    case "en":
      return enUS
    case "es":
      return es
    default:
      return ptBR
  }
}
