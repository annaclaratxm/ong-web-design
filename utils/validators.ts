import { z } from "zod"
import { SENHA_TAMANHO_MINIMO } from "@/utils/constants"

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Preencha e-mail e senha.").email("Informe um e-mail válido."),
  senha: z
    .string()
    .min(1, "Preencha e-mail e senha.")
    .min(SENHA_TAMANHO_MINIMO, `A senha deve ter pelo menos ${SENHA_TAMANHO_MINIMO} caracteres.`),
})

export type LoginInput = z.infer<typeof loginSchema>

export interface ResultadoValidacao {
  valido: boolean
  erro?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validarEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim())
}

export function validarCredenciais(email: string, senha: string): ResultadoValidacao {
  const resultado = loginSchema.safeParse({ email, senha })
  if (resultado.success) {
    return { valido: true }
  }
  return { valido: false, erro: resultado.error.issues[0]?.message }
}
