import { describe, expect, it, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { LoginForm } from "./login-form"
import { AuthProvider } from "@/lib/auth/auth-context"

const replace = vi.fn()
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
}))

function renderLogin() {
  return render(
    <AuthProvider>
      <LoginForm />
    </AuthProvider>,
  )
}

describe("LoginForm", () => {
  beforeEach(() => {
    replace.mockClear()
    window.localStorage.clear()
  })

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
