"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { BookOpen, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/auth/PasswordInput"
import { useAuth } from "@/hooks/useAuth"

export function LoginForm() {
  const { login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [lembrar, setLembrar] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { sucesso, erro: mensagem } = login(email, senha, lembrar)
    if (sucesso) {
      router.replace("/dashboard")
    } else {
      setErro(mensagem ?? "Não foi possível entrar.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <BookOpen className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Centro Educacional</h1>
          <h2 className="text-3xl font-bold text-primary mb-1">Pequeno Milagre</h2>
          <p className="text-muted-foreground">Acesse sua conta para continuar</p>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">Entrar na Plataforma</CardTitle>
            <CardDescription className="text-center">
              Digite suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-input border-border focus:ring-ring"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Senha
                </Label>
                <PasswordInput
                  id="password"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={setSenha}
                  comIconeCadeado
                  className="bg-input border-border focus:ring-ring"
                />
              </div>

              {erro ? (
                <p role="alert" className="text-sm text-destructive">
                  {erro}
                </p>
              ) : null}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={lembrar}
                    onCheckedChange={(checked) => setLembrar(checked === true)}
                  />
                  <Label htmlFor="remember" className="text-sm text-muted-foreground">
                    Lembrar-me
                  </Label>
                </div>
                <Button
                  variant="link"
                  className="px-0 text-sm text-primary hover:text-primary/80"
                  type="button"
                >
                  Esqueci minha senha
                </Button>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Entrar
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Não tem uma conta?{" "}
                <Button variant="link" className="px-0 text-primary hover:text-primary/80" type="button">
                  Entre em contato com a administração
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">Precisa de ajuda? Entre em contato conosco</p>
          <p className="text-xs text-muted-foreground mt-1">contato@pequenoMilagre.org.br | (11) 9999-9999</p>
        </div>
      </div>
    </div>
  )
}
