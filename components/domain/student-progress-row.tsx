import { ProgressBar } from "@/components/common/progress-bar"
import { UserAvatar } from "@/components/common/user-avatar"
import type { Aluno } from "@/lib/domain/types"

/** Linha compacta de progresso de aluno (lista do dashboard). */
export function StudentProgressRow({ aluno }: { aluno: Aluno }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
      <div className="flex items-center gap-3">
        <UserAvatar nome={aluno.nome} className="w-8 h-8" fallbackClassName="text-xs" />
        <div>
          <p className="font-medium text-sm">{aluno.nome}</p>
          <p className="text-xs text-muted-foreground">{aluno.ultimaAtividade}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-primary">{aluno.progresso}%</p>
        <ProgressBar valor={aluno.progresso} className="w-16 h-1 mt-1" />
      </div>
    </div>
  )
}
