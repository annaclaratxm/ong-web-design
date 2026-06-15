import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/shared/PageHeader"
import { CalendarMonth } from "@/components/dashboard/CalendarMonth"
import { ActivityList } from "@/components/dashboard/ActivityList"
import { activityService } from "@/services/activityService"

export default function CalendarioPage() {
  const proximas = activityService.getUpcoming()

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
          <CardContent>
            <ActivityList atividades={proximas} variante="agenda" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
