export interface ProfileData {
  nome: string
  email: string
  telefone: string
  cargo: string
  bio: string
}

export type NotificationKey =
  | "emailAtividades"
  | "emailRelatorios"
  | "pushNotifications"
  | "lembreteReuniao"
  | "alertaProgresso"

export type NotificationsState = Record<NotificationKey, boolean>

export interface NotificationOption {
  chave: NotificationKey
  titulo: string
  descricao: string
  grupo: "email" | "push"
}
