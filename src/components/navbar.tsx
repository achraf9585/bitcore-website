"use client"

import { Link } from "@/i18n/routing"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useState } from "react"

export function Navbar() {
  const t = useTranslations('Navbar')
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20)
  })

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-6 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 pointer-events-none`}
    >
        <div className={`
          pointer-events-auto
          flex items-center gap-12 px-6 py-2 rounded-full 
          transition-all duration-300
          ${isScrolled 
            ? "bg-[#0f0518]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-900/10" 
            : "bg-transparent border border-transparent"}
          font-[family-name:var(--font-montserrat)] font-medium
        `}>
            <Link href="/" className="flex items-center gap-2 group">
                <div className="relative h-12 w-48 opacity-90 group-hover:opacity-100 transition-opacity">
                    <Image 
                        src="/logos/logo_header.png"  
                        alt={t('title')} 
                        fill
                        className="object-cover"
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

            <div className="flex items-center gap-4 pl-4 border-l border-white/10">
              <LanguageSwitcher />
            </div>
        </div>
    </motion.header>
  )
}
