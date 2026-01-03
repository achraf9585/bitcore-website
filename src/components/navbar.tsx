"use client"

import { Link } from "@/i18n/routing"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useState } from "react"
import { CartSheet } from "@/components/cart-sheet"

import { Home, Gamepad2, Code2, Palette, Mail, User as UserIcon, LogOut, LogIn } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"
import { useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const t = useTranslations('Navbar')
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const { scrollY } = useScroll()

  useEffect(() => {
    const supabase = createClient()
    
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
  }


  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20)
  })

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/services/fivem', icon: Gamepad2, label: 'FiveM' },
    { href: '/services/web', icon: Code2, label: 'Web' },
    { href: '/services/design', icon: Palette, label: 'Design' },
    { href: '/#contact', icon: Mail, label: 'Contact' },
  ]

  return (
    <>
      {/* Desktop Header & Mobile Logo Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 md:top-6 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 pointer-events-none`}
      >
          <div className={`
            pointer-events-auto
            flex items-center justify-between md:justify-center w-full md:w-auto gap-12 px-6 py-2 md:rounded-full 
            transition-all duration-300
            ${isScrolled 
              ? "bg-[#0f0518]/80 backdrop-blur-xl border-b md:border border-white/10 shadow-2xl shadow-purple-900/10" 
              : "bg-transparent md:border border-transparent"}
            font-[family-name:var(--font-montserrat)] font-medium
          `}>
              <Link href="/" className="flex items-center gap-2 group">
                  <div className="relative h-20 w-32 opacity-90 group-hover:opacity-100 transition-opacity">
                      <Image 
                          src="/logos/logo_header.png"  
                          alt={t('title')} 
                          fill
                          className="object-contain"
                          priority
                      />
                  </div>
              </Link>

              <nav className="hidden md:flex items-center gap-8">
                {['fivem', 'web', 'design'].map((item) => (
                  <Link 
                    key={item}
                    href={`/services/${item}`} 
                    className="relative text-sm font-medium text-white/80 hover:text-white transition-colors py-1 group/link"
                  >
                    {t(item)}
                    <span className="absolute inset-x-0 bottom-0 h-px bg-accent scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left" />
                  </Link>
                ))}
                <Link 
                  href="/#contact" 
                  className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                >
                  {t('contact')}
                </Link>
              </nav>

              <div className="flex items-center gap-4 md:pl-4 md:border-l border-white/10">
                <CartSheet />
                <LanguageSwitcher />
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                      <Avatar className="h-8 w-8 transition-transform hover:scale-110">
                        <AvatarImage src={user.user_metadata.avatar_url} />
                        <AvatarFallback className="bg-primary/20 text-primary text-xs">
                          {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-[#0f0518]/95 backdrop-blur-xl border-white/10 text-white">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-white/10" />
                      <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleSignOut} className="focus:bg-red-500/20 focus:text-red-400 text-red-400 cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link 
                    href="/login"
                    className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full"
                  >
                    <LogIn size={16} />
                    <span>Login</span>
                  </Link>
                )}
              </div>
          </div>
      </motion.header>

      {/* Mobile Bottom Navigation - Instagram Style */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0f0518]/90 backdrop-blur-xl border-t border-white/10 pb-safe">
        <div className="flex items-center justify-around p-4 pb-6">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              className="flex flex-col items-center gap-1 text-white/60 hover:text-primary active:text-primary transition-colors"
            >
              <item.icon size={24} strokeWidth={1.5} />
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
