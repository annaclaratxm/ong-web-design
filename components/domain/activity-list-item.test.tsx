import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { ActivityListItem } from "./activity-list-item"
import type { AtividadeAgendada } from "@/lib/domain/types"

const atividade: AtividadeAgendada = {
  id: 1,
  titulo: "Terapia Ocupacional - João",
  horario: "09:00",
  tipo: "terapia",
}

describe("ActivityListItem", () => {
  it("mostra título, horário e tipo na variante padrão", () => {
    render(<ActivityListItem atividade={atividade} />)
    expect(screen.getByText("Terapia Ocupacional - João")).toBeInTheDocument()
    expect(screen.getByText("09:00")).toBeInTheDocument()
    expect(screen.getByText("terapia")).toBeInTheDocument()
  })

  it("renderiza a variante de agenda", () => {
    render(<ActivityListItem atividade={atividade} variante="agenda" />)
    expect(screen.getByText("Terapia Ocupacional - João")).toBeInTheDocument()
    expect(screen.getByText("09:00")).toBeInTheDocument()
  })
})
