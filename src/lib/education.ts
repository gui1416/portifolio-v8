import 'server-only'

export type Education = {
 id: number;
 instituicao: string;
 curso: string;
 duração: string;
 local: string;
 descricao: string;
 certificacoes: string[];
 link: string;
};

export async function getEducation(): Promise<Education[]> {
 const apiUrl = process.env.EDUCATION_API_URL;

 if (!apiUrl) {
  throw new Error("A URL da API de educação não está definida.");
 }

 const response = await fetch(apiUrl, { cache: 'force-cache' });

 if (!response.ok) {
  throw new Error("Falha ao buscar os dados de educação da API.");
 }

 return response.json();
}