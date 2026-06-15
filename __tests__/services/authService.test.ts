import { describe, expect, it, beforeEach } from "vitest"
import { authService } from "@/services/authService"
import { AUTH_STORAGE_KEY } from "@/utils/constants"

describe("authService", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("autentica com credenciais válidas", () => {
    expect(authService.authenticate("maria@ong.org", "senha1234")).toEqual({ sucesso: true })
  })

  it("rejeita credenciais inválidas com mensagem", () => {
    const r = authService.authenticate("invalido", "123")
    expect(r.sucesso).toBe(false)
    expect(r.erro).toBeTruthy()
  })

  it("persiste e lê a sessão", () => {
    expect(authService.hasSession()).toBe(false)
    authService.persistSession()
    expect(window.localStorage.getItem(AUTH_STORAGE_KEY)).toBe("true")
    expect(authService.hasSession()).toBe(true)
  })

  it("limpa a sessão", () => {
    authService.persistSession()
    authService.clearSession()
    expect(authService.hasSession()).toBe(false)
  })
})
