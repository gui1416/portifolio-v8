import { NextResponse } from "next/server"
import { renderToBuffer } from "@react-pdf/renderer"
import { CvDocument, type CvProject, type Locale } from "@/components/cv/cv-document"
import { getPerfil } from "@/lib/perfil"
import { getCompetencias } from "@/lib/competencias"
import { getExperiencias, type Experiencia } from "@/lib/experiences"
import { getEducation, type Education } from "@/lib/education"
import { getAllProjects } from "@/lib/projects"

// @react-pdf/renderer usa APIs Node — precisa do runtime nodejs (não edge).
export const runtime = "nodejs"

const LOCALES: Locale[] = ["pt", "en", "es"]

// Modo compacto (1 página) limita os projetos; o completo mostra todos.
const COMPACT_MAX_PROJECTS = 3

// "3245 horas" -> 3245 ; "Online"/vazio -> 0
function parseHoras(duracao: string): number {
  const n = parseInt(duracao, 10)
  return Number.isFinite(n) ? n : 0
}

function toCvProjects(projetos: Awaited<ReturnType<typeof getAllProjects>>): CvProject[] {
  return projetos.map((p) => ({
    title: p.title,
    shortDescription: p.shortDescription,
    technologies: p.technologies,
    timeline: p.timeline,
    liveUrl: p.liveUrl,
    githubUrl: p.githubUrl,
  }))
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  const langParam = params.get("lang")
  const locale: Locale = LOCALES.includes(langParam as Locale)
    ? (langParam as Locale)
    : "pt"
  const full = params.get("format") === "full"

  try {
    const [perfil, competencias, experiencias, educacao, projetosRaw] = await Promise.all([
      getPerfil(locale),
      getCompetencias(locale),
      getExperiencias(locale).catch((): Experiencia[] => []),
      getEducation(locale),
      getAllProjects(locale),
    ])

    // Formação = grau; certificações = itens de destaque. Compatível com dados
    // antigos sem `tipo`: cai para o critério de carga horária (>= 40h = grau).
    const hasTipo = educacao.some((e) => e.tipo)
    const formacao: Education[] = hasTipo
      ? educacao.filter((e) => e.tipo === "graduacao")
      : educacao.filter((e) => parseHoras(e.duracao) >= 40)
    const certificacoes: Education[] = educacao.filter(
      (e) => e.tipo === "certificacao" && e.destaque
    )

    const projetos = full
      ? toCvProjects(projetosRaw)
      : toCvProjects(projetosRaw.slice(0, COMPACT_MAX_PROJECTS))

    const buffer = await renderToBuffer(
      CvDocument({
        locale,
        perfil,
        competencias,
        experiencias,
        formacao,
        certificacoes,
        projetos,
        compact: !full,
      })
    )

    const suffix = full ? "completo" : "compacto"
    const filename = `${perfil.nomeCompleto.replace(/\s+/g, "-")}-CV-${locale}-${suffix}.pdf`

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch (error) {
    console.error("Erro ao gerar o CV:", error)
    return NextResponse.json(
      { error: "Não foi possível gerar o CV no momento." },
      { status: 500 }
    )
  }
}
