# Plano: Portfólio multi-idioma (PT/EN/ES) + projeto API Hub

## Contexto que embasa o plano

O portfólio (`portifolio-v8`) é **Next.js 15 / App Router / React 18 / Tailwind v3 + shadcn**. Há duas camadas de texto:

1. **UI fixa** (menu, botões, títulos) — hardcoded em PT nas páginas e componentes (`sidebar.tsx`, `hero`, `projects`, `education`, `skills`, `experience`, `contact`, `commits`).
2. **Conteúdo** (projetos, experiências, educação) — buscado da **API externa** `json-api-portfolio` (json-server na Vercel), hoje **só em PT**.

Decisões tomadas:
- Rotas com **prefixo `/en`, `/es` via next-intl**.
- **Traduzir também o conteúdo**, adicionando campos por idioma na API.
- **API Hub entra como card de projeto** (repo `github.com/gui1416/api-hub`).

Como a escolha foi prefixo de URL, **toda a pasta `src/app/` precisa migrar para `src/app/[locale]/`** — é a mudança estrutural central.

---

## Parte A — Internacionalização da UI (next-intl)

**A1. Instalar e configurar**
- `npm i next-intl` no `portifolio-v8`.
- `src/i18n/routing.ts`: `locales = ['pt','en','es']`, `defaultLocale = 'pt'`, `localePrefix: 'as-needed'` (PT mantém URLs atuais sem prefixo; EN/ES ganham `/en`, `/es` — preserva links existentes e SEO).
- `src/middleware.ts`: middleware do next-intl para detecção/redirecionamento de locale (hoje o portfólio **não tem** middleware, então não há conflito).
- `src/i18n/request.ts`: carrega o catálogo de mensagens por request.

**A2. Reestruturar as rotas**
- Mover tudo de `src/app/*` para `src/app/[locale]/*` (hero, education, skills, experience, projects, projects/[slug], commits, commits/[repo], contact, page.tsx, layout.tsx).
- `src/app/api/contact/route.ts` **fica fora** do `[locale]` (rota de API não é traduzida).
- `layout.tsx` passa a receber `params.locale`, define `<html lang={locale}>` (hoje fixo em `pt-BR`) e envolve tudo em `NextIntlClientProvider`.

**A3. Catálogos de mensagens**
- Criar `messages/pt.json`, `messages/en.json`, `messages/es.json` com todas as strings extraídas: nav do sidebar, "Desenvolvedor Web", textos do Hero (bio, "Baixar CV", "Tecnologias", "Resumo de Habilidades", cards Frontend/Backend), Projetos ("Todos/Web/Mobile", "Interessado em mais projetos?", "Código", "Demo"), Educação, Skills, Experiência, Contato, e rótulos das páginas de Commits.

**A4. Trocar strings hardcoded**
- Server Components → `getTranslations()`; Client Components (ex.: `sidebar.tsx`) → `useTranslations()`.
- Trocar `next/link` pelo `Link` de `next-intl/navigation` (ou os helpers de navegação) para os links internos manterem o locale.

**A5. Seletor de idioma**
- Novo componente `language-switcher.tsx` no sidebar (um `Select` shadcn com 🇧🇷/🇺🇸/🇪🇸) que troca o prefixo de locale no pathname atual.

**A6. SEO**
- `generateMetadata` por locale (title/description traduzidos) + `alternates.languages` (hreflang) para pt/en/es.

---

## Parte B — Tradução do conteúdo (API `json-api-portfolio`)

O conteúdo vem do `db.json`. Convenção proposta (limpa e retrocompatível): manter os campos PT atuais como base/fallback e adicionar um bloco `i18n` por registro **só com os campos traduzíveis**:

```jsonc
{
  "id": 1, "slug": "...", "timeline": "2025",
  "technologies": ["Next.js"],            // não traduz
  "title": "...", "shortDescription": "...", // PT (base/fallback)
  "i18n": {
    "en": { "title": "...", "shortDescription": "...", "description": [...], "features": [...], "category": "...", "role": "..." },
    "es": { "title": "...", "shortDescription": "...", "description": [...], "features": [...], "category": "...", "role": "..." }
  }
}
```

- Traduzir só o que é texto humano: `title`, `category`, `shortDescription`, `description[]`, `features[]`, `role` (projetos); `cargo`/`empresa*`/`descricao`/`responsabilidades` (experiências); `curso`/`instituicao*`/`descricao`/`certificacoes` (educação). Datas, URLs, imagens e nomes de tecnologia ficam compartilhados. (*nomes próprios de empresa/instituição normalmente não se traduzem.)
- **Ajustar os fetchers** `src/lib/projects.ts`, `experiences.ts`, `education.ts` para receber `locale` e sobrepor `i18n[locale]` sobre o registro base (fallback para PT quando faltar tradução). As páginas passam o locale atual.
- Preencher as traduções EN/ES de todos os registros existentes no `db.json` e **fazer redeploy da API** na Vercel (repo separado).

> Observação: a `Tabs` de categoria em `projects/page.tsx` filtra pela string literal `"Web Application"`/`"Mobile App"` — o filtro deve usar a **categoria base (PT/canônica)**, não a traduzida, senão quebra ao mudar de idioma. Será tratado no ajuste.

---

## Parte C — Adicionar o projeto API Hub

Novo registro no `db.json` (com traduções EN/ES no mesmo padrão da Parte B), a partir do repo real:

- **slug**: `api-hub` · **category**: `Web Application` · **timeline**: automático (ver Parte D — derivado do repo) · **role**: Full-stack
- **shortDescription**: transforma specs OpenAPI/Swagger em documentação interativa com "try it" e assistente de IA; multiusuário com RBAC.
- **features**: carregar specs por URL, executor de requisições via proxy (sem CORS), code samples, chat de IA com contexto da spec, RBAC macro/micro por grupo, command palette (Cmd+K), telas administrativas estilo Active Directory, auditoria estrita, tema claro/escuro.
- **technologies**: Next.js 16, React 19, TypeScript, Tailwind CSS v4, Drizzle ORM, PostgreSQL, Vercel AI SDK, JWT (jose), bcrypt, Docker.
- **githubUrl**: `https://github.com/gui1416/api-hub`

**Duas dependências pendentes:**
1. **`coverImage`/`thumbnailImage`**: o API Hub precisa de uma imagem. Há uma pasta `.playwright-mcp` no projeto — dá para capturar um screenshot da home rodando localmente, ou indicar uma imagem em `public/`.
2. **`liveUrl`**: o API Hub exige Postgres + seed de admin. Se não houver deploy público, o card fica sem "Demo" (já lida com ausência de `liveUrl`).

---

## Parte D — `timeline` automático a partir do GitHub

Hoje o `timeline` de cada projeto é escrito à mão no `db.json` (ex.: `"2025"`). O objetivo é que essa informação venha **automática**, derivada do repositório: **data de criação do repo** ou **primeiro commit**.

**Estratégia**
- Derivar do `githubUrl` já presente em cada projeto. O portfólio já consome a API pública do GitHub sem autenticação (ver `/commits` e `src/lib/github-contributions.ts`), então o padrão já existe.
- **Fonte primária (recomendada): data de criação do repositório** — `GET https://api.github.com/repos/{owner}/{repo}` → campo `created_at`. É **1 requisição por repo** e reflete bem o início do projeto.
- **Fonte alternativa: primeiro commit** — listar commits e seguir o header `Link` até a última página (`GET /repos/{owner}/{repo}/commits?per_page=1` → `Link: ...&page=N` → buscar `page=N`) para pegar `commit.author.date` do commit mais antigo. Mais fiel quando o repo foi criado bem depois do início do trabalho, porém custa 2 requisições e é mais frágil. Usar apenas como fallback opcional.

**Implementação**
- Novo módulo `src/lib/repo-timeline.ts`: `getRepoTimeline(githubUrl, locale)` que:
  1. faz parse de `owner/repo` a partir da URL;
  2. busca `created_at` (fonte primária) com `next: { revalidate: 86400 }` (cache diário — data raramente muda);
  3. formata conforme o locale (ex.: só o ano `2025`, ou `mês/ano` via `Intl.DateTimeFormat(locale)`);
  4. faz fallback para o `timeline` manual do `db.json` se o repo for privado, sem `githubUrl`, ou a chamada falhar.
- Em `src/lib/projects.ts`, após montar cada projeto, resolver o `timeline` por esse módulo (em paralelo com `Promise.all`). O `timeline` do `db.json` deixa de ser obrigatório e vira só fallback.
- Beneficia diretamente a **Parte C**: o API Hub **não precisa de `timeline` manual** — sai de `created_at` do repo `gui1416/api-hub`.

**Cuidados**
- **Rate limit não autenticado do GitHub** (60 req/h por IP). Com poucos projetos e `revalidate` diário é seguro; se a lista crescer, considerar um token (`GITHUB_TOKEN`) via env para subir o limite. Registrar como ponto de atenção.
- Formato de exibição: definir se o card mostra só o ano ou `mês/ano`. Padrão sugerido: **ano** (mantém o visual atual dos badges de `timeline`).

---

## Ordem de execução e validação
1. Parte A (estrutura i18n + UI) → testar `/`, `/en`, `/es`.
2. Parte B (fetchers com locale + traduções no db.json) → redeploy da API.
3. Parte C (registro do API Hub + imagem).
4. Parte D (`timeline` automático via GitHub, com fallback para o `db.json`).
5. `npm run lint` e `npx tsc --noEmit` no portfólio (o build ignora erros de lint/TS, então valida-se explicitamente).

## Pontos decididos por padrão (ajustáveis)
- `localePrefix: 'as-needed'` (PT sem prefixo). Alternativa: `'always'` para consistência total (`/pt/...` sempre).
- Nomes próprios de empresa/instituição **não** traduzidos.
