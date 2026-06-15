"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Bell, BookOpen, Palette, Save, Shield, User } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AuthGuard } from "@/components/auth/AuthGuard"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { ProfileSection } from "@/components/settings/ProfileSection"
import { SecuritySection } from "@/components/settings/SecuritySection"
import { NotificationsSection } from "@/components/settings/NotificationsSection"
import { AppearanceSection } from "@/components/settings/AppearanceSection"
import { settingsService } from "@/services/settingsService"
import type { NotificationKey, ProfileData } from "@/types/settings"

type AbaConfiguracao = "perfil" | "seguranca" | "notificacoes" | "aparencia"

const abas: { id: AbaConfiguracao; label: string; icon: LucideIcon }[] = [
  { id: "perfil", label: "Perfil", icon: User },
  { id: "seguranca", label: "Segurança", icon: Shield },
  { id: "notificacoes", label: "Notificações", icon: Bell },
  { id: "aparencia", label: "Aparência", icon: Palette },
]

export default function ConfiguracoesPage() {
  const router = useRouter()
  const [abaAtiva, setAbaAtiva] = useState<AbaConfiguracao>("perfil")
  const [perfil, setPerfil] = useState<ProfileData>(settingsService.getDefaultProfile())
  const [notificacoes, setNotificacoes] = useState(settingsService.getDefaultNotifications())
  const [tema, setTema] = useLocalStorage("tema", "claro")

  const atualizarPerfil = (campo: keyof ProfileData, valor: string) =>
    setPerfil((atual) => ({ ...atual, [campo]: valor }))

  const alternarNotificacao = (chave: NotificationKey, valor: boolean) =>
    setNotificacoes((atual) => ({ ...atual, [chave]: valor }))

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")} aria-label="Voltar">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-foreground">Configurações</h1>
                <p className="text-xs text-muted-foreground">Gerencie suas preferências</p>
              </div>
            </div>

            <Button className="bg-primary hover:bg-primary/90">
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </header>

        <div className="flex">
          <aside className="w-64 bg-sidebar border-r border-sidebar-border min-h-[calc(100vh-73px)]">
            <nav className="p-4 space-y-2">
              {abas.map(({ id, label, icon: Icon }) => {
                const ativo = abaAtiva === id
                return (
                  <Button
                    key={id}
                    variant={ativo ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3",
                      ativo
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )}
                    onClick={() => setAbaAtiva(id)}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Button>
                )
              })}
            </nav>
          </aside>

          <main className="flex-1 p-6 max-w-4xl">
            {abaAtiva === "perfil" && <ProfileSection perfil={perfil} onChange={atualizarPerfil} />}
            {abaAtiva === "seguranca" && <SecuritySection />}
            {abaAtiva === "notificacoes" && (
              <NotificationsSection notificacoes={notificacoes} onToggle={alternarNotificacao} />
            )}
            {abaAtiva === "aparencia" && <AppearanceSection tema={tema} onTemaChange={setTema} />}
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
