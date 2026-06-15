# Centro Educacional Pequeno Milagre — Sistema de Gestão

Aplicação web de gestão para uma ONG/centro educacional voltado a crianças com
TEA (Transtorno do Espectro Autista). O sistema oferece autenticação, um painel
administrativo (dashboard), calendário de atividades, acompanhamento de alunos,
catálogo de atividades educacionais e uma área de configurações.

Este repositório é o resultado de um trabalho de **refatoração**. Ele contém
dois branches:

- **`original`** — versão antiga do projeto (scaffold gerado com v0/shadcn,
  antes da refatoração);
- **`main`** — versão refatorada, modularizada, testada e com linter.

---

## 1. Descrição do software e principais funcionalidades

| Funcionalidade | Descrição |
| --- | --- |
| **Login** | Tela de autenticação com validação de e-mail e senha, opção "lembrar-me" e mensagens de erro. |
| **Dashboard** | KPIs do centro (alunos ativos, atividades do dia, progresso médio, reuniões), lista de próximas atividades e progresso recente dos alunos. |
| **Calendário** | Grade mensal com destaque do dia atual e dos dias com atividade, além da agenda do dia. |
| **Alunos** | Cartões de acompanhamento individual com barra de progresso e tags. |
| **Atividades** | Catálogo de atividades educacionais oferecidas pelo centro. |
| **Configurações** | Perfil, segurança (troca de senha e sessões), preferências de notificação e aparência. |

### Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** + componentes **shadcn/ui** (Radix UI)
- **Vitest** + **Testing Library** para testes
- **ESLint** (`eslint-config-next`) para linting

> A autenticação é simulada (mock) e os dados são fixos/de exemplo — o foco do
> trabalho é a qualidade do código, não a integração com um backend real.

---

## 2. Análise dos principais problemas detectados (code smells)

A versão `original` concentrava praticamente toda a aplicação em três arquivos
(`app/page.tsx` com **613 linhas**, `app/configuracoes/page.tsx` com 439 e
`app/login/page.tsx` com 138). Os principais problemas:

1. **God Component** — `app/page.tsx` acumulava autenticação, tela de login,
   "roteamento" e a renderização das quatro telas internas em um único
   componente de 613 linhas.
2. **Código duplicado** — o formulário de login existia tanto embutido em
   `page.tsx` quanto em `app/login/page.tsx` (rota órfã, nunca navegada). Além
   disso, lógica de iniciais do avatar (`nome.split(" ").map(n => n[0]).join("")`),
   barras de progresso, cabeçalhos de página, sidebar e o botão de mostrar/ocultar
   senha (4×) estavam copiados em vários lugares.
3. **Navegação por estado** — em vez de usar o App Router, a troca de telas era
   feita com `useState("telaAtiva")` e a página de configurações era renderizada
   como componente-filho recebendo `onNavigateBack`.
4. **Autenticação falsa/insegura** — `if (email && password)` aceitava qualquer
   entrada, sem validação de formato; havia `console.log("[v0] ...")` de
   depuração espalhados pelo código.
5. **Números mágicos** — a montagem do calendário usava valores fixos sem nome
   (`i - 6 + 1`, `dia === 15`, `[3, 7, 12, 15, 18, 22, 28]`, `length: 35`).
6. **Dados embutidos** — listas de alunos, atividades e KPIs eram declaradas
   dentro do JSX, misturando dados e apresentação.
7. **Dependências-lixo** — o `package.json` trazia `svelte`, `@sveltejs/kit`,
   `vue`, `vue-router` e `@remix-run/react` em um projeto **Next.js**, sem uso.
8. **Arquivos mortos** — `styles/globals.css` (tema cinza padrão) não era
   importado em lugar nenhum; o tema real é `app/globals.css`.
9. **Erros suprimidos no build** — `next.config.mjs` usava
   `eslint.ignoreDuringBuilds` e `typescript.ignoreBuildErrors`, mascarando
   problemas reais.

---

## 3. Estratégias de refatoração utilizadas

- **Extração de componentes** — o God Component foi quebrado em ~38 módulos
  focados: `PageHeader`, `SidebarNav`, `AppHeader`, `AppShell`, `StatCard`,
  `StudentCard`, `StudentProgressRow`, `ActivityCard`, `ActivityListItem`,
  `CalendarMonth`, `UserAvatar`, `ProgressBar`, `PasswordInput`, `LoginForm` e
  as quatro seções de configurações.
- **Separação de dados e apresentação** — todos os dados de exemplo foram
  movidos para `lib/data/` (alunos, atividades, navegação, configurações) com
  tipos centralizados em `lib/domain/types.ts`.
- **Funções puras testáveis** — regras de negócio isoladas em
  `lib/domain/initials.ts`, `lib/domain/calendar.ts` (números mágicos viraram
  parâmetros nomeados) e `lib/auth/validation.ts`.
- **Migração para o App Router** — a navegação por estado foi substituída por
  rotas reais (`/login`, `/dashboard`, `/calendario`, `/alunos`, `/atividades`,
  `/configuracoes`), com um grupo de rotas `(app)` compartilhando o layout
  autenticado.
- **Contexto de autenticação** — `AuthProvider` + `useAuth` centralizam login,
  logout, persistência (`localStorage`) e validação. Um `AuthGuard` protege as
  rotas internas. Os `console.log` de depuração foram removidos.
- **Organização de dependências** — removidas as dependências sem uso (Svelte,
  Vue, Remix) e arquivos mortos (`styles/globals.css`); o build voltou a
  validar lint e tipos.
- **Eliminação de duplicação** — DRY aplicado em iniciais, barra de progresso,
  cabeçalhos, sidebar e campo de senha.

### Estrutura após a refatoração

```
app/
  layout.tsx                 # AuthProvider + fontes
  page.tsx                   # redireciona para /dashboard
  login/page.tsx
  (app)/                     # grupo de rotas autenticadas
    layout.tsx               # AppShell (header + sidebar + AuthGuard)
    dashboard/ calendario/ alunos/ atividades/
  configuracoes/page.tsx
components/
  auth/      common/      domain/      layout/      settings/
  ui/                        # componentes shadcn (biblioteca)
lib/
  auth/      data/      domain/      utils.ts
```

---

## 4. Testes e cobertura

Suíte com **Vitest + Testing Library**, totalizando **51 testes** em 14
arquivos. São testadas as funções puras (iniciais, calendário, validação), o
contexto de autenticação e os principais componentes (login, sidebar, cards,
progress bar, seções de configuração etc.).

Cobertura sobre o código de aplicação (excluindo a biblioteca `components/ui`,
dados estáticos e os próprios arquivos de teste):

| Métrica | Cobertura |
| --- | --- |
| Statements | **82,6%** |
| Branches | 92,4% |
| Functions | 75,6% |
| Lines | **82,6%** |

> A meta do trabalho era ~50%; a suíte cobre confortavelmente acima disso a
> lógica de negócio e os componentes reutilizáveis.

Comandos:

```bash
pnpm test            # roda a suíte uma vez
pnpm test:watch      # modo interativo
pnpm test:coverage   # relatório de cobertura (texto + HTML em coverage/)
```

---

## 5. Instalação e execução

### Pré-requisitos

- Node.js 20+
- pnpm 9+ (`npm install -g pnpm`)

### Passos

```bash
# 1. Instalar dependências
pnpm install

# 2. Ambiente de desenvolvimento (http://localhost:3000)
pnpm dev

# 3. Build de produção
pnpm build
pnpm start

# 4. Qualidade
pnpm lint            # ESLint
pnpm test:coverage   # testes + cobertura
```

Como a autenticação é simulada, basta informar um **e-mail válido** e uma
**senha com pelo menos 8 caracteres** na tela de login para acessar o sistema.

---

## 6. Branches

| Branch | Conteúdo |
| --- | --- |
| `original` | Versão antiga, antes da refatoração. |
| `main` | Versão refatorada (este README descreve esta versão). |

Para comparar as duas versões:

```bash
git diff original main -- app components lib
```
