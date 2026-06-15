import { Calendar, Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/shared/PageHeader"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { ActivityList } from "@/components/dashboard/ActivityList"
import { StudentProgress } from "@/components/dashboard/StudentProgress"
import { activityService } from "@/services/activityService"
import { studentService } from "@/services/studentService"

export default function DashboardPage() {
  const resumo = activityService.getSummaryCards()
  const proximas = activityService.getUpcoming()
  const alunos = studentService.getRecent()

  return (
    <div className="space-y-6">
      <PageHeader
        titulo="Dashboard"
        descricao="Bem-vindo ao Centro Educacional Pequeno Milagre"
        acao={
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Nova Atividade
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {resumo.map((card) => (
          <MetricCard key={card.id} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Próximas Atividades
            </CardTitle>
            <CardDescription>Atividades programadas para hoje</CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityList atividades={proximas} />
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Progresso dos Alunos
            </CardTitle>
            <CardDescription>Acompanhamento recente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alunos.map((aluno) => (
              <StudentProgress key={aluno.id} aluno={aluno} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
