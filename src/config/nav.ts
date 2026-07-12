import {
  User,
  GraduationCap,
  Code2,
  Briefcase,
  FolderKanban,
  Mail,
  GitCommit,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  href: string
  // Chave de tradução dentro do namespace `nav`.
  key: string
  icon: LucideIcon
}

// Fonte única de verdade das rotas de navegação. Consumida pela Sidebar e pelo
// Command Palette — adicionar uma rota aqui a faz aparecer em ambos.
export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/hero", key: "hero", icon: User },
  { href: "/education", key: "education", icon: GraduationCap },
  { href: "/skills", key: "skills", icon: Code2 },
  { href: "/experience", key: "experience", icon: Briefcase },
  { href: "/projects", key: "projects", icon: FolderKanban },
  { href: "/commits", key: "commits", icon: GitCommit },
  { href: "/contact", key: "contact", icon: Mail },
] as const
