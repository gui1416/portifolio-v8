# Meu Portfólio

[![Imagem do Portfólio](/public/screenshot.png)](https://portifolio-v8.vercel.app/hero)

Portfólio pessoal de **Guilherme Rabelo Machado**, apresentando trajetória, habilidades, experiência e projetos. Multilíngue (🇧🇷 PT · 🇺🇸 EN · 🇪🇸 ES) e com **geração de currículo em PDF sob demanda** a partir dos mesmos dados que alimentam o site.

## Destaques

- **Conteúdo vindo de API** — projetos, experiências, educação, perfil e competências são buscados da [API do portfólio](https://json-api-portfolio.vercel.app) (não ficam hardcoded).
- **Internacionalização (next-intl)** — rotas `/`, `/en`, `/es`; textos da UI em `messages/*.json` e traduções de conteúdo via overlay `i18n` da API.
- **Currículo dinâmico (`/api/cv`)** — o botão **Baixar CV** gera o PDF na hora, no idioma atual, em duas versões (compacta e completa). Ver [Geração de CV](#geração-de-cv).
- **Formulário de contato** — com rate limit (Upstash Redis) e envio de e-mail (Resend).
- **Integração com GitHub** — calendário de contribuições e commits recentes.

## Tecnologias

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (primitivas Radix UI)
- **next-intl** — internacionalização (PT/EN/ES)
- **@react-pdf/renderer** — geração do currículo em PDF no servidor
- **Upstash Redis** (`@upstash/ratelimit`) + **Resend** — formulário de contato
- **lucide-react**, **recharts**, **embla-carousel**, **react-hook-form**, **zod**, **sonner**, **cmdk**, **next-themes**

## Estrutura de conteúdo

O conteúdo é buscado por módulos em `src/lib/`, cada um com sua fonte e cache:

| Módulo | Coleção da API | Consumido por |
| :--- | :--- | :--- |
| `projects.ts` | `/projetos` | páginas de projetos + CV |
| `experiences.ts` | `/experiencias` | página de experiência + CV |
| `education.ts` | `/educacao` | página de educação + CV |
| `perfil.ts` | `/perfil` | CV (cabeçalho, resumo, diferenciais, idiomas) |
| `competencias.ts` | `/competencias` | CV (competências técnicas) |

Cada módulo aplica o overlay de idioma (`pt` base, `en`/`es` sobrepostos).

## Geração de CV

- **Rota:** `GET /api/cv?lang=pt|en|es&format=full` (`src/app/api/cv/route.tsx`, runtime Node).
- **Layout:** `src/components/cv/cv-document.tsx` (componentes `@react-pdf/renderer`) — banner, resumo, diferenciais, competências, experiência, formação e certificações (tabelas), projetos e idiomas/disponibilidade.
- **Dois modos:** *compacta* (essencial, ~2 págs — oculta diferenciais/certificações/idiomas) e *completa* (~3 págs, tudo). O dropdown fica em `src/components/cv-download-button.tsx`.
- **Fonte da verdade:** atualizou o `db.json` da API → o CV reflete automaticamente. Onde cada informação aparece é definido em `cv-document.tsx`; o que entra em cada modo, em `route.tsx`.

## Rodando localmente

```bash
npm install
npm run dev        # http://localhost:3000
```

### Variáveis de ambiente (`.env`)

```bash
# Fontes de dados (produção: json-api-portfolio.vercel.app; local: http://localhost:3001)
PROJECTS_API_URL=https://json-api-portfolio.vercel.app/projetos
EXPERIENCES_API_URL=https://json-api-portfolio.vercel.app/experiencias
NEXT_PUBLIC_EDUCATION_API_URL=https://json-api-portfolio.vercel.app/educacao
PERFIL_API_URL=https://json-api-portfolio.vercel.app/perfil
COMPETENCIAS_API_URL=https://json-api-portfolio.vercel.app/competencias

# Formulário de contato
RESEND_API_KEY=...
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

Para desenvolver contra a **API local** (`json-api-portfolio` rodando em `:3001`), troque as cinco `*_API_URL` para `http://localhost:3001/<coleção>`.

## Seções do site

- **Sobre Mim** · **Educação** · **Habilidades** · **Experiência** · **Projetos** · **Atualizações** (GitHub) · **Contato**

## Scripts

```bash
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção
npm run start    # serve o build
npm run lint     # ESLint
```

> Nota: `next.config.ts` usa `eslint.ignoreDuringBuilds` e `typescript.ignoreBuildErrors`, então o `build` passa mesmo com erros de lint/tipo. Rode `npm run lint` e `tsc --noEmit` explicitamente ao validar.

---

Dúvidas ou feedback? Fique à vontade para entrar em contato pelo site.
