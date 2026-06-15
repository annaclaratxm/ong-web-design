import { describe, expect, it, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { PasswordInput } from "@/components/auth/PasswordInput"
import { LoginForm } from "@/components/auth/LoginForm"
import { AuthProvider } from "@/contexts/AuthContext"

const replace = vi.fn()
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
}))

describe("PasswordInput", () => {
  it("alterna a visibilidade da senha", async () => {
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

describe("LoginForm", () => {
  beforeEach(() => {
    replace.mockClear()
    window.localStorage.clear()
  })

  function renderLogin() {
    return render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>,
    )
  }

  it("mostra erro e não navega com credenciais inválidas", async () => {
    const user = userEvent.setup()
    renderLogin()
    await user.type(screen.getByLabelText("Email"), "invalido")
    await user.type(screen.getByPlaceholderText("Digite sua senha"), "123")
    await user.click(screen.getByRole("button", { name: "Entrar" }))
    expect(screen.getByRole("alert")).toBeInTheDocument()
    expect(replace).not.toHaveBeenCalled()
  })

  it("navega para o dashboard com credenciais válidas", async () => {
    const user = userEvent.setup()
    renderLogin()
    await user.type(screen.getByLabelText("Email"), "maria@ong.org")
    await user.type(screen.getByPlaceholderText("Digite sua senha"), "senha1234")
    await user.click(screen.getByRole("button", { name: "Entrar" }))
    expect(replace).toHaveBeenCalledWith("/dashboard")
  })
})
