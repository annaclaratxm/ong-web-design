# Changelog

Todas as mudanças relevantes deste projeto são documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/)
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2026-06-14

Refatoração substancial da versão `original`. Esta versão preserva todas as
funcionalidades visíveis ao usuário, mas reorganiza completamente a estrutura
interna do código, adiciona testes e habilita ferramentas de qualidade.

### Added

- Migração para o **Next.js App Router** com rotas reais: `/login`,
  `/dashboard`, `/calendario`, `/alunos`, `/atividades` e `/configuracoes`.
- Grupo de rotas `(app)` com layout compartilhado (`AppShell`) e proteção de
  acesso via `AuthGuard`.
- Contexto de autenticação (`AuthProvider` / `useAuth`) centralizando login,
  logout e persistência de sessão.
- Validação real de credenciais (formato de e-mail e senha mínima de 8
  caracteres) com mensagens de erro na tela de login.
- Camada de dados em `lib/data/` (alunos, atividades, navegação, configurações)
  e tipos de domínio em `lib/domain/types.ts`.
- Funções puras reutilizáveis: `getIniciais`, `montarCalendario` e
  `validarCredenciais`.
- Componentes reutilizáveis: `PageHeader`, `SidebarNav`, `AppHeader`,
  `AppShell`, `StatCard`, `StudentCard`, `StudentProgressRow`, `ActivityCard`,
  `ActivityListItem`, `CalendarMonth`, `UserAvatar`, `ProgressBar`,
  `PasswordInput`, `LoginForm` e as seções de configuração.
- Suíte de testes com **Vitest + Testing Library** (51 testes; ~82% de
  cobertura do código de aplicação) e scripts `test`, `test:watch` e
  `test:coverage`.
- Configuração de **ESLint** (`eslint-config-next`) e arquivo `.eslintrc.json`.

### Changed

- `app/page.tsx` deixou de ser um "God Component" de 613 linhas e passou a
  apenas redirecionar para `/dashboard`; a UI foi distribuída em ~38 módulos.
- Navegação por estado (`useState("telaAtiva")` / `onNavigateBack`) substituída
  por navegação por rotas do App Router.
- Dados de exemplo (alunos, atividades, KPIs, perfil, notificações) extraídos do
  JSX para a camada de dados.
- Números mágicos do calendário convertidos em parâmetros nomeados de
  `montarCalendario`.
- `next.config.mjs` deixou de suprimir erros de ESLint e TypeScript no build.
- `package.json` renomeado para `ong-pequeno-milagre` (era `my-v0-project`) e
  reorganizado.

### Removed

- Dependências sem uso: `svelte`, `@sveltejs/kit`, `vue`, `vue-router`,
  `@remix-run/react` e `@vercel/analytics`.
- Arquivo duplicado/morto `styles/globals.css` (o tema real é
  `app/globals.css`).
- Página/rota órfã `app/login/page.tsx` original, que duplicava o formulário de
  login embutido em `app/page.tsx`.
- Declarações `console.log("[v0] ...")` de depuração.

### Fixed

- Autenticação que aceitava qualquer entrada (`if (email && password)`) agora
  valida formato de e-mail e tamanho de senha.
- Leitura de `localStorage` protegida contra execução no servidor (SSR).
- Acessibilidade: `aria-label` em botões de ícone, `role="alert"` para erros e
  `role="progressbar"` com `aria-valuenow` nas barras de progresso.

## [0.1.0] - Versão original

- Versão inicial gerada com v0/shadcn (branch `original`), antes da refatoração.
