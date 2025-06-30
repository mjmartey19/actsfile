"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Plus,
  Search,
  Users,
  Building2,
  Trophy,
  User,
  Settings,
  LogOut,
  Bell,
  Menu,
  BookOpen,
  ImageIcon,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function Navigation() {
  const pathname = usePathname()
  const [notifications] = useState(3)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { user, logout } = useAuth()

  // Detect mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const navItems = [
    { href: "/home", label: "Home", icon: Home },
    { href: "/post-act", label: "Post Act", icon: Plus },
    { href: "/discover", label: "Discover", icon: Search },
    { href: "/biography", label: "Biography", icon: BookOpen },
    { href: "/awards", label: "Awards", icon: Trophy },
  ]

  const handleLogout = () => {
    logout()
    setIsMobileMenuOpen(false)
  }

  const NavLink = ({ item, mobile = false }: { item: (typeof navItems)[0]; mobile?: boolean }) => {
    const Icon = item.icon
    const isActive = pathname === item.href

    return (
      <Link
        href={item.href}
        className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary ${
          isActive ? "text-primary" : "text-muted-foreground"
        } ${mobile ? "w-full px-4 py-3 rounded-lg hover:bg-muted" : ""}`}
        onClick={() => mobile && setIsMobileMenuOpen(false)}
      >
        <Icon className="h-4 w-4" />
        <span>{item.label}</span>
      </Link>
    )
  }

  const UserMenu = ({ mobile = false }: { mobile?: boolean }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={`relative ${mobile ? "w-full justify-start" : "h-8 w-8 rounded-full"}`}>
          <Avatar className={mobile ? "h-6 w-6 mr-2" : "h-8 w-8"}>
            <AvatarImage src={user?.avatar || "/placeholder-user.jpg"} alt={user?.name || "User"} />
            <AvatarFallback>
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "U"}
            </AvatarFallback>
          </Avatar>
          {mobile && <span>{user?.name}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align={mobile ? "start" : "end"} forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user?.name}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/biography" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Biography</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/art-gallery" className="flex items-center">
            <ImageIcon className="mr-2 h-4 w-4" />
            <span>Art Gallery</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/home" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AF</span>
              </div>
              <span className="font-bold text-xl hidden sm:block">ActsFile</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {notifications > 9 ? "9+" : notifications}
                </Badge>
              )}
            </Button>

            {/* Desktop User Menu */}
            <div className="hidden md:block">
              <UserMenu />
            </div>

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-xs">AF</span>
                    </div>
                    <span>ActsFile</span>
                  </SheetTitle>
                  <SheetDescription>Navigate through your ActsFile experience</SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-4">
                  {/* Mobile User Info */}
                  <div className="pb-4 border-b">
                    <UserMenu mobile />
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="space-y-2">
                    {navItems.map((item) => (
                      <NavLink key={item.href} item={item} mobile />
                    ))}
                  </div>

                  {/* Mobile Quick Actions */}
                  <div className="pt-4 border-t space-y-2">
                    <Link
                      href="/upload-artwork"
                      className="flex items-center space-x-2 w-full px-4 py-3 rounded-lg hover:bg-muted text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Upload Artwork</span>
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 w-full px-4 py-3 rounded-lg hover:bg-muted text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center space-x-2 w-full px-4 py-3 rounded-lg hover:bg-muted text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 w-full justify-start px-4 py-3 rounded-lg hover:bg-muted text-sm"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Tablet Navigation (md screens) */}
        <div className="hidden md:flex lg:hidden border-t py-2 overflow-x-auto">
          <div className="flex items-center space-x-4 min-w-max">
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
