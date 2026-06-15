import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { PageHeader } from "./page-header"

describe("PageHeader", () => {
  it("renderiza título e descrição", () => {
    render(<PageHeader titulo="Dashboard" descricao="Bem-vindo" />)
    expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument()
    expect(screen.getByText("Bem-vindo")).toBeInTheDocument()
  })

  it("omite a descrição quando não informada", () => {
    render(<PageHeader titulo="Alunos" />)
    expect(screen.getByRole("heading", { name: "Alunos" })).toBeInTheDocument()
  })

  it("renderiza a ação fornecida", () => {
    render(<PageHeader titulo="Atividades" acao={<button>Nova</button>} />)
    expect(screen.getByRole("button", { name: "Nova" })).toBeInTheDocument()
  })
})
