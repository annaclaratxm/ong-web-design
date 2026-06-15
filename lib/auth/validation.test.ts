import { describe, expect, it } from "vitest"
import { SENHA_TAMANHO_MINIMO, validarCredenciais, validarEmail } from "./validation"

describe("validarEmail", () => {
  it("aceita e-mails bem formados", () => {
    expect(validarEmail("maria@ong.org.br")).toBe(true)
    expect(validarEmail("a.b-c@dominio.com")).toBe(true)
  })

  it("rejeita e-mails malformados", () => {
    expect(validarEmail("maria")).toBe(false)
    expect(validarEmail("maria@")).toBe(false)
    expect(validarEmail("maria@dominio")).toBe(false)
    expect(validarEmail("@dominio.com")).toBe(false)
    expect(validarEmail("")).toBe(false)
  })
})

describe("validarCredenciais", () => {
  const senhaValida = "senha1234"

  it("aprova credenciais válidas", () => {
    expect(validarCredenciais("maria@ong.org", senhaValida)).toEqual({ valido: true })
  })

  it("exige e-mail e senha preenchidos", () => {
    expect(validarCredenciais("", senhaValida).valido).toBe(false)
    expect(validarCredenciais("maria@ong.org", "").valido).toBe(false)
  })

  it("rejeita e-mail inválido com mensagem", () => {
    const r = validarCredenciais("maria", senhaValida)
    expect(r.valido).toBe(false)
    expect(r.erro).toMatch(/e-mail válido/i)
  })

  it("rejeita senha menor que o mínimo", () => {
    const curta = "a".repeat(SENHA_TAMANHO_MINIMO - 1)
    const r = validarCredenciais("maria@ong.org", curta)
    expect(r.valido).toBe(false)
    expect(r.erro).toContain(String(SENHA_TAMANHO_MINIMO))
  })
})
