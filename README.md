# Sistema de Gestão Educacional — Centro Educacional Pequeno Milagre

Aplicação web de gestão para um centro educacional voltado ao atendimento de
crianças com TEA (Transtorno do Espectro Autista). Oferece autenticação, painel
(dashboard), calendário de atividades, acompanhamento de alunos, catálogo de
atividades educacionais e configurações de usuário.

Disciplina: **Clean Code** — Integrantes: Anna Clara de Medeiros, Arturo Burigo
e Luiz Bezerra.

Este repositório contém dois branches:

- **`original`** — versão antiga do projeto, antes da refatoração;
- **`main`** — versão refatorada (descrita neste README).

---

## 1. Funcionalidades

| Módulo | Descrição |
| --- | --- |
| **Login** | Autenticação com validação (Zod) de e-mail e senha, opção "lembrar-me", mostrar/ocultar senha e mensagens de erro. |
| **Dashboard** | Métricas (alunos ativos, atividades do dia, progresso médio, reuniões), próximas atividades e progresso recente dos alunos. |
| **Calendário** | Grade mensal com destaque do dia atual e dias com atividade, e agenda do dia. |
| **Alunos** | Cartões de acompanhamento individual com barra de progresso e badges. |
| **Atividades** | Catálogo de atividades educacionais por tipo. |
| **Configurações** | Perfil, segurança, notificações e aparência (tema persistido em localStorage). |

### Stack

Next.js 15 (App Router) · React 19 · TypeScript 5 · TailwindCSS 4 · shadcn/ui
(Radix) · Zod (validação) · Vitest + Testing Library (testes) · ESLint +
Prettier + Husky/lint-staged (qualidade).

> Autenticação simulada e dados de exemplo — o foco é a qualidade do código.

---

## 2. Principais problemas detectados (code smells)

A versão `original` concentrava a aplicação em três arquivos (`app/page.tsx` com
**613 linhas**, `app/configuracoes/page.tsx` com 439 e `app/login/page.tsx` com
138).

1. **Long Method / God Object** — `app/page.tsx` acumulava autenticação, tela de
   login, navegação e a renderização das quatro telas internas.
2. **Código duplicado** — login embutido em `page.tsx` e também em
   `app/login/page.tsx` (rota órfã); iniciais do avatar, barras de progresso,
   cabeçalhos, sidebar e botão de senha repetidos.
3. **Primitive Obsession** — dados modelados como arrays literais inline, sem
   tipos nem encapsulamento.
4. **Navegação por estado** — `useState("telaAtiva")` em vez do App Router.
5. **Autenticação falsa** — `if (email && password)` aceitava qualquer entrada;
   `console.log` de depuração no código.
6. **Números mágicos** — calendário com `i - 6 + 1`, `dia === 15`,
   `[3,7,12,15,18,22,28]`, `length: 35`.
7. **Dependências sem uso** — `svelte`, `vue`, `@remix-run/react` em um projeto
   Next.js; e `styles/globals.css` morto.
8. **Erros suprimidos** — `next.config.mjs` ignorava ESLint e TypeScript no
   build.

---

## 3. Estratégia de refatoração

- **Separação de camadas** — apresentação (`components/`, `app/`), estado
  (`contexts/`, `hooks/`), regras/dados (`services/`, `utils/`) e contratos
  (`types/`).
- **Componentização** — o God Object virou ~20 componentes por feature
  (`auth/`, `dashboard/`, `settings/`, `shared/`).
- **App Router** — rotas reais agrupadas em `(auth)` e `(dashboard)`, com
  `AppShell` + `AuthGuard` protegendo o acesso.
- **Validação com Zod** — `loginSchema` em `utils/validators.ts`.
- **Eliminação de números mágicos e duplicação** — `utils/calendar.ts`,
  `utils/formatters.ts`, `utils/constants.ts` e componentes reutilizáveis.
- **Organização de dependências** — removidas as não utilizadas; build voltou a
  validar lint e tipos.

### Estrutura de diretórios

```
app/
  (auth)/login/            (dashboard)/{dashboard,calendario,alunos,atividades}/
  configuracoes/           layout.tsx   page.tsx
components/
  auth/        dashboard/        settings/        shared/        ui/
contexts/      AuthContext.tsx
hooks/         useAuth.ts   useLocalStorage.ts
services/      authService.ts  studentService.ts  activityService.ts  settingsService.ts
types/         auth.ts  student.ts  activity.ts  settings.ts
utils/         constants.ts  validators.ts  formatters.ts  calendar.ts
__tests__/     components/  contexts/  hooks/  services/  utils/
```

---

## 4. Testes e cobertura

**Vitest + Testing Library** — **59 testes** em 12 arquivos, cobrindo funções
puras (formatters, calendar, validators), serviços, contexto de autenticação e
componentes.

Cobertura (exclui `components/ui`, hooks de boilerplate do shadcn e arquivos de
tipo):

| Métrica | Cobertura |
| --- | --- |
| Statements | **85,3%** |
| Branches | 89,7% |
| Functions | 81,1% |
| Lines | **85,3%** |

```bash
pnpm test            # roda a suíte
pnpm test:coverage   # com relatório de cobertura (coverage/)
```

---

## 5. Instalação e execução

Pré-requisitos: Node.js 20+ e pnpm 9+ (`npm install -g pnpm`).

```bash
pnpm install         # dependências
pnpm dev             # desenvolvimento — http://localhost:3000
pnpm build && pnpm start   # produção

pnpm lint            # ESLint
pnpm format          # Prettier
pnpm test:coverage   # testes + cobertura
```

No login, informe um **e-mail válido** e uma **senha com 8+ caracteres**.

---

## 6. Branches

| Branch | Conteúdo |
| --- | --- |
| `original` | Versão antiga, antes da refatoração. |
| `main` | Versão refatorada. |

```bash
git diff original main
```
