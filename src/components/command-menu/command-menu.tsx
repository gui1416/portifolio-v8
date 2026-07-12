"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { Sun, Moon, Monitor, FolderKanban, Mail } from "lucide-react"
import { useRouter, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { NAV_ITEMS } from "@/config/nav"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command"
import { ContactDialog } from "@/components/contact/contact-dialog"

export type ProjectIndexItem = {
  slug: string
  title: string
  category: string
}

const LOCALE_FLAGS: Record<string, string> = {
  pt: "🇧🇷",
  en: "🇺🇸",
  es: "🇪🇸",
}

// Evento global para abrir o palette a partir de qualquer lugar (ex.: botão na
// sidebar, útil no mobile onde não há atalho de teclado).
export const OPEN_COMMAND_MENU_EVENT = "command-menu:open"

export function CommandMenu({ projects }: { projects: ProjectIndexItem[] }) {
  const t = useTranslations("commandMenu")
  const tNav = useTranslations("nav")
  const tLang = useTranslations("languageSwitcher")
  const { setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    const onOpen = () => setOpen(true)

    document.addEventListener("keydown", onKeyDown)
    document.addEventListener(OPEN_COMMAND_MENU_EVENT, onOpen)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener(OPEN_COMMAND_MENU_EVENT, onOpen)
    }
  }, [])

  // Fecha o palette e executa a ação no próximo frame. O adiamento evita uma
  // corrida entre o unmount do dialog (ao fechar) e a navegação quando o item é
  // selecionado via teclado (Enter), em que o router.push era perdido.
  const runCommand = (fn: () => void) => {
    setOpen(false)
    requestAnimationFrame(() => fn())
  }

  // Contato abre outro overlay Radix: aguardamos o palette fechar para não haver
  // conflito de foco/scroll-lock entre os dois dialogs.
  const openContact = () => {
    setOpen(false)
    setTimeout(() => setContactOpen(true), 80)
  }

  return (
    <>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title={t("title")}
        description={t("placeholder")}
      >
        <CommandInput placeholder={t("placeholder")} />
        <CommandList>
          <CommandEmpty>{t("empty")}</CommandEmpty>

          <CommandGroup heading={t("groupNavigation")}>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <CommandItem
                  key={item.href}
                  onSelect={() => runCommand(() => router.push(item.href))}
                >
                  <Icon />
                  <span>{tNav(item.key)}</span>
                </CommandItem>
              )
            })}
          </CommandGroup>

          {projects.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading={t("groupProjects")}>
                {projects.map((project) => (
                  <CommandItem
                    key={project.slug}
                    onSelect={() =>
                      runCommand(() => router.push(`/projects/${project.slug}`))
                    }
                  >
                    <FolderKanban />
                    <span>{project.title}</span>
                    <span className="text-muted-foreground ml-auto text-xs">
                      {project.category}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          <CommandSeparator />
          <CommandGroup heading={t("groupTheme")}>
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <Sun />
              <span>{t("themeLight")}</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon />
              <span>{t("themeDark")}</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Monitor />
              <span>{t("themeSystem")}</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />
          <CommandGroup heading={t("groupLanguage")}>
            {routing.locales.map((loc) => (
              <CommandItem
                key={loc}
                onSelect={() =>
                  runCommand(() => router.replace(pathname, { locale: loc }))
                }
              >
                <span aria-hidden="true">{LOCALE_FLAGS[loc]}</span>
                <span>{tLang(loc)}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />
          <CommandGroup heading={t("groupContact")}>
            <CommandItem onSelect={openContact}>
              <Mail />
              <span>{t("openContact")}</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
    </>
  )
}
