"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { validarCredenciais } from "@/lib/auth/validation"

const STORAGE_KEY = "userLoggedIn"

interface ResultadoLogin {
  sucesso: boolean
  erro?: string
}

interface AuthContextValue {
  isAuthenticated: boolean
  /** Indica que o estado inicial (localStorage) ainda está sendo carregado. */
  carregando: boolean
  login: (email: string, senha: string, lembrar?: boolean) => ResultadoLogin
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function lerSessaoPersistida(): boolean {
  if (typeof window === "undefined") return false
  return window.localStorage.getItem(STORAGE_KEY) === "true"
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    setIsAuthenticated(lerSessaoPersistida())
    setCarregando(false)
  }, [])

  const login = useCallback((email: string, senha: string, lembrar = false): ResultadoLogin => {
    const { valido, erro } = validarCredenciais(email, senha)
    if (!valido) {
      return { sucesso: false, erro }
    }
    setIsAuthenticated(true)
    if (lembrar && typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "true")
    }
    return { sucesso: true }
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ isAuthenticated, carregando, login, logout }),
    [isAuthenticated, carregando, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de um <AuthProvider>.")
  }
  return ctx
}
