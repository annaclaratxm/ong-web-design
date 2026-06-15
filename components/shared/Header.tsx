"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, BookOpen, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"

export function Header() {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.replace("/login")
  }

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">Pequeno Milagre</h1>
            <p className="text-xs text-muted-foreground">Centro Educacional</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" aria-label="Notificações">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" asChild aria-label="Configurações">
            <Link href="/configuracoes">
              <Settings className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout} aria-label="Sair">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
