import type { Aluno } from "@/lib/domain/types"

/**
 * Alunos exibidos no dashboard (acompanhamento recente).
 * Dados de exemplo — em produção viriam de uma API.
 */
export const alunosRecentes: Aluno[] = [
  { id: 1, nome: "João Silva", progresso: 85, ultimaAtividade: "Terapia da Fala" },
  { id: 2, nome: "Maria Santos", progresso: 72, ultimaAtividade: "Matemática Básica" },
  { id: 3, nome: "Pedro Costa", progresso: 90, ultimaAtividade: "Atividade Sensorial" },
  { id: 4, nome: "Ana Oliveira", progresso: 68, ultimaAtividade: "Coordenação Motora" },
]

/** Lista completa de alunos (tela de acompanhamento). */
export const todosOsAlunos: Aluno[] = [
  ...alunosRecentes,
  { id: 5, nome: "Lucas Ferreira", progresso: 76, ultimaAtividade: "Comunicação Social" },
  { id: 6, nome: "Sofia Rodrigues", progresso: 82, ultimaAtividade: "Artes e Criatividade" },
]
