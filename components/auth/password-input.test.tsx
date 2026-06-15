import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { PasswordInput } from "./password-input"

describe("PasswordInput", () => {
  it("começa oculto e alterna a visibilidade ao clicar no botão", async () => {
    const user = userEvent.setup()
    render(<PasswordInput id="senha" placeholder="Senha" />)

    const input = screen.getByPlaceholderText("Senha")
    expect(input).toHaveAttribute("type", "password")

    await user.click(screen.getByRole("button", { name: /mostrar senha/i }))
    expect(input).toHaveAttribute("type", "text")

    await user.click(screen.getByRole("button", { name: /ocultar senha/i }))
    expect(input).toHaveAttribute("type", "password")
  })

  it("propaga mudanças via onChange", async () => {
    const user = userEvent.setup()
    let valor = ""
    render(<PasswordInput id="senha" placeholder="Senha" onChange={(v) => (valor = v)} />)
    await user.type(screen.getByPlaceholderText("Senha"), "abc")
    expect(valor).toBe("abc")
  })
})
