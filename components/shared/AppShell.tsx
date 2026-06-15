"use client"

import type { ReactNode } from "react"
import { AuthGuard } from "@/components/auth/AuthGuard"
import { Header } from "@/components/shared/Header"
import { Sidebar } from "@/components/shared/Sidebar"
import { MENU_PRINCIPAL } from "@/utils/constants"

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <Sidebar itens={MENU_PRINCIPAL} />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  )
}
