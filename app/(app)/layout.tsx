import type { ReactNode } from "react"
import { AppShell } from "@/components/layout/app-shell"

/** Layout das telas internas autenticadas (dashboard, calendário, alunos,
 * atividades). Aplica o AppShell — header + sidebar + proteção de rota. */
export default function AppLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>
}
