import { describe, expect, it } from "vitest"
import { getIniciais } from "./initials"

describe("getIniciais", () => {
  it("retorna as iniciais de nome e sobrenome em maiúsculas", () => {
    expect(getIniciais("João Silva")).toBe("JS")
  })

  it("limita a quantidade de iniciais (padrão 2)", () => {
    expect(getIniciais("Ana Beatriz Costa Lima")).toBe("AB")
  })

  it("respeita o parâmetro maxLetras", () => {
    expect(getIniciais("Ana Beatriz Costa", 3)).toBe("ABC")
  })

  it("lida com nome único", () => {
    expect(getIniciais("Madonna")).toBe("M")
  })

  it("ignora espaços extras", () => {
    expect(getIniciais("  Maria   Santos  ")).toBe("MS")
  })

  it("retorna string vazia para entrada vazia", () => {
    expect(getIniciais("")).toBe("")
    expect(getIniciais("   ")).toBe("")
  })
})
