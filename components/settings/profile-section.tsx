import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { UserAvatar } from "@/components/common/user-avatar"
import { cargosDisponiveis } from "@/lib/data/settings"
import type { PerfilData } from "@/lib/data/settings"

interface ProfileSectionProps {
  perfil: PerfilData
  onChange: (campo: keyof PerfilData, valor: string) => void
}

export function ProfileSection({ perfil, onChange }: ProfileSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-2">Informações Pessoais</h3>
        <p className="text-sm text-muted-foreground mb-4">Atualize suas informações pessoais e de contato</p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <UserAvatar nome={perfil.nome} className="w-20 h-20" fallbackClassName="text-xl" />
        <div>
          <Button variant="outline" size="sm">
            Alterar Foto
          </Button>
          <p className="text-xs text-muted-foreground mt-1">JPG, PNG ou GIF. Máximo 2MB.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome Completo</Label>
          <Input id="nome" value={perfil.nome} onChange={(e) => onChange("nome", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={perfil.email} onChange={(e) => onChange("email", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefone">Telefone</Label>
          <Input id="telefone" value={perfil.telefone} onChange={(e) => onChange("telefone", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cargo">Cargo</Label>
          <Select value={perfil.cargo} onValueChange={(valor) => onChange("cargo", valor)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {cargosDisponiveis.map((cargo) => (
                <SelectItem key={cargo} value={cargo}>
                  {cargo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Biografia</Label>
        <Textarea
          id="bio"
          placeholder="Conte um pouco sobre sua experiência..."
          value={perfil.bio}
          onChange={(e) => onChange("bio", e.target.value)}
          rows={3}
        />
      </div>
    </div>
  )
}
