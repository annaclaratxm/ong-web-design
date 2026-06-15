export function getIniciais(nome: string, maxLetras = 2): string {
  return nome
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((parte) => parte[0]?.toUpperCase() ?? "")
    .slice(0, maxLetras)
    .join("")
}
