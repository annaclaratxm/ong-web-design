"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { NavItem } from "@/utils/constants"

interface SidebarProps {
  itens: NavItem[]
}

export function Sidebar({ itens }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border min-h-[calc(100vh-73px)]">
      <nav className="p-4 space-y-2">
        {itens.map(({ href, label, icon: Icon }) => {
          const ativo = pathname === href
          return (
            <Button
              key={href}
              asChild
              variant={ativo ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3",
                ativo
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Link href={href}>
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            </Button>
          )
        })}
      </nav>
    </aside>
  )
}
