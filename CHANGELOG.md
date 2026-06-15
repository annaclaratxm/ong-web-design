# Changelog

Todas as mudanças relevantes deste projeto são documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/)
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2026-06-15

Refatoração substancial da versão `original`. Preserva todas as funcionalidades
visíveis ao usuário, mas reorganiza completamente a arquitetura em camadas,
adiciona testes e habilita ferramentas de qualidade.

### Added

- **Arquitetura em camadas**: `contexts/`, `hooks/`, `services/`, `types/` e
  `utils/`, separando apresentação, estado, regras de negócio e contratos.
- **App Router** com rotas reais agrupadas em `(auth)` e `(dashboard)`, layout
  compartilhado `AppShell` e proteção de acesso via `AuthGuard`.
- **Contexto de autenticação** (`AuthContext` / `useAuth`) sobre `authService`,
  centralizando login, logout e persistência de sessão.
- **Validação com Zod** (`utils/validators.ts`, `loginSchema`) com mensagens de
  erro na tela de login.
- **Serviços** `authService`, `studentService`, `activityService` e
  `settingsService` encapsulando os dados de exemplo.
- **Funções puras** `getIniciais`, `montarCalendario` e `validarCredenciais`.
- **Componentes por feature**: `auth/` (LoginForm, PasswordInput, AuthGuard),
  `dashboard/` (MetricCard, ActivityList, StudentProgress, StudentCard,
  ActivityCard, CalendarMonth), `settings/` e `shared/` (Header, Sidebar,
  PageHeader, UserAvatar, ProgressBar).
- **Hook** `useLocalStorage`, usado para persistir o tema nas configurações.
- **Testes** com Vitest + Testing Library (59 testes; ~85% de cobertura) em
  `__tests__/`, com scripts `test`, `test:watch` e `test:coverage`.
- **Qualidade**: ESLint (`eslint-config-next`), Prettier e Husky + lint-staged
  (formatação e lint automáticos no pré-commit).

### Changed

- `app/page.tsx` deixou de ser um "God Object" de 613 linhas e passou a apenas
  redirecionar para `/dashboard`; a UI foi distribuída por feature.
- Navegação por estado (`useState("telaAtiva")` / `onNavigateBack`) substituída
  por rotas do App Router.
- Dados inline (alunos, atividades, KPIs, perfil, notificações) movidos para a
  camada de serviços.
- Números mágicos do calendário convertidos em constantes/parâmetros nomeados.
- `next.config.mjs` deixou de suprimir erros de ESLint e TypeScript no build.
- `package.json` renomeado para `ong-pequeno-milagre` (era `my-v0-project`).

### Removed

- Dependências sem uso: `svelte`, `@sveltejs/kit`, `vue`, `vue-router`,
  `@remix-run/react` e `@vercel/analytics`.
- Arquivo morto `styles/globals.css` (o tema real é `app/globals.css`).
- Rota órfã `app/login/page.tsx` original, que duplicava o formulário de login.
- Declarações `console.log("[v0] ...")` de depuração.

### Fixed

- Autenticação que aceitava qualquer entrada (`if (email && password)`) agora
  valida formato de e-mail e tamanho mínimo de senha.
- Leitura de `localStorage` protegida contra execução no servidor (SSR).
- Acessibilidade: `aria-label` em botões de ícone, `role="alert"` para erros e
  `role="progressbar"` com `aria-valuenow` nas barras de progresso.

## [0.1.0] - Versão original

- Versão inicial gerada com v0/shadcn (branch `original`), antes da refatoração.
