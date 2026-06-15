import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { StatCard } from "./stat-card"
import { StudentCard } from "./student-card"
import { StudentProgressRow } from "./student-progress-row"
import { ActivityCard } from "./activity-card"
import type { Aluno, AtividadeEducacional, ResumoCard } from "@/lib/domain/types"

const aluno: Aluno = { id: 1, nome: "João Silva", progresso: 85, ultimaAtividade: "Terapia da Fala" }

describe("StatCard", () => {
  it("exibe título, valor e detalhe", () => {
    const card: ResumoCard = {
      id: "alunos",
      titulo: "Alunos Ativos",
      valor: "24",
      detalhe: "+2 este mês",
      cor: "text-primary",
    }
    render(<StatCard {...card} />)
    expect(screen.getByText("Alunos Ativos")).toBeInTheDocument()
    expect(screen.getByText("24")).toBeInTheDocument()
    expect(screen.getByText("+2 este mês")).toBeInTheDocument()
  })
})

describe("StudentCard", () => {
  it("mostra nome, atividade, progresso e iniciais", () => {
    render(<StudentCard aluno={aluno} />)
    expect(screen.getByText("João Silva")).toBeInTheDocument()
    expect(screen.getByText("Terapia da Fala")).toBeInTheDocument()
    expect(screen.getByText("85%")).toBeInTheDocument()
    expect(screen.getByText("JS")).toBeInTheDocument()
    expect(screen.getByRole("progressbar")).toHaveStyle({ width: "85%" })
  })
})

describe("StudentProgressRow", () => {
  it("mostra nome e percentual de progresso", () => {
    render(<StudentProgressRow aluno={aluno} />)
    expect(screen.getByText("João Silva")).toBeInTheDocument()
    expect(screen.getByText("85%")).toBeInTheDocument()
  })
})

describe("ActivityCard", () => {
  it("exibe título, descrição e número de alunos", () => {
    const atividade: AtividadeEducacional = {
      titulo: "Terapia da Fala",
      descricao: "Desenvolvimento da comunicação verbal",
      alunos: 8,
      cor: "bg-blue-100 text-blue-800",
    }
    render(<ActivityCard atividade={atividade} />)
    expect(screen.getByText("Terapia da Fala")).toBeInTheDocument()
    expect(screen.getByText("Desenvolvimento da comunicação verbal")).toBeInTheDocument()
    expect(screen.getByText("8 alunos")).toBeInTheDocument()
  })
})
