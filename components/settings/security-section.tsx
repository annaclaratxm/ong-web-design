import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/auth/password-input"

const sessoesAtivas = [
  { id: "atual", dispositivo: "Computador - Chrome", detalhe: "São Paulo, Brasil • Ativo agora", acao: "Atual" },
  { id: "tablet", dispositivo: "Tablet - Safari", detalhe: "São Paulo, Brasil • 2 horas atrás", acao: "Encerrar" },
]

export function SecuritySection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-2">Segurança da Conta</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Mantenha sua conta segura alterando sua senha regularmente
        </p>
      </div>

      <Card className="bg-muted/20 border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Alterar Senha</CardTitle>
          <CardDescription>Sua senha deve ter pelo menos 8 caracteres</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Senha Atual</Label>
            <PasswordInput id="current-password" placeholder="Digite sua senha atual" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Nova Senha</Label>
            <PasswordInput id="new-password" placeholder="Digite sua nova senha" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
            <PasswordInput id="confirm-password" placeholder="Confirme sua nova senha" />
          </div>
          <Button className="w-full md:w-auto">
            <Lock className="w-4 h-4 mr-2" />
            Alterar Senha
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-muted/20 border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Sessões Ativas</CardTitle>
          <CardDescription>Gerencie onde você está conectado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sessoesAtivas.map((sessao) => (
              <div
                key={sessao.id}
                className="flex items-center justify-between p-3 rounded-lg bg-background border"
              >
                <div>
                  <p className="font-medium text-sm">{sessao.dispositivo}</p>
                  <p className="text-xs text-muted-foreground">{sessao.detalhe}</p>
                </div>
                <Button variant="outline" size="sm">
                  {sessao.acao}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
