import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getIniciais } from "@/lib/domain/initials"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
  nome: string
  className?: string
  fallbackClassName?: string
}

/**
 * Avatar com iniciais derivadas do nome. Substitui a duplicação de
 * `nome.split(" ").map(n => n[0]).join("")` espalhada pelo projeto.
 */
export function UserAvatar({ nome, className, fallbackClassName }: UserAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarFallback className={cn("bg-primary text-primary-foreground", fallbackClassName)}>
        {getIniciais(nome)}
      </AvatarFallback>
    </Avatar>
  )
}
