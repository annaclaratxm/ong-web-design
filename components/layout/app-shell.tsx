"use client"

import type { ReactNode } from "react"
import { AuthGuard } from "@/components/auth/auth-guard"
import { AppHeader } from "@/components/layout/app-header"
import { SidebarNav } from "@/components/layout/sidebar-nav"
import { menuPrincipal } from "@/lib/data/navigation"

/**
 * Estrutura visual compartilhada pelas telas internas (header + sidebar +
 * conteúdo), com proteção de autenticação. Antes, esse layout estava
 * reescrito em cada página.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <AppHeader />
        <div className="flex">
          <SidebarNav itens={menuPrincipal} />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  )
}
