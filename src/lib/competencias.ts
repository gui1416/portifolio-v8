import 'server-only'

export type Locale = "pt" | "en" | "es"

export type Competencia = {
 categoria: string;
 itens: string[];
 i18n?: {
  en?: { categoria?: string };
  es?: { categoria?: string };
 };
};

function localizeCompetencia(item: Competencia, locale: Locale): Competencia {
 if (locale === "pt" || !item.i18n?.[locale]) return item;
 const overlay = item.i18n[locale]!;
 return { ...item, categoria: overlay.categoria ?? item.categoria };
}

export async function getCompetencias(locale: Locale = "pt"): Promise<Competencia[]> {
 const apiUrl = process.env.COMPETENCIAS_API_URL;
 if (!apiUrl) return [];

 try {
  const response = await fetch(apiUrl, { next: { revalidate: 3600 } });
  if (!response.ok) {
   console.error("Falha ao buscar as competências da API.");
   return [];
  }
  const data: Competencia[] = await response.json();
  return data.map((item) => localizeCompetencia(item, locale));
 } catch (error) {
  console.error("Erro ao buscar as competências da API:", error);
  return [];
 }
}
