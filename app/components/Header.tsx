"use client"
import * as React from "react"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Home, User, ChevronDown, Moon, Sun } from "lucide-react"
import { useNotification } from "./Notification"
import { Button } from "../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function Header() {
  const [isDarkMode, setIsDarkMode] = React.useState(true)

  const { data: session } = useSession()
  const { showNotification } = useNotification()

  const handleSignOut = async () => {
    try {
      await signOut()
      showNotification("Signed out successfully", "success")
    } catch {
      showNotification("Failed to sign out", "error")
    }
  }
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between" style={{
    overflowX: "hidden",
}}>
        <Link
          href="/"
          className="flex items-center space-x-2 ml-6"
          prefetch={true}
          onClick={() => showNotification("Welcome to ImageKit Shop", "info")}
        >
          <Home className="h-6 w-6" />
          <span className="text-xl font-bold">ImageKit Shop</span>
        </Link>
        <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
              <Moon className="h-4 w-4" />
              <Label htmlFor="dark-mode" className="sr-only">
                Toggle dark mode
              </Label>
            </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full mr-6  ">
              <User className="h-5 w-5" />
              <ChevronDown className="h-4 w-4 ml-1" />
              <span className="sr-only">Open user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {session ? (
              <>
                <DropdownMenuItem disabled>
                  <span className="text-sm opacity-70">{session.user?.email?.split("@")[0]}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {session.user?.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" onClick={() => showNotification("Welcome to Admin Dashboard", "info")}>
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                  Sign Out
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem asChild>
                <Link href="/login" onClick={() => showNotification("Please sign in to continue", "info")}>
                  Login
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

