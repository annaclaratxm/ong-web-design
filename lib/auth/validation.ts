/**
 * Validação pura das credenciais de login.
 *
 * A versão original aceitava qualquer coisa (`if (email && password)`), sem
 * formato de e-mail nem tamanho mínimo de senha. Aqui a regra fica isolada,
 * sem efeitos colaterais, o que a torna trivial de testar.
 */

export const SENHA_TAMANHO_MINIMO = 8

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export interface ResultadoValidacao {
  valido: boolean
  erro?: string
}

export function validarEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim())
}

export function validarCredenciais(email: string, senha: string): ResultadoValidacao {
  if (!email.trim() || !senha) {
    return { valido: false, erro: "Preencha e-mail e senha." }
  }
  if (!validarEmail(email)) {
    return { valido: false, erro: "Informe um e-mail válido." }
  }
  if (senha.length < SENHA_TAMANHO_MINIMO) {
    return { valido: false, erro: `A senha deve ter pelo menos ${SENHA_TAMANHO_MINIMO} caracteres.` }
  }
  return { valido: true }
}
