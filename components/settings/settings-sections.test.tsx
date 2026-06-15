import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { NotificationsSection } from "./notifications-section"
import { AppearanceSection } from "./appearance-section"
import { ProfileSection } from "./profile-section"
import { notificacoesPadrao, perfilPadrao } from "@/lib/data/settings"

describe("NotificationsSection", () => {
  it("reflete o estado e dispara onToggle ao clicar", async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(<NotificationsSection notificacoes={notificacoesPadrao} onToggle={onToggle} />)

    // Há um switch para cada opção de notificação.
    const switches = screen.getAllByRole("switch")
    expect(switches).toHaveLength(5)

    await user.click(switches[0])
    expect(onToggle).toHaveBeenCalledWith("emailAtividades", false)
  })
})

describe("AppearanceSection", () => {
  it("renderiza os títulos de personalização", () => {
    render(<AppearanceSection tema="claro" onTemaChange={() => {}} />)
    expect(screen.getByText("Tema")).toBeInTheDocument()
    expect(screen.getByText("Densidade da Interface")).toBeInTheDocument()
  })
})

describe("ProfileSection", () => {
  it("exibe os dados do perfil e propaga edições", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ProfileSection perfil={perfilPadrao} onChange={onChange} />)

    expect(screen.getByDisplayValue(perfilPadrao.nome)).toBeInTheDocument()
    await user.type(screen.getByLabelText("Nome Completo"), "X")
    expect(onChange).toHaveBeenCalledWith("nome", expect.any(String))
  })
})
