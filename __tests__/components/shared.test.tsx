import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { UserAvatar } from "@/components/shared/UserAvatar"
import { ProgressBar } from "@/components/shared/ProgressBar"
import { PageHeader } from "@/components/shared/PageHeader"

describe("UserAvatar", () => {
  it("renderiza as iniciais do nome", () => {
    render(<UserAvatar nome="Pedro Costa" />)
    expect(screen.getByText("PC")).toBeInTheDocument()
  })
})

describe("ProgressBar", () => {
  it("define a largura conforme o valor", () => {
    render(<ProgressBar valor={75} />)
    const barra = screen.getByRole("progressbar")
    expect(barra).toHaveStyle({ width: "75%" })
    expect(barra).toHaveAttribute("aria-valuenow", "75")
  })

  it("limita valores fora do intervalo 0-100", () => {
    const { rerender } = render(<ProgressBar valor={150} />)
    expect(screen.getByRole("progressbar")).toHaveStyle({ width: "100%" })
    rerender(<ProgressBar valor={-20} />)
    expect(screen.getByRole("progressbar")).toHaveStyle({ width: "0%" })
  })
})

describe("PageHeader", () => {
  it("renderiza título, descrição e ação", () => {
    render(<PageHeader titulo="Dashboard" descricao="Bem-vindo" acao={<button>Nova</button>} />)
    expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument()
    expect(screen.getByText("Bem-vindo")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Nova" })).toBeInTheDocument()
  })

  it("omite a descrição quando não informada", () => {
    render(<PageHeader titulo="Alunos" />)
    expect(screen.getByRole("heading", { name: "Alunos" })).toBeInTheDocument()
  })
})
