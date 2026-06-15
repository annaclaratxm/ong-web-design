import { Fragment } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { settingsService } from "@/services/settingsService"
import type { NotificationKey, NotificationsState, NotificationOption } from "@/types/settings"

interface NotificationsSectionProps {
  notificacoes: NotificationsState
  onToggle: (chave: NotificationKey, valor: boolean) => void
}

interface GrupoProps {
  titulo: string
  descricao: string
  opcoes: NotificationOption[]
  notificacoes: NotificationsState
  onToggle: (chave: NotificationKey, valor: boolean) => void
}

function GrupoNotificacao({ titulo, descricao, opcoes, notificacoes, onToggle }: GrupoProps) {
  return (
    <Card className="bg-muted/20 border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{titulo}</CardTitle>
        <CardDescription>{descricao}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {opcoes.map((opcao, indice) => (
          <Fragment key={opcao.chave}>
            {indice > 0 ? <Separator /> : null}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{opcao.titulo}</p>
                <p className="text-xs text-muted-foreground">{opcao.descricao}</p>
              </div>
              <Switch
                checked={notificacoes[opcao.chave]}
                onCheckedChange={(checked) => onToggle(opcao.chave, checked)}
              />
            </div>
          </Fragment>
        ))}
      </CardContent>
    </Card>
  )
}

export function NotificationsSection({ notificacoes, onToggle }: NotificationsSectionProps) {
  const opcoes = settingsService.getNotificationOptions()
  const email = opcoes.filter((o) => o.grupo === "email")
  const push = opcoes.filter((o) => o.grupo === "push")

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-2">Preferências de Notificação</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Configure como e quando você deseja receber notificações
        </p>
      </div>

      <GrupoNotificacao
        titulo="Notificações por Email"
        descricao="Receba atualizações importantes por email"
        opcoes={email}
        notificacoes={notificacoes}
        onToggle={onToggle}
      />
      <GrupoNotificacao
        titulo="Notificações Push"
        descricao="Receba notificações instantâneas no navegador"
        opcoes={push}
        notificacoes={notificacoes}
        onToggle={onToggle}
      />
    </div>
  )
}
