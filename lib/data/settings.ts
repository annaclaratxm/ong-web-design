/** Dados e metadados das telas de configuração. */

export interface PerfilData {
  nome: string
  email: string
  telefone: string
  cargo: string
  bio: string
}

export const perfilPadrao: PerfilData = {
  nome: "Maria Silva",
  email: "maria.silva@pequenoMilagre.org.br",
  telefone: "(11) 99999-9999",
  cargo: "Coordenadora Pedagógica",
  bio: "Especialista em educação inclusiva com foco em TEA",
}

export const cargosDisponiveis = [
  "Coordenadora Pedagógica",
  "Professora",
  "Terapeuta",
  "Psicóloga",
  "Administradora",
] as const

export type ChaveNotificacao =
  | "emailAtividades"
  | "emailRelatorios"
  | "pushNotifications"
  | "lembreteReuniao"
  | "alertaProgresso"

export type NotificacoesState = Record<ChaveNotificacao, boolean>

export const notificacoesPadrao: NotificacoesState = {
  emailAtividades: true,
  emailRelatorios: true,
  pushNotifications: true,
  lembreteReuniao: true,
  alertaProgresso: false,
}

export interface OpcaoNotificacao {
  chave: ChaveNotificacao
  titulo: string
  descricao: string
  grupo: "email" | "push"
}

export const opcoesNotificacao: OpcaoNotificacao[] = [
  { chave: "emailAtividades", titulo: "Novas Atividades", descricao: "Quando uma nova atividade for criada", grupo: "email" },
  { chave: "emailRelatorios", titulo: "Relatórios Semanais", descricao: "Resumo semanal do progresso dos alunos", grupo: "email" },
  { chave: "pushNotifications", titulo: "Notificações Push", descricao: "Ativar notificações no navegador", grupo: "push" },
  { chave: "lembreteReuniao", titulo: "Lembrete de Reuniões", descricao: "15 minutos antes das reuniões", grupo: "push" },
  { chave: "alertaProgresso", titulo: "Alertas de Progresso", descricao: "Quando um aluno atingir uma meta", grupo: "push" },
]
