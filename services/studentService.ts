import type { Student } from "@/types/student"

const alunosRecentes: Student[] = [
  { id: 1, nome: "João Silva", progresso: 85, ultimaAtividade: "Terapia da Fala" },
  { id: 2, nome: "Maria Santos", progresso: 72, ultimaAtividade: "Matemática Básica" },
  { id: 3, nome: "Pedro Costa", progresso: 90, ultimaAtividade: "Atividade Sensorial" },
  { id: 4, nome: "Ana Oliveira", progresso: 68, ultimaAtividade: "Coordenação Motora" },
]

const todosOsAlunos: Student[] = [
  ...alunosRecentes,
  { id: 5, nome: "Lucas Ferreira", progresso: 76, ultimaAtividade: "Comunicação Social" },
  { id: 6, nome: "Sofia Rodrigues", progresso: 82, ultimaAtividade: "Artes e Criatividade" },
]

export const studentService = {
  getRecent(): Student[] {
    return alunosRecentes
  },
  getAll(): Student[] {
    return todosOsAlunos
  },
}
