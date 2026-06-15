import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AppearanceSectionProps {
  tema: string
  onTemaChange: (valor: string) => void
}

const temas = [
  { value: "claro", label: "Tema Claro" },
  { value: "escuro", label: "Tema Escuro" },
  { value: "sistema", label: "Seguir Sistema" },
]

const densidades = [
  { value: "compacta", label: "Compacta" },
  { value: "normal", label: "Normal" },
  { value: "confortavel", label: "Confortável" },
]

export function AppearanceSection({ tema, onTemaChange }: AppearanceSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-2">Personalização</h3>
        <p className="text-sm text-muted-foreground mb-4">Personalize a aparência da plataforma</p>
      </div>

      <Card className="bg-muted/20 border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Tema</CardTitle>
          <CardDescription>Escolha entre tema claro ou escuro</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={tema} onValueChange={onTemaChange}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {temas.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="bg-muted/20 border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Densidade da Interface</CardTitle>
          <CardDescription>Ajuste o espaçamento dos elementos</CardDescription>
        </CardHeader>
        <CardContent>
          <Select defaultValue="normal">
            <SelectTrigger className="w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {densidades.map((d) => (
                <SelectItem key={d.value} value={d.value}>
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  )
}
