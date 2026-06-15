/**
 * Lógica de montagem do calendário mensal.
 *
 * Na versão original os números mágicos (deslocamento `-6`, dia atual `15`,
 * dias com atividade `[3,7,12,15,18,22,28]`, total de `35` células) estavam
 * embutidos direto no JSX. Aqui eles viram parâmetros nomeados e a montagem
 * da grade vira uma função pura, fácil de testar.
 */

export interface DiaCalendario {
  /** Índice da célula na grade (0..totalCelulas-1). */
  indice: number
  /** Número do dia no mês, ou null quando a célula está fora do mês. */
  dia: number | null
  isHoje: boolean
  temAtividade: boolean
}

export interface OpcoesCalendario {
  /** Quantos dias o mês possui. */
  diasNoMes?: number
  /** Em qual coluna (0=Dom..6=Sáb) cai o dia 1 do mês. */
  offsetPrimeiroDia?: number
  /** Dia destacado como "hoje". */
  diaAtual?: number
  /** Dias que possuem atividade agendada. */
  diasComAtividade?: number[]
  /** Total de células renderizadas na grade (semanas * 7). */
  totalCelulas?: number
}

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"] as const

export function getDiasSemana(): readonly string[] {
  return DIAS_SEMANA
}

export function montarCalendario({
  diasNoMes = 31,
  offsetPrimeiroDia = 6,
  diaAtual = 15,
  diasComAtividade = [3, 7, 12, 15, 18, 22, 28],
  totalCelulas = 35,
}: OpcoesCalendario = {}): DiaCalendario[] {
  const atividades = new Set(diasComAtividade)

  return Array.from({ length: totalCelulas }, (_, indice) => {
    const dia = indice - offsetPrimeiroDia + 1
    const dentroDoMes = dia >= 1 && dia <= diasNoMes

    return {
      indice,
      dia: dentroDoMes ? dia : null,
      isHoje: dentroDoMes && dia === diaAtual,
      temAtividade: dentroDoMes && atividades.has(dia),
    }
  })
}
