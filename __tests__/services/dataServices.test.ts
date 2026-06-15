import { describe, expect, it } from "vitest"
import { studentService } from "@/services/studentService"
import { activityService } from "@/services/activityService"
import { settingsService } from "@/services/settingsService"

describe("studentService", () => {
  it("retorna alunos recentes (subconjunto de todos)", () => {
    expect(studentService.getRecent().length).toBeGreaterThan(0)
    expect(studentService.getAll().length).toBeGreaterThanOrEqual(studentService.getRecent().length)
  })
})

describe("activityService", () => {
  it("retorna atividades, catálogo e cartões de resumo", () => {
    expect(activityService.getUpcoming()).toHaveLength(4)
    expect(activityService.getEducational().length).toBeGreaterThan(0)
    expect(activityService.getSummaryCards()).toHaveLength(4)
  })
})

describe("settingsService", () => {
  it("fornece perfil, notificações e opções padrão", () => {
    expect(settingsService.getDefaultProfile().nome).toBeTruthy()
    expect(Object.keys(settingsService.getDefaultNotifications())).toHaveLength(5)
    expect(settingsService.getNotificationOptions()).toHaveLength(5)
  })
})
