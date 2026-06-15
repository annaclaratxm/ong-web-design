/**
 * Gera as iniciais de um nome próprio.
 *
 * Antes da refatoração, a expressão `nome.split(" ").map(n => n[0]).join("")`
 * estava duplicada em pelo menos três lugares. Extrair para uma função pura
 * remove a duplicação e a torna testável de forma isolada.
 *
 * @param nome Nome completo (ex.: "João da Silva")
 * @param maxLetras Número máximo de iniciais retornadas (padrão 2)
 */
export function getIniciais(nome: string, maxLetras = 2): string {
  return nome
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((parte) => parte[0]?.toUpperCase() ?? "")
    .slice(0, maxLetras)
    .join("")
}
