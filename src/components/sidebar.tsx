"use client"
import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import {
  User,
  GraduationCap,
  Code2,
  Briefcase,
  FolderKanban,
  Mail,
  ChevronLeft,
  ChevronRight,
  Menu,
  GitCommit,
} from "lucide-react"
import { Link, usePathname } from "@/i18n/navigation"
import { useSidebar } from "@/components/sidebar-provider"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { href: "/hero", key: "hero", icon: User },
  { href: "/education", key: "education", icon: GraduationCap },
  { href: "/skills", key: "skills", icon: Code2 },
  { href: "/experience", key: "experience", icon: Briefcase },
  { href: "/projects", key: "projects", icon: FolderKanban },
  { href: "/commits", key: "commits", icon: GitCommit },
  { href: "/contact", key: "contact", icon: Mail },
] as const

export function Sidebar() {
  const t = useTranslations("nav")
  const { isOpen, toggleSidebar, closeSidebar } = useSidebar()
  const pathname = usePathname()
  const previousPathnameRef = useRef(pathname)

  useEffect(() => {
    if (previousPathnameRef.current === pathname) return
    previousPathnameRef.current = pathname
    closeSidebar()
  }, [pathname, closeSidebar])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSidebar()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, closeSidebar])

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen bg-card border-r border-border
          transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-0 lg:w-20"}
        `}
      >
        <div className="h-full flex flex-col overflow-hidden">
          <div className="p-4 flex flex-col items-center">
            <Avatar className={`w-16 h-16 mb-2 ${!isOpen && "lg:w-12 lg:h-12"}`}>
              <AvatarImage src="https://github.com/gui1416.png" alt="Guilherme" />
              <AvatarFallback>GM</AvatarFallback>
            </Avatar>

            {isOpen && (
              <div className="text-center">
                <h3 className="font-semibold">Guilherme</h3>
                <p className="text-sm text-muted-foreground">{t("role")}</p>
              </div>
            )}
          </div>

          <Separator />

          <nav aria-label={t("ariaLabel")} className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                const Icon = item.icon

                return (
                  <li key={item.href}>
                    <Button
                      asChild
                      variant={isActive ? "secondary" : "ghost"}
                      className={`w-full justify-start ${!isOpen && "lg:justify-center"}`}
                    >
                      <Link href={item.href} onClick={closeSidebar} aria-current={isActive ? "page" : undefined}>
                        <Icon className={`h-5 w-5 ${isOpen ? "mr-2" : ""}`} />
                        {isOpen && <span>{t(item.key)}</span>}
                      </Link>
                    </Button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="px-4 pb-2">
            <LanguageSwitcher collapsed={!isOpen} />
          </div>

          <div className="p-4 mt-auto hidden lg:block">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleSidebar}
              className="w-full flex justify-center"
              aria-label={isOpen ? t("collapse") : t("expand")}
            >
              {isOpen ? <ChevronLeft /> : <ChevronRight />}
            </Button>
          </div>
        </div>
      </aside>

      {!isOpen && (
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 lg:hidden shadow-lg"
          aria-label={t("openMenu")}
        >
          <Menu />
        </Button>
      )}
    </>
  )
}
