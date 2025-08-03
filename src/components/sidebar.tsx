"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
import { useSidebar } from "@/components/sidebar-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Sidebar() {
  const { isOpen, toggleSidebar, closeSidebar } = useSidebar()
  const pathname = usePathname()

  const navItems = [
    { href: "/hero", label: "Sobre Mim", icon: User },
    { href: "/education", label: "Educação", icon: GraduationCap },
    { href: "/skills", label: "Habilidades", icon: Code2 },
    { href: "/experience", label: "Experiência", icon: Briefcase },
    { href: "/projects", label: "Projetos", icon: FolderKanban },
    { href: "/commits", label: "Atualizações", icon: GitCommit },
    { href: "/contact", label: "Contato", icon: Mail },
  ]

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={closeSidebar} />}

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
                <p className="text-sm text-muted-foreground">Desenvolvedor Web</p>
              </div>
            )}
          </div>

          <Separator />

          {/* Navigation */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <li key={item.href}>
                    <Link href={item.href} passHref onClick={closeSidebar}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={`w-full justify-start ${!isOpen && "lg:justify-center"}`}
                      >
                        <Icon className={`h-5 w-5 ${isOpen ? "mr-2" : ""}`} />
                        {isOpen && <span>{item.label}</span>}
                      </Button>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="p-4 mt-auto hidden lg:block">
            <Button variant="outline" size="icon" onClick={toggleSidebar} className="w-full flex justify-center">
              {isOpen ? <ChevronLeft /> : <ChevronRight />}
            </Button>
          </div>
        </div>
      </aside>

      <Button
        variant="outline"
        size="icon"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden shadow-lg"
      >
        <Menu />
      </Button>
    </>
  )
}
