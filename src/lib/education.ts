// src/lib/education.ts

export type Locale = "pt" | "en" | "es"

export type EducationTranslation = {
 curso?: string;
 local?: string;
 descricao?: string;
 certificacoes?: string[];
};

export type Education = {
 id: number;
 instituicao: string;
 curso: string;
 duracao: string;
 local: string;
 descricao: string;
 certificacoes: string[];
 link: string;
 i18n?: {
  en?: EducationTranslation;
  es?: EducationTranslation;
 };
};

function localizeEducation(item: Education, locale: Locale): Education {
 if (locale === "pt" || !item.i18n?.[locale]) return item;
 const overlay = item.i18n[locale]!;
 return {
  ...item,
  curso: overlay.curso ?? item.curso,
  local: overlay.local ?? item.local,
  descricao: overlay.descricao ?? item.descricao,
  certificacoes: overlay.certificacoes ?? item.certificacoes,
 };
}

export async function getEducation(locale: Locale = "pt"): Promise<Education[]> {
 const apiUrl = process.env.NEXT_PUBLIC_EDUCATION_API_URL;

 if (!apiUrl) {
  throw new Error(
   "A variável de ambiente NEXT_PUBLIC_EDUCATION_API_URL não está definida."
  );
 }

 try {
  // Buscado no servidor (Server Component). Cache de 1h, como projetos/experiências.
  const response = await fetch(apiUrl, { next: { revalidate: 3600 } });

  if (!response.ok) {
   console.error("Falha ao buscar os dados de educação da API.");
   return [];
  }

  const data: Education[] = await response.json();
  return data.map((item) => localizeEducation(item, locale));
 } catch (error) {
  console.error("Erro de conexão ao buscar dados de educação:", error);
  return [];
 }
}
