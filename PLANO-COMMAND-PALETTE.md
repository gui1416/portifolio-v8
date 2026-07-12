# Plano — Command Palette Global (⌘K) + Ordenação de Projetos por Commit

> Documento de planejamento. Nenhuma alteração de código foi feita ainda.
> Projeto: `portifolio-v8` (Next.js 15 / App Router / React 18 / next-intl / Tailwind + shadcn-ui).

## 1. Objetivo

Adicionar um **command palette global** (estilo ⌘K / Ctrl+K, padrão Raycast/Vercel), acessível de qualquer rota, com as funcionalidades:

1. **Navegação** entre as rotas (`/hero`, `/education`, `/skills`, `/experience`, `/projects`, `/commits`, `/contact`).
2. **Busca por projetos** (fuzzy) — ao selecionar, navega para `/projects/[slug]`.
3. **Troca de tema** (claro / escuro / sistema).
4. **Troca de idioma** (pt / en / es) via i18n, preservando a rota atual.
5. **Contato** — abre um **dialog** com o mesmo formulário da rota `/contact`.

E, separadamente:

6. **Ordenar os projetos** (na rota `/projects`) do **commit mais recente ao mais antigo** de cada repositório no GitHub.

---

## 2. Estado atual (o que já existe e será reaproveitado)

| Peça | Localização | Observação |
|------|-------------|------------|
| `cmdk` | `package.json` (v1.0.4) | Já instalado; falta o wrapper `command.tsx`. |
| `fuse.js` | usado em `education/page.tsx` | Reaproveitar para a busca fuzzy de projetos. |
| Dialog | `src/components/ui/dialog.tsx` | Base do `CommandDialog` e do dialog de contato. |
| Form de contato | `src/app/[locale]/contact/page.tsx` (inline) | **Extrair** para componente reutilizável. |
| API de contato | `src/app/api/contact/route.ts` | Rate-limit + Resend; reutilizada sem mudança. |
| Tema | `next-themes` via `ThemeProvider` (`layout.tsx`) | `useTheme().setTheme()`. |
| Idioma | `LanguageSwitcher` + `@/i18n/navigation` (`useRouter().replace`) | Mesma lógica de troca de locale. |
| Navegação i18n | `@/i18n/navigation` (`Link`, `useRouter`, `usePathname`) | Preserva prefixo de locale. |
| Rotas / nav items | hardcoded em `src/components/sidebar.tsx` | Fonte da lista de navegação — **centralizar** (ver §3.1). |
| GitHub API | `src/lib/github.ts` (`getAllRepos`, commits com `date`) e `src/lib/repo-timeline.ts` | Base para ordenar projetos por commit. |
| Projetos | `src/lib/projects.ts` (`getAllProjects`) | Ponto onde a ordenação será aplicada. |
| Ponto de montagem global | `src/app/[locale]/layout.tsx` | Tem `NextIntlClientProvider` + `ThemeProvider` (contextos necessários). |

---

## 3. Command Palette

### 3.1. Centralizar os itens de navegação

Hoje `navItems` está hardcoded dentro de `sidebar.tsx`. Extrair para um módulo compartilhado para que **sidebar e command palette** usem a mesma fonte de verdade.

- **Novo:** `src/config/nav.ts`
  ```ts
  export const NAV_ITEMS = [
    { href: "/hero", key: "hero", icon: User },
    { href: "/education", key: "education", icon: GraduationCap },
    // ... (mover a lista atual da sidebar para cá)
  ] as const
  ```
- **Editar:** `sidebar.tsx` passa a importar `NAV_ITEMS`.

### 3.2. Wrapper shadcn `command.tsx`

`cmdk` já está instalado, mas falta o componente shadcn. Gerar com a CLI (recomendado, mantém o padrão do `components.json`):

```bash
npx shadcn@latest add command
```

Isso cria `src/components/ui/command.tsx` com `Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandSeparator`, `CommandShortcut`.
(Alternativa: criar o arquivo manualmente com base no cmdk se preferir não rodar a CLI.)

### 3.3. Componente `CommandMenu` (client)

- **Novo:** `src/components/command-menu/command-menu.tsx` (`"use client"`).
- Estado `open` controlado; atalho global **⌘K / Ctrl+K** via `useEffect` + `keydown` (e um item na sidebar/header para abrir com clique/toque, já que mobile não tem teclado).
- Fecha com `Esc` (nativo do `CommandDialog`).
- Estrutura de grupos:
  - **Navegação** → `NAV_ITEMS.map(...)`; `onSelect` chama `router.push(item.href)` (router de `@/i18n/navigation`) e fecha.
  - **Projetos** → lista filtrada por `fuse.js`; `onSelect` → `router.push('/projects/'+slug)`.
  - **Tema** → itens "Claro / Escuro / Sistema" → `setTheme(...)`.
  - **Idioma** → itens pt/en/es → `router.replace(pathname, { locale })` (mesma lógica do `LanguageSwitcher`).
  - **Contato** → `onSelect` fecha o command e abre o `ContactDialog` (ver §4).
- **i18n:** todos os rótulos via `useTranslations("commandMenu")`.
- **Acessibilidade:** `CommandInput` com `aria-label`; foco inicial no input; `CommandEmpty` com texto traduzido.

### 3.4. Levar os projetos até o client (busca)

O command palette é client-side, mas os projetos são buscados no servidor. Para não expor a fetch pesada (o `getAllProjects` faz N chamadas ao GitHub via `withRepoTimeline`), criar um **índice leve**:

- **Novo (em `src/lib/projects.ts`):** `getProjectsIndex(locale)` que retorna só `{ slug, title, category }[]` **sem** `withRepoTimeline` (mais rápido, cacheável 1h).
- **Montagem:** em `[locale]/layout.tsx` (server), chamar `getProjectsIndex(locale)` e passar como prop para um wrapper client que renderiza `<CommandMenu projects={index} />`.
  - Assim o índice é serializado uma vez no HTML; sem endpoint extra.
  - Alternativa (se preferir carregar sob demanda): API route `GET /api/projects/index` chamada ao abrir o palette. **Recomendado:** passar via layout (mais simples, sem request client).

### 3.5. Montagem global

- **Editar:** `src/app/[locale]/layout.tsx` — renderizar `<CommandMenuMount projects={index} />` dentro dos providers (após `<Sidebar />`).
- Como o layout já está sob `NextIntlClientProvider` + `ThemeProvider`, o menu tem acesso a locale e tema.

---

## 4. Dialog de Contato (reuso do formulário)

O formulário hoje vive inline em `contact/page.tsx`. Para reutilizar no command palette **sem duplicar lógica**:

1. **Novo:** `src/components/contact/contact-form.tsx` — extrair `formData`, `handleChange`, `handleSubmit` e o JSX do `<form>` (mantém `fetch('/api/contact')`, toasts via `sonner`, i18n `useTranslations("contact")`). Aceita prop opcional `onSuccess?: () => void` (para fechar o dialog ao enviar).
2. **Editar:** `contact/page.tsx` — passar a usar `<ContactForm />` (comportamento idêntico).
3. **Novo:** `src/components/contact/contact-dialog.tsx` — `Dialog` + `DialogContent` embrulhando `<ContactForm onSuccess={close} />`. Controlado por estado (`open`/`onOpenChange`).
4. **Integração:** o `CommandMenu` controla a abertura do `ContactDialog` (item "Contato" fecha o command e seta `contactOpen = true`). Para evitar conflito de foco entre dois overlays Radix, abrir o dialog **após** o command fechar (ex.: no `onSelect`, fechar command e no callback abrir o dialog — ou pequeno `setTimeout`/`requestAnimationFrame`).

> Reaproveita 100% do fluxo existente (rate-limit por IP + Resend). Nenhuma mudança na API.

---

## 5. Ordenar projetos por commit mais recente → mais antigo

### 5.1. Estratégia (recomendada: `pushed_at` da lista de repos)

O GitHub expõe, no objeto de repositório, `pushed_at` = data do último push (proxy fiel de "commit mais recente"). Buscar **todos os repos do usuário em 1 request** (já feito por `fetchRepos` em `github.ts`, com cache 1h e `sort=updated`) e cruzar com cada projeto pelo `githubUrl`.

- **Editar `src/lib/github.ts`:** adicionar `pushed_at: string` à interface `GithubRepo` (o campo já vem na resposta da API, só não está tipado) e exportar um helper:
  ```ts
  export async function getRepoPushedDates(): Promise<Map<string, string>> {
    const repos = await getAllRepos() // já cacheado
    return new Map(repos.map(r => [r.html_url.toLowerCase(), r.pushed_at]))
  }
  ```
- **Editar `src/lib/projects.ts`:** em `getAllProjects`, após localizar/timeline, anexar `lastActivity` a cada projeto cruzando `githubUrl` com o `Map` acima e **ordenar desc**:
  ```ts
  const pushed = await getRepoPushedDates()
  return list
    .map(p => ({ ...p, lastActivity: pushed.get(p.githubUrl?.toLowerCase() ?? "") ?? null }))
    .sort((a, b) => new Date(b.lastActivity ?? 0).getTime() - new Date(a.lastActivity ?? 0).getTime())
  ```
  - Projetos sem repo/sem match caem para o fim (data 0).
- **Vantagem:** custo O(1) de requests (uma lista de repos já cacheada), sem N chamadas extras.

### 5.2. Alternativa (mais precisa, mais cara): data do último commit por repo

Se `pushed_at` não for suficiente (ex.: pushes que não são commits, ou repos de outro owner), buscar o último commit por repo via `.../commits?per_page=1` (padrão idêntico ao `repo-timeline.ts`), 1 request por projeto, cache 1h. Mais preciso, porém N requests e sujeito ao rate-limit não autenticado (60/h por IP).

**Recomendação:** começar com §5.1 (`pushed_at`). Só migrar para §5.2 se a ordenação divergir do esperado.

### 5.3. Aplicar a ordem na UI

- `src/app/[locale]/projects/page.tsx` já renderiza `getAllProjects` na ordem recebida. Como a ordenação passa a vir do `lib`, a página **não muda** (a lista e as abas "Web/Mobile" herdam a ordem). Verificar apenas que os filtros por categoria preservam a ordem (o `.filter` do array já preserva).

### 5.4. Rate limit / token

`repo-timeline.ts` e `github.ts` usam a API pública (60 req/h por IP). Documentar/opcional: definir `GITHUB_TOKEN` (já suportado em `repo-timeline.ts`) e passar o header também em `github.ts` para elevar o limite. Não bloqueante para §5.1 (poucos requests).

---

## 6. Internacionalização (i18n)

Adicionar um namespace **`commandMenu`** em `messages/pt.json`, `messages/en.json`, `messages/es.json`:

```jsonc
"commandMenu": {
  "placeholder": "Digite um comando ou pesquise...",
  "empty": "Nenhum resultado encontrado.",
  "groupNavigation": "Navegação",
  "groupProjects": "Projetos",
  "groupTheme": "Tema",
  "groupLanguage": "Idioma",
  "groupContact": "Contato",
  "themeLight": "Claro",
  "themeDark": "Escuro",
  "themeSystem": "Sistema",
  "openContact": "Entrar em contato",
  "openHint": "Pressione ⌘K",
  "triggerLabel": "Abrir paleta de comandos"
}
```

- Rótulos de navegação reutilizam o namespace `nav` existente.
- Idiomas reutilizam `languageSwitcher`.
- Contato reutiliza `contact` (form) — nenhum texto novo lá.

---

## 7. Lista de arquivos (novos / editados)

**Novos**
- `src/config/nav.ts` — itens de navegação compartilhados.
- `src/components/ui/command.tsx` — wrapper shadcn (via CLI).
- `src/components/command-menu/command-menu.tsx` — o palette (client).
- `src/components/command-menu/command-menu-mount.tsx` — wrapper client montado no layout (recebe `projects`).
- `src/components/contact/contact-form.tsx` — formulário extraído/reutilizável.
- `src/components/contact/contact-dialog.tsx` — dialog que embrulha o form.

**Editados**
- `src/components/sidebar.tsx` — usar `NAV_ITEMS` de `@/config/nav`; (opcional) botão que abre o palette no mobile.
- `src/app/[locale]/layout.tsx` — buscar índice de projetos + montar `<CommandMenuMount />`.
- `src/app/[locale]/contact/page.tsx` — usar `<ContactForm />`.
- `src/lib/projects.ts` — `getProjectsIndex()` + ordenação por `lastActivity`.
- `src/lib/github.ts` — `pushed_at` na interface + `getRepoPushedDates()`.
- `messages/pt.json`, `messages/en.json`, `messages/es.json` — namespace `commandMenu`.

---

## 8. Fases de implementação (ordem sugerida)

1. **Refactor base**: `config/nav.ts` + apontar a sidebar para ele (sem mudança visível). Extrair `ContactForm` e trocar em `contact/page.tsx` (verificar que a rota `/contact` continua idêntica).
2. **Command palette (esqueleto)**: `command.tsx` (CLI) + `CommandMenu` com **navegação** + atalho ⌘K, montado no layout. Testar navegação.
3. **Tema + idioma** no palette. Testar troca e persistência.
4. **Busca de projetos**: `getProjectsIndex` + passagem via layout + grupo Projetos com Fuse. Testar.
5. **Contato**: `ContactDialog` + integração com o palette (coordenar overlays). Testar envio (toast).
6. **Ordenação de projetos** (§5.1) em `projects.ts` + `github.ts`. Testar ordem em `/projects`.
7. **i18n**: preencher `commandMenu` nos 3 idiomas e revisar rótulos.

Cada fase é independentemente testável e não quebra as anteriores.

---

## 9. Checklist de verificação

- [ ] ⌘K / Ctrl+K abre e `Esc` fecha; foco vai para o input.
- [ ] Botão/entrada acessível para abrir no **mobile** (sem teclado).
- [ ] Navegação leva à rota certa **preservando o locale** atual.
- [ ] Busca de projetos filtra e navega para `/projects/[slug]`.
- [ ] Troca de tema reflete imediatamente e persiste (next-themes).
- [ ] Troca de idioma mantém a rota atual (ex.: em `/education` → `/en/education`).
- [ ] Item "Contato" abre o dialog; envio dispara o toast e respeita o rate-limit (1/60s).
- [ ] `/projects` lista do commit mais recente ao mais antigo; abas Web/Mobile mantêm a ordem.
- [ ] `npx tsc --noEmit` sem erros novos e `npm run lint` limpo (build ignora erros — validar manualmente, cf. CLAUDE.md).
- [ ] Teste no navegador (Playwright) em desktop e viewport mobile; **0 erros de console**.

---

## 10. Riscos e considerações

- **Dois overlays Radix (command + dialog de contato):** coordenar a abertura para não brigar por foco/scroll-lock — abrir o dialog só depois que o command fecha.
- **Peso no client:** passar apenas o índice enxuto de projetos (`slug/title/category`), não o objeto completo, para não inflar o HTML.
- **Rate limit do GitHub:** §5.1 usa poucos requests (lista de repos cacheada 1h). Se adotar §5.2, considerar `GITHUB_TOKEN`.
- **SSG das páginas de projeto:** `generateStaticParams` continua usando `getAllProjects`; garantir que a nova ordenação/campos não quebrem o build estático.
- **`pushed_at` vs "commit":** `pushed_at` cobre o caso comum; divergências raras → migrar para §5.2.
- **Fonte única de navegação:** após centralizar em `config/nav.ts`, qualquer rota nova aparece automaticamente na sidebar e no palette.
