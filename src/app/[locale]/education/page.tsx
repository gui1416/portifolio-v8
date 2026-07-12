import { setRequestLocale } from "next-intl/server";
import { getEducation, type Locale } from "@/lib/education";
import { EducationView } from "@/components/education/education-view";

export const revalidate = 3600;

export default async function EducationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Busca no servidor — evita o fetch client-side para a API externa (que falhava
  // com "Failed to fetch" por rede/CORS no navegador).
  const items = await getEducation(locale as Locale);

  return <EducationView items={items} />;
}
