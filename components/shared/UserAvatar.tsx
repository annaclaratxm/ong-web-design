import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getIniciais } from "@/utils/formatters"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
  nome: string
  className?: string
  fallbackClassName?: string
}

export function UserAvatar({ nome, className, fallbackClassName }: UserAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarFallback className={cn("bg-primary text-primary-foreground", fallbackClassName)}>
        {getIniciais(nome)}
      </AvatarFallback>
    </Avatar>
  )
}
