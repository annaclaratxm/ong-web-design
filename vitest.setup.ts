import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { afterEach, vi } from "vitest"

// Limpa o DOM renderizado após cada teste para evitar vazamento de estado.
afterEach(() => {
  cleanup()
})

// jsdom não implementa ResizeObserver nem matchMedia, usados por alguns
// componentes do Radix UI. Fornecemos stubs mínimos para os testes.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal("ResizeObserver", ResizeObserverStub)

if (!window.matchMedia) {
  vi.stubGlobal(
    "matchMedia",
    (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  )
}
