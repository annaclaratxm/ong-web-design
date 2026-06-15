import { CALENDARIO_PADRAO, DIAS_SEMANA } from "@/utils/constants"

export interface DiaCalendario {
  indice: number
  dia: number | null
  isHoje: boolean
  temAtividade: boolean
}

export interface OpcoesCalendario {
  diasNoMes?: number
  offsetPrimeiroDia?: number
  diaAtual?: number
  diasComAtividade?: readonly number[]
  totalCelulas?: number
}

export function getDiasSemana(): readonly string[] {
  return DIAS_SEMANA
}

export function montarCalendario({
  diasNoMes = CALENDARIO_PADRAO.diasNoMes,
  offsetPrimeiroDia = CALENDARIO_PADRAO.offsetPrimeiroDia,
  diaAtual = CALENDARIO_PADRAO.diaAtual,
  diasComAtividade = CALENDARIO_PADRAO.diasComAtividade,
  totalCelulas = CALENDARIO_PADRAO.totalCelulas,
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
