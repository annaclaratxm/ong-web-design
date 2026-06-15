import type { NotificationOption, NotificationsState, ProfileData } from "@/types/settings"

const perfilPadrao: ProfileData = {
  nome: "Maria Silva",
  email: "maria.silva@pequenoMilagre.org.br",
  telefone: "(11) 99999-9999",
  cargo: "Coordenadora Pedagógica",
  bio: "Especialista em educação inclusiva com foco em TEA",
}

const notificacoesPadrao: NotificationsState = {
  emailAtividades: true,
  emailRelatorios: true,
  pushNotifications: true,
  lembreteReuniao: true,
  alertaProgresso: false,
}

const opcoesNotificacao: NotificationOption[] = [
  {
    chave: "emailAtividades",
    titulo: "Novas Atividades",
    descricao: "Quando uma nova atividade for criada",
    grupo: "email",
  },
  {
    chave: "emailRelatorios",
    titulo: "Relatórios Semanais",
    descricao: "Resumo semanal do progresso dos alunos",
    grupo: "email",
  },
  {
    chave: "pushNotifications",
    titulo: "Notificações Push",
    descricao: "Ativar notificações no navegador",
    grupo: "push",
  },
  {
    chave: "lembreteReuniao",
    titulo: "Lembrete de Reuniões",
    descricao: "15 minutos antes das reuniões",
    grupo: "push",
  },
  {
    chave: "alertaProgresso",
    titulo: "Alertas de Progresso",
    descricao: "Quando um aluno atingir uma meta",
    grupo: "push",
  },
]

export const settingsService = {
  getDefaultProfile(): ProfileData {
    return perfilPadrao
  },
  getDefaultNotifications(): NotificationsState {
    return notificacoesPadrao
  },
  getNotificationOptions(): NotificationOption[] {
    return opcoesNotificacao
  },
}
