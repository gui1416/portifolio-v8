import { Suspense } from "react"
import Image from "next/image"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Mail, MessageSquare, Cpu, Database, Globe, Layout, Smartphone, Server } from "lucide-react"
import { GithubContributionsCard, GithubContributionsCardSkeleton } from "@/components/github-contributions-card"

export default async function SobreMim({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("hero")

  const technologies = [
    { name: t("techFrontend"), icon: Layout },
    { name: t("techBackend"), icon: Server },
    { name: t("techMobile"), icon: Smartphone },
    { name: t("techDatabases"), icon: Database },
    { name: t("techWeb"), icon: Globe },
    { name: t("techHardware"), icon: Cpu },
  ]

  return (
    <div className="container mx-auto max-w-4xl animate-fadeIn">
      <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="flex justify-center md:justify-start">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20">
            <Image src="https://github.com/gui1416.png" alt="Guilherme" fill className="object-cover" />
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Guilherme Machado</h2>
          <p className="text-xl text-primary mb-4">{t("role")}</p>
          <p className="text-muted-foreground mb-6">{t("bio")}</p>

          <div className="flex flex-wrap gap-3">
            <Button className="gap-2" asChild>
              <a
                href="https://drive.google.com/file/d/1W_KbMMjRIAEUVAtZTWsxNmSAmyy7QhIU/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={18} />
                {t("downloadCv")}
              </a>
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <a href="mailto:guirmdev@gmail.com">
                <Mail size={18} />
                {t("email")}
              </a>
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <a
                href="https://wa.me/5511969954587?text=Olá%2C%20vim%20pelo%20seu%20site!"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare size={18} />
                {t("whatsapp")}
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className="mb-12">
        <Suspense fallback={<GithubContributionsCardSkeleton />}>
          <GithubContributionsCard />
        </Suspense>
      </div>

      <h2 className="text-2xl font-semibold mb-6">{t("technologies")}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-12">
        {technologies.map((tech) => (
          <Card key={tech.name} className="hover:border-primary/50 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <tech.icon className="h-12 w-12 mb-4 text-primary" />
              <span className="text-sm font-medium">{tech.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-6">{t("skillsSummary")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-3">{t("frontendTitle")}</h3>
            <p className="text-muted-foreground">{t("frontendDesc")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-3">{t("backendTitle")}</h3>
            <p className="text-muted-foreground">{t("backendDesc")}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
