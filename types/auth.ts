export interface LoginResult {
  sucesso: boolean
  erro?: string
}

export interface AuthContextValue {
  isAuthenticated: boolean
  carregando: boolean
  login: (email: string, senha: string, lembrar?: boolean) => LoginResult
  logout: () => void
}
