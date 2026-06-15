export type TipoAtividade = "terapia" | "aula" | "reuniao" | "atividade"

export interface ScheduledActivity {
  id: number
  titulo: string
  horario: string
  tipo: TipoAtividade
}

export interface EducationalActivity {
  titulo: string
  descricao: string
  alunos: number
  cor: string
}

export interface SummaryCard {
  id: string
  titulo: string
  valor: string
  detalhe: string
  cor: string
}
