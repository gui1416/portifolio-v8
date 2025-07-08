import Link from "next/link"
import { Search, Home, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProjectNotFound() {
 return (
  <div className="min-h-screen text-white flex items-center justify-center p-6 relative overflow-hidden">
   <div className="absolute inset-0 opacity-20">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
    <div
     className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-500/5 rounded-full blur-3xl animate-pulse"
     style={{ animationDelay: "1s" }}
    />
   </div>
   <div className="relative z-10 text-center space-y-10 max-w-2xl">
    <div className="relative">
     <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 flex items-center justify-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-600/10 to-zinc-400/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div
       className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-zinc-500/30 to-zinc-400/30 bg-clip-border animate-spin"
       style={{ animationDuration: "3s" }}
      >
       <div className="absolute inset-[2px] rounded-full bg-black" />
      </div>

      <Search className="w-12 h-12 text-zinc-400 relative z-10 group-hover:text-zinc-200 transition-colors duration-300" />
     </div>
     <div
      className="absolute -top-2 -right-2 w-3 h-3 bg-zinc-400 rounded-full animate-bounce opacity-60"
      style={{ animationDelay: "0.5s" }}
     />
     <div
      className="absolute -bottom-2 -left-2 w-2 h-2 bg-zinc-500 rounded-full animate-bounce opacity-40"
      style={{ animationDelay: "1.5s" }}
     />
     <div
      className="absolute top-1/2 -right-4 w-1 h-1 bg-zinc-300 rounded-full animate-ping opacity-30"
      style={{ animationDelay: "2s" }}
     />
    </div>
    <div className="space-y-6">
     <div className="space-y-3">
      <h1 className="text-8xl font-extralight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
       404
      </h1>
      <h2 className="text-3xl font-light text-white tracking-wide">Projeto não encontrado</h2>
     </div>

     <p className="text-zinc-400 text-xl leading-relaxed max-w-lg mx-auto font-light">
      O projeto que você está procurando parece ter se perdido no espaço digital. Que tal explorar outras
      criações?
     </p>
    </div>
    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
     <Button
      asChild
      size="lg"
      className="bg-gradient-to-r from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-3"
     >
      <Link href="/projects" className="flex items-center gap-3">
       <FolderOpen className="w-5 h-5" />
       Explorar Projetos
      </Link>
     </Button>

     <Button
      asChild
      variant="outline"
      size="lg"
      className="border-zinc-600 bg-zinc-900/50 backdrop-blur-sm text-zinc-300 hover:bg-zinc-800/80 hover:text-white hover:border-zinc-500 transition-all duration-300 px-8 py-3"
     >
      <Link href="/hero" className="flex items-center gap-3">
       <Home className="w-5 h-5" />
       Página Inicial
      </Link>
     </Button>
    </div>
    <div className="pt-12 mt-12">
     <div className="relative">
      <div className="absolute inset-0 flex items-center">
       <div className="w-full border-t border-zinc-800" />
      </div>
      <div className="relative flex justify-center text-sm">
       <span className="bg-black px-4 text-zinc-500">Ou explore outras seções</span>
      </div>
     </div>

     <div className="flex flex-wrap justify-center gap-3 mt-6">
      {[
       { href: "/projects", label: "Todos os Projetos" },
       { href: "/hero", label: "Sobre Mim" },
       { href: "/skills", label: "Habilidades" },
       { href: "/contact", label: "Contato" },
      ].map((link) => (
       <Link
        key={link.href}
        href={link.href}
        className="group px-6 py-3 rounded-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 hover:bg-zinc-800/80 transition-all duration-300 text-sm font-medium"
       >
        <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">
         {link.label}
        </span>
       </Link>
      ))}
     </div>
    </div>
   </div>
  </div>
 )
}
