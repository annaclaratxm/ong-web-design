import { describe, expect, it, beforeEach } from "vitest"
import { act, renderHook } from "@testing-library/react"
import type { ReactNode } from "react"
import { AuthProvider } from "@/contexts/AuthContext"
import { useAuth } from "@/hooks/useAuth"

const wrapper = ({ children }: { children: ReactNode }) => <AuthProvider>{children}</AuthProvider>

describe("AuthProvider / useAuth", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("lança erro quando usado fora do provider", () => {
    expect(() => renderHook(() => useAuth())).toThrow(/AuthProvider/)
  })

  it("inicia não autenticado e termina de carregar", () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.carregando).toBe(false)
  })

  it("autentica com credenciais válidas", () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    let saida: { sucesso: boolean } | undefined
    act(() => {
      saida = result.current.login("maria@ong.org", "senha1234")
    })
    expect(saida?.sucesso).toBe(true)
    expect(result.current.isAuthenticated).toBe(true)
  })

  it("rejeita credenciais inválidas sem autenticar", () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    let saida: { sucesso: boolean; erro?: string } | undefined
    act(() => {
      saida = result.current.login("invalido", "123")
    })
    expect(saida?.sucesso).toBe(false)
    expect(saida?.erro).toBeTruthy()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it("persiste a sessão somente quando 'lembrar' é verdadeiro", () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    act(() => {
      result.current.login("maria@ong.org", "senha1234", true)
    })
    expect(window.localStorage.getItem("userLoggedIn")).toBe("true")
  })

  it("não persiste a sessão quando 'lembrar' é falso", () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    act(() => {
      result.current.login("maria@ong.org", "senha1234", false)
    })
    expect(window.localStorage.getItem("userLoggedIn")).toBeNull()
  })

  it("logout limpa estado e armazenamento", () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    act(() => {
      result.current.login("maria@ong.org", "senha1234", true)
    })
    act(() => {
      result.current.logout()
    })
    expect(result.current.isAuthenticated).toBe(false)
    expect(window.localStorage.getItem("userLoggedIn")).toBeNull()
  })

  it("restaura a sessão persistida na montagem", () => {
    window.localStorage.setItem("userLoggedIn", "true")
    const { result } = renderHook(() => useAuth(), { wrapper })
    expect(result.current.isAuthenticated).toBe(true)
  })
})
