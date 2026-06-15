import { cn } from "@/lib/utils"

interface ProgressBarProps {
  /** Progresso de 0 a 100. */
  valor: number
  className?: string
}

/**
 * Barra de progresso simples. Antes, o mesmo `<div>` com `style.width`
 * aparecia repetido no dashboard e na tela de alunos.
 */
export function ProgressBar({ valor, className }: ProgressBarProps) {
  const largura = Math.min(100, Math.max(0, valor))

  return (
    <div className={cn("h-2 bg-muted rounded-full overflow-hidden", className)}>
      <div
        className="h-full bg-primary rounded-full transition-all duration-300"
        style={{ width: `${largura}%` }}
        role="progressbar"
        aria-valuenow={largura}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}
