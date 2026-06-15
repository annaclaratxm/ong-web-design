import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { CalendarMonth } from "./calendar-month"

describe("CalendarMonth", () => {
  it("renderiza os cabeçalhos dos dias da semana", () => {
    render(<CalendarMonth />)
    for (const dia of ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]) {
      expect(screen.getByText(dia)).toBeInTheDocument()
    }
  })

  it("destaca o dia atual informado", () => {
    render(<CalendarMonth diaAtual={10} offsetPrimeiroDia={0} diasComAtividade={[]} />)
    const hoje = screen.getByText("10")
    expect(hoje.className).toContain("bg-primary")
  })
})
