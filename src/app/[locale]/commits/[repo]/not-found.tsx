import { getTranslations } from "next-intl/server"
import { ArrowLeft, FolderGit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "@/i18n/navigation"

export default async function RepoNotFound() {
  const t = await getTranslations("notFound")
  return (
    <div className="container mx-auto max-w-4xl flex items-center justify-center py-20">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center text-center py-10">
          <FolderGit2 className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t("repoTitle")}</h1>
          <p className="text-muted-foreground mb-6">{t("repoDesc")}</p>
          <Button asChild>
            <Link href="/commits">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("backToUpdates")}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
