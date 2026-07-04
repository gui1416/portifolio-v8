import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["pt", "en", "es"],
  defaultLocale: "pt",
  // PT keeps the current URLs (no prefix); EN/ES get /en and /es.
  localePrefix: "as-needed",
})

export type Locale = (typeof routing.locales)[number]
