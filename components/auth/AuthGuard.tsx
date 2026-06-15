"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import type { ReactNode } from "react"
import { useAuth } from "@/hooks/useAuth"

export function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, carregando } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!carregando && !isAuthenticated) {
      router.replace("/login")
    }
  }, [carregando, isAuthenticated, router])

  if (carregando || !isAuthenticated) {
    return null
  }

  return <>{children}</>
}
