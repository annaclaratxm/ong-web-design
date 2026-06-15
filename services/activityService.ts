import type { EducationalActivity, ScheduledActivity, SummaryCard } from "@/types/activity"

const proximasAtividades: ScheduledActivity[] = [
  { id: 1, titulo: "Terapia Ocupacional - João", horario: "09:00", tipo: "terapia" },
  { id: 2, titulo: "Aula de Matemática - Turma A", horario: "10:30", tipo: "aula" },
  { id: 3, titulo: "Reunião com Pais - Maria", horario: "14:00", tipo: "reuniao" },
  { id: 4, titulo: "Atividade Sensorial - Pedro", horario: "15:30", tipo: "atividade" },
]

const atividadesEducacionais: EducationalActivity[] = [
  {
    titulo: "Terapia da Fala",
    descricao: "Desenvolvimento da comunicação verbal",
    alunos: 8,
    cor: "bg-blue-100 text-blue-800",
  },
  {
    titulo: "Coordenação Motora",
    descricao: "Exercícios de motricidade fina e grossa",
    alunos: 12,
    cor: "bg-green-100 text-green-800",
  },
  {
    titulo: "Matemática Adaptada",
    descricao: "Conceitos matemáticos básicos",
    alunos: 15,
    cor: "bg-purple-100 text-purple-800",
  },
  {
    titulo: "Atividades Sensoriais",
    descricao: "Estímulos táteis e visuais",
    alunos: 10,
    cor: "bg-orange-100 text-orange-800",
  },
  {
    titulo: "Comunicação Social",
    descricao: "Interação e habilidades sociais",
    alunos: 18,
    cor: "bg-pink-100 text-pink-800",
  },
  {
    titulo: "Artes e Criatividade",
    descricao: "Expressão artística e criativa",
    alunos: 14,
    cor: "bg-yellow-100 text-yellow-800",
  },
]

const cartoesResumo: SummaryCard[] = [
  { id: "alunos-ativos", titulo: "Alunos Ativos", valor: "24", detalhe: "+2 este mês", cor: "text-primary" },
  {
    id: "atividades-hoje",
    titulo: "Atividades Hoje",
    valor: "8",
    detalhe: "4 concluídas",
    cor: "text-secondary",
  },
  {
    id: "progresso-medio",
    titulo: "Progresso Médio",
    valor: "78%",
    detalhe: "+5% este mês",
    cor: "text-accent",
  },
  {
    id: "proximas-reunioes",
    titulo: "Próximas Reuniões",
    valor: "3",
    detalhe: "Esta semana",
    cor: "text-foreground",
  },
]

export const activityService = {
  getUpcoming(): ScheduledActivity[] {
    return proximasAtividades
  },
  getEducational(): EducationalActivity[] {
    return atividadesEducacionais
  },
  getSummaryCards(): SummaryCard[] {
    return cartoesResumo
  },
}
