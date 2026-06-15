import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"
import { ActivityCard } from "@/components/domain/activity-card"
import { atividadesEducacionais } from "@/lib/data/activities"

export default function AtividadesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        titulo="Atividades Educacionais"
        descricao="Gerencie e organize as atividades"
        acao={
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Nova Atividade
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {atividadesEducacionais.map((atividade) => (
          <ActivityCard key={atividade.titulo} atividade={atividade} />
        ))}
      </div>
    </div>
  )
}
