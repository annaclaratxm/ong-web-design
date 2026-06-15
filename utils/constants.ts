import { BookOpen, Calendar, Home, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export const SENHA_TAMANHO_MINIMO = 8

export const AUTH_STORAGE_KEY = "userLoggedIn"

export const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"] as const

export const CALENDARIO_PADRAO = {
  diasNoMes: 31,
  offsetPrimeiroDia: 6,
  diaAtual: 15,
  diasComAtividade: [3, 7, 12, 15, 18, 22, 28],
  totalCelulas: 35,
} as const

export interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

export const MENU_PRINCIPAL: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/calendario", label: "Calendário", icon: Calendar },
  { href: "/alunos", label: "Alunos", icon: Users },
  { href: "/atividades", label: "Atividades", icon: BookOpen },
]

export const CARGOS_DISPONIVEIS = [
  "Coordenadora Pedagógica",
  "Professora",
  "Terapeuta",
  "Psicóloga",
  "Administradora",
] as const
