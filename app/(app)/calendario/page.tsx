import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/layout/page-header"
import { CalendarMonth } from "@/components/domain/calendar-month"
import { ActivityListItem } from "@/components/domain/activity-list-item"
import { proximasAtividades } from "@/lib/data/activities"

export default function CalendarioPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        titulo="Calendário"
        descricao="Gerencie atividades e compromissos"
        acao={
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Agendar Atividade
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle>Dezembro 2024</CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarMonth />
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Hoje - 15/12</CardTitle>
            <CardDescription>8 atividades programadas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {proximasAtividades.map((atividade) => (
              <ActivityListItem key={atividade.id} atividade={atividade} variante="agenda" />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
