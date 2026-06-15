import { cn } from "@/lib/utils"
import { getDiasSemana, montarCalendario } from "@/lib/domain/calendar"
import type { OpcoesCalendario } from "@/lib/domain/calendar"

/**
 * Grade de calendário mensal. Toda a aritmética de dias mora em
 * `montarCalendario` (testável); aqui só cuidamos da apresentação.
 */
export function CalendarMonth(opcoes: OpcoesCalendario = {}) {
  const dias = montarCalendario(opcoes)

  return (
    <>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {getDiasSemana().map((dia) => (
          <div key={dia} className="text-center text-sm font-medium text-muted-foreground p-2">
            {dia}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {dias.map(({ indice, dia, isHoje, temAtividade }) => (
          <div
            key={indice}
            className={cn(
              "aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer",
              dia === null ? "text-muted-foreground/50" : "text-foreground hover:bg-muted",
              isHoje && "bg-primary text-primary-foreground font-bold",
              temAtividade && !isHoje && "bg-accent/20 text-accent font-medium",
            )}
          >
            {dia ?? ""}
          </div>
        ))}
      </div>
    </>
  )
}
