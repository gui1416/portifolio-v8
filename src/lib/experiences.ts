import 'server-only'

export type Locale = "pt" | "en" | "es"

export type ExperienciaTranslation = {
 cargo?: string;
 local?: string;
 descricao?: string;
 responsabilidades?: string[];
 modalidade?: string;
 regime?: string;
};

export type Experiencia = {
 id: number;
 cargo: string;
 empresa: string;
 periodo: string;
 local: string;
 descricao: string;
 responsabilidades: string[];
 tecnologias: (string | null)[];
 // Campos opcionais usados pelo CV (aditivos; ausentes em registros antigos).
 modalidade?: string;
 regime?: string;
 i18n?: {
  en?: ExperienciaTranslation;
  es?: ExperienciaTranslation;
 };
};

function localizeExperiencia(exp: Experiencia, locale: Locale): Experiencia {
 if (locale === "pt" || !exp.i18n?.[locale]) return exp;
 const overlay = exp.i18n[locale]!;
 return {
  ...exp,
  cargo: overlay.cargo ?? exp.cargo,
  local: overlay.local ?? exp.local,
  descricao: overlay.descricao ?? exp.descricao,
  responsabilidades: overlay.responsabilidades ?? exp.responsabilidades,
  modalidade: overlay.modalidade ?? exp.modalidade,
  regime: overlay.regime ?? exp.regime,
 };
}

export async function getExperiencias(locale: Locale = "pt"): Promise<Experiencia[]> {
 const apiUrl = process.env.EXPERIENCES_API_URL;

 if (!apiUrl) {
  throw new Error("A URL da API não está definida nas variáveis de ambiente.");
 }

 const response = await fetch(apiUrl, { cache: 'force-cache' });

 if (!response.ok) {
  throw new Error("Falha ao buscar as experiências da API.");
 }

 const data: Experiencia[] = await response.json();
 return data.map((exp) => localizeExperiencia(exp, locale));
}
