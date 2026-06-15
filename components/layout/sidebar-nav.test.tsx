import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { SidebarNav } from "./sidebar-nav"
import { menuPrincipal } from "@/lib/data/navigation"

vi.mock("next/navigation", () => ({
  usePathname: () => "/alunos",
}))

describe("SidebarNav", () => {
  it("renderiza um link para cada item do menu", () => {
    render(<SidebarNav itens={menuPrincipal} />)
    for (const item of menuPrincipal) {
      const link = screen.getByRole("link", { name: new RegExp(item.label, "i") })
      expect(link).toHaveAttribute("href", item.href)
    }
  })

  it("destaca o item correspondente à rota atual", () => {
    render(<SidebarNav itens={menuPrincipal} />)
    const ativo = screen.getByRole("link", { name: /alunos/i })
    // O botão ativo recebe a classe de fundo primário da sidebar.
    expect(ativo.closest("a")?.className ?? ativo.className).toContain("sidebar-primary")
  })
})
