"use client"

import { createContext, useCallback, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { authService } from "@/services/authService"
import type { AuthContextValue } from "@/types/auth"

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    setIsAuthenticated(authService.hasSession())
    setCarregando(false)
  }, [])

  const login = useCallback<AuthContextValue["login"]>((email, senha, lembrar = false) => {
    const resultado = authService.authenticate(email, senha)
    if (!resultado.sucesso) {
      return resultado
    }
    setIsAuthenticated(true)
    if (lembrar) {
      authService.persistSession()
    }
    return resultado
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    authService.clearSession()
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ isAuthenticated, carregando, login, logout }),
    [isAuthenticated, carregando, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
