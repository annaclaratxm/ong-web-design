import { BookOpen, Calendar, Home, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface ItemNavegacao {
  href: string
  label: string
  icon: LucideIcon
}

/**
 * Itens do menu lateral principal.
 *
 * Na versão original a navegação era feita por `useState("telaAtiva")`. Agora
 * cada item aponta para uma rota real do App Router do Next.js.
 */
export const menuPrincipal: ItemNavegacao[] = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/calendario", label: "Calendário", icon: Calendar },
  { href: "/alunos", label: "Alunos", icon: Users },
  { href: "/atividades", label: "Atividades", icon: BookOpen },
]
