import { validarCredenciais } from "@/utils/validators"
import { AUTH_STORAGE_KEY } from "@/utils/constants"
import type { LoginResult } from "@/types/auth"

export const authService = {
  authenticate(email: string, senha: string): LoginResult {
    const { valido, erro } = validarCredenciais(email, senha)
    return valido ? { sucesso: true } : { sucesso: false, erro }
  },

  persistSession(): void {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(AUTH_STORAGE_KEY, "true")
    }
  },

  clearSession(): void {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  },

  hasSession(): boolean {
    if (typeof window === "undefined") return false
    return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true"
  },
}
