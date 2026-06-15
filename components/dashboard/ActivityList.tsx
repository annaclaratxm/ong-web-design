import { Badge } from "@/components/ui/badge"
import type { ScheduledActivity } from "@/types/activity"

interface ActivityListItemProps {
  atividade: ScheduledActivity
  variante?: "linha" | "agenda"
}

export function ActivityListItem({ atividade, variante = "linha" }: ActivityListItemProps) {
  if (variante === "agenda") {
    return (
      <div className="p-3 rounded-lg bg-muted/50 border-l-4 border-primary">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-primary">{atividade.horario}</span>
          <Badge variant="outline" className="text-xs">
            {atividade.tipo}
          </Badge>
        </div>
        <p className="text-sm text-foreground">{atividade.titulo}</p>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div>
          <p className="font-medium text-sm">{atividade.titulo}</p>
          <p className="text-xs text-muted-foreground">{atividade.horario}</p>
        </div>
      </div>
      <Badge variant="secondary" className="text-xs">
        {atividade.tipo}
      </Badge>
    </div>
  )
}

export function ActivityList({
  atividades,
  variante,
}: {
  atividades: ScheduledActivity[]
  variante?: "linha" | "agenda"
}) {
  return (
    <div className="space-y-3">
      {atividades.map((atividade) => (
        <ActivityListItem key={atividade.id} atividade={atividade} variante={variante} />
      ))}
    </div>
  )
}
