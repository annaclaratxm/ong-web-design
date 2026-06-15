import { ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressBar } from "@/components/shared/ProgressBar"
import { UserAvatar } from "@/components/shared/UserAvatar"
import type { Student } from "@/types/student"

export function StudentCard({ aluno }: { aluno: Student }) {
  return (
    <Card className="bg-card border-border hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <UserAvatar nome={aluno.nome} className="w-12 h-12" />
          <div className="flex-1">
            <CardTitle className="text-lg">{aluno.nome}</CardTitle>
            <CardDescription>{aluno.ultimaAtividade}</CardDescription>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Progresso Geral</span>
            <span className="text-sm font-medium text-primary">{aluno.progresso}%</span>
          </div>
          <ProgressBar valor={aluno.progresso} />
          <div className="flex gap-2 pt-2">
            <Badge variant="secondary" className="text-xs">
              Ativo
            </Badge>
            <Badge variant="outline" className="text-xs">
              TEA
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
