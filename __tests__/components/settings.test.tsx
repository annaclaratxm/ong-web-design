import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { NotificationsSection } from "@/components/settings/NotificationsSection"
import { AppearanceSection } from "@/components/settings/AppearanceSection"
import { ProfileSection } from "@/components/settings/ProfileSection"
import { settingsService } from "@/services/settingsService"

describe("NotificationsSection", () => {
  it("reflete o estado e dispara onToggle ao clicar", async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(
      <NotificationsSection notificacoes={settingsService.getDefaultNotifications()} onToggle={onToggle} />,
    )
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
  it("exibe os dados e propaga edições", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const perfil = settingsService.getDefaultProfile()
    render(<ProfileSection perfil={perfil} onChange={onChange} />)
    expect(screen.getByDisplayValue(perfil.nome)).toBeInTheDocument()
    await user.type(screen.getByLabelText("Nome Completo"), "X")
    expect(onChange).toHaveBeenCalledWith("nome", expect.any(String))
  })
})
