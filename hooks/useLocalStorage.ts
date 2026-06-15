"use client"

import { useCallback, useEffect, useState } from "react"

export function useLocalStorage<T>(chave: string, valorInicial: T) {
  const [valor, setValor] = useState<T>(valorInicial)

  useEffect(() => {
    if (typeof window === "undefined") return
    const armazenado = window.localStorage.getItem(chave)
    if (armazenado !== null) {
      try {
        setValor(JSON.parse(armazenado) as T)
      } catch {
        setValor(valorInicial)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chave])

  const atualizar = useCallback(
    (novo: T) => {
      setValor(novo)
      if (typeof window !== "undefined") {
        window.localStorage.setItem(chave, JSON.stringify(novo))
      }
    },
    [chave],
  )

  return [valor, atualizar] as const
}
