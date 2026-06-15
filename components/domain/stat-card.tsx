import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ResumoCard } from "@/lib/domain/types"

/** Cartão de KPI usado na grade de resumo do dashboard. */
export function StatCard({ titulo, valor, detalhe, cor }: ResumoCard) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{titulo}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", cor)}>{valor}</div>
        <p className="text-xs text-muted-foreground">{detalhe}</p>
      </CardContent>
    </Card>
  )
}
