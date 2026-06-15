import { redirect } from "next/navigation"

/** Raiz do app: encaminha para o dashboard. O AuthGuard cuida de redirecionar
 * para /login quando não houver sessão. */
export default function Home() {
  redirect("/dashboard")
}
