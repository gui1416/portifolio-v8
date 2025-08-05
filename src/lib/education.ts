// src/lib/education.ts

export type Education = {
 id: number;
 instituicao: string;
 curso: string;
 duracao: string;
 local: string;
 descricao: string;
 certificacoes: string[];
 link: string;
};

export async function getEducation(): Promise<Education[]> {
 const apiUrl = process.env.NEXT_PUBLIC_EDUCATION_API_URL;

 if (!apiUrl) {
  throw new Error(
   "A variável de ambiente NEXT_PUBLIC_EDUCATION_API_URL não está definida."
  );
 }

 try {
  const response = await fetch(apiUrl);

  if (!response.ok) {
   console.error("Falha ao buscar os dados de educação da API.");
   return [];
  }

  return response.json();
 } catch (error) {
  console.error("Erro de conexão ao buscar dados de educação:", error);
  return [];
 }
}