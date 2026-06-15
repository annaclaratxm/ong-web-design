import { Calendar, Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/layout/page-header"
import { StatCard } from "@/components/domain/stat-card"
import { ActivityListItem } from "@/components/domain/activity-list-item"
import { StudentProgressRow } from "@/components/domain/student-progress-row"
import { proximasAtividades, resumoCards } from "@/lib/data/activities"
import { alunosRecentes } from "@/lib/data/students"

export default function DashboardPage() {
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
        {resumoCards.map((card) => (
          <StatCard key={card.id} {...card} />
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
          <CardContent className="space-y-3">
            {proximasAtividades.map((atividade) => (
              <ActivityListItem key={atividade.id} atividade={atividade} />
            ))}
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
            {alunosRecentes.map((aluno) => (
              <StudentProgressRow key={aluno.id} aluno={aluno} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
