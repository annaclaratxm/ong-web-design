import { describe, expect, it, beforeEach } from "vitest"
import { act, renderHook } from "@testing-library/react"
import { useLocalStorage } from "@/hooks/useLocalStorage"

describe("useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("usa o valor inicial quando não há nada armazenado", () => {
    const { result } = renderHook(() => useLocalStorage("tema", "claro"))
    expect(result.current[0]).toBe("claro")
  })

  it("persiste o valor atualizado", () => {
    const { result } = renderHook(() => useLocalStorage("tema", "claro"))
    act(() => result.current[1]("escuro"))
    expect(result.current[0]).toBe("escuro")
    expect(JSON.parse(window.localStorage.getItem("tema") as string)).toBe("escuro")
  })

  it("restaura o valor previamente armazenado", () => {
    window.localStorage.setItem("tema", JSON.stringify("sistema"))
    const { result } = renderHook(() => useLocalStorage("tema", "claro"))
    expect(result.current[0]).toBe("sistema")
  })
})
