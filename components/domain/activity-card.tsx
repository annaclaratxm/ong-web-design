import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { AtividadeEducacional } from "@/lib/domain/types"

/** Cartão de atividade educacional (catálogo). */
export function ActivityCard({ atividade }: { atividade: AtividadeEducacional }) {
  return (
    <Card className="bg-card border-border hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{atividade.titulo}</CardTitle>
          <Badge className={atividade.cor}>{atividade.alunos} alunos</Badge>
        </div>
        <CardDescription>{atividade.descricao}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Próxima sessão</span>
          <span className="text-sm font-medium">Amanhã, 10:00</span>
        </div>
      </CardContent>
    </Card>
  )
}
