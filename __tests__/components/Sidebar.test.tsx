import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { Sidebar } from "@/components/shared/Sidebar"
import { MENU_PRINCIPAL } from "@/utils/constants"

vi.mock("next/navigation", () => ({
  usePathname: () => "/alunos",
}))

describe("Sidebar", () => {
  it("renderiza um link para cada item do menu", () => {
    render(<Sidebar itens={MENU_PRINCIPAL} />)
    for (const item of MENU_PRINCIPAL) {
      const link = screen.getByRole("link", { name: new RegExp(item.label, "i") })
      expect(link).toHaveAttribute("href", item.href)
    }
  })

  it("destaca o item correspondente à rota atual", () => {
    render(<Sidebar itens={MENU_PRINCIPAL} />)
    const ativo = screen.getByRole("link", { name: /alunos/i })
    expect(ativo.closest("a")?.className ?? ativo.className).toContain("sidebar-primary")
  })
})
