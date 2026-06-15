"use client"

import { useState } from "react"
import { Eye, EyeOff, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface PasswordInputProps {
  id: string
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  required?: boolean
  /** Mostra o ícone de cadeado à esquerda (usado na tela de login). */
  comIconeCadeado?: boolean
  className?: string
}

/**
 * Campo de senha com botão de mostrar/ocultar. Esse padrão estava copiado
 * quatro vezes (login + três campos de configurações); agora é um componente.
 */
export function PasswordInput({
  id,
  value,
  placeholder,
  onChange,
  required,
  comIconeCadeado = false,
  className,
}: PasswordInputProps) {
  const [visivel, setVisivel] = useState(false)

  return (
    <div className="relative">
      {comIconeCadeado ? <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /> : null}
      <Input
        id={id}
        type={visivel ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        required={required}
        className={cn(comIconeCadeado && "pl-10", "pr-10", className)}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
        onClick={() => setVisivel((v) => !v)}
        aria-label={visivel ? "Ocultar senha" : "Mostrar senha"}
      >
        {visivel ? (
          <EyeOff className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Eye className="h-4 w-4 text-muted-foreground" />
        )}
      </Button>
    </div>
  )
}
