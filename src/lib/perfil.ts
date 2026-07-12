import 'server-only'
import { cvProfile } from "@/lib/cv-profile"

export type Locale = "pt" | "en" | "es"

export type Idioma = { idioma: string; nivel: string }

export type PerfilTranslation = {
 headline?: string;
 localidade?: string;
 resumoProfissional?: string;
 diferenciais?: string[];
 idiomas?: Idioma[];
 disponibilidade?: string;
 preferenciaContato?: string;
};

export type Perfil = {
 nomeCompleto: string;
 headline: string;
 email: string;
 telefone: string;
 localidade: string;
 github: string;
 githubUrl: string;
 linkedin: string;
 linkedinUrl: string;
 portfolio: string;
 portfolioUrl: string;
 resumoProfissional: string;
 diferenciais: string[];
 idiomas: Idioma[];
 disponibilidade: string;
 preferenciaContato: string;
 i18n?: {
  en?: PerfilTranslation;
  es?: PerfilTranslation;
 };
};

function localizePerfil(perfil: Perfil, locale: Locale): Perfil {
 if (locale === "pt" || !perfil.i18n?.[locale]) return perfil;
 const overlay = perfil.i18n[locale]!;
 return {
  ...perfil,
  headline: overlay.headline ?? perfil.headline,
  localidade: overlay.localidade ?? perfil.localidade,
  resumoProfissional: overlay.resumoProfissional ?? perfil.resumoProfissional,
  diferenciais: overlay.diferenciais ?? perfil.diferenciais,
  idiomas: overlay.idiomas ?? perfil.idiomas,
  disponibilidade: overlay.disponibilidade ?? perfil.disponibilidade,
  preferenciaContato: overlay.preferenciaContato ?? perfil.preferenciaContato,
 };
}

// Fallback usado enquanto a API (json-api-portfolio) ainda não expõe /perfil.
// Deriva o mínimo de `cv-profile.ts` para o CV renderizar sem quebrar.
const fallbackPerfil: Perfil = {
 nomeCompleto: cvProfile.nome,
 headline: "Desenvolvedor Full-Stack",
 email: cvProfile.email,
 telefone: cvProfile.whatsapp,
 localidade: cvProfile.localidade,
 github: cvProfile.github,
 githubUrl: cvProfile.githubUrl,
 linkedin: "",
 linkedinUrl: "",
 portfolio: cvProfile.portfolioUrl.replace(/^https?:\/\//, ""),
 portfolioUrl: cvProfile.portfolioUrl,
 resumoProfissional: "",
 diferenciais: [],
 idiomas: [],
 disponibilidade: "",
 preferenciaContato: "",
};

export async function getPerfil(locale: Locale = "pt"): Promise<Perfil> {
 const apiUrl = process.env.PERFIL_API_URL;
 if (!apiUrl) return fallbackPerfil;

 try {
  const response = await fetch(apiUrl, { next: { revalidate: 3600 } });
  if (!response.ok) {
   console.error("Falha ao buscar o perfil da API; usando fallback.");
   return fallbackPerfil;
  }
  const data: Perfil = await response.json();
  return localizePerfil(data, locale);
 } catch (error) {
  console.error("Erro ao buscar o perfil da API; usando fallback:", error);
  return fallbackPerfil;
 }
}
