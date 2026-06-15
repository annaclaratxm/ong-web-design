/**
 * Modelos de domínio do sistema do Centro Educacional Pequeno Milagre.
 *
 * Centralizar os tipos aqui evita "data clumps" espalhados pelos componentes
 * e dá um único ponto de verdade para o formato dos dados.
 */

export type TipoAtividade = "terapia" | "aula" | "reuniao" | "atividade"

export interface AtividadeAgendada {
  id: number
  titulo: string
  horario: string
  tipo: TipoAtividade
}

export interface Aluno {
  id: number
  nome: string
  progresso: number
  ultimaAtividade: string
}

export interface AtividadeEducacional {
  titulo: string
  descricao: string
  alunos: number
  cor: string
}

export interface ResumoCard {
  id: string
  titulo: string
  valor: string
  detalhe: string
  cor: string
}
