import 'server-only'

export type Experiencia = {
 id: number;
 cargo: string;
 empresa: string;
 periodo: string;
 local: string;
 descricao: string;
 responsabilidades: string[];
 tecnologias: (string | null)[];
};

export async function getExperiencias(): Promise<Experiencia[]> {
 const apiUrl = process.env.EXPERIENCES_API_URL;

 if (!apiUrl) {
  throw new Error("A URL da API não está definida nas variáveis de ambiente.");
 }

 const response = await fetch(apiUrl, { cache: 'force-cache' });

 if (!response.ok) {
  throw new Error("Falha ao buscar as experiências da API.");
 }

 return response.json();
}