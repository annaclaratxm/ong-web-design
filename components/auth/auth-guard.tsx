"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import type { ReactNode } from "react"
import { useAuth } from "@/lib/auth/auth-context"

/**
 * Protege rotas internas: enquanto carrega não renderiza nada; se não houver
 * sessão, redireciona para /login. Centraliza a checagem de autenticação que
 * antes vivia espalhada dentro do componente gigante de página.
 */
export function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, carregando } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!carregando && !isAuthenticated) {
      router.replace("/login")
    }
  }, [carregando, isAuthenticated, router])

  if (carregando || !isAuthenticated) {
    return null
  }

  return <>{children}</>
}
