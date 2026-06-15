import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { StudentCard } from "@/components/dashboard/StudentCard"
import { StudentProgress } from "@/components/dashboard/StudentProgress"
import { ActivityCard } from "@/components/dashboard/ActivityCard"
import { ActivityList } from "@/components/dashboard/ActivityList"
import { CalendarMonth } from "@/components/dashboard/CalendarMonth"
import type { Student } from "@/types/student"
import type { EducationalActivity, ScheduledActivity, SummaryCard } from "@/types/activity"

const aluno: Student = { id: 1, nome: "João Silva", progresso: 85, ultimaAtividade: "Terapia da Fala" }

const atividade: ScheduledActivity = {
  id: 1,
  titulo: "Terapia Ocupacional",
  horario: "09:00",
  tipo: "terapia",
}

describe("MetricCard", () => {
  it("exibe título, valor e detalhe", () => {
    const card: SummaryCard = {
      id: "a",
      titulo: "Alunos Ativos",
      valor: "24",
      detalhe: "+2 este mês",
      cor: "text-primary",
    }
    render(<MetricCard {...card} />)
    expect(screen.getByText("Alunos Ativos")).toBeInTheDocument()
    expect(screen.getByText("24")).toBeInTheDocument()
    expect(screen.getByText("+2 este mês")).toBeInTheDocument()
  })
})

describe("StudentCard", () => {
  it("mostra nome, progresso e iniciais", () => {
    render(<StudentCard aluno={aluno} />)
    expect(screen.getByText("João Silva")).toBeInTheDocument()
    expect(screen.getByText("85%")).toBeInTheDocument()
    expect(screen.getByText("JS")).toBeInTheDocument()
    expect(screen.getByRole("progressbar")).toHaveStyle({ width: "85%" })
  })
})

describe("StudentProgress", () => {
  it("mostra nome e percentual", () => {
    render(<StudentProgress aluno={aluno} />)
    expect(screen.getByText("João Silva")).toBeInTheDocument()
    expect(screen.getByText("85%")).toBeInTheDocument()
  })
})

describe("ActivityCard", () => {
  it("exibe título, descrição e número de alunos", () => {
    const a: EducationalActivity = {
      titulo: "Terapia da Fala",
      descricao: "Comunicação verbal",
      alunos: 8,
      cor: "bg-blue-100",
    }
    render(<ActivityCard atividade={a} />)
    expect(screen.getByText("Terapia da Fala")).toBeInTheDocument()
    expect(screen.getByText("Comunicação verbal")).toBeInTheDocument()
    expect(screen.getByText("8 alunos")).toBeInTheDocument()
  })
})

describe("ActivityList", () => {
  it("renderiza a lista nas duas variantes", () => {
    const { rerender } = render(<ActivityList atividades={[atividade]} />)
    expect(screen.getByText("Terapia Ocupacional")).toBeInTheDocument()
    expect(screen.getByText("09:00")).toBeInTheDocument()
    rerender(<ActivityList atividades={[atividade]} variante="agenda" />)
    expect(screen.getByText("Terapia Ocupacional")).toBeInTheDocument()
  })
})

describe("CalendarMonth", () => {
  it("renderiza cabeçalhos e destaca o dia atual", () => {
    render(<CalendarMonth diaAtual={10} offsetPrimeiroDia={0} diasComAtividade={[]} />)
    expect(screen.getByText("Dom")).toBeInTheDocument()
    expect(screen.getByText("10").className).toContain("bg-primary")
  })
})
