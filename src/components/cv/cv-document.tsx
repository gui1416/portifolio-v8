import { Document, Page, View, Text, Link, StyleSheet } from "@react-pdf/renderer"
import type { Perfil } from "@/lib/perfil"
import type { Competencia } from "@/lib/competencias"
import type { Experiencia } from "@/lib/experiences"
import type { Education } from "@/lib/education"

export type Locale = "pt" | "en" | "es"

// Projeto simplificado — só o que o CV renderiza (a rota mapeia de `Project`).
export type CvProject = {
  title: string
  shortDescription: string
  technologies: string[]
  timeline: string
  liveUrl?: string
  githubUrl?: string
}

export type CvDocumentProps = {
  locale: Locale
  perfil: Perfil
  competencias: Competencia[]
  experiencias: Experiencia[]
  formacao: Education[]
  certificacoes: Education[]
  projetos: CvProject[]
  compact?: boolean
}

const LABELS: Record<Locale, Record<string, string>> = {
  pt: {
    summary: "Resumo Profissional",
    strengths: "Diferenciais Competitivos",
    skills: "Competências Técnicas",
    experience: "Experiência Profissional",
    education: "Formação Acadêmica",
    certifications: "Certificações",
    projects: "Projetos em Destaque",
    langsAvail: "Idiomas & Disponibilidade",
    colCourse: "Curso",
    colInstitution: "Instituição",
    colPeriod: "Período",
    colCertification: "Certificação",
    colDate: "Data",
    code: "Código",
    demo: "Demo",
    languages: "Idiomas",
    availability: "Disponibilidade",
    contactPref: "Preferência de contato",
  },
  en: {
    summary: "Professional Summary",
    strengths: "Key Strengths",
    skills: "Technical Skills",
    experience: "Professional Experience",
    education: "Education",
    certifications: "Certifications",
    projects: "Featured Projects",
    langsAvail: "Languages & Availability",
    colCourse: "Course",
    colInstitution: "Institution",
    colPeriod: "Period",
    colCertification: "Certification",
    colDate: "Date",
    code: "Code",
    demo: "Demo",
    languages: "Languages",
    availability: "Availability",
    contactPref: "Preferred contact",
  },
  es: {
    summary: "Resumen Profesional",
    strengths: "Diferenciales",
    skills: "Competencias Técnicas",
    experience: "Experiencia Profesional",
    education: "Formación Académica",
    certifications: "Certificaciones",
    projects: "Proyectos Destacados",
    langsAvail: "Idiomas y Disponibilidad",
    colCourse: "Curso",
    colInstitution: "Institución",
    colPeriod: "Período",
    colCertification: "Certificación",
    colDate: "Fecha",
    code: "Código",
    demo: "Demo",
    languages: "Idiomas",
    availability: "Disponibilidad",
    contactPref: "Preferencia de contacto",
  },
}

const COLORS = {
  banner: "#0f172a",
  primary: "#2563eb",
  text: "#1f2937",
  muted: "#6b7280",
  line: "#e5e7eb",
  boxBg: "#f8fafc",
  zebra: "#f1f5f9",
  white: "#ffffff",
  bannerMuted: "#cbd5e1",
}

const styles = StyleSheet.create({
  page: {
    paddingVertical: 22,
    paddingHorizontal: 32,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: COLORS.text,
    lineHeight: 1.35,
  },
  // Header banner
  banner: {
    backgroundColor: COLORS.banner,
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: "center",
  },
  name: { fontSize: 19, fontFamily: "Helvetica-Bold", color: COLORS.white, letterSpacing: 1 },
  headline: { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#60a5fa", marginTop: 7 },
  contactRow: { marginTop: 6, fontSize: 8, color: COLORS.bannerMuted, textAlign: "center" },
  bannerLink: { color: COLORS.bannerMuted, textDecoration: "none" },
  // Sections
  section: { marginTop: 12 },
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    color: COLORS.text,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingBottom: 2,
    marginBottom: 6,
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.primary,
  },
  paragraph: { color: COLORS.text, textAlign: "justify" },
  // Bullets
  bullet: { flexDirection: "row", marginTop: 1.5 },
  bulletDot: { width: 9, color: COLORS.primary },
  bulletText: { flex: 1, color: COLORS.text },
  // Competências grid
  skillsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  skillBox: {
    width: "49%",
    backgroundColor: COLORS.boxBg,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 4,
    padding: 7,
    marginBottom: 6,
  },
  skillCat: { fontSize: 9.5, fontFamily: "Helvetica-Bold", color: COLORS.text, marginBottom: 2 },
  skillItems: { fontSize: 8.5, color: COLORS.muted },
  // Experience
  entry: { marginBottom: 7 },
  entryHeader: { flexDirection: "row", justifyContent: "space-between" },
  entryTitle: { fontSize: 9.5, fontFamily: "Helvetica-Bold", color: COLORS.text },
  entryMeta: { fontSize: 8.5, color: COLORS.primary, fontFamily: "Helvetica-Bold" },
  entrySub: { fontSize: 8.5, color: COLORS.muted, fontStyle: "italic", marginTop: 0.5 },
  entryDesc: { fontStyle: "italic", marginTop: 1.5, color: COLORS.text },
  tech: { fontSize: 8, color: COLORS.muted, marginTop: 2 },
  // Tables
  table: { borderWidth: 1, borderColor: COLORS.line, borderRadius: 4, overflow: "hidden" },
  tableHead: { flexDirection: "row", backgroundColor: COLORS.banner },
  tableHeadCell: { color: COLORS.white, fontFamily: "Helvetica-Bold", fontSize: 8.5, padding: 5 },
  tableRow: { flexDirection: "row", borderTopWidth: 1, borderTopColor: COLORS.line },
  tableCell: { fontSize: 8.5, padding: 5, color: COLORS.text },
  // Projects
  projLinks: { flexDirection: "row", marginTop: 1.5, fontSize: 8.5 },
  link: { color: COLORS.primary, textDecoration: "underline" },
  // Languages & availability
  kvRow: { marginTop: 2 },
  kvLabel: { fontFamily: "Helvetica-Bold", color: COLORS.text },
})

function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionTitle}>{children}</Text>
}

function Bullets({ items }: { items: string[] }) {
  return (
    <>
      {items.map((it, i) => (
        <View key={i} style={styles.bullet}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{it}</Text>
        </View>
      ))}
    </>
  )
}

export function CvDocument({
  locale,
  perfil,
  competencias,
  experiencias,
  formacao,
  certificacoes,
  projetos,
  compact = false,
}: CvDocumentProps) {
  const t = LABELS[locale]
  const maxBullets = compact ? 2 : 4
  // No compacto (alvo: 1 página) mostramos só as experiências mais recentes e
  // ocultamos a tabela de certificações.
  const expList = compact ? experiencias.slice(0, 3) : experiencias
  const showCerts = !compact && certificacoes.length > 0

  return (
    <Document
      title={`${perfil.nomeCompleto} - CV`}
      author={perfil.nomeCompleto}
      subject={perfil.headline}
      creator="portfolio"
    >
      <Page size="A4" style={styles.page}>
        {/* Header banner */}
        <View style={styles.banner}>
          <Text style={styles.name}>{perfil.nomeCompleto.toUpperCase()}</Text>
          <Text style={styles.headline}>{perfil.headline}</Text>
          <Text style={styles.contactRow}>
            {perfil.email}  •  {perfil.telefone}  •  {perfil.localidade}
          </Text>
          <Text style={styles.contactRow}>
            <Link src={perfil.githubUrl} style={styles.bannerLink}>{perfil.github}</Link>
            {"  •  "}
            <Link src={perfil.linkedinUrl} style={styles.bannerLink}>{perfil.linkedin}</Link>
            {"  •  "}
            <Link src={perfil.portfolioUrl} style={styles.bannerLink}>{perfil.portfolio}</Link>
          </Text>
        </View>

        {/* Resumo Profissional */}
        <View style={styles.section}>
          <SectionTitle>{t.summary}</SectionTitle>
          <Text style={styles.paragraph}>{perfil.resumoProfissional}</Text>
        </View>

        {/* Diferenciais Competitivos (só no completo) */}
        {!compact && perfil.diferenciais.length > 0 && (
          <View style={styles.section}>
            <SectionTitle>{t.strengths}</SectionTitle>
            <Bullets items={perfil.diferenciais} />
          </View>
        )}

        {/* Competências Técnicas */}
        {competencias.length > 0 && (
          <View style={styles.section}>
            <SectionTitle>{t.skills}</SectionTitle>
            <View style={styles.skillsGrid}>
              {competencias.map((c, i) => (
                <View key={i} style={styles.skillBox}>
                  <Text style={styles.skillCat}>{c.categoria}</Text>
                  <Text style={styles.skillItems}>{c.itens.join(" • ")}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Experiência Profissional */}
        {experiencias.length > 0 && (
          <View style={styles.section}>
            <SectionTitle>{t.experience}</SectionTitle>
            {expList.map((exp) => {
              const titulo = exp.modalidade ? `${exp.cargo} — ${exp.modalidade}` : exp.cargo
              const subParts = [exp.empresa, exp.local, exp.regime].filter(Boolean)
              const techs = exp.tecnologias.filter(Boolean) as string[]
              return (
                <View key={exp.id} style={styles.entry} wrap={false}>
                  <View style={styles.entryHeader}>
                    <Text style={styles.entryTitle}>{titulo}</Text>
                    <Text style={styles.entryMeta}>{exp.periodo}</Text>
                  </View>
                  <Text style={styles.entrySub}>{subParts.join(" • ")}</Text>
                  {exp.descricao ? <Text style={styles.entryDesc}>{exp.descricao}</Text> : null}
                  <Bullets items={exp.responsabilidades.slice(0, maxBullets)} />
                  {techs.length > 0 && <Text style={styles.tech}>{techs.join(" | ")}</Text>}
                </View>
              )
            })}
          </View>
        )}

        {/* Formação Acadêmica (tabela) */}
        {formacao.length > 0 && (
          <View style={styles.section}>
            <SectionTitle>{t.education}</SectionTitle>
            <View style={styles.table}>
              <View style={styles.tableHead}>
                <Text style={[styles.tableHeadCell, { flex: 3 }]}>{t.colCourse}</Text>
                <Text style={[styles.tableHeadCell, { flex: 2 }]}>{t.colInstitution}</Text>
                <Text style={[styles.tableHeadCell, { flex: 2 }]}>{t.colPeriod}</Text>
              </View>
              {formacao.map((f) => (
                <View key={f.id} style={styles.tableRow} wrap={false}>
                  <Text style={[styles.tableCell, { flex: 3, fontFamily: "Helvetica-Bold" }]}>{f.curso}</Text>
                  <Text style={[styles.tableCell, { flex: 2 }]}>{f.instituicao}</Text>
                  <Text style={[styles.tableCell, { flex: 2 }]}>{f.periodo ?? f.duracao}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Certificações (tabela) — ocultas no compacto */}
        {showCerts && (
          <View style={styles.section}>
            <SectionTitle>{t.certifications}</SectionTitle>
            <View style={styles.table}>
              <View style={styles.tableHead}>
                <Text style={[styles.tableHeadCell, { flex: 4 }]}>{t.colCertification}</Text>
                <Text style={[styles.tableHeadCell, { flex: 3 }]}>{t.colInstitution}</Text>
                <Text style={[styles.tableHeadCell, { flex: 1.4 }]}>{t.colDate}</Text>
              </View>
              {certificacoes.map((c, i) => (
                <View
                  key={c.id}
                  style={[styles.tableRow, i % 2 === 1 ? { backgroundColor: COLORS.zebra } : {}]}
                  wrap={false}
                >
                  <Text style={[styles.tableCell, { flex: 4, fontFamily: "Helvetica-Bold" }]}>{c.curso}</Text>
                  <Text style={[styles.tableCell, { flex: 3 }]}>{c.instituicao}</Text>
                  <Text style={[styles.tableCell, { flex: 1.4 }]}>{c.data ?? ""}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Projetos em Destaque */}
        {projetos.length > 0 && (
          <View style={styles.section}>
            <SectionTitle>{t.projects}</SectionTitle>
            {projetos.map((p, i) => (
              <View key={i} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{p.title}</Text>
                  <Text style={styles.entryMeta}>{p.timeline}</Text>
                </View>
                <Text style={styles.entryDesc}>{p.shortDescription}</Text>
                {p.technologies.length > 0 && (
                  <Text style={styles.tech}>{p.technologies.join(" • ")}</Text>
                )}
                {(p.githubUrl || p.liveUrl) && (
                  <Text style={styles.projLinks}>
                    {p.githubUrl && <Link src={p.githubUrl} style={styles.link}>{t.code}</Link>}
                    {p.githubUrl && p.liveUrl ? "   |   " : ""}
                    {p.liveUrl && <Link src={p.liveUrl} style={styles.link}>{t.demo}</Link>}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Idiomas & Disponibilidade (só no completo) */}
        {!compact && (
          <View style={styles.section}>
            <SectionTitle>{t.langsAvail}</SectionTitle>
            {perfil.idiomas.length > 0 && (
              <Text style={styles.kvRow}>
                <Text style={styles.kvLabel}>{t.languages}: </Text>
                {perfil.idiomas.map((l) => `${l.idioma} (${l.nivel})`).join(" • ")}
              </Text>
            )}
            <Text style={styles.kvRow}>
              <Text style={styles.kvLabel}>{t.availability}: </Text>
              {perfil.disponibilidade}
            </Text>
            <Text style={styles.kvRow}>
              <Text style={styles.kvLabel}>{t.contactPref}: </Text>
              {perfil.preferenciaContato}
            </Text>
          </View>
        )}
      </Page>
    </Document>
  )
}
