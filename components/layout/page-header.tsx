import type { ReactNode } from "react"

interface PageHeaderProps {
  titulo: string
  descricao?: string
  /** Ação opcional à direita (normalmente um botão). */
  acao?: ReactNode
}

/**
 * Cabeçalho padrão de página (título + descrição + ação).
 * Esse bloco estava duplicado nas quatro telas internas.
 */
export function PageHeader({ titulo, descricao, acao }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{titulo}</h1>
        {descricao ? <p className="text-muted-foreground">{descricao}</p> : null}
      </div>
      {acao}
    </div>
  )
}
