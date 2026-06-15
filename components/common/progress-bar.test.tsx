import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { ProgressBar } from "./progress-bar"

describe("ProgressBar", () => {
  it("define a largura conforme o valor", () => {
    render(<ProgressBar valor={75} />)
    const barra = screen.getByRole("progressbar")
    expect(barra).toHaveStyle({ width: "75%" })
    expect(barra).toHaveAttribute("aria-valuenow", "75")
  })

  it("limita valores acima de 100", () => {
    render(<ProgressBar valor={150} />)
    expect(screen.getByRole("progressbar")).toHaveStyle({ width: "100%" })
  })

  it("limita valores abaixo de 0", () => {
    render(<ProgressBar valor={-20} />)
    expect(screen.getByRole("progressbar")).toHaveStyle({ width: "0%" })
  })
})
