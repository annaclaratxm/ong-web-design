import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"
import { StudentCard } from "@/components/domain/student-card"
import { todosOsAlunos } from "@/lib/data/students"

export default function AlunosPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        titulo="Acompanhamento dos Alunos"
        descricao="Monitore o progresso individual"
        acao={
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Novo Aluno
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {todosOsAlunos.map((aluno) => (
          <StudentCard key={aluno.id} aluno={aluno} />
        ))}
      </div>
    </div>
  )
}
