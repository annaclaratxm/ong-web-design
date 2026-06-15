import { describe, expect, it } from "vitest"
import { getDiasSemana, montarCalendario } from "@/utils/calendar"

describe("getDiasSemana", () => {
  it("retorna os sete dias da semana começando no domingo", () => {
    expect(getDiasSemana()).toEqual(["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"])
  })
})

describe("montarCalendario", () => {
  it("gera o total de células solicitado", () => {
    expect(montarCalendario({ totalCelulas: 35 })).toHaveLength(35)
    expect(montarCalendario({ totalCelulas: 42 })).toHaveLength(42)
  })

  it("aplica o deslocamento do primeiro dia (células iniciais ficam vazias)", () => {
    const grade = montarCalendario({ offsetPrimeiroDia: 6 })
    expect(grade.slice(0, 6).every((c) => c.dia === null)).toBe(true)
    expect(grade[6].dia).toBe(1)
  })

  it("marca corretamente o dia atual", () => {
    const grade = montarCalendario({ diaAtual: 15, offsetPrimeiroDia: 6 })
    const hoje = grade.find((c) => c.isHoje)
    expect(hoje?.dia).toBe(15)
    expect(grade.filter((c) => c.isHoje)).toHaveLength(1)
  })

  it("marca apenas os dias com atividade dentro do mês", () => {
    const grade = montarCalendario({ diasComAtividade: [3, 7], offsetPrimeiroDia: 6 })
    const comAtividade = grade.filter((c) => c.temAtividade).map((c) => c.dia)
    expect(comAtividade).toEqual([3, 7])
  })

  it("não marca como atividade um dia que também é hoje", () => {
    const grade = montarCalendario({ diaAtual: 15, diasComAtividade: [15], offsetPrimeiroDia: 6 })
    const dia15 = grade.find((c) => c.dia === 15)
    expect(dia15?.isHoje).toBe(true)
    expect(dia15?.temAtividade).toBe(true)
  })

  it("não inclui dias além do tamanho do mês", () => {
    const grade = montarCalendario({ diasNoMes: 30, offsetPrimeiroDia: 0, totalCelulas: 35 })
    expect(grade.some((c) => c.dia === 31)).toBe(false)
    expect(grade.filter((c) => c.dia !== null)).toHaveLength(30)
  })
})
