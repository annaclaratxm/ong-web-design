import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { UserAvatar } from "./user-avatar"

describe("UserAvatar", () => {
  it("renderiza as iniciais do nome", () => {
    render(<UserAvatar nome="Pedro Costa" />)
    expect(screen.getByText("PC")).toBeInTheDocument()
  })
})
